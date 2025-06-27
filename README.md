# 📋 전략패턴 기반 게시판 시스템

> 전략패턴(Strategy Pattern)을 활용하여 무한스크롤과 페이징 두 가지 게시글 로딩 전략을 선택적으로 제공하는 게시판 리스트 시스템

## 🚀 빠른 시작
백그라운드에서 전체 시스템 실행
docker-compose up --build -d

시스템 종료
docker-compose down


### Docker로 전체 시스템 실행

실행 후 브라우저에서 `http://localhost:3000`으로 접속하세요.

## 🛠 기술 스택

### 🎨 Frontend
- **Vue.js 3.0** (Composition API) - 모던 프론트엔드 프레임워크
- **Quasar Framework + Tailwind CSS** - UI 컴포넌트 및 스타일링
- **Pinia** - 상태 관리
- **Axios** - API 통신
- **Node.js v22.17.0** - 런타임 환경
- **pnpm** - 패키지 관리
- **Vite** - 빌드/개발 서버
- **Vitest** - 테스트 프레임워크

### ⚙️ Backend
- **Java 21** - 최신 LTS 버전의 자바 사용
- **Spring Boot 3.x** - 최신 스프링 부트 프레임워크
- **Spring Data JPA** - ORM 기반 데이터 접근
- **H2 Database (인메모리)** - 개발/테스트용 인메모리 데이터베이스
- **Lombok** - 반복 코드(게터/세터 등) 자동 생성
- **Spring Validation** - 입력값 검증 자동화
- **Gradle** - 빌드 도구 및 의존성 관리
- **JUnit 5** - 단위 테스트 및 통합 테스트 프레임워크

## 🏗 아키텍처 설계

### 전략패턴 구현
LoadStrategy Interface
├── InfiniteScrollStrategy (무한스크롤)
└── PaginationStrategy (페이징)

## 🏗 전략패턴 설계
- `LoadStrategy` 인터페이스 정의
- 무한스크롤 전략 (`InfiniteScrollStrategy`)
- 페이징 전략 (`PaginationStrategy`)
- Context 클래스를 통한 전략 선택 및 실행


사용자가 UI에서 로딩 방식을 선택하면, 백엔드에서 해당 전략을 적용하여 데이터를 제공합니다.

## 📁 프로젝트 구조
├── backend/ # Spring Boot 백엔드
│ ├── src/main/java/
│ │ ├── strategy/ # 전략패턴 구현체
│ │ ├── controller/ # REST API 컨트롤러
│ │ ├── service/ # 비즈니스 로직
│ │ ├── entity/ # JPA 엔티티
│ │ └── repository/ # 데이터 접근 계층
│ ├── build.gradle
│ └── Dockerfile
├── frontend/ # Vue.js 프론트엔드
│ ├── src/
│ │ ├── components/ # Vue 컴포넌트
│ │ ├── stores/ # Pinia 스토어
│ │ ├── services/ # API 통신 서비스
│ │ └── composables/ # Composition API 훅
│ ├── package.json
│ └── Dockerfile
├── docker-compose.yml # Docker 컨테이너 설정
└── README.md

## 🎯 주요 기능

- ✅ **게시글 목록 조회** - RESTful API 기반 데이터 로딩
- ✅ **전략 선택 UI** - 토글을 통한 로딩 방식 변경
- ✅ **무한스크롤** - 스크롤 기반 동적 로딩
- ✅ **페이징** - 페이지 기반 데이터 로딩
- ✅ **반응형 디자인** - Quasar + Tailwind CSS 활용
- ✅ **예외 처리** - Spring Validation 및 에러 핸들링

## 🌐 API 명세

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/api/posts` | 게시글 목록 조회 | `strategy`, `page`, `size` |

**예시 요청**
