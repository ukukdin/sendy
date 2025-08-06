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
        title: 'SENDY 소개',
        description: '사용자가 휴대폰 번호로 간편하게 송금할 수 있는 간편 송금 서비스 SENDY 개발 및 AWS 배포',
        intro: {
          title: '프로젝트 목표',
          content: '해당 프로젝트를 통해 금융 거래의 안정성과 일관성을 보장하며 분산환경에서 발생할 수 있는 데이터 불일치 문제를 해결, 금융권에서 요구하는 보안기준과 규제사항들의 이해를 통해 개발에 필요한 핵심 기술들을 경험하였습니다.'
        },
        features: [
          {
            icon: '💸',
            title: '간편 송금',
            description: '휴대폰 번호로 간편하게 송금할 수 있는 서비스'
          },
          {
            icon: '🔒',
            title: '보안 시스템',
            description: '금융권 보안기준을 준수하는 안전한 시스템'
          },
          {
            icon: '📊',
            title: '거래내역 관리',
            description: '실시간 거래내역 조회 및 관리 기능'
          },
          {
            icon: '⚡',
            title: '고성능 처리',
            description: '분산환경에서의 데이터 일관성 보장'
          }
        ],
        team: [
          {
            avatar: '👨‍💻',
            name: '김태형',
            role: 'Backend Developer',
            link: ''
          },
          {
            avatar: '👨‍💻',
            name: '엄인국',
            role: 'Backend Developer',
            link: ''
          },
          {
            avatar: '👩‍💻',
            name: '이진경',
            role: 'Frontend Developer',
            link: ''
          }
        ],
        contact: {
          description: 'SENDY 프로젝트에 대한 문의사항이 있으시면 언제든지 연락해 주세요!',
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