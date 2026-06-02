<template>
  <div class="world-view">
    <div class="container">
      <h1 class="page-title">偶之境 · 木偶戏VR沉浸式体验</h1>
      <p class="page-description">通过VR技术身临其境体验木偶戏的魅力</p>
      
      <div v-if="!isLoggedIn" class="login-prompt">
        <div class="login-icon">
          <i class="bi bi-lock"></i>
        </div>
        <h3>登录后查看更多内容</h3>
        <p>登录后可访问VR全景演出、VR游戏体验等全部功能</p>
        <router-link to="/auth" class="login-btn">立即登录</router-link>
      </div>
      
      <template v-else>
      <div class="content-section">
        <h2>360°VR全景演出</h2>
        <p>沉浸式观看经典木偶剧目全景演出，自由切换视角，近距离欣赏木偶细节与表演精髓</p>
        
        <!-- 加载状态 -->
        <div v-if="isLoading" class="loading">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">加载中...</span>
          </div>
          <p>正在加载演出数据...</p>
        </div>
        
        <!-- 错误提示 -->
        <div v-else-if="loadError" class="load-error">
          <i class="bi bi-exclamation-circle"></i>
          <p>{{ loadError }}</p>
          <button @click="fetchVideos" class="retry-btn">重试</button>
        </div>
        
        <!-- VR演出内容 -->
        <template v-else>
          <div class="vr-tabs">
            <button class="tab-btn active">经典剧目</button>
            <button class="tab-btn">创新实验剧目</button>
            <button class="tab-btn">地方传统专场</button>
          </div>
          
          <div class="vr-player">
            <div class="player-container" v-if="!currentShow">
              <div class="player-icon">
                <i class="bi bi-film"></i>
              </div>
              <h3>请从下方选择剧目开始观看</h3>
              <p>360°可交互全景视角</p>
            </div>
            
            <div class="player-container active" v-else>
              <div class="player-header">
                <h3>{{ currentShow.title }}</h3>
                <button class="close-btn" @click="closePlayer">&times;</button>
              </div>
              
              <div class="video-area" v-if="currentMode === '2d'">
                <!-- 如果有视频URL，显示视频播放器 -->
                <video 
                  v-if="currentShow.videoUrl" 
                  ref="videoRef"
                  class="video-player"
                  controls
                >
                  <source :src="currentShow.videoUrl" type="video/mp4">
                  您的浏览器不支持视频播放
                </video>
                
                <!-- 如果没有视频URL（备用），显示占位图 -->
                <div v-else class="video-placeholder">
                  <i class="bi bi-play-circle"></i>
                  <p>2D视频播放区域</p>
                  <p class="video-tip">视频加载中...</p>
                </div>
              </div>
              
              <div class="video-area vr-mode" v-else>
                <!-- 如果有视频URL，显示VR视频播放器 -->
                <video 
                  v-if="currentShow.videoUrl" 
                  ref="videoRef"
                  class="video-player vr-video"
                  controls
                  crossorigin="anonymous"
                >
                  <source :src="currentShow.videoUrl" type="video/mp4">
                  您的浏览器不支持视频播放
                </video>
                
                <!-- 如果没有视频URL，显示VR占位图 -->
                <div v-else class="vr-placeholder">
                  <i class="bi bi-vr"></i>
                  <p>VR全景视角</p>
                  <p class="vr-status" :class="{ connected: isVRConnected }">
                    {{ isVRConnected ? 'VR设备已连接' : '等待连接VR设备...' }}
                  </p>
                </div>
              </div>
              
              <div class="player-info">
                <p>{{ currentShow.description }} - {{ currentShow.detail }}</p>
              </div>
              
              <div class="player-controls">
                <button 
                  class="control-btn" 
                  :class="{ active: currentMode === '2d' }"
                  @click="switchMode('2d')"
                >
                  2D模式
                </button>
                <button 
                  class="control-btn" 
                  :class="{ active: currentMode === 'vr' }"
                  @click="switchMode('vr')"
                >
                  VR模式
                </button>
              </div>
            </div>
          </div>
          
          <!-- 空状态 -->
          <div v-if="shows.length === 0" class="empty-shows">
            <i class="bi bi-film"></i>
            <p>暂无演出数据</p>
          </div>
          
          <div class="vr-shows" v-else>
            <div 
              v-for="show in shows" 
              :key="show.id" 
              class="show-item"
              :class="{ selected: currentShow && currentShow.id === show.id }"
              @click="selectShow(show)"
            >
              <h4>{{ show.title }}</h4>
              <p>{{ show.description }}</p>
              <p>{{ show.detail }}</p>
              <div class="show-tags">
                <span class="tag">{{ show.tags[0] }}</span>
                <span class="tag">{{ show.tags[1] }}</span>
              </div>
              <button class="start-btn" @click.stop="selectShow(show)">
                {{ currentShow && currentShow.id === show.id ? '已选择' : '开始观看' }}
              </button>
            </div>
          </div>
        </template>
      </div>
      
      <div class="game-section">
        <h2>VR游戏体验</h2>
        <p>多种VR游戏模式，全方位体验木偶戏的乐趣与挑战</p>
        
        <div class="game-container">
          <div class="game-area">
            <div class="game-icon">
              <i class="bi bi-controller"></i>
            </div>
            <h3>VR游戏体验区</h3>
            <p>进入VR虚拟世界，体验木偶戏的多种玩法</p>
            <button class="start-btn">开始游戏</button>
          </div>
        </div>
      </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoggedIn = ref(false);
