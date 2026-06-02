<template>
  <div class="rhythm-view">
    <div class="container">
      <h1 class="page-title">偶之韵 · 木偶数字典藏与创作</h1>
      <p class="page-description">探索木偶戏的韵律之美，感受传统艺术的节奏与魅力</p>
      
      <div class="content-section">
        <h2>木偶相关数字资产</h2>
        <h3>木偶类别展示</h3>
        
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>
        
        <div v-else-if="error" class="error-container">
          <p>{{ error }}</p>
          <button class="retry-btn" @click="fetchPuppets">重新加载</button>
        </div>
        
        <div v-else-if="puppets.length === 0" class="empty-container">
          <p>暂无数据</p>
        </div>
        
        <div v-else class="puppet-categories">
          <div v-for="puppet in puppets.slice(0, 3)" :key="puppet._id" class="category-item">
            <div v-if="puppet.image_url" class="puppet-image">
              <img :src="puppet.image_url" :alt="puppet.name">
            </div>
            <h4>{{ puppet.name }}</h4>
            <p>{{ puppet.description }}</p>
            <button class="detail-btn" @click="viewPuppetDetail(puppet.name)">查看详情</button>
          </div>
        </div>
        
        <!-- 详情模态框 -->
        <div v-if="showDetailModal" class="modal-overlay" @click="closeDetailModal">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <h3>{{ currentDetail.title }}</h3>
              <button class="close-btn" @click="closeDetailModal">&times;</button>
            </div>
            <div class="modal-body">
              <p>{{ currentDetail.content }}</p>
            </div>
            <div class="modal-footer">
              <button class="close-btn" @click="closeDetailModal">关闭</button>
            </div>
          </div>
        </div>
        
        <div class="more-btn-container">
          <button class="more-btn" @click="navigateToMorePuppets">查看更多木偶类别</button>
        </div>
      </div>
      
      <div class="video-section">
        <h2>经典演出视频</h2>
        
        <div v-if="videosLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>
        
        <div v-else-if="videosError" class="error-container">
          <p>{{ videosError }}</p>
          <button class="retry-btn" @click="fetchVideos">重新加载</button>
        </div>
        
        <div v-else-if="videos.length === 0" class="empty-container">
          <p>暂无数据</p>
        </div>
        
        <div v-else class="video-grid">
          <div v-for="video in videos" :key="video._id" class="video-item">
            <h4>{{ video.title }}</h4>
            <p>类型：{{ video.category }} | 地区：{{ video.region }}</p>
            <p>{{ video.description }}</p>
            <button class="watch-btn" @click="viewVideoDetail(video.title)">观看视频</button>
          </div>
        </div>
        
        <div class="more-btn-container">
          <button class="more-btn" @click="navigateToMoreVideos">查看更多演出视频</button>
        </div>
      </div>
      
      <div class="inheritor-section">
        <h2>非遗传承人</h2>

        <div class="inheritor-grid">
          <div class="inheritor-item">
            <div class="inheritor-avatar">庄</div>
            <h4>庄陈华</h4>
            <p class="inheritor-level">国家级非遗传承人 · 第三批</p>
            <p class="inheritor-type">漳州布袋木偶戏</p>
            <p class="inheritor-birth">1947— · 国家一级演员</p>
            <p class="inheritor-desc">丑角泰斗，独创膝关节灵活操控，十指灵动让木偶人偶合一。代表剧目：《大名府·把门官》《抢亲》《八仙过海》。获"漳州门官第一"美誉。</p>
            <p class="inheritor-achievement">培养20余位专业演员，编写《漳州布袋木偶丑角表演教程》</p>
          </div>
          <div class="inheritor-item">
            <div class="inheritor-avatar">黄</div>
            <h4>黄奕缺</h4>
            <p class="inheritor-level">国家级非遗传承人 · 首批</p>
            <p class="inheritor-type">泉州提线木偶戏</p>
            <p class="inheritor-birth">1928—2007 · 一代宗师</p>
            <p class="inheritor-desc">被誉为"中国第一提线"，独创36线精细操控，能完成写字、斟酒、舞剑、喷火、变脸等高难特技。代表剧目：《目连救母》《三藏取经》《火焰山》。</p>
            <p class="inheritor-achievement">北京奥运会开幕式木偶表演总设计，著有《泉州提线木偶戏表演艺术》</p>
          </div>
          <div class="inheritor-item">
            <div class="inheritor-avatar">丁</div>
            <h4>丁清波</h4>
            <p class="inheritor-level">国家级非遗传承人 · 第二批</p>
            <p class="inheritor-type">潮州铁枝木偶戏</p>
            <p class="inheritor-birth">1963— · 新源香木偶团团长</p>
            <p class="inheritor-desc">精通铁枝操控+潮剧唱腔，恢复失传绝技：顶锅、抽纸龙、转瓷盘、提花瓶等杂技表演。代表剧目：《唐僧收三徒》《杂技》《八仙贺寿》。</p>
            <p class="inheritor-achievement">年均演出超200场，整理传统剧目30余部，编写《铁枝木偶操控与唱腔教程》</p>
          </div>
          <div class="inheritor-item">
            <div class="inheritor-avatar">周</div>
            <h4>周尔禄</h4>
            <p class="inheritor-level">国家级非遗传承人 · 唯一</p>
            <p class="inheritor-type">泰顺药发木偶戏</p>
            <p class="inheritor-birth">1945— · 浙江泰顺大安乡</p>
            <p class="inheritor-desc">大安周氏药发木偶第十代传人，13岁学艺，精通药发制作全流程（100+筒花、300+引线）。代表剧目：《八仙过海》《大闹天宫》《水漫金山》。</p>
            <p class="inheritor-achievement">2020年全国乡村能巧匠，2021年国家级非遗传承人评估合格</p>
          </div>
        </div>

        <div class="more-btn-container">
          <button class="more-btn" @click="navigateToMoreInheritors">查看更多传承人信息</button>
        </div>
      </div>
      
      <!-- ===================== 只升级这里：木偶DIY创作 ===================== -->
      <div class="diy-section">
        <h2>木偶DIY创作</h2>
        <p>通过AI辅助生成独特的木偶形象，体验创作的乐趣</p>
        
        <div class="diy-container">
          <!-- DIY素材库（扩充大量素材 + 点击交互） -->
          <div class="diy-materials">
            <h3>DIY 素材库</h3>
            <div class="materials-grid">
              <!-- 头部 -->
              <div class="material-item" @click="selectPart('head', '/src/assets/images/书生头.jpg')">
                <img src="/src/assets/images/书生头.jpg" alt="书生头" class="material-image">
                <h4>书生头</h4>
                <p>传统文生脸谱</p>
              </div>
              <div class="material-item" @click="selectPart('head', '/src/assets/images/武将头.jpg')">
                <img src="/src/assets/images/武将头.jpg" alt="武将头" class="material-image">
                <h4>武将头</h4>
                <p>武生脸谱</p>
              </div>
              <div class="material-item" @click="selectPart('head', '/src/assets/images/花旦头.jpg')">
                <img src="/src/assets/images/花旦头.jpg" alt="花旦头" class="material-image">
                <h4>花旦头</h4>
                <p>旦角造型</p>
              </div>
              <div class="material-item" @click="selectPart('head', '/src/assets/images/丑角头.jpg')">
                <img src="/src/assets/images/丑角头.jpg" alt="丑角头" class="material-image">
                <h4>丑角头</h4>
                <p>喜剧脸谱</p>
              </div>

              <!-- 身体 -->
              <div class="material-item" @click="selectPart('body', '/src/assets/images/文生长袍.jpg')">
                <img src="/src/assets/images/文生长袍.jpg" alt="文生长袍" class="material-image">
                <h4>文生长袍</h4>
                <p>传统文人服饰</p>
              </div>
              <div class="material-item" @click="selectPart('body', '/src/assets/images/武将盔甲.jpg')">
                <img src="/src/assets/images/武将盔甲.jpg" alt="武将铠甲" class="material-image">
                <h4>武将铠甲</h4>
                <p>古代战甲</p>
              </div>
              <div class="material-item" @click="selectPart('body', '/src/assets/images/花旦戏服.jpg')">
                <img src="/src/assets/images/花旦戏服.jpg" alt="花旦戏服" class="material-image">
                <h4>花旦戏服</h4>
                <p>古典女式戏服</p>
              </div>
              <div class="material-item" @click="selectPart('body', '/src/assets/images/短打装束.jpg')">
                <img src="/src/assets/images/短打装束.jpg" alt="短打装束" class="material-image">
                <h4>短打装束</h4>
                <p>民间百姓造型</p>
              </div>
            </div>
          </div>
          
          <!-- DIY创作区域（实时预览） -->
          <div class="diy-workspace">
            <h3>DIY创作区域</h3>
            <div class="workspace-area">
              <div class="puppet-preview">
                <img 
                  v-if="selectedParts.body" 
                  :src="selectedParts.body" 
                  :class="['puppet-body', getBodyClass(selectedParts.body)]"
                  :style="partStyles.body"
                  @mousedown="startDrag('body', $event)"
                  @wheel="handleWheel('body', $event)"
                >
                <img 
                  v-if="selectedParts.costume" 
                  :src="selectedParts.costume" 
                  class="puppet-costume"
                  :style="partStyles.costume"
                  @mousedown="startDrag('costume', $event)"
                  @wheel="handleWheel('costume', $event)"
                >
                <img 
                  v-if="selectedParts.head" 
                  :src="selectedParts.head" 
                  :class="['puppet-head', getHeadClass(selectedParts.head, selectedParts.body)]"
                  :style="partStyles.head"
                  @mousedown="startDrag('head', $event)"
                  @wheel="handleWheel('head', $event)"
                >
                <img 
                  v-if="selectedParts.accessory" 
                  :src="selectedParts.accessory" 
                  class="puppet-accessory"
                  :style="partStyles.accessory"
                  @mousedown="startDrag('accessory', $event)"
                  @wheel="handleWheel('accessory', $event)"
                >
                
                <div class="placeholder" v-if="!hasSelectedParts">
                  <div class="plus-icon">+</div>
                  <p>点击左侧素材开始创作</p>
                </div>
              </div>
            </div>

            <div class="diy-buttons">
              <button class="reset-btn" @click="resetPuppet">重置创作</button>
              <button class="ai-diy-btn" @click="goToAIDiy">
                <i class="bi bi-robot"></i>AI辅助DIY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// RhythmView组件逻辑（完全保留原有代码，只新增DIY交互逻辑）
