import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore';

export const ChatInput: React.FC = () => {
  const { sendMessage, isLoading } = useAppStore();
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 1. Logic tự động co giãn chiều cao (Auto-resize)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`; 
      if (window.innerWidth >= 768) {
         textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
      }
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim() && !isLoading) {
      sendMessage(text.trim());
      setText(''); 
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; 
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSend();
    }
  };

  return (
    <div className="relative flex items-end w-full bg-[#f0f4f9] dark:bg-[#1e1e1e] rounded-[24px] border border-transparent focus-within:bg-white focus-within:dark:bg-[#121212] focus-within:border-hunre-green/30 focus-within:dark:border-hunre-green/20 focus-within:shadow-md focus-within:shadow-hunre-green/5 transition-all duration-200 px-3 py-1 md:px-4 md:py-2">
      
      {/* Ô nhập liệu (Textarea) */}
      <div className="flex-1 min-w-0 mr-1">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          // Cập nhật Placeholder mới
          placeholder="Hỏi HUNRE Advisor..."
          className="w-full min-h-[40px] py-2.5 bg-transparent border-none outline-none resize-none text-[15px] md:text-base text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 overflow-y-auto no-scrollbar leading-snug"
          rows={1}
          disabled={isLoading}
        />
      </div>

      {/* Cụm nút gửi: Chuyển sang tông xanh HUNRE */}
      <div className="flex items-center pb-1.5 flex-shrink-0">
        <button 
          onClick={handleSend}
          disabled={!text.trim() || isLoading}
          className={`
            p-1.5 md:p-2 rounded-full transition-all duration-200 flex items-center justify-center
            ${text.trim() && !isLoading 
              ? 'bg-hunre-green text-white hover:bg-hunre-dark shadow-md shadow-hunre-green/20 transform active:scale-90' 
              : 'bg-transparent text-gray-400 dark:text-gray-600 cursor-not-allowed'}
          `}
          title="Gửi tin nhắn (Enter)"
        >
          <SendHorizontal size={18} className="md:w-[22px] md:h-[22px]" />
        </button>
      </div>

    </div>
  );
};