<template>
  <div class="detail-view jinjiang-detail">
    <!-- 头部横幅 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>晋江布袋木偶戏</h1>
      </div>
    </div>

    <div class="container">
      <!-- 概览卡片 -->
      <div class="overview-cards">
        <div class="overview-card">
          <i class="bi bi-star"></i>
          <div class="card-content">
            <h3>别称</h3>
            <p>掌中木偶戏</p>
          </div>
        </div>
        <div class="overview-card">
          <i class="bi bi-ruler"></i>
          <div class="card-content">
            <h3>体型</h3>
            <p>约7寸</p>
          </div>
        </div>
        <div class="overview-card">
          <i class="bi bi-music-note"></i>
          <div class="card-content">
            <h3>曲牌调</h3>
            <p>200余支</p>
          </div>
        </div>
        <div class="overview-card">
          <i class="bi bi-calendar"></i>
          <div class="card-content">
            <h3>起源</h3>
            <p>明嘉靖年间</p>
          </div>
        </div>
      </div>

      <!-- 图片展示区 -->
      <div class="gallery-section">
        <h2 class="section-title">精彩瞬间</h2>
        <div class="image-gallery">
          <div class="gallery-item">
            <img src="/src/assets/images/晋江布袋木偶戏1.jpg" alt="晋江布袋木偶戏">
            <div class="gallery-caption">掌中表演</div>
          </div>
          <div class="gallery-item main">
            <img src="/src/assets/images/晋江布袋木偶戏2.jpg" alt="晋江布袋木偶戏演出">
            <div class="gallery-caption">精彩演出</div>
          </div>
          <div class="gallery-item">
            <img src="/src/assets/images/晋江布袋木偶戏3.jpg" alt="晋江布袋木偶戏">
            <div class="gallery-caption">精美木偶</div>
          </div>
        </div>
      </div>

      <!-- 历史起源 -->
      <div class="history-section">
        <h2 class="section-title">历史起源与发展</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h4>晋代</h4>
              <p>源头可追溯到晋代《拾遗记》及五代《化书》、南宋《巳末元日》中的史料记载</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h4>明嘉靖年间</h4>
              <p>布袋戏兴起，创始人为被誉为"戏状元"的梁炳麟</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h4>清中叶</h4>
              <p>晋江等地的布袋戏演出兴盛，并传至台湾，出现李克茶等著名艺人</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <h4>当代</h4>
              <p>晋江市掌中木偶戏剧团多次进京演出，获得省级、国家级奖誉</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 艺术特色 -->
      <div class="feature-section">
        <h2 class="section-title">艺术特色</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">🎭</div>
            <h3>行当脚色分工细致</h3>
            <p>生旦净丑行当齐全，角色类型丰富多样</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">✋</div>
            <h3>掌中表演技艺</h3>
            <p>木偶造型最小，仅有7寸左右，靠艺人两手托举表演</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👤</div>
            <h3>木偶头雕刻精湛</h3>
            <p>形神兼备，面部表情细腻传神</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎵</div>
            <h3>泉腔演唱</h3>
            <p>以泉腔演唱，有别于唱北调的漳州北派布袋戏</p>
          </div>
        </div>
      </div>

      <!-- 演出形式对比 -->
      <div class="compare-section">
        <h2 class="section-title">木偶戏演出形式对比</h2>
        <div class="compare-table">
          <table>
            <thead>
              <tr>
                <th>类型</th>
                <th>高度</th>
                <th>操控方式</th>
                <th>特点</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>提线木偶</td>
                <td>2.2尺左右</td>
                <td>提线操控，最多可达三十多条线</td>
                <td>造型较高，表演复杂</td>
              </tr>
              <tr>
                <td>杖头木偶</td>
                <td>3尺左右</td>
                <td>三条操作线，双手+头部</td>
                <td>操作灵活</td>
              </tr>
              <tr>
                <td>布袋木偶</td>
                <td>7寸左右</td>
                <td>两手托举表演</td>
                <td>造型最小，技艺特别</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 代表剧目 -->
      <div class="drama-section">
        <h2 class="section-title">获奖剧目</h2>
        <div class="drama-grid">
          <div class="drama-card">
            <div class="drama-badge">文化部嘉奖</div>
            <h3>《白龙公主》</h3>
            <p>荣获文化部嘉奖</p>
          </div>
          <div class="drama-card">
            <div class="drama-badge">文华奖</div>
            <h3>《五里长虹》</h3>
            <p>获得第九届文华奖</p>
          </div>
        </div>
      </div>

      <!-- 保护现状 -->
      <div class="protection-section">
        <div class="protection-content">
          <div class="protection-icon">⚠️</div>
          <div class="protection-text">
            <h3>保护现状</h3>
            <p>南派布袋戏具有兼收并蓄、博采众长的特点，地域文化特征明显。其艺术风格独特，行当脚色分工细致，木偶头雕刻形神兼备，表演细腻，动作传神，深受广大观众的喜爱。但由于受到当前商品经济的影响，这一传统的艺术形式遭到不断冲击，如不加以保护，将面临消亡的危机。</p>
          </div>
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

const goBack = () => {
  router.push('/rhythm');
};
</script>

<style scoped>
.detail-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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
  background: linear-gradient(90deg, #6B8E6B, #4A6B4A);
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
  color: #6B8E6B;
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

/* 历史时间线 */
.history-section {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0.5rem;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #6B8E6B, #4A6B4A);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -1.65rem;
  top: 0.3rem;
  width: 20px;
  height: 20px;
  background: #6B8E6B;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(107, 142, 107, 0.4);
}

.timeline-content {
  flex: 1;
}

.timeline-content h4 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.timeline-content p {
  font-size: 0.95rem;
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
}

/* 艺术特色 */
.feature-section {
  margin-bottom: 4rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.95rem;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
}

/* 对比表格 */
.compare-section {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;
}

.compare-table {
  overflow-x: auto;
}

.compare-table table {
  width: 100%;
  border-collapse: collapse;
}

.compare-table th,
.compare-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.compare-table th {
  background: #f8f9fa;
  font-weight: bold;
  color: #333;
}

.compare-table tr:hover {
  background: #f8f9fa;
}

/* 获奖剧目 */
.drama-section {
  margin-bottom: 4rem;
}

.drama-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.drama-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  position: relative;
}

.drama-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #6B8E6B, #4A6B4A);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.drama-card h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}

.drama-card p {
  font-size: 0.95rem;
  color: #6c757d;
  margin: 0;
}

/* 保护现状 */
.protection-section {
  background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
  padding: 3rem;
  border-radius: 16px;
  margin-bottom: 4rem;
}

.protection-content {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.protection-icon {
  font-size: 3rem;
}

.protection-text h3 {
  font-size: 1.3rem;
  color: #8B6954;
  margin-bottom: 1rem;
}

.protection-text p {
  font-size: 1rem;
  color: #555;
  line-height: 1.8;
  margin: 0;
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
  background: linear-gradient(135deg, #6B8E6B, #4A6B4A);
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
  box-shadow: 0 4px 15px rgba(107, 142, 107, 0.4);
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

  .protection-content {
    flex-direction: column;
  }

  .overview-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>