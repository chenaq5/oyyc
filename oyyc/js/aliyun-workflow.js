class AliyunWorkflowService {
  constructor() {
    // 不再依赖后端服务，直接在前端模拟
  }

  // 启动工作流
  async startWorkflow(input = {}) {
    try {
      console.log('📥 收到启动工作流请求，入参:', input);
      
      // 模拟工作流启动
      const mockResponse = {
        executionName: 'mock-execution-' + Date.now(),
        flowName: 'cff703e65a5d4a8fbfaac0a668f303d2',
        input: JSON.stringify(input),
        startTime: new Date().toISOString()
      };
      
      console.log('✅ 模拟工作流启动成功，执行ID:', mockResponse.executionName);
      return mockResponse;
    } catch (error) {
      console.error('启动工作流失败:', error);
      throw error;
    }
  }

  // 查询状态
  async getWorkflowStatus(executionName) {
    try {
      console.log('📥 收到查询状态请求，执行ID:', executionName);
      
      // 模拟工作流状态查询
      const mockResponse = {
        executionName: executionName,
        flowName: 'cff703e65a5d4a8fbfaac0a668f303d2',
        status: 'SUCCEEDED',
        startTime: new Date(Date.now() - 30000).toISOString(),
        stopTime: new Date().toISOString(),
        // 添加模拟的分析结果
        analysisResult: {
          accuracy: 85.5,
          keyPoints: [
            {
              name: '手部动作',
              score: 90.2,
              feedback: '手部动作流畅，控制精准'
            },
            {
              name: '身体协调性',
              score: 82.7,
              feedback: '身体协调性良好，建议加强腰部力量'
            },
            {
              name: '节奏感',
              score: 88.9,
              feedback: '节奏感强，与音乐配合默契'
            },
            {
              name: '动作幅度',
              score: 79.3,
              feedback: '动作幅度适中，建议增加一些夸张动作以增强表现力'
            }
          ],
          improvementSuggestions: [
            '加强手腕力量训练，提高提线控制精度',
            '注意身体重心的转移，使动作更加自然',
            '增加面部表情的配合，增强表演感染力',
            '多练习复杂动作的连贯性，提高操控技巧'
          ],
          comparisonData: {
            masterAverageScore: 95.0,
            userAverageScore: 85.5,
            improvementPotential: 9.5
          }
        }
      };
      
      console.log('✅ 模拟状态查询成功:', mockResponse.status);
      return mockResponse;
    } catch (error) {
      console.error('查询状态失败:', error);
      throw error;
    }
  }
}

window.aliyunWorkflowService = new AliyunWorkflowService();