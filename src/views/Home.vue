<template>
  <div class="home-container">
    <!-- 환영 섹션 -->
    <section class="welcome-section">
      <div class="welcome-content">
        <h1>SENDY</h1>
        <p>안전하고 편리한 디지털 뱅킹 서비스</p>
        <div class="welcome-actions" v-if="!isLoggedIn">
          <router-link to="/signup" class="btn-primary">회원가입</router-link>
          <router-link to="/login" class="btn-secondary">로그인</router-link>
        </div>
        <div class="welcome-actions" v-else>
          <router-link to="/transfer" class="btn-primary">송금하기</router-link>
          <router-link to="/transactions" class="btn-secondary">거래내역</router-link>
        </div>
      </div>
    </section>

    <!-- 로그인하지 않은 경우 -->
    <div v-if="!isLoggedIn" class="guest-content">
      <section class="features-section">
        <h2>SENDY의 주요 기능</h2>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">💸</div>
            <h3>빠른 송금</h3>
            <p>안전하고 빠른 송금 서비스</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📊</div>
            <h3>거래내역</h3>
            <p>상세한 거래 내역 확인</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔒</div>
            <h3>보안</h3>
            <p>최고 수준의 보안 시스템</p>
          </div>
        </div>
      </section>
    </div>

    <!-- 로그인한 경우 -->
    <div v-else>
      <!-- 계좌 정보 섹션 -->
      <section class="account-section">
        <div class="account-card">
          <h2>내 계좌</h2>
          <div class="account-info">
            <div class="account-number">
              <span>계좌번호:</span>
              <span class="account-number-value">123-456-789012</span>
            </div>
            <div class="account-balance">
              <span>잔액:</span>
              <span class="balance-amount">₩{{ formatNumber(currentUser.balance) }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 빠른 메뉴 섹션 -->
      <section class="quick-menu-section">
        <h2>빠른 메뉴</h2>
        <div class="quick-menu-grid">
          <router-link to="/transfer" class="quick-menu-item">
            <div class="menu-icon">💸</div>
            <span>송금</span>
          </router-link>
          <router-link to="/transactions" class="quick-menu-item">
            <div class="menu-icon">📊</div>
            <span>거래내역</span>
          </router-link>
          <div class="quick-menu-item">
            <div class="menu-icon">💳</div>
            <span>카드관리</span>
          </div>
          <div class="quick-menu-item">
            <div class="menu-icon">⚙️</div>
            <span>설정</span>
          </div>
        </div>
      </section>

      <!-- 최근 거래내역 섹션 -->
      <section class="recent-transactions-section">
        <div class="section-header">
          <h2>최근 거래내역</h2>
          <router-link to="/transactions" class="view-all-link">전체보기</router-link>
        </div>
        <div class="recent-transactions">
          <div 
            v-for="transaction in recentTransactions" 
            :key="transaction.id"
            class="transaction-item"
          >
            <div class="transaction-info">
              <div class="transaction-name">{{ transaction.name }}</div>
              <div class="transaction-date">{{ formatDate(transaction.date) }}</div>
            </div>
            <div class="transaction-amount" :class="transaction.type">
              <span v-if="transaction.type === 'sent'">-</span>
              <span v-else>+</span>
              ₩{{ formatNumber(transaction.amount) }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/authService'

export default {
  name: 'Home',
  data() {
    return {
      isLoggedIn: false,
      currentUser: null,
      recentTransactions: [
        {
          id: 1,
          name: '김철수',
          amount: 50000,
          type: 'sent',
          date: new Date('2024-01-15')
        },
        {
          id: 2,
          name: '이영희',
          amount: 100000,
          type: 'received',
          date: new Date('2024-01-14')
        },
        {
          id: 3,
          name: '박민수',
          amount: 30000,
          type: 'sent',
          date: new Date('2024-01-13')
        }
      ]
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
    
    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    
    formatDate(date) {
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) {
        return '어제'
      } else if (diffDays === 0) {
        return '오늘'
      } else {
        return date.toLocaleDateString('ko-KR', {
          month: 'short',
          day: 'numeric'
        })
      }
    }
  }
}
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 40px;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 40px;
}

.welcome-content h1 {
  font-size: 36px;
  margin: 0 0 10px 0;
  font-weight: bold;
}

.welcome-content p {
  font-size: 18px;
  margin: 0 0 30px 0;
  opacity: 0.9;
}

.welcome-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-primary, .btn-secondary {
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.btn-primary:hover, .btn-secondary:hover {
  transform: translateY(-2px);
}

.account-section {
  margin-bottom: 40px;
}

.account-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.account-card h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 20px;
}

.account-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.account-number, .account-balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.account-number-value {
  font-weight: bold;
  color: #007bff;
}

.balance-amount {
  font-weight: bold;
  font-size: 18px;
  color: #28a745;
}

.quick-menu-section {
  margin-bottom: 40px;
}

.quick-menu-section h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 20px;
}

.quick-menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
}

.quick-menu-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  color: #333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.quick-menu-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.menu-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.quick-menu-item span {
  font-weight: 600;
  font-size: 14px;
}

.recent-transactions-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

.view-all-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}

.view-all-link:hover {
  text-decoration: underline;
}

.recent-transactions {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-info {
  flex: 1;
}

.transaction-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.transaction-date {
  font-size: 12px;
  color: #666;
}

.transaction-amount {
  font-weight: bold;
  font-size: 16px;
}

.transaction-amount.sent {
  color: #dc3545;
}

.transaction-amount.received {
  color: #28a745;
}

@media (max-width: 768px) {
  .welcome-section {
    padding: 40px 20px;
  }
  
  .welcome-content h1 {
    font-size: 28px;
  }
  
  .welcome-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .quick-menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.guest-content {
  margin-top: 40px;
}

.features-section {
  margin-bottom: 40px;
}

.features-section h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-item {
  background: white;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-item h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 20px;
}

.feature-item p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}
</style> 