<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <a class="navbar-brand" href="/">
        <i class="bi bi-palette2"></i> 偶艺云承
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.path === '/' }" to="/">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.path === '/rhythm' }" to="/rhythm">偶之韵</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.path === '/art' }" to="/art">偶之艺</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.path === '/world' }" to="/world">偶之境</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.path === '/experience' }" to="/experience">线下体验</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="{ active: $route.path === '/about' }" to="/about">关于我们</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/auth">
              <i class="bi bi-person"></i> 登录/注册
            </router-link>
          </li>
          <li class="nav-item dropdown" v-else>
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              <span class="user-avatar">{{ username.charAt(0).toUpperCase() }}</span>
              <span class="user-name">{{ username }}</span>
            </a>
            <ul class="dropdown-menu user-dropdown-menu">
              <li>
                <div class="dropdown-header">
                  <div class="dropdown-avatar">{{ username.charAt(0).toUpperCase() }}</div>
                  <div class="dropdown-user-info">
                    <div class="dropdown-username">{{ username }}</div>
                    <div class="dropdown-email">{{ email }}</div>
                  </div>
                </div>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link class="dropdown-item" to="/profile">
                <i class="bi bi-person-circle me-2"></i> 个人中心
              </router-link></li>
              <li><a class="dropdown-item" href="#" @click.prevent="logout">
                <i class="bi bi-box-arrow-right me-2"></i> 退出登录
              </a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const username = ref('')
const email = ref('')

// 检查登录状态
async function checkLoginStatus() {
  try {
    if (typeof window !== 'undefined' && window.CloudService) {
      // 检查用户是否已登录
      isLoggedIn.value = window.CloudService.user.isLoggedIn()
      if (isLoggedIn.value) {
        // 获取用户信息
        const user = window.CloudService.user.getLoggedInUser()
        if (user) {
          username.value = user.username || ''
          email.value = user.email || ''
        }
      }
    }
  } catch (error) {
    console.log('未登录')
  }
}

// 退出登录
async function logout() {
  try {
    if (typeof window !== 'undefined' && window.CloudService) {
      // 调用 CloudService 退出登录
      await window.CloudService.user.logout()
      isLoggedIn.value = false
      username.value = ''
      email.value = ''
      alert('退出登录成功！')
      router.push('/')
    }
  } catch (error) {
    console.error('退出登录失败:', error)
  }
}

// 监听路由变化，检查登录状态
watch(() => router.currentRoute.value, () => {
  checkLoginStatus()
})

// 页面加载时检查登录状态
onMounted(() => {
  checkLoginStatus()
})
</script>

<style scoped>
/* 导航栏样式 */
.navbar {
  background-color: #8B6954;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.8rem 0;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar-brand i {
  color: white;
}

.nav-link {
  color: white !important;
  font-weight: 500;
  margin-left: 1rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #D4C4B0 !important;
}

.nav-link.active {
  color: #D4C4B0 !important;
  border-bottom: 2px solid #D4C4B0;
}

.user-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #8B7355;
  color: white;
  margin-right: 0.5rem;
}

.dropdown-header {
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.dropdown-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #8B7355;
  color: white;
  font-size: 1.5rem;
  margin-right: 1rem;
}

.dropdown-user-info {
  display: inline-block;
  vertical-align: middle;
}

.dropdown-username {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.dropdown-email {
  font-size: 0.875rem;
  color: #6c757d;
}

.user-dropdown-menu {
  min-width: 200px;
  right: 0;
  left: auto;
}

.dropdown-item i {
  color: #8B6954;
}

.dropdown-item:hover i,
.dropdown-item:focus i {
  color: #6B4934;
}
</style>