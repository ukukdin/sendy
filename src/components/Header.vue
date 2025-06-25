<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- 로고 -->
        <div class="logo">
          <router-link to="/" class="logo-link">
            <div class="logo-s">S</div>
            <span class="logo-text">SONGPA GETHER</span>
          </router-link>
        </div>

        <!-- 네비게이션 -->
        <nav class="nav">
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/" class="nav-link">HOME</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/posts" class="nav-link">TECH</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">ABOUT</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin" class="nav-link">ADMIN</router-link>
            </li>
          </ul>
        </nav>

        <!-- 검색 및 액션 버튼 -->
        <div class="header-actions">
          <button class="search-btn">🔍</button>
          
          <!-- 로그인 상태에 따른 버튼 -->
          <div v-if="!isLoggedIn" class="auth-buttons">
            <button @click="showLoginModal = true" class="login-btn">로그인</button>
          </div>
          
          <div v-else class="user-menu">
            <div class="user-info" @click="toggleUserMenu">
              <div class="user-avatar-default">
                {{ currentUser.name.charAt(0) }}
              </div>
              <span class="user-name">{{ currentUser.name }}</span>
              <span class="dropdown-arrow">▼</span>
            </div>
            
            <div v-if="showUserDropdown" class="user-dropdown">
              <div class="user-dropdown-item">
                <span class="user-email">{{ currentUser.email }}</span>
              </div>
              <div class="dropdown-divider"></div>
              <button @click="logout" class="user-dropdown-item logout-item">
                로그아웃
              </button>
            </div>
          </div>
          
          <button class="menu-btn">☰</button>
        </div>
      </div>
    </div>
    
    <!-- 로그인 모달 -->
    <div v-if="showLoginModal" class="login-modal-overlay" @click="closeModal">
      <div class="login-modal-content" @click.stop>
        <div class="login-modal-header">
          <h2>로그인</h2>
          <button @click="showLoginModal = false" class="modal-close">×</button>
        </div>
        
        <div class="login-modal-body">
          <div class="login-intro">
            <p>소셜 계정으로 간편하게 로그인하세요</p>
          </div>
          
          <div class="login-buttons">
            <button @click="loginWithKakao" class="login-btn kakao-btn">
              <div class="btn-icon">
                <img src="/kakao-icon.png" alt="카카오" />
              </div>
              카카오로 로그인
            </button>
            
            <button @click="loginWithGoogle" class="login-btn google-btn">
              <div class="btn-icon">
                <img src="/google-icon.png" alt="구글" />
              </div>
              구글로 로그인
            </button>
          </div>
          
          <div class="signup-section">
            <p>계정이 없으신가요? <button @click="showSignupModal = true; showLoginModal = false" class="signup-link">회원가입</button></p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 회원가입 모달 -->
    <div v-if="showSignupModal" class="login-modal-overlay" @click="closeModal">
      <div class="login-modal-content" @click.stop>
        <div class="login-modal-header">
          <h2>회원가입</h2>
          <button @click="showSignupModal = false" class="modal-close">×</button>
        </div>
        
        <div class="login-modal-body">
          <div class="login-intro">
            <p>소셜 계정으로 간편하게 가입하세요</p>
          </div>
          
          <div class="login-buttons">
            <button @click="signupWithKakao" class="login-btn kakao-btn">
              <div class="btn-icon">
                <img src="/kakao-icon.png" alt="카카오" />
              </div>
              카카오로 회원가입
            </button>
            
            <button @click="signupWithGoogle" class="login-btn google-btn">
              <div class="btn-icon">
                <img src="/google-icon.png" alt="구글" />
              </div>
              구글로 회원가입
            </button>
          </div>
          
          <div class="signup-section">
            <p>이미 계정이 있으신가요? <button @click="showLoginModal = true; showSignupModal = false" class="signup-link">로그인</button></p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      showLoginModal: false,
      showSignupModal: false
    }
  },
  methods: {
    closeModal(event) {
      if (event.target === event.currentTarget) {
        this.showLoginModal = false
        this.showSignupModal = false
      }
    },
    
    loginWithKakao() {
      // 카카오 로그인 목업
      alert('카카오 로그인이 실행됩니다!')
      this.showLoginModal = false
      // 실제 구현 시: 카카오 SDK 호출
    },
    
    loginWithGoogle() {
      // 구글 로그인 목업
      alert('구글 로그인이 실행됩니다!')
      this.showLoginModal = false
      // 실제 구현 시: 구글 SDK 호출
    },
    
    signupWithKakao() {
      // 카카오 회원가입 목업
      alert('카카오로 회원가입이 실행됩니다!')
      this.showSignupModal = false
      // 실제 구현 시: 카카오 SDK 호출 후 회원가입 처리
    },
    
    signupWithGoogle() {
      // 구글 회원가입 목업
      alert('구글로 회원가입이 실행됩니다!')
      this.showSignupModal = false
      // 실제 구현 시: 구글 SDK 호출 후 회원가입 처리
    }
  }
}
</script>

<!-- 모든 스타일은 global.css에서 관리 --> 