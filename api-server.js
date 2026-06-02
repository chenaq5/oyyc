import http from 'http';
import url from 'url';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

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
  
  // 启动工作流接口
  if (pathname === '/api/start-flow' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('📥 收到启动工作流请求，入参:', body);
      
      // 模拟工作流启动
      const mockResponse = {
        success: true,
        data: {
          executionName: 'mock-execution-' + Date.now(),
          flowName: 'cff703e65a5d4a8fbfaac0a668f303d2',
          input: body,
          startTime: new Date().toISOString()
        },
        message: '工作流启动成功'
      };
      
      console.log('✅ 模拟工作流启动成功，执行ID:', mockResponse.data.executionName);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(mockResponse));
    });
    return;
  }
  
  // 查询工作流状态接口
  if (pathname === '/api/get-status' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('📥 收到查询状态请求:', body);
      
      try {
        const parsedBody = JSON.parse(body);
        if (!parsedBody.executionName) {
          throw new Error('执行ID不能为空');
        }
        
        // 模拟工作流状态查询
        const mockResponse = {
          success: true,
          data: {
            executionName: parsedBody.executionName,
            flowName: 'cff703e65a5d4a8fbfaac0a668f303d2',
            status: 'SUCCEEDED',
            startTime: new Date(Date.now() - 30000).toISOString(),
            stopTime: new Date().toISOString()
          },
          message: '状态查询成功'
        };
        
        console.log('✅ 模拟状态查询成功:', mockResponse.data.status);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(mockResponse));
      } catch (error) {
        console.error('❌ 状态查询失败，详细错误:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: error.message,
          message: '状态查询失败，请查看后端日志'
        }));
      }
    });
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
  console.log(`🚀 后端代理服务已启动，监听端口: ${PORT}`);
  console.log(`🔗 允许的前端源: http://localhost:8083`);
  console.log(`📡 健康检查地址: http://localhost:${PORT}/health`);
});

// 全局异常捕获
process.on('uncaughtException', (err) => {
  console.error('❌ 未捕获的全局异常:', err);
  console.error('错误堆栈:', err.stack);
});