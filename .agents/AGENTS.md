# Master AGENTS Configuration & Rules Index

Tài liệu này là trung tâm cấu hình quy tắc (Rules) và kỹ năng (Skills) dành cho Agent (AI Assistant) khi làm việc trên dự án **AdmissionKG**.

---

## 📂 1. Cấu trúc Quản lý Quy tắc & Skills (`.agents/`)

Dự án phân chia các bộ quy tắc và kỹ năng theo từng Module chuyên biệt trong thư mục `.agents/`:

```
.agents/
├── AGENTS.md                            # [Master File] Quy tắc chung & Cấu trúc dự án
├── error_logs/                          # [Nhật ký Lỗi] Lưu vết Bug & Sự cố theo ngày (YYYY-MM-DD.md)
│   ├── README.md                        # Hướng dẫn ghi log lỗi
│   └── template.md                      # Mẫu báo cáo lỗi & lịch sử sửa lỗi (Fix lần 1, 2...)
├── rules/                               # [Rules] Bộ quy tắc phát triển theo từng service
│   ├── backend_rules.md                 # Quy chuẩn cho Backend (Spring Boot Module Blueprint)
│   ├── frontend_rules.md                # Quy chuẩn cho Frontend (React JS Feature Modules)
│   ├── aiservice_rules.md               # Quy chuẩn cho Module Java AI & Graph RAG
│   ├── spec_driven_rules.md             # Quy chuẩn Spec-Driven Development (SpecKit & Invariants)
│   └── error_logging_rules.md           # Quy tắc xử lý & ghi nhật ký Bug/Lỗi
└── skills/                              # [Skills] Hướng dẫn kỹ năng chuyên biệt
    ├── backend-dev/SKILL.md             # Kỹ năng Spring Boot & Neo4j Repository
    ├── frontend-dev/SKILL.md            # Kỹ năng React Component & Cytoscape Graph Viewer
    ├── react-best-practices/SKILL.md    # Kỹ năng React Best Practices & Performance (Vercel)
    ├── ai-graph-rag/SKILL.md            # Kỹ năng Graph RAG Pipeline, Cypher & DeepSeek LLM
    ├── kafka-messaging/SKILL.md         # Kỹ năng tích hợp Event-Driven với Kafka
    ├── dr-jskill/SKILL.md               # Kỹ năng Best Practices Spring Boot (Julien Dubois)
    ├── neo4j-cypher-skill/SKILL.md      # Kỹ năng viết Cypher query chuyên sâu (Neo4j Labs)
    ├── neo4j-spring-data-skill/SKILL.md # Kỹ năng Spring Data Neo4j (Neo4j Labs)
    ├── neo4j-graphrag-skill/SKILL.md    # Kỹ năng GraphRAG & Knowledge Graph (Neo4j Labs)
    └── neo4j-modeling-skill/SKILL.md    # Kỹ năng Graph Data Modeling (Neo4j Labs)
```

---

## 🏛 2. Tóm tắt Kiến trúc Dự án (Module Blueprint Architecture)

- **Backend (`backend/src/main/java/com/admissions/backend/`)**:
  - `common/`: Configs (Security, Neo4j, DeepSeek), Exceptions, Utils.
  - `auth/` & `user/`: Quản lý tài khoản, phân quyền (Role, User).
  - `admin/`: Dịch vụ bóc tách Đề án tuyển sinh & Nạp Cypher MERGE vào Neo4j.
  - `chat/`: Engine Graph RAG, sinh Cypher bằng DeepSeek LLM, trích xuất Subgraph.
  - `tao/`: Bộ máy phân loại nguyện vọng 3 vùng (Three-Way Decision: POS 🟢, BND 🟡, NEG 🔴).
  - `admission/`: CSDL quan hệ PostgreSQL với 7 JPA Entities tuyển sinh.
- **Frontend (`frontend/src/modules/`)**:
  - `admin/`: Trang quản trị dán văn bản PDF & xem trước dữ liệu nạp.
  - `chat/`: Màn hình Split-Screen Dashboard (Messenger Chat + 3 thẻ TAO + Cytoscape.js Explorer).
  - `shared/`: Shared Navbar & Axios API Client.
- **Databases**: PostgreSQL (Quan hệ) + Neo4j Aura Cloud (Đồ thị tri thức).

---

## 📑 3. Danh sách Quy tắc & Links tham chiếu

- ☕ **Backend Rules**: Xem chi tiết tại [backend_rules.md](rules/backend_rules.md)
- ⚛️ **Frontend Rules**: Xem chi tiết tại [frontend_rules.md](rules/frontend_rules.md)
- 🐍 **Java AI Module Rules**: Xem chi tiết tại [aiservice_rules.md](rules/aiservice_rules.md)
- 📐 **Spec-Driven Rules**: Xem chi tiết tại [spec_driven_rules.md](rules/spec_driven_rules.md)
- 🐞 **Error Logging Rules**: Xem chi tiết tại [error_logging_rules.md](rules/error_logging_rules.md)
