// src/data/phases/phase-3.ts
import type { Phase } from '@/types/curriculum';
import { phaseThemes } from '../themes';

export const phase3: Phase = {
  id: 3,
  title: "Kỹ năng Kỹ thuật Bổ trợ",
  subtitle: "Trang bị kỹ năng lập trình kịch bản Python/JS, Webhooks nâng cao và cơ sở dữ liệu SQL",
  duration: "6-8 tuần",
  pace: "10 giờ/tuần",
  totalHours: 45,
  icon: "🔧",
  theme: phaseThemes[3],
  milestone: "Xây dựng thành công đường ống dẫn dữ liệu (Data Pipeline) tự động qua Python & Supabase",
  outcome: "Viết được script Python xử lý dữ liệu lớn, làm chủ JavaScript n8n Code Node và truy vấn SQL thuần thục",
  tools: ["Python", "JavaScript", "SQL", "Supabase", "pgvector"],
  modules: [
    {
      id: "m3-1",
      title: "Python Thực Dụng Cho AI Workflow",
      type: "concept",
      estimatedHours: 15,
      description: "Học lập trình Python thực dụng phục vụ làm sạch văn bản và gọi API nâng cao",
      lessons: [
        {
          id: "l3-1-1",
          title: "Python cho AI Workflow",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Tìm hiểu tại sao Python cần thiết cho tự động hóa và các thư viện cốt lõi json, requests, pandas.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Tại sao cần học lập trình Python?"
            },
            {
              type: "text",
              content: "Trong vai trò một AI Workflow Designer, bạn không cần phải là kỹ sư phần mềm chuyên nghiệp. Kỹ năng Python của bạn phục vụ đắc lực cho các tác vụ:\n\n- Làm sạch và tiền xử lý văn bản ở quy mô lớn (data cleaning).\n- Đọc, viết và phân tích dữ liệu dạng cấu trúc (JSON, CSV, Excel).\n- Viết các đoạn mã gọi API nâng cao vượt qua giới hạn của công cụ no-code."
            },
            {
              type: "callout",
              variant: "info",
              title: "Các thư viện cốt lõi",
              content: "**json**: Dùng để chuyển đổi chuỗi JSON thành Dict trong Python và ngược lại.\n\n**requests**: Thư viện chuẩn gửi các request HTTP.\n\n**re**: Thư viện xử lý biểu thức chính quy (regular expressions) cực mạnh để dọn dẹp văn bản bẩn."
            },
            {
              type: "heading",
              level: 3,
              content: "Mẫu code gọi API OpenAI bằng Python"
            },
            {
              type: "code",
              language: "python",
              filename: "requests_openai.py",
              content: `import requests
import json

url = "https://api.openai.com/v1/chat/completions"
headers = {
    "Authorization": "Bearer sk-your-key",
    "Content-Type": "application/json"
}
payload = {
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "Hello!"}],
    "temperature": 0.3
}
response = requests.post(url, headers=headers, json=payload)
print(response.json())`
            }
          ]
        },
        {
          id: "l3-1-2",
          title: "Lab 3.1: Python - Text Cleaner Script",
          duration: "3 giờ",
          type: "exercise",
          summary: "Viết kịch bản Python lọc bỏ mã HTML, khoảng trắng thừa và ký tự đặc biệt ra khỏi văn bản thô.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Mục tiêu bài Lab"
            },
            {
              type: "text",
              content: "Viết một hàm Python `clean_text(raw_html)` nhận đầu vào là văn bản bẩn (chứa thẻ HTML, khoảng trắng dư thừa, ký tự lạ) và trả về văn bản sạch đẹp."
            },
            {
              type: "code",
              language: "python",
              filename: "text_cleaner.py",
              content: `import re

def clean_text(text):
    # Loại bỏ thẻ HTML
    clean = re.sub(r'<[^>]+>', '', text)
    # Loại bỏ ký tự đặc biệt thừa
    clean = re.sub(r'&nbsp;', ' ', clean)
    # Thu gọn khoảng trắng thừa
    clean = re.sub(r'\\s+', ' ', clean).strip()
    return clean

raw_text = "<p>Xin chào&nbsp;&nbsp;bạn!!! 🎉  Click <a href='#'>đây</a></p>"
print("Kết quả:", clean_text(raw_text))`
            },
            {
              type: "checklist",
              title: "Tiêu chí nộp bài:",
              items: [
                "Lưu mã nguồn Python vào file phase-3/text_cleaner.py.",
                "Hàm xử lý thành công tất cả các thẻ HTML lồng nhau.",
                "Kết quả in ra màn hình sạch sẽ, chuẩn xác."
              ]
            }
          ]
        },
        {
          id: "l3-1-3",
          title: "Lab 3.2: Python - API Caller",
          duration: "3.5 giờ",
          type: "exercise",
          summary: "Viết script Python đọc tệp tin prompt cục bộ, gọi API OpenAI và xuất kết quả phản hồi ra tệp JSON.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Mục tiêu bài Lab"
            },
            {
              type: "text",
              content: "Đọc prompt đầu vào từ tệp tin `input.txt`, thực hiện gọi API và xuất chi phí ước tính ra tệp cấu trúc `output.json`."
            },
            {
              type: "checklist",
              title: "Các công việc cần hoàn thành:",
              items: [
                "Sử dụng thư viện requests gửi payload POST lên OpenAI API.",
                "Đọc tham số cấu hình từ file txt cục bộ.",
                "Trích xuất số lượng tokens tiêu thụ và lưu vào file output.json.",
                "Lưu mã nguồn Python vào tệp phase-3/api_caller.py."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "m3-2",
      title: "JavaScript/TypeScript trong n8n",
      type: "practical",
      estimatedHours: 12,
      description: "Thao tác biến đổi mảng, chuẩn hóa dữ liệu phức tạp trong n8n Code Node",
      lessons: [
        {
          id: "l3-2-1",
          title: "JavaScript/TypeScript trong n8n",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Tìm hiểu cách sử dụng Code Node trong n8n để tùy biến xử lý mảng và biến đổi JSON dữ liệu.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Làm chủ n8n Code Node"
            },
            {
              type: "text",
              content: "n8n cung cấp công cụ `Code Node` cực kỳ mạnh mẽ chạy mã JavaScript trực tiếp để biến đổi dữ liệu giữa các node. Đây là điểm tạo nên sự khác biệt vượt trội của n8n so với Make.com."
            },
            {
              type: "code",
              language: "javascript",
              filename: "Mẫu JavaScript xử lý mảng n8n",
              content: `const items = $input.all();

const processedItems = items.map(item => {
  const rawName = item.json.fullName || "";
  const cleanName = rawName.toUpperCase().trim();
  return {
    json: {
      originalName: rawName,
      cleanedName: cleanName,
      processedAt: new Date().toISOString()
    }
  };
});

return processedItems;`
            }
          ]
        },
        {
          id: "l3-2-2",
          title: "Lab 3.3: JavaScript - n8n Code Node thực hành",
          duration: "3.5 giờ",
          type: "exercise",
          summary: "Thực hành viết các kịch bản JS xử lý mảng, biến đổi định dạng ngày tháng và lọc dữ liệu đơn hàng.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Mục tiêu bài Lab"
            },
            {
              type: "text",
              content: "Viết kịch bản JS xử lý trong n8n: Lọc danh sách đơn hàng chỉ giữ lại đơn có trạng thái 'completed' VÀ có tổng giá trị đơn hàng > 500,000đ."
            },
            {
              type: "checklist",
              title: "Các tiêu chí nghiệm thu bài Lab:",
              items: [
                "Workflow n8n chứa ít nhất 1 Code Node xử lý logic JS.",
                "Dữ liệu đầu ra được lọc chính xác theo điều kiện phức tạp.",
                "Export luồng n8n của bạn ra tệp phase-3/n8n_code_nodes.json."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "m3-3",
      title: "Nghiệp Vụ API, Webhooks & SQL",
      type: "assessment",
      estimatedHours: 18,
      description: "Thực hành thiết kế REST API, Webhooks và lưu trữ cơ sở dữ liệu quan hệ SQL",
      lessons: [
        {
          id: "l3-3-1",
          title: "REST API & Webhooks nâng cao",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Hiểu sâu kiến trúc Webhook Trigger và cơ chế bảo mật xác thực (API Keys, Bearer Tokens).",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Kiến trúc Webhooks nâng cao"
            },
            {
              type: "text",
              content: "Webhook hoạt động theo cơ chế Push. Thay vì ứng dụng gửi request hỏi liên tục (Polling), máy chủ chủ động bắn (Push) dữ liệu tới một đường dẫn URL do bạn cung cấp ngay khi có sự kiện phát sinh. Kỹ thuật này giúp tiết kiệm 95% băng thông và tài nguyên CPU."
            }
          ]
        },
        {
          id: "l3-3-2",
          title: "SQL cơ bản cho Workflow",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Làm chủ các câu lệnh truy vấn quan hệ PostgreSQL cốt lõi phục vụ lưu trữ.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Truy vấn dữ liệu với SQL"
            },
            {
              type: "text",
              content: "SQL (Structured Query Language) là ngôn ngữ tiêu chuẩn để làm việc với các cơ sở dữ liệu quan hệ lớn (PostgreSQL, MySQL). Dưới đây là các câu lệnh bạn bắt buộc phải nằm lòng:"
            },
            {
              type: "code",
              language: "sql",
              filename: "Mẫu câu lệnh SQL tạo bảng & truy vấn",
              content: `-- Tạo bảng mới
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL
);

-- Truy vấn dữ liệu có bộ lọc
SELECT name, email FROM users 
WHERE email LIKE '%@gmail.com' 
ORDER BY name ASC;`
            }
          ]
        },
        {
          id: "l3-3-3",
          title: "Lab 3.4: Webhook Trigger thực hành",
          duration: "3 giờ",
          type: "exercise",
          summary: "Xây dựng luồng tự động hóa n8n sử dụng Webhook Trigger nhận dữ liệu từ script Python gửi tới.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Mục tiêu bài Lab"
            },
            {
              type: "text",
              content: "Dựng node Webhook trong n8n nhận dữ liệu đơn hàng giả lập gửi tới từ một script Python viết bằng thư viện requests."
            },
            {
              type: "checklist",
              title: "Các tiêu chí hoàn thành bài Lab:",
              items: [
                "Script Python thực thi thành công lệnh requests.post gửi tới URL n8n Webhook.",
                "n8n nhận dữ liệu mượt mà, không gặp lỗi CORS hay Authentication.",
                "Lưu mã nguồn gửi dữ liệu vào tệp phase-3/webhook_sender.py."
              ]
            }
          ]
        },
        {
          id: "l3-3-4",
          title: "Lab 3.5: SQL - Supabase thực hành",
          duration: "3 giờ",
          type: "exercise",
          summary: "Tạo dự án đám mây Supabase, thực hành viết lệnh tạo bảng và kết nối đọc/ghi từ n8n.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Mục tiêu bài Lab"
            },
            {
              type: "text",
              content: "Tạo bảng dữ liệu `contacts` trên cơ sở dữ liệu đám mây Supabase và thiết lập n8n node kết nối đọc/ghi thông tin liên hệ."
            },
            {
              type: "checklist",
              title: "Các tiêu chí hoàn thành bài Lab:",
              items: [
                "Có cơ sở dữ liệu Supabase đang hoạt động trực tuyến.",
                "Đã cấu hình thành công PostgreSQL Credentials trong n8n.",
                "Lưu mã lệnh SQL tạo bảng vào tệp phase-3/supabase-queries.sql."
              ]
            }
          ]
        },
        {
          id: "l3-3-5",
          title: "Checkpoint Phase 3: Data Pipeline hoàn chỉnh",
          duration: "5 giờ",
          type: "project",
          summary: "Xây dựng đường ống dẫn dữ liệu tích hợp Python, Webhook, n8n Code Node, OpenAI và Supabase SQL.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🏁 Bài kiểm tra tổng kết Phase 3"
            },
            {
              type: "text",
              content: "Bạn cần xây dựng một đường ống dẫn dữ liệu (Data Pipeline) khép kín: Script Python đẩy thông tin nhận xét thô ➔ Webhook n8n tiếp nhận ➔ n8n Code Node làm sạch text ➔ gọi OpenAI phân tích sắc thái cảm xúc khách hàng ➔ lưu trữ kết quả cấu trúc vào bảng `feedback` trên cơ sở dữ liệu Supabase."
            },
            {
              type: "checklist",
              title: "Tiêu chí vượt qua bài kiểm tra:",
              items: [
                "Nộp đủ 5 tệp tin bài tập Lab tương ứng trong phase-3/.",
                "Đường ống dẫn dữ liệu chạy thành công từ đầu đến cuối.",
                "Có cơ chế xử lý lỗi (Error Handling) khi gọi OpenAI API bị gián đoạn.",
                "Dữ liệu ghi vào bảng Supabase chuẩn xác."
              ]
            }
          ]
        }
      ]
    }
  ]
};
