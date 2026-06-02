<template>
  <div class="diy-view">
    <div class="container">
      <h1 class="page-title">木偶DIY创作</h1>
      <p class="page-description">发挥创意，设计属于你的独特木偶形象，AI辅助优化</p>
      
      <div class="diy-section">
        <div class="diy-container">
          <!-- 左侧：DIY创作区域 -->
          <div class="diy-creation">
            <h2>创作你的木偶</h2>
            
            <!-- 木偶类型选择 -->
            <div class="puppet-type-section">
              <h3>选择木偶类型</h3>
              <div class="type-buttons">
                <button 
                  v-for="type in puppetTypes" 
                  :key="type.value"
                  :class="['type-btn', { active: selectedType === type.value }]"
                  @click="selectedType = type.value"
                >
                  {{ type.label }}
                </button>
              </div>
            </div>
            
            <!-- 木偶设计参数 -->
            <div class="design-params">
              <h3>设计参数</h3>
              
              <!-- 基础参数 -->
              <div class="param-group">
                <label>木偶名称</label>
                <input type="text" v-model="puppetName" placeholder="输入木偶名称">
              </div>
              
              <div class="param-group">
                <label>风格</label>
                <select v-model="puppetStyle">
                  <option value="traditional">传统风格</option>
                  <option value="modern">现代风格</option>
                  <option value="fantasy">奇幻风格</option>
                  <option value="cartoon">卡通风格</option>
                </select>
              </div>
              
              <div class="param-group">
                <label>材质</label>
                <select v-model="puppetMaterial">
                  <option value="wood">木材</option>
                  <option value="cloth">布料</option>
                  <option value="paper">纸张</option>
                  <option value="mixed">混合材质</option>
                </select>
              </div>
              
              <div class="param-group">
                <label>颜色方案</label>
                <div class="color-picker">
                  <div 
                    v-for="color in colorOptions" 
                    :key="color"
                    :class="['color-option', { active: selectedColors.includes(color) }]"
                    :style="{ backgroundColor: color }"
                    @click="toggleColor(color)"
                  ></div>
                </div>
              </div>
              
              <div class="param-group">
                <label>尺寸</label>
                <input type="range" v-model="puppetSize" min="10" max="100" step="5">
                <span>{{ puppetSize }}cm</span>
              </div>
              
              <div class="param-group">
                <label>复杂度</label>
                <input type="range" v-model="puppetComplexity" min="1" max="10" step="1">
                <span>{{ getComplexityText(puppetComplexity) }}</span>
              </div>
            </div>
            
            <!-- 木偶素材选择 -->
            <div class="material-selection">
              <h3>素材选择</h3>
              
              <!-- 头部素材 -->
              <div class="material-group">
                <label>头部</label>
                <div class="material-grid">
                  <div 
                    v-for="head in headMaterials" 
                    :key="head.name"
                    :class="['material-item', { active: selectedMaterials.head === head.name }]"
                    @click="selectMaterial('head', head.name)"
                  >
                    <img :src="head.url" :alt="head.name">
                    <span>{{ head.name }}</span>
                  </div>
                </div>
              </div>
              
              <!-- 服装素材 -->
              <div class="material-group">
                <label>服装</label>
                <div class="material-grid">
                  <div 
                    v-for="cloth in clothMaterials" 
                    :key="cloth.name"
                    :class="['material-item', { active: selectedMaterials.cloth === cloth.name }]"
                    @click="selectMaterial('cloth', cloth.name)"
                  >
                    <img :src="cloth.url" :alt="cloth.name">
                    <span>{{ cloth.name }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 特征描述 -->
            <div class="feature-description">
              <h3>特征描述</h3>
              <textarea 
                v-model="featureDescription" 
                placeholder="描述你的木偶特征，如面部表情、服装、装饰等..."
                rows="4"
              ></textarea>
            </div>
            
            <!-- 动作设计 -->
            <div class="action-design">
              <h3>动作设计</h3>
              <div class="action-options">
                <label v-for="action in actionOptions" :key="action">
                  <input type="checkbox" v-model="selectedActions" :value="action">
                  {{ action }}
                </label>
              </div>
            </div>
            
            <!-- 生成按钮 -->
            <div class="action-buttons">
              <button class="generate-btn" @click="generatePuppet">
                <i class="bi bi-magic"></i>
                生成木偶设计
              </button>
              <button class="reset-btn" @click="resetForm">
                <i class="bi bi-arrow-clockwise"></i>
                重置
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 木偶类型选项
const puppetTypes = [
  { label: '提线木偶', value: 'string' },
  { label: '杖头木偶', value: 'rod' },
  { label: '布袋木偶', value: 'bag' },
  { label: '铁枝木偶', value: 'iron' }
];

// 颜色选项
const colorOptions = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

// 动作选项
const actionOptions = ['点头', '摇头', '挥手', '走路', '跳跃', '鞠躬', '眨眼', '张嘴'];

// 状态管理
const selectedType = ref('string');
const puppetName = ref('');
const puppetStyle = ref('traditional');
const puppetMaterial = ref('wood');
const selectedColors = ref([]);
const puppetSize = ref(30);
const puppetComplexity = ref(5);
const featureDescription = ref('');
const selectedActions = ref([]);
const generatedPuppet = ref(null);

// 素材数据
const headMaterials = ref([
  { name: '丑角头', url: new URL('../assets/images/丑角头.jpg', import.meta.url).href },
  { name: '书生头', url: new URL('../assets/images/书生头.jpg', import.meta.url).href },
  { name: '花旦头', url: new URL('../assets/images/花旦头.jpg', import.meta.url).href },
  { name: '武将头', url: new URL('../assets/images/武将头.jpg', import.meta.url).href }
]);

const clothMaterials = ref([
  { name: '短打装束', url: new URL('../assets/images/短打装束.jpg', import.meta.url).href },
  { name: '文生长袍', url: new URL('../assets/images/文生长袍.jpg', import.meta.url).href },
  { name: '花旦戏服', url: new URL('../assets/images/花旦戏服.jpg', import.meta.url).href },
  { name: '武将盔甲', url: new URL('../assets/images/武将盔甲.jpg', import.meta.url).href }
]);

// 选中的素材
const selectedMaterials = ref({
  head: '',
  cloth: ''
});

// 复杂度文本
const getComplexityText = (value) => {
  const complexityLevels = ['非常简单', '简单', '中等简单', '中等', '中等复杂', '复杂', '比较复杂', '非常复杂', '极其复杂', '大师级'];
  return complexityLevels[value - 1];
};

// 切换颜色选择
const toggleColor = (color) => {
  const index = selectedColors.value.indexOf(color);
  if (index === -1) {
    selectedColors.value.push(color);
  } else {
    selectedColors.value.splice(index, 1);
  }
};

// 选择素材
const selectMaterial = (type, name) => {
  selectedMaterials.value[type] = selectedMaterials.value[type] === name ? '' : name;
};

// 生成木偶设计
const generatePuppet = async () => {
  try {
    // 构建请求数据
    const puppetData = {
      type: selectedType.value,
      name: puppetName.value || '未命名木偶',
      style: puppetStyle.value,
      material: puppetMaterial.value,
      colors: selectedColors.value,
      size: puppetSize.value,
      complexity: puppetComplexity.value,
      features: featureDescription.value,
      actions: selectedActions.value
    };
    
    // 生成木偶数据
    generatedPuppet.value = {
      name: puppetData.name,
      type: puppetTypes.find(t => t.value === puppetData.type).label,
      style: getStyleText(puppetData.style),
      material: getMaterialText(puppetData.material),
      description: '根据您的参数生成了木偶设计',
      colors: puppetData.colors,
      size: puppetData.size,
      actions: puppetData.actions
    };
  } catch (error) {
    console.error('生成木偶失败:', error);
  }
};

// 重置表单
const resetForm = () => {
  selectedType.value = 'string';
  puppetName.value = '';
  puppetStyle.value = 'traditional';
  puppetMaterial.value = 'wood';
  selectedColors.value = [];
  puppetSize.value = 30;
  puppetComplexity.value = 5;
  featureDescription.value = '';
  selectedActions.value = [];
  generatedPuppet.value = null;
  selectedMaterials.value = {
    head: '',
    cloth: ''
  };
};

// 辅助函数：获取风格文本
const getStyleText = (style) => {
  const styleMap = {
    traditional: '传统风格',
    modern: '现代风格',
    fantasy: '奇幻风格',
    cartoon: '卡通风格'
  };
  return styleMap[style] || style;
};

// 辅助函数：获取材质文本
const getMaterialText = (material) => {
  const materialMap = {
    wood: '木材',
    cloth: '布料',
    paper: '纸张',
    mixed: '混合材质'
  };
  return materialMap[material] || material;
};
</script>

<style scoped>
/* 木偶DIY页面样式 */
.diy-view {
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

.diy-section {
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.diy-container {
  display: flex;
  gap: 3rem;
}

/* 左侧创作区域 */
.diy-creation {
  flex: 1;
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
}

.diy-creation h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
}

.puppet-type-section {
  margin-bottom: 2rem;
}

.puppet-type-section h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.type-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.type-btn {
  background-color: white;
  color: #333;
  border: 1px solid #D4C4B0;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-btn.active {
  background-color: #A0826D;
  color: white;
  border-color: #A0826D;
}

.type-btn:hover {
  background-color: #D4C4B0;
  color: #333;
}

/* 设计参数区域 */
.design-params {
  margin-bottom: 2rem;
}

.design-params h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.param-group {
  margin-bottom: 1.5rem;
}

.param-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.param-group input[type="text"],
.param-group select,
.param-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.param-group input[type="text"]:focus,
.param-group select:focus,
.param-group textarea:focus {
  outline: none;
  border-color: #A0826D;
  box-shadow: 0 0 0 0.2rem rgba(160, 130, 109, 0.25);
}

.param-group textarea {
  resize: vertical;
  min-height: 100px;
}

/* 颜色选择器 */
.color-picker {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.color-option {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border-color: #333;
  transform: scale(1.1);
}

/* 滑块样式 */
.param-group input[type="range"] {
  width: 100%;
  margin: 0.5rem 0;
}

.param-group span {
  display: block;
  text-align: center;
  color: #6c757d;
  font-size: 0.9rem;
}

/* 动作设计 */
.action-design {
  margin-bottom: 2rem;
}

.action-design h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.action-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
}

.action-options label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  color: #333;
  cursor: pointer;
}

/* 素材选择 */
.material-selection {
  margin-bottom: 2rem;
}

.material-selection h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.material-group {
  margin-bottom: 1.5rem;
}

.material-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.material-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.material-item {
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 0.5rem;
}

.material-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.material-item.active {
  border-color: #A0826D;
  background-color: rgba(160, 130, 109, 0.1);
}

.material-item img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 0.5rem;
  border-radius: 3px;
}

