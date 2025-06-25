<template>
  <div class="post-detail">
    <div class="container">
      <div v-if="loading" class="loading">
        포스트를 불러오는 중...
      </div>
      
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      
      <article v-else class="post">
        <header class="post-header">
          <h1 class="post-title">{{ post.title }}</h1>
          <div class="post-meta">
            <span class="post-author">작성자: {{ post.author }}</span>
            <span class="post-date">{{ formatDate(post.createdAt) }}</span>
          </div>
        </header>
        
        <div class="post-content">
          <p>{{ post.content }}</p>
        </div>
        
        <footer class="post-footer">
          <button @click="goBack" class="back-button">
            ← 목록으로 돌아가기
          </button>
        </footer>
      </article>
    </div>
  </div>
</template>

<script>
import { postService } from '@/services/postService'

export default {
  name: 'PostDetail',
  props: ['id'],
  data() {
    return {
      post: null,
      loading: true,
      error: null
    }
  },
  async mounted() {
    await this.fetchPost()
  },
  methods: {
    async fetchPost() {
      try {
        this.loading = true
        this.post = await postService.getPostById(this.id)
        this.error = null
      } catch (error) {
        console.error('포스트 로딩 실패:', error)
        this.error = '포스트를 불러오는데 실패했습니다.'
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.post-detail {
  /* 메인 콘텐츠 영역에서 관리 */
}

.post {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  padding: 4rem;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
}

.post-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.post-title {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  line-height: 1.3;
  font-weight: 700;
}

.post-meta {
  display: flex;
  gap: 2rem;
  color: #666;
  font-size: 0.95rem;
}

.post-author {
  font-weight: 600;
  color: #3498db;
}

.post-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 3rem;
}

.post-content p {
  margin-bottom: 1.5rem;
}

.post-footer {
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.back-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.back-button:hover {
  background: #2980b9;
  transform: translateY(-1px);
}

.loading, .error {
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: #666;
}

.error {
  color: #e74c3c;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .post {
    padding: 2rem;
    margin: 0 1rem;
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .post-content {
    font-size: 1rem;
  }
}
</style> 