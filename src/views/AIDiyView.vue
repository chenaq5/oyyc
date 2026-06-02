<template>
  <div class="ai-diy-page">
    <!-- 返回按钮 -->
      <div class="back-section">
        <button class="back-to-diy-btn" @click="goBackToDIY">
          <i class="bi bi-arrow-left"></i>
          <span>返回偶之韵木偶DIY</span>
        </button>
      </div>
    <div class="container">
      <div class="ai-chat-wrapper">
        <div class="chat-header">
          <div class="header-icon">🎨</div>
          <div class="header-text">
            <h3>AI 木偶画师</h3>
            <p>描述你想要的木偶，AI 会为你生成精致图片</p>
          </div>
        </div>

        <div class="chat-body" ref="chatBody">
          <div class="message-list">
            <div v-for="(msg, idx) in messages" :key="idx" class="msg" :class="msg.role">
              <div class="msg-avatar">
                {{ msg.role === 'user' ? '👤' : '🎨' }}
              </div>
              <div class="msg-content">
                <div class="msg-text">{{ msg.content }}</div>
                <div v-if="msg.imageUrl" class="image-container">
                  <div class="image-card">
                    <img :src="msg.imageUrl" class="generated-image" alt="生成的木偶图片" />
                    <div class="image-overlay">
                      <a :href="msg.imageUrl" target="_blank" class="image-link">
                        <i class="bi bi-link"></i> 查看原图
                      </a>
                    </div>
                  </div>
                </div>
                <div v-if="msg.loading" class="image-loading">
                  <div class="loading-spinner"></div>
                  <span>图片生成中...</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="loading" class="loading">
            <div class="loading-spinner"></div>
            <span>🎨 AI 正在创作中，请稍等...</span>
          </div>
        </div>

        <div class="chat-footer">
          <div class="input-container">
            <textarea
              v-model="input"
              @keyup.enter.prevent="send"
              placeholder="描述你想要的木偶，例如：一只穿燕尾服的兔子木偶，手持魔术棒，舞台灯光效果..."
              rows="3"
              class="chat-input"
            />
            <div class="input-actions">
              <button 
                v-if="input.trim()" 
                @click="input = ''" 
                class="clear-btn"
                title="清空"
              >
                <i class="bi bi-x"></i>
              </button>
            </div>
          </div>
          <button @click="send" :disabled="loading || !input.trim()" class="send-btn">
            <span v-if="!loading">✨ 生成图片</span>
            <span v-else class="loading-text">
              <div class="mini-spinner"></div>
              生成中...
            </span>
          </button>
        </div>

        <div class="chat-tips">
          <div class="tips-header">
            <span>💡 热门示例</span>
          </div>
          <div class="tips-list">
            <div class="tip-item" @click="setExample('一只可爱的木偶小丑，彩色头发，红鼻子，站在马戏团舞台上')">
              🤡 小丑木偶
            </div>
            <div class="tip-item" @click="setExample('优雅的公主木偶，金色长发，蓝色礼服，手持魔法棒')">
              👸 公主木偶
            </div>
            <div class="tip-item" @click="setExample('威武的骑士木偶，银色盔甲，佩剑，骑着木马')">
              ⚔️ 骑士木偶
            </div>
            <div class="tip-item" @click="setExample('奇幻风格的龙形木偶，红色鳞片，金色眼睛，展开翅膀')">
              🐉 龙形木偶
            </div>
            <div class="tip-item" @click="setExample('可爱的动物木偶，熊猫造型，手持竹子，卡通风格')">
              🐼 熊猫木偶
            </div>
            <div class="tip-item" @click="setExample('传统中国风木偶，京剧脸谱，华丽戏服，手持折扇')">
              🎭 京剧木偶
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const messages = ref([
  { 
    role: 'assistant', 
    content: '你好！我是AI木偶画师\n\n描述你想要的木偶，我会为你生成精美的图片！\n\n💡 提示：描述越详细，效果越好哦～' 
  }
]);
const input = ref('');
const loading = ref(false);
const chatBody = ref(null);

// 火山方舟文生图API配置
const ARK_API_KEY = '68bc3a9b-5bff-4013-9277-8976a500b58e';
const ARK_API_URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations';
const ARK_MODEL = 'doubao-seedream-4-0-250828';

// 返回偶之韵木偶DIY创作板块
const goBackToDIY = () => {
  router.push('/rhythm');
};

// 设置示例文本
const setExample = (text) => {
  input.value = text;
  nextTick(() => {
    const textarea = document.querySelector('.chat-input');
    if (textarea) {
      textarea.focus();
    }
  });
};

// 发送消息生成图片
const send = async () => {
  if (!input.value.trim() || loading.value) return;

  const userPrompt = input.value.trim();
  
  messages.value.push({ role: 'user', content: userPrompt });
  
  const tempIndex = messages.value.length;
  messages.value.push({ 
    role: 'assistant', 
    content: `正在生成：${userPrompt}`,
    loading: true
  });
  
  input.value = '';
  loading.value = true;

  await nextTick();
  scrollToBottom();

  try {
    const requestBody = {
      model: ARK_MODEL,
      prompt: userPrompt,
      sequential_image_generation: "disabled",
      response_format: "url",
      size: "2K",
      stream: false,
      watermark: true
    };

    // AI辅助生成：豆包大模型，2026-4-20
    const response = await fetch(ARK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ARK_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || `API错误 ${response.status}`);
    }

    const data = await response.json();
    
    let imageUrl = null;
    if (data.data && data.data[0] && data.data[0].url) {
      imageUrl = data.data[0].url;
    } else if (data.url) {
      imageUrl = data.url;
    } else if (data.image_url) {
      imageUrl = data.image_url;
    } else {
      throw new Error("未返回图片地址，请检查API响应格式");
    }

    messages.value[tempIndex] = {
      role: 'assistant',
      content: `✨ 已生成图片：${userPrompt}`,
      imageUrl: imageUrl
    };
    
  } catch (err) {
    console.error("请求错误:", err);
    messages.value[tempIndex] = {
      role: 'assistant',
      content: `❌ 生成失败：${err.message}\n\n请检查：\n1. API Key 是否正确\n2. 网络连接是否正常\n3. 模型服务是否可用`
    };
  } finally {
    loading.value = false;
    await nextTick();
    scrollToBottom();
  }
};

