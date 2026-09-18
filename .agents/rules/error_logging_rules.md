# Quy tắc Xử lý & Ghi Nhật ký Bug / Lỗi

Tài liệu quy định quy trình bắt buộc khi phát hiện và xử lý lỗi trong dự án.

---

## 📌 1. Quy định Lưu trữ & Đặt tên
- **Thư mục lưu**: `.agents/error_logs/`
- **Định dạng file**: `YYYY-MM-DD.md` hoặc `YYYY-MM-DD_<ten_loi>.md`
- **File mẫu**: Tham chiếu tại [template.md](file:///c:/Users/bbqdd/Documents/_KhoaLuanTN/AdmissionKG/.agents/error_logs/template.md)

---

## 📝 2. Cấu trúc Bắt buộc của File Log Lỗi
1. **Thông tin chung**: Ngày xảy ra, Service ảnh hưởng (Backend / Frontend / AiService / Kafka / DB), Mức độ nghiêm trọng.
2. **Chi tiết lỗi**: Stacktrace / Thông báo lỗi chi tiết.
3. **Phân tích nguyên nhân gốc rễ**: Giải thích rõ tại sao lỗi xảy ra.
4. **Nhật ký Fix theo từng nấc**:
   - `Fix lần 1`: Mô tả chi tiết chỉnh sửa -> Kết quả.
   - `Fix lần 2`: Mô tả tiếp chỉnh sửa (nếu lần 1 chưa thành công) -> Kết quả.
   - ... lặp lại cho đến khi sự cố được khắc phục dứt điểm.
5. **Kết luận & Trạng thái**: Đánh dấu `RESOLVED` kèm tóm tắt giải pháp chốt.
