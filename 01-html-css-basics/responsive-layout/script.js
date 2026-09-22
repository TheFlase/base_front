// ==================== 汉堡菜单切换 ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击菜单项后关闭菜单
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 点击页面其他地方关闭菜单
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==================== 平滑滚动增强 ====================
// 为不支持 scroll-behavior: smooth 的浏览器提供兼容
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== 导航栏高亮 ====================
// 根据滚动位置高亮当前章节的导航链接
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100; // 导航栏高度偏移
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ==================== 表单提交处理 ====================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // 简单验证
        if (!name || !email || !message) {
            alert('请填写所有字段！');
            return;
        }
        
        // 邮箱验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('请输入有效的邮箱地址！');
            return;
        }
        
        // 模拟提交成功
        alert('消息发送成功！我们会尽快回复您。');
        contactForm.reset();
    });
}

// ==================== 滚动动画 ====================
// 为元素添加滚动进入视口时的动画效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
const animatedElements = document.querySelectorAll('.feature-card, .gallery-item, .pricing-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== 响应式工具函数 ====================
// 检测当前设备类型
function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

// 监听窗口大小变化
let deviceType = getDeviceType();
window.addEventListener('resize', () => {
    const newDeviceType = getDeviceType();
    if (newDeviceType !== deviceType) {
        deviceType = newDeviceType;
        console.log('设备类型变化:', deviceType);
        
        // 在设备类型变化时关闭移动端菜单
        if (deviceType !== 'mobile') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ==================== 性能优化：防抖和节流 ====================
// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
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

// 使用节流优化滚动事件
const throttledScrollHandler = throttle(highlightNavOnScroll, 100);
window.removeEventListener('scroll', highlightNavOnScroll);
window.addEventListener('scroll', throttledScrollHandler);

// ==================== 控制台输出 ====================
console.log('响应式布局项目已加载！');
console.log('当前设备类型:', deviceType);
console.log('浏览器宽度:', window.innerWidth);

