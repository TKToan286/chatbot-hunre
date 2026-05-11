import React from 'react';
import { Clock, MapPin, User, CalendarDays, MousePointer2 } from 'lucide-react';

// Định nghĩa kiểu dữ liệu để code sạch hơn
interface Slot {
  subject: string;
  room: string;
  teacher: string;
}

interface ScheduleRow {
  ca: string;
  thu2: Slot | null;
  thu3: Slot | null;
  thu4: Slot | null;
  thu5: Slot | null;
  thu6: Slot | null;
  thu7: Slot | null;
}

const scheduleData: ScheduleRow[] = [
  {
    ca: 'Sáng (07:00 - 11:30)',
    thu2: { subject: 'Lập trình Java', room: 'A.701 (K.CNTT)', teacher: 'Nguyễn Văn A' },
    thu3: null,
    thu4: { subject: 'Hệ thống thông tin địa lý (GIS)', room: 'Phòng Máy 2', teacher: 'Trần Thị B' },
    thu5: null,
    thu6: { subject: 'Phân tích thiết kế HTTT', room: 'A.301', teacher: 'Lê Văn C' },
    thu7: null,
  },
  {
    ca: 'Chiều (12:30 - 17:00)',
    thu2: null,
    thu3: { subject: 'Lập trình Python', room: 'Phòng Máy 1', teacher: 'Phạm Thị D' },
    thu4: null,
    thu5: { subject: 'Cơ sở dữ liệu', room: 'A.305', teacher: 'Hoàng Văn E' },
    thu6: null,
    thu7: { subject: 'Giáo dục thể chất', room: 'Sân CS1', teacher: 'Vũ Thị F' },
  }
];

export const ScheduleTable: React.FC = () => {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 px-1 gap-2">
        <h3 className="font-bold text-hunre-dark dark:text-hunre-green uppercase tracking-wide flex items-center gap-2">
          <CalendarDays size={20} />
          Thời khóa biểu Tuần này
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          <MousePointer2 size={12} />
          <span>Vuốt ngang để xem đầy đủ</span>
        </div>
      </div>
      
      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm custom-scrollbar">
        <table className="w-full text-sm text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-hunre-green text-white text-[11px] uppercase tracking-wider">
              <th className="px-4 py-4 text-center sticky left-0 z-10 bg-hunre-green shadow-[2px_0_5px_rgba(0,0,0,0.1)] w-[140px]">Ca học</th>
              {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'].map((day) => (
                <th key={day} className="px-4 py-4 text-center border-l border-white/10">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {scheduleData.map((row, index) => (
              <tr key={index} className="bg-white dark:bg-[#1e1e1e]">
                {/* Cột Ca Học - Ghim cố định khi cuộn ngang */}
                <td className="px-4 py-6 text-center font-bold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#252525] sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)] border-r border-gray-100 dark:border-gray-800">
                  <div className="flex flex-col items-center gap-1">
                    <Clock size={16} className="text-hunre-green" />
                    <span className="leading-tight">{row.ca}</span>
                  </div>
                </td>
                
                {/* Các cột Thứ */}
                {['thu2', 'thu3', 'thu4', 'thu5', 'thu6', 'thu7'].map((day) => {
                  const cell = row[day as keyof ScheduleRow] as Slot | null;
                  return (
                    <td key={day} className="p-3 align-top min-w-[160px]">
                      {cell ? (
                        <div className="h-full bg-hunre-light/20 dark:bg-hunre-green/5 border border-hunre-green/20 dark:border-hunre-green/10 p-3 rounded-xl transition-all hover:shadow-md hover:border-hunre-green/40 dark:hover:bg-hunre-green/10 group cursor-default">
                          <div className="font-bold text-hunre-dark dark:text-hunre-green leading-tight mb-2 group-hover:scale-[1.02] transition-transform">
                            {cell.subject}
                          </div>
                          
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-gray-400">
                              <MapPin size={13} className="text-orange-500 shrink-0" />
                              <span className="truncate">{cell.room}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[12px] text-gray-500 dark:text-gray-500">
                              <User size={13} className="text-blue-500 shrink-0" />
                              <span className="truncate">{cell.teacher}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full min-h-[100px] flex items-center justify-center border border-dashed border-gray-100 dark:border-gray-800 rounded-xl">
                          <span className="text-gray-300 dark:text-gray-700 italic text-[11px]">Trống</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex items-center gap-4 text-[11px] text-gray-500 dark:text-gray-400 px-1 italic">
        <p>• Dữ liệu cập nhật theo tuần học thực tế.</p>
        <p>• Phòng học có chữ (K.CNTT) thuộc khu vực khoa CNTT.</p>
      </div>
    </div>
  );
};