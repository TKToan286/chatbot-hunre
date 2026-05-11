import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  MessageSquare, 
  Trash2, 
  PencilLine, 
  Menu, 
  MoreVertical, 
  Pin, 
  PinOff, 
  Globe, 
  ExternalLink,
  GraduationCap,
  Library,
  Calendar,
  ClipboardList,
  Search
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Sidebar: React.FC = () => {
  const { 
    history, 
    currentChatId, 
    loadChat, 
    startNewChat, 
    deleteChat, 
    renameChat, 
    togglePinChat,
    isSidebarOpen,
    toggleSidebar,
    openModal 
  } = useAppStore();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const closeMenus = () => setOpenMenuId(null);
    window.addEventListener('click', closeMenus);
    return () => window.removeEventListener('click', closeMenus);
  }, []);

  const sortedHistory = [...history].sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0;
    return a.isPinned ? -1 : 1;
  });

  const handleRename = (id: string, oldTitle: string) => {
    const newTitle = prompt('Đổi tên cuộc trò chuyện:', oldTitle);
    if (newTitle?.trim()) renameChat(id, newTitle.trim());
    setOpenMenuId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa cuộc trò chuyện này?')) {
      deleteChat(id);
    }
    setOpenMenuId(null);
  };

  return (
    <div className={`
      flex flex-col h-full bg-[#f0f4f9] dark:bg-[#1e1e1e] transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-800
      ${isSidebarOpen ? 'w-[280px] opacity-100' : 'w-0 opacity-0 overflow-hidden border-none'} 
    `}>
      
      {/* 1. HEADER SIDEBAR */}
      <div className="h-16 flex items-center px-4 shrink-0">
        <button 
          onClick={toggleSidebar} 
          className="p-2 hover:bg-hunre-light/50 dark:hover:bg-hunre-dark/20 rounded-full text-gray-600 dark:text-gray-300 transition-all active:scale-90"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* 2. NÚT CHAT MỚI */}
      <div className="px-4 pb-4">
        <button
          onClick={startNewChat}
          className="w-full flex items-center gap-3 px-4 py-3 bg-hunre-green hover:bg-hunre-dark rounded-xl text-[14px] font-bold text-white shadow-sm shadow-hunre-green/20 transition-all active:scale-95 group"
        >
          <Plus size={20} className="text-white group-hover:rotate-90 transition-transform duration-300" />
          <span>Cuộc trò chuyện mới</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 custom-scrollbar">
        
        {/* 3. NHÓM 1: CÔNG CỤ TRA CỨU (Mở 3 bảng dữ liệu bạn đã gửi) */}
        <div className="mb-6">
          <p className="px-3 mb-2 text-[11px] font-bold text-hunre-green/70 dark:text-hunre-green/50 uppercase tracking-[0.2em] flex items-center gap-2">
            <Search size={12} /> Tra cứu dữ liệu
          </p>
          <div className="space-y-1">
            {/* Mở GradeTable */}
            <button
              onClick={() => openModal('grades', 'Kết quả học tập cá nhân')}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all group"
            >
              <GraduationCap size={16} className="text-blue-500" />
              <span className="flex-1 text-left">Bảng điểm sinh viên</span>
            </button>

            {/* Mở ScheduleTable */}
            <button
              onClick={() => openModal('schedule', 'Thời khóa biểu Tuần này')}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 transition-all group"
            >
              <Calendar size={16} className="text-orange-500" />
              <span className="flex-1 text-left">Thời khóa biểu tuần</span>
            </button>

            {/* Mở ExamTable */}
            <button
              onClick={() => openModal('exams', 'Lịch thi cá nhân')}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 transition-all group"
            >
              <ClipboardList size={16} className="text-emerald-500" />
              <span className="flex-1 text-left">Lịch thi học kỳ</span>
            </button>
          </div>
        </div>

        {/* 4. NHÓM 2: LIÊN KẾT NHANH (Link ngoài) */}
        <div className="mb-6">
          <p className="px-3 mb-2 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
            Website trường
          </p>
          <div className="space-y-1">
            <a
              href="https://student.hunre.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:bg-hunre-light/50 dark:hover:bg-hunre-dark/20 transition-all group"
            >
              <Globe size={16} className="text-hunre-green" />
              <span className="flex-1">Cổng sinh viên</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100" />
            </a>

            <a
              href="http://hunre.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:bg-hunre-light/50 dark:hover:bg-hunre-dark/20 transition-all group"
            >
              <Library size={16} className="text-hunre-green" />
              <span className="flex-1">Trang chủ HUNRE</span>
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100" />
            </a>
          </div>
        </div>

        {/* 5. DANH SÁCH LỊCH SỬ CHAT */}
        <div className="border-t border-gray-200/50 dark:border-gray-800/50 pt-4">
          <p className="px-3 mb-2 text-[11px] font-bold text-hunre-green/70 dark:text-hunre-green/50 uppercase tracking-[0.2em]">
            Gần đây
          </p>
          
          <div className="space-y-1">
            {sortedHistory.length === 0 ? (
              <div className="px-3 py-4 text-xs text-gray-400 italic">
                Chưa có lịch sử chat
              </div>
            ) : (
              sortedHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`
                    group relative flex items-center gap-3 rounded-xl cursor-pointer transition-all px-4 py-2.5
                    ${currentChatId === chat.id 
                      ? 'bg-hunre-light dark:bg-hunre-dark/30 text-hunre-dark dark:text-hunre-green shadow-sm' 
                      : 'hover:bg-hunre-light/30 dark:hover:bg-hunre-dark/10 text-gray-700 dark:text-gray-300'}
                  `}
                  onClick={() => loadChat(chat.id)}
                >
                  {chat.isPinned ? (
                     <Pin size={14} className="flex-shrink-0 text-hunre-green fill-hunre-green rotate-45" />
                  ) : (
                     <MessageSquare size={16} className={`flex-shrink-0 ${currentChatId === chat.id ? 'text-hunre-green' : 'text-gray-400'}`} />
                  )}
                  
                  <span className="flex-1 text-[13.5px] truncate font-medium pr-4">
                    {chat.title}
                  </span>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === chat.id ? null : chat.id);
                    }}
                    className={`p-1 rounded-md transition-all opacity-0 group-hover:opacity-100 hover:bg-hunre-green/20`}
                  >
                    <MoreVertical size={16} />
                  </button>

                  {openMenuId === chat.id && (
                    <div className="absolute right-2 top-10 z-[100] w-44 bg-white dark:bg-[#2d2d2d] border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl py-1 animate-in fade-in zoom-in duration-100" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => { togglePinChat(chat.id); setOpenMenuId(null); }} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                        {chat.isPinned ? <><PinOff size={14} /> Bỏ ghim</> : <><Pin size={14} /> Ghim</>}
                      </button>
                      <button onClick={() => handleRename(chat.id, chat.title)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <PencilLine size={14} /> Đổi tên
                      </button>
                      <button onClick={() => handleDelete(chat.id)} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 size={14} /> Xóa
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 6. TRẠNG THÁI HỆ THỐNG */}
      <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-hunre-light/30 dark:bg-hunre-dark/10 border border-hunre-green/5">
           <div className="w-2 h-2 rounded-full bg-hunre-green animate-pulse shadow-[0_0_8px_rgba(8,192,26,0.5)]" />
           <span className="text-[12px] font-bold text-hunre-dark dark:text-hunre-green/80">HUNRE Advisor Online</span>
        </div>
      </div>
    </div>
  );
};