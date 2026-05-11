import { useEffect, useRef } from 'react';
import { Calendar, GraduationCap, MapPin, Calculator } from 'lucide-react';

// 1. Import Layout & Store
import { Sidebar } from './components/layout/Sidebar';
import { useAppStore } from './store/useAppStore';

// 2. Import Chat Features (Đường dẫn chuẩn có /components/)
import { ChatHeader } from './features/chat/components/ChatHeader';
import { ChatInput } from './features/chat/components/ChatInput';
import { MessageBubble } from './features/chat/components/MessageBubble';
import { MessageSkeleton } from './features/chat/components/MessageSkeleton';

// 3. Import UI Components & Tables
import { Modal } from './components/ui/Modal'; 
import { ExamTable } from "./features/schedule/components/ExamTable";
import { GradeTable } from "./features/schedule/components/GradeTable";
import { ScheduleTable } from "./features/schedule/components/ScheduleTable";

function App() {
  // Lấy dữ liệu và hàm điều khiển từ Zustand Store
  const { 
    isSidebarOpen, 
    closeSidebar, 
    messages, 
    isLoading, 
    sendMessage,
    isModalOpen,    
    modalType,      
    modalTitle,     
    closeModal      
  } = useAppStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isLoading]);

  // Hàm quyết định nội dung nào sẽ hiện trong Modal
  const renderModalContent = () => {
    switch (modalType) {
      case 'grades':
        return <GradeTable />;
      case 'schedule':
        return <ScheduleTable />;
      case 'exams':
        return <ExamTable />;
      default:
        return <div className="py-10 text-center text-gray-500">Đang cập nhật dữ liệu...</div>;
    }
  };

  // Các câu hỏi gợi ý ở màn hình chào
  const suggestions = [
    { label: 'Lịch thi học kỳ', p: 'Cho mình xem lịch thi học kỳ này', icon: <Calendar size={18} className="text-hunre-green" /> },
    { label: 'Cách tính GPA', p: 'Hướng dẫn cách tính điểm GPA', icon: <Calculator size={18} className="text-hunre-green" /> },
    { label: 'Xét học bổng', p: 'Điều kiện nhận học bổng là gì?', icon: <GraduationCap size={18} className="text-hunre-green" /> },
    { label: 'Sơ đồ trường', p: 'Tìm vị trí phòng ban HUNRE', icon: <MapPin size={18} className="text-hunre-green" /> }
  ];

  return (
    <div className="flex h-[100dvh] bg-white dark:bg-[#121212] overflow-hidden relative selection:bg-hunre-green/20 font-sans text-gray-900 dark:text-gray-100">
      
      {/* OVERLAY CHO MOBILE (Khi mở Sidebar) */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm lg:hidden transition-all duration-300 ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeSidebar}
      />

      {/* THANH SIDEBAR */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-[70] transition-all duration-300 ease-in-out bg-[#f0f4f9] dark:bg-[#1e1e1e]
          lg:relative lg:translate-x-0
          ${isSidebarOpen 
            ? 'translate-x-0 w-[280px] opacity-100 visible border-r border-gray-200 dark:border-gray-800' 
            : '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:invisible border-none'
          }
        `}
      >
        <Sidebar />
      </aside>

      {/* PHẦN NỘI DUNG CHÍNH */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative transition-all duration-300">
        <ChatHeader />

        <main className="flex-1 overflow-y-auto scroll-smooth no-scrollbar relative flex flex-col">
          <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col px-4 md:px-8">
            
            {messages.length <= 1 ? (
              /* --- TRƯỜNG HỢP 1: MÀN HÌNH CHÀO --- */
              <div className="flex-1 flex flex-col h-full py-4">
                <div className="flex-shrink-0 flex flex-col items-center justify-center text-center mb-4 md:mb-10 animate-fadeIn mt-8 md:mt-auto">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-hunre-green via-hunre-dark to-hunre-green bg-clip-text text-transparent px-2 tracking-tight">
                    Xin chào, sinh viên HUNRE!
                  </h1>
                  <p className="text-lg md:text-2xl text-gray-400 dark:text-[#c4c7c5] font-medium">
                    Tôi là <span className="text-hunre-green">HUNRE Advisor</span>, tôi có thể giúp gì cho bạn?
                  </p>
                </div>

                <div className="flex-1 md:hidden" /> 

                <div className="flex flex-col gap-4 md:gap-8 max-w-4xl mx-auto w-full animate-slideUp">
                  <div className="w-full">
                    <div className="max-h-[160px] md:max-h-none overflow-y-auto pr-1 custom-scrollbar lg:overflow-visible">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 md:gap-3 px-1 pb-1">
                        {suggestions.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => sendMessage(item.p)}
                            className="flex items-center gap-3 px-4 py-2.5 bg-[#f0f4f9] dark:bg-[#1e1e1e] hover:bg-hunre-light/50 dark:hover:bg-hunre-dark/20 rounded-full transition-all border border-gray-100 dark:border-gray-800 shadow-sm active:scale-95 group shrink-0 text-left"
                          >
                            <div className="flex-shrink-0 bg-white dark:bg-[#121212] p-1.5 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                              {item.icon}
                            </div>
                            <span className="text-[14px] md:text-[15px] font-medium text-gray-700 dark:text-gray-300 truncate">
                              {item.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full pb-2">
                    <ChatInput />
                  </div>
                </div>

                <div className="mt-4 md:mt-auto md:pb-4 w-full text-center flex-shrink-0">
                  <p className="text-[11px] md:text-[12px] text-gray-400 dark:text-gray-500 px-4">
                    <span className="font-bold text-hunre-green/60">HUNRE Advisor</span> có thể mắc lỗi. Vui lòng kiểm tra lại thông tin.
                  </p>
                </div>
              </div>
            ) : (
              /* --- TRƯỜNG HỢP 2: LỊCH SỬ CHAT --- */
              <div className="py-8 space-y-10 pb-10 max-w-3xl mx-auto w-full flex flex-col">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
                ))}
                
                {isLoading && (
                  <div className="space-y-4">
                    <MessageSkeleton />
                  </div>
                )}
                
                <div ref={messagesEndRef} className="h-4 w-full flex-shrink-0" />
              </div>
            )}
          </div>
        </main>

        {/* KHUNG NHẬP TIN NHẮN KHI ĐÃ CHAT */}
        {messages.length > 1 && (
          <footer className="w-full bg-white dark:bg-[#121212] pt-2 pb-6 px-4 border-t border-gray-50 dark:border-gray-900">
            <div className="max-w-3xl mx-auto">
              <ChatInput />
            </div>
          </footer>
        )}
      </div>

      {/* --- CỬA SỔ MODAL HIỂN THỊ CÁC BẢNG DỮ LIỆU --- */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={modalTitle}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}

export default App;