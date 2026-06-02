// BaaS SDK 模拟实现
const BaaS = {
  version: '1.0.36',
  clientID: null,
  
  init: function(clientID) {
    this.clientID = clientID;
    console.log('BaaS 模拟初始化成功，clientID:', clientID);
  },
  
  TableObject: function(tableName) {
    return {
      create: function() {
        return {
          set: function(data) {
            return {
              save: function() {
                return Promise.resolve({ data: { id: 'mock-id', ...data } });
              }
            };
          }
        };
      },
      find: function(query) {
        return Promise.resolve({ data: [] });
      },
      get: function(id) {
        return Promise.resolve({ data: { id: id } });
      },
      getWithoutData: function(id) {
        return {
          set: function(data) {
            return {
              update: function() {
                return Promise.resolve({ data: { id: id, ...data } });
              }
            };
          },
          delete: function() {
            return Promise.resolve({ data: { success: true } });
          }
        };
      }
    };
  },
  
  File: function() {
    return {
      upload: function(file) {
        return Promise.resolve({ data: { filePath: 'mock-file-path' } });
      }
    };
  },
  
  auth: {
    login: function(credentials) {
      return Promise.resolve({ data: { user_id: 'mock-user-id' } });
    },
    register: function(data) {
      return Promise.resolve({ data: { user_id: 'mock-user-id' } });
    },
    logout: function() {
      return Promise.resolve({ data: { success: true } });
    },
    getCurrentUser: function() {
      return Promise.resolve({ data: { user_id: 'mock-user-id' } });
    }
  }
};

// 暴露到全局对象
if (typeof window !== 'undefined') {
  window.BaaS = BaaS;
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BaaS;
}