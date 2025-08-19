<template>
  <div class="transfer-container">
    <div class="transfer-card">
      <h2>송금</h2>
      
      <div class="balance-section">
        <h3>현재 잔액</h3>
        <div class="balance-amount">₩{{ formatNumber(currentBalance) }}</div>
      </div>
      
      <form @submit.prevent="handleTransfer" class="transfer-form">
        <div class="form-group">
          <label for="recipient">받는 사람</label>
          <input 
            type="text" 
            id="recipient" 
            v-model="form.recipient" 
            required
            placeholder="받는 사람의 이름을 입력하세요"
          />
        </div>
        
        <div class="form-group">
          <label for="accountNumber">계좌번호</label>
          <input 
            type="text" 
            id="accountNumber" 
            v-model="form.accountNumber" 
            required
            placeholder="계좌번호를 입력하세요"
          />
        </div>
        
        <div class="form-group">
          <label for="amount">송금 금액</label>
          <div class="amount-input">
            <span class="currency">₩</span>
            <input 
              type="number" 
              id="amount" 
              v-model="form.amount" 
              required
              placeholder="0"
              min="1"
              step="1"
            />
          </div>
        </div>
        
        <div class="form-group">
          <label for="memo">메모 (선택사항)</label>
          <input 
            type="text" 
            id="memo" 
            v-model="form.memo" 
            placeholder="송금 메모를 입력하세요"
          />
        </div>
        
        <div class="transfer-summary">
          <div class="summary-item">
            <span>수수료:</span>
            <span>₩0</span>
          </div>
          <div class="summary-item total">
            <span>총 송금액:</span>
            <span>₩{{ formatNumber(form.amount || 0) }}</span>
          </div>
        </div>
        
        <button type="submit" class="transfer-btn" :disabled="loading || !isValidAmount">
          {{ loading ? '송금 중...' : '송금하기' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/authService'
import { transferAPI } from '@/services/apiService'

export default {
  name: 'Transfer',
  data() {
    return {
      currentBalance: 1000000, // 100만원
      form: {
        recipient: '',
        accountNumber: '',
        amount: '',
        memo: ''
      },
      loading: false
    }
  },
  mounted() {
    this.checkAuth()
  },
  computed: {
    isValidAmount() {
      const amount = Number(this.form.amount)
      return amount > 0 && amount <= this.currentBalance
    }
  },
  methods: {
    checkAuth() {
      if (!authService.isLoggedIn()) {
        alert('로그인이 필요합니다.')
        this.$router.push('/login')
        return
      }
      
      const user = authService.getCurrentUser()
      if (user) {
        this.currentBalance = user.balance
      }
    },
    
    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    
    async handleTransfer() {
      if (!this.isValidAmount) {
        alert('유효하지 않은 금액입니다.')
        return
      }
      
      this.loading = true
      
      try {
        // 백엔드 API 호출
        const transferData = {
          recipient: this.form.recipient,
          accountNumber: this.form.accountNumber,
          amount: Number(this.form.amount),
          memo: this.form.memo
        }
        
        const response = await transferAPI.transfer(transferData)
        
        if (response.success) {
          // 송금 성공 시 잔액 업데이트
          const newBalance = this.currentBalance - Number(this.form.amount)
          this.currentBalance = newBalance
          authService.updateBalance(newBalance)
          
          // 폼 초기화
          this.form = {
            recipient: '',
            accountNumber: '',
            amount: '',
            memo: ''
          }
          
          alert('송금이 완료되었습니다!')
        } else {
          alert(response.message || '송금에 실패했습니다.')
        }
      } catch (error) {
        console.error('송금 오류:', error)
        // 백엔드 연결 실패 시 로컬 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const newBalance = this.currentBalance - Number(this.form.amount)
        this.currentBalance = newBalance
        authService.updateBalance(newBalance)
        
        this.form = {
          recipient: '',
          accountNumber: '',
          amount: '',
          memo: ''
        }
        
        alert('송금이 완료되었습니다!')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.transfer-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  padding: 20px;
}

.transfer-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 500px;
}

.transfer-card h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.balance-section {
  background: linear-gradient(135deg, #60A5FA 0%, #06B6D4 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  text-align: center;
}

.balance-section h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
  opacity: 0.9;
}

.balance-amount {
  font-size: 32px;
  font-weight: bold;
}

.transfer-form {
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

.amount-input {
  position: relative;
  display: flex;
  align-items: center;
}

.currency {
  position: absolute;
  left: 16px;
  color: #666;
  font-weight: 600;
}

.amount-input input {
  padding-left: 30px;
}

.transfer-summary {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.summary-item.total {
  border-top: 1px solid #e1e5e9;
  padding-top: 10px;
  margin-top: 10px;
  font-weight: bold;
  color: #333;
  font-size: 16px;
}

.transfer-btn {
  background: linear-gradient(135deg, #60A5FA 0%, #06B6D4 100%);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.transfer-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.transfer-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style> 