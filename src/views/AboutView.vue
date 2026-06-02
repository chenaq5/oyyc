<template>
  <div class="about-view">
    <div class="container">
      <h1 class="page-title">关于我们</h1>
      <p class="page-description">了解偶艺云承的使命和愿景</p>
      
      <div class="content-section">
        <h2>我们的使命</h2>
        <p>偶艺云承致力于通过现代技术保护和传承传统木偶艺术，让这份珍贵的文化遗产在数字时代焕发新的生机。我们相信，传统艺术与现代技术的结合，能够创造出更加丰富多彩的艺术体验。</p>
        
        <h2>我们的愿景</h2>
        <p>我们希望通过数字技术，让更多的人了解和喜爱木偶艺术，培养更多的木偶艺术爱好者和传承人，让木偶艺术在新时代得到更好的发展和传承。</p>
        
        <h2>我们的团队</h2>
        <div class="team-members">
          <div class="team-member">
            <div class="member-avatar">
              <i class="bi bi-person"></i>
            </div>
            <h3>XXX</h3>
            <p>技术指导</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">
              <i class="bi bi-person"></i>
            </div>
            <h3>XXX</h3>
            <p>作品创意</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">
              <i class="bi bi-person"></i>
            </div>
            <h3>XXX</h3>
            <p>平台开发师</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">
              <i class="bi bi-person"></i>
            </div>
            <h3>XXX</h3>
            <p>UI设计师</p>
          </div>
          <div class="team-member">
            <div class="member-avatar">
              <i class="bi bi-person"></i>
            </div>
            <h3>XXX</h3>
            <p>VR开发师</p>
          </div>
        </div><hr>
        
        <h2>项目价值</h2>
        <div class="value-cards">
          <div class="value-card">
            <h3>文化价值</h3>
            <p>为木偶艺术的数字化传承提供了新路径，扩大了传统艺术的传播范围和影响力，为年轻一代了解和参与传统艺术创造了新方式，为非遗保护和传承工作提供了技术支持。</p>
          </div>
          <div class="value-card">
            <h3>技术价值</h3>
            <p>探索了AI、VR等现代技术在传统文化领域的应用，构建了一个技术先进、体验良好的文化传承平台，为类似的文化数字化项目提供了参考和借鉴。</p>
          </div>
          <div class="value-card">
            <h3>社会价值</h3>
            <p>促进了传统艺术的活态传承，增强了文化自信和民族认同感，为文化产业的数字化转型提供了案例，创造了新的就业机会和文化消费场景。</p>
          </div>
        </div>
      </div>
      
      <div class="contact-section">
        <h2>联系我们</h2>
        <p>如果您对我们的平台有任何疑问或建议，欢迎联系我们：</p>
        
        <div class="contact-info">
          <div class="contact-item">
            <div class="contact-icon">
              <i class="bi bi-envelope"></i>
            </div>
            <div class="contact-content">
              <h4>邮箱</h4>
              <p>XX38354317@qq.com</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <i class="bi bi-geo-alt"></i>
            </div>
            <div class="contact-content">
              <h4>地址</h4>
              <p>XXX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// AboutView组件逻辑
</script>

<style scoped>
/* 关于我们页面样式 */
.about-view {
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
  margin-bottom: 2.5rem;
  color: #6c757d;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.content-section {
  background-color: white;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2.5rem;
  border: 1px solid #e9ecef;
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

.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.team-member {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.member-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4C4B0 0%, #A0826D 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
}

.team-member h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.team-member p {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 0;
}

.value-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.value-card {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.value-card h3 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.value-card p {
  font-size: 1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 0;
}

.contact-section {
  background-color: white;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
}

.contact-section h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2.5rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  border-color: #D4C4B0;
}

.contact-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4C4B0 0%, #A0826D 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.contact-content {
  flex: 1;
}

.contact-content h4 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.contact-content p {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 0;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-section,
  .contact-section {
    padding: 2rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-description {
    margin-bottom: 2rem;
  }
  
  .content-section {
    margin-bottom: 2rem;
  }
  
  .team-members {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.2rem;
    margin-top: 1.5rem;
  }
  
  .value-cards {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .contact-info {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    margin-top: 1.5rem;
  }
  
  .contact-item {
    padding: 1.2rem;
  }
  
  .contact-icon {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
  
  .content-section h2,
  .contact-section h2 {
    font-size: 1.5rem;
  }
}
</style>