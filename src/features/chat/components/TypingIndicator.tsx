import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4 animate-slideIn">
      {/* Container: Cập nhật Border và Background theo hệ thống HUNRE */}
      <div className="bg-white dark:bg-[#1e1e1e] border-2 border-hunre-light dark:border-hunre-dark/30 px-5 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center shadow-sm">
        
        {/* Các chấm tròn: Chuyển sang màu xanh HUNRE và thêm hiệu ứng sáng nhẹ */}
        <div className="w-2 h-2 bg-hunre-green rounded-full animate-bounce [animation-delay:-0.3s] shadow-[0_0_5px_rgba(8,192,26,0.3)]"></div>
        <div className="w-2 h-2 bg-hunre-green rounded-full animate-bounce [animation-delay:-0.15s] shadow-[0_0_5px_rgba(8,192,26,0.3)]"></div>
        <div className="w-2 h-2 bg-hunre-green rounded-full animate-bounce shadow-[0_0_5px_rgba(8,192,26,0.3)]"></div>
        
        <span className="text-[12px] font-medium text-hunre-green/60 ml-1 dark:text-hunre-green/40">
          Advisor đang trả lời...
        </span>
      </div>
    </div>
  );
};