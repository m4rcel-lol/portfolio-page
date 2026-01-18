// ============================================
// macOS MENU BAR TIME
// ============================================

class MenuBarClock {
    constructor() {
        this.timeElement = document.getElementById('menu-time');
        this.dateElement = document.getElementById('menu-date');
        this.init();
    }
    
    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }
    
    updateTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        if (this.timeElement) {
            this.timeElement.textContent = `${displayHours}:${minutes} ${ampm}`;
        }
        if (this.dateElement) {
            this.dateElement.textContent = `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()}`;
        }
    }
}

// ============================================
// THEME MANAGEMENT
// ============================================

class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.init();
    }
    
    init() {
        this.loadTheme();
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        this.prefersDark.addEventListener('change', () => this.updateTheme());
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        } else {
            document.body.classList.toggle('dark-mode', this.prefersDark.matches);
        }
    }
    
    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    
    updateTheme() {
        if (!localStorage.getItem('theme')) {
            this.loadTheme();
        }
    }
}

// ============================================
// WINDOW MANAGEMENT
// ============================================

class WindowManager {
    constructor() {
        this.window = document.getElementById('portfolioWindow');
        this.closeBtn = document.querySelector('.window-control.close');
        this.minimizeBtn = document.querySelector('.window-control.minimize');
        this.maximizeBtn = document.querySelector('.window-control.maximize');
        this.isMaximized = false;
        this.isDragging = false;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.init();
    }
    
    init() {
        if (!this.window) return;
        
        // Window controls
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeWindow());
        }
        if (this.minimizeBtn) {
            this.minimizeBtn.addEventListener('click', () => this.minimizeWindow());
        }
        if (this.maximizeBtn) {
            this.maximizeBtn.addEventListener('click', () => this.toggleMaximize());
        }
        
        // Make window draggable
        const header = this.window.querySelector('.window-header');
        if (header) {
            header.addEventListener('mousedown', (e) => this.dragStart(e));
            header.addEventListener('dblclick', () => this.toggleMaximize());
        }
        
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.dragEnd());
    }
    
    closeWindow() {
        this.window.style.opacity = '0';
        this.window.style.transform = 'translateX(-50%) scale(0.9)';
        setTimeout(() => {
            this.window.style.display = 'none';
        }, 300);
    }
    
    minimizeWindow() {
        this.window.style.transform = 'translateX(-50%) translateY(100vh) scale(0.2)';
        this.window.style.opacity = '0';
        setTimeout(() => {
            this.window.style.transform = 'translateX(-50%)';
            this.window.style.opacity = '1';
        }, 500);
    }
    
    toggleMaximize() {
        if (this.isMaximized) {
            this.window.style.width = '90%';
            this.window.style.maxWidth = '1200px';
            this.window.style.height = 'calc(100vh - var(--menu-bar-height) - var(--dock-height) - 80px)';
            this.window.style.top = 'calc(var(--menu-bar-height) + 40px)';
            this.window.style.borderRadius = '12px';
        } else {
            this.window.style.width = 'calc(100% - 20px)';
            this.window.style.maxWidth = 'none';
            this.window.style.height = 'calc(100vh - var(--menu-bar-height) - var(--dock-height) - 20px)';
            this.window.style.top = 'calc(var(--menu-bar-height) + 10px)';
            this.window.style.borderRadius = '8px';
        }
        this.isMaximized = !this.isMaximized;
    }
    
    dragStart(e) {
        if (this.isMaximized) return;
        if (e.target.closest('.window-control') || e.target.closest('.toolbar-btn')) return;
        
        this.isDragging = true;
        const rect = this.window.getBoundingClientRect();
        this.initialX = e.clientX - rect.left + window.innerWidth / 2 - rect.width / 2;
        this.initialY = e.clientY - rect.top;
        this.window.style.cursor = 'grabbing';
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        this.currentX = e.clientX - this.initialX;
        this.currentY = e.clientY - this.initialY;
        
        this.window.style.left = '0';
        this.window.style.top = `${this.currentY}px`;
        this.window.style.transform = `translateX(${this.currentX}px)`;
    }
    
    dragEnd() {
        this.isDragging = false;
        if (this.window) {
            this.window.style.cursor = '';
        }
    }
}

// ============================================
// PROJECTS LOADER
// ============================================

