
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function addToCart(productId) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id: productId, qty: 1 });
    }
    saveCart();
    showToast(t('cart.added'));
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('hidden');
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!container || !totalEl) return;

    if (cart.length === 0) {
        container.innerHTML = `<p class="text-text-muted text-sm text-center py-8">${t('cart.empty')}</p>`;
        totalEl.textContent = '¥0';
        return;
    }
    let total = 0;
    container.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';
        const subtotal = product.price * item.qty;
        total += subtotal;
        return `
            <div class="flex items-center gap-3 p-3 bg-bg-main rounded-xl">
                <img src="${product.img}" alt="${product.name[currentLang]}" class="w-12 h-12 rounded-lg object-cover" loading="lazy">
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-text-title truncate">${product.name[currentLang]}</p>
                    <p class="text-xs text-text-body">¥${product.price.toLocaleString()} × ${item.qty}</p>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-text-muted hover:text-red-400 transition-colors" aria-label="移除">
                    <i class="fa-solid fa-trash-can text-xs"></i>
                </button>
            </div>
        `;
    }).join('');
    totalEl.textContent = '¥' + total.toLocaleString();
}

// ================================================================
// Toast 通知
// ================================================================
function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2000);
}

// ================================================================
// 渲染时间轴
// ================================================================
function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;
    container.innerHTML = workshopSteps.map((step, i) => `
        <div class="scroll-item scroll-card-workshop fade-up" style="transition-delay:${i * 0.06}s">
            <div class="feature-card overflow-hidden hover-lift cursor-pointer h-full" onclick="openWorkshopDetail(${step.id})">
                <img src="${step.img}" alt="${step.title[currentLang]}" class="w-full h-36 object-cover" loading="lazy">
                <div class="p-5">
                    <div class="flex items-center gap-2 mb-2">
                        <div class="w-8 h-8 rounded-full bg-yuebai flex items-center justify-center shrink-0">
                            <i class="fa-solid ${step.icon} text-tianqing-deep text-xs"></i>
                        </div>
                        <span class="text-xs text-tianqing font-medium">#${step.id} / 72</span>
                    </div>
                    <h4 class="text-base font-semibold text-text-title font-serif-cn mb-2">${step.title[currentLang]}</h4>
                    <p class="text-sm text-text-body leading-relaxed">${step.desc[currentLang]}</p>
                </div>
            </div>
        </div>
    `).join('');
    observeFadeUp();
}

// ================================================================
// 渲染知识图谱
// ================================================================
let selectedPeriod = 'song';

