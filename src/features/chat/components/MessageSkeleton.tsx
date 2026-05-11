import React from 'react';

export const MessageSkeleton: React.FC = () => {
  return (
    <div className="flex w-full mb-6 justify-start animate-slideUp">
      
      {/* 1. Logo AI: Sử dụng màu xanh HUNRE đặc trưng #08c01a */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-hunre-green flex items-center justify-center mr-3 mt-1 shadow-sm shadow-hunre-green/20">
        <span className="text-white text-[10px] font-bold tracking-wider">AI</span>
      </div>
      
      {/* 2. Bong bóng chờ: Thiết kế bo góc khớp với MessageBubble */}
      <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-gray-800 px-4 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm">
        <div 
          className="w-1.5 h-1.5 bg-hunre-green/60 rounded-full animate-bounce" 
          style={{ animationDelay: '0ms' }} 
        />
        <div 
          className="w-1.5 h-1.5 bg-hunre-green/60 rounded-full animate-bounce" 
          style={{ animationDelay: '150ms' }} 
        />
        <div 
          className="w-1.5 h-1.5 bg-hunre-green/60 rounded-full animate-bounce" 
          style={{ animationDelay: '300ms' }} 
        />
        
        {/* Thêm text nhỏ để tăng tính tương tác cho cố vấn ảo */}
        <span className="text-[12px] text-hunre-green/60 font-medium ml-1">
           Advisor đang trả lời...
        </span>
      </div>

    </div>
  );
};