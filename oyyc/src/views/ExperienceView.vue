<template>
  <div class="experience-view">
    <div class="container">
      <h1 class="page-title">线下体验</h1>
      <p class="page-description">直观了解前沿 AI 与计算机视觉技术，亲手体验各类智能交互项目</p>
      
      <!-- 实验室简介 -->
      <div class="intro-section">
        <div class="intro-content">
          <div class="intro-icon">
            <i class="bi bi-building-fill"></i>
          </div>
          <div class="intro-text">
            <h3>实验室简介</h3>
            <p>xxxxx实验室于2019年获批建设，2022年通过验收。实验室依托xxxxx学院，围绕“人工智能”、“智能制造2025”等国家战略，聚焦社会与经济发展中对科技进步的需求，以机器学习为基础，以计算机视觉智能、网络及应用智能、网络媒体大数据智能为主要方向，开展社会及行业技术进步亟需的关键技术研究与系统研发工作。</p>
          </div>
        </div>
      </div>
      
      <div class="content-section">
        <h2>校园开放日活动</h2>
        
        <div class="event-cards-container">
          <!-- 今年活动预热 -->
          <div class="event-card featured">
            <div class="event-header">
              <h3>2026年校园开放日 - VR木偶体验</h3>
              <span class="event-date">即将举行</span>
            </div>
            <div class="event-content new-layout">
              <div class="event-details">
                <p>今年，我们将针对本网站的VR技术，举办一场线下体验活动。参与者将有机会通过VR设备，身临其境地感受木偶艺术的魅力，与虚拟木偶进行互动，体验传统艺术与现代科技的完美融合。</p>
                <p>活动将包括：</p>
                <ul>
                  <li>VR木偶互动体验</li>
                  <li>传统木偶制作工坊</li>
                  <li>木偶戏表演</li>
                  <li>专家讲座</li>
                </ul>
                <p>活动详情已公布，欢迎报名参加！</p>
                <router-link to="/open-day-2026-detail" class="more-btn">了解更多</router-link>
              </div>
              <div class="event-image">
                <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=VR%20puppet%20experience%20in%20campus%20open%20day%2C%20modern%20technology%20and%20traditional%20puppet%20art%2C%20interactive%20exhibition%2C%20students%20participating%2C%20bright%20lighting%2C%20professional%20photography&image_size=landscape_16_9" alt="VR木偶体验">
              </div>
            </div>
          </div>
          
          <!-- 去年活动回顾 -->
          <div class="event-card">
            <div class="event-header">
              <h3>2025年校园开放日</h3>
              <span class="event-date">已举办</span>
            </div>
            <div class="event-content new-layout">
              <div class="event-details">
                <p>2025年8月2日-8月3日，xxxxx实验室举办了中小学生开放日活动。</p>
                <p>活动内容包括：</p>
                <ul>
                  <li>趣味互动智能技术体验</li>
                  <li>社会应用视觉技术展示</li>
                  <li>智能制造视觉技术演示</li>
                  <li>智能网络技术演示</li>
                </ul>
                <p>活动获得了广泛好评，为更多人了解和喜爱科技与艺术搭建了平台。</p>
                <router-link to="/open-day-2025-detail" class="more-btn">了解更多</router-link>
              </div>
              <div class="event-image">
                <img src="../assets/images/open-day-2025.jpg" alt="2025年校园开放日">
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 常年体验板块 -->
      <div class="content-section">
        <h2>常年体验</h2>
        <div class="event-card">
          <div class="event-header">
            <h3>实验室日常体验</h3>
            <span class="event-date">常年开放</span>
          </div>
          <div class="event-content">
            <div class="event-image">
              <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=lab%20experience%20room%2C%20modern%20technology%20equipment%2C%20puppet%20art%20exhibition%2C%20bright%20and%20clean%20environment%2C%20professional%20photography&image_size=landscape_16_9" alt="实验室日常体验">
            </div>
            <div class="event-details">
              <p>除了校园开放日活动外，我们的实验室还提供常年体验服务，欢迎感兴趣的同学和市民前来参观和体验。</p>
              <p><strong>体验地点：</strong>机电大楼A341</p>
              <p><strong>体验内容：</strong></p>
              <ul>
                <li>机器视觉/工业视觉类技术</li>
                <li>生活视觉/交互体验类技术</li>
                <li>网络及智能物联网类技术</li>
                <li>网络媒体大数据/智能交互类技术</li>
                <li>VR/虚拟现实/元宇宙交互类技术</li>
              </ul>
              <p><strong>预约方式：</strong>提前联系实验室预约，确保有专人接待。</p>
              <router-link to="/lab-experience-detail" class="more-btn">了解更多</router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="signup-section">
        <h2>活动预约</h2>
        <p>想要了解更多关于线下体验活动的信息，或者预约参加今年的VR木偶体验活动，请填写以下表单：</p>
        
        <!-- 成功提示 -->
        <div v-if="showSuccess" class="success-message">
          <i class="bi bi-check-circle"></i>
          <p>预约成功！我们会尽快与您联系。</p>
        </div>
        
        <!-- 错误提示 -->
        <div v-if="errorMessage" class="error-message">
          <i class="bi bi-exclamation-circle"></i>
          <p>{{ errorMessage }}</p>
        </div>
        
        <form class="signup-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" id="name" v-model="formData.name" placeholder="请输入您的姓名">
          </div>
          <div class="form-group">
            <label for="email">邮箱</label>
            <input type="email" id="email" v-model="formData.email" placeholder="请输入您的邮箱">
          </div>
          <div class="form-group">
            <label for="phone">电话</label>
            <input type="tel" id="phone" v-model="formData.phone" placeholder="请输入您的电话">
          </div>
          <div class="form-group">
            <label for="interest">感兴趣的活动</label>
            <select id="interest" v-model="formData.interest">
              <option value="vr">VR木偶体验</option>
              <option value="workshop">木偶制作工坊</option>
              <option value="performance">木偶戏表演</option>
              <option value="lecture">专家讲座</option>
            </select>
          </div>
          <button type="submit" class="submit-btn">提交预约</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 表单数据
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  interest: 'vr'
});

