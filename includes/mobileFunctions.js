export default () => ({
    showNavBar: false,
    showMobileNavMenu: false,
    showMobileNavOverlay: false,
    titleMobileNavMenu: '',
    bottomReached: false,
    sectionTitles: {
        'about': 'About me',
        'portfolio': 'Portfolio',
        'contact': 'Contact'
    },
    observers: [],
    scrollTimeout: null,
    init() {
        this.createObservers();
        if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
            this.enableSmoothScrolling();
        }
        window.addEventListener('hashchange', this.handleHashChange.bind(this));
    },
    createObservers() {
        const sections = document.querySelectorAll('section');
        const viewportHeight = 68 - window.innerHeight;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.updateHash(sectionId);
                }
            });
        },
        {
            root: null,
            rootMargin: `-68px 0px ${viewportHeight}px 0px`,
            threshold: 0
        }
        );
        sections.forEach((section) => observer.observe(section));
        this.observers.push(observer);
    },
    enableSmoothScrolling() {
        document.documentElement.style.scrollBehavior = 'smooth';
    },
    handleResize() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        this.createObservers();
    },
    updateHash(sectionId) {
        this.titleMobileNavMenu = this.sectionTitles[sectionId] || sectionId;
        window.history.replaceState(null, null, `#${sectionId}`);
    },
    handleHashChange() {
        const hash = window.location.hash.substring(1);
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.titleMobileNavMenu = this.sectionTitles[hash] || hash;
            window.history.replaceState(null, null, `#${hash}`);
        }, 50);
    }
})