import { useRouter } from 'vue-router';
import { ref, nextTick, onMounted, computed } from 'vue';

const router = useRouter();
const showDetailModal = ref(false);
const currentDetail = ref({
  title: '',
  content: ''
});

// 木偶类别详情内容
const puppetDetails = {
  '泉州提线木偶戏': {
    title: '泉州提线木偶戏',
    content: `提线木偶戏（悬丝木偶）—— 最经典、高端、主流造型

别称：线偶、悬丝傀儡。

核心造型特征：全身立体人偶，头部、躯干、四肢完整，多为实木雕刻，体型一般30~80cm，关节灵活；头顶、背部、四肢绑有提线，由上方线板操控，是结构最复杂、造型最精致的木偶品类。

面部/服饰造型：脸谱化雕刻，生旦净丑行当齐全，头饰华丽，服饰仿戏曲戏服，刺绣精致，多为古典戏曲人物、神话角色、历史人物造型。

剧本：拥有700余出传统剧目，涵盖历史故事、神话传说、民间故事等。代表剧目包括《火焰山》《水漫金山》《目连救母》《刘秀中兴》等。这些剧目多改编自历史小说、民间传说和古典文学作品，如《三国演义》《西游记》等。

唱词：泉州提线木偶戏有自己的剧种唱腔，完整保存了将近300支曲牌调。唱腔糅合南音和闽南的地方音乐，保留了古乐器的演奏技法，情韵深沉清丽。乐器以小唢呐为主，配以钲、锣、拍、南鼓等打击乐器，声腔高亢，跌宕多变。说白念唱以泉州方言为主，有时夹杂"官话"（土腔普通话），俗称"傀儡调"；间或穿插有腔无字的传统帮腔，如"唠哩"。`
  },
  '晋江布袋木偶戏': {
    title: '晋江布袋木偶戏',
    content: `木偶戏古称"傀儡戏"、"傀儡子"，是由艺人操作木偶表演故事的一种戏曲形式。

中国的木偶戏兴起于汉代，至唐代有了新的发展和提高，能用木偶演出歌舞戏。宋代是我国木偶戏发展的一个重要时期，木偶的制作工艺和操纵技艺进一步成熟。随着社会经济的发展，明代木偶戏已流行全国各地，经济发达的南方各省区木偶戏更为繁荣，故有"南方好傀儡"之说。清代以后木偶戏进入全盛时期，不仅流行范围广，而且演出的声腔也日益增多，出现了辽西木偶戏、漳州布袋木偶戏、泉州提线木偶戏、晋江布袋木偶戏、邵阳布袋木偶戏、高州木偶戏、潮州铁枝木偶戏、川北大木偶戏、石阡木偶戏、阳提线木偶戏、泰顺药发木偶戏、临高人偶戏等分支。就演出形式而言，可概括为提线木偶、杖头木偶、布袋木偶、铁枝木偶、药发木偶五种。

木偶艺术精美绝伦，令人叹为观止。除了艺人的精彩表演外，完美的偶人造型艺术和操作装备也是吸引广大观众的一个重要方面。造型艺术重在木偶的雕刻和设计，就一般情况而言，提线木偶造型较高，多在2.2尺左右。关键部位均缀以提线，最多可达三十多条，至少也有十余条，如进行特技表演还须根据需要增加若干辅助提线。木偶人表演各种舞蹈身段及武打技艺的水准，完全取决于艺人的操作技巧，这是提线木偶表演艺术水平高低的关键。杖头木偶高于提线木偶，一般偶高3尺左右，装有三条操作线，两条牵动双手，一条支配头部与身躯表演。布袋木偶造型最小，仅有7寸左右，靠艺人两手托举表演，操作技艺特别，不同于提线和杖头木偶。

中华人民共和国成立以后，木偶戏的表演更加丰富多彩。除了演出传统的戏曲节目外，还表演话剧、歌舞剧、连续剧，甚至出演广告等。与此同时，木偶戏也面临着与其他艺术形式的激烈竞争。传统的木偶戏蕴藏着各地、各民族人民的思想、道德和审美意识，应加以扶持和保护。

晋江布袋木偶戏即南派布袋戏，指泉州地区掌中木偶戏，以泉腔演唱，有别于唱北调的漳州北派布袋戏。1951年7月，闽南布袋戏定名为掌中木偶戏，是我国木偶戏中的稀有剧种。

南派布袋戏流行于闽南地区，其源头可追溯到晋代《拾遗记》及五代《化书》、南宋《巳末元日》中的史料记载。明中时至清末，是南派布袋戏兴起与发展时期，民间传说和《台湾通志》称，布袋戏兴起于明嘉靖间，创始人为后来被誉为"戏状元"的梁炳麟。清中叶，晋江等地的布袋戏演出兴盛，并传至台湾，同时出现了李克茶等著名艺人。清末民初，泉属各县一些著名的布袋戏班社纷纷兴起，如清同治、光绪年间的闽南"五虎班"。民国时期，安溪、惠安等地的布袋戏班几乎遍及全县。但至中华人民共和国成立前夕，由于经济衰退，泉属诸县的布袋戏班社处境维艰。

中华人民共和国成立后，南派布袋戏获得了新生。20世纪50年代，晋江等县组织挖掘记录了200多个布袋戏剧目和音乐曲牌。新时期以来，南派布袋戏得到了进一步的发展，其主要承载体为晋江市掌中木偶戏剧团。建团50多年来，多次进京演出。参加戏剧赛事和国际木偶节，并获得省级、国家级的奖誉。剧目《白龙公主》、《五里长虹》获得文化部嘉奖和第九届文华奖。

南派布袋戏具有兼收并蓄，博采众长的特点，地域文化特征明显。其艺术风格独特，行当脚色分工细致，木偶头雕刻形神兼备，表演细腻，动作传神，深受广大观众的喜爱。但由于受到当前商品经济的影响，这一传统的艺术形式遭到不断冲击，如不加以保护，将面临消亡的危机。`
  }
};

