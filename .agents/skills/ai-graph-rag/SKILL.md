---
name: ai-graph-rag
description: Guidelines and instructions for Python AI Service, Graph RAG pipeline, Cypher query generation, and Gemini LLM.
---

# Python AI & Graph RAG Skill

Kỹ năng này hướng dẫn xây dựng dịch vụ AI với Graph RAG và tích hợp Gemini LLM.

## 🛠 Hướng dẫn thực thi:
1. **Neo4j Cypher Generation**:
   - Sử dụng `neo4j` Python driver kết nối tới `NEO4J_URI` (Neo4j Aura Cloud).
   - Tối ưu hóa các câu truy vấn Cypher MATCH pattern.
2. **LangChain & Gemini Integration**:
   - Sử dụng `ChatGoogleGenerativeAI` với model `gemini-1.5-flash` hoặc `gemini-pro`.
   - Đưa tri thức đồ thị vào Prompt template dưới dạng context có cấu trúc.
