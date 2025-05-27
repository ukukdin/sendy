import axios from 'axios'

// 백엔드 API 기본 URL
const API_BASE_URL = 'http://localhost:8080/api/tech-posts'

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// 하드코딩된 샘플 데이터
const samplePosts = [
  {
    id: 1,
    title: "React 18의 새로운 기능과 성능 최적화",
    content: "React 18에서 도입된 Concurrent Features와 Automatic Batching에 대해 알아보고, 실제 프로젝트에서 어떻게 활용할 수 있는지 살펴봅니다. Suspense와 함께 사용하는 방법과 성능 향상 팁을 제공합니다.",
    company: "카카오",
    category: "Frontend",
    tags: ["React", "JavaScript", "Performance", "Web Development"],
    readTime: "8분",
    author: "카카오",
    createdAt: "2025-05-27T10:00:00",
    url: "https://whatthaburger.tistory.com/"
  },
  {
    id: 2,
    title: "Kubernetes 환경에서의 마이크로서비스 배포 전략",
    content: "대규모 마이크로서비스 아키텍처를 Kubernetes 환경에 배포할 때 고려해야 할 사항들을 다룹니다. Service Mesh, Ingress Controller, 그리고 모니터링 전략에 대해 설명합니다.",
    company: "네이버",
    category: "DevOps",
    tags: ["Kubernetes", "Microservices", "Docker", "DevOps"],
    readTime: "12분",
    author: "네이버",
    createdAt: "2025-05-26T14:30:00",
    url: "https://d2.naver.com/helloworld/7804182"
  },
  {
    id: 3,
    title: "머신러닝 모델의 실시간 추론 시스템 구축",
    content: "TensorFlow Serving과 Kubernetes를 활용하여 머신러닝 모델의 실시간 추론 시스템을 구축하는 방법을 소개합니다. 모델 버전 관리와 A/B 테스트 전략도 함께 다룹니다.",
    company: "라인",
    category: "AI/ML",
    tags: ["Machine Learning", "TensorFlow", "Kubernetes", "MLOps"],
    readTime: "15분",
    author: "라인",
    createdAt: "2025-05-25T09:15:00",
    url: "https://engineering.linecorp.com/ko/blog/ml-inference-system/"
  },
  {
    id: 4,
    title: "Spring Boot 3.0과 GraalVM Native Image",
    content: "Spring Boot 3.0에서 지원하는 GraalVM Native Image를 활용하여 애플리케이션 시작 시간을 단축하고 메모리 사용량을 최적화하는 방법을 알아봅니다.",
    company: "우아한형제들",
    category: "Backend",
    tags: ["Spring Boot", "GraalVM", "Java", "Performance"],
    readTime: "10분",
    author: "우아한형제들",
    createdAt: "2025-05-24T16:45:00",
    url: "https://techblog.woowahan.com/10969/"
  },
  {
    id: 5,
    title: "Vue.js 3 Composition API 완벽 가이드",
    content: "Vue.js 3의 Composition API를 활용하여 더 재사용 가능하고 유지보수하기 쉬운 컴포넌트를 작성하는 방법을 설명합니다. TypeScript와의 통합 방법도 함께 다룹니다.",
    company: "토스",
    category: "Frontend",
    tags: ["Vue.js", "TypeScript", "Composition API", "Frontend"],
    readTime: "9분",
    author: "토스",
    createdAt: "2025-05-23T11:20:00",
    url: "https://toss.tech/article/vue3-composition-api"
  },
  {
    id: 6,
    title: "대용량 데이터 처리를 위한 Apache Kafka 활용법",
    content: "실시간 데이터 스트리밍 처리를 위한 Apache Kafka의 핵심 개념과 실제 운영 환경에서의 최적화 방법을 소개합니다. 파티셔닝 전략과 컨슈머 그룹 관리에 대해 다룹니다.",
    company: "쿠팡",
    category: "Backend",
    tags: ["Kafka", "Data Streaming", "Big Data", "Distributed Systems"],
    readTime: "14분",
    author: "쿠팡",
    createdAt: "2025-05-22T13:10:00",
    url: "https://medium.com/coupang-engineering/kafka-best-practices"
  },
  {
    id: 7,
    title: "모바일 앱 성능 모니터링과 최적화",
    content: "React Native와 Flutter 앱의 성능을 모니터링하고 최적화하는 방법을 비교 분석합니다. 메모리 누수 방지와 렌더링 성능 향상 기법을 제공합니다.",
    company: "당근마켓",
    category: "Mobile",
    tags: ["React Native", "Flutter", "Performance", "Mobile Development"],
    readTime: "11분",
    author: "당근마켓",
    createdAt: "2025-05-21T15:30:00",
    url: "https://medium.com/daangn/mobile-performance-monitoring"
  },
  {
    id: 8,
    title: "GraphQL과 REST API 비교 분석",
    content: "GraphQL과 REST API의 장단점을 실제 프로젝트 경험을 바탕으로 비교 분석합니다. 언제 어떤 기술을 선택해야 하는지에 대한 가이드라인을 제시합니다.",
    company: "배달의민족",
    category: "Backend",
    tags: ["GraphQL", "REST API", "API Design", "Web Development"],
    readTime: "7분",
    author: "배달의민족",
    createdAt: "2025-05-20T10:45:00",
    url: "https://techblog.yogiyo.co.kr/graphql-vs-rest-api"
  },
  {
    id: 9,
    title: "AWS Lambda를 활용한 서버리스 아키텍처",
    content: "AWS Lambda와 API Gateway를 활용하여 서버리스 아키텍처를 구축하는 방법을 설명합니다. 비용 최적화와 콜드 스타트 문제 해결 방안도 함께 다룹니다.",
    company: "야놀자",
    category: "Cloud",
    tags: ["AWS Lambda", "Serverless", "Cloud Computing", "API Gateway"],
    readTime: "13분",
    author: "야놀자",
    createdAt: "2025-05-19T14:20:00",
    url: "https://yanolja.github.io/2023/03/15/serverless-architecture/"
  },
  {
    id: 10,
    title: "TypeScript 고급 타입 시스템 활용법",
    content: "TypeScript의 고급 타입 기능을 활용하여 더 안전하고 표현력 있는 코드를 작성하는 방법을 소개합니다. Conditional Types, Mapped Types, Template Literal Types 등을 다룹니다.",
    company: "NHN",
    category: "Frontend",
    tags: ["TypeScript", "Type System", "JavaScript", "Web Development"],
    readTime: "6분",
    author: "NHN",
    createdAt: "2025-05-18T09:30:00",
    url: "https://meetup.nhncloud.com/posts/295"
  },
  {
    id: 11,
    title: "Redis를 활용한 캐싱 전략과 성능 최적화",
    content: "Redis를 활용한 다양한 캐싱 패턴과 실제 운영 환경에서의 성능 최적화 방법을 소개합니다. 메모리 관리와 클러스터 구성에 대해서도 다룹니다.",
    company: "SK플래닛",
    category: "Backend",
    tags: ["Redis", "Caching", "Performance", "Database"],
    readTime: "9분",
    author: "SK플래닛",
    createdAt: "2025-05-17T12:15:00",
    url: "https://tech.socarcorp.kr/data/2023/03/15/redis-caching-strategy/"
  },
  {
    id: 12,
    title: "CI/CD 파이프라인 구축과 자동화",
    content: "Jenkins, GitLab CI, GitHub Actions를 활용한 CI/CD 파이프라인 구축 방법을 비교하고, 각각의 장단점과 적용 사례를 소개합니다.",
    company: "LG CNS",
    category: "DevOps",
    tags: ["CI/CD", "Jenkins", "GitLab CI", "GitHub Actions", "Automation"],
    readTime: "10분",
    author: "LG CNS",
    createdAt: "2025-05-16T16:00:00",
    url: "https://www.lgcns.com/blog/cns-tech/cicd-pipeline-automation/"
  }
]

