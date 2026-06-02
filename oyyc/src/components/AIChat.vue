<template>
  <div class="ai-chat-wrapper">
    <div class="chat-header">
      <h3>🎨 AI 木偶画师</h3>
      <p>描述你想要的木偶，AI 会为你生成精致图片</p>
    </div>

    <div class="chat-body" ref="chatBody">
      <div v-for="(msg, idx) in messages" :key="idx" class="msg" :class="msg.role">
        <div class="msg-content">
          <div class="msg-text">{{ msg.content }}</div>
          <div v-if="msg.imageUrl" class="image-container">
            <img :src="msg.imageUrl" class="generated-image" alt="生成的木偶图片" />
            <a :href="msg.imageUrl" target="_blank" class="image-link">🔗 查看原图</a>
          </div>
          <div v-if="msg.loading" class="image-loading">
            <div class="loading-spinner"></div>
            <span>图片生成中...</span>
          </div>
        </div>
      </div>

      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <span>🎨 AI 正在创作中，请稍等...</span>
      </div>
    </div>

    <div class="chat-footer">
      <textarea
        v-model="input"
        @keyup.enter.prevent="send"
        placeholder="描述你想要的木偶，例如：一只穿燕尾服的兔子木偶，手持魔术棒，舞台灯光效果..."
        rows="3"
      />
      <button @click="send" :disabled="loading || !input.trim()">
        {{ loading ? '生成中...' : '✨ 生成图片' }}
      </button>
    </div>

    <div class="chat-tips">
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
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const messages = ref([
  { 
    role: 'assistant', 
    content: '你好！我是AI木偶画师 🎨\n\n描述你想要的木偶，我会为你生成精美的图片！\n\n💡 提示：描述越详细，效果越好哦～' 
  }
]);
const input = ref('');
const loading = ref(false);
const chatBody = ref(null);

// 设置示例文本
const setExample = (text) => {
  input.value = text;
};

// 发送消息生成图片
const send = async () => {
  if (!input.value.trim() || loading.value) return;

  const userPrompt = input.value.trim();
  
  // 添加用户消息
  messages.value.push({ role: 'user', content: userPrompt });
  
  // 添加一个临时的 AI 消息，用于显示加载状态
  const tempIndex = messages.value.length;
  messages.value.push({ 
    role: 'assistant', 
    content: `正在生成：${userPrompt}`,
    loading: true
  });
  
  input.value = '';
  loading.value = true;

  // 滚动到底部
  await nextTick();
  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight;
  }

  try {
    // 调用文生图接口
    const response = await fetch('http://localhost:36612/api/doubao/images', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        prompt: userPrompt,
        size: "2K",
        watermark: true
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("后端返回错误:", data);
      throw new Error(data.error || data.message || "生成失败");
    }

    // 提取图片URL（根据实际响应格式调整）
    let imageUrl = null;
    if (data.data && data.data[0] && data.data[0].url) {
      imageUrl = data.data[0].url;
    } else if (data.url) {
      imageUrl = data.url;
    } else if (data.image_url) {
      imageUrl = data.image_url;
    } else {
      console.error('未知响应格式:', data);
      throw new Error("未返回图片地址，请检查API响应格式");
    }

    // 更新临时消息为最终结果
    messages.value[tempIndex] = {
      role: 'assistant',
      content: `✨ 已生成图片：${userPrompt}`,
      imageUrl: imageUrl
    };
    
  } catch (err) {
    console.error("请求错误:", err);
    // 更新为错误消息
    messages.value[tempIndex] = {
      role: 'assistant',
      content: `❌ 生成失败：${err.message}\n\n请检查：\n1. 后端服务是否正常运行\n2. API Key 是否正确\n3. 网络连接是否正常`
    };
  } finally {
    loading.value = false;
    await nextTick();
    if (chatBody.value) {
      chatBody.value.scrollTop = chatBody.value.scrollHeight;
    }
  }
};
</script>

<style scoped>
.ai-chat-wrapper {
  width: 100%;
  max-width: 520px;
  height: 700px;
  margin: 0 auto;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.chat-header {
  padding: 20px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}
.chat-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
.chat-header p {
  margin: 8px 0 0;
  font-size: 13px;
  opacity: 0.9;
}

.chat-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f8f9fa;
}

.msg {
  margin-bottom: 20px;
  display: flex;
}
.msg.user {
  justify-content: flex-end;
}
.msg.assistant {
  justify-content: flex-start;
}

.msg-content {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}
.msg.user .msg-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom-right-radius: 4px;
}
.msg.assistant .msg-content {
  background: white;
  color: #333;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.msg-text {
  white-space: pre-wrap;
}

.image-container {
  margin-top: 12px;
  text-align: center;
}

.generated-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: transform 0.2s;
}
.generated-image:hover {
  transform: scale(1.02);
}

.image-link {
  display: inline-block;
  margin-top: 8px;
  font-size: 12px;
  color: #667eea;
  text-decoration: none;
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
  width: 20px;
  height: 20px;
  border: 3px solid #e0e0e0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.chat-footer {
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  background: white;
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.chat-footer textarea {
  flex: 1;
  padding: 12px;
  border: 1px solid #e1e4e8;
  border-radius: 16px;
  outline: none;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s;
}
.chat-footer textarea:focus {
  border-color: #667eea;
}

.chat-footer button {
  padding: 12px 24px;
  border-radius: 24px;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.2s;
  white-space: nowrap;
}
.chat-footer button:hover:not(:disabled) {
  transform: translateY(-1px);
}
.chat-footer button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.chat-tips {
  padding: 12px 16px;
  background: #f8f9fa;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 12px;
  overflow-x: auto;
}

.tip-item {
  padding: 6px 12px;
  background: white;
  border-radius: 20px;
  font-size: 12px;
  color: #667eea;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  border: 1px solid #e1e4e8;
}
.tip-item:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
}
</style>