<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <p>&copy; 2024 TechBlog. All rights reserved.</p>
      </div>
      <div class="footer-right">
        <router-link to="/" class="footer-link">홈</router-link>
        <router-link to="/posts" class="footer-link">포스트</router-link>
        <router-link to="/about" class="footer-link">소개</router-link>
        <a href="#" class="footer-link">개인정보처리방침</a>
        <a href="#" class="footer-link">이용약관</a>
        <a href="#" class="footer-link">고객센터</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- 모든 스타일은 global.css에서 관리 --> 