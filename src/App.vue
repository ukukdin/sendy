<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<template>
  <div id="app">
    <!-- 고정 헤더 -->
    <Header />

    <!-- 메인 콘텐츠 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 하단 푸터 -->
    <Footer />
  </div>
</template>

<!-- 모든 스타일은 global.css에서 관리 -->
