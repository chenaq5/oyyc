<template>
  <div class="learn-view">
    <div class="container">
      <div class="learn-header">
        <button class="back-btn" @click="goBack">
          <i class="bi bi-arrow-left"></i> 返回课程列表
        </button>
        <div class="course-header-info">
          <h1 class="course-title">{{ courseName }}</h1>
          <div class="course-meta" v-if="difficultyLevel || puppetType">
            <span class="meta-tag difficulty" v-if="difficultyLevel">{{ difficultyLevel }}</span>
            <span class="meta-tag type" v-if="puppetType">{{ puppetType }}</span>
          </div>
        </div>
      </div>
      
      <div class="learn-container">
        <div class="video-section">
          <div class="video-wrapper">
            <video 
              v-if="videoUrl && !isVideoError"
              ref="videoPlayer" 
              class="video-player" 
              controls 
              :src="videoUrl" 
              type="video/mp4" 
              @error="handleVideoError"
              @loadeddata="handleVideoLoaded"
            >
              您的浏览器不支持视频播放
            </video>
            <div v-else-if="isVideoError" class="video-error">
              <i class="bi bi-exclamation-triangle-fill"></i>
              <p>视频加载失败</p>
              <button @click="retryLoadVideo" class="retry-btn">重试</button>
            </div>
            <div v-else class="video-loading">
              <i class="bi bi-hourglass-split"></i>
              <p>加载视频中...</p>
            </div>
          </div>
          <div class="video-info">
            <h3>课程介绍</h3>
            <p>{{ courseDescription }}</p>
          </div>
        </div>
        
        <div class="chat-section">
          <div class="chat-header">
            <h3><i class="bi bi-robot"></i> AI学习助手</h3>
            <button @click="clearConversation" class="clear-chat-btn" title="清空对话">
              <i class="bi bi-trash"></i>
            </button>
          </div>
          <div class="chat-messages" ref="chatMessages">
            <div 
              v-for="(message, index) in messages" 
              :key="index"
              :class="['message', message.type === 'ai' ? 'ai-message' : 'user-message']"
            >
              <div class="message-icon">
                <i v-if="message.type === 'ai'" class="bi bi-robot"></i>
                <i v-else class="bi bi-person"></i>
              </div>
              <div class="message-content">
                <p>{{ message.content }}</p>
              </div>
            </div>
          </div>
          <div class="chat-input-area">
            <input 
              type="text" 
              v-model="chatInput" 
              placeholder="请输入您的问题..." 
              @keyup.enter="sendMessage"
              :disabled="isSending"
            >
            <button class="send-btn" @click="sendMessage" :disabled="isSending">
              <i v-if="isSending" class="bi bi-hourglass-split"></i>
              <i v-else class="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const courseName = ref('');
const courseDescription = ref('');
const videoUrl = ref('');
const difficultyLevel = ref('');
const puppetType = ref('');
const chatInput = ref('');
const chatMessages = ref(null);
const messages = ref([]);
const isLoading = ref(true);
const isVideoError = ref(false);
const isSending = ref(false);

// 对话历史记录
const conversationHistory = ref([]);

// AI辅助生成：豆包大模型，2026-4-21
// 火山方舟大模型配置
const ARK_API_KEY = '68bc3a9b-5bff-4013-9277-8976a500b58e';
const ARK_API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
const ARK_MODEL = 'doubao-seed-2-0-pro-260215';

// 调整页面高度
function adjustPageHeight() {
  const learnView = document.querySelector('.learn-view');
  if (learnView) {
    const windowHeight = window.innerHeight;
    learnView.style.minHeight = `${windowHeight}px`;
  }
}

// 监听窗口大小变化
function handleResize() {
  adjustPageHeight();
}

