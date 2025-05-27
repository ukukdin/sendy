<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import LoginModal from './components/LoginModal.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    LoginModal
  },
  data() {
    return {
      showLoginModal: false
    }
  },
  methods: {
    handleShowLogin() {
      this.showLoginModal = true
    },
    
    handleCloseLogin() {
      this.showLoginModal = false
    },
    
    handleLoginSuccess(user) {
      console.log('로그인 성공:', user)
      this.showLoginModal = false
      // 필요시 추가 처리 (예: 페이지 새로고침, 알림 등)
    },
    
    handleLogout() {
      console.log('로그아웃 완료')
      // 필요시 추가 처리
    }
  }
}
</script>

<template>
  <div id="app">
    <!-- 고정 헤더 -->
    <Header 
      @show-login="handleShowLogin"
      @logout="handleLogout"
    />

    <!-- 메인 콘텐츠 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 하단 푸터 -->
    <Footer />
    
    <!-- 로그인 모달 -->
    <LoginModal 
      :isVisible="showLoginModal"
      @close="handleCloseLogin"
      @login-success="handleLoginSuccess"
    />
  </div>
</template>

<!-- 모든 스타일은 global.css에서 관리 -->
