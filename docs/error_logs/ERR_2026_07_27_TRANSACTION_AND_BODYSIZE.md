# Báo cáo Lỗi và Phương án Sửa đổi (Error Incident Report)

**Ngày ghi nhận**: 2026-07-27
**Môi trường**: Docker Compose (Nginx + Spring Boot + Neo4j + PostgreSQL)

---

## 📌 Lỗi 1: HTTP 500 - Ambiguous TransactionManager (JPA vs Neo4j)

### Triệu chứng:
Khi gọi API `GET /api/v1/universities?page=0&size=10` hoặc `GET /api/v1/majors?page=0&size=10`:
```text
No qualifying bean of type 'org.springframework.transaction.TransactionManager' available:
expected single matching bean but found 2: transactionManager,reactiveTransactionManager
```

### Phân tích Nguyên nhân:
Dự án đồng thời sử dụng **Spring Data JPA** (PostgreSQL) và **Spring Data Neo4j**. Cả 2 thư viện đều tự động đăng ký TransactionManager:
- `transactionManager` (JPA / Hibernate)
- `reactiveTransactionManager` / `neo4jTransactionManager` (Neo4j)

Khi các Service (`UniversityService`, `MajorService`) khai báo `@Transactional`, Spring Boot không xác định được bean nào là mặc định nên trả về lỗi `500 Internal Server Error`.

### Phương án Khắc phục:
1. Tạo class cấu hình [`TransactionConfig.java`](../../backend/src/main/java/com/admissions/backend/common/config/TransactionConfig.java) đánh dấu `@Primary` cho `transactionManager` (JPA).
2. Chỉ định rõ `value = "transactionManager"` trong annotation `@Transactional` tại các Service JPA.

---

## 📌 Lỗi 2: HTTP 413 - Request Entity Too Large khi Upload PDF

### Triệu chứng:
Khi gửi request `POST /api/v1/admin/ingest-pdf` mang file PDF Đề án Tuyển sinh từ Frontend:
```text
Failed to load resource: the server responded with a status of 413 (Request Entity Too Large)
nginx/1.31.3
```

### Phân tích Nguyên nhân:
Nginx Web Server chạy ở Frontend container mặc định giới hạn dung lượng file tải lên (`client_max_body_size`) là **1MB**. File PDF Đề án tuyển sinh thường có dung lượng từ 3MB - 20MB nên Nginx chủ động từ chối request ngay tại tầng Reverse Proxy trước khi chuyển tới Spring Boot.

### Phương án Khắc phục:
Thêm cấu hình `client_max_body_size 50M;` trong file [`frontend/nginx.conf`](../../frontend/nginx.conf) và tăng `proxy_read_timeout` lên 180s cho phép xử lý file PDF lớn & chạy OCR.