.material-item span {
  display: block;
  font-size: 0.85rem;
  color: #333;
  font-weight: 500;
}

/* 动作按钮 */
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.generate-btn,
.reset-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;
}

.generate-btn {
  background-color: #A0826D;
  color: white;
}

.generate-btn:hover {
  background-color: #8B6954;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(160, 130, 109, 0.3);
}

.reset-btn {
  background-color: #D4C4B0;
  color: #333;
}

.reset-btn:hover {
  background-color: #C0B098;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(212, 196, 176, 0.3);
}

/* 右侧AI辅助区域 */
.ai-assistant {
  flex: 1;
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
}

.ai-assistant h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
}

/* 预览区域 */
.preview-section {
  margin-bottom: 2rem;
}

.preview-section h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.puppet-preview {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.preview-image {
  width: 100%;
  height: 200px;
  background-color: #f8f9fa;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.image-placeholder {
  text-align: center;
  color: #6c757d;
}

.image-placeholder i {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.preview-info h4 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.preview-info p {
  font-size: 1rem;
  line-height: 1.5;
  color: #6c757d;
  margin-bottom: 1rem;
}

.preview-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.preview-tags .tag {
  background-color: #D4C4B0;
  color: #333;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

/* 聊天区域 */
.chat-section {
  height: 400px;
  display: flex;
  flex-direction: column;
}

.chat-section h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.chat-messages {
  flex: 1;
  background-color: white;
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 1rem;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.chat-message {
  margin-bottom: 1rem;
  max-width: 80%;
}

.chat-message.user {
  align-self: flex-end;
  margin-left: auto;
}

.chat-message.ai {
  align-self: flex-start;
}

.message-content {
  padding: 0.75rem 1rem;
  border-radius: 10px;
}

.chat-message.user .message-content {
  background-color: #E8F5E8;
  border-bottom-right-radius: 0;
}

.chat-message.ai .message-content {
  background-color: #F3E5F5;
  border-bottom-left-radius: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}

.message-role {
  font-weight: bold;
  color: #333;
}

.message-time {
  color: #6c757d;
}

.message-text {
  font-size: 0.95rem;
  line-height: 1.4;
  color: #333;
}

/* 聊天输入 */
.chat-input {
  display: flex;
  gap: 0.5rem;
}

.chat-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.chat-input input:focus {
  outline: none;
  border-color: #A0826D;
  box-shadow: 0 0 0 0.2rem rgba(160, 130, 109, 0.25);
}

.send-btn {
  background-color: #A0826D;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn:hover {
  background-color: #8B6954;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(160, 130, 109, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .diy-container {
    flex-direction: column;
  }
  
  .diy-section {
    padding: 2rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .type-buttons {
    justify-content: center;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .chat-section {
    height: 300px;
  }
}
</style>