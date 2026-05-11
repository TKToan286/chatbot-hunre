import React from 'react';
import { GraduationCap, BookOpen, Info } from 'lucide-react';

interface RichCardProps {
  title: string;
  description: string;
  type?: 'scholarship' | 'subject' | 'info';
  actionText?: string;
  onAction?: () => void;
}

export const RichCard: React.FC<RichCardProps> = ({ title, description, type = 'info', actionText, onAction }) => {
  
  // Icon được tối ưu hóa với bóng đổ sâu để nổi bật trên nền Gradient
  const getIcon = () => {
    switch (type) {
      case 'scholarship': return <GraduationCap size={42} className="text-white drop-shadow-lg" />;
      case 'subject': return <BookOpen size={42} className="text-white drop-shadow-lg" />;
      default: return <Info size={42} className="text-white drop-shadow-lg" />;
    }
  };

  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-hunre-green/10 transition-all duration-300 my-3 w-full max-w-[280px] animate-slideUp group">
      
      {/* Header: Phối màu Gradient theo bộ nhận diện HUNRE */}
      <div className={`h-24 flex items-center justify-center bg-gradient-to-br transition-transform duration-500 group-hover:scale-105 ${
        type === 'scholarship' 
          ? 'from-yellow-400 to-orange-500' 
          : 'from-hunre-green to-hunre-dark'
      }`}>
        {getIcon()}
      </div>
      
      {/* Nội dung Card */}
      <div className="p-5">
        <h4 className="font-bold text-gray-800 dark:text-gray-100 text-[16px] mb-2 leading-tight group-hover:text-hunre-green transition-colors">
          {title}
        </h4>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 line-clamp-3">
          {description}
        </p>
        
        {actionText && (
          <button 
            onClick={onAction}
            className="w-full py-2.5 bg-hunre-light dark:bg-hunre-dark/20 text-hunre-dark dark:text-hunre-green font-bold rounded-xl text-xs hover:bg-hunre-green hover:text-white dark:hover:bg-hunre-green dark:hover:text-white transition-all active:scale-95 shadow-sm"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};