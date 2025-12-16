// 1. TAILWIND CONFIGURATION
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#2563eb",
                "primary-dark": "#1d4ed8",
                "secondary": "#10b981",
                "accent": "#8b5cf6",
                "background-light": "#f8fafc",
                "background-dark": "#0f172a",
                "surface-dark": "#1e293b",
                "surface-light": "#ffffff",
            },
            fontFamily: { "display": ["Inter", "sans-serif"], "body": ["Inter", "sans-serif"] },
            fontSize: {
                'fluid-3xl': 'clamp(2rem, 1.6rem + 2vw, 3rem)',
                'fluid-4xl': 'clamp(2.5rem, 2rem + 2.5vw, 4rem)',
            }
        },
    },
};

// 2. GLOBAL STYLES & HEADER HTML
const siteHeaderHTML = `
<div id="mobileMenu" class="mobile-menu fixed inset-y-0 right-0 w-80 bg-surface-light dark:bg-surface-dark z-50 shadow-2xl p-6 md:hidden">
    <div class="flex justify-between items-center mb-8">
        <h3 class="text-lg font-bold">Menu</h3>
        <button id="closeMenu" class="p-2"><span class="material-symbols-outlined">close</span></button>
    </div>
    <nav class="flex flex-col gap-4">
        <a class="text-lg font-medium hover:text-primary py-2" href="index.html">Home</a>
        <a class="text-lg font-medium hover:text-primary py-2" href="about.html">About</a>
        <a class="text-lg font-medium hover:text-primary py-2" href="#skills">Skills</a>
        <a class="text-lg font-medium hover:text-primary py-2" href="#experience">Experience</a>
        <a class="text-lg font-medium hover:text-primary py-2" href="#education">Education</a>
        <a class="text-lg font-medium hover:text-primary py-2" href="#projects">Projects</a>
        <a class="text-lg font-medium hover:text-primary py-2" href="#contact">Contact</a>
    </nav>
</div>

<header class="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300" style="height: var(--navbar-height);">
    <div class="section-container h-full">
        <div class="flex items-center justify-between h-full">
            <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onclick="window.location.href='index.html'">
                <div class="relative size-8 sm:size-10 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <span class="text-primary font-black text-lg sm:text-xl tracking-tighter">PK</span>
                </div>
                <h1 class="text-lg font-bold tracking-tight">Piyush Kumar</h1>
            </div>
            <nav class="hidden md:flex items-center gap-4 lg:gap-6">
                <a class="text-sm font-medium hover:text-primary transition-colors" href="index.html">Home</a>
                <a class="text-sm font-medium hover:text-primary transition-colors" href="about.html">About</a>
                <a class="text-sm font-medium hover:text-primary transition-colors" href="skills.html">Skills</a>
                <a class="text-sm font-medium hover:text-primary transition-colors" href="#experience">Experience</a>
                <a class="text-sm font-medium hover:text-primary transition-colors" href="#education">Education</a>
                <a class="text-sm font-medium hover:text-primary transition-colors" href="#projects">Projects</a>
                <a class="text-sm font-medium hover:text-primary transition-colors" href="#contact">Contact</a>
            </nav>
            <div class="flex items-center gap-2 sm:gap-3">
                <button aria-label="Toggle Theme" class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors" onclick="toggleTheme()">
                    <span class="material-symbols-outlined dark:hidden text-lg sm:text-xl">dark_mode</span>
                    <span class="material-symbols-outlined hidden dark:block text-lg sm:text-xl">light_mode</span>
                </button>
                <a class="hidden sm:flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-bold btn-primary rounded-lg" href="resume.html">Resume</a>
                <button id="openMenu" class="md:hidden p-2"><span class="material-symbols-outlined text-lg sm:text-xl">menu</span></button>
            </div>
        </div>
    </div>
</header>`;

const globalStyles = `
    :root { --navbar-height: clamp(3rem, 2.5rem + 2vw, 3.5rem); --header-height: clamp(3.5rem, 3rem + 2vw, 4rem); }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100vw; overflow-x: hidden; }
    .glass-nav { background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(0.75rem); -webkit-backdrop-filter: blur(0.75rem); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
    .light .glass-nav { background: rgba(255, 255, 255, 0.95); border-bottom: 1px solid rgba(0, 0, 0, 0.08); }
    .glass-panel { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
    .gradient-text { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .btn-primary { background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); color: white; font-weight: 700; transition: all 0.3s ease; }
    .btn-primary:hover { background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%); transform: translateY(-0.125rem); box-shadow: 0 0.5rem 1rem rgba(37, 99, 235, 0.3); }
    .section-container { width: 100%; max-width: 90rem; margin: 0 auto; padding: 0 clamp(1rem, 3vw, 2rem); }
    .mobile-menu { transform: translateX(100%); transition: transform 0.3s ease-in-out; }
    .mobile-menu.active { transform: translateX(0); }
`;

// 3. INITIALIZATION
function initSite() {
    // Inject CSS
    const styleSheet = document.createElement("style");
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);

    // Inject Header HTML
    document.body.insertAdjacentHTML('afterbegin', siteHeaderHTML);

    // Mobile Menu Logic
    const mobileMenu = document.getElementById('mobileMenu');
    window.openMobileMenu = () => { mobileMenu.classList.add('active'); document.body.style.overflow = 'hidden'; };
    window.closeMobileMenu = () => { mobileMenu.classList.remove('active'); document.body.style.overflow = 'auto'; };

    document.getElementById('openMenu').onclick = window.openMobileMenu;
    document.getElementById('closeMenu').onclick = window.closeMobileMenu;
    document.querySelectorAll('#mobileMenu a').forEach(link => link.onclick = window.closeMobileMenu);

    // Theme Toggle Logic
    window.toggleTheme = () => {
        const html = document.documentElement;
        const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
        html.classList.remove('light', 'dark');
        html.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.add(savedTheme);
}

document.addEventListener('DOMContentLoaded', initSite);