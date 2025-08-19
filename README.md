# SENDY - 디지털 뱅킹 서비스

안전하고 편리한 디지털 뱅킹 서비스입니다.

## 🚀 주요 기능

- **회원가입/로그인**: 간편한 계정 관리
- **송금**: 안전하고 빠른 송금 서비스 (로그인 필요)
- **거래내역 조회**: 상세한 거래 내역 확인 (로그인 필요)
- **계좌 관리**: 실시간 잔액 확인 (로그인 필요)

## 🛠 기술 스택

- **Frontend**: Vue 3 + Vite
- **UI/UX**: Modern CSS with Flexbox/Grid
- **Routing**: Vue Router
- **Styling**: Scoped CSS
- **Authentication**: LocalStorage 기반 인증

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 16.0 이상
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 🏗 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Header.vue      # 헤더 컴포넌트
│   └── Footer.vue      # 푸터 컴포넌트
├── views/              # 페이지 컴포넌트
│   ├── Home.vue        # 홈페이지
│   ├── Signup.vue      # 회원가입 페이지
│   ├── Login.vue       # 로그인 페이지
│   ├── Transfer.vue    # 송금 페이지 (로그인 필요)
│   └── TransactionHistory.vue  # 거래내역 페이지 (로그인 필요)
├── router/             # 라우팅 설정
│   └── index.js
├── services/           # API 서비스
│   └── authService.js  # 인증 서비스
└── assets/             # 정적 자산
```

## 🎯 주요 페이지

### 홈페이지 (`/`)
- **로그인 전**: SENDY 소개 및 주요 기능 안내
- **로그인 후**: 계좌 정보, 빠른 메뉴, 최근 거래내역

### 회원가입 (`/signup`)
- 사용자 정보 입력
- 비밀번호 확인
- 계정 생성

### 로그인 (`/login`)
- 이메일/비밀번호 로그인
- 로그인 상태 유지 옵션

### 송금 (`/transfer`) - 로그인 필요
- 받는 사람 정보 입력
- 송금 금액 설정
- 실시간 잔액 확인

### 거래내역 (`/transactions`) - 로그인 필요
- 전체/보낸/받은 내역 필터링
- 상세 거래 정보 표시
- 거래 상태 확인

## 🔐 인증 시스템

- **회원가입**: 사용자 정보 저장 (localStorage)
- **로그인**: 이메일/비밀번호 인증
- **로그아웃**: 세션 종료
- **보호된 페이지**: 송금, 거래내역 페이지는 로그인 필요

## 🔧 개발 가이드

### 컴포넌트 추가
새로운 컴포넌트를 추가할 때는 `src/components/` 디렉토리에 생성하고, 필요한 경우 `src/views/`에 페이지 컴포넌트를 추가합니다.

### 라우팅 추가
새로운 페이지를 추가할 때는 `src/router/index.js`에 라우트를 추가합니다.

### 인증 확인
보호된 페이지를 만들 때는 `authService.isLoggedIn()`을 사용하여 로그인 상태를 확인합니다.

### 스타일링
각 컴포넌트는 scoped CSS를 사용하여 스타일을 관리합니다. 전역 스타일은 `src/assets/styles/global.css`에서 관리합니다.

## 📱 반응형 디자인

모든 페이지는 모바일, 태블릿, 데스크톱 환경에 최적화되어 있습니다.

## 🔒 보안 고려사항

- 실제 프로덕션 환경에서는 HTTPS 사용 필수
- 사용자 인증 및 권한 관리 구현 필요
- API 엔드포인트 보안 강화 필요
- JWT 토큰 기반 인증 권장

## 🚀 배포

### Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Netlify 배포
```bash
# 빌드
npm run build

# dist 폴더를 Netlify에 업로드
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.
