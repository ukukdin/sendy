<template>
  <div class="posts-page">
    <!-- 페이지 헤더 -->
    <section class="page-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">모든 포스트</h1>
          <p class="page-subtitle">개발자를 위한 다양한 기술 콘텐츠를 만나보세요</p>
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
              placeholder="포스트 제목이나 내용으로 검색..."
              class="search-input"
            />
            <button class="search-button">🔍</button>
          </div>
          <div class="filter-options">
            <select v-model="sortBy" @change="sortPosts" class="sort-select">
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="title">제목순</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- 포스트 목록 -->
    <section class="posts-section">
      <div class="container">
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>포스트를 불러오는 중...</p>
        </div>
        
        <div v-else-if="error" class="error">
          <div class="error-icon">⚠️</div>
          <h3>오류가 발생했습니다</h3>
          <p>{{ error }}</p>
          <button @click="fetchPosts" class="retry-button">다시 시도</button>
        </div>
        
        <div v-else>
          <div v-if="filteredPosts.length === 0" class="no-results">
            <div class="no-results-icon">📝</div>
            <h3>포스트가 없습니다</h3>
            <p v-if="searchQuery">검색 조건에 맞는 포스트를 찾을 수 없습니다.</p>
            <p v-else>아직 작성된 포스트가 없습니다.</p>
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
                  {{ post.category || 'Tech' }}
                </div>
                <div class="post-company" v-if="post.company">
                  {{ post.company }}
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
            총 {{ filteredPosts.length }}개의 포스트 중 {{ (currentPage - 1) * postsPerPage + 1 }}-{{ Math.min(currentPage * postsPerPage, filteredPosts.length) }}개 표시
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { postService } from '@/services/postService'

export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
      filteredPosts: [],
      loading: true,
      error: null,
      searchQuery: '',
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
  async mounted() {
    // 즉시 로딩 시작
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      try {
        this.loading = true
        this.error = null
        
        // 공통 서비스에서 모든 포스트 가져오기
        this.posts = await postService.getAllPosts()
        this.filteredPosts = [...this.posts]
        this.sortPosts()
      } catch (error) {
        console.error('포스트 로딩 실패:', error)
        this.error = '포스트를 불러오는데 실패했습니다.'
      } finally {
        this.loading = false
      }
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
      this.currentPage = 1 // 검색 시 첫 페이지로 이동
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
        // 외부 URL이 있으면 새 탭에서 열기
        window.open(post.url, '_blank')
      } else {
        // 내부 포스트 상세 페이지로 이동
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
      // 한국어 이름의 경우 첫 글자, 영어 이름의 경우 첫 글자들
      if (author.includes(',')) {
        return author.split(',')[0].charAt(0).toUpperCase()
      }
      return author.charAt(0).toUpperCase()
    },
    getCategoryClass(category) {
      const categoryMap = {
        'Frontend': 'category-frontend',
        'AI/ML': 'category-ai',
        'Performance': 'category-performance',
        'Vue.js': 'category-vue',
        'Architecture': 'category-architecture',
        'TypeScript': 'category-typescript',
        'DevOps': 'category-devops',
        'Backend': 'category-backend',
        'Tech': 'category-tech'
      }
      return categoryMap[category] || 'category-default'
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        // 페이지 변경 시 스크롤을 맨 위로
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
/* Posts 페이지 스타일은 전역 CSS에서 관리됩니다 */
</style> 