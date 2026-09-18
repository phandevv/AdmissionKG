# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Cache dependencies layer
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Build
COPY src ./src
RUN mvn package -DskipTests -B

# Stage 2: Runtime (lightweight JRE)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Install curl for healthcheck & tesseract-ocr for scanned PDF OCR
RUN apk add --no-cache curl tesseract-ocr tesseract-ocr-data-vie tesseract-ocr-data-eng

# Copy built JAR
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

# JVM tuning cho container
ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
