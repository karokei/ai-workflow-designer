// src/data/phases/phase-6.ts
import type { Phase } from '@/types/curriculum';
import { phaseThemes } from '../themes';

export const phase6: Phase = {
  id: 6,
  title: "Chuyên sâu & Chuyên biệt hóa",
  subtitle: "Tìm kiếm ngách dịch vụ độc quyền, tối ưu hóa chi phí vận hành và đóng gói sản phẩm thương mại hóa chuyên nghiệp",
  duration: "8-12 tuần",
  pace: "10 giờ/tuần",
  totalHours: 80,
  icon: "⭐",
  theme: phaseThemes[6],
  milestone: "Đóng gói thành công 1 sản phẩm tự động hóa thương mại và thực hiện demo thuyết trình cho 3 khách hàng thực tế",
  outcome: "Làm chủ kỹ năng Fine-tuning, xây dựng hệ thống đánh giá AI tự động (Evaluation System), thiết kế pricing model chuyên nghiệp",
  tools: ["LLM Evaluation Pipeline", "Redis Caching", "Cost Optimization Router", "Pitch Deck Template"],
  modules: [
    {
      id: "m6-1",
      title: "Chọn Ngách & Tối Ưu Nâng Cao",
      type: "concept",
      estimatedHours: 30,
      description: "Định hình ngách dịch vụ độc quyền và áp dụng các kỹ thuật bảo mật, nén chi phí vận hành AI",
      lessons: [
        {
          id: "l6-1-1",
          title: "Chọn ngách Chuyên biệt",
          duration: "2 giờ",
          type: "theory",
          summary: "Tìm hiểu tại sao định vị ngách chuyên sâu (Niche Selection) giúp tăng giá trị dịch vụ lên gấp 5 lần.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Tại sao nên chọn ngách chuyên biệt?"
            },
            {
              type: "text",
              content: "Khi mới bắt đầu học, bạn có thể nhận mọi loại dự án tự động hóa để tích lũy kinh nghiệm. Tuy nhiên, để có thể định giá dịch vụ ở mức cao ($2,000–$5,000/tháng/dự án) và tối ưu hóa năng suất triển khai, bạn bắt buộc phải chọn **một ngành dọc chuyên sâu** (Niche Selection):\n\n- Hiểu sâu sắc thuật ngữ chuyên ngành, nỗi đau vận hành sâu kín và các phần mềm chuyên dụng mà ngành đó đang dùng.\n- Tái sử dụng được 80% các template workflow đã xây dựng cho nhiều khách hàng khác nhau trong cùng ngành, giúp biên lợi nhuận của bạn cực kỳ cao."
            },
            {
              type: "callout",
              variant: "example",
              title: "Các ngách tự động hóa AI tiềm năng",
              content: "**E-commerce & Retail**: Đồng bộ tồn kho tự động đa sàn, tự động gửi mã giảm giá dựa trên hành vi mua hàng.\n\n**Finance & Accounting**: Tự động hóa hóa đơn đầu vào đầu ra, đối chiếu ngân hàng tự động, báo cáo dòng tiền thời gian thực.\n\n**HR & Recruitment**: Tự động quét CV ứng viên bằng AI, tự động lên lịch phỏng vấn và gửi bài test năng lực."
            }
          ]
        },
        {
          id: "l6-1-2",
          title: "Chủ đề Nâng cao (Fine-tuning, Evaluation, Cost Optimization, Security)",
          duration: "2.5 giờ",
          type: "theory",
          summary: "Làm chủ kỹ thuật nén chi phí gọi mô hình, bảo mật thông tin nhạy cảm và đánh giá sai số của AI.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Kỹ thuật tối ưu hóa chi phí AI (Cost Compression)"
            },
            {
              type: "bullets",
              items: [
                "**Model Routing**: Thiết lập cổng lọc điều hướng câu hỏi: các câu hỏi đơn giản gửi tới GPT-4o-mini, chỉ chuyển các câu khó cần logic phức tạp tới GPT-4o.",
                "**Caching**: Lưu trữ các câu trả lời của các câu hỏi FAQ tương tự vào Redis/Database để trả kết quả ngay lập tức mà không cần gọi API OpenAI ở lần tiếp theo.",
                "**Prompt Compression**: Lọc bỏ các từ thừa, chuẩn hóa cấu trúc để giảm tối đa số tokens đầu vào."
              ]
            },
            {
              type: "heading",
              level: 3,
              content: "Bảo mật thông tin nhạy cảm (Security)"
            },
            {
              type: "text",
              content: "Doanh nghiệp luôn lo ngại rò rỉ dữ liệu khi gửi lên API bên thứ ba. Thiết lập các node phát hiện và che giấu (redact) các thông tin nhạy cảm cá nhân (PII - số điện thoại, tài khoản ngân hàng, email) trước khi gửi tới API LLM là bắt buộc."
            }
          ]
        },
        {
          id: "l6-1-3",
          title: "Xây Dựng Thương Hiệu Cá Nhân trong Lĩnh Vực AI Automation",
          duration: "2 giờ",
          type: "theory",
          summary: "Cách thức viết case study xuất sắc thu hút inbound leads chất lượng cao trên LinkedIn.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Thương hiệu cá nhân chuyên gia"
            },
            {
              type: "text",
              content: "LinkedIn là thị trường tiềm năng nhất cho phân khúc B2B doanh nghiệp sẵn sàng chi ngân sách lớn cho tự động hóa. Hãy định kỳ chia sẻ các bài phân tích sâu (Case Studies) về các dự án bạn đã triển khai thành công, đính kèm hình ảnh trực quan luồng n8n/Make để gây ấn tượng mạnh."
            }
          ]
        }
      ]
    },
    {
      id: "m6-2",
      title: "Thực Hành Đóng Gói & Đánh Giá",
      type: "practical",
      estimatedHours: 35,
      description: "Thực hành thương mại hóa sản phẩm tự động và xây dựng quy trình tự động đánh giá AI",
      lessons: [
        {
          id: "l6-2-1",
          title: "Lab 6.1: Đóng gói Workflow thành Sản phẩm (Productization)",
          duration: "4 giờ",
          type: "exercise",
          summary: "Đóng gói giải pháp tự động hóa thành sản phẩm thương mại đi kèm tài liệu hướng dẫn và bảng giá.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Mục tiêu bài Lab"
            },
            {
              type: "text",
              content: "Đóng gói một trong các dự án xuất sắc của bạn thành 'sản phẩm thương mại' hoàn chỉnh: Biên soạn tài liệu hướng dẫn cực kỳ dễ hiểu bằng tiếng Việt (không dùng thuật ngữ kỹ thuật phức tạp), thiết kế mô hình định giá (Setup fee + Monthly retainer) và soạn thảo Pitch Deck 5 trang."
            },
            {
              type: "checklist",
              title: "Các sản phẩm cần nộp:",
              items: [
                "Tài liệu hướng dẫn sử dụng cho khách hàng.",
                "Slide Pitch Deck (định dạng PDF) giới thiệu giải pháp.",
                "Lưu toàn bộ tài liệu thương mại vào thư mục phase-6/productization/."
              ]
            }
          ]
        },
        {
          id: "l6-2-2",
          title: "Lab 6.2: Hệ thống đánh giá tự động (Evaluation System)",
          duration: "4 giờ",
          type: "exercise",
          summary: "Xây dựng chương trình Python đánh giá chất lượng câu trả lời của AI dựa trên bộ câu hỏi chuẩn.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Mục tiêu bài Lab"
            },
            {
              type: "text",
              content: "Xây dựng hệ thống **LLM-as-a-judge**: Sử dụng một mô hình GPT-4o độc lập với prompt chuyên dụng đóng vai trò giám khảo chấm điểm câu trả lời thực tế so với câu trả lời chuẩn (Ground Truth) theo thang điểm 1-5."
            },
            {
              type: "checklist",
              title: "Các tiêu chí hoàn thành bài Lab:",
              items: [
                "Chương trình chạy tự động qua bộ dữ liệu 20 câu hỏi thử nghiệm.",
                "Báo cáo thống kê chi tiết hiển thị điểm trung bình và các câu trả lời bị điểm thấp để cải tiến prompt.",
                "Lưu mã nguồn Python vào tệp phase-6/evaluation_system.py."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "m6-3",
      title: "Checkpoint Tốt Nghiệp",
      type: "assessment",
      estimatedHours: 15,
      description: "Thực hiện dự án thực tế tốt nghiệp, thuyết demo và chuyển giao công nghệ thực tế",
      lessons: [
        {
          id: "l6-3-1",
          title: "Checkpoint Phase 6: Sẵn sàng thực chiến doanh nghiệp",
          duration: "15 giờ",
          type: "project",
          summary: "Bài kiểm tra tốt nghiệp cuối khóa: thực hiện demo pitching giải pháp tự động hóa cho ít nhất 3 khách hàng thực tế.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🏁 Cột mốc tốt nghiệp cuối khóa"
            },
            {
              type: "text",
              content: "Để chính thức tốt nghiệp và nhận chứng chỉ Master AI Workflow Designer của học viện, bạn cần:\n\n1. Xác định ngách độc quyền và viết báo cáo phân tích ngách dịch vụ bạn tập trung phục vụ.\n2. Thiết lập trang Landing Page hoặc tài liệu chào hàng dịch vụ chi tiết.\n3. Tiến hành liên hệ, thuyết trình demo giải pháp (pitching) và tiếp nhận phản hồi từ ít nhất **3 khách hàng tiềm năng thực tế** (chủ shop, quản lý phòng ban, chủ startup) và ghi chép lại biên bản chi tiết."
            },
            {
              type: "checklist",
              title: "Tiêu chí tốt nghiệp:",
              items: [
                "Nộp đủ toàn bộ báo cáo phân tích ngách, tài liệu pitch deck chuyên nghiệp.",
                "Có biên bản ghi chép phỏng vấn phản hồi của 3 khách hàng thực tế trong thư mục phase-6/.",
                "Đã hoàn thành 100% lộ trình học và vượt qua toàn bộ 6 bài kiểm tra Checkpoints của giáo trình."
              ]
            }
          ]
        }
      ]
    }
  ]
};
