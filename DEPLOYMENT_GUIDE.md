# 🚀 GitHub Pages 배포 가이드

## 📋 배포 준비사항

### 1단계: GitHub 리포지토리 생성

1. **GitHub 접속**: https://github.com
2. **새 리포지토리 생성**:
   - Repository name: `songpa-gether` (또는 원하는 이름)
   - Public 선택 (GitHub Pages는 Public 리포지토리에서 무료)
   - "Create repository" 클릭

### 2단계: 로컬 Git 설정

```bash
# 프로젝트 루트에서 실행
cd "demo 2"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/songpa-gether.git
git push -u origin main
```

### 3단계: Vite 빌드 설정 수정

**frontend/vite.config.js 파일 수정**:
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // GitHub Pages 배포를 위한 설정
  base: '/songpa-gether/', // 리포지토리 이름과 일치
  build: {
    outDir: '../dist', // 빌드 결과를 루트의 dist 폴더에 저장
    emptyOutDir: true
  }
})
```

### 4단계: GitHub Actions 워크플로우 설정

**.github/workflows/deploy.yml 파일 생성**:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
        
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
        
    - name: Build
      run: |
        cd frontend
        npm run build
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 5단계: GitHub Pages 활성화

1. **GitHub 리포지토리 페이지**에서 "Settings" 탭 클릭
2. **왼쪽 메뉴**에서 "Pages" 클릭
3. **Source** 섹션에서:
   - "Deploy from a branch" 선택
   - Branch: "gh-pages" 선택
   - Folder: "/ (root)" 선택
4. **Save** 클릭

## 🌐 배포 URL

배포 완료 후 다음 URL에서 접속 가능:
```
https://YOUR_USERNAME.github.io/songpa-gether/
```

## 🔧 환경변수 설정 (구글 로그인용)

### GitHub Pages에서 구글 로그인 사용하려면:

1. **Google Cloud Console**에서 승인된 JavaScript 원본에 추가:
   ```
   https://YOUR_USERNAME.github.io
   ```

2. **frontend/.env.production 파일 생성**:
   ```bash
   VITE_GOOGLE_CLIENT_ID=your_production_google_client_id
   ```

## 📝 배포 명령어

### 로컬에서 빌드 테스트:
```bash
cd frontend
npm run build
npm run preview
```

### 수동 배포:
```bash
cd frontend
npm run build
cd ../dist
git init
git add .
git commit -m "Deploy"
git branch -M gh-pages
git remote add origin https://github.com/YOUR_USERNAME/songpa-gether.git
git push -f origin gh-pages
```

## 🚨 주의사항

- **첫 배포**: 5-10분 소요될 수 있음
- **업데이트**: main 브랜치에 push하면 자동 배포
- **도메인**: GitHub Pages는 HTTPS 자동 제공
- **용량 제한**: 1GB 제한

## 🔍 문제 해결

### 빌드 실패 시:
- Node.js 버전 확인 (18 이상 권장)
- 의존성 설치 확인: `npm ci`

### 페이지가 안 보일 때:
- GitHub Actions 탭에서 배포 상태 확인
- 5-10분 후 다시 시도

### 라우팅 문제:
- Vue Router의 history 모드 때문에 404 에러 발생 가능
- `public/404.html` 파일로 해결 가능 