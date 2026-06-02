// 导入 minapp-sdk
import * as BaaS from 'minapp-sdk';

// 初始化 BaaS
const clientID = '882623eed0d11697a49c';
BaaS.init(clientID);
console.log('知晓云初始化成功');

// 暴露到全局对象
if (typeof window !== 'undefined') {
    window.BaaS = BaaS;
}

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimation();
    initNavbar();
    initSmoothScroll();
});

function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 跳过以 #/ 开头的路由链接
            if (href !== '#' && !href.startsWith('#/') && document.querySelector(href)) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(function(counter) {
        observer.observe(counter);
    });
}

if (document.querySelector('.stat-number')) {
    initCounters();
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach(function(value, key) {
            data[key] = value;
        });
        
        console.log('Form submitted:', data);
        
        showToast('提交成功！我们会尽快与您联系。', 'success');
        
        form.reset();
    });
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 知晓云数据操作
const CloudService = {
    // 木偶相关操作
    puppets: {
        create: function(data) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Puppet = new BaaS.TableObject('puppets');
            const puppet = Puppet.create();
            return puppet.set(data).save().then(res => {
                console.log('创建木偶成功', res);
                return res;
            }).catch(err => {
                console.error('创建木偶失败', err);
                throw err;
            });
        },
        
        find: function(query) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Puppet = new BaaS.TableObject('puppets');
            return Puppet.find(query).then(res => {
                console.log('查询木偶成功', res);
                return res;
            }).catch(err => {
                console.error('查询木偶失败', err);
                throw err;
            });
        },
        
        get: function(id) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Puppet = new BaaS.TableObject('puppets');
            return Puppet.get(id).then(res => {
                console.log('获取木偶成功', res);
                return res;
            }).catch(err => {
                console.error('获取木偶失败', err);
                throw err;
            });
        },
        
        update: function(id, data) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Puppet = new BaaS.TableObject('puppets');
            const puppet = Puppet.getWithoutData(id);
            return puppet.set(data).update().then(res => {
                console.log('更新木偶成功', res);
                return res;
            }).catch(err => {
                console.error('更新木偶失败', err);
                throw err;
            });
        },
        
        delete: function(id) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Puppet = new BaaS.TableObject('puppets');
            const puppet = Puppet.getWithoutData(id);
            return puppet.delete().then(res => {
                console.log('删除木偶成功', res);
                return res;
            }).catch(err => {
                console.error('删除木偶失败', err);
                throw err;
            });
        }
    },
    
    // 视频相关操作
    videos: {
        create: function(data) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Video = new BaaS.TableObject('videos');
            const video = Video.create();
            return video.set(data).save().then(res => {
                console.log('创建视频成功', res);
                return res;
            }).catch(err => {
                console.error('创建视频失败', err);
                throw err;
            });
        },
        
        find: function(query) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Video = new BaaS.TableObject('videos');
            return Video.find(query).then(res => {
                console.log('查询视频成功', res);
                return res;
            }).catch(err => {
                console.error('查询视频失败', err);
                throw err;
            });
        },
        
        get: function(id) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Video = new BaaS.TableObject('videos');
            return Video.get(id).then(res => {
                console.log('获取视频成功', res);
                return res;
            }).catch(err => {
                console.error('获取视频失败', err);
                throw err;
            });
        },
        
        update: function(id, data) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Video = new BaaS.TableObject('videos');
            const video = Video.getWithoutData(id);
            return video.set(data).update().then(res => {
                console.log('更新视频成功', res);
                return res;
            }).catch(err => {
                console.error('更新视频失败', err);
                throw err;
            });
        },
        
        delete: function(id) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Video = new BaaS.TableObject('videos');
            const video = Video.getWithoutData(id);
            return video.delete().then(res => {
                console.log('删除视频成功', res);
                return res;
            }).catch(err => {
                console.error('删除视频失败', err);
                throw err;
            });
        }
    },
    
    // 传承人相关操作
    inheritors: {
        create: function(data) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Inheritor = new BaaS.TableObject('inheritors');
            const inheritor = Inheritor.create();
            return inheritor.set(data).save().then(res => {
                console.log('创建传承人成功', res);
                return res;
            }).catch(err => {
                console.error('创建传承人失败', err);
                throw err;
            });
        },
        
        find: function(query) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Inheritor = new BaaS.TableObject('inheritors');
            return Inheritor.find(query).then(res => {
                console.log('查询传承人成功', res);
                return res;
            }).catch(err => {
                console.error('查询传承人失败', err);
                throw err;
            });
        },
        
        get: function(id) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Inheritor = new BaaS.TableObject('inheritors');
            return Inheritor.get(id).then(res => {
                console.log('获取传承人成功', res);
                return res;
            }).catch(err => {
                console.error('获取传承人失败', err);
                throw err;
            });
        },
        
        update: function(id, data) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Inheritor = new BaaS.TableObject('inheritors');
            const inheritor = Inheritor.getWithoutData(id);
            return inheritor.set(data).update().then(res => {
                console.log('更新传承人成功', res);
                return res;
            }).catch(err => {
                console.error('更新传承人失败', err);
                throw err;
            });
        },
        
        delete: function(id) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const Inheritor = new BaaS.TableObject('inheritors');
            const inheritor = Inheritor.getWithoutData(id);
            return inheritor.delete().then(res => {
                console.log('删除传承人成功', res);
                return res;
            }).catch(err => {
                console.error('删除传承人失败', err);
                throw err;
            });
        }
    },
    
    // DIY素材相关操作
    diyMaterials: {
        create: function(data) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const DIYMaterial = new BaaS.TableObject('diy_materials');
            const material = DIYMaterial.create();
            return material.set(data).save().then(res => {
                console.log('创建DIY素材成功', res);
                return res;
            }).catch(err => {
                console.error('创建DIY素材失败', err);
                throw err;
            });
        },
        
        find: function(query) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const DIYMaterial = new BaaS.TableObject('diy_materials');
            return DIYMaterial.find(query).then(res => {
                console.log('查询DIY素材成功', res);
                return res;
            }).catch(err => {
                console.error('查询DIY素材失败', err);
                throw err;
            });
        },
        
        get: function(id) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const DIYMaterial = new BaaS.TableObject('diy_materials');
            return DIYMaterial.get(id).then(res => {
                console.log('获取DIY素材成功', res);
                return res;
            }).catch(err => {
                console.error('获取DIY素材失败', err);
                throw err;
            });
        },
        
        update: function(id, data) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const DIYMaterial = new BaaS.TableObject('diy_materials');
            const material = DIYMaterial.getWithoutData(id);
            return material.set(data).update().then(res => {
                console.log('更新DIY素材成功', res);
                return res;
            }).catch(err => {
                console.error('更新DIY素材失败', err);
                throw err;
            });
        },
        
        delete: function(id) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const DIYMaterial = new BaaS.TableObject('diy_materials');
            const material = DIYMaterial.getWithoutData(id);
            return material.delete().then(res => {
                console.log('删除DIY素材成功', res);
                return res;
            }).catch(err => {
                console.error('删除DIY素材失败', err);
                throw err;
            });
        }
    },
    
    // DIY创作相关操作
    diyCreations: {
        create: function(data) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const DIYCreation = new BaaS.TableObject('diy_creations');
            const creation = DIYCreation.create();
            return creation.set(data).save().then(res => {
                console.log('创建DIY创作成功', res);
                return res;
            }).catch(err => {
                console.error('创建DIY创作失败', err);
                throw err;
            });
        },
        
        find: function(query) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const DIYCreation = new BaaS.TableObject('diy_creations');
            return DIYCreation.find(query).then(res => {
                console.log('查询DIY创作成功', res);
                return res;
            }).catch(err => {
                console.error('查询DIY创作失败', err);
                throw err;
            });
        },
        
        get: function(id) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const DIYCreation = new BaaS.TableObject('diy_creations');
            return DIYCreation.get(id).then(res => {
                console.log('获取DIY创作成功', res);
                return res;
            }).catch(err => {
                console.error('获取DIY创作失败', err);
                throw err;
            });
        },
        
        update: function(id, data) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const DIYCreation = new BaaS.TableObject('diy_creations');
            const creation = DIYCreation.getWithoutData(id);
            return creation.set(data).update().then(res => {
                console.log('更新DIY创作成功', res);
                return res;
            }).catch(err => {
                console.error('更新DIY创作失败', err);
                throw err;
            });
        },
        
        delete: function(id) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            const DIYCreation = new BaaS.TableObject('diy_creations');
            const creation = DIYCreation.getWithoutData(id);
            return creation.delete().then(res => {
                console.log('删除DIY创作成功', res);
                return res;
            }).catch(err => {
                console.error('删除DIY创作失败', err);
                throw err;
            });
        }
    },
    
    // 文件上传
    upload: function(file) {
        if (typeof BaaS === 'undefined') {
            console.error('知晓云 SDK 未初始化');
            return Promise.reject('SDK 未初始化');
        }
        
        const MyFile = new BaaS.File();
        return MyFile.upload(file).then(res => {
            console.log('上传文件成功', res);
            return res.data.filePath;
        }).catch(err => {
            console.error('上传文件失败', err);
            throw err;
        });
    },
    
    // 用户相关
    user: {
        login: function(email, password) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            console.log('登录数据:', {email, password});
            
            // 调用 BaaS 登录方法（使用对象参数格式）
            return BaaS.auth.login({username: email, password}).then(res => {
                console.log('登录成功', res);
                // 保存用户信息到本地存储
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('currentUser', JSON.stringify(res.data));
                }
                return res;
            }).catch(err => {
                console.error('登录失败', err);
                // 尝试使用email字段登录
                return BaaS.auth.login({email, password}).then(res => {
                    console.log('登录成功', res);
                    // 保存用户信息到本地存储
                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem('currentUser', JSON.stringify(res.data));
                    }
                    return res;
                }).catch(err => {
                    console.error('登录失败', err);
                    throw err;
                });
            });
        },
        
        register: function(data) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            // 确保数据格式正确，包含password字段
            const registerData = {
                username: data.username,
                email: data.email,
                password: data.password
            };
            
            console.log('注册数据:', registerData);
            
            // 调用 BaaS 注册方法
            return BaaS.auth.register(registerData).then(res => {
                console.log('注册成功', res);
                // 保存用户信息到本地存储
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('currentUser', JSON.stringify(res.data));
                }
                return res;
            }).catch(err => {
                console.error('注册失败', err);
                throw err;
            });
        },
        
        logout: function() {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            // 调用 BaaS 登出方法
            return BaaS.auth.logout().then(res => {
                console.log('登出成功', res);
                // 清除本地存储中的用户信息
                if (typeof localStorage !== 'undefined') {
                    localStorage.removeItem('currentUser');
                }
                return res;
            }).catch(err => {
                console.error('登出失败', err);
                throw err;
            });
        },
        
        getCurrentUser: function() {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            // 调用 BaaS 获取当前用户方法
            return BaaS.auth.getCurrentUser().then(res => {
                console.log('获取当前用户成功', res);
                return res;
            }).catch(err => {
                console.error('获取当前用户失败', err);
                throw err;
            });
        },
        
        // 检查用户是否已登录
        isLoggedIn: function() {
            if (typeof localStorage !== 'undefined') {
                const currentUser = localStorage.getItem('currentUser');
                return !!currentUser;
            }
            return false;
        },
        
        // 获取当前登录用户信息
        getLoggedInUser: function() {
            if (typeof localStorage !== 'undefined') {
                const currentUser = localStorage.getItem('currentUser');
                if (currentUser) {
                    return JSON.parse(currentUser);
                }
            }
            return null;
        },
        
        // 修改密码
        changePassword: function(currentPassword, newPassword) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            // 调用 BaaS 修改密码方法
            return BaaS.auth.updatePassword(currentPassword, newPassword).then(res => {
                console.log('修改密码成功', res);
                return res;
            }).catch(err => {
                console.error('修改密码失败', err);
                throw err;
            });
        },
        
        // 更新用户信息
        update: function(data) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            // 调用 BaaS 更新用户信息方法
            return BaaS.auth.update(data).then(res => {
                console.log('更新用户信息成功', res);
                // 更新本地存储中的用户信息
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('currentUser', JSON.stringify(res.data));
                }
                return res;
            }).catch(err => {
                console.error('更新用户信息失败', err);
                throw err;
            });
        }
    }
};

window.CloudService = CloudService;