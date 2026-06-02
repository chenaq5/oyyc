<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h4>偶艺云承</h4>
          <p>传统木偶艺术的数字传承平台</p>
          <div class="social-links">
            <a href="#"><i class="bi bi-wechat"></i></a>
            <a href="#"><i class="bi bi-book"></i></a>
            <a href="#"><i class="bi bi-tiktok"></i></a>
          </div>
        </div>
        <div class="col-md-4">
          <h4>快速链接</h4>
          <ul class="footer-links">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/rhythm">偶之韵</router-link></li>
            <li><router-link to="/art">偶之艺</router-link></li>
            <li><router-link to="/world">偶之境</router-link></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h4>联系我们</h4>
          <ul class="footer-links">
            <li><i class="bi bi-envelope"></i> 2438354617@qq.com</li>
            <li><i class="bi bi-geo-alt"></i> 中国·福建</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 偶艺云承. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer组件逻辑
</script>

<style scoped>
/* 页脚样式 */
.footer {
  background-color: #8B6954;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 2rem;
}

.footer h4 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: white;
}

.footer p {
  color: #D4C4B0;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background-color: white;
  color: #8B6954;
  transform: translateY(-3px);
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
  color: #D4C4B0;
}

.footer-links a {
  color: #D4C4B0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: white;
}

.footer-bottom {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: #D4C4B0;
}
</style>