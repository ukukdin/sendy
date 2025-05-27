// 인증 서비스
export const authService = {
  // 현재 로그인 상태 확인
  isLoggedIn() {
    return !!localStorage.getItem('user')
  },

  // 사용자 정보 가져오기
  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // 로그인 처리
  login(userInfo) {
    localStorage.setItem('user', JSON.stringify(userInfo))
    localStorage.setItem('loginTime', new Date().toISOString())
  },

  // 로그아웃 처리
  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('loginTime')
    localStorage.removeItem('kakao_token')
    localStorage.removeItem('google_token')
  },

  // 카카오 로그인 초기화
  initKakao() {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      // 테스트용 - 실제 운영시에는 환경변수 사용
      try {
        window.Kakao.init('test_key')
      } catch (error) {
        console.log('카카오 SDK 초기화 실패 (테스트 모드)')
      }
    }
  },

  // 카카오 로그인 (모의 구현)
  async loginWithKakao() {
    return new Promise((resolve, reject) => {
      // 실제 SDK 대신 모의 로그인
      setTimeout(() => {
        const user = {
          id: 'kakao_' + Date.now(),
          name: '카카오 사용자',
          email: 'kakao@example.com',
          profileImage: 'https://via.placeholder.com/32x32/FEE500/000000?text=K',
          provider: 'kakao',
          accessToken: 'mock_kakao_token'
        }
        
        this.login(user)
        localStorage.setItem('kakao_token', 'mock_kakao_token')
        resolve(user)
      }, 1000) // 1초 지연으로 실제 로그인 느낌 연출
    })
  },

  // 구글 로그인 (실제 구현)
  async loginWithGoogle() {
    return new Promise((resolve, reject) => {
      // 구글 SDK 로드 확인
      if (!window.google) {
        console.warn('구글 SDK가 로드되지 않았습니다. 데모 로그인을 사용합니다.')
        this.mockGoogleLogin(resolve)
        return
      }

      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
      
      // 실제 클라이언트 ID가 없으면 데모 로그인
      if (!clientId || clientId === 'your_google_client_id_here' || clientId.includes('qhqhqh')) {
        console.warn('유효한 구글 클라이언트 ID가 설정되지 않았습니다. 데모 로그인을 사용합니다.')
        this.mockGoogleLogin(resolve)
        return
      }

      try {
        // OAuth 2.0 팝업 방식 로그인
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'openid email profile',
          callback: async (tokenResponse) => {
            if (tokenResponse.access_token) {
              try {
                // 사용자 정보 가져오기
                const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                  headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`
                  }
                })
                
                if (!userResponse.ok) {
                  throw new Error('사용자 정보를 가져올 수 없습니다.')
                }
                
                const userInfo = await userResponse.json()
                
                const user = {
                  id: userInfo.id,
                  name: userInfo.name,
                  email: userInfo.email,
                  profileImage: userInfo.picture,
                  provider: 'google',
                  accessToken: tokenResponse.access_token
                }
                
                this.login(user)
                localStorage.setItem('google_token', tokenResponse.access_token)
                resolve(user)
              } catch (error) {
                console.error('구글 사용자 정보 가져오기 실패:', error)
                reject(new Error('구글 사용자 정보를 가져오는데 실패했습니다.'))
              }
            } else {
              reject(new Error('구글 로그인이 취소되었습니다.'))
            }
          },
          error_callback: (error) => {
            console.error('구글 로그인 오류:', error)
            reject(new Error('구글 로그인 중 오류가 발생했습니다.'))
          }
        })

        // 토큰 요청 시작
        tokenClient.requestAccessToken()
        
      } catch (error) {
        console.error('구글 로그인 초기화 실패:', error)
        reject(new Error('구글 로그인을 초기화할 수 없습니다.'))
      }
    })
  },

  // 데모 구글 로그인
  mockGoogleLogin(resolve) {
    setTimeout(() => {
      const user = {
        id: 'google_demo_' + Date.now(),
        name: '구글 데모 사용자',
        email: 'demo@google.com',
        profileImage: 'https://via.placeholder.com/32x32/4285F4/FFFFFF?text=G',
        provider: 'google',
        accessToken: 'demo_google_token'
      }
      
      this.login(user)
      localStorage.setItem('google_token', 'demo_google_token')
      resolve(user)
    }, 1000)
  },

  // 카카오 로그아웃
  async logoutKakao() {
    if (window.Kakao && window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout()
    }
  },

  // 구글 로그아웃
  async logoutGoogle() {
    const token = localStorage.getItem('google_token')
    if (token && window.google) {
      try {
        // 구글 계정 로그아웃
        if (window.google.accounts && window.google.accounts.id) {
          window.google.accounts.id.disableAutoSelect()
        }
        
        // OAuth 토큰 취소
        if (window.google.accounts && window.google.accounts.oauth2) {
          window.google.accounts.oauth2.revoke(token, () => {
            console.log('구글 토큰이 취소되었습니다.')
          })
        }
      } catch (error) {
        console.error('구글 로그아웃 중 오류:', error)
      }
    }
  },

  // 전체 로그아웃
  async logoutAll() {
    await this.logoutKakao()
    await this.logoutGoogle()
    this.logout()
  }
} 