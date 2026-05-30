// src/data/curriculum.ts
import { Phase } from '@/types/curriculum';
import { phaseThemes } from './themes';

export const CURRICULUM: Phase[] = [
  {
    id: 0,
    title: "Hiểu Nghề & Định Hướng",
    subtitle: "Khám phá thế giới AI Workflow và xây dựng định hướng cá nhân",
    duration: "2 tuần",
    pace: "10 giờ/tuần",
    totalHours: 20,
    icon: "🧭",
    theme: phaseThemes[0],
    milestone: "Tạo lập bản Tuyên bố AI Designer cá nhân",
    outcome: "Hiểu rõ lộ trình học, cơ hội nghề nghiệp và công việc của AI Workflow Designer",
    tools: ["ChatGPT", "Notion", "Google Sheets"],
    modules: [
      {
        id: "m0-1",
        title: "Khám Phá Nghề AI Workflow Designer",
        type: "concept",
        estimatedHours: 5,
        description: "Hiểu rõ vai trò và thị trường",
        lessons: [
          {
            id: "l0-1-1",
            title: "AI Workflow Designer là gì?",
            duration: "45 phút",
            type: "theory",
            summary: "Tìm hiểu vai trò, trách nhiệm hằng ngày và định vị của một AI Workflow Designer.",
            content: [
              {
                type: "heading",
                level: 2,
                content: "AI Workflow Designer là gì?"
              },
              {
                type: "text",
                content: "AI Workflow Designer là người chuyên thiết kế, xây dựng và tối ưu hoá các luồng công việc tự động kết hợp trí tuệ nhân tạo (AI) để tối ưu hiệu suất vận hành doanh nghiệp."
              },
              {
                type: "callout",
                variant: "tip",
                title: "Tóm gọn trong 1 câu",
                content: "AI Workflow Designer = Người kết nối AI + Tools + Business Process thành hệ thống tự động có giá trị thực tế."
              }
            ],
            resources: [
              {
                title: "Tài liệu giới thiệu nghề nghiệp",
                url: "https://example.com/ai-career",
                kind: "free"
              }
            ]
          }
        ]
      }
    ]
  }
];
