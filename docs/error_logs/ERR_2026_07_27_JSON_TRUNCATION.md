# Báo cáo Lỗi và Phương án Sửa đổi (Error Incident Report)

**Ngày ghi nhận**: 2026-07-27
**Môi trường**: Backend API / Admin Ingestion Service (DeepSeek LLM + Jackson Parser)

---

## 📌 Lỗi: JSON Parsing Exception - Unexpected end-of-input

### Triệu chứng:
Khi tải lên file PDF đề án tuyển sinh lớn (nhiều hơn 25 ngành đào tạo và văn bản chính sách ưu tiên dài):
```text
Không thể bóc tách dữ liệu JSON từ văn bản cung cấp: Unexpected end-of-input in field name at
[Source: (String)"{ "truong": { "maTruong": "DQN", ... "nganhList": [...]"; line: 768, column: 12]
(through reference chain: com.admissions.backend.admin.dto.IngestedGraphDataDto["nganhList"]->java.util.ArrayList[27])
```

### Phân tích Nguyên nhân:
1. **Tràn `max_tokens` của LLM API**: Khi văn bản đề án tuyển sinh có dung lượng lớn và danh sách ngành dầy đặc (27+ ngành), câu trả lời JSON vượt quá giới hạn token đầu ra mặc định (~2048-4096 tokens) của DeepSeek API, dẫn đến việc LLM bị cắt dở chuỗi JSON ở giữa chừng.
2. **Thiếu Tham số Ép Kiểu JSON**: API request trước đó chưa truyền `"response_format": {"type": "json_object"}` và chưa tăng `"max_tokens": 8192`.
3. **Mô tả văn bản bị lặp lại quá dài**: Prompt chưa yêu cầu tóm tắt các đoạn văn chính sách ưu tiên, khiến dung lượng JSON tăng đột biến.

---

### 🛠 Phương án Khắc phục:

1. **Cấu hình API Request ([`DeepSeekLlmService.java`](file:///c:/Users/bbqdd/Documents/_KhoaLuanTN/AdmissionKG/backend/src/main/java/com/admissions/backend/chat/service/DeepSeekLlmService.java))**:
   - Thiết lập `"max_tokens": 8192` cho luồng bóc tách JSON.
   - Thêm tham số `"response_format": {"type": "json_object"}` để ép LLM trả về cấu trúc JSON chuẩn xác.
   - Đặt `temperature: 0.1` tăng độ nhất quán schema.

2. **Thuật toán Tự động Sửa Chuỗi JSON bị Ngắt (`repairTruncatedJson`)**:
   - Xây dựng thuật toán kiểm tra cú pháp và tự động cân bằng các ngoặc nhọn `{}` và ngoặc vuông `[]` bị ngắt dở ở cuối chuỗi.
   - Nếu Jackson parse thất bại lần 1, hệ thống tự động sửa và parse lại lần 2, đảm bảo giữ nguyên 27+ ngành đã trích xuất thành công thay vì báo lỗi HTTP 500.

3. **Tối ưu hóa Prompt**:
   - Yêu cầu LLM tóm tắt các trường văn bản dài (`chinhSachUuTien`, `dieuKienPhu`) dưới 50 từ.
