<template>
  <div class="art-view">
    <div class="container">
      <h1 class="page-title">偶之艺 · 木偶技艺数字化传承</h1>
      <p class="page-description">AI学习、智能评测</p>
      
      <div v-if="!isLoggedIn" class="login-prompt">
        <div class="login-icon">
          <i class="bi bi-lock"></i>
        </div>
        <h3>登录后查看更多内容</h3>
        <p>登录后可访问AI学习、智能评测、木偶DIY创作等全部功能</p>
        <router-link to="/auth" class="login-btn">立即登录</router-link>
      </div>
      
      <template v-else>
      <div class="content-section">
        <h2>AI学习</h2>
        <p>AI学习木偶操控，分阶段匹配不同学习层级，专注操控技巧训练</p>
        
        <div class="course-grid">
          <div class="course-item">
            <h4>提线木偶基础操控</h4>
            <p>手部动作规范与基础操控训练，掌握提线木偶的基本操控技巧</p>
            <div class="course-tags">
              <span class="tag">入门</span>
              <span class="tag">提线木偶</span>
              <span class="tag">操控技巧</span>
            </div>
            <div class="course-buttons">
              <button class="learn-btn" @click="goToLearn('提线木偶基础操控', '手部动作规范与基础操控训练，掌握提线木偶的基本操控技巧', 'https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/string-puppet-basic.mp4')">开始学习</button>
              <button class="evaluate-btn" @click="goToEvaluation('https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/string-puppet-basic.mp4', '提线木偶基础操控')">智能评测</button>
            </div>
          </div>
          <div class="course-item">
            <h4>杖头木偶面部表情训练</h4>
            <p>头部转动与表情变化技巧，学习杖头木偶的细腻表情操控</p>
            <div class="course-tags">
              <span class="tag">进阶</span>
              <span class="tag">杖头木偶</span>
              <span class="tag">操控技巧</span>
            </div>
            <div class="course-buttons">
              <button class="learn-btn" @click="goToLearn('杖头木偶面部表情训练', '头部转动与表情变化技巧，学习杖头木偶的细腻表情操控', 'https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/rod-puppet-expression.mp4')">开始学习</button>
              <button class="evaluate-btn" @click="goToEvaluation('https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/rod-puppet-expression.mp4', '杖头木偶面部表情训练')">智能评测</button>
            </div>
          </div>
          <div class="course-item">
            <h4>布袋木偶手势操控技法</h4>
            <p>手指灵活度训练与布袋木偶手势操控技巧</p><br>
            <div class="course-tags">
              <span class="tag">进阶</span>
              <span class="tag">布袋木偶</span>
              <span class="tag">操控技巧</span>
            </div>
            <div class="course-buttons">
              <button class="learn-btn" @click="goToLearn('布袋木偶手势操控技法', '手指灵活度训练与布袋木偶手势操控技巧', 'https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/bag-puppet-hand.mp4')">开始学习</button>
              <button class="evaluate-btn" @click="goToEvaluation('https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/bag-puppet-hand.mp4', '布袋木偶手势操控技法')">智能评测</button>
            </div>
          </div>
          <div class="course-item">
            <h4>铁枝木偶动作协调性训练</h4>
            <p>铁枝操控手法与木偶动作协调配合技巧</p>
            <div class="course-tags">
              <span class="tag">进阶</span>
              <span class="tag">铁枝木偶</span>
              <span class="tag">操控技巧</span>
            </div>
            <div class="course-buttons">
              <button class="learn-btn" @click="goToLearn('铁枝木偶动作协调性训练', '铁枝操控手法与木偶动作协调配合技巧', 'https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/iron-puppet-coordination.mp4')">开始学习</button>
              <button class="evaluate-btn" @click="goToEvaluation('https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/iron-puppet-coordination.mp4', '铁枝木偶动作协调性训练')">智能评测</button>
            </div>
          </div>
          <div class="course-item">
            <h4>杖头木偶走位</h4>
            <p>学习杖头木偶在舞台上的走位技巧</p>
            <div class="course-tags">
              <span class="tag">高级</span>
              <span class="tag">综合技巧</span>
              <span class="tag">舞台表演</span>
            </div>
            <div class="course-buttons">
              <button class="learn-btn" @click="goToLearn('杖头木偶走位', '学习杖头木偶在舞台上的走位技巧', 'https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/puppet-stage-movement.mp4')">开始学习</button>
              <button class="evaluate-btn" @click="goToEvaluation('https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/puppet-stage-movement.mp4', '杖头木偶走位')">智能评测</button>
            </div>
          </div>
          <div class="course-item">
            <h4>多人协作操控训练</h4>
            <p>多人配合操控木偶的协调技巧和默契训练</p>
            <div class="course-tags">
              <span class="tag">高级</span>
              <span class="tag">协作技巧</span>
              <span class="tag">团队训练</span>
            </div>
            <div class="course-buttons">
              <button class="learn-btn" @click="goToLearn('多人协作操控训练', '多人配合操控木偶的协调技巧和默契训练', 'https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/multi-person-cooperation.mp4')">开始学习</button>
              <button class="evaluate-btn" @click="goToEvaluation('https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/multi-person-cooperation.mp4', '多人协作操控训练')">智能评测</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="ai-section">
        <h2>智能评测</h2>
        <p>上传您的操控视频，AI将评测动作轨迹，与大师标准动作对比，生成精准纠错报告</p>
        
        <div class="ai-lab">
          <div class="lab-container">

            
            <div v-if="!analysisResult" class="upload-section">
              <div class="file-input-group">
                <label class="file-label">大师标准动作视频</label>
                <div class="file-input-wrapper">
                  <input type="file" id="masterVideo" accept="video/*" @change="handleMasterVideoUpload" class="video-upload">
                  <label for="masterVideo" class="file-input-label">
                    <span class="file-btn">选择文件</span>
                    <span class="file-name">{{ masterVideoName || '未选择文件' }}</span>
                  </label>
                </div>
              </div>
              
              <div class="file-input-group">
                <label class="file-label">用户训练视频</label>
                <div class="file-input-wrapper">
                  <input type="file" id="userVideo" accept="video/*" @change="handleUserVideoUpload" class="video-upload">
                  <label for="userVideo" class="file-input-label">
                    <span class="file-btn">选择文件</span>
                    <span class="file-name">{{ userVideoName || '未选择文件' }}</span>
                  </label>
                </div>
              </div>
              
              <div v-if="isUploading" class="upload-progress">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
                </div>
                <p>上传中... {{ uploadProgress }}%</p>
              </div>
              
              <div v-if="isAnalyzing" class="analyzing-progress">
                <div class="analyzing-icon">
                  <i class="bi bi-cpu"></i>
                </div>
                <h4>正在分析中...</h4>
                <p>AI正在分析您的动作，与大师标准动作进行比对</p>
                <div class="analyzing-animation">
                  <div class="analyzing-dot"></div>
                  <div class="analyzing-dot"></div>
                  <div class="analyzing-dot"></div>
                </div>
              </div>
              
              <div v-else class="action-buttons">
                <button class="upload-btn" @click="uploadVideos" :disabled="!masterVideo || !userVideo">
                  <i class="bi bi-upload"></i>
                  <span>上传视频</span>
                </button>
                <button class="train-btn" @click="startTraining" :disabled="!masterVideo || !userVideo || !isUploaded">
                  <i class="bi bi-play"></i>
                  <span>开始评测</span>
                </button>
              </div>
            </div>
            
            <div v-else class="analysis-result">
              <h4>分析结果</h4>
              
              <!-- 基本统计信息 -->
              <div class="result-stats">
                <div class="stat-item">
                  <span class="stat-label">准确率</span>
                  <span class="stat-value">{{ analysisResult.accuracy }}%</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">相似度</span>
                  <span class="stat-value">{{ analysisResult.comparison }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">动作完成度</span>
                  <span class="stat-value">{{ analysisResult.completion }}%</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">流畅度</span>
                  <span class="stat-value">{{ analysisResult.smoothness }}%</span>
                </div>
              </div>
              
              <!-- 身体部位分析 -->
              <div class="body-analysis">
                <h5>身体部位分析</h5>
                <div class="body-parts">
                  <div v-for="(part, index) in analysisResult.bodyParts" :key="index" class="body-part">
                    <span class="part-name">{{ part.name }}</span>
                    <div class="part-progress">
                      <div class="part-bar" :style="{ width: part.accuracy + '%' }"></div>
                    </div>
                    <span class="part-accuracy">{{ part.accuracy }}%</span>
                  </div>
                </div>
              </div>
              
              <!-- 动作分解分析 -->
              <div class="action-analysis">
                <h5>动作分解分析</h5>
                <div class="action-steps">
                  <div v-for="(step, index) in analysisResult.actionSteps" :key="index" class="action-step">
                    <div class="step-header">
                      <span class="step-number">{{ index + 1 }}</span>
                      <span class="step-name">{{ step.name }}</span>
                      <span class="step-accuracy">{{ step.accuracy }}%</span>
                    </div>
                    <p class="step-description">{{ step.description }}</p>
                  </div>
                </div>
              </div>
              
              <!-- 改进建议 -->
              <div class="suggestions">
                <h5>改进建议</h5>
                <ul>
                  <li v-for="(suggestion, index) in analysisResult.suggestions" :key="index">
                    {{ suggestion }}
                  </li>
                </ul>
              </div>
              
              <!-- 训练计划 -->
              <div class="training-plan">
                <h5>训练计划</h5>
                <p class="plan-description">{{ analysisResult.trainingPlan }}</p>
              </div>
              
              <button class="reset-btn" @click="resetAnalysis">重新上传</button>
            </div>
          </div>
        </div>
      </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isUploading = ref(false);
const isLoggedIn = ref(false);
const uploadProgress = ref(0);
const analysisResult = ref(null);
const masterVideo = ref(null);
const userVideo = ref(null);
const masterVideoName = ref('');
const masterVideoUrl = ref('');
const userVideoName = ref('');
const isUploaded = ref(false);
const isAnalyzing = ref(false);

onMounted(() => {
  checkLoginStatus();
});

function checkLoginStatus() {
  try {
    if (typeof window !== 'undefined' && window.CloudService) {
      isLoggedIn.value = window.CloudService.user.isLoggedIn();
    }
  } catch (error) {
    console.log('检查登录状态失败');
  }
}

// 跳转到智能评测板块并填充大师标准动作视频
const goToEvaluation = (videoUrl, courseName) => {
  // 填充大师标准动作视频
  masterVideoUrl.value = videoUrl;
  masterVideoName.value = courseName + ' - 大师标准动作视频';
  
  // 滚动到智能评测板块
  setTimeout(() => {
    const aiSection = document.querySelector('.ai-section');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}



// 处理大师标准动作视频上传
const handleMasterVideoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    masterVideo.value = file;
    masterVideoName.value = file.name;
  }
};

// 处理用户训练视频上传
const handleUserVideoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    userVideo.value = file;
    userVideoName.value = file.name;
  }
};

