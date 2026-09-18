# 📑 TECHNICAL SPECIFICATION: [TÊN TÍNH NĂNG / EPIC]

> **Epic ID**: EPIC-XX  
> **Module**: [Backend | Frontend | AI-GraphRAG | TWD]  
> **Status**: [Draft | In Review | Approved | Implemented]  
> **Author**: Antigravity Agent & Dev Team  

---

## 1. MỤC TIÊU & BỐI CẢNH (GOALS & CONTEXT)
* **Mục tiêu chính**: [Mô tả ngắn gọn 1-2 câu về giá trị tính năng mang lại]
* **Đối tượng sử dụng**: [Thí sinh / Quản trị viên / AI Agent]
* **Ràng buộc nghiệp vụ (Business Rules)**:
  * Quy tắc 1: ...
  * Quy tắc 2: ...

---

## 2. THIẾT KẾ DỮ LIỆU & HỢP ĐỒNG API (DATA & API CONTRACTS)

### 2.1. CSDL Quan hệ (PostgreSQL) / Đồ thị (Neo4j)
* **Bảng / Node liên quan**:
* **Quan hệ / Relationships**:

### 2.2. DTOs & API Contracts
* **Endpoint**: `POST /api/v1/...`
* **Request DTO**:
```json
{
  "field1": "value",
  "field2": 123
}
```
* **Response DTO (Envelope Chuẩn)**:
```json
{
  "success": true,
  "message": "Thông báo thành công",
  "data": { ... },
  "timestamp": "2026-09-18T10:00:00Z"
}
```

---

## 3. CÁC ĐIỀU KIỆN BẤT BIẾN & TRƯỜNG HỢP BIÊN (INVARIANTS & EDGE CASES)
* 🔴 **Bất biến 1 (Invariant)**: [Điều kiện bắt buộc luôn đúng, không được phép vi phạm]
* ⚠️ **Trường hợp biên 1 (Edge Case)**: [Ví dụ: Điểm = 0, khuyết môn thi, vượt ngưỡng 30.0]
* ⚠️ **Trường hợp biên 2**: [Ví dụ: Không tìm thấy ngành phù hợp]

---

## 4. MA TRẬN KIỂM THỬ & TIÊU CHÍ NGHIỆM THU (TEST MATRIX & ACCEPTANCE CRITERIA)

| Test ID | Kịch bản kiểm thử (Scenario) | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected Output) |
| :---: | :--- | :--- | :--- |
| **TC-01** | Happy Path: Tính điểm chuẩn xác | Toán: 8.0, Lý: 9.0, Hóa: 8.5 | A00 = 25.5đ, Gán vùng POS |
| **TC-02** | Boundary: Điểm chạm ngưỡng biên | Điểm chênh lệch = -0.75 | Gán vùng BND |
| **TC-03** | Error Handling: Điểm thi âm hoặc > 10 | Toán: 11.0 | Ném lỗi Validation 400 Bad Request |

---

## 5. KẾ HOẠCH TRIỂN KHAI THEO TỪNG TASK (TASK BREAKDOWN)
- [ ] **Task 1**: Tạo Entity & DTOs
- [ ] **Task 2**: Viết Unit Tests (TDD)
- [ ] **Task 3**: Cài đặt Service Logic
- [ ] **Task 4**: Cài đặt Controller & Endpoint
- [ ] **Task 5**: Chạy toàn bộ Tests & Xác nhận nghiệm thu
