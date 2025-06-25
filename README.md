# 송파 Gether - 기술 블로그 큐레이션 플랫폼

송파구 기업들의 기술 블로그를 한곳에서 모아볼 수 있는 Vue.js 기반 프런트엔드 애플리케이션입니다.

## 주요 기능

- 🏢 **기업별 기술 블로그**: 송파구 내 주요 기업들의 기술 블로그 포스트 큐레이션
- 🔍 **검색 및 필터링**: 카테고리, 회사, 키워드별 검색 기능
- 📱 **반응형 디자인**: 모바일과 데스크톱에서 모두 최적화된 UI/UX
- 👤 **관리자 기능**: 포스트 추가/수정/삭제 관리 기능
- 🔐 **간단한 인증**: localStorage 기반 로그인 시스템

## 기술 스택

- **Frontend**: Vue.js 3, Vue Router, Vite
- **스타일링**: CSS3, 반응형 디자인
- **데이터 저장**: localStorage (프런트엔드 전용)
- **배포**: Static Site Hosting (Netlify, Vercel 등)

## 로컬 개발 환경 설정

### 요구사항

- Node.js 16+ 
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **브라우저에서 확인**
   ```
   http://localhost:5173
   ```

## 빌드 및 배포

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

### 배포

정적 사이트 호스팅 서비스에 `dist/` 폴더를 업로드하면 됩니다:

- **Netlify**: `dist` 폴더를 드래그 앤 드롭
- **Vercel**: GitHub 연동 후 자동 배포
- **GitHub Pages**: GitHub Actions 활용

## 관리자 기능

- **관리자 계정**: `admin@songpa.com` / `admin123`
- **기능**: 포스트 추가, 수정, 삭제

## 프로젝트 구조

```
songpa-gether/
├── public/          # 정적 파일
│   ├── components/  # Vue 컴포넌트
│   ├── views/       # 페이지 컴포넌트
│   ├── router/      # Vue Router 설정
│   ├── services/    # 데이터 서비스 (localStorage 기반)
│   └── assets/      # 스타일 및 이미지
├── package.json
└── vite.config.js
```

## 라이선스

MIT License