// 状态
const showSuccess = ref(false);
const errorMessage = ref('');

// 验证字段标签映射
const fieldLabels = {
  name: '姓名',
  email: '邮箱',
  phone: '电话',
  interest: '感兴趣的活动'
};

// 表单验证
const validateForm = () => {
  const emptyFields = [];
  
  if (!formData.name.trim()) {
    emptyFields.push(fieldLabels.name);
  }
  if (!formData.email.trim()) {
    emptyFields.push(fieldLabels.email);
  }
  if (!formData.phone.trim()) {
    emptyFields.push(fieldLabels.phone);
  }
  
  if (emptyFields.length > 0) {
    errorMessage.value = emptyFields.join('、') + '还未填写';
    showSuccess.value = false;
    return false;
  }
  
  return true;
};

// 提交处理
const handleSubmit = () => {
  // 清除之前的提示
  errorMessage.value = '';
  
  // 验证表单
  if (!validateForm()) {
    return;
  }
  
  // 模拟提交成功
  console.log('预约信息:', formData);
  showSuccess.value = true;
  
  // 重置表单
  formData.name = '';
  formData.email = '';
  formData.phone = '';
  formData.interest = 'vr';
  
  // 3秒后隐藏成功提示
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
};
</script>

<style scoped>
/* 线下体验页面样式 */
.experience-view {
  padding: 8rem 0 4rem;
  background-color: #f8f9fa;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
}

.page-description {
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 4rem;
  color: #6c757d;
}

/* 实验室简介板块 */
.intro-section {
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;
}

.intro-content {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.intro-icon {
  font-size: 3rem;
  color: #8B6954;
  flex-shrink: 0;
  margin-top: 0.5rem;
}

.intro-text h3 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.intro-text p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
  margin: 0;
}

.content-section {
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;
}

.content-section h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
}

.event-cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.event-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.event-content.new-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.event-content.new-layout .event-details {
  order: 1;
}

.event-content.new-layout .event-image {
  order: 2;
  height: 250px;
}

.event-content.new-layout .event-image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.event-card.featured {
  border-left: 4px solid #8B6954;
}

.event-header {
  background-color: #8B6954;
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: bold;
}

.event-date {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.event-content {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.event-image {
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
}

.event-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.event-card:hover .event-image img {
  transform: scale(1.05);
}

.event-details p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 1rem;
}

.event-details ul {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.event-details li {
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.signup-section {
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.signup-section h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.signup-section p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 2rem;
}

.signup-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #8B6954;
  box-shadow: 0 0 0 0.2rem rgba(139, 105, 84, 0.25);
}

.submit-btn {
  grid-column: 1 / -1;
  background-color: #8B6954;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #6B4934;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(139, 105, 84, 0.3);
}

/* 成功提示 */
.success-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.success-message i {
  font-size: 1.25rem;
}

.success-message p {
  margin: 0;
}

/* 错误提示 */
.error-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.error-message i {
  font-size: 1.25rem;
}

.error-message p {
  margin: 0;
}

.more-btn {
  display: inline-block;
  background-color: #8B6954;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.more-btn:hover {
  background-color: #6B4934;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(139, 105, 84, 0.3);
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .event-content {
    grid-template-columns: 1fr;
  }
  
  .signup-form {
    grid-template-columns: 1fr;
  }
  
  .content-section,
  .signup-section {
    padding: 2rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .event-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>