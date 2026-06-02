<template>
  <div class="detail-view quanzhou-detail">
    <!-- 头部横幅 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>泉州提线木偶戏</h1>
      </div>
    </div>

    <div class="container">
      <!-- 概览卡片 -->
      <div class="overview-cards">
        <div class="overview-card">
          <i class="bi bi-star"></i>
          <div class="card-content">
            <h3>别称</h3>
            <p>线偶、悬丝傀儡</p>
          </div>
        </div>
        <div class="overview-card">
          <i class="bi bi-ruler"></i>
          <div class="card-content">
            <h3>体型</h3>
            <p>30~80cm</p>
          </div>
        </div>
        <div class="overview-card">
          <i class="bi bi-music-note"></i>
          <div class="card-content">
            <h3>曲牌调</h3>
            <p>近300支</p>
          </div>
        </div>
        <div class="overview-card">
          <i class="bi bi-book-open"></i>
          <div class="card-content">
            <h3>传统剧目</h3>
            <p>700余出</p>
          </div>
        </div>
      </div>

      <!-- 图片展示区 -->
      <div class="gallery-section">
        <h2 class="section-title">精彩瞬间</h2>
        <div class="image-gallery">
          <div class="gallery-item">
            <img src="/src/assets/images/泉州提线木偶戏1.png" alt="泉州提线木偶戏表演">
            <div class="gallery-caption">传统剧目表演</div>
          </div>
          <div class="gallery-item">
            <img src="/src/assets/images/泉州提线木偶戏2.png" alt="泉州提线木偶戏">
            <div class="gallery-caption">精细的木偶造型</div>
          </div>
          <div class="gallery-item">
            <img src="/src/assets/images/泉州提线木偶戏3.png" alt="泉州提线木偶戏演出">
            <div class="gallery-caption">舞台演出场景</div>
          </div>
        </div>
      </div>

      <!-- 核心特征 -->
      <div class="feature-section">
        <h2 class="section-title">核心造型特征</h2>
        <div class="feature-content">
          <div class="feature-text">
            <p>全身立体人偶，头部、躯干、四肢完整，多为实木雕刻，体型一般30~80cm，关节灵活。</p>
            <p>头顶、背部、四肢绑有提线，由上方线板操控，是结构最复杂、造型最精致的木偶品类。</p>
          </div>
        </div>
      </div>

      <!-- 面部服饰 -->
      <div class="style-section">
        <h2 class="section-title">面部/服饰造型</h2>
        <div class="style-grid">
          <div class="style-item">
            <div class="style-icon">🎭</div>
            <h4>脸谱化雕刻</h4>
            <p>生旦净丑行当齐全，表情细腻传神</p>
          </div>
          <div class="style-item">
            <div class="style-icon">👑</div>
            <h4>头饰华丽</h4>
            <p>精美的头饰装饰，彰显人物身份</p>
          </div>
          <div class="style-item">
            <div class="style-icon">🧵</div>
            <h4>刺绣精致</h4>
            <p>服饰仿戏曲戏服，刺绣工艺精湛</p>
          </div>
          <div class="style-item">
            <div class="style-icon">👥</div>
            <h4>角色丰富</h4>
            <p>古典戏曲人物、神话角色、历史人物</p>
          </div>
        </div>
      </div>

      <!-- 代表剧目 -->
      <div class="drama-section">
        <h2 class="section-title">代表剧目</h2>
        <div class="drama-list">
          <div class="drama-item" v-for="drama in dramas" :key="drama.title">
            <div class="drama-icon">{{ drama.icon }}</div>
            <div class="drama-info">
              <h4>{{ drama.title }}</h4>
              <p>{{ drama.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 唱腔特色 -->
      <div class="music-section">
        <h2 class="section-title">唱腔特色</h2>
        <div class="music-content">
          <p>泉州提线木偶戏有自己的剧种唱腔，完整保存了将近300支曲牌调。唱腔糅合南音和闽南的地方音乐，保留了古乐器的演奏技法，情韵深沉清丽。</p>
          <p>乐器以小唢呐为主，配以钲、锣、拍、南鼓等打击乐器，声腔高亢，跌宕多变。</p>
          <p>说白念唱以泉州方言为主，有时夹杂"官话"（土腔普通话），俗称"傀儡调"；间或穿插有腔无字的传统帮腔，如"唠哩"。</p>
        </div>
      </div>

      <!-- 返回按钮 -->
      <div class="back-button-container">
        <button class="back-button" @click="goBack">
          <i class="bi bi-arrow-left"></i> 返回偶之韵
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const dramas = [
  { title: '《火焰山》', icon: '🔥', description: '改编自《西游记》，讲述孙悟空三借芭蕉扇的故事' },
  { title: '《水漫金山》', icon: '💧', description: '取材自《白蛇传》，白娘子水漫金山寺' },
  { title: '《目连救母》', icon: '🙏', description: '讲述目连历经艰险救母出地狱的佛教故事' },
  { title: '《刘秀中兴》', icon: '👑', description: '讲述汉光武帝刘秀复兴汉室的历史故事' }
];

const goBack = () => {
  router.push('/rhythm');
};
</script>

<style scoped>
.detail-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f3ef 0%, #e8e4dc 100%);
}

.hero-section {
  position: relative;
  height: 40px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 40px;
  max-height: 40px;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
}

.hero-content h1 {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #D4C4B0, #8B6954);
  border-radius: 2px;
}

/* 概览卡片 */
.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.overview-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.overview-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.overview-card i {
  font-size: 2rem;
  color: #8B6954;
}

.card-content h3 {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 0.3rem;
}

.card-content p {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

/* 图片展示区 */
.gallery-section {
  margin-bottom: 4rem;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  aspect-ratio: 4/3;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.gallery-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 1rem;
  font-size: 0.9rem;
}

/* 核心特征 */
.feature-section {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;
}

.feature-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.feature-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.feature-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1rem;
}

/* 风格特色 */
.style-section {
  margin-bottom: 4rem;
}

.style-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.style-item {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.style-item:hover {
  transform: translateY(-5px);
}

.style-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.style-item h4 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.style-item p {
  font-size: 0.95rem;
  color: #6c757d;
  margin: 0;
}

/* 代表剧目 */
.drama-section {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;
}

.drama-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.drama-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
  transition: background 0.3s ease;
}

.drama-item:hover {
  background: #f0ebe6;
}

.drama-icon {
  font-size: 2.5rem;
}

.drama-info h4 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.drama-info p {
  font-size: 0.95rem;
  color: #6c757d;
  margin: 0;
}

/* 唱腔特色 */
.music-section {
  margin-bottom: 4rem;
}

.music-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.music-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1rem;
}

.music-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* 返回按钮 */
.back-button-container {
  text-align: center;
  margin-top: 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #8B6954, #6B4934);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(139, 105, 84, 0.4);
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }

  .image-gallery {
    grid-template-columns: 1fr;
  }

  .gallery-item.main {
    grid-row: span 1;
  }

  .feature-content,
  .music-content {
    grid-template-columns: 1fr;
  }

  .overview-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>