import axios from 'axios'

// 기술 블로그 샘플 데이터
const techBlogPosts = [
  {
    id: 1,
    title: "Simplicity 4 : 뒤에 개발자 있어요",
    content: "안녕하세요, Simplicity 4 프로젝트에서 프론트엔드 개발을 맡은 Frontend UX Engineer 박은식, 이예서입니다. 이번 프로젝트를 진행할 때 기술적으로 고민했던 내용들을 공유하고자 해요. 이번 Simplicity 프로젝트는 다음 시즌에도 재사용 가능하도록 구조화하는데 초점을 맞췄어요.",
    author: "박은식, 이예서",
    createdAt: "2025-05-27T14:30:00.000Z",
    published: true,
    category: "Frontend",
    company: "Codenary",
    tags: ["React", "Frontend", "UX", "컴포넌트"],
    readTime: "8분"
  },
  {
    id: 2,
    title: "RAG 기법을 활용한 AWX 지원 봇 개발기",
    content: "LY는 여러 나라의 임직원이 함께 서비스를 개발하고 있기 때문에 문의 또한 여러 언어로 접수됩니다. 이를 고려해 SBERT에서 제공하는 성능 평가 표를 참조해서 다국어를 지원하는 모델 중 문장 비교 성능이 가장 괜찮은 paraphrase-multilingual-mpnet-base-v2를 선택했습니다.",
    author: "LY 개발팀",
    createdAt: "2025-05-23T09:15:00.000Z",
    published: true,
    category: "AI/ML",
    company: "LY Corporation",
    tags: ["RAG", "LangChain", "OpenAI", "ChatBot"],
    readTime: "12분"
  },
  {
    id: 3,
    title: "모바일 웹 성능 최적화 실전 가이드",
    content: "모바일 환경에서의 웹 성능 최적화는 사용자 경험에 직접적인 영향을 미칩니다. 이번 글에서는 실제 프로젝트에서 적용한 성능 최적화 기법들을 소개합니다. 이미지 최적화, 코드 스플리팅, 캐싱 전략 등 다양한 방법을 다룹니다.",
    author: "김개발",
    createdAt: "2025-05-20T16:45:00.000Z",
    published: true,
    category: "Performance",
    company: "Tech Company",
    tags: ["모바일", "성능최적화", "웹팩", "이미지"],
    readTime: "10분"
  },
  {
    id: 4,
    title: "Vue 3 Composition API 마스터하기",
    content: "Vue 3의 Composition API는 기존 Options API와는 다른 접근 방식을 제공합니다. 이 글에서는 Composition API의 핵심 개념부터 실제 프로젝트 적용 사례까지 상세히 다룹니다. ref, reactive, computed, watch 등의 핵심 기능들을 예제와 함께 설명합니다.",
    author: "이프론트",
    createdAt: "2025-05-18T11:20:00.000Z",
    published: true,
    category: "Vue.js",
    company: "Frontend Studio",
    tags: ["Vue3", "Composition API", "JavaScript", "프론트엔드"],
    readTime: "15분"
  },
  {
    id: 5,
    title: "마이크로서비스 아키텍처 설계 패턴",
    content: "대규모 서비스에서 마이크로서비스 아키텍처를 도입할 때 고려해야 할 설계 패턴들을 정리했습니다. API Gateway, Service Discovery, Circuit Breaker 등의 패턴과 실제 구현 방법을 다룹니다.",
    author: "박백엔드",
    createdAt: "2025-05-15T13:10:00.000Z",
    published: true,
    category: "Architecture",
    company: "Scale Corp",
    tags: ["마이크로서비스", "아키텍처", "Spring Boot", "Docker"],
    readTime: "20분"
  },
  {
    id: 6,
    title: "TypeScript 고급 타입 시스템 활용법",
    content: "TypeScript의 고급 타입 시스템을 활용하여 더 안전하고 표현력 있는 코드를 작성하는 방법을 알아봅니다. Generic, Conditional Types, Mapped Types 등을 실제 예제와 함께 설명합니다.",
    author: "최타입",
    createdAt: "2025-05-12T10:30:00.000Z",
    published: true,
    category: "TypeScript",
    company: "Type Safe Inc",
    tags: ["TypeScript", "타입시스템", "Generic", "고급기법"],
    readTime: "18분"
  },
  {
    id: 7,
    title: "React 18의 새로운 기능들",
    content: "React 18에서 도입된 Concurrent Features, Automatic Batching, Suspense 개선사항 등을 실제 예제와 함께 살펴봅니다. 성능 향상과 사용자 경험 개선에 대해 다룹니다.",
    author: "리액트맨",
    createdAt: "2025-05-10T15:45:00.000Z",
    published: true,
    category: "Frontend",
    company: "React Corp",
    tags: ["React18", "Concurrent", "Suspense", "성능"],
    readTime: "14분"
  },
  {
    id: 8,
    title: "Docker와 Kubernetes 실전 가이드",
    content: "컨테이너 기반 개발 환경 구축부터 Kubernetes 클러스터 운영까지, 실무에서 바로 적용할 수 있는 DevOps 기술을 정리했습니다.",
    author: "데브옵스킹",
    createdAt: "2025-05-08T08:20:00.000Z",
    published: true,
    category: "DevOps",
    company: "Cloud Native Inc",
    tags: ["Docker", "Kubernetes", "DevOps", "컨테이너"],
    readTime: "25분"
  },
  {
    id: 9,
    title: "GraphQL vs REST API 비교 분석",
    content: "GraphQL과 REST API의 장단점을 실제 프로젝트 경험을 바탕으로 비교 분석합니다. 언제 어떤 기술을 선택해야 하는지에 대한 가이드를 제공합니다.",
    author: "API마스터",
    createdAt: "2025-05-05T12:00:00.000Z",
    published: true,
    category: "Backend",
    company: "API Solutions",
    tags: ["GraphQL", "REST", "API", "백엔드"],
    readTime: "16분"
  },
  {
    id: 10,
    title: "웹 접근성 개선을 위한 실무 가이드",
    content: "WCAG 2.1 가이드라인을 기반으로 한 웹 접근성 개선 방법을 소개합니다. 스크린 리더 지원, 키보드 네비게이션, 색상 대비 등을 다룹니다.",
    author: "접근성전문가",
    createdAt: "2025-05-03T14:25:00.000Z",
    published: true,
    category: "Frontend",
    company: "Accessibility First",
    tags: ["접근성", "WCAG", "웹표준", "사용성"],
    readTime: "12분"
  },
  {
    id: 11,
    title: "Node.js 성능 최적화 기법",
    content: "Node.js 애플리케이션의 성능을 향상시키는 다양한 기법들을 소개합니다. 메모리 관리, 이벤트 루프 최적화, 클러스터링 등을 다룹니다.",
    author: "노드개발자",
    createdAt: "2025-05-01T09:30:00.000Z",
    published: true,
    category: "Backend",
    company: "Node Masters",
    tags: ["Node.js", "성능최적화", "메모리", "이벤트루프"],
    readTime: "20분"
  },
  {
    id: 12,
    title: "CSS Grid와 Flexbox 마스터하기",
    content: "CSS Grid와 Flexbox의 차이점과 각각의 활용법을 실제 레이아웃 예제와 함께 설명합니다. 반응형 웹 디자인의 핵심 기술을 마스터해보세요.",
    author: "CSS마법사",
    createdAt: "2025-04-28T17:15:00.000Z",
    published: true,
    category: "Frontend",
    company: "CSS Wizards",
    tags: ["CSS", "Grid", "Flexbox", "레이아웃"],
    readTime: "15분"
  }
]