onMounted(async () => {
  // 调整页面高度
  adjustPageHeight();
  window.addEventListener('resize', handleResize);
  
  // 初始化AI助手欢迎消息
  messages.value.push({
    type: 'ai',
    content: '您好！我是您的AI学习助手。在观看视频的过程中，您可以随时向我提问关于木偶操控技巧、动作要领等问题，我会根据视频内容为您提供实时分析和解答。'
  });
  
  const courseData = route.query;
  const name = courseData.name;
  console.log('从路由获取的课程名称:', name);
  console.log('从路由获取的视频URL:', courseData.video);
  
  if (name && window.DatabaseService) {
    try {
      console.log('开始从数据库查询课程');
      const course = await window.DatabaseService.puppet_courses.findByName(name);
      console.log('数据库查询结果:', course);
      if (course) {
        console.log('课程的video_url:', course.video_url);
        courseName.value = course.course_name || name;
        courseDescription.value = course.course_description || '认真学习本课程，掌握木偶操控技巧';
        videoUrl.value = course.video_url || 'https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/standard.mp4';
        console.log('最终的videoUrl:', videoUrl.value);
        difficultyLevel.value = course.difficulty_level || '';
        puppetType.value = course.puppet_type || '';
      } else {
        console.log('数据库中没有找到课程，使用默认值');
        courseName.value = name;
        courseDescription.value = courseData.description || '认真学习本课程，掌握木偶操控技巧';
        videoUrl.value = courseData.video || 'https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/standard.mp4';
        console.log('最终的videoUrl(默认):', videoUrl.value);
      }
    } catch (error) {
      console.error('从数据库获取课程信息失败:', error);
      courseName.value = name;
      courseDescription.value = courseData.description || '认真学习本课程，掌握木偶操控技巧';
      videoUrl.value = courseData.video || 'https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/standard.mp4';
      console.log('最终的videoUrl(错误):', videoUrl.value);
    }
  } else {
    console.log('没有课程名称或DatabaseService不可用');
    courseName.value = name || '课程学习';
    courseDescription.value = courseData.description || '认真学习本课程，掌握木偶操控技巧';
    videoUrl.value = courseData.video || 'https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/standard.mp4';
    console.log('最终的videoUrl(无参数):', videoUrl.value);
  }
  
  isLoading.value = false;
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

function goBack() {
  router.push('/art');
}

function retryLoadVideo() {
  isVideoError.value = false;
  const currentUrl = videoUrl.value;
  videoUrl.value = '';
  setTimeout(() => {
    videoUrl.value = currentUrl;
  }, 100);
}

function handleVideoLoaded() {
  console.log('视频加载成功');
  isVideoError.value = false;
}

function handleVideoError(e) {
  if (!videoUrl.value) {
    console.log('视频URL未设置，等待加载...');
    return;
  }
  
  console.error('视频加载错误:', e);
  const video = e.target;
  let errorCode = '未知';
  
  if (video && video.error) {
    errorCode = video.error.code;
  }
  
  console.error('错误代码:', errorCode);
  console.error('当前视频URL:', videoUrl.value);
  isVideoError.value = true;
}

function clearConversation() {
  conversationHistory.value = [];
  messages.value = [{
    type: 'ai',
    content: '您好！我是您的AI学习助手。在观看视频的过程中，您可以随时向我提问关于木偶操控技巧、动作要领等问题，我会根据视频内容为您提供实时分析和解答。'
  }];
  scrollToBottom();
}

async function sendMessage() {
  if (!chatInput.value.trim() || isSending.value) return;
  
  const userMessage = chatInput.value.trim();
  messages.value.push({
    type: 'user',
    content: userMessage
  });
  chatInput.value = '';
  
  conversationHistory.value.push({
    role: 'user',
    content: userMessage
  });
  
  messages.value.push({
    type: 'ai',
    content: '正在思考中，请稍候...',
    isLoading: true
  });
  
  isSending.value = true;
  scrollToBottom();
  
  try {
    const systemPrompt = `你是一个专业的木偶戏学习助手，专门帮助学生学习和掌握木偶操控技巧。

当前课程信息：
- 课程名称：${courseName.value}
- 课程描述：${courseDescription.value}
- 难度等级：${difficultyLevel.value || '未设置'}
- 木偶类型：${puppetType.value || '未设置'}

请基于这些课程信息，友好、专业、详细地回答学生的问题。如果问题与课程无关，请礼貌引导回到学习。`;

    const requestBody = {
      model: ARK_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.value
      ],
      temperature: 0.7,
      stream: false
    };

    const response = await fetch(ARK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ARK_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || `API错误 ${response.status}`);
    }

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || '抱歉，我没有获取到有效回答。';

    messages.value = messages.value.filter(m => !m.isLoading);

    conversationHistory.value.push({
      role: 'assistant',
      content: aiReply
    });

    messages.value.push({
      type: 'ai',
      content: aiReply
    });

  } catch (err) {
    console.error('AI请求失败：', err);
    messages.value = messages.value.filter(m => !m.isLoading);
    messages.value.push({
      type: 'ai',
      content: `❌ 请求失败：${err.message}`
    });
  } finally {
    isSending.value = false;
    scrollToBottom();
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (chatMessages.value) {
      chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
    }
  });
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.learn-view {
  padding-top: 6rem;
  padding-bottom: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.learn-header {
  margin-bottom: 2rem;
  flex-shrink: 0;
}

.back-btn {
  background-color: transparent;
  border: none;
  color: #8B6954;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.back-btn:hover {
  color: #6B4934;
}

.course-header-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.course-title {
  font-size: 2rem;
  color: #333;
  font-weight: bold;
}

.course-meta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.meta-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.meta-tag.difficulty {
  background-color: #D4C4B0;
  color: #6B4934;
}

.meta-tag.type {
  background-color: #8B6954;
  color: white;
}

.learn-container {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  min-height: 0;
}

.video-section {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.video-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  border-radius: 10px;
  overflow: hidden;
  min-height: 300px;
  max-height: 450px;
}

.video-player {
  width: 100%;
  height: auto;
  max-height: 450px;
  object-fit: contain;
}

.video-loading,
.video-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: white;
  font-size: 1.2rem;
  padding: 3rem;
}

