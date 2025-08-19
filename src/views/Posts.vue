<template>
  <div class="posts-page">
    <!-- 페이지 헤더 -->
    <section class="page-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">금융 뉴스</h1>
          <p class="page-subtitle">핀테크, 뱅킹, 투자 관련 최신 뉴스와 분석을 만나보세요</p>
        </div>
      </div>
    </section>

    <!-- 검색 및 필터 -->
    <section class="search-section">
      <div class="container">
        <div class="search-bar">
          <div class="search-input-wrapper">
            <input
              v-model="searchQuery"
              @input="searchPosts"
              type="text"
              placeholder="뉴스 제목이나 내용으로 검색..."
              class="search-input"
            />
            <button class="search-button">🔍</button>
          </div>
          <div class="filter-options">
            <select v-model="selectedCategory" @change="filterByCategory" class="category-select">
              <option value="">전체 카테고리</option>
              <option value="핀테크">핀테크</option>
              <option value="뱅킹">뱅킹</option>
              <option value="투자">투자</option>
              <option value="암호화폐">암호화폐</option>
              <option value="정책">정책</option>
            </select>
            <select v-model="sortBy" @change="sortPosts" class="sort-select">
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="title">제목순</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- 뉴스 목록 -->
    <section class="posts-section">
      <div class="container">
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>뉴스를 불러오는 중...</p>
        </div>
        
        <div v-else-if="error" class="error">
          <div class="error-icon">⚠️</div>
          <h3>오류가 발생했습니다</h3>
          <p>{{ error }}</p>
          <button @click="fetchPosts" class="retry-button">다시 시도</button>
        </div>
        
        <div v-else>
          <div v-if="filteredPosts.length === 0" class="no-results">
            <div class="no-results-icon">📰</div>
            <h3>뉴스가 없습니다</h3>
            <p v-if="searchQuery">검색 조건에 맞는 뉴스를 찾을 수 없습니다.</p>
            <p v-else>아직 등록된 뉴스가 없습니다.</p>
          </div>
          
          <div v-else class="posts-grid">
            <article 
              v-for="post in paginatedPosts" 
              :key="post.id" 
              class="post-card"
              @click="goToPost(post)"
            >
              <div class="post-header">
                <div class="post-category" :class="getCategoryClass(post.category)">
                  {{ post.category || '금융' }}
                </div>
                <div class="post-source" v-if="post.source">
                  {{ post.source }}
                </div>
              </div>
              
              <div class="post-content">
                <h2 class="post-title">{{ post.title }}</h2>
                <p class="post-excerpt">{{ getExcerpt(post.content) }}</p>
                
                <div class="post-tags" v-if="post.tags && post.tags.length">
                  <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag">
                    {{ tag }}
                  </span>
                </div>
                
                <div class="post-meta">
                  <div class="author-info">
                    <div class="author-avatar">{{ getAuthorInitial(post.author) }}</div>
                    <div class="author-details">
                      <span class="author-name">{{ post.author }}</span>
                      <span class="post-date">{{ formatDate(post.createdAt) }}</span>
                    </div>
                  </div>
                  
                  <div class="post-stats">
                    <span class="read-time" v-if="post.readTime">📖 {{ post.readTime }}</span>
                    <div class="post-actions">
                      <button class="action-button" title="좋아요">👍</button>
                      <button class="action-button" title="북마크">🔖</button>
                      <button class="action-button" title="공유">📤</button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          
          <!-- 페이지네이션 -->
          <div v-if="totalPages > 1" class="pagination">
            <button 
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="pagination-btn pagination-prev"
            >
              ← 이전
            </button>
            
            <button 
              v-if="pageNumbers[0] > 1"
              @click="goToPage(1)"
              class="pagination-btn"
            >
              1
            </button>
            
            <span v-if="pageNumbers[0] > 2" class="pagination-dots">...</span>
            
            <button 
              v-for="page in pageNumbers"
              :key="page"
              @click="goToPage(page)"
              :class="['pagination-btn', { active: page === currentPage }]"
            >
              {{ page }}
            </button>
            
            <span v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1" class="pagination-dots">...</span>
            
            <button 
              v-if="pageNumbers[pageNumbers.length - 1] < totalPages"
              @click="goToPage(totalPages)"
              class="pagination-btn"
            >
              {{ totalPages }}
            </button>
            
            <button 
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="pagination-btn pagination-next"
            >
              다음 →
            </button>
          </div>
          
          <!-- 페이지 정보 -->
          <div v-if="filteredPosts.length > 0" class="page-info">
            총 {{ filteredPosts.length }}개의 뉴스 중 {{ (currentPage - 1) * postsPerPage + 1 }}-{{ Math.min(currentPage * postsPerPage, filteredPosts.length) }}개 표시
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
      filteredPosts: [],
      loading: true,
      error: null,
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'latest',
      currentPage: 1,
      postsPerPage: 10
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.postsPerPage)
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage
      const end = start + this.postsPerPage
      return this.filteredPosts.slice(start, end)
    },
    pageNumbers() {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2))
      let end = Math.min(this.totalPages, start + maxVisible - 1)
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  mounted() {
    this.loadSampleNews()
  },
  methods: {
    loadSampleNews() {
      this.loading = true
      
      // 샘플 금융 뉴스 데이터
      setTimeout(() => {
        this.posts = [
          {
            id: 1,
            title: '핀테크 스타트업 투자 열풍, 올해 상반기 투자액 2조원 돌파',
            content: '국내 핀테크 스타트업에 대한 투자가 활발해지고 있다. 한국벤처투자협회에 따르면 올해 상반기 핀테크 분야 투자액이 2조원을 돌파했다. 특히 송금, 결제, 대출 분야에서 혁신적인 서비스를 제공하는 스타트업들이 주목받고 있다.',
            category: '핀테크',
            source: '한국경제',
            author: '김재영',
            createdAt: '2024-01-15T10:30:00',
            readTime: '3분',
            tags: ['핀테크', '투자', '스타트업'],
            url: 'https://example.com/news1'
          },
          {
            id: 2,
            title: '디지털 뱅킹 이용률 80% 돌파, MZ세대 중심으로 확산',
            content: '금융감독원이 발표한 자료에 따르면 디지털 뱅킹 이용률이 80%를 돌파했다. 특히 20-30대 MZ세대를 중심으로 모바일 뱅킹 이용이 급증하고 있으며, 은행권도 디지털 전환을 가속화하고 있다.',
            category: '뱅킹',
            source: '매일경제',
            author: '이미영',
            createdAt: '2024-01-14T14:20:00',
            readTime: '2분',
            tags: ['디지털뱅킹', 'MZ세대', '모바일뱅킹'],
            url: 'https://example.com/news2'
          },
          {
            id: 3,
            title: '암호화폐 시장 회복세, 비트코인 5만 달러 돌파',
            content: '암호화폐 시장이 회복세를 보이고 있다. 비트코인이 5만 달러를 돌파했으며, 이더리움도 상승세를 이어가고 있다. 전문가들은 기관투자자들의 유입과 규제 완화 기대감이 시장을 밀어올리고 있다고 분석한다.',
            category: '암호화폐',
            source: '블록미디어',
            author: '박성민',
            createdAt: '2024-01-13T09:15:00',
            readTime: '4분',
            tags: ['암호화폐', '비트코인', '투자'],
            url: 'https://example.com/news3'
          },
          {
            id: 4,
            title: '정부, 핀테크 규제 샌드박스 확대 추진',
            content: '정부가 핀테크 규제 샌드박스를 확대 추진한다고 발표했다. 기존 3개 분야에서 7개 분야로 확대하며, 특히 AI 금융, 블록체인 기반 서비스에 대한 규제 완화를 검토하고 있다.',
            category: '정책',
            source: '연합뉴스',
            author: '최동욱',
            createdAt: '2024-01-12T16:45:00',
            readTime: '3분',
            tags: ['규제', '핀테크', '정책'],
            url: 'https://example.com/news4'
          },
          {
            id: 5,
            title: '투자자들, ESG 투자 확대... 친환경 금융 상품 인기',
            content: 'ESG(환경, 사회, 지배구조) 투자가 확대되고 있다. 국내 주요 자산운용사들이 ESG 상품을 잇따라 출시하고 있으며, 특히 친환경 프로젝트에 대한 투자가 활발해지고 있다.',
            category: '투자',
            source: '한국투자신문',
            author: '정수진',
            createdAt: '2024-01-11T11:30:00',
            readTime: '5분',
            tags: ['ESG', '투자', '친환경'],
            url: 'https://example.com/news5'
          },
          {
            id: 6,
            title: '원화 디지털화폐(CBDC) 시범사업 시작',
            content: '한국은행이 원화 디지털화폐(CBDC) 시범사업을 시작한다고 발표했다. 올해 하반기부터 은행권과 함께 시범 운영을 시작하며, 2025년부터 본격적인 도입을 검토하고 있다.',
            category: '뱅킹',
            source: '한국은행',
            author: '김태형',
            createdAt: '2024-01-10T13:20:00',
            readTime: '4분',
            tags: ['CBDC', '디지털화폐', '한국은행'],
            url: 'https://example.com/news6'
          }
        ]
        
        this.filteredPosts = [...this.posts]
        this.sortPosts()
        this.loading = false
      }, 1000)
    },
    
    searchPosts() {
      if (!this.searchQuery.trim()) {
        this.filteredPosts = [...this.posts]
      } else {
        const query = this.searchQuery.toLowerCase()
        this.filteredPosts = this.posts.filter(post =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
        )
      }
      this.currentPage = 1
      this.sortPosts()
    },
    
    filterByCategory() {
      if (!this.selectedCategory) {
        this.filteredPosts = [...this.posts]
      } else {
        this.filteredPosts = this.posts.filter(post => 
          post.category === this.selectedCategory
        )
      }
      this.currentPage = 1
      this.sortPosts()
    },
    
    sortPosts() {
      switch (this.sortBy) {
        case 'latest':
          this.filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        case 'oldest':
          this.filteredPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          break
        case 'title':
          this.filteredPosts.sort((a, b) => a.title.localeCompare(b.title))
          break
      }
    },
    
    goToPost(post) {
      if (post.url) {
        window.open(post.url, '_blank')
      } else {
        this.$router.push(`/posts/${post.id}`)
      }
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    getExcerpt(content) {
      return content.length > 150 ? content.substring(0, 150) + '...' : content
    },
    
    getAuthorInitial(author) {
      if (!author) return 'A'
      if (author.includes(',')) {
        return author.split(',')[0].charAt(0).toUpperCase()
      }
      return author.charAt(0).toUpperCase()
    },
    
    getCategoryClass(category) {
      const categoryMap = {
        '핀테크': 'category-fintech',
        '뱅킹': 'category-banking',
        '투자': 'category-investment',
        '암호화폐': 'category-crypto',
        '정책': 'category-policy'
      }
      return categoryMap[category] || 'category-default'
    },
    
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
/* Posts 페이지 스타일은 전역 CSS에서 관리됩니다 */
</style> 