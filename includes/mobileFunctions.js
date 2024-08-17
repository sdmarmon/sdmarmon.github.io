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
    init() {
        this.createObservers();
    },
    createObservers() {
        const sections = document.querySelectorAll('section');
        const viewportHeight = 68 - window.innerHeight;
        sections.forEach(section => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const sectionId = entry.target.id;
                            this.titleMobileNavMenu = this.sectionTitles[sectionId] || sectionId;
                            window.history.replaceState(null, null, `#${sectionId}`);
                        }
                    });
                },
                {
                    root: null,
                    rootMargin: `-68px 0px ${viewportHeight}px 0px`,
                    threshold: 0
                }
            );
            observer.observe(section);
            this.observers.push(observer);
        });
    },
    handleResize() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        this.createObservers();
    }
})