function renderKnowledgeGraph() {
    const nodesContainer = document.getElementById('kg-nodes');
    const detailContainer = document.getElementById('history-detail');
    const scrollContainer = document.getElementById('history-scroll-container');
    if (!nodesContainer || !detailContainer) return;

    // 知识图谱节点
    nodesContainer.innerHTML = historyPeriods.map(p => `
        <button class="kg-node ${p.id === selectedPeriod ? 'bg-tianqing text-white' : ''}" onclick="selectPeriod('${p.id}')">
            <span>${p.label[currentLang]}</span>
            <span class="text-xs opacity-70">${p.year}</span>
        </button>
    `).join('');

    // 横向滚动卡片
    if (scrollContainer) {
        scrollContainer.innerHTML = historyPeriods.map((p, i) => `
            <div class="scroll-item scroll-card-history fade-up" style="transition-delay:${i * 0.06}s">
                <div class="feature-card overflow-hidden hover-lift cursor-pointer h-full ${p.id === selectedPeriod ? 'ring-2' : ''}" onclick="selectPeriod('${p.id}')">
                    <img src="${p.img}" alt="${p.title[currentLang]}" class="w-full h-44 object-cover" loading="lazy">
                    <div class="p-5">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="badge bg-tianqing">${p.label[currentLang]}</span>
                            <span class="text-xs text-text-muted">${p.year}</span>
                        </div>
                        <h4 class="text-base font-serif-cn mb-2">${p.title[currentLang]}</h4>
                        <p class="text-sm text-text-body leading-relaxed line-clamp-3">${p.desc[currentLang]}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 详情面板
    const period = historyPeriods.find(p => p.id === selectedPeriod);
    if (period) {
        detailContainer.innerHTML = `
            <div class="flex flex-col sm:flex-row gap-6">
                <img src="${period.img}" alt="${period.title[currentLang]}" class="w-full sm:w-64 h-40 rounded-xl object-cover" loading="lazy">
                <div>
                    <div class="flex items-center gap-2 mb-2">
                        <span class="badge bg-tianqing">${period.label[currentLang]}</span>
                        <span class="text-xs text-text-muted">${period.year}</span>
                    </div>
                    <h4 class="text-lg font-serif-cn mb-2">${period.title[currentLang]}</h4>
                    <p class="text-sm text-text-body leading-relaxed">${period.desc[currentLang]}</p>
                </div>
            </div>
        `;
    }
    observeFadeUp();
}

function selectPeriod(id) {
    selectedPeriod = id;
    renderKnowledgeGraph();
}

// ================================================================
// 渲染展览列表
// ================================================================
function renderExhibitions() {
    const container = document.getElementById('exhibition-list');
    if (!container) return;
    container.innerHTML = exhibitions.map(ex => `
        <div class="feature-card overflow-hidden hover-lift">
            <img src="${ex.img}" alt="${ex.title[currentLang]}" class="w-full h-40 object-cover" loading="lazy">
            <div class="p-5">
                <h4 class="font-serif-cn text-base mb-1">${ex.title[currentLang]}</h4>
                <p class="text-sm text-text-body mb-1"><i class="fa-solid fa-location-dot text-tianqing mr-1"></i>${ex.location[currentLang]}</p>
                <p class="text-xs text-text-muted mb-1"><i class="fa-solid fa-calendar text-tianqing mr-1"></i>${ex.date}</p>
                <p class="text-xs text-text-muted mb-3"><i class="fa-solid fa-cube text-tianqing mr-1"></i>${ex.items}${t('exhibition.items')}</p>
                <button onclick="openBookingModal(${ex.id})" class="w-full py-2.5 bg-tianqing-deep text-white rounded-xl text-sm font-medium hover:bg-tianqing transition-colors">${t('exhibition.book')}</button>
            </div>
        </div>
    `).join('');
    // TODO: 对接后端接口 GET /api/exhibitions
}

// ================================================================
// 渲染产品列表
// ================================================================
function renderProducts() {
    const container = document.getElementById('product-list');
    if (!container) return;
    container.innerHTML = products.map(p => `
        <div class="feature-card overflow-hidden hover-lift cursor-pointer" onclick="openProductDetail(${p.id})">
            <img src="${p.img}" alt="${p.name[currentLang]}" class="w-full aspect-square object-cover" loading="lazy">
            <div class="p-4">
                <span class="badge ${p.tagColor} text-xs mb-2">${p.tag[currentLang]}</span>
                <h4 class="font-serif-cn text-sm mt-1 mb-1">${p.name[currentLang]}</h4>
                <p class="text-tianqing-deep font-semibold text-sm">¥${p.price.toLocaleString()}</p>
            </div>
        </div>
    `).join('');
    // TODO: 对接后端接口 GET /api/products
}

// ================================================================
// 弹窗处理
// ================================================================
function openArModal() {
    document.getElementById('ar-modal').classList.add('active');
}
function closeArModal() {
    document.getElementById('ar-modal').classList.remove('active');
}

function openBookingModal(exId) {
    document.getElementById('booking-modal').classList.add('active');
    // TODO: 对接后端接口 GET /api/exhibitions/{exId}
}
function closeBookingModal() {
    document.getElementById('booking-modal').classList.remove('active');
}

function handleBooking(e) {
    e.preventDefault();
    // TODO: 对接后端接口 POST /api/reservations
    // 请求体: { exhibitionId, name, phone, date, visitors }
    // 返回: { success: boolean, bookingId: string, message: string }
    showToast(t('booking.success'));
    closeBookingModal();
    e.target.reset();
}

function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    document.getElementById('product-modal-title').textContent = product.name[currentLang];
    document.getElementById('product-modal-body').innerHTML = `
        <img src="${product.img}" alt="${product.name[currentLang]}" class="w-full aspect-video object-cover rounded-xl mb-4" loading="lazy">
        <span class="badge ${product.tagColor}">${product.tag[currentLang]}</span>
        <p class="text-text-body text-sm mt-3 mb-4">${product.desc[currentLang]}</p>
        <p class="text-tianqing-deep font-bold text-xl mb-6">¥${product.price.toLocaleString()}</p>
        <div class="flex gap-3">
            <button onclick="addToCart(${product.id});closeProductModal()" class="flex-1 py-3 bg-tianqing-deep text-white rounded-xl text-sm font-medium hover:bg-tianqing transition-colors">${t('product.addToCart')}</button>
            <button onclick="closeProductModal()" class="flex-1 py-3 border border-tianqing-deep text-tianqing-deep rounded-xl text-sm font-medium hover:bg-yuebai transition-colors">${t('product.custom')}</button>
        </div>
    `;
    // TODO: 对接后端接口 GET /api/products/{productId}
    // TODO: 对接后端接口 POST /api/custom
    // 请求体: { productId, userId, requirements: { material, size, pattern, inscription } }
    document.getElementById('product-modal').classList.add('active');
}
function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}

function openWorkshopDetail(id) {
    const step = workshopSteps.find(s => s.id === id);
    if (!step) return;
    document.getElementById('product-modal-title').textContent = step.title[currentLang];
    document.getElementById('product-modal-body').innerHTML = `
        <img src="${step.img}" alt="${step.title[currentLang]}" class="w-full aspect-video object-cover rounded-xl mb-4" loading="lazy">
        <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-full bg-yuebai flex items-center justify-center">
                <i class="fa-solid ${step.icon} text-tianqing-deep text-xs"></i>
            </div>
            <span class="text-xs text-tianqing font-medium">#${step.id} / 72</span>
        </div>
        <p class="text-text-body text-sm leading-relaxed mb-4">${step.desc[currentLang]}</p>
        <div class="bg-yuebai rounded-xl p-4">
            <p class="text-xs text-text-muted mb-2">工序视频</p>
            <div class="w-full h-40 bg-border-light rounded-lg flex items-center justify-center">
                <i class="fa-solid fa-circle-play text-3xl text-text-muted"></i>
            </div>
        </div>
    `;
    // TODO: 对接后端接口 GET /api/techniques/{id}
    // TODO: 对接后端接口 GET /api/videos/{id}
    document.getElementById('product-modal').classList.add('active');
}

// ================================================================
// 滚动动画 (Intersection Observer)
// ================================================================
function observeFadeUp() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// ================================================================
// 导航栏滚动效果
// ================================================================
function handleNavScroll() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // 高亮当前区域的导航链接
    const sections = ['hero', 'workshop', 'history', '3d-gallery', 'ar-exp', 'exhibition', 'shop', 'about'];
    let current = 'hero';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
}

// ================================================================
// 移动端菜单
// ================================================================
function initMobileMenu() {
    document.getElementById('hamburger').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('active');
    });
    document.getElementById('mobile-close').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.remove('active');
    });
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.remove('active');
        });
    });
}

// ================================================================
// 语言切换
// ================================================================
function initLangToggle() {
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('lang', currentLang);
        applyLang();
        // 重新渲染动态内容
        renderTimeline();
        renderKnowledgeGraph();
        renderExhibitions();
        renderProducts();
        renderCart();
    });
}

// ================================================================
// 应用初始化
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 先应用语言（立即执行，不等待其他资源）
    applyLang();

    // 渲染各模块
    renderTimeline();
    renderKnowledgeGraph();
    renderExhibitions();
    renderProducts();
    renderCart();

    // 初始化交互
    initMobileMenu();
    initLangToggle();

    // 延迟初始化3D场景（非首屏关键内容）
    requestAnimationFrame(() => {
        initThreeJS();
    });

    // 滚动动画
    observeFadeUp();

    // 隐藏加载屏
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 600);
});

// 滚动事件（节流）
let scrollTick = false;
window.addEventListener('scroll', () => {
    if (!scrollTick) {
        requestAnimationFrame(() => {
            handleNavScroll();
            scrollTick = false;
        });
        scrollTick = true;
    }
}, { passive: true });

// 窗口大小变化
window.addEventListener('resize', () => {
    handleThreeResize();
});

// ================================================================
// Carousel / 图片轮播
// ================================================================
let currentSlide = 0;
let carouselInterval;

function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById('carousel-dots');

    if (!track || slides.length === 0) return;

    // 创建指示点
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });

    // 自动播放
    startCarouselAutoplay();

    // 鼠标悬停暂停
    const container = document.getElementById('main-carousel');
    if (container) {
        container.addEventListener('mouseenter', stopCarouselAutoplay);
        container.addEventListener('mouseleave', startCarouselAutoplay);
    }
}

function moveCarousel(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');

    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function startCarouselAutoplay() {
    stopCarouselAutoplay();
    carouselInterval = setInterval(() => moveCarousel(1), 5000);
}

function stopCarouselAutoplay() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

// 初始化轮播图
document.addEventListener('DOMContentLoaded', initCarousel);
