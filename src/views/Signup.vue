<template>
  <div class="signup-container">
    <div class="signup-card">
      <h2>SENDY 회원가입</h2>
      
      <!-- 회원가입 폼 -->
      <form v-if="!showEmailVerification" @submit.prevent="handleSignup" class="signup-form">
        <div class="form-group">
          <label for="name">이름 *</label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name" 
            required
            placeholder="실명을 입력하세요"
          />
        </div>
        
        <div class="form-group">
          <label for="email">이메일 *</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            required
            placeholder="example@gmail.com"
          />
        </div>
        
        <div class="form-group">
          <label for="password">비밀번호 *</label>
          <input 
            type="password" 
            id="password" 
            v-model="form.password" 
            required
            minlength="6"
            placeholder="6자 이상 입력하세요"
          />
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">비밀번호 확인 *</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="form.confirmPassword" 
            required
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>
        
        <div class="form-group">
          <label for="phoneNumber">전화번호 *</label>
          <input 
            type="tel" 
            id="phoneNumber" 
            v-model="form.phoneNumber" 
            @input="onPhoneInput"
            required
            pattern="010[0-9]{8}"
            placeholder="01012345678 (숫자만)"
            maxlength="11"
          />
        </div>
        
        <div class="form-group">
          <label for="birth">생년월일 *</label>
          <input 
            type="text" 
            id="birth" 
            v-model="form.birth" 
            @input="onBirthInput"
            required
            pattern="[0-9]{8}"
            placeholder="19900101 (YYYYMMDD)"
            maxlength="8"
          />
        </div>
        
        <button type="submit" class="signup-btn" :disabled="loading">
          {{ loading ? '가입 중...' : '회원가입' }}
        </button>
      </form>
      
      <!-- 이메일 인증 -->
      <div v-if="showEmailVerification" class="email-verification">
        <div class="verification-icon">📧</div>
        <h3>이메일 인증번호 입력</h3>
        <p>{{ form.email }}로 인증번호를 발송했습니다.</p>
        <p class="verification-subtitle">메일함을 확인하고 6자리 인증번호를 입력해주세요.</p>
        
        <!-- 인증번호 입력 폼 -->
        <form @submit.prevent="verifyEmailCode" class="verification-form">
          <div class="form-group">
            <label for="verificationCode">인증번호 *</label>
            <input 
              type="text" 
              id="verificationCode" 
              v-model="verificationCode" 
              required
              maxlength="6"
              pattern="[0-9]{6}"
              placeholder="123456"
              class="verification-input"
              :disabled="verifyLoading"
            />
          </div>
          
          <button type="submit" class="verify-btn" :disabled="verifyLoading || !verificationCode">
            {{ verifyLoading ? '인증 중...' : '인증번호 확인' }}
          </button>
        </form>
        
        <!-- 인증번호 재발송 -->
        <div class="resend-section">
          <p class="resend-text">
            인증번호를 받지 못하셨나요? 
            <button @click="resendEmail" class="resend-link" :disabled="resendLoading">
              {{ resendLoading ? '발송 중...' : '재발송' }}
            </button>
          </p>
        </div>
        
        <button @click="goToLogin" class="back-btn">
          로그인 페이지로 이동
        </button>
      </div>
      
      <div v-if="!showEmailVerification" class="login-link">
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
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        birth: ''
      },
      loading: false,
      showEmailVerification: false,
      resendLoading: false,
      registeredUserId: null,
      verificationCode: '',
      verifyLoading: false
    }
  },
  methods: {
    // 폼 유효성 검사
    validateForm() {
      if (this.form.password !== this.form.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.')
        return false
      }
      
      if (this.form.password.length < 6) {
        alert('비밀번호는 6자 이상이어야 합니다.')
        return false
      }
      
      // 전화번호 형식 검사 (010으로 시작하는 11자리 숫자)
      const phoneRegex = /^010[0-9]{8}$/
      if (!phoneRegex.test(this.form.phoneNumber)) {
        alert('전화번호는 010으로 시작하는 11자리 숫자여야 합니다. (예: 01012345678)')
        return false
      }
      
      // 생년월일 형식 검사 (8자리 숫자)
      const birthRegex = /^[0-9]{8}$/
      if (!birthRegex.test(this.form.birth)) {
        alert('생년월일은 8자리 숫자로 입력해주세요. (예: 19900101)')
        return false
      }
      
      return true
    },

    async handleSignup() {
      if (!this.validateForm()) {
        return
      }
      
      this.loading = true
      
      try {
        // Swagger 스펙에 맞는 회원가입 API 호출
        const result = await authService.signup(this.form)
        
        if (result && result.user) {
          this.registeredUserId = result.user.id
          
                     // 회원가입 성공 - 이메일 인증 화면으로 이동
           this.showEmailVerification = true
           
           // 이메일 인증 발송 자동 시도
           try {
             await authService.sendEmailVerification(this.form.email, this.registeredUserId)
             console.log('이메일 인증 발송 완료')
           } catch (emailError) {
             console.warn('이메일 인증 발송 실패:', emailError)
           }
        } else {
          alert('회원가입 중 오류가 발생했습니다.')
        }
      } catch (error) {
        console.error('회원가입 오류:', error)
        
        // 구체적인 오류 메시지 표시
        let errorMessage = '회원가입 중 오류가 발생했습니다.'
        
        if (error.message.includes('이미 존재')) {
          errorMessage = '이미 가입된 이메일입니다.'
        } else if (error.message.includes('형식')) {
          errorMessage = '입력 정보의 형식이 올바르지 않습니다.'
        } else if (error.message) {
          errorMessage = error.message
        }
        
        alert(errorMessage)
      } finally {
        this.loading = false
      }
    },

    // 이메일 인증 재발송
    async resendEmail() {
      if (!this.form.email || !this.registeredUserId) {
        alert('이메일 정보를 찾을 수 없습니다.')
        return
      }
      
      this.resendLoading = true
      
      try {
        await authService.sendEmailVerification(this.form.email, this.registeredUserId)
        alert('인증 메일을 재발송했습니다. 메일함을 확인해주세요.')
      } catch (error) {
        console.error('이메일 재발송 오류:', error)
        alert('이메일 재발송 중 오류가 발생했습니다.')
      } finally {
        this.resendLoading = false
      }
    },

    // 로그인 페이지로 이동
    goToLogin() {
      this.$router.push('/login')
    },

    // 전화번호 입력 시 숫자만 허용
    onPhoneInput(event) {
      this.form.phoneNumber = event.target.value.replace(/[^0-9]/g, '')
    },

    // 생년월일 입력 시 숫자만 허용
    onBirthInput(event) {
      this.form.birth = event.target.value.replace(/[^0-9]/g, '')
    },

    // 이메일 인증번호 확인
    async verifyEmailCode() {
      if (!this.verificationCode || this.verificationCode.length !== 6) {
        alert('6자리 인증번호를 정확히 입력해주세요.')
        return
      }

      this.verifyLoading = true

      try {
        const result = await authService.verifyEmailCode(
          this.form.email, 
          this.registeredUserId, 
          this.verificationCode
        )

        if (result.success) {
          alert('이메일 인증이 완료되었습니다! 🎉')
          this.$router.push('/login?verified=true')
        } else {
          alert(result.message || '인증번호가 일치하지 않습니다. 다시 확인해주세요.')
        }
      } catch (error) {
        console.error('인증번호 확인 오류:', error)
        
        let errorMessage = '인증번호 확인 중 오류가 발생했습니다.'
        
        if (error.message.includes('만료')) {
          errorMessage = '인증번호가 만료되었습니다. 재발송을 요청해주세요.'
        } else if (error.message.includes('불일치')) {
          errorMessage = '인증번호가 일치하지 않습니다. 다시 확인해주세요.'
        } else if (error.message) {
          errorMessage = error.message
        }
        
        alert(errorMessage)
      } finally {
        this.verifyLoading = false
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
  max-width: 450px;
}

.signup-card h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
  background: linear-gradient(135deg, #60A5FA 0%, #06B6D4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  border-color: #60A5FA;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
}

.form-group input:invalid {
  border-color: #ef4444;
}

.signup-btn {
  background: linear-gradient(135deg, #60A5FA 0%, #06B6D4 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 10px;
  width: 100%;
  min-height: 48px;
}

.signup-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.4);
}

.signup-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* 이메일 인증 화면 스타일 */
.email-verification {
  text-align: center;
  padding: 20px 0;
}

.verification-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.email-verification h3 {
  color: #333;
  font-size: 20px;
  margin-bottom: 16px;
}

.email-verification p {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 8px;
}

.verification-subtitle {
  font-weight: 500;
  color: #60A5FA !important;
  margin-bottom: 24px !important;
}

/* 인증번호 입력 폼 스타일 */
.verification-form {
  margin: 24px 0;
  text-align: left;
}

.verification-input {
  text-align: center !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  letter-spacing: 2px !important;
  padding: 16px !important;
  border: 2px solid #e1e5e9 !important;
  border-radius: 12px !important;
  transition: all 0.3s ease !important;
}

.verification-input:focus {
  border-color: #60A5FA !important;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1) !important;
  transform: scale(1.02);
}

.verify-btn {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  margin-top: 16px;
}

.verify-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.verify-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* 재발송 섹션 스타일 */
.resend-section {
  margin: 20px 0;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #60A5FA;
}

.resend-text {
  color: #555 !important;
  font-size: 14px !important;
  margin: 0 !important;
}

.resend-link {
  background: none;
  border: none;
  color: #60A5FA;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
  padding: 0;
  margin-left: 4px;
}

.resend-link:hover:not(:disabled) {
  color: #3B82F6;
}

.resend-link:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.resend-btn {
  background: #f8f9fa;
  color: #60A5FA;
  border: 2px solid #60A5FA;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 20px 0 10px 0;
  width: 100%;
}

.resend-btn:hover:not(:disabled) {
  background: #60A5FA;
  color: white;
}

.resend-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.back-btn {
  background: #f8f9fa;
  color: #666;
  border: 1px solid #e1e5e9;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  margin-top: 16px;
}

.back-btn:hover {
  background: #e9ecef;
  border-color: #adb5bd;
  transform: translateY(-1px);
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;
}

.login-link a {
  color: #60A5FA;
  text-decoration: none;
  font-weight: 600;
}

.login-link a:hover {
  text-decoration: underline;
}

/* 모바일 반응형 */
@media (max-width: 768px) {
  .signup-container {
    padding: 10px;
    min-height: 70vh;
  }
  
  .signup-card {
    padding: 30px 20px;
    max-width: 100%;
  }
  
  .signup-card h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .form-group input {
    padding: 10px 14px;
    font-size: 14px;
  }
  
  .signup-btn {
    padding: 14px 20px;
    font-size: 15px;
  }
}
</style> 