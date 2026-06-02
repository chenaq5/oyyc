import http from 'http';

const PORT = 3002;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Node.js版本:', process.version);
  console.log('当前目录:', process.cwd());
});

server.on('error', (error) => {
  console.error('服务器启动错误:', error);
});

// 5秒后关闭服务器
setTimeout(() => {
  server.close(() => {
    console.log('服务器已关闭');
  });
}, 5000);
