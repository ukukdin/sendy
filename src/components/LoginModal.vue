<template>
  <div v-if="isVisible" class="login-modal-overlay" @click="closeModal">
    <div class="login-modal-content" @click.stop>
      <div class="login-modal-header">
        <h2>로그인</h2>
        <button @click="closeModal" class="modal-close">×</button>
      </div>
      
      <div class="login-modal-body">
        <div class="login-intro">
          <p>소셜 계정으로 간편하게 로그인하세요</p>
        </div>
        
        <div class="login-buttons">
          <button 
            @click="loginWithKakao" 
            class="login-btn kakao-btn"
            :disabled="isLoading"
          >
            <div class="btn-icon">
              <img src="/kakao-icon.svg" alt="카카오" />
            </div>
            <span>카카오로 로그인</span>
          </button>
          
          <button 
            @click="loginWithGoogle" 
            class="login-btn google-btn"
            :disabled="isLoading"
          >
            <div class="btn-icon">
              <img src="/google-icon.svg" alt="구글" />
            </div>
            <span>구글로 로그인</span>
          </button>
        </div>
        
        <div v-if="isLoading" class="loading-spinner">
          <div class="spinner"></div>
          <p>로그인 중...</p>
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <div class="login-footer">
          <p class="login-notice">
            로그인 시 <a href="#" @click.prevent>이용약관</a> 및 
            <a href="#" @click.prevent>개인정보처리방침</a>에 동의한 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/authService'

export default {
  name: 'LoginModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false,
      error: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
      this.error = ''
    },
    
    async loginWithKakao() {
      try {
        this.isLoading = true
        this.error = ''
        
        const user = await authService.loginWithKakao()
        this.$emit('login-success', user)
        this.closeModal()
        
      } catch (error) {
        console.error('카카오 로그인 실패:', error)
        this.error = '카카오 로그인에 실패했습니다. 다시 시도해주세요.'
      } finally {
        this.isLoading = false
      }
    },
    
    async loginWithGoogle() {
      try {
        this.isLoading = true
        this.error = ''
        
        const user = await authService.loginWithGoogle()
        this.$emit('login-success', user)
        this.closeModal()
        
      } catch (error) {
        console.error('구글 로그인 실패:', error)
        this.error = '구글 로그인에 실패했습니다. 다시 시도해주세요.'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
/* 로그인 모달 스타일은 전역 CSS에서 관리됩니다 */
</style> 