export const postService = {
  // 모든 포스트 가져오기 (실제 API 호출)
  async getAllPosts() {
    try {
      const response = await api.get('/')
      return response.data
    } catch (error) {
      console.error('포스트 조회 실패:', error)
      // API 실패 시 하드코딩된 데이터로 폴백
      return samplePosts
    }
  },

  // 페이지네이션으로 포스트 가져오기
  async getPostsWithPagination(page = 0, size = 10) {
    try {
      const response = await api.get('/page', {
        params: { page, size }
      })
      return response.data
    } catch (error) {
      console.error('페이지네이션 포스트 조회 실패:', error)
      // API 실패 시 하드코딩된 데이터로 폴백
      const sortedPosts = [...samplePosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      const start = page * size
      const end = start + size
      const content = sortedPosts.slice(start, end)
      
      return {
        content: content,
        totalElements: samplePosts.length,
        totalPages: Math.ceil(samplePosts.length / size),
        number: page,
        size: size
      }
    }
  },

  // 특정 포스트 가져오기
  async getPostById(id) {
    try {
      // 하드코딩된 데이터에서 ID로 찾기
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const post = samplePosts.find(p => p.id === parseInt(id))
          if (post) {
            resolve(post)
          } else {
            reject(new Error('포스트를 찾을 수 없습니다'))
          }
        }, 200)
      })
    } catch (error) {
      console.error('포스트 상세 조회 실패:', error)
      throw error
    }
  },

  // 최신 포스트 가져오기 (개수 제한)
  async getLatestPosts() {
    try {
      const response = await api.get('/latest')
      return response.data
    } catch (error) {
      console.error('최신 포스트 조회 실패:', error)
      // API 실패 시 하드코딩된 데이터로 폴백
      const sortedPosts = [...samplePosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      return sortedPosts.slice(0, 3)
    }
  },

  // 최신 포스트 가져오기 (기존 메서드명 호환성)
  async getRecentPosts(limit = 3) {
    return this.getLatestPosts()
  },

  // 카테고리별 포스트 가져오기
  async getPostsByCategory(category) {
    try {
      const response = await api.get(`/category/${encodeURIComponent(category)}`)
      return response.data
    } catch (error) {
      console.error('카테고리별 포스트 조회 실패:', error)
      // API 실패 시 하드코딩된 데이터로 폴백
      const filteredPosts = samplePosts.filter(post => 
        post.category === category
      ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      return filteredPosts
    }
  },

  // 회사별 포스트 가져오기
  async getPostsByCompany(company) {
    try {
      const response = await api.get(`/company/${encodeURIComponent(company)}`)
      return response.data
    } catch (error) {
      console.error('회사별 포스트 조회 실패:', error)
      // API 실패 시 하드코딩된 데이터로 폴백
      const filteredPosts = samplePosts.filter(post => 
        post.company === company
      ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      return filteredPosts
    }
  },

  // 검색
  async searchPosts(keyword) {
    try {
      const response = await api.get('/search', {
        params: { keyword }
      })
      return response.data
    } catch (error) {
      console.error('포스트 검색 실패:', error)
      // API 실패 시 하드코딩된 데이터로 폴백
      const query = keyword.toLowerCase()
      const filteredPosts = samplePosts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.company.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      return filteredPosts
    }
  },

  // 포스트 생성
  async createPost(postData) {
    try {
      const response = await api.post('/', postData)
      return response.data
    } catch (error) {
      console.error('포스트 생성 실패:', error)
      throw error
    }
  },

  // 포스트 업데이트
  async updatePost(postData) {
    try {
      const response = await api.put(`/${postData.id}`, postData)
      return response.data
    } catch (error) {
      console.error('포스트 업데이트 실패:', error)
      throw error
    }
  },

  // 포스트 삭제
  async deletePost(id) {
    try {
      await api.delete(`/${id}`)
      return true
    } catch (error) {
      console.error('포스트 삭제 실패:', error)
      throw error
    }
  },

  // 카테고리 목록 조회
  async getCategories() {
    try {
      const response = await api.get('/categories')
      return response.data
    } catch (error) {
      console.error('카테고리 조회 실패:', error)
      // API 실패 시 하드코딩된 데이터로 폴백
      const categories = [...new Set(samplePosts.map(post => post.category))]
      return categories
    }
  },

  // 회사 목록 조회
  async getCompanies() {
    try {
      const response = await api.get('/companies')
      return response.data
    } catch (error) {
      console.error('회사 목록 조회 실패:', error)
      // API 실패 시 하드코딩된 데이터로 폴백
      const companies = [...new Set(samplePosts.map(post => post.company))]
      return companies
    }
  }
} 