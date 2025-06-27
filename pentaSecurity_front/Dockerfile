# 1단계: 빌드 스테이지
FROM node:22-alpine AS build-stage

# 필수 패키지 설치 및 pnpm 설치
RUN apk add --no-cache curl && \
    curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm && \
    chmod +x /bin/pnpm

# 환경변수 설정
ENV PNPM_HOME="/bin"
ENV PATH="$PNPM_HOME:$PATH"

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치 (Lockfile 기반)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 소스 복사 및 빌드
COPY . .
RUN pnpm run build

# 2단계: Nginx 서빙
FROM nginx:stable-alpine AS production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]