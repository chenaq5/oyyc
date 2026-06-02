<template>
  <div class="detail-view">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a href="#/">偶艺云承</a>
        </div>
        <div class="navbar-menu">
          <a href="#/">首页</a>
          <a href="#/rhythm">偶之韵</a>
          <a href="#/art">偶艺</a>
          <a href="#/world">偶之美</a>
          <a href="#/about">关于我们</a>
          <a href="#/auth" class="login-btn">登录注册</a>
        </div>
      </div>
    </nav>
    
    <!-- 页面标题区域 -->
    <header class="page-header">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/">首页</a>
          <span>/</span>
          <a href="#/rhythm">偶之韵</a>
          <span>/</span>
          <template v-if="type === 'puppet'">
            <a href="#/puppet-categories">木偶类别</a>
            <span>/</span>
          </template>
          <template v-else-if="type === 'video'">
            <a href="#/videos">木偶视频</a>
            <span>/</span>
          </template>
          <template v-else-if="type === 'inheritor'">
            <a href="#/inheritors">非遗传承人</a>
            <span>/</span>
          </template>
          <span class="current">{{ title }}</span>
        </div>
        <h1>{{ title }}</h1>
          <p v-if="type === 'inheritor'" class="subtitle">{{ subtitle }}</p>
      </div>
    </header>
    
    <main class="container">
      <!-- 非遗传承人详情 -->
      <div v-if="type === 'inheritor'" class="inheritor-detail">
        <div class="inheritor-profile">
          <div class="left-section">
            <div class="avatar-section">
              <div class="avatar">{{ avatar }}</div>
              <h2>{{ title }}</h2>
              <p class="subtitle">{{ subtitle }}</p>
              <div class="tags">
                <span class="tag">{{ tags.type }}</span>
                <span class="tag">{{ tags.level }}</span>
                <span class="tag">{{ tags.location }}</span>
                <span class="tag">{{ tags.skill }}</span>
              </div>
            </div>
            
            <div class="basic-info">
              <h3>基本信息</h3>
              <div class="info-item">
                <span class="label">地区：</span>
                <span class="value">{{ basicInfo.area }}</span>
              </div>
              <div class="info-item">
                <span class="label">级别：</span>
                <span class="value">{{ basicInfo.level }}</span>
              </div>
              <div class="info-item">
                <span class="label">从艺年限：</span>
                <span class="value">{{ basicInfo.years }}</span>
              </div>
              <div class="info-item">
                <span class="label">传承弟子：</span>
                <span class="value">{{ basicInfo.disciples }}</span>
              </div>
              <div class="info-item">
                <span class="label">木偶类型：</span>
                <span class="value">{{ tags.type }}</span>
              </div>
              <button class="back-btn" @click="navigateBack">返回列表</button>
            </div>
          </div>
          
          <div class="right-section">
            <div class="biography">
              <h3>个人简介</h3>
              <p>{{ biography }}</p>
            </div>
            
            <div class="awards">
              <h3>获奖情况</h3>
              <ul>
                <li v-for="(award, index) in awards" :key="index">{{ award }}</li>
              </ul>
            </div>
            
            <div class="achievements">
              <h3>艺术成就</h3>
              <ul>
                <li v-for="(achievement, index) in achievements" :key="index">{{ achievement }}</li>
              </ul>
            </div>
            
            <div class="works">
              <h3>代表作品</h3>
              <div class="works-grid">
                <div v-for="(work, index) in works" :key="index" class="work-item">
                  {{ work }}
                </div>
              </div>
            </div>
            
            <div class="teaching">
              <h3>教学经历</h3>
              <ul>
                <li v-for="(experience, index) in teaching" :key="index">{{ experience }}</li>
              </ul>
            </div>
            
            <div class="story">
              <h3>传承故事</h3>
              <div class="timeline">
                <div v-for="(event, index) in timeline" :key="index" class="timeline-item">
                  <div class="timeline-year">{{ event.year }}</div>
                  <div class="timeline-content">{{ event.content }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 木偶类别详情 -->
      <div v-else-if="type === 'puppet'" class="puppet-detail">
        <div class="container">
          <!-- 简介部分 -->
          <div class="section card">
            <h3 class="section-title">① 简介</h3>
            <p class="section-content">{{ description }}</p>
            <div class="image-grid">
              <div class="image-item">
                <!-- 预留图片位置 -->
              </div>
              <div class="image-item">
                <!-- 预留图片位置 -->
              </div>
              <div class="image-item">
                <!-- 预留图片位置 -->
              </div>
            </div>
          </div>
          
          <!-- 历史渊源 -->
          <div class="section card">
            <h3 class="section-title">② 历史渊源</h3>
            <p class="section-content">{{ history }}</p>
          </div>
          
          <!-- 艺术特色 -->
          <div class="section card">
            <h3 class="section-title">☆ 艺术特色</h3>
            <div class="feature-tags">
              <span class="feature-tag">造型生动传神</span>
              <span class="feature-tag">动作灵活多变</span>
              <span class="feature-tag">表演细腻入微</span>
              <span class="feature-tag">音乐优美动听</span>
              <span class="feature-tag">技艺传承有序</span>
            </div>
          </div>
          
          <!-- 制作工艺 -->
          <div class="section card">
            <h3 class="section-title">✂️ 制作工艺</h3>
            <div class="craft-steps">
              <div class="craft-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>选材</h4>
                  <p>选择优质木材（如樟木、椴木）作为木偶制作的原材料</p>
                </div>
              </div>
              <div class="craft-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>雕刻</h4>
                  <p>精细雕刻木偶的头部和身体，确保造型美观、比例协调</p>
                </div>
              </div>
              <div class="craft-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>上色</h4>
                  <p>为木偶上色，绘制面部表情和服饰图案</p>
                </div>
              </div>
              <div class="craft-step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>组装</h4>
                  <p>将各个部位组装起来，安装提线或杖头装置</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 代表作品 -->
          <div class="section card">
            <h3 class="section-title">🎭 代表作品</h3>
            <ul class="works-list">
              <li v-for="(work, index) in works" :key="index">{{ work }}</li>
            </ul>
          </div>
          
          <!-- 基本信息 -->
          <div class="section card right-card">
            <h3 class="section-title">📋 基本信息</h3>
            <div class="info-item">
              <span class="info-label">主要分布：</span>
              <span class="info-value">{{ distribution }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">历史年代：</span>
              <span class="info-value">汉代至今</span>
            </div>
            <div class="info-item">
              <span class="info-label">非遗级别：</span>
              <span class="info-value">国家级非物质文化遗产</span>
            </div>
            <div class="info-item">
              <span class="info-label">传承人数量：</span>
              <span class="info-value">50余人</span>
            </div>
          </div>
          
          <!-- 相关传承人 -->
          <div class="section card right-card">
            <h3 class="section-title">👥 相关传承人</h3>
            <ul class="inheritors-list">
              <li v-for="(inheritor, index) in relatedInheritors" :key="index">{{ inheritor }}</li>
            </ul>
          </div>
          
          <!-- 文化价值 -->
          <div class="section card right-card">
            <h3 class="section-title">🎯 文化价值</h3>
            <p class="section-content">
              提线木偶是中国传统艺术的重要组成部分，具有极高的历史价值、艺术价值和科学价值。
              它不仅是一种娱乐形式，更是中华民族文化的重要载体。
              弘扬传统木偶艺术，对保护和传承中华优秀传统文化具有重要意义。
            </p>
          </div>
          
          <!-- 按钮区域 -->
          <div class="button-area">
            <button class="back-btn" @click="navigateBack">返回列表</button>
            <button class="next-btn">浏览偶之韵</button>
          </div>
        </div>
      </div>
      
      <!-- 经典演出视频详情 -->
      <div v-else-if="type === 'video'" class="video-detail">
        <div class="container">
          <!-- 视频播放区域 -->
          <div class="section card">
            <div class="video-player">
              <video v-if="videoUrl" controls width="100%" height="auto">
                <source :src="videoUrl" type="video/mp4">
                您的浏览器不支持视频播放。
              </video>
              <div v-else class="video-placeholder">
                <img src="https://img.icons8.com/bubbles/500/000000/puppet.png" alt="视频封面" />
                <p>暂无视频资源</p>
              </div>
            </div>
            <h2 class="video-title">{{ title }}</h2>
            <div class="rating">
              <div class="stars">
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
              </div>
              <span class="rating-text">4.7 (128人评价)</span>
            </div>
            <div class="video-tags">
              <span class="video-tag">传统故事</span>
              <span class="video-tag">英雄传奇</span>
              <span class="video-tag">杖头木偶</span>
              <span class="video-tag">四宝</span>
            </div>
            <p class="video-description">{{ description }}</p>
          </div>
          
          <!-- 按钮区域 -->
          <div class="button-area">
            <button class="back-btn" @click="navigateBack">返回列表</button>
            <button class="next-btn">返回偶之韵</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const route = useRoute();

const type = ref('inheritor'); // 'puppet', 'video', 'inheritor'
const title = ref('李师傅');
const subtitle = ref('省级非遗传承人');
const avatar = ref('李');
const tags = ref({
  type: '杖头木偶',
  level: '省级传承人',
  location: '陕西西安',
  skill: '制作技艺'
});
const basicInfo = ref({
  area: '陕西西安',
  level: '省级',
  years: '30余年',
  disciples: '20余人'
});
const biography = ref('李师傅，男，1955年生，陕西西安人，省级非物质文化遗产项目杖头木偶代表性传承人。杖头木偶制作技艺传承人，作品精美，远销海内外。李师傅自幼喜爱木偶艺术，经过多年的学习和实践，掌握了杖头木偶制作和表演的各科技巧。他的作品造型精美，工艺精湛，深受收藏家和观众的喜爱。李师傅不仅在木偶制作方面有深厚的造诣，还积极培养年轻传承人，为传统木偶艺术的传承和发展做出了重要贡献。');
const awards = ref([
  '省级非遗传承人 (2010年)',
  '陕西省工艺美术大师 (2012年)',
  '全国木偶制作大奖赛金奖 (2015年)',
  '中国民间文艺山花奖 (2018年)'
]);
// 艺术成就
const achievements = ref([
  '创作了数百件精美的杖头木偶作品',
  '作品多次被博物馆收藏或展览',
  '培养了20余名杖头木偶艺术人才',
  '多次参加国内外展览，获得广泛好评',
  '获得陕西省"工艺美术大师"称号'
]);
// 代表作品
const works = ref([
  '《花木兰》',
  '《孙悟空》',
  '《包公断案》',
  '《白蛇传》',
  '《三国演义》'
]);
// 教学经历
const teaching = ref([
  '西安美术学院',
  '担任木偶制作专业兼职教授，培养专业人才',
  '陕西木偶剧团',
  '担任艺术指导，培养年轻演员',
  '非遗传承班',
  '定期举办杖头木偶制作培训班，传承传统技艺'
]);
// 传承故事
const timeline = ref([
  {
    year: '1965年',
    content: '开始学习杖头木偶制作技艺'
  },
  {
    year: '1975年',
    content: '成立个人工作室，开始专业创作'
  },
  {
    year: '1985年',
    content: '作品首次在全国展览中获奖'
  },
  {
    year: '1995年',
    content: '开始收徒授艺，培养传承人'
  },
  {
    year: '2005年',
    content: '被评为省级非遗传承人'
  },
  {
    year: '2015年',
    content: '作品被国家博物馆收藏'
  }
]);

// 木偶类别详情数据
const description = ref('');
const features = ref([]);
const history = ref('');
const distribution = ref('');
const relatedInheritors = ref(['陈师傅', '林师傅', '黄师傅']);

// 视频详情数据
const meta = ref({
  type: '',
  location: ''
});
const performance = ref('');
const videoUrl = ref('');

// 返回偶之韵页面
const navigateBack = () => {
  router.push('/rhythm');
};

// 根据路由参数加载对应的数据
onMounted(() => {
  console.log('Route params:', route.params);
  const params = route.params;
  
  if (params.type) {
    type.value = params.type;
    const name = decodeURIComponent(params.name || '');
    
    console.log('Loading data for type:', type.value, 'name:', name);
    
    if (type.value === 'puppet') {
      loadPuppetData(name);
    } else if (type.value === 'inheritor') {
      loadInheritorData(name);
    } else if (type.value === 'video') {
      loadVideoData(name);
    }
  }
});

// 加载传承人数据
const loadInheritorData = (name) => {
  // 这里可以根据实际情况从API获取数据
  // 暂时使用模拟数据
  switch(name) {
    case '李师傅':
      title.value = '李师傅';
      subtitle.value = '省级非遗传承人';
      avatar.value = '李';
      tags.value = {
        type: '杖头木偶',
        level: '省级传承人',
        location: '陕西西安',
        skill: '制作技艺'
      };
      basicInfo.value = {
        area: '陕西西安',
        level: '省级',
        years: '30余年',
        disciples: '20余人'
      };
      biography.value = '李师傅，男，1955年生，陕西西安人，省级非物质文化遗产项目杖头木偶代表性传承人。杖头木偶制作技艺传承人，作品精美，远销海内外。李师傅自幼喜爱木偶艺术，经过多年的学习和实践，掌握了杖头木偶制作和表演的各科技巧。他的作品造型精美，工艺精湛，深受收藏家和观众的喜爱。李师傅不仅在木偶制作方面有深厚的造诣，还积极培养年轻传承人，为传统木偶艺术的传承和发展做出了重要贡献。';
      awards.value = [
        '省级非遗传承人 (2010年)',
        '陕西省工艺美术大师 (2012年)',
        '全国木偶制作大奖赛金奖 (2015年)',
        '中国民间文艺山花奖 (2018年)'
      ];
      achievements.value = [
        '创作了数百件精美的杖头木偶作品',
        '作品多次被博物馆收藏或展览',
        '培养了20余名杖头木偶艺术人才',
        '多次参加国内外展览，获得广泛好评',
        '获得陕西省"工艺美术大师"称号'
      ];
      works.value = [
        '《花木兰》',
        '《孙悟空》',
        '《包公断案》',
        '《白蛇传》',
        '《三国演义》'
      ];
      teaching.value = [
        '西安美术学院',
        '担任木偶制作专业兼职教授，培养专业人才',
        '陕西木偶剧团',
        '担任艺术指导，培养年轻演员',
        '非遗传承班',
        '定期举办杖头木偶制作培训班，传承传统技艺'
      ];
      timeline.value = [
        {
          year: '1965年',
          content: '开始学习杖头木偶制作技艺'
        },
        {
          year: '1975年',
          content: '成立个人工作室，开始专业创作'
        },
        {
          year: '1985年',
          content: '作品首次在全国展览中获奖'
        },
        {
          year: '1995年',
          content: '开始收徒授艺，培养传承人'
        },
        {
          year: '2005年',
          content: '被评为省级非遗传承人'
        },
        {
          year: '2015年',
          content: '作品被国家博物馆收藏'
        }
      ];
      break;
    case '张师傅':
      title.value = '张师傅';
      subtitle.value = '国家级非遗传承人';
      avatar.value = '张';
      tags.value = {
        type: '提线木偶',
        level: '国家级传承人',
        location: '福建泉州',
        skill: '表演技艺'
      };
      basicInfo.value = {
        area: '福建泉州',
        level: '国家级'
      };
      biography.value = '张师傅，男，1945年生，福建泉州人，国家级非物质文化遗产项目提线木偶代表性传承人。从事提线木偶表演50余年，技艺精湛，培养了众多弟子。张师傅的表演风格细腻，动作流畅，深受观众喜爱。他的代表作品有《大闹天宫》、《火焰山》等经典剧目。张师傅不仅在表演方面有深厚的造诣，还积极推动提线木偶艺术的创新和发展，为传统木偶艺术的传承做出了重要贡献。';
      awards.value = [
        '国家级非遗传承人 (2008年)',
        '中国木偶艺术大师 (2010年)',
        '全国木偶表演大奖赛金奖 (2012年)',
        '联合国教科文组织非物质文化遗产优秀传承人 (2015年)'
      ];
      break;
    case '王师傅':
      title.value = '王师傅';
      subtitle.value = '市级非遗传承人';
      avatar.value = '王';
      tags.value = {
        type: '布袋木偶',
        level: '市级传承人',
        location: '福建漳州',
        skill: '表演技艺'
      };
      basicInfo.value = {
        area: '福建漳州',
        level: '市级'
      };
      biography.value = '王师傅，男，1960年生，福建漳州人，市级非物质文化遗产项目布袋木偶代表性传承人。布袋木偶表演艺术家，擅长喜剧表演，深受观众喜爱。王师傅的表演风格幽默，动作夸张，是布袋木偶艺术的重要传承者。他的代表作品有《木偶奇遇记》、《西游记》等剧目。王师傅不仅在表演方面有深厚的造诣，还积极培养年轻传承人，为布袋木偶艺术的传承和发展做出了重要贡献。';
      awards.value = [
        '市级非遗传承人 (2015年)',
        '福建省木偶表演大赛金奖 (2018年)',
        '中国民间文艺表演奖 (2020年)'
      ];
      break;
    case '陈应鸿':
      title.value = '陈应鸿';
      subtitle.value = '国家级非遗传承人';
      avatar.value = '陈';
      tags.value = {
        type: '提线木偶',
        level: '国家级传承人',
        location: '福建泉州',
        skill: '表演技艺'
      };
      basicInfo.value = {
        area: '福建泉州',
        level: '国家级'
      };
      biography.value = '陈应鸿，男，1950年生，福建泉州人，国家级非物质文化遗产项目提线木偶代表性传承人。从事提线木偶艺术60余年，技艺精湛，是提线木偶的代表性传承人。陈应鸿的表演风格细腻，动作流畅，深受观众喜爱。他的代表作品有《大闹天宫》、《火焰山》等经典剧目。陈应鸿不仅在表演方面有深厚的造诣，还积极推动提线木偶艺术的创新和发展，为传统木偶艺术的传承做出了重要贡献。';
      awards.value = [
        '国家级非遗传承人 (2006年)',
        '中国木偶艺术大师 (2008年)',
        '全国木偶表演大奖赛金奖 (2010年)',
        '联合国教科文组织非物质文化遗产优秀传承人 (2013年)'
      ];
      break;
    case '李立群':
      title.value = '李立群';
      subtitle.value = '省级非遗传承人';
      avatar.value = '李';
      tags.value = {
        type: '杖头木偶',
        level: '省级传承人',
        location: '陕西西安',
        skill: '表演技艺'
      };
      basicInfo.value = {
        area: '陕西西安',
        level: '省级'
      };
      biography.value = '李立群，男，1965年生，陕西西安人，省级非物质文化遗产项目杖头木偶代表性传承人。杖头木偶表演艺术家，致力于传统木偶艺术的创新与传承。李立群的表演风格大气，动作有力，擅长表现历史人物。他的代表作品有《花木兰》、《包公断案》等剧目。李立群不仅在表演方面有深厚的造诣，还积极推动杖头木偶艺术的创新和发展，为传统木偶艺术的传承做出了重要贡献。';
      awards.value = [
        '省级非遗传承人 (2012年)',
        '陕西省木偶表演大赛金奖 (2014年)',
        '中国民间文艺表演奖 (2016年)',
        '全国木偶表演大奖赛银奖 (2018年)'
      ];
      break;
    case '黄美香':
      title.value = '黄美香';
      subtitle.value = '国家级非遗传承人';
      avatar.value = '黄';
      tags.value = {
        type: '布袋木偶',
        level: '国家级传承人',
        location: '福建漳州',
        skill: '制作与表演'
      };
      basicInfo.value = {
        area: '福建漳州',
        level: '国家级'
      };
      biography.value = '黄美香，女，1955年生，福建漳州人，国家级非物质文化遗产项目布袋木偶代表性传承人。布袋木偶表演大师，擅长传统布袋木偶的制作与表演。黄美香的表演风格细腻，动作灵活，深受观众喜爱。她的代表作品有《田螺姑娘》、《西游记》等剧目。黄美香不仅在表演和制作方面有深厚的造诣，还积极培养年轻传承人，为布袋木偶艺术的传承和发展做出了重要贡献。';
      awards.value = [
        '国家级非遗传承人 (2008年)',
        '中国木偶艺术大师 (2010年)',
        '全国木偶表演大奖赛金奖 (2012年)',
        '福建省民间文艺杰出贡献奖 (2015年)'
      ];
      break;
    case '刘师傅':
      title.value = '刘师傅';
      subtitle.value = '省级非遗传承人';
      avatar.value = '刘';
      tags.value = {
        type: '铁枝木偶',
        level: '省级传承人',
        location: '广东潮州',
        skill: '表演技艺'
      };
      basicInfo.value = {
        area: '广东潮州',
        level: '省级'
      };
      biography.value = '刘师傅，男，1960年生，广东潮州人，省级非物质文化遗产项目铁枝木偶代表性传承人。铁枝木偶表演艺术家，擅长传统铁枝木偶的表演。刘师傅的表演风格独特，动作精准，是铁枝木偶艺术的重要传承者。他的代表作品有《三打白骨精》、《火焰山》等剧目。刘师傅不仅在表演方面有深厚的造诣，还积极培养年轻传承人，为铁枝木偶艺术的传承和发展做出了重要贡献。';
      awards.value = [
        '省级非遗传承人 (2010年)',
        '广东省木偶表演大赛金奖 (2013年)',
        '中国民间文艺表演奖 (2016年)',
        '全国木偶表演大奖赛铜奖 (2019年)'
      ];
      break;
    case '郑师傅':
      title.value = '郑师傅';
      subtitle.value = '国家级非遗传承人';
      avatar.value = '郑';
      tags.value = {
        type: '药发木偶',
        level: '国家级传承人',
        location: '浙江泰顺',
        skill: '表演技艺'
      };
      basicInfo.value = {
        area: '浙江泰顺',
        level: '国家级'
      };
      biography.value = '郑师傅，男，1950年生，浙江泰顺人，国家级非物质文化遗产项目药发木偶代表性传承人。药发木偶表演艺术家，掌握了药发木偶的核心技艺。他的表演场面壮观，具有强烈的视觉冲击力，是药发木偶艺术的重要传承者。致力于药发木偶的保护和创新，让这一传统技艺焕发新的活力。郑师傅不仅在表演方面有深厚的造诣，还积极培养年轻传承人，为药发木偶艺术的传承和发展做出了重要贡献。';
      awards.value = [
        '国家级非遗传承人 (2010年)',
        '浙江省工艺美术大师 (2012年)',
        '全国木偶表演大奖赛金奖 (2015年)',
        '中国民间文艺山花奖 (2018年)'
      ];
      break;
    case '赵师傅':
      title.value = '赵师傅';
      subtitle.value = '省级非遗传承人';
      avatar.value = '赵';
      tags.value = {
        type: '杖头木偶',
        level: '省级传承人',
        location: '四川成都',
        skill: '表演与制作'
      };
      basicInfo.value = {
        area: '四川成都',
        level: '省级'
      };
      biography.value = '赵师傅，男，1965年生，四川成都人，省级非物质文化遗产项目杖头木偶代表性传承人。杖头木偶表演艺术家，擅长传统杖头木偶的表演和制作。他的表演风格细腻，动作流畅，是杖头木偶艺术的重要传承者。结合现代科技，创新了杖头木偶的表演形式，吸引了更多年轻观众。赵师傅不仅在表演和制作方面有深厚的造诣，还积极培养年轻传承人，为杖头木偶艺术的传承和发展做出了重要贡献。';
      awards.value = [
        '省级非遗传承人 (2012年)',
        '四川省木偶表演大赛金奖 (2014年)',
        '中国民间文艺表演奖 (2016年)',
        '全国木偶表演大奖赛银奖 (2018年)'
      ];
      break;
  }
};

// 加载木偶类别数据
const loadPuppetData = (puppetType) => {
  console.log('Loading puppet data for:', puppetType);
  
  const puppetMap = {
    '提线木偶': {
      title: '提线木偶',
      description: '提线木偶，古称"悬丝傀儡"，是中国传统木偶戏的一种。它由偶头、四肢、躯干和提线组成，通过艺人巧妙地拉动提线，使木偶做出各种生动的动作。提线木偶的制作工艺复杂，需要经过选料、雕刻、上色、组装等多道工序，每个环节都要求极高的技艺水平。',
      features: ['通过丝线或棉线连接各个部位', '演员通过操控线来控制木偶的动作', '表现力非常丰富，能展现复杂的动作', '造型精美，工艺精湛', '适合表演各种角色和场景', '历史悠久，文化底蕴深厚'],
      history: '提线木偶起源于汉代，兴盛于宋代。早在《列子·汤问》中，就有关于提线木偶的记载。唐代时，提线木偶艺术已相当成熟，宋代达到了鼎盛时期，形成了完整的表演体系。明清时期，提线木偶在民间广泛流传，形成了多个地方流派，如泉州提线木偶、潮州铁枝木偶等。',
      distribution: '福建泉州、广东潮州、浙江温州',
      works: ['《大闹天宫》', '《三打白骨精》', '《白蛇传》', '《西游记》', '《三国演义》'],
      relatedInheritors: ['陈应鸿', '李师傅', '张师傅']
    },
    '杖头木偶': {
      title: '杖头木偶',
      description: '杖头木偶是中国传统木偶戏的主要形式之一，通过木杖控制木偶的头部和手部动作。它由偶头、躯干、四肢和操纵杖组成，操纵者通过手中的木杖来控制木偶的动作，表现力强，动作幅度大。',
      features: ['通过木杖控制木偶的头部和手部', '动作幅度大，表现力强', '适合表演各种角色', '造型多样，工艺精美', '操作相对简单，易于学习', '适合舞台表演'],
      history: '杖头木偶的历史可以追溯到唐代，在宋代得到了广泛发展。杖头木偶在中国各地都有分布，其中陕西西安的杖头木偶最为著名。杖头木偶的制作工艺精湛，造型美观，是中国传统艺术的重要组成部分。',
      distribution: '陕西西安、河南开封、河北唐山、山东济南',
      works: ['《花木兰》', '《包公断案》', '《白蛇传》', '《西游记》', '《三国演义》'],
      relatedInheritors: ['李立群', '赵师傅', '李师傅']
    },
    '布袋木偶': {
      title: '布袋木偶',
      description: '布袋木偶又称掌中木偶，演员通过手掌控制木偶，动作灵活，表演细腻。布袋木偶的表演风格幽默风趣，深受观众喜爱。',
      features: ['演员将手伸入布袋中控制木偶', '动作灵活，表演细腻', '适合表现喜剧和生活场景', '造型小巧，便于携带', '操作简单，表演自由', '适合近距离表演'],
      history: '布袋木偶起源于宋代，在明清时期得到了广泛发展。布袋木偶在中国各地都有分布，其中福建漳州的布袋木偶最为著名，已被列入国家级非物质文化遗产名录。',
      distribution: '福建漳州、泉州、台湾、广东',
      works: ['《木偶奇遇记》', '《西游记》', '《白蛇传》', '《梁祝》', '《红楼梦》'],
      relatedInheritors: ['王师傅', '黄美香', '陈师傅']
    },
    '铁枝木偶': {
      title: '铁枝木偶',
      description: '铁枝木偶是广东潮州等地的传统木偶形式，通过铁枝控制木偶的动作。铁枝木偶的表演技巧独特，需要演员通过操控铁枝来控制木偶的动作，达到生动逼真的效果。',
      features: ['通过铁枝控制木偶的动作', '动作精准，表现力强', '适合表演神话故事和历史剧', '造型精美，工艺独特', '需要较高的操作技巧', '具有浓郁的地方特色'],
      history: '铁枝木偶起源于明代，在清代得到了广泛发展。铁枝木偶主要分布在广东潮州、汕头等地，是当地传统艺术的重要组成部分。',
      distribution: '广东潮州、汕头、揭阳',
      works: ['《陈三五娘》', '《苏六娘》', '《井边会》', '《扫窗会》'],
      relatedInheritors: ['许师傅', '陈师傅', '林师傅']
    },
    '药发木偶': {
      title: '药发木偶',
      description: '药发木偶是浙江泰顺等地的传统木偶形式，通过火药爆炸来展示木偶。药发木偶的表演形式独特，视觉效果震撼，深受观众喜爱。',
      features: ['通过火药爆炸来展示木偶', '表演形式独特，视觉效果震撼', '适合在节日和庆典中表演', '制作工艺复杂，需要专业技能', '具有浓郁的地方特色', '是中国传统艺术的瑰宝'],
      history: '药发木偶起源于宋代，在明清时期得到了广泛发展。药发木偶主要分布在浙江泰顺等地，是当地传统艺术的重要组成部分。',
      distribution: '浙江泰顺、丽水、温州',
      works: ['《八仙过海》', '《龙凤呈祥》', '《花果山》'],
      relatedInheritors: ['刘师傅', '周师傅', '吴师傅']
    },
    '现代创新木偶': {
      title: '现代创新木偶',
      description: '现代创新木偶是在传统木偶基础上发展而来的新形式，融合了现代科技和艺术元素，为传统木偶艺术注入了新的活力。',
      features: ['融合现代科技和艺术元素', '表演形式多样，创意丰富', '适合现代观众的审美需求', '造型新颖，工艺先进', '表演技巧创新，表现力强', '具有时代特色'],
      history: '现代创新木偶是在传统木偶基础上发展而来的新形式，融合了现代科技和艺术元素。现代创新木偶的出现，为传统木偶艺术注入了新的活力。',
      distribution: '上海、北京、广州、深圳',
      works: ['《星际木偶》', '《未来世界》', '《数字英雄》'],
      relatedInheritors: ['创新工作室', '现代艺术团', '科技艺术中心']
    }
  };

  const puppetData = puppetMap[puppetType];
  
  if (puppetData) {
    title.value = puppetData.title;
    description.value = puppetData.description;
    features.value = puppetData.features;
    history.value = puppetData.history;
    distribution.value = puppetData.distribution;
    works.value = puppetData.works;
    relatedInheritors.value = puppetData.relatedInheritors;
  } else {
    title.value = puppetType || '木偶类别';
    description.value = '这是一种独特的木偶艺术形式，融合了传统工艺和现代技术，展现了木偶艺术的魅力。';
    features.value = ['造型精美', '工艺精湛', '表演生动', '富有文化内涵'];
    history.value = '这种木偶艺术形式历史悠久，经过多代传承人的努力，不断发展和完善。';
    distribution.value = '全国各地';
    works.value = ['经典剧目'];
    relatedInheritors.value = ['传承人'];
  }
};

// 加载视频数据
const loadVideoData = (videoName) => {
  if (typeof window !== 'undefined' && window.CloudService && window.BaaS) {
    // 从数据库获取视频数据
    const Video = new window.BaaS.TableObject('videos');
    const query = new window.BaaS.Query();
    query.contains('title', videoName);
    
    Video.setQuery(query).find().then(res => {
      console.log('数据库查询结果:', res);
      const videos = res.data.objects;
      console.log('找到的视频数据:', videos);
      if (videos.length > 0) {
        const video = videos[0];
        console.log('视频详情:', video);
        console.log('视频URL:', video.video_url);
        title.value = video.title || videoName;
        meta.value = {
          type: video.category || '',
          location: video.region || ''
        };
        description.value = video.description || '';
        performance.value = video.description || ''; // 使用description作为performance
        videoUrl.value = video.video_url || '';
        console.log('最终视频URL:', videoUrl.value);
      } else {
        // 如果数据库中没有找到，使用默认数据
        console.log('数据库中没有找到视频，使用默认数据');
        loadDefaultVideoData(videoName);
      }
    }).catch(err => {
      console.error('获取视频数据失败', err);
      // 错误时使用默认数据
      loadDefaultVideoData(videoName);
    });
  } else {
    // 没有数据库连接时使用默认数据
    loadDefaultVideoData(videoName);
  }
};

// 加载默认视频数据
const loadDefaultVideoData = (videoName) => {
  switch(videoName) {
    case '大闹天宫':
      title.value = '《大闹天宫》';
      meta.value = {
        type: '提线木偶',
        location: '福建泉州'
      };
      description.value = '经典传统剧目，讲述孙悟空大闹天宫的故事，木偶动作精湛，场面壮观。该剧目分为20余场，通过精湛的提线木偶表演，展现了孙悟空大闹天宫的精彩情节。该剧目是中国木偶艺术的经典之作，以其精湛的表演技巧和丰富的艺术表现力，深受观众喜爱。';
      performance.value = '该剧目以提线木偶为载体，通过精湛的表演技巧，展现了孙悟空的机智和勇气。演员通过操控丝线，使木偶做出各种复杂的动作，如翻筋斗、耍金箍棒等，场面非常壮观。该剧目的音乐、灯光、布景等元素也非常精美，为观众呈现了一场视觉盛宴。';
      videoUrl.value = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      break;
    case '花木兰':
      title.value = '《花木兰》';
      meta.value = {
        type: '杖头木偶',
        location: '陕西西安'
      };
      description.value = '根据中国传统故事改编，展现花木兰代父从军的英雄事迹。该剧目以杖头木偶为载体，通过现代创新的表演风格，展现了花木兰的英勇和智慧。该剧目融合了传统木偶艺术和现代舞台技术，为观众呈现了一场精彩的视觉盛宴。';
      performance.value = '该剧目以杖头木偶为载体，通过现代创新的表演风格，展现了花木兰的英勇和智慧。演员通过操控木杖，使木偶做出各种动作，如骑马、打仗等，场面非常逼真。该剧目的音乐、灯光、布景等元素也非常精美，为观众呈现了一场视觉盛宴。';
      videoUrl.value = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      break;
    case '三国演义':
      title.value = '《三国演义》';
      meta.value = {
        type: '提线木偶',
        location: '江苏'
      };
      description.value = '根据古典名著改编，展现三国时期的英雄故事，场面宏大，人物众多，是木偶戏的经典之作。该剧目以提线木偶为载体，通过精湛的表演技巧，展现了三国时期的英雄故事。该剧目是中国木偶艺术的经典之作，以其精湛的表演技巧和丰富的艺术表现力，深受观众喜爱。';
      performance.value = '该剧目以提线木偶为载体，通过精湛的表演技巧，展现了三国时期的英雄故事。演员通过操控丝线，使木偶做出各种复杂的动作，如打斗、布阵等，场面非常宏大。该剧目的音乐、灯光、布景等元素也非常精美，为观众呈现了一场视觉盛宴。';
      videoUrl.value = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      break;
    case '西游记':
      title.value = '《西游记》';
      meta.value = {
        type: '杖头木偶',
        location: '四川'
      };
      description.value = '根据古典名著改编，讲述唐僧师徒四人西天取经的故事，情节曲折，引人入胜，表演生动。该剧目以杖头木偶为载体，通过精湛的表演技巧，展现了唐僧师徒四人西天取经的故事。该剧目是中国木偶艺术的经典之作，以其精湛的表演技巧和丰富的艺术表现力，深受观众喜爱。';
      performance.value = '该剧目以杖头木偶为载体，通过精湛的表演技巧，展现了唐僧师徒四人西天取经的故事。演员通过操控木杖，使木偶做出各种动作，如打斗、变化等，场面非常生动。该剧目的音乐、灯光、布景等元素也非常精美，为观众呈现了一场视觉盛宴。';
      videoUrl.value = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      break;
    case '白蛇传':
      title.value = '《白蛇传》';
      meta.value = {
        type: '布袋木偶',
        location: '福建'
      };
      description.value = '根据中国传统民间故事改编，讲述白素贞与许仙的爱情故事，情节感人，表演细腻。该剧目以布袋木偶为载体，通过精湛的表演技巧，展现了白素贞与许仙的爱情故事。该剧目是中国木偶艺术的经典之作，以其精湛的表演技巧和丰富的艺术表现力，深受观众喜爱。';
      performance.value = '该剧目以布袋木偶为载体，通过精湛的表演技巧，展现了白素贞与许仙的爱情故事。演员通过操控布袋木偶，使木偶做出各种细腻的动作，如表达情感、互动等，场面非常感人。该剧目的音乐、灯光、布景等元素也非常精美，为观众呈现了一场视觉盛宴。';
      videoUrl.value = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      break;
    case '牛郎织女':
      title.value = '《牛郎织女》';
      meta.value = {
        type: '铁枝木偶',
        location: '广东'
      };
      description.value = '根据中国传统民间故事改编，讲述牛郎与织女的爱情故事，情节浪漫，表演精美。该剧目以铁枝木偶为载体，通过精湛的表演技巧，展现了牛郎与织女的爱情故事。该剧目是中国木偶艺术的经典之作，以其精湛的表演技巧和丰富的艺术表现力，深受观众喜爱。';
      performance.value = '该剧目以铁枝木偶为载体，通过精湛的表演技巧，展现了牛郎与织女的爱情故事。演员通过操控铁枝，使木偶做出各种动作，如织布、牵牛等，场面非常浪漫。该剧目的音乐、灯光、布景等元素也非常精美，为观众呈现了一场视觉盛宴。';
      videoUrl.value = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      break;
    case '嫦娥奔月':
      title.value = '《嫦娥奔月》';
      meta.value = {
        type: '提线木偶',
        location: '浙江'
      };
      description.value = '根据中国传统神话故事改编，讲述嫦娥奔月的传说，表演优美，场景梦幻。该剧目以提线木偶为载体，通过精湛的表演技巧，展现了嫦娥奔月的美丽传说。该剧目是中国木偶艺术的经典之作，以其精湛的表演技巧和丰富的艺术表现力，深受观众喜爱。';
      performance.value = '该剧目以提线木偶为载体，通过精湛的表演技巧，展现了嫦娥奔月的美丽传说。演员通过操控丝线，使木偶做出各种优美的动作，如翩翩起舞、奔月等，场面非常梦幻。该剧目的音乐、灯光、布景等元素也非常精美，为观众呈现了一场视觉盛宴。';
      videoUrl.value = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      break;
    case '哪吒闹海':
      title.value = '《哪吒闹海》';
      meta.value = {
        type: '杖头木偶',
        location: '北京'
      };
      description.value = '根据中国传统神话故事改编，讲述哪吒闹海的故事，表演精彩，场面震撼。该剧目以杖头木偶为载体，通过精湛的表演技巧，展现了哪吒闹海的英雄事迹。该剧目是中国木偶艺术的经典之作，以其精湛的表演技巧和丰富的艺术表现力，深受观众喜爱。';
      performance.value = '该剧目以杖头木偶为载体，通过精湛的表演技巧，展现了哪吒闹海的英雄事迹。演员通过操控木杖，使木偶做出各种精彩的动作，如打斗、变化等，场面非常震撼。该剧目的音乐、灯光、布景等元素也非常精美，为观众呈现了一场视觉盛宴。';
      videoUrl.value = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      break;
    case '钟馗醉酒':
      title.value = '《钟馗醉酒》';
      meta.value = {
        type: '提线木偶',
        location: '安徽'
      };
      description.value = '传统经典剧目，讲述钟馗醉酒捉鬼的故事，表演生动有趣，具有浓郁的民间特色。该剧目以提线木偶为载体，通过精湛的表演技巧，展现了钟馗的神威和幽默。该剧目是中国木偶艺术的经典之作，以其精湛的表演技巧和丰富的艺术表现力，深受观众喜爱。';
      performance.value = '该剧目以提线木偶为载体，通过精湛的表演技巧，展现了钟馗醉酒后的各种有趣动作。演员通过操控丝线，使木偶做出各种生动的表情和动作，如醉酒摇晃、捉鬼等，场面非常有趣。该剧目的音乐、灯光、布景等元素也非常精美，为观众呈现了一场视觉盛宴。';
      videoUrl.value = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      break;
    default:
      title.value = videoName || '视频详情';
      meta.value = {
        type: '木偶戏',
        location: '中国'
      };
      description.value = '这是一部精彩的木偶戏视频，展现了传统艺术的魅力。';
      performance.value = '该视频通过精湛的木偶表演，展现了传统艺术的魅力和表现力。';
      videoUrl.value = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      break;
  }
};
</script>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.detail-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Microsoft YaHei', Arial, sans-serif;
}

/* 导航栏样式 */
.navbar {
  background-color: #8B6954;
  color: white;
  padding: 1rem 0;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-brand a {
  color: white;
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.navbar-menu a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.navbar-menu a:hover {
  color: #D4C4B0;
}

.login-btn {
  background-color: #D4C4B0;
  color: #333;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  font-weight: 500;
}

.login-btn:hover {
  background-color: #C0B098;
  color: #333;
}

/* 页面标题区域 */
.page-header {
  background-color: #8B6954;
  color: white;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

.breadcrumb a {
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb .current {
  font-weight: bold;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.page-header .subtitle {
  font-size: 1rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

/* 主内容区域 */
main {
  flex: 1;
  padding: 2rem 0;
  background-color: #f8f5f0;
}

/* 非遗传承人详情样式 */
.inheritor-detail {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.inheritor-profile {
  display: flex;
  gap: 3rem;
  padding: 2rem;
}

.left-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.right-section {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.avatar-section {
  text-align: center;
  background-color: #f8f5f0;
  padding: 2rem;
  border-radius: 10px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #8B6954;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1rem;
  font-size: 3rem;
  font-weight: bold;
  color: white;
}

.avatar-section h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.avatar-section .subtitle {
  font-size: 1rem;
  color: #8B6954;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.tag {
  background-color: #D4C4B0;
  color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

.basic-info {
  background-color: #f8f5f0;
  padding: 1.5rem;
  border-radius: 10px;
}

.basic-info h3 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.basic-info h3:before {
  content: '①';
  font-weight: bold;
  color: #8B6954;
}

.info-item {
  display: flex;
  margin-bottom: 0.8rem;
  align-items: center;
}

.info-item .label {
  font-weight: 500;
  color: #333;
  width: 80px;
  font-size: 0.9rem;
}

.info-item .value {
  color: #6c757d;
  font-size: 0.9rem;
}

.back-btn {
  background-color: #8B6954;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  margin-top: 1rem;
  align-self: flex-start;
}

.back-btn:hover {
  background-color: #6B4934;
  transform: translateY(-2px);
}

.biography,
.awards,
.achievements,
.works,
.teaching,
.story {
  background-color: #f8f5f0;
  padding: 1.5rem;
  border-radius: 10px;
}

.biography h3,
.awards h3,
.achievements h3,
.works h3,
.teaching h3,
.story h3 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.biography h3:before {
  content: '✍';
  font-weight: bold;
  color: #8B6954;
}

.awards h3:before {
  content: '🏆';
  font-weight: bold;
  color: #8B6954;
}

.achievements h3:before {
  content: '⭐';
  font-weight: bold;
  color: #8B6954;
}

.works h3:before {
  content: '🎭';
  font-weight: bold;
  color: #8B6954;
}

.teaching h3:before {
  content: '📚';
  font-weight: bold;
  color: #8B6954;
}

.story h3:before {
  content: '📖';
  font-weight: bold;
  color: #8B6954;
}

.biography p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 0;
}

.awards ul,
.achievements ul,
.teaching ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.awards li,
.achievements li,
.teaching li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
  color: #6c757d;
  font-size: 0.95rem;
}

.awards li:last-child,
.achievements li:last-child,
.teaching li:last-child {
  border-bottom: none;
}

.works-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.work-item {
  background-color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.work-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #D4C4B0;
}

.timeline-item {
  position: relative;
  margin-bottom: 1.5rem;
}

.timeline-item:before {
  content: '';
  position: absolute;
  left: -2.5rem;
  top: 0.5rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #8B6954;
}

.timeline-year {
  font-weight: bold;
  color: #8B6954;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

.timeline-content {
  color: #6c757d;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* 木偶类别详情样式 */
.puppet-detail {
  background-color: #f8f5f0;
  padding: 2rem 0;
}

/* 视频详情样式 */
.video-detail {
  background-color: #f8f5f0;
  padding: 2rem 0;
}

/* 通用卡片样式 */
.card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-content {
  line-height: 1.6;
  color: #333;
  margin-bottom: 1rem;
}

/* 图片网格 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.image-item {
  aspect-ratio: 1;
  background-color: #f8f5f0;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 艺术特色标签 */
.feature-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.feature-tag {
  background-color: #8B6954;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

/* 制作工艺步骤 */
.craft-steps {
  margin-top: 1rem;
}

.craft-step {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #8B6954;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content h4 {
  font-weight: bold;
  margin-bottom: 0.3rem;
  color: #333;
}

.step-content p {
  color: #666;
  line-height: 1.5;
}

/* 代表作品列表 */
.works-list {
  list-style: none;
  margin-top: 1rem;
}

.works-list li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  color: #333;
}

.works-list li::before {
  content: '▍';
  position: absolute;
  left: 0;
  color: #8B6954;
}

/* 基本信息样式 */
.info-item {
  display: flex;
  margin-bottom: 0.8rem;
  align-items: flex-start;
}

.info-label {
  font-weight: bold;
  width: 80px;
  color: #666;
  flex-shrink: 0;
}

.info-value {
  flex: 1;
  color: #333;
}

/* 相关传承人列表 */
.inheritors-list {
  list-style: none;
  margin-top: 1rem;
}

.inheritors-list li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  color: #333;
}

.inheritors-list li::before {
  content: '△';
  position: absolute;
  left: 0;
  color: #8B6954;
  font-size: 0.8rem;
}

/* 右侧卡片 */
.right-card {
  background-color: #FFF8E7;
  border-left: 4px solid #8B6954;
}

/* 视频播放器 */
.video-player {
  position: relative;
  aspect-ratio: 16/9;
  background-color: #f8f5f0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.video-player img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
  transform: translate(-50%, -50%) scale(1.1);
}

.play-icon {
  color: white;
  font-size: 2rem;
  margin-left: 5px;
}

.video-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

/* 评分 */
.rating {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stars {
  display: flex;
  gap: 0.2rem;
}

.star {
  color: #FFD700;
  font-size: 1.2rem;
}

.rating-text {
  color: #666;
  font-size: 0.9rem;
}

/* 视频标签 */
.video-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.video-tag {
  background-color: #8B6954;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

.video-description {
  line-height: 1.6;
  color: #333;
  margin-bottom: 1rem;
}

/* 演员表 */
.cast-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.cast-item {
  text-align: center;
}

.cast-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #8B6954;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0 auto 0.5rem;
}

.cast-name {
  font-weight: bold;
  margin-bottom: 0.2rem;
  color: #333;
}

.cast-role {
  font-size: 0.8rem;
  color: #666;
}

/* 相关视频 */
.related-videos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.related-video-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: #f8f5f0;
  padding: 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.related-video-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.related-video-thumbnail {
  width: 100px;
  height: 75px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  flex-shrink: 0;
}

.related-video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-video-info h4 {
  font-weight: bold;
  margin-bottom: 0.3rem;
  color: #333;
}

.related-video-info p {
  font-size: 0.8rem;
  color: #666;
}

/* 分享按钮 */
.share-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.share-btn {
  background-color: #D4C4B0;
  color: #333;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-btn:hover {
  background-color: #C0B098;
}

/* 按钮区域 */
.button-area {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.next-btn, .watch-btn {
  background-color: #8B6954;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-btn:hover, .watch-btn:hover {
  background-color: #6B4F3C;
}

.next-btn {
  background-color: #D4C4B0;
  color: #333;
}

.next-btn:hover {
  background-color: #C0B098;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .inheritor-profile {
    flex-direction: column;
  }
  
  .navbar-menu {
    gap: 1rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
  
  .image-grid {
    grid-template-columns: 1fr;
  }
  
  .craft-step {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .cast-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .related-videos {
    grid-template-columns: 1fr;
  }
  
  .button-area {
    flex-direction: column;
    align-items: center;
  }
}

.meta-item {
  background-color: #D4C4B0;
  color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

</style>