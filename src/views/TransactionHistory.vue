<template>
  <div class="transaction-container">
    <div class="transaction-header">
      <h2>거래내역</h2>
      <div class="filter-section">
        <select v-model="selectedFilter" class="filter-select">
          <option value="all">전체</option>
          <option value="sent">보낸 내역</option>
          <option value="received">받은 내역</option>
        </select>
      </div>
    </div>
    
    <div class="transaction-list">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>거래내역을 불러오는 중...</p>
      </div>
      
      <div 
        v-else-if="filteredTransactions.length > 0"
        v-for="transaction in filteredTransactions" 
        :key="transaction.id"
        class="transaction-item"
        :class="{ 
          'sent': transaction.type === 'sent',
          'received': transaction.type === 'received'
        }"
      >
        <div class="transaction-info">
          <div class="transaction-main">
            <div class="transaction-name">{{ transaction.name }}</div>
            <div class="transaction-date">{{ formatDate(transaction.date) }}</div>
          </div>
          <div class="transaction-amount" :class="transaction.type">
            <span v-if="transaction.type === 'sent'">-</span>
            <span v-else>+</span>
            ₩{{ formatNumber(transaction.amount) }}
          </div>
        </div>
        
        <div class="transaction-details">
          <div class="transaction-memo" v-if="transaction.memo">
            {{ transaction.memo }}
          </div>
          <div class="transaction-status" :class="transaction.status">
            {{ getStatusText(transaction.status) }}
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="filteredTransactions.length === 0" class="empty-state">
      <div class="empty-icon">📊</div>
      <h3>거래내역이 없습니다</h3>
      <p>아직 거래내역이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/authService'
import { transferAPI } from '@/services/apiService'

export default {
  name: 'TransactionHistory',
  data() {
    return {
      selectedFilter: 'all',
      transactions: [],
      loading: false
    }
  },
  mounted() {
    this.checkAuth()
    this.loadTransactions()
  },
  computed: {
    filteredTransactions() {
      if (this.selectedFilter === 'all') {
        return this.transactions
      }
      return this.transactions.filter(t => t.type === this.selectedFilter)
    }
  },
  methods: {
    checkAuth() {
      if (!authService.isLoggedIn()) {
        alert('로그인이 필요합니다.')
        this.$router.push('/login')
        return
      }
    },
    
    async loadTransactions() {
      this.loading = true
      
      try {
        const filters = {}
        if (this.selectedFilter !== 'all') {
          filters.type = this.selectedFilter
        }
        
        const response = await transferAPI.getTransactions(filters)
        
        if (response.success) {
          this.transactions = response.data || []
        } else {
          // 백엔드 연결 실패 시 샘플 데이터 사용
          this.transactions = [
            {
              id: 1,
              name: '김철수',
              amount: 50000,
              type: 'sent',
              date: new Date('2024-01-15'),
              memo: '점심값',
              status: 'completed'
            },
            {
              id: 2,
              name: '이영희',
              amount: 100000,
              type: 'received',
              date: new Date('2024-01-14'),
              memo: '생일선물',
              status: 'completed'
            },
            {
              id: 3,
              name: '박민수',
              amount: 30000,
              type: 'sent',
              date: new Date('2024-01-13'),
              memo: '카페값',
              status: 'completed'
            },
            {
              id: 4,
              name: '최지영',
              amount: 75000,
              type: 'received',
              date: new Date('2024-01-12'),
              memo: '',
              status: 'completed'
            },
            {
              id: 5,
              name: '정현우',
              amount: 200000,
              type: 'sent',
              date: new Date('2024-01-11'),
              memo: '보험료',
              status: 'processing'
            }
          ]
        }
      } catch (error) {
        console.error('거래내역 로드 오류:', error)
        // 백엔드 연결 실패 시 샘플 데이터 사용
        this.transactions = [
          {
            id: 1,
            name: '김철수',
            amount: 50000,
            type: 'sent',
            date: new Date('2024-01-15'),
            memo: '점심값',
            status: 'completed'
          },
          {
            id: 2,
            name: '이영희',
            amount: 100000,
            type: 'received',
            date: new Date('2024-01-14'),
            memo: '생일선물',
            status: 'completed'
          },
          {
            id: 3,
            name: '박민수',
            amount: 30000,
            type: 'sent',
            date: new Date('2024-01-13'),
            memo: '카페값',
            status: 'completed'
          },
          {
            id: 4,
            name: '최지영',
            amount: 75000,
            type: 'received',
            date: new Date('2024-01-12'),
            memo: '',
            status: 'completed'
          },
          {
            id: 5,
            name: '정현우',
            amount: 200000,
            type: 'sent',
            date: new Date('2024-01-11'),
            memo: '보험료',
            status: 'processing'
          }
        ]
      } finally {
        this.loading = false
      }
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
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
    },
    
    getStatusText(status) {
      const statusMap = {
        'completed': '완료',
        'processing': '처리중',
        'failed': '실패'
      }
      return statusMap[status] || status
    }
  },
  
  watch: {
    selectedFilter() {
      this.loadTransactions()
    }
  }
}
</script>

<style scoped>
.transaction-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.transaction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.transaction-header h2 {
  color: #333;
  font-size: 24px;
  margin: 0;
}

.filter-section {
  display: flex;
  gap: 10px;
}

.filter-select {
  padding: 8px 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #007bff;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.transaction-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #e1e5e9;
  transition: transform 0.2s ease;
}

.transaction-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.transaction-item.sent {
  border-left-color: #dc3545;
}

.transaction-item.received {
  border-left-color: #28a745;
}

.transaction-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.transaction-main {
  flex: 1;
}

.transaction-name {
  font-weight: 600;
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
}

.transaction-date {
  font-size: 14px;
  color: #666;
}

.transaction-amount {
  font-weight: bold;
  font-size: 18px;
}

.transaction-amount.sent {
  color: #dc3545;
}

.transaction-amount.received {
  color: #28a745;
}

.transaction-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.transaction-memo {
  color: #666;
  font-style: italic;
}

.transaction-status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.transaction-status.completed {
  background: #d4edda;
  color: #155724;
}

.transaction-status.processing {
  background: #fff3cd;
  color: #856404;
}

.transaction-status.failed {
  background: #f8d7da;
  color: #721c24;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.empty-state h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.empty-state p {
  margin: 0;
  color: #666;
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e1e5e9;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 