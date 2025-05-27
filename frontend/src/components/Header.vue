<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- 로고 -->
        <div class="logo">
          <router-link to="/" class="logo-link">
            <h1>SONGPA GETHER</h1>
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
            <button @click="showLoginModal" class="login-btn">로그인</button>
          </div>
          
          <div v-else class="user-menu">
            <div class="user-info" @click="toggleUserMenu">
              <img 
                v-if="currentUser.profileImage" 
                :src="currentUser.profileImage" 
                :alt="currentUser.name"
                class="user-avatar"
              />
              <div v-else class="user-avatar-default">
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
  </header>
</template>

<script>
import { authService } from '@/services/authService'

export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false,
      currentUser: null,
      showUserDropdown: false
    }
  },
  mounted() {
    this.checkLoginStatus()
    // 로그인 상태 변경 감지
    window.addEventListener('storage', this.handleStorageChange)
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.handleStorageChange)
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = authService.isLoggedIn()
      this.currentUser = authService.getCurrentUser()
    },
    
    handleStorageChange() {
      this.checkLoginStatus()
    },
    
    showLoginModal() {
      this.$emit('show-login')
    },
    
    toggleUserMenu() {
      this.showUserDropdown = !this.showUserDropdown
    },
    
    async logout() {
      try {
        await authService.logoutAll()
        this.checkLoginStatus()
        this.showUserDropdown = false
        this.$emit('logout')
      } catch (error) {
        console.error('로그아웃 실패:', error)
      }
    }
  }
}
</script>

<!-- 모든 스타일은 global.css에서 관리 --> 