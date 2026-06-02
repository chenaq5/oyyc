<template>
  <div class="videos-view">
    <div class="container">
      <h1 class="page-title">经典演出视频</h1>
      <p class="page-description">欣赏木偶戏的精彩表演</p>
      
      <button class="back-btn" @click="goBack">
        <i class="bi bi-arrow-left"></i> 返回偶之韵
      </button>
      
      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">加载中...</span>
        </div>
        <p>正在加载视频数据...</p>
      </div>
      
      <!-- 错误提示 -->
      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
        <button @click="fetchVideos" class="retry-btn">重试</button>
      </div>
      
      <!-- 视频内容 -->
      <div v-else>
        <div class="filter-section">
          <h3>按类型筛选</h3>
          <div class="filter-buttons">
            <button 
              v-for="filter in filters" 
              :key="filter.value"
              :class="['filter-btn', { active: selectedFilter === filter.value }]"
              @click="selectedFilter = filter.value"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>
        
        <div class="videos-grid">
          <div 
            v-for="video in filteredVideos" 
            :key="video.id || video.title"
            class="video-item"
          >
            <h4>{{ video.title }}</h4>
            <p>类型：{{ video.type }} | 地区：{{ video.region }}</p>
            <p>{{ video.description }}</p>
            <button class="watch-btn" @click="viewDetail('video', video.title)">观看视频</button>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-if="filteredVideos.length === 0" class="empty-state">
          <p>暂无视频数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedFilter = ref('all');
const videos = ref([]);
const isLoading = ref(true);
const error = ref(null);

// 筛选选项
const filters = [
  { label: '全部', value: 'all' },
  { label: '提线木偶', value: '提线木偶' },
  { label: '杖头木偶', value: '杖头木偶' },
  { label: '布袋木偶', value: '布袋木偶' },
  { label: '铁枝木偶', value: '铁枝木偶' }
];

// 过滤后的视频
const filteredVideos = computed(() => {
  if (selectedFilter.value === 'all') {
    return videos.value;
  }
  return videos.value.filter(video => video.type === selectedFilter.value);
});

// 从知晓云数据库获取视频数据
const fetchVideos = async () => {
  try {
    console.log('正在从知晓云数据库获取视频数据...');
    const data = await window.DatabaseService.videos.findAll();
    console.log('视频数据获取成功:', data);
    videos.value = data;
  } catch (err) {
    console.error('获取视频数据失败:', err);
    error.value = '获取视频数据失败，请稍后重试';
  } finally {
    isLoading.value = false;
  }
};

// 返回偶之韵页面
const goBack = () => {
  router.push('/rhythm');
};

// 查看详情
const viewDetail = (type, name) => {
  router.push({
    name: 'Detail',
    params: {
      type: type,
      name: name
    }
  });
};

// 组件挂载时获取数据
onMounted(() => {
  fetchVideos();
});
</script>

<style scoped>
.videos-view {
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

.back-btn {
  background-color: #D4C4B0;
  color: #333;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.back-btn:hover {
  background-color: #C0B098;
}

.filter-section {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.filter-section h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.filter-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #D4C4B0;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn.active {
  background-color: #A0826D;
  color: white;
  border-color: #A0826D;
}

.filter-btn:hover {
  background-color: #D4C4B0;
  color: #333;
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.video-item {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.video-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.video-item h4 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.video-item p {
  font-size: 1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 1rem;
}

.watch-btn {
  background-color: #A0826D;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.watch-btn:hover {
  background-color: #8B6954;
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
.error-message {
  text-align: center;
  padding: 4rem;
  background-color: #fff3f3;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.error-message p {
  color: #dc3545;
  margin-bottom: 1rem;
}

.retry-btn {
  background-color: #A0826D;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background-color: #8B6954;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 4rem;
  color: #6c757d;
}

@media (max-width: 768px) {
  .videos-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-buttons {
    flex-direction: column;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>