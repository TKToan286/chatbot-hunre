import React from 'react';
import { Award, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

interface Grade {
  stt: number;
  tenMon: string;
  tinChi: number;
  diem10: number;
  diem4: number;
  diemChu: string;
  ketQua: 'Đạt' | 'Không đạt';
}

const gradeData: Grade[] = [
  { stt: 1, tenMon: 'Cơ sở dữ liệu', tinChi: 3, diem10: 8.5, diem4: 3.7, diemChu: 'A', ketQua: 'Đạt' },
  { stt: 2, tenMon: 'Lập trình hướng đối tượng', tinChi: 3, diem10: 7.8, diem4: 3.2, diemChu: 'B+', ketQua: 'Đạt' },
  { stt: 3, tenMon: 'Mạng máy tính', tinChi: 3, diem10: 6.5, diem4: 2.5, diemChu: 'C+', ketQua: 'Đạt' },
  { stt: 4, tenMon: 'Phát triển HTTT địa lý', tinChi: 3, diem10: 9.0, diem4: 4.0, diemChu: 'A+', ketQua: 'Đạt' },
  { stt: 5, tenMon: 'Triết học Mác-Lênin', tinChi: 3, diem10: 3.5, diem4: 0, diemChu: 'F', ketQua: 'Không đạt' },
  { stt: 6, tenMon: 'Tiếng Anh chuyên ngành', tinChi: 2, diem10: 8.0, diem4: 3.5, diemChu: 'B+', ketQua: 'Đạt' },
];

export const GradeTable: React.FC = () => {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-4 px-1">
        <Award className="text-hunre-green" size={24} />
        <h3 className="font-bold text-hunre-dark dark:text-hunre-green uppercase tracking-wide">
          Kết quả học tập cá nhân
        </h3>
      </div>
      
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-hunre-green text-white text-[11px] uppercase tracking-wider">
            <tr>
              <th className="px-4 py-4 text-center">STT</th>
              <th className="px-4 py-4">Tên môn học/học phần</th>
              <th className="px-4 py-4 text-center">Số TC</th>
              <th className="px-4 py-4 text-center">Thang 10</th>
              <th className="px-4 py-4 text-center">Thang 4</th>
              <th className="px-4 py-4 text-center">Chữ</th>
              <th className="px-4 py-4 text-center">Kết quả</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-[#1e1e1e]">
            {gradeData.map((grade, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-hunre-dark/10 transition-colors">
                <td className="px-4 py-3 text-center text-gray-400 font-medium">{grade.stt}</td>
                <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">{grade.tenMon}</td>
                <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{grade.tinChi}</td>
                <td className="px-4 py-3 text-center font-bold text-gray-700 dark:text-gray-300">{grade.diem10}</td>
                <td className="px-4 py-3 text-center font-bold text-gray-700 dark:text-gray-300">{grade.diem4}</td>
                <td className={`px-4 py-3 text-center font-black ${grade.diemChu === 'F' ? 'text-red-500' : 'text-blue-600 dark:text-blue-400'}`}>
                  {grade.diemChu}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    {grade.ketQua === 'Đạt' ? (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full text-[11px] font-bold">
                        <CheckCircle2 size={12} /> ĐẠT
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full text-[11px] font-bold">
                        <XCircle size={12} /> TRƯỢT
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hiển thị tóm tắt điểm trung bình (GPA) - Đã tối ưu UI */}
      <div className="mt-6 p-5 bg-gradient-to-r from-hunre-light/20 to-transparent dark:from-hunre-dark/20 border border-hunre-green/20 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-hunre-green/10 rounded-xl text-hunre-green">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">Điểm trung bình tích lũy (GPA)</p>
            <p className="text-3xl font-black text-hunre-green">3.18 / 4.0</p>
          </div>
        </div>
        
        <div className="flex gap-8">
          <div className="text-center sm:text-right">
            <p className="text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-widest">Xếp loại</p>
            <p className="text-xl font-bold text-hunre-dark dark:text-gray-200">Khá</p>
          </div>
          <div className="text-center sm:text-right border-l border-gray-200 dark:border-gray-700 pl-8">
            <p className="text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-widest">Tín chỉ tích lũy</p>
            <p className="text-xl font-bold text-hunre-dark dark:text-gray-200">17 TC</p>
          </div>
        </div>
      </div>
    </div>
  );
};