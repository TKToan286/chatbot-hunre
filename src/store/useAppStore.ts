import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  sessionId: string;
  isPinned: boolean;
}

interface AppState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  
  // Quản lý Lịch sử
  history: ChatSession[];
  currentChatId: string | null;
  startNewChat: () => void;
  loadChat: (id: string) => void;
  deleteChat: (id: string) => void;
  renameChat: (id: string, newTitle: string) => void;
  togglePinChat: (id: string) => void;

  // Quản lý Modal Tra cứu (Cập nhật ở đây)
  isModalOpen: boolean;
  modalType: 'grades' | 'schedule' | 'exams' | null;
  modalTitle: string;
  openModal: (type: 'grades' | 'schedule' | 'exams', title: string) => void;
  closeModal: () => void;
  
  // Logic Chat hiện tại
  messages: Message[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isSidebarOpen: false, 
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      closeSidebar: () => set({ isSidebarOpen: false }),

      history: [],
      currentChatId: 'default-id',
      messages: [
        { id: 'welcome-msg', text: 'Tôi là cố vấn học tập - HUNRE Advisor! Tôi có thể giúp gì cho bạn hôm nay?', sender: 'bot' }
      ],
      isLoading: false,

      // --- QUẢN LÝ MODAL ---
      isModalOpen: false,
      modalType: null,
      modalTitle: '',
      openModal: (type, title) => set({ 
        isModalOpen: true, 
        modalType: type, 
        modalTitle: title,
        isSidebarOpen: false 
      }),
      closeModal: () => set({ isModalOpen: false, modalType: null, modalTitle: '' }),

      startNewChat: () => {
        const newId = Date.now().toString();
        const newSessionId = 'user_' + Math.random().toString(36).substring(2, 10);
        
        set({
          currentChatId: newId,
          messages: [
            { id: Date.now().toString(), text: 'Tôi là cố vấn học tập - HUNRE Advisor! Tôi có thể giúp gì cho bạn hôm nay?', sender: 'bot' }
          ],
          isSidebarOpen: false 
        });
        
        localStorage.setItem('n8n_chat_session_id', newSessionId);
      },

      loadChat: (id: string) => {
        const chat = get().history.find(h => h.id === id);
        if (chat) {
          set({
            currentChatId: chat.id,
            messages: chat.messages,
            isSidebarOpen: false 
          });
          localStorage.setItem('n8n_chat_session_id', chat.sessionId);
        }
      },

      deleteChat: (id: string) => {
        const newHistory = get().history.filter(h => h.id !== id);
        set({ history: newHistory });
        if (get().currentChatId === id) {
          get().startNewChat();
        }
      },

      renameChat: (id: string, newTitle: string) => {
        const { history } = get();
        const newHistory = history.map((chat) =>
          chat.id === id ? { ...chat, title: newTitle } : chat
        );
        set({ history: newHistory });
      },

      togglePinChat: (id: string) => {
        const { history } = get();
        const newHistory = history.map((chat) =>
          chat.id === id ? { ...chat, isPinned: !chat.isPinned } : chat
        );
        set({ history: newHistory });
      },

      sendMessage: async (text: string) => {
        if (!text.trim()) return;

        const newUserMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
        
        set((state) => ({
          messages: [...state.messages, newUserMsg],
          isLoading: true
        }));

        try {
          let sessionId = localStorage.getItem('n8n_chat_session_id');
          if (!sessionId) {
            sessionId = 'user_' + Math.random().toString(36).substring(2, 10);
            localStorage.setItem('n8n_chat_session_id', sessionId);
          }

          const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
          
          const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true' 
            },
            body: JSON.stringify({
              message: text,
              sessionId: sessionId,
              executionMode: "production"
            })
          });

          const data = await response.json();
          let botReply = data.reply || data.output || data.response || data.text || "Bot không phản hồi đúng định dạng.";

          const newBotMsg: Message = { id: (Date.now() + 1).toString(), text: botReply, sender: 'bot' };
          const finalMessages = [...get().messages, newBotMsg];
          
          set({
            messages: finalMessages,
            isLoading: false
          });

          const { currentChatId, history } = get();
          const existingSessionIndex = history.findIndex(h => h.id === currentChatId);

          if (existingSessionIndex !== -1) {
            const updatedHistory = [...history];
            updatedHistory[existingSessionIndex] = {
              ...updatedHistory[existingSessionIndex],
              messages: finalMessages
            };
            set({ history: updatedHistory });
          } else {
            const newSession: ChatSession = {
              id: currentChatId || Date.now().toString(),
              title: text.length > 25 ? text.substring(0, 25) + "..." : text,
              messages: finalMessages,
              sessionId: sessionId,
              isPinned: false
            };
            set({ history: [newSession, ...history] });
          }

        } catch (error) {
          console.error('Lỗi API:', error);
          const errorMsg: Message = { 
            id: Date.now().toString(), 
            text: '**Lỗi kết nối API!** Vui lòng kiểm tra lại server.', 
            sender: 'bot' 
          };
          set((state) => ({
            messages: [...state.messages, errorMsg],
            isLoading: false
          }));
        }
      }
    }),
    {
      name: 'hunre-chat-storage',
      partialize: (state) => ({ 
        history: state.history, 
        currentChatId: state.currentChatId,
        messages: state.messages 
      }), 
    }
  )
);