const currentMode = ref('2d');
const currentShow = ref(null);
const isVRConnected = ref(false);
const videoRef = ref(null);
const shows = ref([]);
const isLoading = ref(true);
const loadError = ref(null);

// 演示视频URL（用于测试，避免CORS跨域问题）
const demoVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';

// 从知晓云数据库获取视频数据
const fetchVideos = async () => {
  try {
    console.log('正在从知晓云数据库获取VR演出视频数据...');
    const data = await window.DatabaseService.videos.findAll();
    console.log('VR演出视频数据获取成功:', data);
    
    // 将数据库数据映射为VR演出所需的结构
    shows.value = data.map((video, index) => {
      // 处理标题，避免书名号重复
      let title = video.title || '未知剧目';
      if (!title.startsWith('《')) {
        title = `《${title}》`;
      }
      
      // 处理类型，避免undefined
      const type = video.type || '木偶戏';
      
      // 使用数据库中的视频URL，如果为空则使用演示视频
      const videoUrl = video.videoUrl || video.video_url || demoVideoUrl;
      
      return {
        id: video.id || index + 1,
        title: title,
        description: `${video.region || '未知地区'}${type}全景演出`,
        detail: video.description || '精彩的木偶戏演出',
        tags: ['传统经典', type],
        videoUrl: videoUrl,
        thumbnail: video.thumbnail || ''
      };
    });
    
    // 确保页面加载时不自动选择视频，用户需要手动选择
    currentShow.value = null;
  } catch (err) {
    console.error('获取VR演出视频数据失败:', err);
    loadError.value = '获取演出数据失败，请稍后重试';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  checkLoginStatus();
  fetchVideos();
});

function checkLoginStatus() {
  try {
    if (typeof window !== 'undefined' && window.CloudService) {
      isLoggedIn.value = window.CloudService.user.isLoggedIn();
    }
  } catch (error) {
    console.log('检查登录状态失败');
  }
}

function switchMode(mode) {
  currentMode.value = mode;
  if (mode === 'vr') {
    checkVRConnection();
  }
}

function checkVRConnection() {
  if (navigator.getVRDisplays) {
    navigator.getVRDisplays().then(displays => {
      isVRConnected.value = displays.length > 0;
      if (!isVRConnected.value) {
        alert('请连接VR设备以体验VR模式。\n未连接VR设备时将显示VR视角界面。');
      }
    }).catch(err => {
      console.log('VR检测失败:', err);
      alert('VR设备检测失败，请连接VR设备以体验VR模式。');
    });
  } else {
    console.log('浏览器不支持VR');
    alert('您的浏览器不支持VR功能，请使用支持WebVR的浏览器。');
  }
}

function selectShow(show) {
  currentShow.value = show;
}

