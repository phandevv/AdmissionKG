# Kiến trúc Hệ thống AdmissionKG (Full Module Blueprint Architecture)

Tài liệu này mô tả chi tiết cấu trúc tổng thể và phân chia module trong hệ thống khám phá tri thức tuyển sinh đại học **AdmissionKG** phát triển theo mô hình **Module Blueprint Architecture**.

---

## 🏛 1. Sơ đồ Cấu trúc Module Backend

```text
com.admissions.backend/
├── BackendApplication.java
│
├── common/                              # Shared Common Core
│   ├── config/                          # SecurityConfig, Neo4jDriverConfig, DeepSeekConfig
│   ├── exception/                       # GlobalExceptionHandler, AppException, ErrorResponse
│   ├── security/                        # JwtUtil
│   ├── utils/                           # CypherCleanUtils, JsonUtils
│   └── constants/                       # AppConstants
│
├── auth/                                # Auth Module
│   ├── controller/                      # AuthController
│   ├── service/                         # AuthService
│   ├── repository/                      # RoleRepository
│   ├── entity/                          # Role.java
│   ├── dto/                             # LoginRequestDto, LoginResponseDto
│   ├── mapper/                          # RoleMapper
│   └── exception/                       # AuthException
│
├── user/                                # User Management Module
│   ├── controller/                      # UserController
│   ├── service/                         # UserService
│   ├── repository/                      # UserRepository
│   ├── entity/                          # User.java
│   ├── dto/                             # UserDto
│   ├── mapper/                          # UserMapper
│   ├── specification/                   # UserSpecification
│   └── exception/                       # UserNotFoundException
│
├── admin/                               # Admin Ingestion Module
│   ├── controller/                      # AdminIngestController
│   ├── service/                         # IngestService
│   ├── dto/                             # IngestRequestDto, IngestedGraphDataDto
│   ├── mapper/                          # IngestMapper
│   └── exception/                       # IngestException
│
├── chat/                                # Chat Graph RAG Module
│   ├── controller/                      # ChatController
│   ├── service/                         # GraphRagService, DeepSeekLlmService
│   ├── repository/                      # ChatHistoryRepository
│   ├── entity/                          # ChatHistory.java (JPA)
│   ├── dto/                             # ChatRequestDto, ChatResponseDto, SubgraphDto, GraphNodeDto, GraphEdgeDto
│   ├── mapper/                          # ChatMapper
│   └── exception/                       # ChatException
│
├── tao/                                 # TAO Framework Module
│   ├── service/                         # TaoDecisionService
│   ├── dto/                             # TaoResultDto, MajorEvaluationDto
│   └── exception/                       # TaoEvaluationException
│
└── admission/                           # Admission Domain Module
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

## 🧩 2. Chi tiết các Feature Modules Frontend (`frontend/src/modules/`)

1. **`shared`**:
   - `DemoStatusPage.jsx` (`/status`): Dashboard kiểm tra API Health Check & kết nối toàn hệ thống.
   - `Navbar.jsx`: Thanh điều hướng responsive.
   - `api.js`: Axios client tập trung xử lý kết nối backend với URL relative `/api/v1`.
2. **`admin`**: Trang quản trị `/admin` hỗ trợ dán văn bản Đề án tuyển sinh, bóc tách JSON & nạp đồ thị Neo4j.
3. **`chat`**: Màn hình `/chat` dạng Split-screen Dashboard:
   - Cột trái: Chatbot Messenger + Nhập điểm thí sinh + 3 Thẻ màu phân loại TAO Decision (POS 🟢, BND 🟡, NEG 🔴).
   - Cột phải: Trực quan hóa Subgraph tương tác bằng Cytoscape.js.

---

## 🐳 3. Sơ đồ Request Flow & CORS trong Docker Compose

```text
Trình duyệt Browser (http://localhost:3000)
       │
       ▼
[Nginx Container (admissions_frontend:80)]
       ├── /status, /chat, /admin  ──► Trả về React SPA static build
       └── /api/v1/*                ──► Reverse Proxy internal DNS
                                              │
                                              ▼
                                 [Spring Boot (admissions_backend:8080)]
                                              ├── PostgreSQL (admissions_postgres:5432)
                                              ├── Neo4j Aura (neo4j+s://...)
                                              └── DeepSeek LLM (api.deepseek.com)
```
