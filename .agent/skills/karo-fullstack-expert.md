---
name: karo-fullstack-expert
version: 1.0.0
description: Chuyên gia xây dựng ứng dụng Fullstack hiện đại với Next.js và Node.js.
---

# Karo Fullstack Expert

## Mục đích
Kỹ năng này cung cấp các chỉ dẫn kỹ thuật sâu để xây dựng ứng dụng Fullstack chất lượng cao, tận dụng sức mạnh của hệ sinh thái Node.js và Next.js.

## Quy trình Phát triển

### 1. Kiến trúc Next.js (Frontend)
- **App Router:** Thiết kế cấu trúc thư mục `app/` theo tầng (layer).
- **Server Components:** Tối ưu hóa việc fetch dữ liệu trực tiếp từ DB trong Server Component để giảm thiểu client-side fetch.
- **Client Components:** Chỉ sử dụng khi cần tương tác (onClick, scroll, state hooks).
- **Styling:** Sử dụng Tailwind v4. Tạo các `components/ui/` đồng bộ từ Shadcn/UI.

### 2. Backend Node.js
- **API Design:** Xây dựng API chuẩn REST hoặc GraphQL.
- **Prisma/Drizzle:** Quản lý lồng dữ liệu với Type-safe. Luôn migrate dữ liệu cẩn thận.
- **Middleware:** Thiết lập middleware cho logging, auth, và error handling.
- **Background Jobs:** Sử dụng `BullMQ` hoặc `Celery-like` cho các tác vụ nặng.

### 3. Tối ưu hóa (Optimization)
- **Cache Tags:** Sử dụng `next/cache` với `revalidateTag` để làm mới dữ liệu thông minh.
- **Streaming:** Sử dụng `Suspense` để tăng First Contentful Paint (FCP).
- **SEO & Metadata:** Thiết lập Metadata động cho từng trang để tối ưu SEO.

## Nguyên tắc Vàng
- **Type Everything:** Không một tệp tin nào không có Types.
- **Zero Placeholder:** Mọi UI đều phải có dữ liệu thực hoặc dữ liệu giả lập chất lượng cao.
- **Premium Vibe:** Giao diện phải mượt mà, animation subtle (0.2s - 0.3s).
