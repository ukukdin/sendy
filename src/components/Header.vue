<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- 로고 -->
        <div class="logo">
          <router-link to="/" class="logo-link">
            <div class="logo-icon">🏦</div>
            <span class="logo-text">SENDY</span>
          </router-link>
        </div>

        <!-- 네비게이션 -->
        <nav class="nav">
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/" class="nav-link">홈</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <router-link to="/transfer" class="nav-link">송금</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <router-link to="/transactions" class="nav-link">거래내역</router-link>
            </li>
          </ul>
        </nav>

        <!-- 검색 및 액션 버튼 -->
        <div class="header-actions">
          <!-- 로그인 상태에 따른 버튼 -->
          <div v-if="!isLoggedIn" class="auth-buttons">
            <router-link to="/login" class="login-btn">로그인</router-link>
            <router-link to="/signup" class="signup-btn">회원가입</router-link>
          </div>
          
          <div v-else class="user-menu">
            <div class="user-info" @click="toggleUserMenu">
              <div class="user-avatar">
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
      showUserDropdown: false,
      isLoggedIn: false,
      currentUser: null
    }
  },
  mounted() {
    this.checkAuthStatus()
  },
  methods: {
    checkAuthStatus() {
      this.isLoggedIn = authService.isLoggedIn()
      this.currentUser = authService.getCurrentUser()
    },
    
    toggleUserMenu() {
      this.showUserDropdown = !this.showUserDropdown
    },
    
    logout() {
      authService.logout()
      this.isLoggedIn = false
      this.currentUser = null
      this.showUserDropdown = false
      this.$router.push('/')
      alert('로그아웃되었습니다.')
    }
  }
}
</script>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid #e1e5e9;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
}

.logo-icon {
  font-size: 24px;
  margin-right: 10px;
}

.logo-text {
  font-weight: bold;
  font-size: 18px;
  color: #667eea;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #667eea;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.login-btn, .signup-btn {
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 14px;
  min-width: 80px;
  text-align: center;
  display: inline-block;
}

.login-btn {
  color: #667eea;
  border: 1px solid #667eea;
}

.login-btn:hover {
  background: #667eea;
  color: white;
}

.signup-btn {
  background: #667eea;
  color: white;
}

.signup-btn:hover {
  background: #5a6fd8;
}

.user-menu {
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.user-info:hover {
  background: #f8f9fa;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.user-name {
  font-weight: 500;
  color: #333;
}

.dropdown-arrow {
  font-size: 12px;
  color: #666;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  margin-top: 5px;
}

.user-dropdown-item {
  padding: 12px 16px;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
}

.user-dropdown-item:hover {
  background: #f8f9fa;
}

.user-email {
  color: #666;
  font-size: 12px;
}

.dropdown-divider {
  height: 1px;
  background: #e1e5e9;
  margin: 5px 0;
}

.logout-item {
  color: #dc3545;
}

.logout-item:hover {
  background: #f8d7da;
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }
  
  .header-actions {
    gap: 10px;
  }
  
  .auth-buttons {
    gap: 5px;
  }
  
  .login-btn, .signup-btn {
    padding: 6px 12px;
    font-size: 14px;
  }
}
</style> 