// 木偶类别数据
const puppets = ref([]);
const loading = ref(false);
const error = ref(null);

// 视频数据
const videos = ref([]);
const videosLoading = ref(false);
const videosError = ref(null);

// DIY创作相关变量（原有 + 增强）
const diyImage = ref('');
const chatMessages = ref(null);

// AI辅助DIY相关函数
const goToAIDiy = () => {
  router.push('/ai-diy');
};

// ===================== 新增：真正DIY交互逻辑 =====================
const selectedParts = ref({
  head: '',
  body: '',
  costume: '',
  accessory: ''
});

const partStyles = ref({
  head: { transform: 'translate(-50%, 0)' },
  body: { transform: 'translate(-50%, 0)' },
  costume: { transform: 'translate(-50%, 0)' },
  accessory: { transform: 'translate(-50%, 0)' }
});

// 拖拽相关变量
const isDragging = ref(false);
const currentPart = ref('');
const dragStartX = ref(0);
const dragStartY = ref(0);
const initialOffset = ref({ x: 0, y: 0 });

const hasSelectedParts = computed(() => {
  return selectedParts.value.head || selectedParts.value.body || 
         selectedParts.value.costume || selectedParts.value.accessory;
});

// 点击选择素材
const selectPart = (type, url) => {
  selectedParts.value[type] = url;
  // 重置该部分的样式
  partStyles.value[type] = { transform: 'translate(-50%, 0)' };
};

