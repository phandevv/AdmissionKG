# 🐞 QUY TẮC XỬ LÝ & GHI NHẬT KÝ SỰ CỐ (PROBLEM & RESOLUTION LOGGING)

Quy tắc bắt buộc này thiết lập chuẩn mực **Lưu vết Vấn đề & Giải pháp (Issue $\rightarrow$ Action $\rightarrow$ Outcome)** cho mọi sự cố kỹ thuật, bug, lỗi logic hoặc bất cập phát sinh trong quá trình phát triển dự án **AdmissionKG**.

---

## 🎯 1. NGUYÊN TẮC BẤT BIẾN (CORE INVARIANTS)

1. **AUTO-LOGGING AFTER RESOLUTION (Tự động ghi log sau khi giải quyết)**:
   - Khi phát hiện một lỗi logic, lỗi biên dịch, lỗi runtime, hoặc khi tối ưu một tính năng gặp sự cố: Sau khi xử lý xong, BẮT BUỘC phải ghi nhận lại vào thư mục `.agents/error_logs/` hoặc `docs/error_logs/`.
   - Mục đích: Tránh lặp lại vết xe đổ trong các phiên lập trình tiếp theo và làm tài liệu minh chứng cho báo cáo Khóa luận Tốt nghiệp.

2. **CHUẨN MỰC "VẤN ĐỀ ABC $\rightarrow$ THAY ĐỔI XYZ $\rightarrow$ KẾT QUẢ AA"**:
   Mỗi báo cáo lỗi bắt buộc phải thể hiện rõ 4 cấu phần:
   - **Vấn đề / Triệu chứng (Problem ABC)**: Hiện tượng thực tế, thông báo lỗi, tác động đến người dùng.
   - **Nguyên nhân gốc rễ (Root Cause)**: Phân tích kỹ thuật tại sao lỗi xảy ra (lỗi logic, lỗi kiểu dữ liệu, thiếu index, v.v.).
   - **Phương án & Thay đổi đã áp dụng (Changes XYZ)**: Danh sách file đã sửa, giải thuật đã thay thế, đoạn code đã cập nhật.
   - **Kết quả & Kiểm chứng (Outcome AA)**: So sánh Trước khi sửa vs Sau khi sửa, kết quả test (`mvn test`, `npm run build`, API response).

---

## 📂 2. QUY ĐỊNH ĐẶT TÊN & LƯU TRỮ

* **Thư mục**: `.agents/error_logs/` (hoặc `docs/error_logs/`)
* **Định dạng file**: `YYYY-MM-DD_<ten_loi_ngan_gon>.md`  
  * *Ví dụ*: `2026-09-18_score_filter_zero_results.md`, `2026-07-27_json_truncation.md`.
* **File mẫu chuẩn**: Tham chiếu tại [template.md](../error_logs/template.md).

---

## 📝 3. CẤU TRÚC BÁO CÁO CHUẨN

```markdown
# 🐞 Báo cáo Sự cố: [Tên vấn đề ABC]

- **Ngày ghi nhận**: YYYY-MM-DD
- **Module ảnh hưởng**: [Backend / Frontend / Neo4j / PostgreSQL / TWD / RAG]
- **Mức độ**: [Critical | High | Medium | Low]
- **Trạng thái**: [RESOLVED]

---

### 1. Vấn đề phát sinh (Problem ABC)
* Hiện tượng: ...
* Thông báo lỗi / Stacktrace: ...

### 2. Nguyên nhân gốc rễ (Root Cause)
* Tại sao lỗi xảy ra: ...

### 3. Phương án & Hành động đã áp dụng (Changes Applied XYZ)
* File chỉnh sửa: `path/to/file`
* Chi tiết thay đổi:
  - Thay đổi 1: ...
  - Thay đổi 2: ...

### 4. Kết quả thu được & Kiểm chứng (Outcome AA)
* Kết quả trước khi sửa: [Ví dụ: Tìm điểm 15-30 trả về 0 kết quả]
* Kết quả sau khi sửa: [Ví dụ: Trả về chính xác 57 ngành kèm điểm chuẩn năm trước 2025]
* Kiểm chứng: [JUnit Test Pass 100% / Build Vite Pass / Postman test thành công]

### 5. Bài học rút ra & Quy tắc phòng ngừa (Invariant Rule)
* Không lặp lại lỗi bằng cách: ...
```
