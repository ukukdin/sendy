// 간단한 인증 서비스
export const authService = {
  // 관리자 계정 정보
  adminAccount: {
    email: 'admin@songpa.com',
    password: 'admin123',
    name: '관리자',
    role: 'admin'
  },

  // 현재 로그인된 사용자 정보
  getCurrentUser() {
    const userStr = localStorage.getItem('currentUser')
    return userStr ? JSON.parse(userStr) : null
  },

  // 로그인 상태 확인
  isLoggedIn() {
    return this.getCurrentUser() !== null
  },

  // 관리자 권한 확인
  isAdmin() {
    const user = this.getCurrentUser()
    return user && user.role === 'admin'
  },

  // 관리자 로그인
  loginAsAdmin() {
    localStorage.setItem('currentUser', JSON.stringify(this.adminAccount))
    return this.adminAccount
  },

  // 일반 사용자 로그인 (소셜 로그인 시뮬레이션)
  loginWithSocial(provider, userData) {
    const user = {
      email: userData.email || `user@${provider}.com`,
      name: userData.name || `${provider} 사용자`,
      provider: provider,
      role: 'user'
    }
    localStorage.setItem('currentUser', JSON.stringify(user))
    return user
  },

  // 로그아웃
  logout() {
    localStorage.removeItem('currentUser')
  },

  // 관리자 계정 확인 (로그인 시 사용)
  checkAdminCredentials(email, password) {
    return email === this.adminAccount.email && password === this.adminAccount.password
  }
} 