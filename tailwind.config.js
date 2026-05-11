/** @type {import('tailwindcss').Config} */
export default {
  // Kích hoạt chế độ tối dựa trên class (thường là thêm class 'dark' vào thẻ html)
  darkMode: 'class', 
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      // 1. Màu sắc nhận diện thương hiệu HUNRE
      colors: {
        hunre: {
          green: '#08c01a', // Màu xanh lá chính
          dark: '#1b5e20',  // Màu xanh đậm cho trạng thái Hover hoặc Dark Mode
          light: '#d4edda'  // Màu xanh nhạt cho background hoặc highlight
        }
      },
      
      // 2. Định nghĩa các bước chạy (Keyframes) cho hiệu ứng mượt mà
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      
      // 3. Khai báo tên animation để sử dụng trực tiếp trong class (vd: animate-slideUp)
      animation: {
        slideUp: 'slideUp 0.3s ease-out',
        slideIn: 'slideIn 0.2s ease-out',
      }
    },
  },
  
  plugins: [
    // Hỗ trợ hiển thị tốt các nội dung văn bản dài (như câu trả lời của AI)
    require('@tailwindcss/typography'),
  ],
}