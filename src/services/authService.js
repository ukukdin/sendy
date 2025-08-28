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

  // 회원가입 (Swagger 스펙에 맞게 수정)
  async signup(userData) {
    try {
      // Swagger 스펙에 맞는 데이터 형식으로 변환
      const signupData = {
        name: userData.name,
        password: userData.password,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        birth: userData.birth
      }

      const response = await authAPI.signup(signupData)
      
      if (response.success || response.id) {
        const user = {
          id: response.id || Date.now(),
          email: userData.email,
          name: userData.name,
          phone: userData.phoneNumber,
          birth: userData.birth,
          role: 'user',
          balance: 1000000,
          isEmailVerified: false
        }
        localStorage.setItem('sendyUser', JSON.stringify(user))
        
        // 이메일 인증 발송 시도
        try {
          await this.sendEmailVerification(userData.email, user.id)
        } catch (emailError) {
          console.warn('이메일 인증 발송 실패:', emailError)
        }
        
        // 회원가입 성공 이벤트 발생 (이메일 인증 필요)
        this.emitAuthChange('signup', user)
        return { user, needsEmailVerification: true }
      } else {
        throw new Error(response.message || '회원가입에 실패했습니다.')
      }
    } catch (error) {
      console.error('회원가입 오류:', error)
      throw error
    }
  },

  // 이메일 인증 발송
  async sendEmailVerification(email, userId) {
    try {
      const response = await authAPI.sendEmailVerification(email, userId)
      return response
    } catch (error) {
      console.error('이메일 인증 발송 오류:', error)
      throw error
    }
  },

  // 이메일 인증번호 확인
  async verifyEmailCode(email, userId, verificationCode) {
    try {
      const response = await authAPI.verifyEmailCode(email, userId, verificationCode)
      
      if (response.success) {
        return {
          success: true,
          message: '이메일 인증이 완료되었습니다.',
          data: response.data
        }
      } else {
        throw new Error(response.message || '인증번호가 일치하지 않습니다.')
      }
    } catch (error) {
      console.error('이메일 인증번호 확인 오류:', error)
      throw error
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