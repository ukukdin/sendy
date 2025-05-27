<template>
  <div class="home">
    <!-- 히어로 섹션 -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">송파 개발자들 모여라!~</h1>
            <p class="hero-subtitle">
              최신 기술 트렌드부터 실무 노하우를 담은 기술블로그를 공유합니다,<br>
              개발자의 성장을 돕는 다양한 콘텐츠를 만나보세요.
            </p>
            <div class="hero-actions">
              <router-link to="/posts" class="btn btn-primary">
                포스트 둘러보기
              </router-link>
              <router-link to="/about" class="btn btn-secondary">
                블로그 소개
              </router-link>
            </div>
          </div>
          <div class="hero-image">
            <div class="hero-visual">
              <div class="code-block">
                <div class="code-header">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="code-content">
                  <div class="code-line">
                    <span class="keyword">function</span> 
                    <span class="function">createBlog</span>() {
                  </div>
                  <div class="code-line">
                    &nbsp;&nbsp;<span class="keyword">return</span> 
                    <span class="string">'Amazing Content'</span>;
                  </div>
                  <div class="code-line">}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 최신 포스트 섹션 -->
    <section class="recent-posts">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">최신 포스트</h2>
          <p class="section-subtitle">개발자들이 관심 있어 할 최신 기술 동향과 실무 팁을 확인해보세요</p>
        </div>
        
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>포스트를 불러오는 중...</p>
        </div>
        
        <div v-else-if="error" class="error">
          <p>{{ error }}</p>
        </div>
        
        <div v-else class="posts-grid">
          <article 
            v-for="post in recentPosts" 
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
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-excerpt">{{ getExcerpt(post.content) }}</p>
              
              <div class="post-tags" v-if="post.tags && post.tags.length">
                <span v-for="tag in post.tags.slice(0, 2)" :key="tag" class="tag">
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
                </div>
              </div>
            </div>
          </article>
        </div>
        
        <div v-if="!loading && recentPosts.length === 0" class="no-posts">
          <p>아직 포스트가 없습니다.</p>
        </div>

        <div class="section-footer">
          <router-link to="/posts" class="btn btn-outline">
            모든 포스트 보기
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { postService } from '@/services/postService'

export default {
  name: 'Home',
  data() {
    return {
      recentPosts: [],
      loading: true,
      error: null
    }
  },
  async mounted() {
    // 즉시 로딩 시작
    this.fetchRecentPosts()
  },
  methods: {
    async fetchRecentPosts() {
      try {
        this.loading = true
        this.error = null
        
        // 공통 서비스에서 최신 3개 포스트 가져오기
        this.recentPosts = await postService.getRecentPosts(3)
        
      } catch (error) {
        console.error('포스트 로딩 실패:', error)
        this.error = '포스트를 불러오는데 실패했습니다.'
      } finally {
        this.loading = false
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
      return content.length > 100 ? content.substring(0, 100) + '...' : content
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
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
}

/* 히어로 섹션 */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  min-height: 600px;
  display: flex;
  align-items: center;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
}

.hero-subtitle {
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.btn-primary {
  background: #ffffff;
  color: #667eea;
}

.btn-primary:hover {
  background: #f8fafc;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-outline {
  background: transparent;
  color: #667eea;
  border-color: #667eea;
}

.btn-outline:hover {
  background: #667eea;
  color: white;
}

/* 히어로 비주얼 */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.code-block {
  background: #1e293b;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  font-family: 'Monaco', 'Menlo', monospace;
  width: 100%;
  max-width: 400px;
}

.code-header {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #10b981; }

.code-content {
  font-size: 14px;
  line-height: 1.6;
}

.code-line {
  margin-bottom: 4px;
}

.keyword { color: #c084fc; }
.function { color: #60a5fa; }
.string { color: #34d399; }

/* 최신 포스트 섹션 */
.recent-posts {
  padding: 80px 0;
  background: #f8fafc;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 18px;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.post-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.post-image {
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-category {
  background: rgba(255,255,255,0.2);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.post-content {
  padding: 24px;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #64748b;
}

.post-author {
  font-weight: 600;
  color: #667eea;
}

.post-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
  line-height: 1.4;
}

.post-excerpt {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 16px;
}

.post-footer {
  display: flex;
  justify-content: flex-end;
}

.read-more {
  color: #667eea;
  font-weight: 600;
  font-size: 14px;
}

.section-footer {
  text-align: center;
}

/* 로딩 및 에러 상태 */
.loading {
  text-align: center;
  padding: 60px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 60px 0;
  color: #ef4444;
}

.no-posts {
  text-align: center;
  padding: 60px 0;
  color: #64748b;
}

/* 반응형 디자인 */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .hero-title {
    font-size: 40px;
  }
  
  .posts-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 60px 0;
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
  
  .recent-posts {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 28px;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style> 