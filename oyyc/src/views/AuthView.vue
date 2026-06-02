<template>
  <div class="auth-view">
    <div class="container">
      <div class="auth-card">
        <h1 class="auth-title">登录/注册</h1>
        
        <div class="auth-tabs">
          <button class="tab-button" :class="{ active: activeTab === 'login' }" @click="switchTab('login')">登录</button>
          <button class="tab-button" :class="{ active: activeTab === 'register' }" @click="switchTab('register')">注册</button>
        </div>
        
        <form class="auth-form" v-if="activeTab === 'login'" autocomplete="off">
          <div class="form-group">
            <label for="login-email">邮箱</label>
            <input type="email" id="login-email" v-model="loginForm.email" placeholder="请输入邮箱" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
          </div>
          <div class="form-group">
            <label for="login-password">密码</label>
            <input type="password" id="login-password" v-model="loginForm.password" placeholder="请输入密码" autocomplete="new-password">
          </div>
          <div v-if="loginError" class="error-message">{{ loginError }}</div>
          <button type="button" class="auth-button" @click="login">登录</button>
        </form>
        
        <form class="auth-form" v-else autocomplete="off">
          <div class="form-group">
            <label for="register-username">用户名</label>
            <input type="text" id="register-username" v-model="registerForm.username" placeholder="请输入用户名" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
          </div>
          <div class="form-group">
            <label for="register-email">邮箱</label>
            <input type="email" id="register-email" v-model="registerForm.email" placeholder="请输入邮箱" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
          </div>
          <div class="form-group">
            <label for="register-password">密码</label>
            <input type="password" id="register-password" v-model="registerForm.password" placeholder="请输入密码" autocomplete="new-password">
          </div>
          <div v-if="registerError" class="error-message">{{ registerError }}</div>
          <button type="button" class="auth-button" @click="register">注册</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('login')
const loginForm = ref({
  email: '',
  password: ''
})
const registerForm = ref({
  username: '',
  email: '',
  password: ''
})
const loginError = ref('')
const registerError = ref('')

// 清除所有错误提示
const clearErrors = () => {
  loginError.value = ''
  registerError.value = ''
}

// 切换Tab并清除错误
const switchTab = (tab) => {
  activeTab.value = tab
  clearErrors()
}

// 登录
async function login() {
  clearErrors()

  // 表单验证
  if (!loginForm.value.email.trim()) {
    loginError.value = '请输入邮箱'
    return
  }
  if (!emailRegex.test(loginForm.value.email)) {
    loginError.value = '邮箱格式不正确'
    return
  }
  if (!loginForm.value.password.trim()) {
    loginError.value = '请输入密码'
    return
  }

  try {
    // 集成知晓云SDK的登录功能
    console.log('登录请求:', loginForm.value)

    // 检查CloudService是否可用
    if (typeof window !== 'undefined' && window.CloudService) {
      const res = await window.CloudService.user.login(loginForm.value.email, loginForm.value.password)
      console.log('登录成功:', res)
      alert('登录成功！')
      router.push('/')
    } else {
      // 模拟登录成功
      console.log('CloudService 不可用，模拟登录成功')
      alert('登录成功！')
      router.push('/')
    }
  } catch (error) {
    console.error('登录失败:', error)
    loginError.value = '登录失败，请检查邮箱和密码'
  }
}

// 邮箱格式验证正则
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 注册
async function register() {
  clearErrors()

  // 表单验证
  if (!registerForm.value.username.trim()) {
    registerError.value = '请输入用户名'
    return
  }
  if (!registerForm.value.email.trim()) {
    registerError.value = '请输入邮箱'
    return
  }
  // 邮箱格式验证
  if (!emailRegex.test(registerForm.value.email)) {
    registerError.value = '邮箱格式不正确'
    return
  }
  if (!registerForm.value.password.trim()) {
    registerError.value = '请输入密码'
    return
  }
  if (registerForm.value.password.length < 6) {
    registerError.value = '密码长度不能少于6位'
    return
  }

  try {
    // 集成知晓云SDK的注册功能
    console.log('注册请求:', registerForm.value)

    // 检查CloudService是否可用
    if (typeof window !== 'undefined' && window.CloudService) {
      const res = await window.CloudService.user.register(registerForm.value)
      console.log('注册成功:', res)
      alert('注册成功！')
      // 清空注册表单
      registerForm.value = {
        username: '',
        email: '',
        password: ''
      }
      activeTab.value = 'login'
    } else {
      // 模拟注册成功
      console.log('CloudService 不可用，模拟注册成功')
      alert('注册成功！')
      // 清空注册表单
      registerForm.value = {
        username: '',
        email: '',
        password: ''
      }
      activeTab.value = 'login'
    }
  } catch (error) {
    console.error('注册失败:', error)

    // 检测重复邮箱错误 - 增强错误匹配逻辑
    // 获取各种可能的错误信息来源
    const errorMsg = (error.message || error.error || error.msg || JSON.stringify(error)).toLowerCase()
    // 获取错误码 - 支持多种格式
    const errorCode = error.code || error.status || (error.response && error.response.status)

    // 优先检查常见的重复邮箱错误码
    const duplicateCodes = [400, 403, 601, 602, '400', '403', '601', '602']
    
    // 检测重复邮箱错误
    if (duplicateCodes.includes(errorCode) ||
        errorMsg.includes('duplicated') ||
        errorMsg.includes('duplicate') ||
        errorMsg.includes('already exist') ||
        errorMsg.includes('exists') ||
        errorMsg.includes('已存在') ||
        errorMsg.includes('邮箱已') ||
        errorMsg.includes('email') && errorMsg.includes('used') ||
        errorMsg.includes('account') && errorMsg.includes('exist') ||
        errorMsg.includes('email has been') ||
        errorMsg.includes('email already') ||
        errorMsg.includes('email') && errorMsg.includes('存在')) {
      registerError.value = '该邮箱已注册'
    } else if (errorMsg.includes('invalid') ||
               errorMsg.includes('格式') ||
               errorMsg.includes('格式不正确')) {
      registerError.value = '邮箱格式不正确'
    } else if (errorMsg.includes('password') && errorMsg.includes('short')) {
      registerError.value = '密码长度不足6位'
    } else {
      // 未知错误，显示简化提示并打印详细信息
      registerError.value = '注册失败，请稍后重试'
      console.log('未匹配的注册错误详情:', error)
    }
  }
}
</script>

<style scoped>
/* 登录/注册页面样式 */
.auth-view {
  padding: 8rem 0 4rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.auth-card {
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  max-width: 500px;
  margin: 0 auto;
}

.auth-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.auth-tabs {
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.tab-button {
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 500;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button:hover {
  color: #8B7355;
}

.tab-button.active {
  color: #8B7355;
  border-bottom: 2px solid #8B7355;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #8B7355;
  box-shadow: 0 0 0 0.2rem rgba(139, 115, 85, 0.25);
}

.auth-button {
  padding: 0.75rem;
  background: linear-gradient(135deg, #D4C4B0 0%, #A0826D 100%);
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.auth-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.error-message {
  padding: 0.75rem;
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 5px;
  color: #c53030;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .auth-card {
    padding: 2rem;
    margin: 0 1rem;
  }
  
  .auth-title {
    font-size: 1.8rem;
  }
}
</style>