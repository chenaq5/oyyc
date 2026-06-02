<template>
  <div class="open-day-detail-view">
    <!-- 顶部横幅 -->
    <div class="banner">
      <div class="banner-content">
        <h1 class="banner-title">2025年校园开放日活动详情</h1>
        <p class="banner-subtitle">xxxxx实验室</p>
      </div>
    </div>
    
    <div class="container">
      <div class="content-section">
        <div class="intro">
          <div class="intro-icon">
            <i class="bi bi-lightbulb-fill"></i>
          </div>
          <p>为深入贯彻落实《教育部等十八部门关于加强新时代中小学科学教育工作的意见》及《福建省教育厅等十四个部门关于加强新时代中小学科学教育工作的二十条措施》文件精神，充分发挥高校在科学教育中的示范引领作用，推动青少年科学素养提升，xxx实验室特举办 2025 年中小学生开放日活动，依托实验室优质科研资源，为广大青少年带来集趣味性、互动性、实践性于一体的前沿科技体验。</p>
        </div>
        
        <div class="section">
          <div class="section-header">
            <i class="bi bi-calendar-fill section-icon"></i>
            <h2>开放活动时间</h2>
          </div>
          <div class="time-card">
            <p>2025年8月2日-8月3日（8:30-11:30，14:30-17:00）</p>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <i class="bi bi-geo-alt-fill section-icon"></i>
            <h2>开放活动地址</h2>
          </div>
          <div class="address-card">
            <p>xxxxx</p>
          </div>
        </div>
        
        <div class="section">
          <div class="section-header">
            <i class="bi bi-people-fill section-icon"></i>
            <h2>活动对象</h2>
          </div>
          <div class="audience-card">
            <p>主要受众为中小学生、大学生、研究生等科技爱好者</p>
          </div>
        </div>
        
        <div class="section">
          <div class="section-header">
            <i class="bi bi-bullseye section-icon"></i>
            <h2>参观目的</h2>
          </div>
          <ol class="purpose-list">
            <li class="purpose-item">
              <i class="bi bi-check-circle purpose-icon"></i>
              <span>了解计算机视觉与机器学习基础理论与应用场景；</span>
            </li>
            <li class="purpose-item">
              <i class="bi bi-check-circle purpose-icon"></i>
              <span>感受智能制造与机器人技术的魅力；</span>
            </li>
            <li class="purpose-item">
              <i class="bi bi-check-circle purpose-icon"></i>
              <span>培养对科学探究的兴趣与团队协作精神。</span>
            </li>
          </ol>
        </div>
        
        <div class="section">
          <div class="section-header">
            <i class="bi bi-activity section-icon"></i>
            <h2>活动内容</h2>
          </div>
          
          <div class="activity-container">
            <div class="activity-item">
              <div class="activity-header">
                <h3>1) 趣味互动智能技术（体验）</h3>
              </div>
              <div class="activity-content">
                <p><strong>地点：</strong>机电信息实验大楼B362。</p>
                <p><strong>内容：</strong>虚拟直播、声音克隆、视线追踪、手势隔空操控、图像动起来、openpose 骨架提取、三维手势检测、面部三维重建、人形机器人舞蹈等。</p>
              </div>
              <div class="activity-image">
                <img src="../assets/images/open-day-interactive.jpg" alt="趣味互动智能技术">
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-header">
                <h3>2) 智能制造视觉技术（演示）</h3>
              </div>
              <div class="activity-content">
                <p><strong>地点：</strong>机电信息实验大楼B351。</p>
                <p><strong>内容：</strong>线扫相机实验系统、深度学习图像深度估计、红外相机应用、Intel 深度相机应用、工件六维位姿检测及抓取分拣应用、手持 3D 扫描仪应用等。</p>
              </div>
              <div class="activity-image">
                <img src="../assets/images/open-day-manufacturing.jpg" alt="智能制造视觉技术">
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-header">
                <h3>3) 社会应用视觉技术（展示）</h3>
              </div>
              <div class="activity-content">
                <p><strong>地点：</strong>机电信息实验大楼B351。</p>
                <p><strong>内容：</strong>司机疲劳监测、车厢客流量统计等。</p><br>
              </div>
              <div class="activity-image">
                <img src="../assets/images/open-day-social.jpg" alt="社会应用视觉技术">
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-header">
                <h3>4) 智能网络技术（演示）</h3>
              </div>
              <div class="activity-content">
                <p><strong>地点：</strong>机电信息实验大楼B351。</p>
                <p><strong>内容：</strong>隔空能量传输。</p>
              </div>
              <div class="activity-image">
                <img src="../assets/images/open-day-network.jpg" alt="智能网络技术">
              </div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-header">
            <i class="bi bi-images section-icon"></i>
            <h2>活动现场照片</h2>
          </div>
          <div class="photos-container">
            <div class="photo-item">
              <img src="../assets/images/open-day-2025-1.jpg" alt="活动现场照片1">
            </div>
            <div class="photo-item">
              <img src="../assets/images/open-day-2025-2.jpg" alt="活动现场照片2">
            </div>
            <div class="photo-item">
              <img src="../assets/images/open-day-2025-3.jpg" alt="活动现场照片3">
            </div>
          </div>
        </div>
        
        <div class="back-btn-container">
          <router-link to="/experience" class="back-btn">
            <i class="bi bi-arrow-left"></i> 返回线下体验
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// OpenDayDetailView组件逻辑
</script>

