export default () => ({
    showNavBar: false,
    showMobileNavMenu: false,
    showMobileNavOverlay: false,
    titleMobileNavMenu: '',
    bottomReached: false,
    observers: [],
    sectionTitles: {
        'about': 'About me',
        'portfolio': 'Portfolio',
        'contact': 'Contact'
    },
    init() {
        this.createObservers();
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 200));
    },
    createObservers() {
        const sections = document.querySelectorAll('section');
        const viewportHeight = 68 - window.innerHeight;
        sections.forEach(section => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.bottomReached = false;
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
    },
    throttle(func, limit) {
        let lastFunc;
        let lastRan;
        let trailingFunc;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                    trailingFunc = null;
                }, limit);

                trailingFunc = { func: func, context: context, args: args };
            }
        };
    }
})
