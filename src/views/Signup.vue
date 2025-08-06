<template>
  <div class="signup-container">
    <div class="signup-card">
      <h2>회원가입</h2>
      <form @submit.prevent="handleSignup" class="signup-form">
        <div class="form-group">
          <label for="username">사용자명</label>
          <input 
            type="text" 
            id="username" 
            v-model="form.username" 
            required
            placeholder="사용자명을 입력하세요"
          />
        </div>
        
        <div class="form-group">
          <label for="email">이메일</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            required
            placeholder="이메일을 입력하세요"
          />
        </div>
        
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input 
            type="password" 
            id="password" 
            v-model="form.password" 
            required
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="form.confirmPassword" 
            required
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>
        
        <div class="form-group">
          <label for="phone">전화번호</label>
          <input 
            type="tel" 
            id="phone" 
            v-model="form.phone" 
            required
            placeholder="전화번호를 입력하세요"
          />
        </div>
        
        <button type="submit" class="signup-btn" :disabled="loading">
          {{ loading ? '가입 중...' : '회원가입' }}
        </button>
      </form>
      
      <div class="login-link">
        이미 계정이 있으신가요? <router-link to="/login">로그인</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/authService'

export default {
  name: 'Signup',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      },
      loading: false
    }
  },
  methods: {
    async handleSignup() {
      if (this.form.password !== this.form.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.')
        return
      }
      
      this.loading = true
      
      try {
        // 실제 API 호출 대신 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 회원가입 처리
        const user = authService.signup(this.form)
        
        if (user) {
          // 성공 시 로그인 페이지로 이동
          this.$router.push('/login')
          alert('회원가입이 완료되었습니다!')
        } else {
          alert('회원가입 중 오류가 발생했습니다.')
        }
      } catch (error) {
        alert('회원가입 중 오류가 발생했습니다.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.signup-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.signup-card h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.form-group input {
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
}

.signup-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  margin-top: 10px;
  width: 100%;
  min-height: 48px;
}

.signup-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.signup-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
}

.login-link a:hover {
  text-decoration: underline;
}
</style> 