const scrollToBottom = () => {
  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight;
  }
};

onMounted(() => {
  nextTick(() => {
    scrollToBottom();
  });
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.ai-diy-page {
  min-height: 100vh;
  background: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding-top: 80px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.back-section {
  margin-bottom: 20px;
  align-self: flex-start;
  position: absolute;
  top: 100px;
  left: 40px;
  z-index: 10;
}

.back-to-diy-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #91603d 0%, #91603d 100%);
  border: none;
  border-radius: 32px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0.2, 1);
  font-weight: 600;
  box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
  text-decoration: none;
  outline: none;
}

.back-to-diy-btn:hover {
  background: linear-gradient(135deg, #A0522D 0%, #8B4513 100%);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 24px rgba(139, 69, 19, 0.6);
}

.back-to-diy-btn:active {
  transform: translateY(-1px) scale(0.98);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.4);
}

.ai-chat-wrapper {
  flex: 1;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  border: 1px solid #e9ecef;
}

.ai-chat-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(135deg, #bc8950 0%, #a0762d 100%);
  color: white;
}

.header-icon {
  font-size: 32px;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.header-text h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.header-text p {
  font-size: 13px;
  opacity: 0.9;
  color: white;
}

.chat-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background: #f8f9fa;
  scroll-behavior: smooth;
}

.chat-body::-webkit-scrollbar {
  width: 6px;
}

.chat-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-body::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.chat-body::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.msg {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.msg.user {
  flex-direction: row-reverse;
}

.msg-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.msg.user .msg-avatar {
  background: linear-gradient(135deg, #eab366 0%, #a27f4b 100%);
  color: white;
}

.msg.assistant .msg-avatar {
  background: #e9ecef;
  color: #eaac66;
}

.msg-content {
  max-width: 80%;
  padding: 16px;
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  position: relative;
}

.msg.user .msg-content {
  background: linear-gradient(135deg,#eab366 0%, #a27f4b 100%);
  color: white;
  border-bottom-right-radius: 4px;
}

.msg.assistant .msg-content {
  background: white;
  color: #333;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.msg-text {
  white-space: pre-wrap;
  margin-bottom: 8px;
}

.image-container {
  margin-top: 12px;
}

.image-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.image-card:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.generated-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 20px 16px 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-card:hover .image-overlay {
  opacity: 1;
}

.image-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  color: #667eea;
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.image-link:hover {
  background: white;
  transform: translateY(-2px);
}

.image-loading, .loading {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  color: #888;
  font-size: 14px;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #e0e0e0;
  border-top-color: #8B4513;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.chat-footer {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  background: white;
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.input-container {
  flex: 1;
  position: relative;
}

.chat-input {
  width: 100%;
  padding: 16px;
  border: 2px solid #e1e4e8;
  border-radius: 24px;
  outline: none;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  min-height: 80px;
  max-height: 120px;
}

.chat-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-actions {
  position: absolute;
  right: 12px;
  bottom: 12px;
}

.clear-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: #e9ecef;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6c757d;
}

.clear-btn:hover {
  background: #dee2e6;
  color: #495057;
  transform: scale(1.1);
}

.send-btn {
  padding: 16px 28px;
  border-radius: 28px;
  border: none;
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 69, 19, 0.4);
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mini-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.chat-tips {
  padding: 20px;
  background: #f8f9fa;
  border-top: 1px solid #e5e7eb;
}

.tips-header {
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #6c757d;
}

.tips-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tip-item {
  padding: 8px 16px;
  background: white;
  border-radius: 24px;
  font-size: 13px;
  color: #8B4513;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e1e4e8;
  white-space: nowrap;
}

.tip-item:hover {
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  color: white;
  border-color: #8B4513;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
}

@media (max-width: 768px) {
  .container {
    padding: 16px;
  }

  .back-section {
    margin-bottom: 16px;
  }

  .back-to-diy-btn {
    padding: 8px 16px;
    font-size: 13px;
  }

  .ai-chat-wrapper {
    border-radius: 20px;
  }

  .chat-header {
    padding: 20px;
  }

  .chat-body {
    padding: 20px;
  }

  .chat-footer {
    padding: 16px;
  }

  .msg-content {
    max-width: 85%;
    padding: 14px;
  }

  .tips-list {
    gap: 8px;
  }

  .tip-item {
    padding: 6px 14px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .back-to-diy-btn {
    padding: 6px 14px;
    font-size: 12px;
  }

  .chat-header {
    padding: 16px;
  }

  .chat-body {
    padding: 16px;
  }

  .chat-footer {
    padding: 12px;
  }

  .send-btn {
    padding: 12px 20px;
    font-size: 14px;
  }

  .chat-input {
    padding: 12px;
    min-height: 70px;
  }
}
</style>
