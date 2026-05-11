import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface Exam {
  stt: number;
  maHP: string;
  tenHP: string;
  lan: number;
  ngayThi: string;
  gioThi: string;
  hinhThuc: string;
  phongThi: string;
  baoDanh: number;
}

const examScheduleData: Exam[] = [
  { stt: 1, maHP: 'LCT101', tenHP: 'Tư tưởng Hồ Chí Minh', lan: 1, ngayThi: '26/05/2026', gioThi: '17:30 - 18:30', hinhThuc: 'Tự luận', phongThi: 'A.103', baoDanh: 44 },
  { stt: 2, maHP: 'CTKU104', tenHP: 'Phân tích thiết kế hệ thống thông tin', lan: 1, ngayThi: '21/05/2026', gioThi: '13:30 - 15:00', hinhThuc: 'Bài tập lớn', phongThi: 'A.301', baoDanh: 55 },
  { stt: 3, maHP: 'CTKU105', tenHP: 'Phát triển hệ thống thông tin địa lý', lan: 1, ngayThi: '20/05/2026', gioThi: '08:00 - 09:30', hinhThuc: 'Thực hành', phongThi: 'A.701 (K CNTT)', baoDanh: 11 },
  { stt: 4, maHP: 'CTKM105', tenHP: 'Mạng máy tính', lan: 1, ngayThi: '19/05/2026', gioThi: '08:00 - 09:30', hinhThuc: 'Trắc nghiệm', phongThi: 'A.701 (K CNTT)', baoDanh: 11 },
  { stt: 5, maHP: 'CTKM104', tenHP: 'Lập trình hướng đối tượng', lan: 1, ngayThi: '18/05/2026', gioThi: '13:30 - 15:00', hinhThuc: 'Thực hành', phongThi: 'A.701 (K CNTT)', baoDanh: 11 },
  { stt: 6, maHP: 'GTGP106', tenHP: 'Giáo dục thể chất 4 - Cầu lông', lan: 1, ngayThi: '22/04/2026', gioThi: '08:00 - 09:30', hinhThuc: 'Thực hành', phongThi: 'Sân CS1', baoDanh: 458 }
];

// Hàm phụ trợ để chọn màu cho hình thức thi
const getHinhThucStyle = (ht: string) => {
  if (ht.includes('Trắc nghiệm')) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
  if (ht.includes('Thực hành')) return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
  if (ht.includes('Bài tập lớn')) return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
  return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
};

export const ExamTable: React.FC = () => {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-bold text-hunre-dark dark:text-hunre-green uppercase flex items-center gap-2 tracking-wide">
          <Calendar size={20} />
          Lịch thi cá nhân
        </h3>
        <span className="text-[11px] bg-hunre-green/10 text-hunre-green px-2 py-1 rounded-full font-medium">
          Học kỳ II - 2025-2026
        </span>
      </div>
      
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-[11px] text-white uppercase bg-hunre-green tracking-wider">
            <tr>
              <th className="px-4 py-3 text-center">STT</th>
              <th className="px-4 py-3">Thông tin học phần</th>
              <th className="px-4 py-3">Thời gian thi</th>
              <th className="px-4 py-3">Địa điểm & Hình thức</th>
              <th className="px-4 py-3 text-center">SBD</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {examScheduleData.map((exam, index) => (
              <tr 
                key={exam.maHP} 
                className={`hover:bg-hunre-light/20 dark:hover:bg-hunre-dark/10 transition-colors ${index % 2 === 0 ? 'bg-white dark:bg-[#1e1e1e]' : 'bg-gray-50/50 dark:bg-[#252525]'}`}
              >
                <td className="px-4 py-4 text-center text-gray-400 font-medium">
                  {exam.stt}
                </td>
                
                <td className="px-4 py-4">
                  <div className="font-bold text-gray-800 dark:text-gray-200">{exam.tenHP}</div>
                  <div className="text-[12px] text-gray-500 font-mono mt-0.5">{exam.maHP} • Lần {exam.lan}</div>
                </td>
                
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                    <Calendar size={14} className="text-hunre-green" />
                    {exam.ngayThi}
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-gray-500 mt-1">
                    <Clock size={14} />
                    {exam.gioThi}
                  </div>
                </td>
                
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-hunre-dark dark:text-hunre-green font-semibold">
                    <MapPin size={14} />
                    {exam.phongThi}
                  </div>
                  <div className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[11px] font-bold uppercase ${getHinhThucStyle(exam.hinhThuc)}`}>
                    {exam.hinhThuc}
                  </div>
                </td>
                
                <td className="px-4 py-4 text-center font-bold text-gray-700 dark:text-gray-300 bg-gray-50/50 dark:bg-black/10">
                  {exam.baoDanh}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 px-1 flex items-center gap-4 text-[11px] text-gray-500 italic">
        <p>* Vui lòng có mặt tại phòng thi trước 15 phút.</p>
        <p>* Mang theo thẻ sinh viên/CCCD khi đi thi.</p>
      </div>
    </div>
  );
};