// 开始拖拽
const startDrag = (part, event) => {
  isDragging.value = true;
  currentPart.value = part;
  
  // 记录初始位置
  dragStartX.value = event.clientX;
  dragStartY.value = event.clientY;
  
  // 解析当前的偏移量
  const currentTransform = partStyles.value[part]?.transform || 'translate(-50%, 0)';
  const match = currentTransform.match(/translate\(-50%,\s*([-\d.]+)px\)/);
  if (match) {
    initialOffset.value.y = parseFloat(match[1]) || 0;
  } else {
    initialOffset.value.y = 0;
  }
  
  // 添加鼠标移动和释放事件监听器
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
};

// 拖拽中
const onDrag = (event) => {
  if (!isDragging.value || !currentPart.value) return;
  
  // 计算移动距离
  const deltaY = event.clientY - dragStartY.value;
  
  // 更新样式
  partStyles.value[currentPart.value] = {
    transform: `translate(-50%, ${initialOffset.value.y + deltaY}px)`
  };
};

// 停止拖拽
const stopDrag = () => {
  isDragging.value = false;
  currentPart.value = '';
  
  // 移除事件监听器
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
};

// 处理鼠标滚轮缩放
const handleWheel = (part, event) => {
  event.preventDefault();
  
  // 计算缩放比例
  const delta = event.deltaY > 0 ? 0.9 : 1.1;
  
  // 获取当前样式
  const currentStyle = partStyles.value[part] || {};
  
  // 解析当前的缩放比例
  let currentScale = 1;
  if (currentStyle.transform) {
    const scaleMatch = currentStyle.transform.match(/scale\(([\d.]+)\)/);
    if (scaleMatch) {
      currentScale = parseFloat(scaleMatch[1]) || 1;
    }
  }
  
  // 计算新的缩放比例
  let newScale = currentScale * delta;
  
  // 限制缩放范围
  newScale = Math.max(0.5, Math.min(2, newScale));
  
  // 解析当前的位移
  let translate = 'translate(-50%, 0)';
  if (currentStyle.transform) {
    const translateMatch = currentStyle.transform.match(/translate\(-50%,\s*([-\d.]+px)?\)/);
    if (translateMatch) {
      translate = `translate(-50%, ${translateMatch[1] || '0'})`;
    }
  }
  
  // 更新样式
  partStyles.value[part] = {
    transform: `${translate} scale(${newScale})`
  };
};

