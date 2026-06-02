import http from 'http';
import url from 'url';
import https from 'https';
import { Buffer } from 'buffer';

const PORT = 36612;
const API_KEY = "68bc3a9b-5bff-4013-9277-8976a500b58e";

// 两个不同的接入点ID
const IMAGE_ENDPOINT_ID = "ep-20260427143528-k2xtz";      // 文生图模型
const CHAT_ENDPOINT_ID = "ep-xxxx-xxxxx";                  // 对话模型（需要你创建）

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ========== 对话接口（使用对话模型）==========
  if (pathname === '/api/doubao/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { messages } = JSON.parse(body);
        
        // 对话模型的正确格式
        const postData = JSON.stringify({
          model: CHAT_ENDPOINT_ID,  // 使用对话模型接入点
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000
        });

        const options = {
          hostname: 'ark.cn-beijing.volces.com',
          port: 443,
          path: '/api/v3/chat/completions',  // 对话接口路径
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
          }
        };

        const arkReq = https.request(options, (arkRes) => {
          let arkData = '';
          arkRes.on('data', chunk => arkData += chunk);
          arkRes.on('end', () => {
            try {
              const arkResponse = JSON.parse(arkData);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(arkResponse));
            } catch (e) {
              console.error('解析错误:', e);
              res.writeHead(500);
              res.end(JSON.stringify({ error: "解析失败", details: arkData }));
            }
          });
        });

        arkReq.on('error', (error) => {
          console.error('请求错误:', error);
          res.writeHead(500);
          res.end(JSON.stringify({ error: "请求失败", message: error.message }));
        });

        arkReq.write(postData);
        arkReq.end();

      } catch (err) {
        console.error('服务器错误:', err);
        res.writeHead(500);
        res.end(JSON.stringify({ error: "服务器错误", message: err.message }));
      }
    });
    return;
  }

  // ========== 文生图接口 ==========
  if (pathname === '/api/doubao/images' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const requestData = JSON.parse(body);
        
        const postData = JSON.stringify({
          model: IMAGE_ENDPOINT_ID,
          prompt: requestData.prompt,
          sequential_image_generation: "disabled",
          response_format: "url",
          size: requestData.size || "2K",
          stream: false,
          watermark: true
        });

        const options = {
          hostname: 'ark.cn-beijing.volces.com',
          port: 443,
          path: '/api/v3/images/generations',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
          }
        };

        const arkReq = https.request(options, (arkRes) => {
          let arkData = '';
          arkRes.on('data', chunk => arkData += chunk);
          arkRes.on('end', () => {
            try {
              const arkResponse = JSON.parse(arkData);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(arkResponse));
            } catch (e) {
              console.error('解析错误:', e);
              res.writeHead(500);
              res.end(JSON.stringify({ error: "解析失败", details: arkData }));
            }
          });
        });

        arkReq.on('error', (error) => {
          console.error('请求错误:', error);
          res.writeHead(500);
          res.end(JSON.stringify({ error: "请求失败", message: error.message }));
        });

        arkReq.write(postData);
        arkReq.end();

      } catch (err) {
        console.error('服务器错误:', err);
        res.writeHead(500);
        res.end(JSON.stringify({ error: "服务器错误", message: err.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(PORT, () => {
  console.log(`✅ 服务已启动：http://localhost:${PORT}`);
  console.log(`💬 对话接口：http://localhost:${PORT}/api/doubao/chat`);
  console.log(`📸 文生图接口：http://localhost:${PORT}/api/doubao/images`);
  console.log(`\n⚠️  注意：需要配置 CHAT_ENDPOINT_ID（对话模型接入点）`);
});