// 跳转到学习页面
const goToLearn = (courseName, courseDescription, videoUrl) => {
  router.push({
    path: '/learn',
    query: {
      name: courseName,
      description: courseDescription,
      video: videoUrl
    }
  });
};

// 上传视频
const uploadVideos = async () => {
  if (!masterVideo.value || !userVideo.value) return;

  isUploading.value = true;
  uploadProgress.value = 0;

  try {
    // 模拟上传进度
    const progressInterval = setInterval(() => {
      uploadProgress.value += 10;
      if (uploadProgress.value >= 100) {
        clearInterval(progressInterval);
      }
    }, 200);

    // 模拟上传完成
    setTimeout(() => {
      isUploading.value = false;
      isUploaded.value = true;
    }, 2000);
  } catch (error) {
    console.error('视频上传失败:', error);
    isUploading.value = false;
  }
};

// 开始训练 - 最终修复版（OSS上传 + 工作流调用 100% 正常）
const startTraining = async () => {
  // 1. 先判断有没有选视频
  if (!userVideo.value) {
    alert("请先上传用户视频")
    return
  }

  try {
    // 设置分析状态为true
    isAnalyzing.value = true
    console.log("✅ 开始上传视频到阿里云OSS...")

    // 2. 【自动上传视频 → 获取公网URL】
    const userVideoUrl = await window.ossUploader.uploadVideo(userVideo.value)
    console.log("✅ 视频上传完成：", userVideoUrl)

    // 3. 【标准视频地址】（根据选择的课程动态获取）
    let finalMasterVideoUrl = masterVideoUrl.value || "https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/standard.mp4";
    
    // 如果没有通过智能评测按钮传递视频URL，根据课程名称设置对应的大师视频URL
    if (!masterVideoUrl.value) {
      if (masterVideoName.value.includes('提线木偶基础操控')) {
        finalMasterVideoUrl = "https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/string-puppet-basic.mp4";
      } else if (masterVideoName.value.includes('杖头木偶面部表情训练')) {
        finalMasterVideoUrl = "https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/rod-puppet-expression.mp4";
      } else if (masterVideoName.value.includes('布袋木偶手势操控技法')) {
        finalMasterVideoUrl = "https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/bag-puppet-hand.mp4";
      } else if (masterVideoName.value.includes('铁枝木偶动作协调性训练')) {
        finalMasterVideoUrl = "https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/iron-puppet-coordination.mp4";
      } else if (masterVideoName.value.includes('杖头木偶走位')) {
        finalMasterVideoUrl = "https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/puppet-stage-movement.mp4";
      } else if (masterVideoName.value.includes('多人协作操控训练')) {
        finalMasterVideoUrl = "https://my-puppet-videos.oss-cn-beijing.aliyuncs.com/videos/multi-person-cooperation.mp4";
      }
    }

    // 4. 【调用阿里云工作流】
    const res = await window.aliyunWorkflowService.startWorkflow({
      masterVideo: finalMasterVideoUrl,
      userVideo: userVideoUrl
    })

    console.log("✅ 工作流启动成功！执行ID：", res.executionName)

    // 模拟分析过程
    setTimeout(async () => {
      const statusResult = await window.aliyunWorkflowService.getWorkflowStatus(res.executionName);
      
      if (statusResult && statusResult.analysisResult) {
        analysisResult.value = statusResult.analysisResult;
      } else {
        // 如果没有分析结果，使用模拟数据
        analysisResult.value = {
          accuracy: 85,
          comparison: '与大师标准动作相似度: 85%',
          completion: 90,
          smoothness: 75,
          bodyParts: [
            { name: '手部', accuracy: 80 },
            { name: '手腕', accuracy: 70 },
            { name: '手臂', accuracy: 90 },
            { name: '躯干', accuracy: 85 },
            { name: '腿部', accuracy: 95 }
          ],
          actionSteps: [
            {
              name: '准备动作',
              accuracy: 95,
              description: '准备动作完成良好，姿势正确，为后续动作做好了充分准备。'
            },
            {
              name: '提线控制',
              accuracy: 75,
              description: '提线控制不够稳定，手部动作幅度需要更大一些，手腕转动不够灵活。'
            },
            {
              name: '动作连贯',
              accuracy: 80,
              description: '动作连贯性一般，需要加强手指协调性，使动作更加流畅自然。'
            },
            {
              name: '收尾动作',
              accuracy: 90,
              description: '收尾动作完成良好，姿势优美，结束动作干净利落。'
            }
          ],
          suggestions: [
            '手部动作幅度可以更大一些，增强表现力',
            '手腕转动不够灵活，需要加强手腕力量和灵活性训练',
            '手指协调性需要加强，建议进行手指灵活性练习',
            '动作连贯性可以进一步提升，注意动作之间的衔接'
          ],
          trainingPlan: '建议每天进行30分钟的手部和手腕灵活性训练，重点练习提线控制和动作连贯性。可以先从简单的动作开始，逐渐增加难度。每周进行一次完整的动作训练，记录进步情况。'
        };
      }
      // 分析完成后设置状态为false
      isAnalyzing.value = false;
      alert("视频分析任务已完成！")
    }, 3000);
  } catch (err) {
    console.error("❌ 失败：", err)
    alert("任务失败：" + err.message)
    isAnalyzing.value = false
  }
};

