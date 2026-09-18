---
name: kafka-messaging
description: Guidelines and instructions for Event-Driven architecture, Kafka topic management, producers, and consumers.
---

# Kafka Event Messaging Skill

Kỹ năng này hướng dẫn tích hợp Apache Kafka cho truyền nhận sự kiện bất đồng bộ giữa các services.

## 🛠 Hướng dẫn thực thi:
1. **Topics Design**:
   - Định nghĩa các topic theo quy chuẩn `admission.<domain>.<event>` (VD: `admission.university.updated`).
2. **Spring Boot Integration**:
   - Sử dụng `KafkaTemplate` để publish events và `@KafkaListener` để tiêu thụ events.