function closePlayer() {
  currentShow.value = null;
  if (videoRef.value) {
    videoRef.value.pause();
  }
}

// 播放演示视频
function playDemoVideo() {
  alert('演示视频播放功能\n\n由于当前视频URL为空，演示视频功能将在后续版本中完善。\n请在知晓云数据库中添加视频URL以体验完整功能。');
}
</script>

<style scoped>
/* 偶之境页面样式 */
.world-view {
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

.login-prompt {
  background-color: white;
  padding: 4rem 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  margin-bottom: 4rem;
}

.login-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B6954, #6B4934);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.login-icon i {
  font-size: 2.5rem;
  color: white;
}

.login-prompt h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.login-prompt p {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 2rem;
}

.login-btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #8B6954, #6B4934);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(139, 105, 84, 0.3);
  color: white;
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
  margin-bottom: 1.5rem;
  color: #333;
}

.content-section p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 2rem;
}

.vr-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.tab-btn {
  background-color: #f8f9fa;
  color: #333;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background-color: #A0826D;
  color: white;
}

.tab-btn:hover {
  background-color: #D4C4B0;
  color: #333;
}

.vr-player {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}

.player-container {
  background-color: #f8f9fa;
  padding: 4rem;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 800px;
  border: 2px dashed #D4C4B0;
}

.player-container.active {
  border: 2px solid #8B6954;
  background-color: #fff;
}

.player-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.player-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #8B6954;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.video-area {
  margin-bottom: 2rem;
}

/* 视频播放器样式 */
.video-player {
  width: 100%;
  max-height: 400px;
  border-radius: 10px;
  background-color: #000;
  cursor: pointer;
}

.video-player.vr-video {
  max-height: 350px;
}

.video-placeholder,
.vr-placeholder {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  padding: 4rem 2rem;
  color: white;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.video-placeholder:hover {
  transform: scale(1.02);
}

.vr-placeholder {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.video-placeholder i,
.vr-placeholder i {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.video-tip {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 0.5rem;
}

.vr-status {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
}

.vr-status.connected {
  background-color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}

.player-info {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 5px;
}

.player-info p {
  margin: 0;
  color: #666;
}

.video-area.vr-mode .video-placeholder {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.player-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4C4B0 0%, #A0826D 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 2rem;
  font-size: 3rem;
  color: white;
}

.player-container h3 {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.player-container p {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 2rem;
}

.player-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.control-btn {
  background-color: #D4C4B0;
  color: #333;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background-color: #C0B098;
}

.control-btn.active {
  background-color: #8B6954;
  color: white;
}

.vr-shows {
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
}

.show-item {
  flex: 1;
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.show-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.show-item.selected {
  border: 2px solid #8B6954;
  background-color: #fff;
}

/* 加载状态 */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
}

.loading p {
  margin-top: 1rem;
  color: #6c757d;
}

/* 错误提示 */
.load-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background-color: #f8d7da;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.load-error i {
  font-size: 2rem;
  color: #721c24;
  margin-bottom: 1rem;
}

.load-error p {
  color: #721c24;
  margin-bottom: 1rem;
}

.load-error .retry-btn {
  background-color: #A0826D;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-error .retry-btn:hover {
  background-color: #8B6954;
}

/* 空状态 */
.empty-shows {
  text-align: center;
  padding: 4rem;
  color: #6c757d;
}

.empty-shows i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #D4C4B0;
}

.show-item h4 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.show-item p {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.show-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  background-color: #D4C4B0;
  color: #333;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.start-btn {
  background-color: #A0826D;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.start-btn:hover {
  background-color: #8B6954;
}

.game-section {
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.game-section h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
}

.game-container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.game-area {
  background-color: #f8f9fa;
  padding: 4rem;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 600px;
}

.game-area:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.game-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4C4B0 0%, #A0826D 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 2rem;
  font-size: 3rem;
  color: white;
}

.game-area h3 {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.game-area p {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 2rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-section,
  .game-section {
    padding: 2rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .vr-tabs {
    flex-direction: column;
  }
  
  .vr-shows {
    flex-direction: column;
  }
  
  .player-container,
  .game-area {
    padding: 3rem 2rem;
  }
}
</style>