<style scoped>
/* 校园开放日详情页面样式 */
.open-day-detail-view {
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* 顶部横幅 */
.banner {
  background: linear-gradient(135deg, #8B6954 0%, #6B4934 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.banner-content {
  max-width: 800px;
  margin: 0 auto;
  animation: fadeIn 1s ease-in-out;
}

.banner-title {
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.banner-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.content-section {
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-top: -3rem;
  position: relative;
  z-index: 10;
  animation: slideUp 0.8s ease-out;
}

/* 介绍部分 */
.intro {
  margin-bottom: 3rem;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #8B6954;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.intro-icon {
  font-size: 2rem;
  color: #8B6954;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.intro p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
  margin: 0;
  flex: 1;
}

/* 章节样式 */
.section {
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #8B6954;
}

.section-icon {
  font-size: 1.5rem;
  color: #8B6954;
  flex-shrink: 0;
}

.section h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.section p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 1rem;
}

/* 参观目的样式 */
.purpose-list {
  padding-left: 0;
  margin-bottom: 1rem;
  list-style: none;
}

.purpose-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.purpose-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.purpose-icon {
  font-size: 1.2rem;
  color: #28a745;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.purpose-item span {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
}

/* 时间和受众卡片 */
.time-card,
.audience-card,
.address-card {
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.time-icon,
.audience-icon,
.address-icon {
  font-size: 1.5rem;
  color: #8B6954;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.time-card p,
.audience-card p,
.address-card p {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
  flex: 1;
}

/* 活动内容样式 */
.activity-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.activity-item {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  border-left: 3px solid #D4C4B0;
  transition: all 0.3s ease;
  overflow: hidden;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .activity-container {
    grid-template-columns: 1fr;
  }
}

.activity-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.activity-header {
  margin-bottom: 1.5rem;
}

.activity-icon {
  font-size: 1.5rem;
  color: #8B6954;
  flex-shrink: 0;
}

.activity-item h3 {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.activity-content {
  margin-bottom: 1.5rem;
}

.activity-content p {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
}

.activity-image {
  margin-top: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.activity-image:hover {
  transform: scale(1.02);
}

.activity-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* 照片展示样式 */
.photos-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.photo-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 250px;
}

.photo-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.photo-item:hover img {
  transform: scale(1.05);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .photos-container {
    grid-template-columns: 1fr;
  }
  
  .photo-item {
    height: 300px;
  }
}

.activity-image:hover img {
  transform: scale(1.05);
}

/* 活动要求样式 */
.requirements-list {
  padding-left: 0;
  margin-bottom: 1rem;
  list-style: none;
}

.requirement-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.requirement-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.requirement-icon {
  font-size: 1.2rem;
  color: #dc3545;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.requirement-item span {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
}

/* 返回按钮 */
.back-btn-container {
  margin-top: 4rem;
  text-align: center;
  animation: fadeIn 1s ease-in-out;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #8B6954;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(139, 105, 84, 0.2);
}

.back-btn:hover {
  background-color: #6B4934;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(139, 105, 84, 0.3);
  color: white;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .banner {
    padding: 4rem 0;
  }
  
  .banner-title {
    font-size: 2.2rem;
  }
  
  .content-section {
    padding: 2rem;
    margin-top: -2rem;
  }
  
  .intro {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .activity-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .time-card,
  .audience-card,
  .address-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .purpose-item,
  .requirement-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .section h2 {
    font-size: 1.3rem;
  }
  
  .activity-item h3 {
    font-size: 1.2rem;
  }
  
  .section p,
  .purpose-item span,
  .requirement-item span {
    font-size: 1rem;
  }
}
</style>