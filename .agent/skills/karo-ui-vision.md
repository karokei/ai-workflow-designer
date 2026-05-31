---
name: karo-ui-vision
version: 1.0.0
description: Kỹ năng phân tích thiết kế UI (từ ảnh/screenshot) và chuyển đổi thành mã nguồn Tailwind CSS chuẩn xác.
---

# Karo UI Vision

## Mục đích
Kỹ năng này cho phép Agent "nhìn" và hiểu các thành phần giao diện từ hình ảnh thiết kế (Figma, Screenshot) để tái tạo lại bằng code một cách nhanh nhất.

## Quy trình làm việc

### 1. Phân tích Hình ảnh
Khi sếp cung cấp một hình ảnh (qua tool `read_browser_page` hoặc đường dẫn file), hãy tập trung vào:
- **Layout:** Flexbox hay Grid? Cấu trúc phân cấp các thành phần.
- **Typography:** Font chữ, kích thước, độ đậm (Weight), khoảng cách dòng (Leading).
- **Color Palette:** Mã màu HEX/RGB, độ trong suốt (Opacity), Gradients.
- **Spacing:** Padding, Margin, Gap giữa các phần tử.
- **Components:** Nhận diện các nút (Buttons), Ô nhập liệu (Inputs), Card, v.v.

### 2. Chuyển đổi sang Code
- **Framework:** Ưu tiên React/Next.js.
- **Styling:** Sử dụng 100% Tailwind CSS class.
- **Accessibility:** Đảm bảo các thẻ ngữ nghĩa (Semantic HTML) và `aria-labels`.
- **Interactivity:** Giả lập các trạng thái `hover`, `focus`, `active`.

## Nguyên tắc Vàng
- **Chuẩn chỉ:** Không tự ý thay đổi màu sắc trừ khi sếp yêu cầu tối ưu.
- **Sạch sẽ:** Code phải được component hóa (Atomic Design).
- **Responsive:** Luôn tính đến giao diện Mobile và Tablet.

## Lệnh Gợi ý
- "Phân tích cấu trúc layout từ ảnh này."
- "Code lại component Button theo phong cách thiết kế sếp vừa gửi."
- "Tối ưu hóa bảng màu từ screenshot sang hệ thống Design Tokens."
