# 🐞 Báo cáo Sự cố & Nhật ký Khắc phục: [TÊN VẤN ĐỀ ABC]

> **Ngày ghi nhận**: YYYY-MM-DD  
> **Module bị ảnh hưởng**: [Backend / Frontend / Neo4j / PostgreSQL / TWD / RAG]  
> **Mức độ nghiêm trọng**: [Critical | High | Medium | Low]  
> **Trạng thái**: [RESOLVED | INVESTIGATING]  

---

## 1. Vấn đề Phát sinh (Problem Statement - ABC)
- **Mô tả hiện tượng**: [Mô tả chi tiết triệu chứng người dùng hoặc hệ thống gặp phải]
- **Tác động**: [Ví dụ: Thí sinh lọc điểm 15-30 không thấy ngành nào, gây hiểu nhầm hệ thống lỗi]
- **Log lỗi / Stacktrace (nếu có)**:
```text
[Dán log lỗi hoặc stack trace tại đây]
```

---

## 2. Phân tích Nguyên nhân Gốc rễ (Root Cause Analysis)
- **Nguyên nhân kỹ thuật**: [Phân tích chi tiết tại sao lỗi lại xảy ra ở tầng data/logic/query/css/auth...]
- **Điểm nghẽn/Lỗ hổng**: [Ví dụ: Điều kiện if (r.score == null) loại bỏ toàn bộ ngành 2026 chưa có điểm chuẩn]

---

## 3. Hành động & Thay đổi Đã Áp dụng (Changes Applied - XYZ)

### 🔴 Lần thử nghiệm 1 (Fix lần 1):
- **Thời gian**: YYYY-MM-DD HH:mm
- **File chỉnh sửa**: `path/to/modified/file`
- **Thay đổi cụ thể**: [Mô tả chi tiết code hoặc config đã sửa]
- **Kết quả**: [Thành công / Thất bại - Chi tiết phản hồi]

### 🔴 Lần thử nghiệm 2 (nếu cần):
- **Thời gian**: YYYY-MM-DD HH:mm
- **Thay đổi cụ thể**: ...
- **Kết quả**: ...

---

## 4. Kết quả Thu được & Nghiệm thu (Outcome & Verification - AA)
- **Trước khi áp dụng**: [Hiện tượng sai lệch ban đầu]
- **Sau khi áp dụng**: [Hiện tượng đúng như mong đợi sau khi fix]
- **Kiểm thử nghiệm thu**:
  - [x] Unit Tests / Integration Tests: Passed
  - [x] Build Verification (`npm run build` / `mvn test`): 0 errors
  - [x] Manual Verification (Kiểm tra thực tế giao diện/API): Hoạt động ổn định

---

## 5. Bài học Rút ra & Quy tắc Bất biến (Invariant Rule)
- 📌 **Quy tắc phòng ngừa**: [Ghi lại bài học kinh nghiệm để không bao giờ lặp lại lỗi này trong các module sau]
