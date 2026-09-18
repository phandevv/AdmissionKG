# Java AI Module & Graph RAG Rules

Bộ quy tắc tiêu chuẩn dành cho việc phát triển **Phân hệ AI & Graph RAG** tích hợp trực tiếp trong Java Spring Boot.

---

## 📋 1. Công nghệ & Thư viện sử dụng
- **Language**: Java 17+
- **Framework**: Spring Boot 3.2.x
- **Graph Database**: Spring Data Neo4j (`spring-boot-starter-data-neo4j`)
- **HTTP Client**: `WebClient` / `RestClient` (Spring WebFlux / Web) gọi Gemini REST API.
- **LLM Integration**: Google Gemini API SDK / REST API.

---

## 📐 2. Cấu trúc Package AI trong Java Backend
```text
com.admissions.backend.ai/
├── controller/     # AiChatController (@RestController - Endpoints /api/v1/ai/chat)
├── service/        # GraphRagService, GeminiLlmService, CypherQueryGenerator
├── dto/            # AiChatRequest, AiChatResponse, SubgraphDto
├── config/         # GeminiConfig, Neo4jConfig
└── prompt/         # SystemPrompts, CypherPrompts templates
```

---

## 💡 3. Nguyên tắc Graph RAG Pipeline trong Java
1. **Phân tích Intent & Cypher Generation**: Chuyển câu hỏi ngôn ngữ tự nhiên thành Cypher query bằng Prompting / Rules.
2. **Neo4j Graph Retrieval**: Sử dụng `Neo4jClient` hoặc `Neo4jRepository` để truy vấn Neo4j Aura Cloud lấy Subgraph.
3. **Gemini LLM Call**: Gửi Context Subgraph tới Gemini API thu về phản hồi ngôn ngữ tự nhiên.
4. **Resilience**: Sử dụng `Resilience4j` Circuit Breaker & Retry để bảo vệ ứng dụng khi Gemini API gặp sự cố.
