# 📋 전략패턴 기반 게시판 시스템

> 전략패턴(Strategy Pattern)을 활용하여 무한스크롤과 페이징 두 가지 게시글 로딩 전략을 선택적으로 제공하는 게시판 리스트 시스템

## 🚀 빠른 시작

실행 명령어 : docker-compose up --build -d
종료 명령어 : docker-compose down

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



## 🌐 API 명세

### 게시글 목록 조회 (GET)
| 항목       | 내용                                  |
|------------|---------------------------------------|
| **Endpoint** | `/api/posts`                          |
| **Method** | GET                                   |
| **Parameters** | `strategy` (필수), `page`, `size`    |
| **검색 조건** | `keyword`, `sortBy`, `sortDir`       |

### 게시글 생성 (POST)
| 항목       | 내용                                  |
|------------|---------------------------------------|
| **Endpoint** | `/api/posts`                          |
| **Method** | POST                                  |
| **Body**   | `title`, `content`, `author`         |


## 🏗 전략패턴 설계

- `LoadStrategy` 인터페이스 정의
- 무한스크롤 전략 (`InfiniteScrollStrategy`)
- 페이징 전략 (`PaginationStrategy`)


## 🎯 주요 기능

- ✅ **게시글 목록 조회** - RESTful API 기반 데이터 로딩
- ✅ **전략 선택 UI** - 토글을 통한 로딩 방식 변경
- ✅ **무한스크롤** - 스크롤 기반 동적 로딩
- ✅ **페이징** - 페이지 기반 데이터 로딩
- ✅ **반응형 디자인** - Quasar + Tailwind CSS 활용
- ✅ **예외 처리** - Spring Validation 및 에러 핸들링


## 핵심 기능 요약
1. **전략 패턴 구현**
   - `loadPostsByStrategy()` 메서드에서 전략 실행
   - `strategy` 값으로 무한스크롤/페이징 선택

2. **동적 검색/정렬**
   - `PostSearchDto`로 검색 조건 캡슐화
   - 기본값 설정으로 편의성 향상

3. **안전한 데이터 처리**
   - Spring Validation으로 입력값 검증
   - DTO → Entity 변환 메서드 제공

4. **표준화된 응답**
   - `ApiResponse`로 일관된 응답 구조 제공
