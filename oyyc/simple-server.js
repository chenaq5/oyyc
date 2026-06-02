import http from 'http';
import url from 'url';

const PORT = 3000;

const server = http.createServer((req, res) => {
  // 解析请求路径
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // 处理OPTIONS请求
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  // 健康检查接口
  if (pathname === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      message: '后端服务运行正常'
    }));
    return;
  }
  
  // 404处理
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: false,
    error: 'Not Found',
    message: '接口不存在'
  }));
});

// 启动服务
server.listen(PORT, () => {
  console.log(`后端服务已启动，监听端口: ${PORT}`);
  console.log(`健康检查地址: http://localhost:${PORT}/health`);
});
