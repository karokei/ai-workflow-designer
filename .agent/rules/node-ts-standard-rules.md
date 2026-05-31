# Node.js & TypeScript Standard Rules (Next.js Focus)

## 1. Ngôn ngữ & Môi trường
- **Node.js (LTS):** Sử dụng các tính năng mới nhất (ESM by default).
- **TypeScript:** Luôn bật chế độ `strict: true`. Không sử dụng `any`, thay thế bằng `unknown` hoặc các Types cụ thể.
- **Next.js:** Ưu tiên **App Router** (Next.js 14/15/2026). Sử dụng Server Components cho render mặc định và Client Components cho tương tác.

## 2. Cấu trúc mã nguồn
- **Phân tách Logic:** Đưa logic nghiệp vụ vào `services/`, hooks xử lý state vào `hooks/`, và UI vào `components/`.
- **Naming:** CamelCase cho biến/hàm, PascalCase cho Components/Types/Classes.
- **Imports:** Sử dụng Absolute Imports (`@/components/...`) để đường dẫn sạch sẽ.

## 3. Quản lý Dữ liệu
- **Server Actions:** Sử dụng cho các tác vụ thay đổi dữ liệu (mutation).
- **ORM:** Ưu tiên **Prisma** hoặc **Drizzle** để đảm bảo Type-safe tuyệt đối.
- **Validation:** Luôn sử dụng **Zod** để validate dữ liệu từ client và API.

## 4. Bảo mật (Security)
- **Environment Variables:** Không bao giờ commit `.env`. Luôn validate `.env` bằng Zod/Pydantic-like library.
- **Sanitization:** Luôn lọc dữ liệu để tránh XSS khi render nội dung từ người dùng.
- **Authentication:** Khuyên dùng `NextAuth.js` (Auth.js) hoặc `Clerk` với cơ chế JWT/Session an toàn.

## 5. Hiệu năng (Performance)
- **Streaming:** Sử dụng `Suspense` và `loading.tsx` để tăng trải nghiệm người dùng.
- **Image Optimization:** Luôn sử dụng `<Image />` từ `next/image`.
- **Bundle Size:** Kiểm tra kích thước bundle thường xuyên, tránh dùng các library quá nặng.
