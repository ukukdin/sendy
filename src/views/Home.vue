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
          <div class="feature-item" @click="handleFeatureClick('transfer')">
            <div class="feature-icon">💸</div>
            <h3>빠른 송금</h3>
            <p>안전하고 빠른 송금 서비스</p>
          </div>
          <div class="feature-item" @click="handleFeatureClick('security')">
            <div class="feature-icon">🔒</div>
            <h3>보안</h3>
            <p>최고 수준의 보안 시스템</p>
          </div>
        </div>
      </section>
      
      <!-- 뉴스 섹션 -->
      <section class="news-section">
        <h2>차근차근 나아가는 SENDY 소식</h2>
        <div class="news-grid">
          <div class="news-card">
            <div class="news-label">사업소식</div>
            <h3>국내 최초 핀테크 송금 서비스, SENDY 베타 서비스 시작</h3>
            <div class="news-hashtags">
              <span>#SENDY</span>
              <span>#핀테크</span>
              <span>#송금서비스</span>
            </div>
            <div class="news-graphic">
              <div class="graphic-content">
                <div class="graphic-icon">🚀</div>
                <div class="graphic-text">SENDY 베타</div>
              </div>
            </div>
          </div>
          
          <div class="news-card">
            <div class="news-label">사업소식</div>
            <h3>안전한 디지털 뱅킹의 새로운 기준, SENDY 보안 시스템</h3>
            <div class="news-hashtags">
              <span>#SENDY</span>
              <span>#보안</span>
              <span>#디지털뱅킹</span>
            </div>
            <div class="news-graphic">
              <div class="graphic-content">
                <div class="graphic-icon">🔒</div>
                <div class="graphic-text">최고 수준 보안</div>
              </div>
            </div>
          </div>
          
          <div class="news-card">
            <div class="news-label">사업소식</div>
            <h3>사용자 중심의 편리한 송금 경험, SENDY UX 개선</h3>
            <div class="news-hashtags">
              <span>#SENDY</span>
              <span>#UX</span>
              <span>#사용자경험</span>
            </div>
            <div class="news-graphic">
              <div class="graphic-content">
                <div class="graphic-icon">💡</div>
                <div class="graphic-text">편리한 송금</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 기술로 세상을 돕는 사람들 섹션 -->
      <section class="people-section">
        <div class="people-header">
          <h2>기술로 세상을 돕는 사람들</h2>
          <router-link to="/about" class="people-more-link">
            함께하는 사람들 더 만나보기 →
          </router-link>
        </div>
        <div class="people-container">
          <div class="people-scroll">
            <div class="people-card" style="background: #f8f9fa;">
              <div class="people-photo">👩‍💻</div>
              <div class="people-content">
                <p class="people-description">"SENDY 프로젝트를 통해 금융 기술의 혁신을 이끌고 있습니다. 사용자 중심의 디자인과 보안을 중시합니다."</p>
                <div class="people-info">
                  <span class="people-name">김태형</span>
                  <span class="people-role">SENDY | Backend Developer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #e3f2fd;">
              <div class="people-photo">👨‍💻</div>
              <div class="people-content">
                <p class="people-description">"핀테크 분야에서 일하고 있습니다. 안전하고 편리한 송금 서비스를 만들어 사용자들에게 가치를 전달하고 싶습니다."</p>
                <div class="people-info">
                  <span class="people-name">엄인국</span>
                  <span class="people-role">SENDY | Backend Developer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #f3e5f5;">
              <div class="people-photo">👩‍💼</div>
              <div class="people-content">
                <p class="people-description">"데이터 분석과 백엔드 개발에 관심을 가지고 있습니다. SENDY의 안정적인 서비스를 위해 노력하고 있습니다."</p>
                <div class="people-info">
                  <span class="people-name">이진경</span>
                  <span class="people-role">SENDY | Backend Developer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #fff3e0;">
              <div class="people-photo">👨‍🔬</div>
              <div class="people-content">
                <p class="people-description">"AI와 머신러닝을 활용한 금융 서비스 개발에 참여하고 있습니다. 기술로 사회에 기여하는 방법을 고민합니다."</p>
                <div class="people-info">
                  <span class="people-name">박민수</span>
                  <span class="people-role">AI LAB | ML Engineer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #e8f5e8;">
              <div class="people-photo">👩‍🎨</div>
              <div class="people-content">
                <p class="people-description">"사용자 경험을 중시하는 디자이너입니다. SENDY의 직관적이고 아름다운 인터페이스를 만들어갑니다."</p>
                <div class="people-info">
                  <span class="people-name">최지영</span>
                  <span class="people-role">UX LAB | UI/UX Designer</span>
                </div>
              </div>
            </div>
            
            <!-- 중복 카드들 (무한 스크롤을 위해) -->
            <div class="people-card" style="background: #f8f9fa;">
              <div class="people-photo">👩‍💻</div>
              <div class="people-content">
                <p class="people-description">"SENDY 프로젝트를 통해 금융 기술의 혁신을 이끌고 있습니다. 사용자 중심의 디자인과 보안을 중시합니다."</p>
                <div class="people-info">
                  <span class="people-name">김태형</span>
                  <span class="people-role">SENDY | Backend Developer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #e3f2fd;">
              <div class="people-photo">👨‍💻</div>
              <div class="people-content">
                <p class="people-description">"핀테크 분야에서 일하고 있습니다. 안전하고 편리한 송금 서비스를 만들어 사용자들에게 가치를 전달하고 싶습니다."</p>
                <div class="people-info">
                  <span class="people-name">엄인국</span>
                  <span class="people-role">SENDY | Backend Developer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #f3e5f5;">
              <div class="people-photo">👩‍💼</div>
              <div class="people-content">
                <p class="people-description">"데이터 분석과 백엔드 개발에 관심을 가지고 있습니다. SENDY의 안정적인 서비스를 위해 노력하고 있습니다."</p>
                <div class="people-info">
                  <span class="people-name">이진경</span>
                  <span class="people-role">SENDY | Backend Developer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #fff3e0;">
              <div class="people-photo">👨‍🔬</div>
              <div class="people-content">
                <p class="people-description">"AI와 머신러닝을 활용한 금융 서비스 개발에 참여하고 있습니다. 기술로 사회에 기여하는 방법을 고민합니다."</p>
                <div class="people-info">
                  <span class="people-name">박민수</span>
                  <span class="people-role">AI LAB | ML Engineer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #e8f5e8;">
              <div class="people-photo">👩‍🎨</div>
              <div class="people-content">
                <p class="people-description">"사용자 경험을 중시하는 디자이너입니다. SENDY의 직관적이고 아름다운 인터페이스를 만들어갑니다."</p>
                <div class="people-info">
                  <span class="people-name">최지영</span>
                  <span class="people-role">UX LAB | UI/UX Designer</span>
                </div>
              </div>
            </div>
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
      
      <!-- 기술로 세상을 돕는 사람들 섹션 -->
      <section class="people-section">
        <div class="people-header">
          <h2>기술로 세상을 돕는 사람들</h2>
          <router-link to="/about" class="people-more-link">
            함께하는 사람들 더 만나보기 →
          </router-link>
        </div>
        <div class="people-container">
          <div class="people-scroll">
            <div class="people-card" style="background: #f8f9fa;">
              <div class="people-photo">👩‍💻</div>
              <div class="people-content">
                <p class="people-description">"SENDY 프로젝트를 통해 금융 기술의 혁신을 이끌고 있습니다. 사용자 중심의 디자인과 보안을 중시합니다."</p>
                <div class="people-info">
                  <span class="people-name">김태형</span>
                  <span class="people-role">SENDY | Backend Developer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #e3f2fd;">
              <div class="people-photo">👨‍💻</div>
              <div class="people-content">
                <p class="people-description">"핀테크 분야에서 일하고 있습니다. 안전하고 편리한 송금 서비스를 만들어 사용자들에게 가치를 전달하고 싶습니다."</p>
                <div class="people-info">
                  <span class="people-name">엄인국</span>
                  <span class="people-role">SENDY | Backend Developer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #f3e5f5;">
              <div class="people-photo">👩‍💼</div>
              <div class="people-content">
                <p class="people-description">"데이터 분석과 백엔드 개발에 관심을 가지고 있습니다. SENDY의 안정적인 서비스를 위해 노력하고 있습니다."</p>
                <div class="people-info">
                  <span class="people-name">이진경</span>
                  <span class="people-role">SENDY | Backend Developer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #fff3e0;">
              <div class="people-photo">👨‍🔬</div>
              <div class="people-content">
                <p class="people-description">"AI와 머신러닝을 활용한 금융 서비스 개발에 참여하고 있습니다. 기술로 사회에 기여하는 방법을 고민합니다."</p>
                <div class="people-info">
                  <span class="people-name">박민수</span>
                  <span class="people-role">AI LAB | ML Engineer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #e8f5e8;">
              <div class="people-photo">👩‍🎨</div>
              <div class="people-content">
                <p class="people-description">"사용자 경험을 중시하는 디자이너입니다. SENDY의 직관적이고 아름다운 인터페이스를 만들어갑니다."</p>
                <div class="people-info">
                  <span class="people-name">최지영</span>
                  <span class="people-role">UX LAB | UI/UX Designer</span>
                </div>
              </div>
            </div>
            
            <!-- 중복 카드들 (무한 스크롤을 위해) -->
            <div class="people-card" style="background: #f8f9fa;">
              <div class="people-photo">👩‍💻</div>
              <div class="people-content">
                <p class="people-description">"SENDY 프로젝트를 통해 금융 기술의 혁신을 이끌고 있습니다. 사용자 중심의 디자인과 보안을 중시합니다."</p>
                <div class="people-info">
                  <span class="people-name">김태형</span>
                  <span class="people-role">SENDY | Backend Developer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #e3f2fd;">
              <div class="people-photo">👨‍💻</div>
              <div class="people-content">
                <p class="people-description">"핀테크 분야에서 일하고 있습니다. 안전하고 편리한 송금 서비스를 만들어 사용자들에게 가치를 전달하고 싶습니다."</p>
                <div class="people-info">
                  <span class="people-name">엄인국</span>
                  <span class="people-role">SENDY | Backend Developer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #f3e5f5;">
              <div class="people-photo">👩‍💼</div>
              <div class="people-content">
                <p class="people-description">"데이터 분석과 백엔드 개발에 관심을 가지고 있습니다. SENDY의 안정적인 서비스를 위해 노력하고 있습니다."</p>
                <div class="people-info">
                  <span class="people-name">이진경</span>
                  <span class="people-role">SENDY | Backend Developer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #fff3e0;">
              <div class="people-photo">👨‍🔬</div>
              <div class="people-content">
                <p class="people-description">"AI와 머신러닝을 활용한 금융 서비스 개발에 참여하고 있습니다. 기술로 사회에 기여하는 방법을 고민합니다."</p>
                <div class="people-info">
                  <span class="people-name">박민수</span>
                  <span class="people-role">AI LAB | ML Engineer</span>
                </div>
              </div>
            </div>
            
            <div class="people-card" style="background: #e8f5e8;">
              <div class="people-photo">👩‍🎨</div>
              <div class="people-content">
                <p class="people-description">"사용자 경험을 중시하는 디자이너입니다. SENDY의 직관적이고 아름다운 인터페이스를 만들어갑니다."</p>
                <div class="people-info">
                  <span class="people-name">최지영</span>
                  <span class="people-role">UX LAB | UI/UX Designer</span>
                </div>
              </div>
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
    },
    
    handleFeatureClick(feature) {
      alert('로그인 이후 사용가능합니다.')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.home-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.welcome-section {
  background: linear-gradient(135deg, #60A5FA 0%, #06B6D4 100%);
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
  color: #60A5FA;
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
  cursor: pointer;
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

/* 기술로 세상을 돕는 사람들 섹션 스타일 */
.people-section {
  margin-top: 80px;
  margin-bottom: 60px;
  overflow: hidden;
}

.people-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.people-header h2 {
  color: #333;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.people-more-link {
  color: #60A5FA;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: color 0.3s ease;
}

.people-more-link:hover {
  color: #06B6D4;
}

.people-container {
  overflow: hidden;
  position: relative;
}

.people-scroll {
  display: flex;
  gap: 30px;
  animation: scrollLeft 40s linear infinite;
  width: max-content;
}

@keyframes scrollLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.people-card {
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 350px;
  max-width: 350px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.people-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.people-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #60A5FA 0%, #06B6D4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.people-content {
  flex: 1;
}

.people-description {
  color: #333;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  font-style: italic;
}

.people-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.people-name {
  font-weight: 600;
  color: #333;
  font-size: 16px;
}

.people-role {
  color: #666;
  font-size: 14px;
}

/* 뉴스 섹션 스타일 */
.news-section {
  margin-top: 60px;
  margin-bottom: 40px;
}

.news-section h2 {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 28px;
  font-weight: 700;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.news-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.news-label {
  position: absolute;
  top: 20px;
  left: 20px;
  background: linear-gradient(135deg, #60A5FA 0%, #06B6D4 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.news-card h3 {
  margin: 40px 0 20px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  min-height: 50px;
}

.news-hashtags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.news-hashtags span {
  background: #f1f5f9;
  color: #475569;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

.news-graphic {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.graphic-content {
  text-align: center;
  color: white;
}

.graphic-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.graphic-text {
  font-size: 14px;
  font-weight: 600;
  opacity: 0.9;
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  .people-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .people-header h2 {
    font-size: 24px;
  }
}
</style> 