// 重置木偶创作
const resetPuppet = () => {
  selectedParts.value = {
    head: '',
    body: '',
    costume: '',
    accessory: ''
  };
  // 重置样式
  partStyles.value = {
    head: { transform: 'translate(-50%, 0)' },
    body: { transform: 'translate(-50%, 0)' },
    costume: { transform: 'translate(-50%, 0)' },
    accessory: { transform: 'translate(-50%, 0)' }
  };
  diyImage.value = '';
};

// 智能调整函数 - 根据素材类型自动调整位置
const getBodyClass = (bodyUrl) => {
  if (!bodyUrl) return '';
  
  if (bodyUrl.includes('文生长袍')) {
    return 'body-robes';
  } else if (bodyUrl.includes('武将盔甲')) {
    return 'body-armor';
  } else if (bodyUrl.includes('花旦戏服')) {
    return 'body-dress';
  } else if (bodyUrl.includes('短打装束')) {
    return 'body-short';
  }
  return '';
};

const getHeadClass = (headUrl, bodyUrl) => {
  if (!headUrl) return '';
  
  let headClass = '';
  
  // 根据头部类型调整
  if (headUrl.includes('花旦头')) {
    headClass = 'head-female';
  } else if (headUrl.includes('武将头')) {
    headClass = 'head-warrior';
  } else if (headUrl.includes('书生头')) {
    headClass = 'head-scholar';
  } else if (headUrl.includes('丑角头')) {
    headClass = 'head-clown';
  }
  
  // 根据身体类型进一步调整
  if (bodyUrl) {
    if (bodyUrl.includes('文生长袍') && headUrl.includes('书生头')) {
      headClass += ' head-with-robes';
    } else if (bodyUrl.includes('花旦戏服') && headUrl.includes('花旦头')) {
      headClass += ' head-with-dress';
    }
  }
  
  return headClass;
};

