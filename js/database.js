// 知晓云初始化（使用您的 ClientID）
BaaS.init('882623eed0d11697a49c');

// 知晓云数据库操作
const DatabaseService = {
    // 数据表配置
    tables: {
        puppets: 'puppets',
        videos: 'videos',
        inheritors: 'inheritors',
        diy_materials: 'diy_materials',
        diy_creations: 'diy_creations'
    },

    // 用户认证操作
    auth: {
        async login(email, password) {
            try {
                const user = await BaaS.auth.loginWithEmail(email, password);
                console.log('登录成功:', user);
                return user;
            } catch (error) {
                console.error('登录失败:', error);
                throw error;
            }
        },

        async register(email, password, userInfo) {
            try {
                const user = await BaaS.auth.register(email, password, userInfo);
                console.log('注册成功:', user);
                return user;
            } catch (error) {
                console.error('注册失败:', error);
                throw error;
            }
        },

        async logout() {
            try {
                await BaaS.auth.logout();
                console.log('登出成功');
                return true;
            } catch (error) {
                console.error('登出失败:', error);
                throw error;
            }
        },

        async getCurrentUser() {
            try {
                const user = await BaaS.auth.getCurrentUser();
                return user;
            } catch (error) {
                console.log('未登录');
                return null;
            }
        },

        async updateUserInfo(userInfo) {
            try {
                const user = await BaaS.auth.getCurrentUser();
                if (!user) throw new Error('用户未登录');
                await user.update(userInfo);
                console.log('更新用户信息成功');
                return user;
            } catch (error) {
                console.error('更新用户信息失败:', error);
                throw error;
            }
        }
    },

    // 初始化提示（无需实际创建表）
    async initTables() {
        const tableNames = Object.values(this.tables);
        console.log('请在知晓云后台创建以下数据表:', tableNames);
        return true;
    },

    // 木偶类别操作
    puppets: {
        async create(data) {
            try {
                const Puppet = new BaaS.TableObject(DatabaseService.tables.puppets);
                const puppet = Puppet.create();
                const result = await puppet.set(data).save();
                console.log('创建木偶成功:', result);
                return result;
            } catch (error) {
                console.error('创建木偶失败:', error);
                throw error;
            }
        },

        async findAll() {
            try {
                console.log('开始查询木偶类别数据...');
                const Puppet = new BaaS.TableObject(DatabaseService.tables.puppets);
                const result = await Puppet.find();
                console.log('查询结果:', result);
                console.log('数据条数:', result.data.objects.length);
                if (result.data.objects.length > 0) {
                    console.log('第一条数据:', result.data.objects[0]);
                    console.log('第一条数据的字段:', Object.keys(result.data.objects[0]));
                }
                return result.data.objects;
            } catch (error) {
                console.error('查询木偶失败:', error);
                console.error('错误代码:', error.code);
                console.error('错误信息:', error.message);
                throw error;
            }
        },

        async findById(id) {
            try {
                console.log('查询木偶详情, ID:', id);
                const Puppet = new BaaS.TableObject(DatabaseService.tables.puppets);
                const result = await Puppet.get(id);
                console.log('查询结果:', result);
                return result.data;
            } catch (error) {
                console.error('查询木偶详情失败:', error);
                throw error;
            }
        },

        async findByCategory(category) {
            try {
                const Puppet = new BaaS.TableObject(DatabaseService.tables.puppets);
                const query = new BaaS.Query();
                query.compare('category', '=', category);
                const result = await Puppet.setQuery(query).find();
                return result.data.objects;
            } catch (error) {
                console.error(`查询${category}木偶失败:`, error);
                throw error;
            }
        },

        async getById(id) {
            try {
                const Puppet = new BaaS.TableObject(DatabaseService.tables.puppets);
                const result = await Puppet.get(id);
                console.log('获取木偶详情成功:', result);
                return result.data;
            } catch (error) {
                console.error('获取木偶详情失败:', error);
                throw error;
            }
        }
    },

    // 演出视频操作
    videos: {
        async create(data) {
            try {
                const Video = new BaaS.TableObject(DatabaseService.tables.videos);
                const video = Video.create();
                const result = await video.set(data).save();
                return result;
            } catch (error) {
                console.error('创建视频失败:', error);
                throw error;
            }
        },

        async findAll() {
            try {
                const Video = new BaaS.TableObject(DatabaseService.tables.videos);
                const result = await Video.find();
                return result.data.objects;
            } catch (error) {
                console.error('查询视频失败:', error);
                throw error;
            }
        },

        async findByCategory(category) {
            try {
                const Video = new BaaS.TableObject(DatabaseService.tables.videos);
                const query = new BaaS.Query();
                query.compare('category', '=', category);
                const result = await Video.setQuery(query).find();
                return result.data.objects;
            } catch (error) {
                console.error(`查询${category}视频失败:`, error);
                throw error;
            }
        },

        async getById(id) {
            try {
                const Video = new BaaS.TableObject(DatabaseService.tables.videos);
                const result = await Video.get(id);
                return result.data;
            } catch (error) {
                console.error('获取视频详情失败:', error);
                throw error;
            }
        }
    },

    // 非遗传承人操作
    inheritors: {
        async create(data) {
            try {
                const Inheritor = new BaaS.TableObject(DatabaseService.tables.inheritors);
                const inheritor = Inheritor.create();
                const result = await inheritor.set(data).save();
                return result;
            } catch (error) {
                console.error('创建传承人失败:', error);
                throw error;
            }
        },

        async findAll() {
            try {
                const Inheritor = new BaaS.TableObject(DatabaseService.tables.inheritors);
                const result = await Inheritor.find();
                return result.data.objects;
            } catch (error) {
                console.error('查询传承人失败:', error);
                throw error;
            }
        },

        async getByRegion(region) {
            try {
                const Inheritor = new BaaS.TableObject(DatabaseService.tables.inheritors);
                const query = new BaaS.Query();
                query.compare('region', '=', region);
                const result = await Inheritor.setQuery(query).find();
                return result.data.objects;
            } catch (error) {
                console.error(`查询${region}传承人失败:`, error);
                throw error;
            }
        },

        async getById(id) {
            try {
                const Inheritor = new BaaS.TableObject(DatabaseService.tables.inheritors);
                const result = await Inheritor.get(id);
                return result.data;
            } catch (error) {
                console.error('获取传承人详情失败:', error);
                throw error;
            }
        }
    },

    // DIY素材操作
    materials: {
        async create(data) {
            try {
                const Material = new BaaS.TableObject(DatabaseService.tables.diy_materials);
                const material = Material.create();
                const result = await material.set(data).save();
                return result;
            } catch (error) {
                console.error('创建素材失败:', error);
                throw error;
            }
        },

        async findAll() {
            try {
                const Material = new BaaS.TableObject(DatabaseService.tables.diy_materials);
                const result = await Material.find();
                return result.data.objects;
            } catch (error) {
                console.error('查询素材失败:', error);
                throw error;
            }
        },

        async findByType(type) {
            try {
                const Material = new BaaS.TableObject(DatabaseService.tables.diy_materials);
                const query = new BaaS.Query();
                query.compare('type', '=', type);
                const result = await Material.setQuery(query).find();
                return result.data.objects;
            } catch (error) {
                console.error(`查询${type}素材失败:`, error);
                throw error;
            }
        }
    },

    // DIY创作记录操作
    creations: {
        async create(data) {
            try {
                const Creation = new BaaS.TableObject(DatabaseService.tables.diy_creations);
                const creation = Creation.create();
                const result = await creation.set(data).save();
                return result;
            } catch (error) {
                console.error('保存创作失败:', error);
                throw error;
            }
        },

        async findAll() {
            try {
                const Creation = new BaaS.TableObject(DatabaseService.tables.diy_creations);
                const result = await Creation.find();
                return result.data.objects;
            } catch (error) {
                console.error('查询创作失败:', error);
                throw error;
            }
        },

        async findByUser(userId) {
            try {
                const Creation = new BaaS.TableObject(DatabaseService.tables.diy_creations);
                const query = new BaaS.Query();
                query.compare('user_id', '=', userId);
                const result = await Creation.setQuery(query).find();
                return result.data.objects;
            } catch (error) {
                console.error('查询用户创作失败:', error);
                throw error;
            }
        }
    },

    // 文件上传
    async uploadFile(file) {
        try {
            const MyFile = new BaaS.File();
            const result = await MyFile.upload(file);
            console.log('上传文件成功:', result);
            return result.data;
        } catch (error) {
            console.error('上传文件失败:', error);
            throw error;
        }
    }
};

// 导出到全局
window.DatabaseService = DatabaseService;