export const postService = {
  // 모든 포스트 가져오기
  async getAllPosts() {
    // 현재는 기술 블로그 데이터만 사용 (빠른 로딩을 위해)
    // 백엔드가 필요할 때 아래 주석을 해제하세요
    /*
    try {
      // 백엔드 데이터 시도 (2초 타임아웃)
      const response = await axios.get('http://localhost:8080/api/posts', {
        timeout: 2000
      })
      const backendPosts = response.data || []
      
      // 기술 블로그 데이터와 백엔드 데이터 합치기
      const allPosts = [...techBlogPosts, ...backendPosts]
      
      // 최신순으로 정렬
      return allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } catch (error) {
      console.log('백엔드 연결 실패, 기술 블로그 데이터만 반환:', error)
      // 백엔드 실패 시 기술 블로그 데이터만 반환
      return techBlogPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    */
    
    // 로컬 스토리지의 커스텀 포스트와 기술 블로그 데이터 합치기
    const customPosts = this.loadCustomPosts()
    const allPosts = [...customPosts, ...techBlogPosts]
    
    // 중복 제거 (ID 기준)
    const uniquePosts = allPosts.filter((post, index, self) => 
      index === self.findIndex(p => p.id === post.id)
    )
    
    return uniquePosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  // 최신 포스트 가져오기 (개수 제한)
  async getRecentPosts(limit = 3) {
    const allPosts = await this.getAllPosts()
    return allPosts.slice(0, limit)
  },

  // 카테고리별 포스트 가져오기
  async getPostsByCategory(category) {
    const allPosts = await this.getAllPosts()
    return allPosts.filter(post => post.category === category)
  },

  // 포스트 생성
  async createPost(postData) {
    try {
      // 로컬 스토리지에 저장
      const existingPosts = JSON.parse(localStorage.getItem('customPosts') || '[]')
              const newPost = {
          ...postData,
          id: Date.now(),
          createdAt: new Date().toISOString()
        }
      existingPosts.push(newPost)
      localStorage.setItem('customPosts', JSON.stringify(existingPosts))
      
      // 기술 블로그 데이터에도 추가 (메모리에서만)
      techBlogPosts.unshift(newPost)
      
      return newPost
    } catch (error) {
      console.error('포스트 생성 실패:', error)
      throw error
    }
  },

  // 포스트 수정
  async updatePost(postData) {
    try {
      // 로컬 스토리지에서 수정
      const existingPosts = JSON.parse(localStorage.getItem('customPosts') || '[]')
      const index = existingPosts.findIndex(post => post.id === postData.id)
      
      if (index !== -1) {
        existingPosts[index] = { ...postData }
        localStorage.setItem('customPosts', JSON.stringify(existingPosts))
      }
      
      // 기술 블로그 데이터에서도 수정
      const techIndex = techBlogPosts.findIndex(post => post.id === postData.id)
      if (techIndex !== -1) {
        techBlogPosts[techIndex] = { ...postData }
      }
      
      return postData
    } catch (error) {
      console.error('포스트 수정 실패:', error)
      throw error
    }
  },

  // 포스트 삭제
  async deletePost(id) {
    try {
      // 로컬 스토리지에서 삭제
      const existingPosts = JSON.parse(localStorage.getItem('customPosts') || '[]')
      const filteredPosts = existingPosts.filter(post => post.id !== id)
      localStorage.setItem('customPosts', JSON.stringify(filteredPosts))
      
      // 기술 블로그 데이터에서도 삭제
      const techIndex = techBlogPosts.findIndex(post => post.id === id)
      if (techIndex !== -1) {
        techBlogPosts.splice(techIndex, 1)
      }
      
      return true
    } catch (error) {
      console.error('포스트 삭제 실패:', error)
      throw error
    }
  },

  // 로컬 스토리지에서 커스텀 포스트 로드
  loadCustomPosts() {
    try {
      const customPosts = JSON.parse(localStorage.getItem('customPosts') || '[]')
      return customPosts
    } catch (error) {
      console.error('커스텀 포스트 로드 실패:', error)
      return []
    }
  }
} 