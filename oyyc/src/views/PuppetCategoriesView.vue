<template>
  <div class="puppet-categories-view">
    <div class="container">
      <h1 class="page-title">木偶类别展示</h1>
      <p class="page-description">探索不同类型的木偶艺术</p>
      
      <button class="back-btn" @click="goBack">
        <i class="bi bi-arrow-left"></i> 返回偶之韵
      </button>
      
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="error" class="error-container">
        <p class="error-message">{{ error }}</p>
        <button class="btn btn-primary" @click="fetchPuppets">重新加载</button>
      </div>
      
      <!-- 木偶类别列表 -->
      <div v-else class="categories-grid">
        <div v-for="puppet in puppets" :key="puppet._id" class="category-item">
          <div v-if="puppet.image_url" class="category-image">
            <img :src="puppet.image_url" :alt="puppet.name" class="image">
          </div>
          <h4>{{ puppet.name }}</h4>
          <p>{{ puppet.description }}</p>
          <div v-if="puppet.region" class="category-region">
            <span class="region-label">地区:</span>
            <span class="region-value">{{ puppet.region }}</span>
          </div>
          <button class="detail-btn" @click="viewDetail('puppet', puppet.name)">查看详情</button>
        </div>
        
        <!-- 无数据状态 -->
        <div v-if="puppets.length === 0" class="no-data">
          <p>暂无木偶类别数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const puppets = ref([]);
const loading = ref(true);
const error = ref(null);

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

// 获取木偶类别数据
const fetchPuppets = () => {
  loading.value = true;
  error.value = null;
  
  if (typeof window !== 'undefined' && window.CloudService && window.BaaS) {
    // 直接使用BaaS的查询构建器
    const getAllPuppets = async () => {
      let allPuppets = [];
      let offset = 0;
      const limit = 100; // 每页获取100条
      let hasMore = true;
      
      while (hasMore) {
        try {
          const Puppet = new window.BaaS.TableObject('puppets');
          const query = new window.BaaS.Query();
          const res = await Puppet.setQuery(query).limit(limit).offset(offset).find();
          const puppetsPage = res.data.objects;
          allPuppets = [...allPuppets, ...puppetsPage];
          
          // 检查是否还有更多数据
          hasMore = puppetsPage.length === limit;
          offset += limit;
        } catch (err) {
          console.error('获取分页数据失败', err);
          throw err;
        }
      }
      
      return allPuppets;
    };
    
    getAllPuppets().then(allPuppets => {
      console.log('获取所有木偶类别数据成功', allPuppets);
      puppets.value = allPuppets;
      loading.value = false;
    }).catch(err => {
      console.error('获取木偶类别数据失败', err);
      error.value = '获取数据失败，请稍后重试';
      loading.value = false;
    });
  } else {
    // 模拟数据
    puppets.value = [
      {
        _id: '1',
        name: '提线木偶',
        description: '提线木偶是一种传统的木偶形式，通过丝线控制木偶的动作，表现力丰富，历史悠久。主要分布在福建、广东等地，是中国木偶戏的重要代表。',
        region: '福建、广东',
        image_url: ''
      },
      {
        _id: '2',
        name: '杖头木偶',
        description: '杖头木偶是中国传统木偶戏的主要形式之一，通过木杖控制木偶的头部和手部动作。流行于北京、陕西、四川等地，表演风格多样。',
        region: '北京、陕西、四川',
        image_url: ''
      },
      {
        _id: '3',
        name: '布袋木偶',
        description: '布袋木偶又称掌中木偶，演员通过手掌控制木偶，动作灵活，表演细腻。主要流行于福建泉州、漳州等地，是闽南文化的重要组成部分。',
        region: '福建泉州、漳州',
        image_url: ''
      },
      {
        _id: '4',
        name: '铁枝木偶',
        description: '铁枝木偶是广东潮州等地的传统木偶形式，通过铁枝控制木偶的动作。表演风格独特，具有浓郁的地方特色。',
        region: '广东潮州',
        image_url: ''
      },
      {
        _id: '5',
        name: '药发木偶',
        description: '药发木偶是浙江泰顺等地的传统木偶形式，通过火药爆炸来展示木偶。表演场面壮观，具有独特的艺术魅力。',
        region: '浙江泰顺',
        image_url: ''
      },
      {
        _id: '6',
        name: '现代创新木偶',
        description: '现代创新木偶是在传统木偶基础上发展而来的新形式，融合了现代科技和艺术元素，为传统木偶艺术注入了新的活力。',
        region: '全国',
        image_url: ''
      }
    ];
    loading.value = false;
  }
};

// 页面加载时获取数据
onMounted(() => {
  fetchPuppets();
});
</script>

<style scoped>
.puppet-categories-view {
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

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #A0826D;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误状态 */
.error-container {
  text-align: center;
  padding: 4rem 0;
}

.error-message {
  color: #dc3545;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

/* 无数据状态 */
.no-data {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 0;
  color: #6c757d;
  font-size: 1.1rem;
}

/* 木偶类别网格 */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.category-item {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 350px;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* 类别图片 */
.category-image {
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  height: 200px;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-item:hover .image {
  transform: scale(1.05);
}

.category-item h4 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.category-item p {
  font-size: 1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 1.5rem;
}

/* 地区信息 */
.category-region {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #6c757d;
}

.region-label {
  font-weight: 500;
  margin-right: 0.5rem;
}

.detail-btn {
  background-color: #A0826D;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  align-self: flex-start;
}

.detail-btn:hover {
  background-color: #8B6954;
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .category-image {
    height: 150px;
  }
}
</style>