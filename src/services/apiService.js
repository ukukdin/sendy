// SENDY API 서비스
const API_BASE_URL = 'http://localhost:8080/api'

export const apiService = {
  // 기본 API 호출 함수
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    }

    const config = {
      ...defaultOptions,
      ...options
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API 호출 오류:', error)
      throw error
    }
  },

  // GET 요청
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  },

  // POST 요청
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  // PUT 요청
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },

  // DELETE 요청
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }
}

// 인증 관련 API
export const authAPI = {
  // 회원가입
  async signup(userData) {
    return apiService.post('/auth/signup', userData)
  },

  // 로그인
  async login(credentials) {
    return apiService.post('/auth/login', credentials)
  },

  // 로그아웃
  async logout() {
    return apiService.post('/auth/logout')
  },

  // 사용자 정보 조회
  async getUserInfo() {
    return apiService.get('/auth/user')
  }
}

// 송금 관련 API
export const transferAPI = {
  // 송금
  async transfer(transferData) {
    return apiService.post('/transfer', transferData)
  },

  // 거래내역 조회
  async getTransactions(filters = {}) {
    const params = new URLSearchParams(filters)
    return apiService.get(`/transactions?${params}`)
  },

  // 계좌 잔액 조회
  async getBalance() {
    return apiService.get('/account/balance')
  }
} 