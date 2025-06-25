<template>
  <div class="about">
    <!-- 히어로 섹션 -->
    <section class="about-hero">
      <div class="container">
        <div class="hero-content">
          <h1>{{ aboutData.title || '송파모임 소개' }}</h1>
          <p>{{ aboutData.description || '송파에서 IT 하는 사람들을 위해 시작한 기술 및 IT 정보를 보다 쉽고 빠르게 접하게 하기 위해서 만든 블로그입니다.' }}</p>
        </div>
      </div>
    </section>

    <!-- 메인 콘텐츠 -->
    <section class="about-content">
      <div class="container">
        <!-- 소개 섹션 -->
        <div v-if="aboutData.intro && aboutData.intro.title" class="about-section">
          <h2>{{ aboutData.intro.title }}</h2>
          <p>{{ aboutData.intro.content }}</p>
        </div>

        <!-- 주요 기능 섹션 -->
        <div class="about-section">
          <h2>주요 기능</h2>
          <div class="features-grid">
            <div 
              v-for="(feature, index) in aboutData.features" 
              :key="index" 
              class="feature-card"
            >
              <div class="feature-icon">{{ feature.icon }}</div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>

        <!-- 운영진 섹션 -->
        <div class="about-section">
          <h2>운영진</h2>
          <div class="team-grid">
            <div 
              v-for="(member, index) in aboutData.team" 
              :key="index" 
              class="team-card"
            >
              <div class="team-avatar">{{ member.avatar }}</div>
              <h3>{{ member.name }}</h3>
              <p class="team-role">{{ member.role }}</p>
              <a 
                v-if="member.link" 
                :href="member.link" 
                class="team-link" 
                target="_blank"
              >
                링크
              </a>
            </div>
          </div>
        </div>

        <!-- 연락처 섹션 -->
        <div class="about-section">
          <h2>연락처</h2>
          <div class="contact-card">
            <p>{{ aboutData.contact.description || '궁금한 점이나 제안사항이 있으시면 언제든지 연락해 주세요!' }}</p>
            <div class="contact-info">
              <div 
                v-for="(contact, index) in aboutData.contact.items" 
                :key="index" 
                class="contact-item"
              >
                <span class="contact-icon">{{ contact.icon }}</span>
                <a 
                  v-if="contact.value.startsWith('http')" 
                  :href="contact.value" 
                  target="_blank"
                >
                  {{ contact.label }}
                </a>
                <a 
                  v-else-if="contact.value.includes('@')" 
                  :href="'mailto:' + contact.value"
                >
                  {{ contact.value }}
                </a>
                <a 
                  v-else-if="contact.value.startsWith('010') || contact.value.startsWith('01')" 
                  :href="'tel:' + contact.value.replace(/-/g, '')"
                >
                  {{ contact.value }}
                </a>
                <span v-else>{{ contact.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
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
  mounted() {
    this.loadAboutData()
  },
  methods: {
    loadAboutData() {
      try {
        const savedAbout = localStorage.getItem('aboutData')
        if (savedAbout) {
          this.aboutData = JSON.parse(savedAbout)
        } else {
          // 기본 데이터 설정
          this.setDefaultData()
        }
      } catch (error) {
        console.error('About 데이터 로딩 실패:', error)
        this.setDefaultData()
      }
    },
    
    setDefaultData() {
      this.aboutData = {
        title: '송파모임 소개',
        description: '송파에서 IT 하는 사람들을 위해 시작한 기술 및 IT 정보를 보다 쉽고 빠르게 접하게 하기 위해서 만든 블로그입니다.',
        intro: {
          title: '우리는 누구인가요?',
          content: '송파 개발자 모임은 송파구를 중심으로 활동하는 개발자들의 커뮤니티입니다.'
        },
        features: [
          {
            icon: '🏢',
            title: '송파 IT 커뮤니티',
            description: '송파에서 IT 하는 사람들을 위해 만든 블로그'
          },
          {
            icon: '📚',
            title: '기술 정보 공유',
            description: '국내외 기술 블로그 정보 공유'
          },
          {
            icon: '💡',
            title: '사이드 프로젝트',
            description: '비영리단체를 위한 사이드프로젝트'
          },
          {
            icon: '🤝',
            title: '스터디 모임',
            description: '하고싶은 공부 내용 공유 및 모임 주최'
          }
        ],
        team: [
          {
            avatar: '👨‍💼',
            name: '오성우',
            role: '전략기획',
            link: 'https://www.linkedin.com/in/seongwoo-oh-4b1b1b1b1b/'
          },
          {
            avatar: '👩‍💼',
            name: '김훈기',
            role: '영업',
            link: ''
          },
          {
            avatar: '👨‍💻',
            name: '김누리',
            role: 'Backend',
            link: ''
          },
          {
            avatar: '👨‍💻',
            name: '강성빈',
            role: 'WEB',
            link: ''
          },
          {
            avatar: '👨‍💻',
            name: '엄인국',
            role: 'Backend',
            link: ''
          },
          {
            avatar: '👩‍💼',
            name: '김하늘',
            role: 'PM',
            link: ''
          }
        ],
        contact: {
          description: '궁금한 점이나 제안사항이 있으시면 언제든지 연락해 주세요!',
          items: [
            {
              icon: '📧',
              label: '이메일',
              value: 'eum714211@gmail.com'
            },
            {
              icon: '📞',
              label: '전화',
              value: '010-6675-0758'
            }
          ]
        }
      }
    }
  }
}
</script>

<style scoped>
/* About 페이지 스타일은 전역 CSS에서 관리됩니다 */
</style> 