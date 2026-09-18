# 📑 TECHNICAL SPECIFICATION: EPIC 1 — TWD CORE ENGINE & SCORING SERVICE

> **Epic ID**: EPIC-01  
> **Module**: Backend (`com.admissions.backend.tao` & `com.admissions.backend.user`)  
> **Status**: Approved  
> **Workflow**: Spec-Driven Development (SDD)  

---

## 1. MỤC TIÊU & BỐI CẢNH (GOALS & CONTEXT)

* **Mục tiêu**: Xây dựng bộ máy tính toán và phân loại nguyện vọng 3 vùng (Three-Way Decision - TWD) dựa trên điểm thi 11 môn THPT của thí sinh, phổ điểm thi toàn quốc và điểm chuẩn lịch sử các trường.
* **Đối tượng phục vụ**:
  * Thí sinh: Biết được xác suất đỗ của từng ngành/trường chia theo 3 mức độ rủi ro (🟢 An toàn, 🟡 Cân nhắc, 🔴 Rủi ro cao).
  * Graph-RAG Engine: Nạp ma trận 3 vùng vào Context để AI lập luận chiến lược đăng ký nguyện vọng.
* **Quy tắc Nghiệp vụ (Business Rules)**:
  1. **Quy đổi điểm tổ hợp**: Tự động tính điểm cho 191 tổ hợp môn (A00, A01, B00, C00, D01,...) từ điểm 11 môn thi THPT (thang điểm 10).
  2. **Điểm ưu tiên Bộ GD&ĐT (Nghị chế giảm dần từ 22.5 điểm)**:
     $$\text{Điểm ưu tiên thực tế} = \text{Điểm ưu tiên quy định} \times \frac{30 - \text{Tổng điểm 3 môn}}{7.5} \quad (\text{khi Tổng điểm} \ge 22.5)$$
  3. **Mô hình Phân vùng Three-Way Decision**:
     * Tính khoảng cách điểm: $\Delta = (S_{\text{thí sinh}} + \text{Điểm ưu tiên}) - S_{\text{chuẩn\_năm\_trước}}$
     * 🟢 **Vùng Chấp nhận (Positive - POS)**: $\Delta \ge +1.0$ điểm $\rightarrow$ Xác suất trúng tuyển cao ($\ge 85\%$).
     * 🟡 **Vùng Biên (Boundary - BND)**: $-0.75 \le \Delta < +1.0$ điểm $\rightarrow$ Ngưỡng cạnh tranh vừa sức / cần cân nhắc ($50\% - 84\%$).
     * 🔴 **Vùng Từ chối (Negative - NEG)**: $\Delta < -0.75$ điểm $\rightarrow$ Rủi ro trượt cao ($< 50\%$).

---

## 2. THIẾT KẾ DỮ LIỆU & HỢP ĐỒNG API (DATA & API CONTRACTS)

### 2.1. CSDL Quan hệ (PostgreSQL)
* Bảng `user_academic_profiles`: Lưu điểm 11 môn thi THPT, đối tượng & khu vực ưu tiên của thí sinh.
* Bảng `user_combination_scores`: Lưu điểm tính toán sẵn của thí sinh cho từng tổ hợp (A00, D01,...).
* Bảng `benchmark_quotas` & `track_method_combinations`: Lấy điểm chuẩn năm trước và tổ hợp môn của từng ngành.

### 2.2. DTOs & API Contracts

#### Endpoint 1: Tự động tính điểm tất cả tổ hợp môn
* **Method**: `POST /api/v1/user-scores/calculate`
* **Request DTO** (`CalculateCombinationsRequest`):
```json
{
  "examScores": {
    "math": 8.4,
    "literature": 7.5,
    "physics": 9.0,
    "chemistry": 8.6,
    "biology": null,
    "history": null,
    "geography": null,
    "economicLegal": null,
    "informatics": 9.5,
    "technology": null,
    "foreignLanguage": 8.0
  },
  "priorityArea": "KV2_NT",
  "priorityGroup": "UT1"
}
```
* **Response DTO**:
```json
{
  "success": true,
  "message": "Tính điểm tổ hợp thành công",
  "data": [
    { "combinationCode": "A00", "rawScore": 26.0, "priorityScore": 0.53, "totalScore": 26.53 },
    { "combinationCode": "A01", "rawScore": 25.4, "priorityScore": 0.61, "totalScore": 26.01 },
    { "combinationCode": "D01", "rawScore": 23.9, "priorityScore": 0.81, "totalScore": 24.71 }
  ],
  "timestamp": "2026-09-18T10:30:00Z"
}
```

