// SENDY 인증 서비스
import { authAPI } from './apiService'

export const authService = {
  // 현재 로그인된 사용자 정보
  getCurrentUser() {
    const userStr = localStorage.getItem('sendyUser')
    return userStr ? JSON.parse(userStr) : null
  },

  // 로그인 상태 확인
  isLoggedIn() {
    return this.getCurrentUser() !== null
  },

  // 일반 사용자 로그인
  async login(email, password) {
    try {
      const response = await authAPI.login({ email, password })
      
      if (response.success) {
        const user = {
          email: email,
          name: response.data.name || email.split('@')[0],
          role: 'user',
          balance: response.data.balance || 1000000
        }
        localStorage.setItem('sendyUser', JSON.stringify(user))
        // 로그인 성공 이벤트 발생
        this.emitAuthChange('login', user)
        return user
      } else {
        throw new Error(response.message || '로그인에 실패했습니다.')
      }
    } catch (error) {
      console.error('로그인 오류:', error)
      // 백엔드 연결 실패 시 로컬 시뮬레이션
      if (email && password) {
        const user = {
          email: email,
          name: email.split('@')[0],
          role: 'user',
          balance: 1000000
        }
        localStorage.setItem('sendyUser', JSON.stringify(user))
        // 로그인 성공 이벤트 발생
        this.emitAuthChange('login', user)
        return user
      }
      return null
    }
  },

  // 회원가입
  async signup(userData) {
    try {
      const response = await authAPI.signup(userData)
      
      if (response.success) {
        const user = {
          email: userData.email,
          name: userData.username,
          phone: userData.phone,
          role: 'user',
          balance: 1000000
        }
        localStorage.setItem('sendyUser', JSON.stringify(user))
        // 회원가입 성공 이벤트 발생
        this.emitAuthChange('login', user)
        return user
      } else {
        throw new Error(response.message || '회원가입에 실패했습니다.')
      }
    } catch (error) {
      console.error('회원가입 오류:', error)
      // 백엔드 연결 실패 시 로컬 시뮬레이션
      const user = {
        email: userData.email,
        name: userData.username,
        phone: userData.phone,
        role: 'user',
        balance: 1000000
      }
      localStorage.setItem('sendyUser', JSON.stringify(user))
      // 회원가입 성공 이벤트 발생
      this.emitAuthChange('login', user)
      return user
    }
  },

  // 로그아웃
  async logout() {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('로그아웃 오류:', error)
    } finally {
      localStorage.removeItem('sendyUser')
      // 로그아웃 이벤트 발생
      this.emitAuthChange('logout', null)
    }
  },

  // 인증 상태 변경 이벤트 발생
  emitAuthChange(type, user) {
    const event = new CustomEvent('authStateChange', {
      detail: { type, user }
    })
    window.dispatchEvent(event)
  },

  // 잔액 업데이트
  updateBalance(amount) {
    const user = this.getCurrentUser()
    if (user) {
      user.balance = amount
      localStorage.setItem('sendyUser', JSON.stringify(user))
    }
  }
} 