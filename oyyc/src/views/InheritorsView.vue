<template>
  <div class="inheritors-view">
    <div class="container">
      <h1 class="page-title">非遗传承人</h1>
      <p class="page-description">了解木偶艺术的传承大师</p>
      
      <button class="back-btn" @click="goBack">
        <i class="bi bi-arrow-left"></i> 返回偶之韵
      </button>
      
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
      
      <div class="inheritors-grid">
        <div 
          v-for="inheritor in filteredInheritors" 
          :key="inheritor.name"
          class="inheritor-item"
        >
          <div class="inheritor-avatar">{{ inheritor.name.charAt(0) }}</div>
          <h4>{{ inheritor.name }}</h4>
          <p>{{ inheritor.title }}</p>
          <p>{{ inheritor.description }}</p>
          <button class="detail-btn" @click="viewDetail('inheritor', inheritor.name)">查看详情</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedFilter = ref('all');

// 传承人数据
const inheritors = [
  {
    name: '陈应鸿',
    title: '国家级非物质文化遗产传承人',
    type: '提线木偶',
    description: '福建泉州人，从事提线木偶艺术60余年，技艺精湛，是提线木偶的代表性传承人。'
  },
  {
    name: '李立群',
    title: '省级非物质文化遗产传承人',
    type: '杖头木偶',
    description: '陕西西安人，杖头木偶表演艺术家，致力于传统木偶艺术的创新与传承。'
  },
  {
    name: '黄美香',
    title: '国家级非物质文化遗产传承人',
    type: '布袋木偶',
    description: '福建漳州人，布袋木偶表演大师，擅长传统布袋木偶的制作与表演。'
  },
  {
    name: '张伟明',
    title: '市级非物质文化遗产传承人',
    type: '铁枝木偶',
    description: '广东潮州人，铁枝木偶表演艺术家，擅长传统铁枝木偶的表演。'
  },
  {
    name: '王桂香',
    title: '省级非物质文化遗产传承人',
    type: '提线木偶',
    description: '四川成都人，提线木偶制作技艺传承人，作品精美，远销海内外。'
  },
  {
    name: '刘建国',
    title: '市级非物质文化遗产传承人',
    type: '布袋木偶',
    description: '福建泉州人，布袋木偶表演艺术家，擅长喜剧表演，深受观众喜爱。'
  }
];

// 筛选选项
const filters = [
  { label: '全部', value: 'all' },
  { label: '提线木偶', value: '提线木偶' },
  { label: '杖头木偶', value: '杖头木偶' },
  { label: '布袋木偶', value: '布袋木偶' },
  { label: '铁枝木偶', value: '铁枝木偶' }
];

// 过滤后的传承人
const filteredInheritors = computed(() => {
  if (selectedFilter.value === 'all') {
    return inheritors;
  }
  return inheritors.filter(inheritor => inheritor.type === selectedFilter.value);
});

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
</script>

<style scoped>
.inheritors-view {
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

.inheritors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.inheritor-item {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
}

.inheritor-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.inheritor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4C4B0 0%, #A0826D 100%);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto 1.5rem;
}

.inheritor-item h4 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.inheritor-item p {
  font-size: 1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 1rem;
}

.detail-btn {
  background-color: #A0826D;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.detail-btn:hover {
  background-color: #8B6954;
}

@media (max-width: 768px) {
  .inheritors-grid {
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