# Backend Service Rules (Java Spring Boot - Full Module Blueprint)

Bộ quy tắc tiêu chuẩn dành cho việc phát triển **Backend Service**. Mỗi module phải đầy đủ các package như một sub-project Java độc lập.

---

## 📋 1. Công nghệ & Thư viện sử dụng
- **Java**: Version 17+ / 21
- **Framework**: Spring Boot 3.2.x
- **Graph Database**: Neo4j (`neo4j-java-driver`)
- **Relational DB**: PostgreSQL (`spring-boot-starter-data-jpa`, Flyway Migration)
- **LLM Provider**: DeepSeek API (REST Client)
- **Security**: Spring Security + JWT (`io.jsonwebtoken`)
- **Utilities**: Lombok (`@Data`, `@Builder`, `@Slf4j`)

---

## 📐 2. Cấu trúc Package chuẩn

```text
com.admissions.backend/
├── BackendApplication.java
│
├── common/                              # Shared Core dùng chung toàn hệ thống
│   ├── config/                          # SecurityConfig, Neo4jDriverConfig, DeepSeekConfig
│   ├── exception/                       # GlobalExceptionHandler, AppException, ErrorResponse
│   ├── security/                        # JwtUtil
│   ├── utils/                           # CypherCleanUtils, JsonUtils
│   ├── constants/                       # AppConstants
│   ├── annotation/                      # Custom annotations
│   └── mapper/                          # Shared mappers
│
├── auth/                                # Module Xác thực & Phân quyền
│   ├── controller/                      # AuthController
│   ├── service/                         # AuthService
│   ├── repository/                      # RoleRepository
│   ├── entity/                          # Role.java
│   ├── dto/                             # LoginRequestDto, LoginResponseDto
│   ├── mapper/                          # RoleMapper
│   └── exception/                       # AuthException
│
├── user/                                # Module Quản lý Người dùng
│   ├── controller/                      # UserController
│   ├── service/                         # UserService
│   ├── repository/                      # UserRepository
│   ├── entity/                          # User.java
│   ├── dto/                             # UserDto
│   ├── mapper/                          # UserMapper
│   ├── specification/                   # UserSpecification
│   └── exception/                       # UserNotFoundException
│
├── admin/                               # Module Nạp Dữ liệu Tuyển sinh
│   ├── controller/                      # AdminIngestController
│   ├── service/                         # IngestService
│   ├── dto/                             # IngestRequestDto, IngestedGraphDataDto
│   ├── mapper/                          # IngestMapper
│   └── exception/                       # IngestException
│
├── chat/                                # Module Hỏi đáp Graph RAG
│   ├── controller/                      # ChatController
│   ├── service/                         # GraphRagService, DeepSeekLlmService
│   ├── repository/                      # ChatHistoryRepository
│   ├── entity/                          # ChatHistory.java (JPA - lưu lịch sử)
│   ├── dto/                             # ChatRequestDto, ChatResponseDto, GraphNodeDto, GraphEdgeDto, SubgraphDto
│   ├── mapper/                          # ChatMapper
│   └── exception/                       # ChatException
│
├── tao/                                 # Module Three-Way Decision Framework
│   ├── service/                         # TaoDecisionService
│   ├── dto/                             # TaoResultDto, MajorEvaluationDto
│   └── exception/                       # TaoEvaluationException
│
└── admission/                           # Module CSDL Quan hệ Tuyển sinh
    ├── controller/                      # UniversityController, MajorController
    ├── service/                         # UniversityService, MajorService
    ├── repository/                      # UniversityRepository, MajorRepository, CutoffScoreRepository
    ├── entity/                          # University, Major, AdmissionMethod, SubjectCombination, CutoffScore, Tuition, Scholarship
    ├── dto/                             # UniversityDto, MajorDto, CutoffScoreDto
    ├── mapper/                          # UniversityMapper, MajorMapper
    ├── specification/                   # UniversitySpecification
    └── exception/                       # UniversityNotFoundException, MajorNotFoundException
```

---

## 📏 3. Nguyên tắc thiết kế Module

1. **Mỗi module là một bounded context độc lập**: Không được gọi trực tiếp `repository` của module khác - chỉ được gọi qua `service` của module đó.
2. **Exception phân cấp**: Exception của module kế thừa `AppException` từ `common.exception`. `GlobalExceptionHandler` xử lý tập trung.
3. **Mapper bắt buộc**: Mọi chuyển đổi `Entity <-> DTO` phải thực hiện qua Mapper, không làm trực tiếp trong Controller/Service.
4. **Specification cho tìm kiếm phức tạp**: Dùng `Specification` (JPA Criteria API) cho các filter động.
5. **Constants tập trung**: Mọi hằng số (threshold, message, API path) phải khai báo trong `AppConstants`.
