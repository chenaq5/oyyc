// 知晓云初始化
const clientID = '882623eed0d11697a49c';
if (typeof BaaS !== 'undefined') {
    BaaS.init(clientID);
    console.log('知晓云初始化成功');
} else {
    console.log('知晓云 SDK 未加载');
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
            
            if (href !== '#' && document.querySelector(href)) {
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
        login: function(username, password) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            return BaaS.auth.login({username, password}).then(res => {
                console.log('登录成功', res);
                return res;
            }).catch(err => {
                console.error('登录失败', err);
                throw err;
            });
        },
        
        register: function(data) {
            if (typeof BaaS === 'undefined') {
                console.error('知晓云 SDK 未初始化');
                return Promise.reject('SDK 未初始化');
            }
            
            return BaaS.auth.register(data).then(res => {
                console.log('注册成功', res);
                return res;
            }).catch(err => {
                console.error('注册失败', err);
                throw err;
            });
        }
    }
};

window.CloudService = CloudService;