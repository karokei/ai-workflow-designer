---
name: karo-script-runner
version: 2.0.0
description: Kỹ năng điều hành và thực thi các Script Python chuyên nghiệp trong hệ thống Karo Agent.
author: Karo
---

# Karo Script Runner

## Mục đích
Skill này được thiết kế để chuẩn hóa việc thực thi các tác vụ hệ thống thông qua bộ script Python cao cấp. Thay vì chạy các lệnh terminal rời rạc, các Agent nên ưu tiên sử dụng các script trong `.agent/scripts/`.

## Danh sách Script hỗ trợ

| Tên Script | Đường dẫn | Chức năng |
| :--- | :--- | :--- |
| **Project Builder** | `.agent/scripts/karo_build.py` | Khởi tạo, cấu trúc và xây dựng dự án. |
| **System DevOps** | `.agent/scripts/karo_deploy.py` | Triển khai hệ thống lên môi trường production. |
| **QA Tester** | `.agent/scripts/karo_test.py` | Thực thi bộ test suite toàn diện. |
| **Performance Monitor** | `.agent/scripts/karo_monitor.py` | Giám sát hiệu năng và tài nguyên hệ thống. |
| **AI Developer** | `.agent/scripts/karo_dev.py` | Môi trường coding và chạy local. |
| **System Doctor** | `.agent/scripts/karo_doctor.py` | Kiểm tra sức khỏe toàn diện của bộ Agent. |
| **Orchestrator** | `.agent/scripts/karo_orchestrator.py` | Điều phối các chuỗi tác vụ phức tạp. |

## Hướng dẫn thực thi

1.  **Xác định tác vụ:** Chọn script phù hợp với yêu cầu của sếp.
2.  **Chạy lệnh:** Sử dụng công cụ `run_command` để thực thi:
    ```powershell
    python .agent/scripts/[tên_script].py
    ```
3.  **Xử lý kết quả:** Đọc output từ script để phản hồi lại cho sếp hoặc thực hiện các bước tiếp theo trong workflow.

## Quy tắc an toàn
- Luôn kiểm tra môi trường trước khi chạy các script có tính can thiệp sâu (Deploy, Build).
- Báo cáo ngay cho sếp nếu script trả về mã lỗi (exit code != 0).
