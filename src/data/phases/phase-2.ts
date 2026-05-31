// src/data/phases/phase-2.ts
import type { Phase } from '@/types/curriculum';
import { phaseThemes } from '../themes';

export const phase2: Phase = {
  id: 2,
  title: "Làm chủ Công cụ No-code n8n & Make",
  subtitle: "Xây dựng các hệ thống tự động hóa luồng dữ liệu (workflows) cấp doanh nghiệp",
  duration: "6-8 tuần",
  pace: "10 giờ/tuần",
  totalHours: 80,
  icon: "⚡",
  theme: phaseThemes[2],
  milestone: "Triển khai thành công 3 hệ thống tự động hóa vận hành thực tế",
  outcome: "Làm chủ Make.com và n8n chuyên sâu, kết nối Webhooks, cơ sở dữ liệu và AI thành chuỗi tự động",
  tools: ["n8n", "Make.com", "Airtable", "Telegram API", "Google Sheets"],
  modules: [
    {
      id: "m2-1",
      title: "Nguyên Lý Tự Động Hóa & Make.com",
      type: "concept",
      estimatedHours: 25,
      description: "Làm quen với khái niệm tự động hóa và nền tảng đám mây Make.com",
      lessons: [
        {
          id: "l2-1-1",
          title: "Workflow Automation là gì?",
          duration: "1 giờ",
          type: "theory",
          summary: "Tìm hiểu kiến trúc một luồng tự động hóa bao gồm Trigger, Action và các Router rẽ nhánh.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "1. Nguyên lý lõi của Tự động hóa"
            },
            {
              type: "text",
              content: "Một luồng công việc tự động (Workflow) bản chất là một chuỗi các hành động liên hoàn được kích hoạt tự động mà không cần sự can thiệp thủ công của con người. Cấu trúc cơ bản luôn tuân thủ nguyên lý:"
            },
            {
              type: "callout",
              variant: "tip",
              title: "Công thức cốt lõi",
              content: "TRIGGER (Sự kiện kích hoạt) ➔ CONDITION (Điều kiện kiểm tra) ➔ ACTIONS (Các hành động thực thi tiếp theo)"
            },
            {
              type: "heading",
              level: 3,
              content: "Ví dụ thực tế"
            },
            {
              type: "text",
              content: "Khi có khách hàng điền Form đăng ký (Trigger), hệ thống tự động kiểm tra xem số điện thoại có hợp lệ không (Condition), nếu hợp lệ thì tự động thêm vào CRM và gửi email chào mừng (Actions)."
            }
          ]
        },
        {
          id: "l2-1-2",
          title: "Make.com từ Zero đến Proficient",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Làm chủ nền tảng tự động hóa đám mây Make.com, Scenarios và Connections.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Make.com là gì?"
            },
            {
              type: "text",
              content: "Make.com (trước đây là Integromat) là nền tảng tự động hóa dạng đám mây (SaaS) hàng đầu thế giới. Giao diện thiết kế trực quan bóng bong kéo thả giúp bạn dễ dàng kết nối hàng ngàn ứng dụng phổ biến như Google Sheets, Airtable, Gmail, Facebook, Slack."
            },
            {
              type: "callout",
              variant: "info",
              title: "Các thuật ngữ cốt lõi",
              content: "**Scenario**: Một kịch bản tự động hóa hoàn chỉnh.\n\n**Module**: Một node đại diện cho 1 app cụ thể (ví dụ Google Sheets module).\n\n**Operations (Ops)**: Số lượt thực thi xử lý dữ liệu của các node (Make dùng ops để tính chi phí hằng tháng)."
            }
          ]
        },
        {
          id: "l2-1-3",
          title: "Lab 2.1: Cài đặt Môi trường & Khởi động",
          duration: "2 giờ",
          type: "exercise",
          summary: "Khởi tạo tài khoản Make.com và thiết lập môi trường n8n chạy local phục vụ thực hành.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu thực hành"
            },
            {
              type: "text",
              content: "Chuẩn bị sẵn sàng hai công cụ tự động hóa mạnh mẽ nhất hiện nay trên máy tính của bạn."
            },
            {
              type: "steps",
              title: "Các bước thực hiện:",
              steps: [
                {
                  number: 1,
                  title: "Đăng ký Make.com",
                  description: "Truy cập make.com, đăng ký một tài khoản miễn phí (Free Tier)."
                },
                {
                  number: 2,
                  title: "Cài đặt n8n cục bộ",
                  description: "Mở Terminal/Command Prompt và gõ lệnh: `npx n8n` để chạy n8n ngay trên máy tính của bạn."
                },
                {
                  number: 3,
                  title: "Xác nhận kết nối",
                  description: "Mở trình duyệt tại địa chỉ http://localhost:5678 để đăng ký tài khoản admin n8n cục bộ."
                }
              ]
            }
          ]
        },
        {
          id: "l2-1-4",
          title: "Lab 2.2: Scenario 'Hello World' trên Make",
          duration: "2.5 giờ",
          type: "exercise",
          summary: "Xây dựng kịch bản tự động đầu tiên trên Make sử dụng Webhooks và HTTP requests.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu thực hành"
            },
            {
              type: "text",
              content: "Tạo một Scenario trên Make nhận dữ liệu văn bản thô từ webhook, gọi API dịch giả để dịch sang tiếng Anh và trả về kết quả."
            },
            {
              type: "checklist",
              title: "Các công việc cần hoàn thành:",
              items: [
                "Tạo mới Scenario trên Make.com.",
                "Thêm Module Custom Webhook làm Trigger nhận tin nhắn.",
                "Kết nối với Module Google Translate để dịch ngôn ngữ.",
                "Thêm Module Webhook Response để trả dữ liệu dịch về màn hình trình duyệt.",
                "Lưu tệp export kịch bản Scenario vào thư mục phase-2/."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "m2-2",
      title: "Làm Chủ n8n - Trái Tim Của Workflow",
      type: "practical",
      estimatedHours: 35,
      description: "Làm chủ n8n chuyên sâu, routers, iterators, và xử lý lỗi dữ liệu phức tạp",
      lessons: [
        {
          id: "l2-2-1",
          title: "n8n: Self-hosted Automation Powerhouse",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Tìm hiểu tại sao n8n là công cụ tự động hóa mã nguồn mở mạnh mẽ nhất hiện nay.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Tại sao nên chọn n8n?"
            },
            {
              type: "text",
              content: "Khác biệt lớn nhất của n8n so với Make.com hay Zapier là tính chất **mã nguồn mở (open-source)**. Bạn có thể tự triển khai (self-host) n8n trên máy chủ riêng (VPS) hoàn toàn miễn phí, không giới hạn số lượng bước thực thi dữ liệu hằng tháng."
            },
            {
              type: "callout",
              variant: "important",
              title: "Lợi thế kỹ thuật",
              content: "n8n cho phép bạn viết trực tiếp các đoạn mã JavaScript/TypeScript vào trong luồng để thao tác và làm sạch dữ liệu, vượt trội hoàn toàn so với việc cấu hình thủ công phức tạp của Make."
            }
          ]
        },
        {
          id: "l2-2-2",
          title: "n8n Core Nodes & Giao diện",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Làm chủ các node xử lý logic quan trọng trong n8n: IF, Switch, Merge, Set.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Các khối logic cốt lõi của n8n"
            },
            {
              type: "bullets",
              items: [
                "**Set Node**: Định nghĩa, đổi tên hoặc gán giá trị mới cho các biến dữ liệu trung gian.",
                "**IF/Switch Node**: Rẽ nhánh luồng chạy dựa trên điều kiện so sánh số hoặc văn bản.",
                "**Merge Node**: Gom dữ liệu từ nhiều nhánh chạy khác nhau trở lại một luồng thống nhất.",
                "**HTTP Request Node**: Trái tim kết nối, giúp gọi bất kỳ API bên thứ ba nào không có sẵn app tích hợp."
              ]
            }
          ]
        },
        {
          id: "l2-2-3",
          title: "Lab 2.3: Workflow n8n đầu tiên (Joke API)",
          duration: "3 giờ",
          type: "exercise",
          summary: "Tự dựng luồng n8n tự động lấy truyện cười từ API công cộng và xuất bản kết quả.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu thực hành"
            },
            {
              type: "text",
              content: "Xây dựng luồng tự động định kỳ gọi API truyện cười, trích xuất hai thành phần setup và punchline và lưu vào tệp dữ liệu."
            },
            {
              type: "steps",
              title: "Các bước thực hiện:",
              steps: [
                {
                  number: 1,
                  title: "Kéo thả Trigger",
                  description: "Chọn node Schedule Trigger chạy tự động."
                },
                {
                  number: 2,
                  title: "Gọi API",
                  description: "Kéo node HTTP Request gọi API GET địa chỉ 'https://official-joke-api.appspot.com/random_joke'."
                },
                {
                  number: 3,
                  title: "Format cấu trúc",
                  description: "Dùng node Set để gom trường dữ liệu truyện cười gọn gàng và ghi chép lại kết quả."
                }
              ]
            }
          ]
        },
        {
          id: "l2-2-4",
          title: "Lab 2.4: Router & Điều kiện rẽ nhánh",
          duration: "4 giờ",
          type: "exercise",
          summary: "Thực hành thiết lập điều kiện so sánh rẽ nhánh phức tạp trong luồng dữ liệu n8n.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu thực hành"
            },
            {
              type: "text",
              content: "Xây dựng luồng webhook nhận điểm số học viên từ form, rẽ làm 3 nhánh phân loại học lực: Xuất sắc (đạt >= 9), Đạt (đạt >= 5), Học lại (dưới 5)."
            },
            {
              type: "checklist",
              title: "Tiêu chí nộp bài:",
              items: [
                "Sử dụng node Switch hoặc 2 node IF ghép nối liên hoàn.",
                "Đã kiểm thử thành công trên cả 3 trường hợp điểm số mẫu.",
                "Export tệp JSON workflow lưu vào phase-2/lab-2.4-router.json."
              ]
            }
          ]
        },
        {
          id: "l2-2-5",
          title: "Lab 2.5: Iterator & Lặp danh sách",
          duration: "4 giờ",
          type: "exercise",
          summary: "Thực hành kỹ năng duyệt danh sách (Iterator/Loop) nâng cao để xử lý nhiều bản ghi dữ liệu cùng lúc.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu thực hành"
            },
            {
              type: "text",
              content: "Duyệt qua danh sách 5 khách hàng tiềm năng nhận được, với mỗi khách hàng thực hiện sinh lời chào cá nhân hóa và gom lại thành một danh sách gửi đi."
            },
            {
              type: "steps",
              title: "Quy trình thực hiện:",
              steps: [
                {
                  number: 1,
                  title: "Nhận danh sách",
                  description: "Kéo node Mock Data tạo danh sách 5 tên học viên thô."
                },
                {
                  number: 2,
                  title: "Duyệt từng phần tử",
                  description: "Sử dụng node 'Split In Batches' của n8n làm Iterator lặp qua từng dòng dữ liệu."
                },
                {
                  number: 3,
                  title: "Lắp ráp lời chào",
                  description: "Dùng node Set tạo chuỗi lời chào cá nhân hóa cho từng học viên."
                }
              ]
            }
          ]
        },
        {
          id: "l2-2-6",
          title: "Lab 2.6: Error Handling & Retry Logic",
          duration: "4 giờ",
          type: "exercise",
          summary: "Thiết lập cơ chế tự động thử lại (Retry) và xử lý lỗi khi gọi các API bên ngoài không ổn định.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu thực hành"
            },
            {
              type: "text",
              content: "Cấu hình luồng tự động gọi API bị lỗi 500, kích hoạt chế độ tự động thử lại 3 lần, nếu vẫn thất bại thì đẩy cảnh báo lỗi qua Slack/Telegram."
            },
            {
              type: "checklist",
              title: "Các công việc cần hoàn thành:",
              items: [
                "Gọi API thử nghiệm lỗi tại 'https://httpstat.us/500'.",
                "Mở cài đặt nâng cao của node (Settings) ➔ Kích hoạt 'Retry on Failure' (3 lần).",
                "Sử dụng nhánh Error Trigger để bắt lỗi và đẩy cảnh báo telegram.",
                "Export tệp JSON workflow lưu vào phase-2/lab-2.6-error-handling.json."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "m2-3",
      title: "Tích Hợp AI Thực Chiến",
      type: "practical",
      estimatedHours: 20,
      description: "Ứng dụng các mô hình tích hợp AI kết nối tự động vào luồng quy trình vận hành thực tế",
      lessons: [
        {
          id: "l2-3-1",
          title: "5 AI Integration Patterns",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Khám phá 5 mô hình tích hợp AI cốt lõi: Phân loại, Trích xuất, Sinh nội dung, QC, và Điều hướng.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "5 mô hình tích hợp AI cốt lõi trong doanh nghiệp"
            },
            {
              type: "bullets",
              items: [
                "**Classification (Phân loại)**: AI đọc văn bản và gán nhãn phân loại sắc thái hoặc danh mục.",
                "**Extraction (Trích xuất)**: AI tìm và bóc tách thông tin thô (số điện thoại, ngày tháng) ra định dạng JSON cấu trúc.",
                "**Generation (Sinh nội dung)**: AI tự động viết bài, soạn thảo thư trả lời dựa trên dữ liệu gợi ý.",
                "**Quality Control (QC - Giám sát)**: AI đóng vai trò người kiểm duyệt duyệt lại chất lượng bài viết hoặc lọc thư rác.",
                "**Routing (Điều hướng)**: AI phân tích ý định người dùng (Intent) để rẽ nhánh luồng xử lý phù hợp."
              ]
            }
          ]
        },
        {
          id: "l2-3-2",
          title: "Lab 2.7: Tích hợp AI Email Classifier",
          duration: "4 giờ",
          type: "exercise",
          summary: "Xây dựng hệ thống tự động nhận email, gọi OpenAI phân loại độ khẩn cấp và sắc thái email.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu thực hành"
            },
            {
              type: "text",
              content: "Xây dựng workflow hoàn chỉnh kết hợp n8n Webhook và OpenAI Chat Node: trích xuất độ khẩn cấp từ email gửi đến, nếu Khẩn cấp (High Urgency) thì tự động gửi cảnh báo khẩn qua Telegram."
            },
            {
              type: "steps",
              title: "Quy trình thực hiện:",
              steps: [
                {
                  number: 1,
                  title: "Thiết lập Webhook",
                  description: "Tạo webhook trigger nhận email mẫu thử."
                },
                {
                  number: 2,
                  title: "Gọi OpenAI Node",
                  description: "Kéo node OpenAI, kết nối API Key và đưa System Prompt phân loại sắc thái vào."
                },
                {
                  number: 3,
                  title: "Rẽ nhánh cảnh báo",
                  description: "Dùng node IF kiểm tra độ khẩn cấp, gửi tin nhắn Telegram báo cho CSKH nếu khẩn cấp."
                }
              ]
            }
          ]
        },
        {
          id: "l2-3-3",
          title: "Checkpoint Phase 2: Workflow 'Daily News Digest' tự động",
          duration: "5 giờ",
          type: "project",
          summary: "Dự án lớn tổng kết Phase 2: xây dựng hệ thống tự động thu thập tin tức, gọi AI tóm tắt thông tin hằng ngày.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🏁 Bài kiểm tra tổng kết Phase 2"
            },
            {
              type: "text",
              content: "Bạn cần xây dựng hoàn chỉnh một hệ thống tự động hóa 'Daily News Digest' tự động kích hoạt hằng ngày lúc 8:00 sáng, quét 5 tin tức mới nhất từ RSS Feed, gọi AI dịch và tóm tắt ngắn gọn từng tin dưới dạng danh mục JSON, sau đó xuất bản thành một trang báo cáo gửi qua email."
            },
            {
              type: "checklist",
              title: "Tiêu chí vượt qua bài kiểm tra:",
              items: [
                "Nộp đủ 7 tệp tin bài tập Lab tương ứng trong phase-2/.",
                "Hệ thống tự động hóa chạy hoàn toàn tự động theo lịch hẹn giờ.",
                "Tích hợp thành công vòng lặp Iterator xử lý từng bài viết riêng biệt.",
                "Có cơ chế xử lý lỗi (Error Handling) ngăn chặn sập luồng khi gọi API bên ngoài bị lỗi."
              ]
            }
          ]
        }
      ]
    }
  ]
};
