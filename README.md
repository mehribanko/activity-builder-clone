
# Activity Builder

**학생들 대상으로 activity 관리 및 분석 앱**입니다.  
사용자는 단계별 가이드를 통해 활동 내용을 작성하고, 자동으로 계산되는 **Impact Score**를 확인할 수 있고, **Drag & Drop**을 통해 활동 목록을 관리할 수 있습니다.

> 이 프로젝트는 `edmission.dev`의 Activity Builder 기능을 참고했습니다.

---

## Tech Stack

### Frontend
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/>

* **Core:** React 18, Vite
* **Styling:** Tailwind CSS, clsx, tailwind-merge (shadcn/ui)
* **Icons:** lucide-react
* **Interaction:** **@dnd-kit** (Core, Sortable, Utilities) - *드래그 앤 드롭 정렬 구현*

### Backend
<img src="https://img.shields.io/badge/Java-007396?style=flat-square&logo=Java&logoColor=white"/> <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=Spring&logoColor=white"/> <img src="https://img.shields.io/badge/Spring Data JPA-6DB33F?style=flat-square&logo=Spring&logoColor=white"/> <img src="https://img.shields.io/badge/H2 Database-003545?style=flat-square&logo=h2&logoColor=white"/>

* **Framework:** Spring Boot 3.x (Web, Data JPA, Validation)
* **Database:** H2 Database (In-Memory)
* **Utils:** Lombok


---

## ✨ Key Features

### 1. Multi-Step Activity Builder (단계별 작성)
* **사이드바 내비게이션:** Step 2-1부터 2-5, 3-1까지 이어지는 단계별 UI를 제공하며, 사이드바를 통해 이동이 가능합니다.
* **입력 폼 (Step 2-1 ~ 2-5):**
    * 활동 이름, 카테고리(Sports, Arts 등), Tier(참여 수준) 입력
    * 활동 설명 (Description): **실시간 글자 수 카운팅** 및 150자 제한 검증
    * 주당 활동 시간 (0~40시간) 및 리더십 여부 체크

### 2. Dynamic Impact Score System (동적 점수 산출)
사용자의 입력에 따라 활동의 영향력을 실시간으로 계산하여 배지(Badge) 형태로 시각화합니다.
* **산출 로직:** `Tier 점수` + `Leadership 보너스(+2)` + `시간 보너스(+1, 10시간 초과 시)`
* **시각화:** 점수 구간에 따라 Low(회색) ~ Exceptional(보라색) 등으로 색상이 동적으로 변경됩니다.

### 3. Activity Management (Step 3-1)
* **Card UI:** 추가된 활동을 카드 형태로 요약하여 보여줍니다. (이름, 카테고리, Tier, Impact Score 등 표시)
* **CRUD:** 활동을 **수정(Edit)** 및 **삭제(Delete)** 할 수 있습니다.
* **Drag & Drop Sorting:** `@dnd-kit`을 사용하여 활동 카드들의 순서를 드래그 앤 드롭으로 자유롭게 변경할 수 있습니다.
* **Tutorial Modal:** 최초 진입 시 또는 버튼 클릭 시 사용법을 안내하는 모달을 제공합니다.

### 4. Data Persistence & API
* **Spring Boot 연동:** 작성 완료된 활동 데이터는 'Save Activity' 버튼을 통해 백엔드 API로 전송됩니다.
* **H2 Database:** 데이터는 인메모리 DB인 H2에 저장되어 관리됩니다.

---

## How to Run

### Prerequisites
* Java 17 이상
* Node.js 18 이상

### 1. Backend (Spring Boot)
```bash
# 프로젝트 루트에서 backend 폴더로 이동
cd backend

# Gradle 빌드 및 실행
./gradlew bootRun
````

  * 서버가 `http://localhost:8080`에서 실행됩니다.
  * H2 Console 접속: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:testdb` 등 설정 확인)

### 2\. Frontend (React)

```bash
# 프로젝트 루트에서 frontend 폴더로 이동
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

  * 브라우저에서 `http://localhost:5173` (또는 터미널에 표시된 포트)으로 접속합니다.

-----

## Future Improvements & Limitations

현재 버전은 핵심 기능 구현에 집중하였으며, 시간 제약상 아래 기능들은 추후 업데이트 예정입니다.

  * **반응형 디자인 (Responsive Design):** 현재 데스크탑 환경에 최적화되어 있으며, 모바일 환경 대응은 추후 진행 예정입니다.
  * **다크 모드 (Dark Mode):** UI 컴포넌트는 다크 모드를 고려하여 설계되었으나, 테마 토글 기능은 아직 구현되지 않았습니다.
  * **인증 (Authentication):** 현재는 로그인 없이 로컬 세션 단위로 동작하며, 추후 사용자 인증 기능이 추가될 수 있습니다.

-----

## Project Structure

### Frontend

```
src/
├── components/         # UI 컴포넌트 (StepContent, SortableActivityItem 등)
├── lib/               # 유틸리티 및 상수 (api.js, constant.jsx, utils.js)
├── App.jsx            # 메인 라우팅 및 레이아웃
└── ...
```

### Backend

```
src/main/java/com/example/
├── controller/        # ActivityController (REST API 엔드포인트)
├── entity/            # Activity (JPA Entity)
├── repository/        # ActivityRepository
├── service/           # 비즈니스 로직
└── ...
```

```

***
```
