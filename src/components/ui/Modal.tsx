import React, { useEffect } from 'react';
import { X } from 'lucide-react'; // Sử dụng icon để đồng bộ

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // 1. Logic đóng Modal bằng phím Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      // Ngăn cuộn trang web bên dưới khi Modal đang mở
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      {/* Lớp nền mờ */}
      <div 
        className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity animate-fadeIn" 
        onClick={onClose} 
      />
      
      {/* Nội dung Modal */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col relative z-10 animate-slideUp border border-gray-100 dark:border-gray-800">
        
        {/* Header: Cải tiến icon và khoảng cách */}
        <div className="p-4 sm:p-5 flex justify-between items-center bg-hunre-green text-white shadow-md">
          <h3 className="text-base md:text-lg font-bold uppercase tracking-wide truncate pr-4">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-all active:scale-90"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Body: custom-scrollbar giúp bảng hiển thị đẹp hơn */}
        <div className="p-3 sm:p-6 overflow-auto flex-1 text-gray-700 dark:text-gray-200 custom-scrollbar">
          {children}
        </div>
        
        {/* Footer giả */}
        <div className="h-1.5 bg-gray-50 dark:bg-[#121212] shrink-0" />
      </div>
    </div>
  );
};