#### Endpoint 2: Đánh giá phân loại 3 vùng TWD
* **Method**: `POST /api/v1/twd/evaluate`
* **Request DTO** (`TwdEvaluationRequest`):
```json
{
  "userId": 1,
  "targetTrackIds": ["DQN_2026_7480201", "YKV_2026_7720101"],
  "targetComboCode": "A00"
}
```
* **Response DTO**:
```json
{
  "success": true,
  "message": "Phân tích Three-Way Decision thành công",
  "data": {
    "posZone": [
      {
        "trackId": "DQN_2026_7480201",
        "institutionCode": "DQN",
        "institutionName": "Trường Đại học Quy Nhơn",
        "majorName": "Công nghệ thông tin",
        "comboCode": "A00",
        "candidateScore": 26.53,
        "referenceScore": 24.5,
        "deltaScore": 2.03,
        "zone": "POS",
        "admissionProbability": 92.5,
        "recommendation": "Ngành an toàn cao, thích hợp đặt làm nguyện vọng chắc chân (NV2/NV3)."
      }
    ],
    "bndZone": [],
    "negZone": [
      {
        "trackId": "YKV_2026_7720101",
        "institutionCode": "YKV",
        "institutionName": "Trường Đại học Y khoa Vinh",
        "majorName": "Y khoa",
        "comboCode": "B00",
        "candidateScore": 21.0,
        "referenceScore": 25.5,
        "deltaScore": -4.5,
        "zone": "NEG",
        "admissionProbability": 15.0,
        "recommendation": "Rủi ro rất cao, không nên lãng phí nguyện vọng trừ khi có chính sách ưu tiên đặc biệt."
      }
    ]
  },
  "timestamp": "2026-09-18T10:30:00Z"
}
```

---

## 3. CÁC ĐIỀU KIỆN BẤT BIẾN & TRƯỜNG HỢP BIÊN (INVARIANTS & EDGE CASES)

* 🔴 **Bất biến 1 (Score Boundary)**: Mọi điểm thành phần môn thi phải trong đoạn $[0.0, 10.0]$. Tổng điểm 3 môn tổ hợp không bao giờ vượt quá $30.0$.
* 🔴 **Bất biến 2 (Priority Discounting)**: Nếu tổng điểm 3 môn $< 22.5$, điểm ưu tiên giữ nguyên $100\%$. Nếu $\ge 22.5$, điểm ưu tiên bắt buộc áp dụng công thức chiết khấu giảm dần của Bộ GD&ĐT.
* ⚠️ **Trường hợp biên 1**: Thí sinh không thi môn trong tổ hợp (ví dụ không thi môn Sinh nhưng xét khối B00) $\rightarrow$ Điểm tổ hợp đó là `null`, không đưa vào đánh giá TWD.
* ⚠️ **Trường hợp biên 2**: Ngành chưa có điểm chuẩn năm trước $\rightarrow$ Lấy điểm sàn tối thiểu $15.0$ làm mốc tham chiếu và đánh dấu nhãn `ESTIMATED`.

---

## 4. MA TRẬN KIỂM THỬ (TEST MATRIX & ACCEPTANCE CRITERIA)

| Test ID | Kịch bản kiểm thử (Scenario) | Input | Kết quả mong đợi |
| :---: | :--- | :--- | :--- |
| **TC-01** | Tính điểm tổ hợp A00 chuẩn xác | Toán: 8.0, Lý: 9.0, Hóa: 8.5, KV3 | A00 = 25.5đ, Priority = 0đ |
| **TC-02** | Tính điểm ưu tiên có chiết khấu $\ge 22.5$ | Toán: 9.0, Lý: 9.0, Hóa: 9.0 (Tổng 27đ), KV1 (0.75đ) | Priority = $0.75 \times \frac{30 - 27}{7.5} = 0.30$đ |
| **TC-03** | Phân vùng POS | Điểm TS: 26.0, Điểm chuẩn: 24.5 ($\Delta = +1.5$) | Gán đúng vùng `POS`, xác suất $\ge 85\%$ |
| **TC-04** | Phân vùng BND | Điểm TS: 24.0, Điểm chuẩn: 24.5 ($\Delta = -0.5$) | Gán đúng vùng `BND`, xác suất $50\% - 84\%$ |
| **TC-05** | Phân vùng NEG | Điểm TS: 22.0, Điểm chuẩn: 24.5 ($\Delta = -2.5$) | Gán đúng vùng `NEG`, xác suất $< 50\%$ |

---

## 5. KẾ HOẠCH TRIỂN KHAI CHI TIẾT (TASK CHECKLIST)
- [ ] **Task 1.1**: Viết `CombinationScoreCalculatorTest` và `TwdDecisionEngineTest` (JUnit 5 - TDD).
- [ ] **Task 1.2**: Triển khai `CombinationScoreCalculatorService` hỗ trợ 191 tổ hợp và công thức điểm ưu tiên Bộ GD&ĐT.
- [ ] **Task 1.3**: Triển khai `TwdDecisionService` tính toán 3 vùng POS/BND/NEG.
- [ ] **Task 1.4**: Tạo Controller `TwdController` và `UserScoreCalculationController`.
- [ ] **Task 1.5**: Chạy `mvn test` xác nhận 100% Tests Passed.
