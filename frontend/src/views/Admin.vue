<template>
  <div class="admin-page">
    <!-- 어드민 헤더 -->
    <section class="admin-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">관리자 페이지</h1>
          <p class="page-subtitle">기술 블로그 포스트를 작성하고 관리하세요</p>
        </div>
      </div>
    </section>

    <!-- 탭 네비게이션 -->
    <section class="admin-tabs">
      <div class="container">
        <div class="tab-buttons">
          <button 
            @click="activeTab = 'create'"
            :class="['tab-button', { active: activeTab === 'create' }]"
          >
            포스트 작성
          </button>
          <button 
            @click="activeTab = 'manage'"
            :class="['tab-button', { active: activeTab === 'manage' }]"
          >
            포스트 관리
          </button>
          <button 
            @click="activeTab = 'about'"
            :class="['tab-button', { active: activeTab === 'about' }]"
          >
            About 관리
          </button>
        </div>
      </div>
    </section>

    <!-- 포스트 작성 탭 -->
    <section v-if="activeTab === 'create'" class="create-post">
      <div class="container">
        <div class="form-container">
          <h2>새 포스트 작성</h2>
          
          <form @submit.prevent="createPost" class="post-form">
            <div class="form-row">
              <div class="form-group">
                <label for="title">제목 *</label>
                <input
                  id="title"
                  v-model="newPost.title"
                  type="text"
                  placeholder="포스트 제목을 입력하세요"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="author">작성자 *</label>
                <input
                  id="author"
                  v-model="newPost.author"
                  type="text"
                  placeholder="작성자 이름을 입력하세요"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="category">카테고리 *</label>
                <select id="category" v-model="newPost.category" required>
                  <option value="">카테고리 선택</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Performance">Performance</option>
                  <option value="Vue.js">Vue.js</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Tech">Tech</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="company">회사명</label>
                <input
                  id="company"
                  v-model="newPost.company"
                  type="text"
                  placeholder="회사명을 입력하세요"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="tags">태그</label>
              <input
                id="tags"
                v-model="tagsInput"
                type="text"
                placeholder="태그를 쉼표로 구분하여 입력하세요 (예: React, JavaScript, 프론트엔드)"
              />
              <small>쉼표(,)로 구분하여 여러 태그를 입력할 수 있습니다</small>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="readTime">읽기 시간</label>
                <input
                  id="readTime"
                  v-model="newPost.readTime"
                  type="text"
                  placeholder="예: 10분"
                />
              </div>
              
              <div class="form-group">
                <label for="url">포스트 URL</label>
                <input
                  id="url"
                  v-model="newPost.url"
                  type="url"
                  placeholder="https://example.com/post"
                />
                <small>외부 링크가 있는 경우 입력하세요</small>
              </div>
            </div>

            <div class="form-group">
              <label for="content">내용 *</label>
              <textarea
                id="content"
                v-model="newPost.content"
                placeholder="포스트 내용을 입력하세요"
                rows="15"
                required
              ></textarea>
            </div>

            <div class="form-actions">
              <button type="button" @click="resetForm" class="btn btn-secondary">
                초기화
              </button>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                {{ isSubmitting ? '저장 중...' : '포스트 저장' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- 포스트 관리 탭 -->
    <section v-if="activeTab === 'manage'" class="manage-posts">
      <div class="container">
        <div class="manage-header">
          <h2>포스트 관리</h2>
          <div class="manage-stats">
            <span class="stat">총 {{ posts.length }}개의 포스트</span>
          </div>
        </div>

        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>포스트를 불러오는 중...</p>
        </div>

        <div v-else class="posts-table">
          <table>
            <thead>
              <tr>
                <th>제목</th>
                <th>작성자</th>
                <th>카테고리</th>
                <th>작성일</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in posts" :key="post.id">
                <td class="post-title-cell">
                  <div class="post-title">{{ post.title }}</div>
                  <div class="post-excerpt">{{ getExcerpt(post.content) }}</div>
                </td>
                <td>{{ post.author }}</td>
                <td>
                  <span class="category-badge" :class="getCategoryClass(post.category)">
                    {{ post.category }}
                  </span>
                </td>
                <td>{{ formatDate(post.createdAt) }}</td>
                <td class="actions">
                  <button @click="editPost(post)" class="btn-edit" title="수정">
                    ✏️
                  </button>
                  <button @click="deletePost(post.id)" class="btn-delete" title="삭제">
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- About 관리 탭 -->
    <section v-if="activeTab === 'about'" class="manage-about">
      <div class="container">
        <div class="form-container">
          <h2>About 페이지 관리</h2>
          
          <form @submit.prevent="updateAbout" class="about-form">
            <!-- 기본 정보 -->
            <div class="form-section">
              <h3>기본 정보</h3>
              <div class="form-group">
                <label for="about-title">페이지 제목</label>
                <input
                  id="about-title"
                  v-model="aboutData.title"
                  type="text"
                  placeholder="About 페이지 제목"
                />
              </div>
              
              <div class="form-group">
                <label for="about-description">페이지 설명</label>
                <textarea
                  id="about-description"
                  v-model="aboutData.description"
                  placeholder="About 페이지 설명"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <!-- 소개 섹션 -->
            <div class="form-section">
              <h3>소개 섹션</h3>
              <div class="form-group">
                <label for="intro-title">소개 제목</label>
                <input
                  id="intro-title"
                  v-model="aboutData.intro.title"
                  type="text"
                  placeholder="소개 섹션 제목"
                />
              </div>
              
              <div class="form-group">
                <label for="intro-content">소개 내용</label>
                <textarea
                  id="intro-content"
                  v-model="aboutData.intro.content"
                  placeholder="소개 섹션 내용"
                  rows="5"
                ></textarea>
              </div>
            </div>

            <!-- 기능 섹션 -->
            <div class="form-section">
              <h3>주요 기능</h3>
              <div v-for="(feature, index) in aboutData.features" :key="index" class="feature-item">
                <div class="form-row">
                  <div class="form-group">
                    <label>아이콘</label>
                    <input
                      v-model="feature.icon"
                      type="text"
                      placeholder="이모지 아이콘"
                    />
                  </div>
                  <div class="form-group">
                    <label>제목</label>
                    <input
                      v-model="feature.title"
                      type="text"
                      placeholder="기능 제목"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label>설명</label>
                  <textarea
                    v-model="feature.description"
                    placeholder="기능 설명"
                    rows="2"
                  ></textarea>
                </div>
                <button type="button" @click="removeFeature(index)" class="btn-remove">
                  삭제
                </button>
              </div>
              <button type="button" @click="addFeature" class="btn btn-secondary">
                기능 추가
              </button>
            </div>

            <!-- 운영진 섹션 -->
            <div class="form-section">
              <h3>운영진</h3>
              <div v-for="(member, index) in aboutData.team" :key="index" class="team-item">
                <div class="form-row">
                  <div class="form-group">
                    <label>아바타</label>
                    <input
                      v-model="member.avatar"
                      type="text"
                      placeholder="이모지 아바타"
                    />
                  </div>
                  <div class="form-group">
                    <label>이름</label>
                    <input
                      v-model="member.name"
                      type="text"
                      placeholder="이름"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>역할</label>
                    <input
                      v-model="member.role"
                      type="text"
                      placeholder="역할"
                    />
                  </div>
                  <div class="form-group">
                    <label>링크</label>
                    <input
                      v-model="member.link"
                      type="url"
                      placeholder="개인 링크 (선택)"
                    />
                  </div>
                </div>
                <button type="button" @click="removeMember(index)" class="btn-remove">
                  삭제
                </button>
              </div>
              <button type="button" @click="addMember" class="btn btn-secondary">
                운영진 추가
              </button>
            </div>

            <!-- 연락처 섹션 -->
            <div class="form-section">
              <h3>연락처 정보</h3>
              <div class="form-group">
                <label for="contact-description">연락처 설명</label>
                <textarea
                  id="contact-description"
                  v-model="aboutData.contact.description"
                  placeholder="연락처 섹션 설명"
                  rows="2"
                ></textarea>
              </div>
              
              <div v-for="(contact, index) in aboutData.contact.items" :key="index" class="contact-item">
                <div class="form-row">
                  <div class="form-group">
                    <label>아이콘</label>
                    <input
                      v-model="contact.icon"
                      type="text"
                      placeholder="연락처 아이콘"
                    />
                  </div>
                  <div class="form-group">
                    <label>라벨</label>
                    <input
                      v-model="contact.label"
                      type="text"
                      placeholder="연락처 라벨"
                    />
                  </div>
                  <div class="form-group">
                    <label>값/링크</label>
                    <input
                      v-model="contact.value"
                      type="text"
                      placeholder="연락처 정보"
                    />
                  </div>
                </div>
                <button type="button" @click="removeContact(index)" class="btn-remove">
                  삭제
                </button>
              </div>
              <button type="button" @click="addContact" class="btn btn-secondary">
                연락처 추가
              </button>
            </div>

            <div class="form-actions">
              <button type="button" @click="resetAbout" class="btn btn-secondary">
                초기화
              </button>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                {{ isSubmitting ? '저장 중...' : 'About 페이지 저장' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- 수정 모달 -->
    <div v-if="editingPost" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>포스트 수정</h3>
          <button @click="closeEditModal" class="modal-close">×</button>
        </div>
        
        <form @submit.prevent="updatePost" class="post-form">
          <div class="form-row">
            <div class="form-group">
              <label for="edit-title">제목 *</label>
              <input
                id="edit-title"
                v-model="editingPost.title"
                type="text"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="edit-author">작성자 *</label>
              <input
                id="edit-author"
                v-model="editingPost.author"
                type="text"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="edit-category">카테고리 *</label>
              <select id="edit-category" v-model="editingPost.category" required>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="AI/ML">AI/ML</option>
                <option value="DevOps">DevOps</option>
                <option value="Architecture">Architecture</option>
                <option value="Performance">Performance</option>
                <option value="Vue.js">Vue.js</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Tech">Tech</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="edit-company">회사명</label>
              <input
                id="edit-company"
                v-model="editingPost.company"
                type="text"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="edit-tags">태그</label>
            <input
              id="edit-tags"
              v-model="editTagsInput"
              type="text"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="edit-readTime">읽기 시간</label>
              <input
                id="edit-readTime"
                v-model="editingPost.readTime"
                type="text"
              />
            </div>
            
            <div class="form-group">
              <label for="edit-url">포스트 URL</label>
              <input
                id="edit-url"
                v-model="editingPost.url"
                type="url"
                placeholder="https://example.com/post"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="edit-content">내용 *</label>
            <textarea
              id="edit-content"
              v-model="editingPost.content"
              rows="10"
              required
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeEditModal" class="btn btn-secondary">
              취소
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? '수정 중...' : '수정 완료' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 성공/에러 메시지 -->
    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { postService } from '@/services/postService'

export default {
  name: 'Admin',
  data() {
    return {
      activeTab: 'create',
      loading: false,
      isSubmitting: false,
      message: '',
      messageType: 'success',
      posts: [],
      editingPost: null,
      editTagsInput: '',
      tagsInput: '',
      newPost: {
        title: '',
        content: '',
        author: '',
        category: '',
        company: '',
        readTime: '',
        url: '',
        published: true
      },
      aboutData: {
        title: '',
        description: '',
        intro: {
          title: '',
          content: ''
        },
        features: [],
        team: [],
        contact: {
          description: '',
          items: []
        }
      }
    }
  },
  async mounted() {
    await this.loadPosts()
    await this.loadAbout()
  },
  methods: {
    async loadPosts() {
      try {
        this.loading = true
        this.posts = await postService.getAllPosts()
      } catch (error) {
        console.error('포스트 로딩 실패:', error)
        this.showMessage('포스트를 불러오는데 실패했습니다.', 'error')
      } finally {
        this.loading = false
      }
    },
    
    async createPost() {
      try {
        this.isSubmitting = true
        
        // 태그 처리
        const tags = this.tagsInput
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0)
        
        const postData = {
          ...this.newPost,
          tags,
          createdAt: new Date().toISOString(),
          id: Date.now() // 임시 ID
        }
        
        await postService.createPost(postData)
        
        this.showMessage('포스트가 성공적으로 저장되었습니다!', 'success')
        this.resetForm()
        await this.loadPosts()
        
      } catch (error) {
        console.error('포스트 저장 실패:', error)
        this.showMessage('포스트 저장에 실패했습니다.', 'error')
      } finally {
        this.isSubmitting = false
      }
    },
    
    editPost(post) {
      this.editingPost = { ...post }
      this.editTagsInput = post.tags ? post.tags.join(', ') : ''
    },
    
    async updatePost() {
      try {
        this.isSubmitting = true
        
        // 태그 처리
        const tags = this.editTagsInput
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0)
        
        const postData = {
          ...this.editingPost,
          tags
        }
        
        await postService.updatePost(postData)
        
        this.showMessage('포스트가 성공적으로 수정되었습니다!', 'success')
        this.closeEditModal()
        await this.loadPosts()
        
      } catch (error) {
        console.error('포스트 수정 실패:', error)
        this.showMessage('포스트 수정에 실패했습니다.', 'error')
      } finally {
        this.isSubmitting = false
      }
    },
    
    async deletePost(id) {
      if (!confirm('정말로 이 포스트를 삭제하시겠습니까?')) {
        return
      }
      
      try {
        await postService.deletePost(id)
        this.showMessage('포스트가 삭제되었습니다.', 'success')
        await this.loadPosts()
      } catch (error) {
        console.error('포스트 삭제 실패:', error)
        this.showMessage('포스트 삭제에 실패했습니다.', 'error')
      }
    },
    
    closeEditModal() {
      this.editingPost = null
      this.editTagsInput = ''
    },
    
    resetForm() {
      this.newPost = {
        title: '',
        content: '',
        author: '',
        category: '',
        company: '',
        readTime: '',
        url: '',
        published: true
      }
      this.tagsInput = ''
    },
    
    showMessage(text, type = 'success') {
      this.message = text
      this.messageType = type
      setTimeout(() => {
        this.message = ''
      }, 3000)
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

    // About 관련 메서드들
    async loadAbout() {
      try {
        const savedAbout = localStorage.getItem('aboutData')
        if (savedAbout) {
          this.aboutData = JSON.parse(savedAbout)
        } else {
          // 기본 데이터 설정
          this.resetAbout()
        }
      } catch (error) {
        console.error('About 데이터 로딩 실패:', error)
        this.resetAbout()
      }
    },

    async updateAbout() {
      try {
        this.isSubmitting = true
        localStorage.setItem('aboutData', JSON.stringify(this.aboutData))
        this.showMessage('About 페이지가 성공적으로 저장되었습니다!', 'success')
      } catch (error) {
        console.error('About 저장 실패:', error)
        this.showMessage('About 페이지 저장에 실패했습니다.', 'error')
      } finally {
        this.isSubmitting = false
      }
    },

    resetAbout() {
      this.aboutData = {
        title: '송파 개발자 모임 소개',
        description: '송파구 개발자들이 모여 기술을 공유하고 성장하는 커뮤니티입니다.',
        intro: {
          title: '우리는 누구인가요?',
          content: '송파 개발자 모임은 송파구를 중심으로 활동하는 개발자들의 커뮤니티입니다. 다양한 기술 스택과 경험을 가진 개발자들이 모여 지식을 공유하고, 함께 성장하며, 네트워킹을 통해 더 나은 개발 문화를 만들어가고 있습니다.'
        },
        features: [
          {
            icon: '💻',
            title: '기술 공유',
            description: '최신 기술 트렌드와 개발 경험을 공유합니다.'
          },
          {
            icon: '🤝',
            title: '네트워킹',
            description: '다양한 분야의 개발자들과 네트워킹할 수 있습니다.'
          },
          {
            icon: '📚',
            title: '스터디',
            description: '함께 공부하고 성장할 수 있는 스터디 그룹을 운영합니다.'
          },
          {
            icon: '🎯',
            title: '프로젝트',
            description: '실무 프로젝트 경험을 쌓을 수 있는 기회를 제공합니다.'
          }
        ],
        team: [
          {
            avatar: '👨‍💻',
            name: '김개발',
            role: '커뮤니티 리더',
            link: ''
          },
          {
            avatar: '👩‍💻',
            name: '이프론트',
            role: '프론트엔드 전문가',
            link: ''
          },
          {
            avatar: '👨‍💼',
            name: '박백엔드',
            role: '백엔드 전문가',
            link: ''
          }
        ],
        contact: {
          description: '궁금한 점이 있으시거나 함께하고 싶으시다면 언제든 연락주세요!',
          items: [
            {
              icon: '📧',
              label: '이메일',
              value: 'contact@songpa-dev.com'
            },
            {
              icon: '💬',
              label: '카카오톡',
              value: '@songpa-dev'
            },
            {
              icon: '🐙',
              label: 'GitHub',
              value: 'https://github.com/songpa-dev'
            }
          ]
        }
      }
    },

    // 기능 관리
    addFeature() {
      this.aboutData.features.push({
        icon: '✨',
        title: '',
        description: ''
      })
    },

    removeFeature(index) {
      this.aboutData.features.splice(index, 1)
    },

    // 운영진 관리
    addMember() {
      this.aboutData.team.push({
        avatar: '👤',
        name: '',
        role: '',
        link: ''
      })
    },

    removeMember(index) {
      this.aboutData.team.splice(index, 1)
    },

    // 연락처 관리
    addContact() {
      this.aboutData.contact.items.push({
        icon: '📞',
        label: '',
        value: ''
      })
    },

    removeContact(index) {
      this.aboutData.contact.items.splice(index, 1)
    }
  }
}
</script>

<style scoped>
/* Admin 페이지 스타일은 전역 CSS에서 관리됩니다 */
</style> 