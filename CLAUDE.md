# 👑 AI Workflow Designer — Agent Instructions (Claude/Cursor)

## 🚀 Lệnh vận hành dự án (Project Commands)
- Khởi chạy dev server: `npm run dev`
- Xây dựng sản phẩm (build): `npm run build`
- Chạy toàn bộ kiểm thử (test): `npm run test`
- Chạy một tệp kiểm thử cụ thể: `npx vitest run <path-to-test>`
- Kiểm tra cú pháp (lint): `npm run lint`

## 🧱 Karo Kit & Superpowers Workflows
1. **Nạp Kỹ năng ban đầu**: Bắt buộc nạp `./skills/using-superpowers/SKILL.md` đầu mỗi phiên làm việc.
2. **Tuân thủ Kỹ năng Modular**: Luôn tìm kiếm kỹ năng phù hợp trong thư mục `./skills/` trước bất kỳ hành động code hay sửa lỗi nào.
3. **Working Memory**: Cập nhật nhật ký thực thi thời gian thực vào `./CONTINUITY.md` sau mỗi lượt Turn.
4. **Quy tắc TDD**: Luôn viết test lỗi trước khi viết code (RED), sửa code tối giản để test qua (GREEN), sau đó tối ưu (REFACTOR).
5. **Long-term learnings**: Rút ra bài học sau mỗi tác vụ và ghi vào `.agent/memory/learnings.json`.