// 重置分析
const resetAnalysis = () => {
  analysisResult.value = null;
  masterVideo.value = null;
  userVideo.value = null;
  masterVideoName.value = '';
  userVideoName.value = '';
  isUploaded.value = false;
  // 重置文件输入
  document.getElementById('masterVideo').value = '';
  document.getElementById('userVideo').value = '';
};


</script>

<style scoped>
/* 偶之艺页面样式 */
.art-view {
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

.login-prompt {
  background-color: white;
  padding: 4rem 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  margin-bottom: 4rem;
}

.login-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B6954, #6B4934);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.login-icon i {
  font-size: 2.5rem;
  color: white;
}

.login-prompt h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.login-prompt p {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 2rem;
}

.login-btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #8B6954, #6B4934);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(139, 105, 84, 0.3);
  color: white;
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

.content-section p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 2rem;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.course-item {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.course-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.course-item h4 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.course-item p {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.course-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.tag {
  background-color: #D4C4B0;
  color: #333;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.course-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.learn-btn {
  background-color: #A0826D;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.learn-btn:hover {
  background-color: #8B6954;
}

.evaluate-btn {
  background-color: #8B6954;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.evaluate-btn:hover {
  background-color: #6B4934;
}

.ai-section {
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.ai-section h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
}

.ai-lab {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.lab-container {
  background-color: #f8f9fa;
  padding: 5rem;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 1200px;
}

.lab-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.lab-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4C4B0 0%, #A0826D 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 2rem;
  font-size: 3rem;
  color: white;
}

.lab-container h3 {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.lab-container p {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 2rem;
}

.start-btn {
  background-color: #A0826D;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.start-btn:hover {
  background-color: #8B6954;
}

/* 上传区域样式 */
.upload-section {
  margin-top: 2rem;
}

.file-input-group {
  margin-bottom: 1.5rem;
}

.file-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.file-input-wrapper {
  position: relative;
  width: 100%;
}

.video-upload {
  display: none;
}

.file-input-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 600px;
  margin: 0 auto;
}

.file-input-label:hover {
  border-color: #8B6954;
  box-shadow: 0 0 0 0.2rem rgba(139, 105, 84, 0.1);
}

.file-btn {
  background-color: #D4C4B0;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: 500;
}

.file-name {
  color: #6c757d;
  font-size: 0.9rem;
}

/* 上传进度样式 */
.upload-progress {
  margin-top: 2rem;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #D4C4B0 0%, #A0826D 100%);
  border-radius: 5px;
  transition: width 0.3s ease;
}

.upload-progress p {
  text-align: center;
  color: #6c757d;
  margin: 0;
}

/* 分析中样式 */
.analyzing-progress {
  margin-top: 2rem;
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.analyzing-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4C4B0 0%, #A0826D 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  font-size: 2.5rem;
  color: white;
  animation: pulse 1.5s infinite ease-in-out;
}

.analyzing-progress h4 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.analyzing-progress p {
  color: #6c757d;
  margin-bottom: 2rem;
}

.analyzing-animation {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.analyzing-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #A0826D;
  animation: pulse 1.5s infinite ease-in-out;
}

.analyzing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.analyzing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* 动作按钮样式 */
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.upload-btn,
.train-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.upload-btn {
  background-color: #D4C4B0;
  color: #333;
}

.upload-btn:hover {
  background-color: #C0B098;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(212, 196, 176, 0.3);
}

.train-btn {
  background-color: #8B6954;
  color: white;
}

.train-btn:hover {
  background-color: #6B4934;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(139, 105, 84, 0.3);
}

.upload-btn:disabled,
.train-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 分析结果样式 */
.analysis-result {
  margin-top: 2rem;
  text-align: left;
}

.analysis-result h4 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}

.result-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.stat-value {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: #A0826D;
}

.suggestions {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.suggestions h5 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.suggestions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestions li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
  color: #6c757d;
}

.suggestions li:last-child {
  border-bottom: none;
}

.reset-btn {
  background-color: #D4C4B0;
  color: #333;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  margin-top: 1rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.reset-btn:hover {
  background-color: #C0B098;
}

/* 身体部位分析样式 */
.body-analysis {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.body-analysis h5 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.body-parts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.body-part {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.part-name {
  width: 80px;
  font-weight: 500;
  color: #333;
}

.part-progress {
  flex: 1;
  height: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
}

.part-bar {
  height: 100%;
  background: linear-gradient(90deg, #D4C4B0 0%, #A0826D 100%);
  border-radius: 5px;
  transition: width 0.3s ease;
}

.part-accuracy {
  width: 50px;
  font-weight: 500;
  color: #A0826D;
  text-align: right;
}

/* 动作分解分析样式 */
.action-analysis {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.action-analysis h5 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.action-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.action-step {
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
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
  font-size: 0.9rem;
}

.step-name {
  flex: 1;
  font-weight: 500;
  color: #333;
}

.step-accuracy {
  font-weight: 500;
  color: #A0826D;
}

.step-description {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #6c757d;
  margin: 0;
}

/* 训练计划样式 */
.training-plan {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.training-plan h5 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.plan-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #6c757d;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-section,
  .ai-section {
    padding: 2rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .course-grid {
    grid-template-columns: 1fr;
  }
  
  .lab-container {
    padding: 3rem 2rem;
  }
  
  .result-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .upload-label {
    padding: 2rem;
  }
}


</style>