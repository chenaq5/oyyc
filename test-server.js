import http from 'http';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

console.log('Node.js版本:', process.version);
console.log('环境变量DASHSCOPE_API_KEY:', process.env.DASHSCOPE_API_KEY ? '已配置' : '未配置');

// 测试简单的HTTP服务器
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', message: '测试服务器运行正常' }));
});

server.listen(3001, () => {
  console.log('测试服务器运行在 http://localhost:3001');
  // 5秒后关闭服务器
  setTimeout(() => {
    server.close();
    console.log('测试服务器已关闭');
  }, 5000);
});