.video-loading i,
.video-error i {
  font-size: 3rem;
}

.video-loading p,
.video-error p {
  margin: 0;
}

.video-error {
  text-align: center;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #8B6954;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.retry-btn:hover {
  background-color: #6B4934;
}

.video-info {
  margin-top: 1.5rem;
  flex-shrink: 0;
}

.video-info h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.75rem;
}

.video-info p {
  color: #6c757d;
  line-height: 1.5;
  font-size: 0.95rem;
}

.chat-section {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 500px;
  overflow: hidden;
}

.chat-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.chat-header h3 {
  font-size: 1.1rem;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chat-header i {
  color: #8B6954;
}

.clear-chat-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.clear-chat-btn:hover {
  color: #dc3545;
  background-color: #f8d7da;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
}

.message {
  display: flex;
  gap: 0.75rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user-message {
  flex-direction: row-reverse;
}

.message-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ai-message .message-icon {
  background: linear-gradient(135deg, #8B6954, #6B4934);
  color: white;
}

.user-message .message-icon {
  background: #D4C4B0;
  color: #333;
}

.message-content {
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  line-height: 1.5;
  word-wrap: break-word;
}

.ai-message .message-content {
  background-color: #f8f9fa;
  color: #333;
}

.user-message .message-content {
  background-color: #8B6954;
  color: white;
}

.message-content p {
  margin: 0;
}

.chat-input-area {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
  background-color: white;
  border-radius: 0 0 10px 10px;
}

.chat-input-area input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;
}

.chat-input-area input:focus {
  outline: none;
  border-color: #8B6954;
}

.chat-input-area input:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.send-btn {
  padding: 0.75rem 1.5rem;
  background-color: #8B6954;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn:hover:not(:disabled) {
  background-color: #6B4934;
}

.send-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

@media (max-width: 992px) {
  .learn-view {
    padding-top: 5rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .learn-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .chat-section {
    min-height: 450px;
  }
  
  .video-wrapper {
    min-height: 250px;
    max-height: 350px;
  }
  
  .course-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .learn-view {
    padding-top: 4rem;
  }
  
  .video-section {
    padding: 1rem;
  }
  
  .chat-messages {
    padding: 0.75rem 1rem;
  }
  
  .chat-input-area {
    padding: 0.75rem 1rem;
  }
  
  .message-content {
    max-width: 85%;
    font-size: 0.9rem;
  }
}
</style>