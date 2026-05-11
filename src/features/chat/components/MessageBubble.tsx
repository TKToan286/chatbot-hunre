import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Copy, Check } from 'lucide-react'; 

interface MessageBubbleProps {
  text?: string; 
  sender: 'user' | 'bot';
}

/**
 * HÀM SIÊU XỬ LÝ: CHUYỂN BẢNG THÀNH DANH SÁCH
 * Giúp hiển thị đẹp trên mọi màn hình mà không cần sửa Prompt
 */
const transformTableToList = (content: string) => {
  if (!content.includes('|')) return content;

  const lines = content.split('\n');
  let result: string[] = [];
  let isInsideTable = false;
  let headers: string[] = [];

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    
    // Kiểm tra dòng có phải là hàng của bảng không
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      // Bỏ qua dòng kẻ phân cách |---|---|
      if (trimmedLine.includes('---')) {
        isInsideTable = true;
        return;
      }

      // Tách các cột
      const columns = trimmedLine
        .split('|')
        .filter(col => col.trim() !== "")
        .map(col => col.trim());

      if (!isInsideTable) {
        // Đây là hàng tiêu đề
        headers = columns;
        isInsideTable = true;
        result.push('\n'); // Thêm khoảng cách trước danh sách mới
      } else {
        // Đây là hàng dữ liệu -> Chuyển thành gạch đầu dòng
        let listItem = columns.map((col, idx) => {
          const headerName = headers[idx] ? `**${headers[idx]}**: ` : "";
          return `${headerName}${col}`;
        }).join(' - ');
        
        result.push(`* ${listItem}`);
      }
    } else {
      if (isInsideTable) {
        isInsideTable = false;
        headers = [];
        result.push('\n'); // Khoảng cách sau khi hết bảng
      }
      result.push(line);
    }
  });

  return result.join('\n');
};

const preprocessText = (content: string) => {
  if (!content) return '';
  
  // 1. Chuyển bảng thành danh sách trước
  let processed = transformTableToList(content);
  
  // 2. Các xử lý khác
  return processed
    .replace(/<br\s*\/?>/gi, '\n') 
    .replace(/`/g, "") // Xóa dấu huyền theo yêu cầu của Toàn
    .replace(/\\\[([\s\S]*?)\\\]/g, (_match, math) => `$$${math}$$`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_match, math) => `$${math}$`);
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ text = '', sender }) => {
  const [copied, setCopied] = useState(false);
  const isUser = sender === 'user';
  const safeText = text || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(safeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn group`}>
      
      {/* LOGO AI: Xanh HUNRE chuẩn #08c01a */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-hunre-green flex items-center justify-center mr-3 mt-1 shadow-sm shadow-hunre-green/20">
          <span className="text-white text-[10px] font-bold tracking-wider">AI</span>
        </div>
      )}

      <div className={`relative max-w-[90%] md:max-w-[85%] flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div
          className={`
            px-4 py-3 text-[15px] leading-relaxed break-words shadow-sm
            ${isUser 
              ? 'bg-hunre-green text-white rounded-3xl rounded-tr-sm' 
              : 'bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-800 rounded-2xl rounded-tl-sm' 
            }
          `}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap font-medium">{safeText}</div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {preprocessText(safeText)}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {!isUser && (
          <button
            onClick={handleCopy}
            className="mt-1 p-2 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 text-gray-400 hover:text-hunre-green hover:bg-hunre-light/30 transition-all flex-shrink-0"
          >
            {copied ? <Check size={16} className="text-hunre-green" /> : <Copy size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};