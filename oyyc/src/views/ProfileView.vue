<template>
  <div class="profile-view">
    <div class="container">
      <h1 class="page-title">个人中心</h1>
      
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-avatar">
            <img v-if="avatar" :src="avatar" :alt="username" class="avatar-img">
            <i v-else class="bi bi-person"></i>
          </div>
          <div class="profile-info">
            <h2>{{ username }}</h2>
            <p>{{ email }}</p>
            <button class="btn btn-outline-secondary mt-2" @click="toggleEditMode">
              {{ isEditing ? '取消编辑' : '编辑信息' }}
            </button>
          </div>
        </div>
        
        <div class="profile-content">
          <h3>个人信息</h3>
          
          <!-- 编辑模式 -->
          <div v-if="isEditing" class="edit-form">
            <div class="form-group">
              <label for="edit-nickname">昵称</label>
              <input type="text" id="edit-nickname" v-model="editForm.nickname" placeholder="请输入昵称">
            </div>
            <div class="form-group">
              <label for="edit-email">邮箱</label>
              <input type="email" id="edit-email" v-model="editForm.email" placeholder="请输入邮箱">
            </div>
            <div class="form-group">
              <label for="edit-phone">电话</label>
              <input type="tel" id="edit-phone" v-model="editForm.phone" placeholder="请输入电话">
            </div>
            <div class="form-group">
              <label for="edit-gender">性别</label>
              <select id="edit-gender" v-model="editForm.gender">
                <option value="0">未知</option>
                <option value="1">男</option>
                <option value="2">女</option>
              </select>
            </div>
            <div class="form-group">
              <label for="edit-country">国家/地区</label>
              <input type="text" id="edit-country" v-model="editForm.country" placeholder="请输入国家/地区">
            </div>
            <div class="form-group">
              <label for="edit-province">省份</label>
              <input type="text" id="edit-province" v-model="editForm.province" placeholder="请输入省份">
            </div>
            <div class="form-group">
              <label for="edit-city">城市</label>
              <input type="text" id="edit-city" v-model="editForm.city" placeholder="请输入城市">
            </div>
            <div class="form-group">
              <label for="edit-language">语言</label>
              <input type="text" id="edit-language" v-model="editForm.language" placeholder="请输入语言">
            </div>
            <div class="form-group">
              <label for="edit-avatar">头像</label>
              <input type="text" id="edit-avatar" v-model="editForm.avatar" placeholder="请输入头像URL">
            </div>
            <div class="form-actions">
              <button class="btn btn-outline-secondary" @click="toggleEditMode">取消</button>
              <button class="btn btn-primary" @click="saveProfile">保存修改</button>
            </div>
          </div>
          
          <!-- 查看模式 -->
          <div v-else>
            <div class="info-item">
              <span class="info-label">用户名:</span>
              <span class="info-value">{{ username }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">昵称:</span>
              <span class="info-value">{{ nickname }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">邮箱:</span>
              <span class="info-value">{{ email }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">电话:</span>
              <span class="info-value">{{ phone }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">性别:</span>
              <span class="info-value">{{ genderText }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">国家/地区:</span>
              <span class="info-value">{{ country }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">省份:</span>
              <span class="info-value">{{ province }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">城市:</span>
              <span class="info-value">{{ city }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">语言:</span>
              <span class="info-value">{{ language }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">OpenID:</span>
              <span class="info-value">{{ openid }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">UnionID:</span>
              <span class="info-value">{{ unionid }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">是否授权:</span>
              <span class="info-value">{{ isAuthorized ? '是' : '否' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">邮箱是否验证:</span>
              <span class="info-value">{{ emailVerified ? '是' : '否' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">手机是否验证:</span>
              <span class="info-value">{{ phoneVerified ? '是' : '否' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">注册时间:</span>
              <span class="info-value">{{ registerDate }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">最后更新:</span>
              <span class="info-value">{{ updateDate }}</span>
            </div>
          </div>
          
          <h3 class="mt-4">账号安全</h3>
          <div class="info-item">
            <span class="info-label">密码:</span>
            <span class="info-value">
              <button class="btn btn-sm btn-outline-secondary" @click="showChangePasswordModal = true">修改密码</button>
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 修改密码弹窗 -->
    <div v-if="showChangePasswordModal" class="modal-overlay" @click="showChangePasswordModal = false">
      <div class="modal-content" @click.stop>
        <h3>修改密码</h3>
        <div class="form-group">
          <label for="current-password">当前密码</label>
          <input type="password" id="current-password" v-model="changePasswordForm.currentPassword" placeholder="请输入当前密码">
        </div>
        <div class="form-group">
          <label for="new-password">新密码</label>
          <input type="password" id="new-password" v-model="changePasswordForm.newPassword" placeholder="请输入新密码">
        </div>
        <div class="form-group">
          <label for="confirm-password">确认新密码</label>
          <input type="password" id="confirm-password" v-model="changePasswordForm.confirmPassword" placeholder="请确认新密码">
        </div>
        <div class="modal-actions">
          <button class="btn btn-outline-secondary" @click="showChangePasswordModal = false">取消</button>
          <button class="btn btn-primary" @click="changePassword">确认修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('用户')
const nickname = ref('')
const email = ref('user@example.com')
const phone = ref('')
const gender = ref(0)
const country = ref('')
const province = ref('')
const city = ref('')
const language = ref('')
const openid = ref('')
const unionid = ref('')
const avatar = ref('')
const isAuthorized = ref(false)
const emailVerified = ref(false)
const phoneVerified = ref(false)
const registerDate = ref('2024-01-01')
const updateDate = ref('2024-01-01')
const showChangePasswordModal = ref(false)
const changePasswordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const isEditing = ref(false)
const editForm = ref({
  nickname: '',
  email: '',
  phone: '',
  gender: 0,
  country: '',
  province: '',
  city: '',
  language: '',
  avatar: ''
})

// 性别文本
const genderText = computed(() => {
  switch (gender.value) {
    case 1:
      return '男'
    case 2:
      return '女'
    default:
      return '未知'
  }
})

// 页面加载时检查登录状态并获取用户信息
onMounted(() => {
  // 延迟执行，确保CloudService已完全初始化
  setTimeout(() => {
    if (typeof window !== 'undefined' && window.CloudService) {
      const isLoggedIn = window.CloudService.user.isLoggedIn()
      if (!isLoggedIn) {
        // 如果用户未登录，跳转到登录页面
        router.push('/auth')
      } else {
        // 从本地存储获取用户信息
        const user = window.CloudService.user.getLoggedInUser()
        if (user) {
          updateUserInfo(user)
        } else {
          // 尝试从BaaS获取用户信息
          window.CloudService.user.getCurrentUser().then(res => {
            const userData = res.data
            updateUserInfo(userData)
          }).catch(err => {
            console.error('获取用户信息失败', err)
          })
        }
      }
    }
  }, 100)
})

// 更新用户信息
function updateUserInfo(userData) {
  username.value = userData._username || userData.username || '用户'
  nickname.value = userData.nickname || ''
  email.value = userData._email || userData.email || 'user@example.com'
  phone.value = userData._phone || userData.phone || ''
  gender.value = userData.gender || 0
  country.value = userData.country || ''
  province.value = userData.province || ''
  city.value = userData.city || ''
  language.value = userData.language || ''
  openid.value = userData.openid || ''
  unionid.value = userData.unionid || ''
  avatar.value = userData.avatar || ''
  isAuthorized.value = userData.is_authorized || false
  emailVerified.value = userData._email_verified || false
  phoneVerified.value = userData._phone_verified || false
  
  // 更新编辑表单数据
  editForm.value = {
    nickname: userData.nickname || '',
    email: userData._email || userData.email || 'user@example.com',
    phone: userData._phone || userData.phone || '',
    gender: userData.gender || 0,
    country: userData.country || '',
    province: userData.province || '',
    city: userData.city || '',
    language: userData.language || '',
    avatar: userData.avatar || ''
  }
  
  // 格式化时间
  if (userData.created_at) {
    registerDate.value = formatTimestamp(userData.created_at)
  }
  if (userData.updated_at) {
    updateDate.value = formatTimestamp(userData.updated_at)
  }
}

// 格式化时间戳
function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000)
  return date.toLocaleString('zh-CN')
}

// 切换编辑模式
function toggleEditMode() {
  isEditing.value = !isEditing.value
  // 如果进入编辑模式，更新编辑表单数据
  if (isEditing.value) {
    editForm.value = {
      nickname: nickname.value,
      email: email.value,
      phone: phone.value,
      gender: gender.value,
      country: country.value,
      province: province.value,
      city: city.value,
      language: language.value,
      avatar: avatar.value
    }
  }
}

// 保存个人信息
function saveProfile() {
  // 调用更新用户信息接口
  if (typeof window !== 'undefined' && window.CloudService) {
    window.CloudService.user.update(editForm.value).then(res => {
      console.log('更新用户信息成功', res)
      alert('保存成功！')
      // 更新本地数据
      updateUserInfo(res.data)
      isEditing.value = false
    }).catch(err => {
      console.error('更新用户信息失败', err)
      alert('保存失败，请重试')
    })
  }
}

// 修改密码
function changePassword() {
  // 验证表单
  if (!changePasswordForm.value.currentPassword) {
    alert('请输入当前密码')
    return
  }
  if (!changePasswordForm.value.newPassword) {
    alert('请输入新密码')
    return
  }
  if (changePasswordForm.value.newPassword !== changePasswordForm.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  
  // 调用修改密码接口
  if (typeof window !== 'undefined' && window.CloudService) {
    window.CloudService.user.changePassword(
      changePasswordForm.value.currentPassword,
      changePasswordForm.value.newPassword
    ).then(res => {
      console.log('修改密码成功', res)
      alert('密码修改成功')
      showChangePasswordModal.value = false
      changePasswordForm.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }).catch(err => {
      console.error('修改密码失败', err)
      alert('密码修改失败，请检查当前密码是否正确')
    })
  }
}
</script>

<style scoped>
/* 个人中心页面样式 */
.profile-view {
  padding: 8rem 0 4rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
}

.profile-card {
  background-color: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  animation: slideUp 0.8s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
  position: relative;
}

.profile-header::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 80px;
  height: 3px;
  background: linear-gradient(135deg, #D4C4B0 0%, #A0826D 100%);
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4C4B0 0%, #A0826D 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  color: white;
  margin-right: 2rem;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.profile-avatar:hover {
  transform: scale(1.05);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.profile-avatar:hover .avatar-img {
  transform: scale(1.1);
}

.profile-info h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.profile-info p {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.profile-content h3 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
  position: relative;
  padding-left: 1.5rem;
}

.profile-content h3::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 20px;
  background: linear-gradient(135deg, #D4C4B0 0%, #A0826D 100%);
  border-radius: 4px;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.info-item:hover {
  background-color: rgba(212, 196, 176, 0.1);
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 5px;
}

.info-label {
  font-weight: bold;
  color: #333;
  margin-right: 2rem;
  flex-shrink: 0;
}

.info-value {
  color: #6c757d;
  flex: 1;
  text-align: right;
  font-size: 1.05rem;
}

/* 编辑表单样式 */
.edit-form {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.5s ease;
}

.edit-form .form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.edit-form .form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
  font-size: 1rem;
}

.edit-form .form-group input,
.edit-form .form-group select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: white;
}

.edit-form .form-group input:focus,
.edit-form .form-group select:focus {
  outline: none;
  border-color: #8B6954;
  box-shadow: 0 0 0 3px rgba(139, 105, 84, 0.1);
  transform: translateY(-1px);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

/* 按钮样式 */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #8B6954 0%, #6B4934 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(139, 105, 84, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 105, 84, 0.4);
}

.btn-outline-secondary {
  background-color: transparent;
  color: #6c757d;
  border: 1px solid #ced4da;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.btn-outline-secondary:hover {
  background-color: #f8f9fa;
  border-color: #8B6954;
  color: #8B6954;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(139, 105, 84, 0.2);
}

/* 修改密码按钮 */
.change-password-btn {
  margin-top: 2rem;
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

/* 修改密码弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background-color: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  animation: slideUp 0.3s ease;
  position: relative;
  overflow: hidden;
}

.modal-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(135deg, #D4C4B0 0%, #A0826D 100%);
}

.modal-content h3 {
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
}

.modal-content .form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.modal-content .form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
  font-size: 1rem;
}

.modal-content .form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: white;
}

.modal-content .form-group input:focus {
  outline: none;
  border-color: #8B6954;
  box-shadow: 0 0 0 3px rgba(139, 105, 84, 0.1);
  transform: translateY(-1px);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .profile-card {
    padding: 2rem;
    margin: 0 1rem;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-avatar {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
  
  .edit-form {
    padding: 1.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions button {
    width: 100%;
  }
}
</style>