class ProjectsLoader {
    constructor() {
        this.projectsGrid = document.getElementById('projectsGrid');
        this.projects = [
            {
                title: 'Portfolio Page',
                description: 'A modern, production-ready portfolio website built with HTML, CSS, and JavaScript.  Features responsive design, dark mode support, and smooth animations.',
                icon: '🎨',
                tech: ['HTML', 'CSS', 'JavaScript'],
                stars: 'Latest',
                link: 'https://github.com/m4rcel-lol/portfolio-page'
            },
            {
                title: 'Open Source Contributions',
                description: 'Active contributor to various open source projects.  Passionate about improving code quality and community-driven development.',
                icon: '🚀',
                tech: ['Git', 'GitHub', 'Collaboration'],
                stars: 'Active',
                link: 'https://github.com/m4rcel-lol'
            },
            {
                title: 'Web Applications',
                description: 'Building full-stack web applications with modern frameworks and tools. Focus on scalability, performance, and user experience.',
                icon: '💻',
                tech: ['JavaScript', 'React', 'Node.js'],
                stars: 'Featured',
                link: 'https://github.com/m4rcel-lol? tab=repositories'
            },
            {
                title: 'Developer Tools',
                description: 'Creating developer tools and utilities to improve productivity and streamline development workflows.',
                icon: '🛠️',
                tech: ['Tooling', 'CLI', 'Automation'],
                stars: 'Useful',
                link: 'https://github.com/m4rcel-lol'
            },
            {
                title: 'Learning Projects',
                description: 'Exploring new technologies and frameworks through practical projects. Always learning and staying updated with industry trends.',
                icon: '📚',
                tech: ['Experimentation', 'Growth', 'Learning'],
                stars: 'Growth',
                link: 'https://github.com/m4rcel-lol'
            },
            {
                title: 'Community',
                description: 'Engaging with the developer community through contributions, discussions, and knowledge sharing.',
                icon: '👥',
                tech: ['Community', 'Mentoring', 'Sharing'],
                stars: 'Engaged',
                link: 'https://github.com/m4rcel-lol'
            }
        ];
        this. init();
    }
    
    init() {
        this.renderProjects();
    }
    
    renderProjects() {
        this.projectsGrid.innerHTML = this.projects. map(project => `
            <div class="project-card">
                <div class="project-header">
                    <div class="project-icon">${project.icon}</div>
                    <span class="project-star">${project.stars}</span>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                    View Project →
                </a>
            </div>
        `).join('');
    }
}

// ============================================
// TOOLBAR NAVIGATION
// ============================================

class ToolbarNavigation {
    constructor() {
        this.toolbarBtns = document.querySelectorAll('.toolbar-btn');
        this.windowContent = document.querySelector('.window-content');
        this.init();
    }
    
    init() {
        this.toolbarBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const sectionId = btn.getAttribute('data-section');
                const section = document.getElementById(sectionId);
                if (section && this.windowContent) {
                    const offsetTop = section.offsetTop - 20;
                    this.windowContent.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// TECH STACK TABS
// ============================================

class TechStackTabs {
    constructor() {
        this.tabs = document.querySelectorAll('.tech-tab');
        this.panels = document.querySelectorAll('.tech-panel');
        this.init();
    }
    
    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs and panels
                this.tabs.forEach(t => t.classList.remove('active'));
                this.panels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding panel
                tab.classList.add('active');
                const targetPanel = document.getElementById(targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
}

// ============================================
// DOCK INTERACTIONS
// ============================================

class DockManager {
    constructor() {
        this.dockItems = document.querySelectorAll('.dock-item');
        this.init();
    }
    
    init() {
        this.dockItems.forEach(item => {
            item.addEventListener('click', () => {
                const windowId = item.getAttribute('data-window');
                if (windowId) {
                    const window = document.getElementById(windowId);
                    if (window) {
                        // Show window if hidden
                        if (window.style.display === 'none' || window.style.opacity === '0') {
                            window.style.display = 'flex';
                            setTimeout(() => {
                                window.style.opacity = '1';
                                window.style.transform = 'translateX(-50%) scale(1)';
                            }, 10);
                        }
                        // Set as active
                        this.dockItems.forEach(i => i.classList.remove('active'));
                        item.classList.add('active');
                    }
                }
            });
        });
    }
}

// ============================================
// SMOOTH SCROLL FOR HERO CTA
// ============================================

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    const windowContent = document.querySelector('.window-content');
                    
                    if (targetSection && windowContent) {
                        const offsetTop = targetSection.offsetTop - 20;
                        windowContent.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold:  0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry. target.style.opacity = '1';
                        entry.target. style.transform = 'translateY(0)';
                    }
                });
            }, this. observerOptions);
            
            document.querySelectorAll('.project-card, .skill-card, .stat').forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.observe(element);
            });
        }
    }
}

// ============================================
// PERFORMANCE & ACCESSIBILITY
// ============================================

class PerformanceOptimizer {
    static init() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries. forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            observer.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Add loading attribute to images
        document.querySelectorAll('img').forEach(img => {
            img.loading = 'lazy';
        });
    }
}

// ============================================
// ANALYTICS & TRACKING
// ============================================

class Analytics {
    static trackEvent(category, action, label) {
        if (window.gtag) {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
    }
    
    static init() {
        // Track link clicks
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', () => {
                Analytics.trackEvent('external', 'click', link.href);
            });
        });
        
        // Track section views
        document.querySelectorAll('section[id]').forEach(section => {
            const observer = new IntersectionObserver((entries) => {
                entries. forEach(entry => {
                    if (entry.isIntersecting) {
                        Analytics.trackEvent('section', 'view', entry.target.id);
                    }
                });
            });
            observer.observe(section);
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new MenuBarClock();
    new ThemeManager();
    new WindowManager();
    new ProjectsLoader();
    new ToolbarNavigation();
    new TechStackTabs();
    new DockManager();
    new SmoothScroll();
    new ScrollAnimations();
    PerformanceOptimizer.init();
    Analytics.init();
    
    console.log('✨ macOS Portfolio Desktop loaded successfully!');
});

// ============================================
// SERVICE WORKER REGISTRATION (PWA)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator. serviceWorker.register('sw.js').catch(err => {
            console.log('ServiceWorker registration failed:  ', err);
        });
    });
}