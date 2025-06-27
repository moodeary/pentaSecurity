# 1단계: 빌드
FROM gradle:8.7-jdk21 AS builder
WORKDIR /app

# 빌드 파일 복사 및 의존성 설치
COPY build.gradle settings.gradle ./
RUN gradle --no-daemon dependencies

# 소스 복사 및 빌드
COPY src ./src
RUN gradle --no-daemon bootJar

# 2단계: 런타임
FROM openjdk:21-jdk-slim
WORKDIR /app

# 빌드 결과물 복사
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]