// ===============================================================

// 获取木偶类别数据
const fetchPuppets = () => {
  loading.value = true;
  error.value = null;
  
  // 直接使用模拟数据，确保页面能正常显示
  puppets.value = [
    {
      _id: '1',
      name: '泉州提线木偶戏',
      description: '提线木偶是一种传统的木偶形式，通过线索控制木偶的动作，表现力丰富，历史悠久。',
      region: '福建、广东',
      image_url: ''
    },
    {
      _id: '2',
      name: '杖头木偶',
      description: '杖头木偶中国传统木偶戏的主要形式之一，通过木杖控制木偶的头部和手部动作。',
      region: '北京、陕西、四川',
      image_url: ''
    },
    {
      _id: '3',
      name: '晋江布袋木偶戏',
      description: '布袋木偶又称掌中木偶，演员通过手掌控制木偶，动作灵活，表演细腻。',
      region: '福建泉州、漳州',
      image_url: ''
    }
  ];
  loading.value = false;
  
  // 尝试从云端获取数据（如果可用）
  if (typeof window !== 'undefined' && window.BaaS) {
    const getAllPuppets = async () => {
      let allPuppets = [];
      let offset = 0;
      const limit = 100;
      let hasMore = true;
      
      while (hasMore) {
        try {
          const Puppet = new window.BaaS.TableObject('puppets');
          const query = new window.BaaS.Query();
          const res = await Puppet.setQuery(query).limit(limit).offset(offset).find();
          const puppetsPage = res.data.objects;
          allPuppets = [...allPuppets, ...puppetsPage];
          
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
      if (allPuppets.length > 0) {
        puppets.value = allPuppets;
      }
      loading.value = false;
    }).catch(err => {
      console.error('获取木偶类别数据失败，使用模拟数据', err);
      loading.value = false;
    });
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchPuppets();
  fetchVideos();
});

// 获取视频数据
const fetchVideos = () => {
  videosLoading.value = true;
  videosError.value = null;
  
  // 直接使用模拟数据，确保页面能正常显示
  videos.value = [
    {
      _id: '1',
      title: '《大闹天宫》',
      category: '提线木偶',
      region: '福建',
      description: '经典传统剧目，讲述孙悟空大闹天宫的故事，木偶动作精湛，场面壮观。',
      video_url: ''
    },
    {
      _id: '2',
      title: '《花木兰》',
      category: '杖头木偶',
      region: '陕西',
      description: '根据中国传统故事改编，展现花木兰代父从军的英雄事迹。',
      video_url: ''
    }
  ];
  videosLoading.value = false;
  
  // 尝试从云端获取数据（如果可用）
  if (typeof window !== 'undefined' && window.BaaS) {
    const getAllVideos = async () => {
      let allVideos = [];
      let offset = 0;
      const limit = 100;
      let hasMore = true;
      
      while (hasMore) {
        try {
          const Video = new window.BaaS.TableObject('videos');
          const query = new window.BaaS.Query();
          const res = await Video.setQuery(query).limit(limit).offset(offset).find();
          const videosPage = res.data.objects;
          allVideos = [...allVideos, ...videosPage];
          
          hasMore = videosPage.length === limit;
          offset += limit;
        } catch (err) {
          console.error('获取分页数据失败', err);
          throw err;
        }
      }
      
      return allVideos;
    };
    
    getAllVideos().then(allVideos => {
      console.log('获取所有视频数据成功', allVideos);
      if (allVideos.length > 0) {
        videos.value = allVideos;
      }
      videosLoading.value = false;
    }).catch(err => {
      console.error('获取视频数据失败，使用模拟数据', err);
      videosLoading.value = false;
    });
  }
};

// 查看木偶类别详情
const viewPuppetDetail = (type) => {
  console.log('View puppet detail clicked from Rhythm:', type);
  
  // 根据木偶类型跳转到对应的详情页面
  if (type === '泉州提线木偶戏') {
    router.push('/quanzhou-puppet');
  } else if (type === '晋江布袋木偶戏') {
    router.push('/jinjiang-puppet');
  } else {
    // 其他木偶类型跳转到通用详情页面
    try {
      router.push({
        name: 'Detail',
        params: {
          type: 'puppet',
          name: type
        }
      });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }
};

// 关闭详情模态框
const closeDetailModal = () => {
  showDetailModal.value = false;
};

// 跳转到更多木偶类别页面
const navigateToMorePuppets = () => {
  router.push('/puppet-categories');
};

// 跳转到更多演出视频页面
const navigateToMoreVideos = () => {
  router.push('/videos');
};

// 跳转到更多传承人页面
const navigateToMoreInheritors = () => {
  router.push('/inheritors');
};

// 查看传承人详情
const viewInheritorDetail = (name) => {
  router.push(`/detail/inheritor/${name}`);
};

// 查看视频详情
const viewVideoDetail = (name) => {
  router.push(`/detail/video/${name}`);
};

// 添加素材到创作（保留兼容）
const addMaterial = (materialType) => {
  console.log('添加素材:', materialType);
  alert(`已添加${getMaterialName(materialType)}到创作`);
};

// 获取素材名称
const getMaterialName = (materialType) => {
  const materialNames = {
    head: '木偶头部',
    body: '木偶身体',
    costume: '木偶服装',
    accessory: '木偶配件'
  };
  return materialNames[materialType] || materialType;
};
</script>

<style scoped>
/* 偶之韵页面样式（完全不变，只新增DIY预览样式） */
.rhythm-view {
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

.content-section h3 {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
}

.content-section p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 1.5rem;
}

.puppet-categories {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.category-item {
  flex: 1;
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 350px;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.category-item h4 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.puppet-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.puppet-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-item:hover .puppet-image img {
  transform: scale(1.05);
}

/* 加载状态样式 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #8B6954;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  color: #6c757d;
  font-size: 1.1rem;
  margin: 0;
}

/* 错误状态样式 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.error-container p {
  color: #dc3545;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.retry-btn {
  background-color: #8B6954;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background-color: #6B4934;
}

/* 空状态样式 */
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.empty-container p {
  color: #6c757d;
  font-size: 1.1rem;
  margin: 0;
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

.more-btn-container {
  text-align: center;
  margin-top: 2rem;
}

.more-btn {
  background-color: #D4C4B0;
  color: #333;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.more-btn:hover {
  background-color: #C0B098;
}

.video-section {
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;
}

.video-section h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
}

.video-grid {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.video-item {
  flex: 1;
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
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

.inheritor-section {
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.inheritor-section h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
}

.inheritor-grid {
  display: flex;
  gap: 2rem;
}

.inheritor-item {
  flex: 1;
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
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
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.inheritor-level {
  color: #8B6954 !important;
  font-weight: bold;
}

.inheritor-type {
  color: #6B4934 !important;
  font-weight: 600;
}

.inheritor-birth {
  font-size: 0.9rem !important;
  color: #999 !important;
}

.inheritor-desc {
  font-size: 0.95rem !important;
  color: #555 !important;
  text-align: left;
  line-height: 1.6;
  margin-top: 0.5rem;
}

.inheritor-achievement {
  font-size: 0.85rem !important;
  color: #8B6954 !important;
  font-style: italic;
  text-align: left;
  border-top: 1px solid #e0d5c7;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
}

/* 木偶DIY创作板块样式（增强：实时分层预览） */
.diy-section {
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-top: 4rem;
}

.diy-section h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.diy-section p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 3rem;
}

.diy-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.diy-materials {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  max-height: 700px;
  overflow-y: auto;
}

.diy-materials h3 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.materials-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.material-item {
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.material-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid #8B6954;
}

.material-image {
  width: 100%;
  height: 100px;
  object-fit: contain;
  border-radius: 5px;
  margin-bottom: 0.8rem;
  background-color: #f5f5f5;
}

.material-item h4 {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  color: #333;
}

.material-item p {
  font-size: 0.85rem;
  color: #6c757d;
  margin: 0;
}

.diy-workspace {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.diy-workspace h3 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
  align-self: flex-start;
}

.workspace-area {
  width: 100%;
  height: 450px;
  background-color: white;
  border: 2px dashed #D4C4B0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

/* 核心：木偶分层预览 */
.puppet-preview {
  position: relative;
  width: 300px;
  height: 450px;
}
.puppet-body {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 75%;
  z-index: 1;
  cursor: move;
}
.puppet-costume {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  height: 50%;
  z-index: 2;
  cursor: move;
}
.puppet-head {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  height: 25%;
  z-index: 3;
  cursor: move;
}
.puppet-accessory {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  height: 20%;
  z-index: 4;
  cursor: move;
}

/* 智能调整样式 */
.body-robes {
  height: 80% !important;
}

.body-armor {
  height: 75% !important;
  bottom: 5% !important;
}

.body-dress {
  height: 85% !important;
  bottom: 0 !important;
}

.body-short {
  height: 70% !important;
  bottom: 10% !important;
}

.head-female {
  top: 0% !important;
  height: 25% !important;
}

.head-warrior {
  top: 5% !important;
  height: 28% !important;
}

.head-scholar {
  top: 3% !important;
  height: 25% !important;
}

.head-clown {
  top: 3% !important;
  height: 24% !important;
}

/* 组合调整 */
.head-with-robes {
  top: 5% !important;
}

.head-with-dress {
  top: 2% !important;
}

.placeholder {
  text-align: center;
  color: #6c757d;
}

.plus-icon {
  font-size: 3rem;
  color: #D4C4B0;
  margin-bottom: 1rem;
}

.diy-preview {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.diy-buttons {
  display: flex;
  gap: 1rem;
}

.reset-btn {
  background-color: #e9ecef;
  color: #333;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.reset-btn:hover {
  background-color: #ced4da;
}

.ai-diy-btn {
  background-color: #8B6954;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ai-diy-btn:hover {
  background-color: #6B4934;
  transform: translateY(-3px);
}

/* 详情模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  padding: 2rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 2rem;
  max-height: 60vh;
  overflow-y: auto;
}

.modal-body p {
  font-size: 1rem;
  line-height: 1.8;
  color: #333;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
}

.modal-footer .close-btn {
  background-color: #D4C4B0;
  color: #333;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.modal-footer .close-btn:hover {
  background-color: #C0B098;
  color: #333;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .puppet-categories,
  .video-grid,
  .inheritor-grid {
    flex-direction: column;
  }
  
  .diy-container {
    grid-template-columns: 1fr;
  }
  
  .content-section,
  .video-section,
  .inheritor-section,
  .diy-section {
    padding: 2rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .materials-grid {
    grid-template-columns: 1fr;
  }
  
  .workspace-area {
    height: 300px;
  }

  .ai-diy-btn {
    padding: 0.75rem 2rem;
    font-size: 1rem;
  }
}
</style>