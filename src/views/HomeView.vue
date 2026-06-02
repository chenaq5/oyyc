<template>
  <div class="home-view">
    <header class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="animate-on-scroll">偶艺云承</h1>
            <h2 class="animate-on-scroll">传统木偶艺术的数字传承</h2>
            <p class="animate-on-scroll">探索中国木偶的千年传承，感受传统艺术的魅力，体验数字时代的创新表达</p>
            <div class="hero-buttons animate-on-scroll">
              <router-link to="/rhythm" class="btn btn-primary">
                开始探索
              </router-link>
              <router-link to="/about" class="btn btn-outline-light">
                了解更多
              </router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image animate-on-scroll">
              <div class="puppet-showcase">
                <div class="puppet-icon">
                  <i class="bi bi-palette"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="features-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <div class="feature-card animate-on-scroll">
              <div class="feature-icon">
                <i class="bi bi-music-note-beamed"></i>
              </div>
              <h3>偶之韵</h3>
              <p>探索木偶戏的韵律之美，感受传统艺术的节奏与魅力</p>
              <router-link to="/rhythm" class="btn btn-outline-primary">探索更多 →</router-link>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="feature-card animate-on-scroll" style="animation-delay: 0.2s;">
              <div class="feature-icon">
                <i class="bi bi-brush"></i>
              </div>
              <h3>偶之艺</h3>
              <p>学习木偶操控技艺，通过虚拟仿真和AI辅助掌握传统技法</p>
              <router-link to="/art" class="btn btn-outline-primary">探索更多 →</router-link>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="feature-card animate-on-scroll" style="animation-delay: 0.4s;">
              <div class="feature-icon">
                <i class="bi bi-globe"></i>
              </div>
              <h3>偶之境</h3>
              <p>沉浸式VR体验，身临其境地感受木偶戏的魅力与精彩</p>
              <router-link to="/world" class="btn btn-outline-primary">探索更多 →</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="animate-on-scroll">加入我们的数字传承之旅</h2>
            <p class="animate-on-scroll">通过现代技术保护和传承传统木偶艺术，让这份珍贵的文化遗产在数字时代焕发新的生机</p>
            <div class="cta-buttons animate-on-scroll">
              <router-link to="/rhythm" class="btn btn-primary">
                浏览藏品
              </router-link>
              <router-link to="/art" class="btn btn-primary" style="background: #D4C4B0; border-color: #D4C4B0; color: #333;">
                探索艺术
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// 页面加载后初始化动画和统计数字
onMounted(() => {
  // 初始化滚动动画
  const animateElements = document.querySelectorAll('.animate-on-scroll')
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, { threshold: 0.1 })
  
  animateElements.forEach(element => {
    observer.observe(element)
  })
  
  // 初始化统计数字动画
  const statNumbers = document.querySelectorAll('.stat-number')
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'))
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        stat.textContent = target
        clearInterval(timer)
      } else {
        stat.textContent = Math.floor(current)
      }
    }, 20)
  })
})
</script>

<style scoped>
/* 首页样式 */
.hero-section {
  background: #8b7454ff;
  color: white;
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.hero-section .container {
  position: relative;
  z-index: 1;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
  font-family: 'SimSun', serif;
}

.hero-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease 0.2s;
  font-weight: normal;
}

.hero-section p {
  font-size: 1rem;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease 0.4s;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease 0.6s;
}

.hero-buttons .btn {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0;
  border: 1px solid white;
  background: transparent;
  color: white;
  transition: all 0.3s ease;
}

.hero-buttons .btn:hover {
  background: white;
  color: #8B6954;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease 0.8s;
}

.puppet-showcase {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: pulse 2s infinite;
}

.puppet-icon {
  font-size: 4rem;
  color: white;
  animation: rotate 20s linear infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.features-section {
  background-color: white;
  padding: 4rem 0;
}

.feature-card {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  font-size: 1.5rem;
  color: #D4C4B0;
}

.feature-card h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #6c757d;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.stats-section {
  background-color: #333333;
  color: white;
  padding: 4rem 0;
}

.stat-item {
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #D4C4B0;
}

.cta-section {
  background-color: white;
  color: #333333;
  padding: 4rem 0;
  text-align: center;
}

.cta-section h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.cta-section p {
  font-size: 1rem;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease 0.2s;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease 0.4s;
}

.cta-buttons .btn {
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }
  
  .hero-section h2 {
    font-size: 1.2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .puppet-showcase {
    width: 200px;
    height: 200px;
  }
  
  .puppet-icon {
    font-size: 3rem;
  }
  
  .feature-card {
    margin-bottom: 2rem;
  }
  
  .stat-item {
    margin-bottom: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-section {
    padding: 4rem 0;
  }
}
</style>