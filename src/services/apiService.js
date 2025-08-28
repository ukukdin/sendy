// SENDY API 서비스 - 환경별 설정
const getAPIBaseURL = () => {
  // 개발 환경: Vite 프록시 사용 (CORS 우회)
  if (import.meta.env.DEV) {
    return '/api'
  }
  
  // 프로덕션 환경: GitHub Pages에서는 Mock API 사용
  if (location.hostname === 'ukukdin.github.io') {
    return 'mock'  // Mock API 모드
  }
  
  // 기타 프로덕션 환경: 실제 API 서버 URL
  return 'http://localhost:8080/api'
}

const API_BASE_URL = getAPIBaseURL()

export const apiService = {
  // 기본 API 호출 함수
  async request(endpoint, options = {}) {
    // Mock API 모드 (GitHub Pages용)
    if (API_BASE_URL === 'mock') {
      return this.mockRequest(endpoint, options)
    }

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

  // Mock API 응답 (GitHub Pages용)
  async mockRequest(endpoint, options = {}) {
    // 실제 API 호출을 시뮬레이션하기 위한 지연
    await new Promise(resolve => setTimeout(resolve, 500))

    const method = options.method || 'GET'
    const body = options.body ? JSON.parse(options.body) : null

    console.log(`[Mock API] ${method} ${endpoint}`, body)

    // 회원가입 API 시뮬레이션
    if (endpoint === '/users' && method === 'POST') {
      return {
        success: true,
        id: Date.now(),
        message: '회원가입이 완료되었습니다.',
        data: {
          id: Date.now(),
          name: body.name,
          email: body.email,
          phoneNumber: body.phoneNumber
        }
      }
    }

    // 이메일 인증 발송 API 시뮬레이션
    if (endpoint === '/users/auth/email/send' && method === 'POST') {
      return {
        success: true,
        message: '인증 메일이 발송되었습니다.',
        data: {
          email: body.email,
          sentAt: new Date().toISOString()
        }
      }
    }

    // 기본 성공 응답
    return {
      success: true,
      message: 'Mock API 응답입니다.',
      data: {}
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
  // 회원가입 (Swagger 스펙에 맞게 수정)
  async signup(userData) {
    // Swagger 스펙: POST /users
    const signupData = {
      name: userData.name || userData.username,
      password: userData.password,
      phoneNumber: userData.phone || userData.phoneNumber,
      email: userData.email,
      birth: userData.birth
    }
    return apiService.post('/users', signupData)
  },

  // 이메일 인증 발송
  async sendEmailVerification(email, userId) {
    // Swagger 스펙: POST /users/auth/email/send
    return apiService.post('/users/auth/email/send', { email, userId })
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