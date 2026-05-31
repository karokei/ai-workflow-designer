// src/data/phases/phase-5.ts
import type { Phase } from '@/types/curriculum';
import { phaseThemes } from '../themes';

export const phase5: Phase = {
  id: 5,
  title: "Portfolio & Kỹ năng Nghề nghiệp",
  subtitle: "Đóng gói 5 dự án thực chiến lớn, làm chủ kỹ năng phân tích nghiệp vụ BA và thương mại hóa năng lực",
  duration: "6-8 tuần",
  pace: "10 giờ/tuần",
  totalHours: 60,
  icon: "💼",
  theme: phaseThemes[5],
  milestone: "Hoàn thiện Website Portfolio và hồ sơ năng lực Upwork đạt chuẩn chuyên gia",
  outcome: "Hoàn thành 5 dự án lớn, biết phân tích quy trình nghiệp vụ doanh nghiệp và định giá dịch vụ tự động hóa",
  tools: ["Notion Portfolio", "Upwork Profile", "Airtable CRM", "OpenAI Vision", "Whisper API"],
  modules: [
    {
      id: "m5-1",
      title: "Phân Tích Nghiệp Vụ BA & Thương Mại Hóa",
      type: "concept",
      estimatedHours: 20,
      description: "Học kỹ năng phân tích quy trình vận hành và đóng gói dịch vụ bán cho doanh nghiệp",
      lessons: [
        {
          id: "l5-1-1",
          title: "Business Analysis cho AI Workflow",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Cách thức tìm kiếm nỗi đau vận hành của doanh nghiệp và tính toán chỉ số ROI tự động hóa.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Vai trò Business Analyst (BA) trong Tự động hóa"
            },
            {
              type: "text",
              content: "Một AI Workflow Designer xuất sắc luôn sở hữu 50% tố chất của một nhà phân tích nghiệp vụ. Bạn cần thấu hiểu mô hình kinh doanh của khách hàng, dòng chảy dữ liệu giữa các phòng ban, từ đó phát hiện các nút thắt cổ chai và đề xuất giải pháp tự động hóa có tính thực tiễn cao nhất."
            },
            {
              type: "callout",
              variant: "tip",
              title: "Cách phát hiện Pain Point",
              content: "Một tác vụ là ứng viên sáng giá cho tự động hóa nếu thỏa mãn: (1) Lặp đi lặp lại liên tục, (2) Tuân theo logic rõ ràng, (3) Tiêu tốn nhiều thời gian của nhân viên có chuyên môn cao, (4) Dữ liệu đầu vào ở dạng số hóa (text, sheets, email)."
            },
            {
              type: "heading",
              level: 3,
              content: "Khung RICE đánh giá độ ưu tiên dự án"
            },
            {
              type: "table",
              headers: ["Tiêu chí", "Ý nghĩa", "Cách chấm điểm thực tế"],
              rows: [
                ["Reach (Phạm vi)", "Bao nhiêu nhân sự/khách hàng được hưởng lợi?", "Đếm số người sử dụng hằng ngày"],
                ["Impact (Tác động)", "Giúp tăng năng suất hay tiết kiệm bao nhiêu?", "Chấm điểm từ 0.5 (thấp) đến 3 (cực lớn)"],
                ["Confidence (Độ tin cậy)", "Độ tự tin của bạn vào dự báo này?", "Phần trăm từ 50% đến 100%"],
                ["Effort (Công sức)", "Mất bao nhiêu tuần để thiết kế và xây dựng?", "Số người-tháng hoặc số tuần thực thi"]
              ]
            }
          ]
        },
        {
          id: "l5-1-2",
          title: "Cách Trình bày Dự án trong Portfolio",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Cấu trúc kể chuyện kỹ thuật (Problem-to-Solution) thuyết phục khách hàng ra quyết định ký hợp đồng.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Hồ sơ Portfolio: Vũ khí bán hàng số một"
            },
            {
              type: "text",
              content: "Trong lĩnh vực tự động hóa, bằng cấp không quan trọng bằng **sản phẩm thực tế hoạt động** và **kết quả đo lường ROI cụ thể**. Hãy trình bày mỗi dự án của bạn theo cấu trúc câu chuyện chuẩn:"
            },
            {
              type: "numbered",
              items: [
                "**Problem (Nỗi đau thực tế)**: Mô tả bài toán doanh nghiệp gặp phải (ví dụ: nhân viên trực chat quá tải dẫn đến phản hồi chậm, rớt 30% doanh số).",
                "**Solution (Giải pháp)**: Bạn thiết kế luồng tự động hóa gì để giải quyết? Sử dụng công cụ nào (Stack)?",
                "**Architecture (Sơ đồ hệ thống)**: Vẽ trực quan luồng dữ liệu kết nối các node của n8n/Make.",
                "**Result (Hiệu quả đo lường)**: Đưa ra con số cụ thể (tiết kiệm 3 giờ làm việc mỗi ngày, phản hồi khách dưới 10 giây)."
              ]
            }
          ]
        },
        {
          id: "l5-1-3",
          title: "Thương Mại Hóa Kỹ Năng & Phát Triển Sự Nghiệp",
          duration: "1.5 giờ",
          type: "theory",
          summary: "Định hình dịch vụ Freelancer chuyên nghiệp, Agency tự động hóa và các gói phí bảo trì hằng tháng.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "Chiến lược thương mại hóa kỹ năng"
            },
            {
              type: "text",
              content: "Khi sở hữu kỹ năng AI Workflow Design, bạn có thể đóng gói dịch vụ thành nhiều gói sản phẩm linh hoạt để tối ưu hóa doanh thu:"
            },
            {
              type: "bullets",
              items: [
                "**Fixed-Price Projects (Gói cố định)**: Phù hợp với các workflow ngắn, phạm vi rõ ràng (ví dụ: đồng bộ data CRM).",
                "**Monthly Retainer (Phí bảo trì hàng tháng)**: Thu phí định kỳ hằng tháng để theo dõi luồng chạy, sửa lỗi API, cập nhật prompt và hỗ trợ kỹ thuật liên tục cho doanh nghiệp.",
                "**Process Audit (Tư vấn nghiệp vụ)**: Nhận khảo sát, phỏng vấn quy trình làm việc thô của doanh nghiệp và xuất bản đề xuất lộ trình tự động hóa có thu phí."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "m5-2",
      title: "Thực Hành Xây Dựng 5 Dự Án Thực Chiến",
      type: "practical",
      estimatedHours: 35,
      description: "Thực hành xây dựng và đóng gói 5 siêu dự án tự động hóa thực tế cho Portfolio cá nhân",
      lessons: [
        {
          id: "l5-2-1",
          title: "Project 1: AI Customer Support Bot",
          duration: "7 giờ",
          type: "project",
          summary: "Thiết kế và triển khai chatbot đa kênh tích hợp cơ sở tri thức FAQ tự động trả lời khách hàng.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu dự án"
            },
            {
              type: "text",
              content: "Xây dựng hệ thống chatbot hỗ trợ khách hàng đa kênh: Nhận webhook tin nhắn mới ➔ truy cập cơ sở tri thức FAQ (RAG) ➔ AI sinh câu trả lời thân thiện. Nếu gặp câu hỏi khiếu nại chất lượng sản phẩm ➔ hệ thống tự động đẩy cảnh báo khẩn cấp tag CSKH qua Slack."
            },
            {
              type: "checklist",
              title: "Các sản phẩm cần nộp:",
              items: [
                "Tệp tin export n8n/Make workflow JSON.",
                "Tài liệu README mô tả dự án và sơ đồ kiến trúc quy trình.",
                "Video quay màn hình demo chatbot hoạt động mượt mà."
              ]
            }
          ]
        },
        {
          id: "l5-2-2",
          title: "Project 2: Content Repurposing Pipeline",
          duration: "7 giờ",
          type: "project",
          summary: "Xây dựng hệ thống tự động nhận bài blog/video transcript, dùng AI biên dịch thành 5 tweet threads và LinkedIn post.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu dự án"
            },
            {
              type: "text",
              content: "Thiết kế hệ thống tự động: Khi điền link bài blog mới vào Notion ➔ AI tự động đọc, phân tích các ý chính ➔ tự sinh 1 tweet thread (5 tweets) cho X, 1 bài viết chuyên môn cho LinkedIn, và 1 bản tin email newsletter ➔ tự đẩy vào hàng đợi duyệt bài Notion."
            },
            {
              type: "checklist",
              title: "Các sản phẩm cần nộp:",
              items: [
                "Workflow JSON kết nối thành công Notion và OpenAI.",
                "Prompt templates tối ưu hóa cho từng mạng xã hội.",
                "README mô tả quy trình tiếp thị tự động."
              ]
            }
          ]
        },
        {
          id: "l5-2-3",
          title: "Project 3: Invoice Processing Automation",
          duration: "7 giờ",
          type: "project",
          summary: "Xây dựng luồng tự động hóa OCR/Vision trích xuất hóa đơn đầu vào và ghi tự động vào database kế toán.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu dự án"
            },
            {
              type: "text",
              content: "Nhận email Gmail có đính kèm hóa đơn (ảnh/PDF) ➔ dùng mô hình GPT-4o Vision trích xuất các trường dữ liệu bắt buộc (Số hóa đơn, Ngày xuất, Tên NCC, Danh sách sản phẩm chi tiết, Tổng tiền) ➔ ghi tự động vào bảng Supabase SQL."
            },
            {
              type: "checklist",
              title: "Các sản phẩm cần nộp:",
              items: [
                "Workflow JSON xử lý trích xuất hóa đơn.",
                "Bản ghi cấu trúc SQL Schema lưu hóa đơn.",
                "Tài liệu hướng dẫn triển khai."
              ]
            }
          ]
        },
        {
          id: "l5-2-4",
          title: "Project 4: AI Meeting Note Taker",
          duration: "7 giờ",
          type: "project",
          summary: "Xây dựng luồng tự động nhận audio ghi âm cuộc họp, transcribe thành text, và AI summarize xuất action items.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu dự án"
            },
            {
              type: "text",
              content: "Khi tải audio mới lên Google Drive ➔ gọi Whisper API chuyển âm thanh thành văn bản ➔ gọi LLM tóm tắt 3 ý chính, trích xuất danh sách công việc cần làm (Action Items) gán cho từng người ➔ tự động tạo file Google Docs báo cáo gửi qua email."
            },
            {
              type: "checklist",
              title: "Các sản phẩm cần nộp:",
              items: [
                "Workflow JSON kết nối Whisper, OpenAI, Google Drive.",
                "Mẫu báo cáo Google Docs được tạo tự động.",
                "Tài liệu README."
              ]
            }
          ]
        },
        {
          id: "l5-2-5",
          title: "Project 5: AI-Powered Lead Scoring",
          duration: "7 giờ",
          type: "project",
          summary: "Thiết kế luồng nhận thông tin khách đăng ký, gọi AI phân tích quy mô doanh nghiệp và tự chấm điểm chất lượng lead.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🎯 Yêu cầu dự án"
            },
            {
              type: "text",
              content: "Khi có khách điền form tư vấn (webhook) ➔ hệ thống tự động enrichment dữ liệu (gọi API tra cứu thông tin domain doanh nghiệp) ➔ gọi AI phân tích chấm điểm lead từ 1-100 ➔ nếu lead cực tốt (Hot Lead) ➔ bắn thông báo khẩn cấp tag sale team qua Slack."
            },
            {
              type: "checklist",
              title: "Các sản phẩm cần nộp:",
              items: [
                "Workflow n8n/Make hoàn chỉnh kết nối lead forms.",
                "Prompt template chấm điểm lead dựa trên tiêu chí lý tưởng.",
                "README phân tích hiệu quả ROI của hệ thống."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "m5-3",
      title: "Nghiệm Thu Portfolio",
      type: "assessment",
      estimatedHours: 5,
      description: "Thực hiện bài kiểm tra đóng gói và nghiệm thu toàn bộ danh mục 5 dự án thực chiến lớn",
      lessons: [
        {
          id: "l5-3-1",
          title: "Checkpoint Phase 5: Portfolio hoàn thiện",
          duration: "5 giờ",
          type: "project",
          summary: "Bài kiểm tra tổng kết: xuất bản website portfolio cá nhân chứa đầy đủ tài liệu và demo của 5 dự án thực chiến.",
          content: [
            {
              type: "heading",
              level: 2,
              content: "🏁 Bài kiểm tra tốt nghiệp Phase 5"
            },
            {
              type: "text",
              content: "Để chính thức kết thúc Phase 5, bạn cần hoàn thiện website portfolio chuyên nghiệp của mình (bằng Notion, GitHub Pages hoặc Webflow) tổng hợp đầy đủ tài liệu kỹ thuật, sơ đồ kiến trúc và video chạy thử của cả 5 dự án lớn đã thực hiện từ Lab 5.1 đến Lab 5.5."
            },
            {
              type: "checklist",
              title: "Tiêu chí nghiệm thu tốt nghiệp:",
              items: [
                "Hoàn thành xuất sắc 5/5 dự án thực chiến lớn.",
                "Mỗi dự án có tài liệu README cấu trúc Problem-to-Solution rõ ràng.",
                "Website Portfolio có giao diện chuyên nghiệp, sẵn sàng gửi cho khách hàng và nhà tuyển dụng.",
                "Có liên kết video demo hoạt động thực tế cho từng dự án."
              ]
            }
          ]
        }
      ]
    }
  ]
};
