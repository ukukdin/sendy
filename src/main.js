// Vue CDN을 통해 전역 Vue 객체 사용
const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// 기본 컴포넌트들 정의
const Header = {
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <router-link to="/" class="logo-link">
              <img src="./sendy-real-icon.svg" alt="SENDY" class="logo-icon" />
              <span class="logo-text">SENDY</span>
            </router-link>
          </div>
          <nav class="nav">
            <ul class="nav-list">
              <li class="nav-item">
                <router-link to="/" class="nav-link">홈</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/posts" class="nav-link">금융뉴스</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link">소개</router-link>
              </li>
            </ul>
          </nav>
          <div class="header-actions">
            <router-link to="/login" class="login-btn">로그인</router-link>
            <router-link to="/signup" class="signup-btn">회원가입</router-link>
          </div>
        </div>
      </div>
    </header>
  `
};

const Footer = {
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <p>&copy; 2024 SENDY. All rights reserved.</p>
        </div>
        <div class="footer-right">
          <router-link to="/" class="footer-link">홈</router-link>
          <router-link to="/posts" class="footer-link">포스트</router-link>
          <router-link to="/about" class="footer-link">소개</router-link>
        </div>
      </div>
    </footer>
  `
};

// 페이지 컴포넌트들 정의
const Home = {
  template: `
    <div class="page">
      <h1>SENDY 디지털 뱅킹 서비스에 오신 것을 환영합니다</h1>
      <p>안전하고 편리한 디지털 뱅킹 경험을 제공합니다.</p>
    </div>
  `
};

const About = {
  template: `
    <div class="page">
      <h1>소개</h1>
      <p>SENDY는 혁신적인 디지털 뱅킹 서비스입니다.</p>
    </div>
  `
};

const Login = {
  template: `
    <div class="page">
      <h1>로그인</h1>
      <p>계정에 로그인하세요.</p>
    </div>
  `
};

const Posts = {
  template: `
    <div class="page">
      <h1>금융뉴스</h1>
      <p>최신 금융 뉴스를 확인하세요.</p>
    </div>
  `
};

const Signup = {
  template: `
    <div class="page">
      <h1>회원가입</h1>
      <p>새 계정을 만드세요.</p>
    </div>
  `
};

// 라우터 설정
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/posts', name: 'Posts', component: Posts }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 메인 앱 컴포넌트
const app = createApp({
  template: `
    <div id="app">
      <Header />
      <main class="main-content">
        <router-view />
      </main>
      <Footer />
    </div>
  `,
  components: {
    Header,
    Footer
  }
});

app.use(router);
app.mount('#app');
