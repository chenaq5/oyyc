// AI辅助生成：豆包大模型，2026-4-20
module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 后端地址
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' } // 关键修复：保留 /api 前缀
      }
    }
  }
}

