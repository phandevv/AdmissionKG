---
name: backend-dev
description: Guidelines and instructions for developing Spring Boot Java backend microservices, Spring Data JPA, and Spring Data Neo4j integration.
---

# Java Spring Boot Backend Development Skill

Kỹ năng này hướng dẫn các bước xây dựng và phát triển backend service cho hệ thống AdmissionKG.

## 🛠 Hướng dẫn thực thi:
1. **Repository Layer**:
   - PostgreSQL repositories kế thừa `JpaRepository`.
   - Neo4j repositories kế thừa `Neo4jRepository`.
2. **DTO Mapping**:
   - Sử dụng DTOs cho tất cả Request/Response payloads, không trả về trực tiếp Entities/Nodes ra REST API.
3. **Authentication**:
   - Xử lý JWT Bearer token trong Header `Authorization: Bearer <token>`.
