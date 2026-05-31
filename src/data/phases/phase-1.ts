// src/data/phases/phase-1.ts
import type { Phase } from '@/types/curriculum';
import { phaseThemes } from '../themes';

export const phase1: Phase = {
  id: 1,
  title: "Nền tảng AI & Kỹ thuật Prompt",
  subtitle: "Hiểu sâu cơ chế LLM, làm chủ prompt engineering nâng cao và gọi API",
  duration: "4-6 tuần",
  pace: "10 giờ/tuần",
  totalHours: 50,
  icon: "🧠",
  theme: phaseThemes[1],
  milestone: "Gọi thành công API & thiết lập 5 Prompt Templates thực chiến",
  outcome: "Làm chủ các mô hình suy luận, thiết lập cấu trúc Prompts tối ưu hóa và xuất bản dữ liệu dạng JSON",
  tools: ["OpenAI API", "Claude API", "Postman", "Playground"],
  modules: [
    {
      id: "m1-1",
      title: "Cơ Chế Hoạt Động Của LLM",
      type: "concept",
      estimatedHours: 12,
      description: "Thấu hiểu Token, Context Window và các siêu tham số điều khiển AI",
      lessons: [
        {
          id: "l1-1-1",
          title: "LLM Hoạt động Như Thế Nào? (Token, Context, Temp)",
          duration: "1 giờ",
          type: "theory",
          summary: "Tìm hiểu nguyên lý dự đoán token tiếp theo, khái niệm context window và siêu tham số Temperature.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "1. Nguyên lý hoạt động của LLM"
            },
            {
              type: "text",
              content: "Các mô hình ngôn ngữ lớn (LLM - Large Language Models) bản chất là **hệ thống dự đoán từ tiếp theo cực kỳ tinh vi**. Khi bạn gửi một chuỗi văn bản đầu vào (Prompt), mô hình sẽ tách chuỗi này thành các đơn vị nhỏ gọi là **Tokens**, tính toán xác suất và sinh ra token tiếp theo có khả năng xuất hiện cao nhất."
            },
            {
              type: "callout",
              variant: "important",
              title: "Token là gì?",
              content: "Token không phải là một từ hoàn chỉnh. Một token tương đương khoảng 4 ký tự hoặc 0.75 từ trong tiếng Anh. Đối với tiếng Việt, do cấu trúc có dấu phức tạp, một từ thường bị tách thành 1.5 đến 3 tokens. Đây là lý do chi phí xử lý tiếng Việt qua API luôn cao hơn tiếng Anh."
            },
            {
              type: "heading",
              level: 3,
              content: "Context Window và Temperature"
            },
            {
              type: "text",
              content: "**Context Window (Cửa sổ ngữ cảnh)**: Là giới hạn lượng token tối đa mà mô hình có thể ghi nhớ và xử lý trong một lượt gọi duy nhất. Ví dụ, GPT-4o có cửa sổ 128,000 tokens, trong khi Gemini 2.5 Pro hỗ trợ lên tới 1,000,000+ tokens.\n\n**Temperature (Nhiệt độ)**: Là tham số điều khiển độ ngẫu nhiên của câu trả lời, nhận giá trị từ 0.0 đến 2.0:"
            },
            {
              type: "bullets",
              items: [
                "**Temp thấp (0.0 - 0.3)**: Câu trả lời mang tính chính xác cao, nhất quán, phù hợp với các tác vụ logic, xử lý dữ liệu hoặc trích xuất thông tin.",
                "**Temp trung bình (0.5 - 0.7)**: Cân bằng giữa tính nhất quán và sáng tạo, thích hợp cho việc viết blog, soạn email.",
                "**Temp cao (0.8 - 1.2)**: Câu trả lời bay bổng, bất ngờ, thích hợp cho brainstorming ý tưởng."
              ]
            }
          ]
        },
        {
          id: "l1-1-2",
          title: "Các model phổ biến và khi nào dùng",
          duration: "1 giờ",
          type: "theory",
          summary: "Phân loại các mô hình AI lớn hiện nay và tiêu chí lựa chọn cho từng quy trình công việc.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Bảng phân loại mô hình AI thực chiến"
            },
            {
              type: "text",
              content: "Không có mô hình nào là tốt nhất cho mọi tác vụ. Một AI Workflow Designer xuất sắc luôn biết cách chọn mô hình phù hợp để tối ưu hóa cả **chi phí** lẫn **chất lượng**."
            },
            {
              type: "table",
              headers: ["Họ mô hình", "Mô hình đại diện", "Thế mạnh nổi bật", "Tác vụ phù hợp nhất"],
              rows: [
                ["OpenAI", "GPT-4o-mini", "Cực kỳ nhanh, giá rẻ, hỗ trợ JSON tốt", "Phân loại đơn hàng, trích xuất dữ liệu thô"],
                ["OpenAI", "gpt-4o", "Suy luận toán học giỏi, phân tích đa phương tiện", "Báo cáo tài chính, kiểm toán dữ liệu phức tạp"],
                ["Anthropic", "Claude 3.5 Sonnet", "Viết văn bản tự nhiên, sửa lỗi code tốt nhất", "Viết bài luận tiếp thị, tối ưu hóa script code"],
                ["Google", "Gemini 2.5 Flash", "Context window cực lớn, giá cực rẻ", "Tóm tắt sách, xử lý toàn bộ audio/video dài"]
              ]
            }
          ]
        }
      ]
    },
    {
      id: "m1-2",
      title: "Kỹ Thuật Prompt Engineering Chuyên Sâu",
      type: "concept",
      estimatedHours: 18,
      description: "Thực hành Few-shot, System Prompts, Structured Output và Chain of Thought",
      lessons: [
        {
          id: "l1-2-1",
          title: "Prompt Engineering - Từ Cơ bản đến Nâng cao",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Làm chủ từ Zero-shot đến Few-shot prompting giúp AI trả lời chính xác theo khuôn mẫu.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Từ Zero-shot đến Few-shot Prompting"
            },
            {
              type: "text",
              content: "**Zero-shot Prompting**: Là cách viết prompt trực tiếp yêu cầu AI làm việc mà không đưa ra bất kỳ ví dụ mẫu nào. Cách này phù hợp với các tác vụ đơn giản, quen thuộc.\n\n**Few-shot Prompting (Prompt kèm ví dụ)**: Là việc cung cấp cho AI từ 2 đến 5 ví dụ mẫu có sẵn cả đầu vào (input) và kết quả mong muốn (output). Đây là vũ khí mạnh nhất giúp kiểm soát phong cách và định dạng phản hồi của mô hình."
            },
            {
              type: "callout",
              variant: "example",
              title: "Ví dụ Few-shot phân tích sắc thái nhận xét",
              content: "Hãy phân tích sắc thái nhận xét của khách hàng.\n\nVí dụ 1:\nNhận xét: 'Hàng giao nhanh nhưng hộp hơi móp.'\nSắc thái: Trung lập\n\nVí dụ 2:\nNhận xét: 'Dịch vụ quá tệ, sẽ không bao giờ quay lại!'\nSắc thái: Tiêu cực\n\nVí dụ 3:\nNhận xét: 'Màu áo rất đẹp, mặc ôm vừa vặn.'\nSắc thái: Tích cực"
            }
          ]
        },
        {
          id: "l1-2-2",
          title: "Few-shot Prompting & System Prompts",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Cấu trúc thiết lập System Prompts quy định vai trò, giới hạn hoạt động và hành vi cho AI.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Thiết kế System Prompts chuyên nghiệp"
            },
            {
              type: "text",
              content: "System Prompt là lớp chỉ dẫn nền tảng cấu hình hành vi của AI trước khi nhận câu hỏi của người dùng. Một System Prompt chuẩn bao gồm 4 phần:"
            },
            {
              type: "numbered",
              items: [
                "**Định vị vai trò (Role)**: Bạn là chuyên viên hỗ trợ kỹ thuật n8n cấp cao.",
                "**Bối cảnh công việc (Context)**: Bạn trả lời các câu hỏi thắc mắc của học viên trong lớp tự động hóa.",
                "**Quy tắc bắt buộc (Constraints)**: Chỉ trả lời các câu hỏi liên quan đến kỹ thuật. Không trả lời câu hỏi xã hội. Luôn xưng hô thân thiện.",
                "**Định dạng đầu ra (Output format)**: Viết câu trả lời ngắn gọn trong dưới 150 từ, dùng bullet points cho các bước kỹ thuật."
              ]
            }
          ]
        },
        {
          id: "l1-2-3",
          title: "Structured Output JSON",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Hướng dẫn ép AI trả về dữ liệu chuẩn JSON để kết nối mượt mà với các API và Databases khác.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Tại sao cần Structured Output?"
            },
            {
              type: "text",
              content: "Trong một luồng tự động hóa (workflow), các node sau cần đọc dữ liệu từ các node trước. Nếu AI trả về một bài văn xuôi tự nhiên, các công cụ tự động hóa sẽ không thể hiểu được. Ép AI trả về định dạng **JSON** là bắt buộc."
            },
            {
              type: "code",
              language: "json",
              filename: "Mẫu JSON output mong muốn",
              content: `{
  "customer_name": "Nguyễn Văn A",
  "order_id": "ORD-9982",
  "urgency": "high",
  "detected_issues": ["giao sai màu", "mất nút áo"]
}`
            },
            {
              type: "callout",
              variant: "tip",
              title: "Mẹo ép JSON",
              content: "Hãy luôn viết ở cuối prompt: 'Trả về DUY NHẤT một chuỗi JSON hợp lệ theo định dạng cấu trúc dưới đây. Không thêm bất kỳ văn bản giải thích nào trước hoặc sau khối JSON đó.'"
            }
          ]
        },
        {
          id: "l1-2-4",
          title: "Chain of Thought & Suy luận",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Tận dụng kỹ thuật kích thích AI suy luận từng bước (Chain of Thought) để giải bài toán phức tạp.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Chain of Thought (CoT) là gì?"
            },
            {
              type: "text",
              content: "Nếu bạn yêu cầu AI trả lời ngay một bài toán logic phức tạp, xác suất sai sót sẽ rất cao. Thay vào đó, hãy kích hoạt cơ chế tự suy luận từng bước của nó bằng cách viết câu lệnh thần chú: **'Hãy suy nghĩ từng bước một trước khi đưa ra câu trả lời cuối cùng'**."
            },
            {
              type: "callout",
              variant: "info",
              title: "Lợi ích thực tế",
              content: "Cách làm này cho phép AI phân bổ thêm lực tính toán (tokens dự đoán) để phân tích các khía cạnh trung gian, tương tự như cách con người nháp trước khi viết lời giải."
            }
          ]
        }
      ]
    },
    {
      id: "m1-3",
      title: "API & Thực Hành Nền Tảng",
      type: "practical",
      estimatedHours: 20,
      description: "Thực hành gọi API, so sánh tham số, đếm tokens và xây dựng trợ lý AI đầu tiên",
      lessons: [
        {
          id: "l1-3-1",
          title: "REST API & Webhooks Cơ bản",
          duration: "1 giờ",
          type: "theory",
          summary: "Hiểu cách thức các ứng dụng phần mềm trò chuyện với nhau qua môi trường Internet.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Nguyên lý giao tiếp API"
            },
            {
              type: "text",
              content: "API (Application Programming Interface) là cổng kết nối giúp hai phần mềm truyền dữ liệu qua lại. Đối với AI Workflow, bạn sẽ thường xuyên sử dụng phương thức **POST** để đẩy prompt lên máy chủ AI và nhận về văn bản."
            },
            {
              type: "table",
              headers: ["Phương thức", "Ý nghĩa", "Ví dụ thực tế trong workflow"],
              rows: [
                ["GET", "Lấy dữ liệu từ máy chủ", "Tải danh sách khách hàng từ Google Sheets"],
                ["POST", "Tạo mới dữ liệu trên máy chủ", "Gửi tin nhắn thông báo lên Slack"],
                ["PUT", "Cập nhật dữ liệu cũ", "Sửa trạng thái đơn hàng thành 'Đã giao'"],
                ["DELETE", "Xóa bản ghi dữ liệu", "Hủy lịch hẹn cũ của khách hàng"]
              ]
            }
          ]
        },
        {
          id: "l1-3-2",
          title: "Lab 1.1: Đếm Token và Ước tính Chi phí",
          duration: "2 giờ",
          type: "exercise",
          summary: "Sử dụng công cụ Tokenizer để tính toán số lượng tokens và quy đổi chi phí API thực tế.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu thực hành"
            },
            {
              type: "text",
              content: "Hiểu rõ cách hệ thống AI tính tiền dịch vụ theo dung lượng chữ gửi lên."
            },
            {
              type: "steps",
              title: "Các bước thực hiện:",
              steps: [
                {
                  number: 1,
                  title: "Mở Tokenizer",
                  description: "Truy cập công cụ platform.openai.com/tokenizer trên trình duyệt."
                },
                {
                  number: 2,
                  title: "Đo lường từ khóa",
                  description: "Dán một đoạn văn bản tiếng Việt dài 200 chữ và ghi chép lại số lượng tokens hiển thị."
                },
                {
                  number: 3,
                  title: "Tính toán chi phí",
                  description: "Quy đổi chi phí dựa trên đơn giá $0.15/1 triệu tokens của model GPT-4o-mini."
                }
              ]
            },
            {
              type: "checklist",
              title: "Tiêu chí nộp bài:",
              items: [
                "Tạo file phase-1/lab-1.1-token-counting.md.",
                "Có bảng so sánh dung lượng token giữa tiếng Anh và tiếng Việt.",
                "Ghi chép công thức tính toán chi phí API rõ ràng."
              ]
            }
          ]
        },
        {
          id: "l1-3-3",
          title: "Lab 1.2: So sánh Temperature",
          duration: "2 giờ",
          type: "exercise",
          summary: "Thực hành thay đổi tham số Temperature trong OpenAI Playground và phân tích kết quả.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu thực hành"
            },
            {
              type: "text",
              content: "Quan sát trực tiếp sự biến đổi phong cách trả lời của AI khi thay đổi tham số Temperature."
            },
            {
              type: "checklist",
              title: "Các việc cần hoàn thành:",
              items: [
                "Mở OpenAI Playground hoặc dùng giao diện API chat.",
                "Chạy prompt: 'Viết 3 slogan cho thương hiệu cà phê hữu cơ' với Temp = 0.0 (chạy 3 lần).",
                "Chạy lại prompt trên với Temp = 1.2 (chạy 3 lần).",
                "Phân tích sự khác biệt về độ đa dạng từ ngữ giữa hai nhóm kết quả.",
                "Lưu tệp báo cáo vào phase-1/lab-1.2-temperature-comparison.md."
              ]
            }
          ]
        },
        {
          id: "l1-3-4",
          title: "Lab 1.3: Viết Prompt phân loại Email",
          duration: "3 giờ",
          type: "exercise",
          summary: "Xây dựng prompt few-shot phân loại các email gửi đến của khách hàng vào các hòm thư chuyên trách.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu thực hành"
            },
            {
              type: "text",
              content: "Viết một prompt Few-shot hoàn chỉnh có khả năng phân loại 10 email khách hàng ngẫu nhiên thành 5 danh mục: Đổi trả, Hỏi giá, Khiếu nại, Hợp tác, Spam."
            },
            {
              type: "steps",
              title: "Quy trình thực hiện:",
              steps: [
                {
                  number: 1,
                  title: "Biên soạn mẫu thử",
                  description: "Tạo danh sách 10 email khách hàng giả lập với các thái độ và nội dung khác nhau."
                },
                {
                  number: 2,
                  title: "Viết Prompt Few-shot",
                  description: "Định nghĩa rõ danh mục kèm 3 ví dụ mẫu hướng dẫn phân loại."
                },
                {
                  number: 3,
                  title: "Đo lường độ chính xác",
                  description: "Chạy thử nghiệm và tính tỷ lệ phân loại đúng của AI."
                }
              ]
            }
          ]
        },
        {
          id: "l1-3-5",
          title: "Lab 1.4: Structured Output JSON thực tế",
          duration: "3 giờ",
          type: "exercise",
          summary: "Thiết kế prompt trích xuất thông tin liên hệ từ cuộc hội thoại thô xuất ra định dạng JSON hợp lệ.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu thực hành"
            },
            {
              type: "text",
              content: "Trích xuất thông tin khách hàng từ đoạn chat tự do thành một chuỗi JSON chuẩn."
            },
            {
              type: "code",
              language: "json",
              filename: "Cấu trúc JSON đầu ra bắt buộc",
              content: `{
  "name": "string",
  "phone": "string",
  "address": "string",
  "interested_product": "string"
}`
            },
            {
              type: "checklist",
              title: "Các tiêu chí nghiệm thu bài Lab:",
              items: [
                "Prompt bắt buộc ép AI xuất đúng định dạng JSON.",
                "Đã kiểm tra chuỗi JSON đầu ra qua công cụ JsonLint.",
                "Lưu tệp tin giải pháp vào phase-1/lab-1.4-structured-output.md."
              ]
            }
          ]
        },
        {
          id: "l1-3-6",
          title: "Lab 1.5: Gọi API lần đầu (curl / Postman)",
          duration: "3 giờ",
          type: "exercise",
          summary: "Thực hành gọi API OpenAI trực tiếp từ Command Line bằng curl hoặc công cụ Postman.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu thực hành"
            },
            {
              type: "text",
              content: "Thực hiện thành công một request HTTP POST gửi tới OpenAI API Endpoint từ terminal của bạn."
            },
            {
              type: "code",
              language: "bash",
              filename: "Lệnh curl thực thi mẫu",
              content: `curl https://api.openai.com/v1/chat/completions \\
  -H "Authorization: Bearer sk-YOUR-KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "user", "content": "Hello AI!"}
    ]
  }'`
            },
            {
              type: "steps",
              title: "Quy trình thực thi:",
              steps: [
                {
                  number: 1,
                  title: "Lấy API Key",
                  description: "Đăng nhập platform.openai.com và tạo một API Key mới."
                },
                {
                  number: 2,
                  title: "Chạy lệnh curl",
                  description: "Thay API Key của bạn vào câu lệnh trên và chạy trên Terminal."
                },
                {
                  number: 3,
                  title: "Lưu trữ log response",
                  description: "Sao chép toàn bộ chuỗi JSON phản hồi nhận được lưu vào file phase-1/lab-1.5-first-api-call.md."
                }
              ]
            }
          ]
        },
        {
          id: "l1-3-7",
          title: "Checkpoint Phase 1: AI Trợ lý Phân tích Đơn hàng",
          duration: "4 giờ",
          type: "project",
          summary: "Xây dựng hệ thống prompts chuyên nghiệp trích xuất dữ liệu đơn hàng phức tạp ra định dạng JSON.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🏁 Bài kiểm tra tổng kết Phase 1"
            },
            {
              type: "text",
              content: "Bạn cần đóng vai trò là một AI Workflow Designer xây dựng System Prompt cốt lõi cho một chatbot 'AI Order Assistant' tự động đọc các tin nhắn chốt đơn của khách hàng, trích xuất dữ liệu cấu trúc phức tạp."
            },
            {
              type: "checklist",
              title: "Tiêu chí nghiệm thu Checkpoint:",
              items: [
                "Nộp đủ 5 bài Lab tương ứng trong thư mục phase-1/.",
                "System Prompt có khả năng xử lý các tin nhắn đơn hàng có nhiều sản phẩm.",
                "Kết quả xuất ra luôn là JSON hợp lệ, không chứa ký tự thừa.",
                "Đã kiểm thử thành công trên 5 ca kiểm thử thực tế khác nhau."
              ]
            }
          ]
        }
      ]
    }
  ]
};
