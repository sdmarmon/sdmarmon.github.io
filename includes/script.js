Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

function scrollToProject(project) {
    setTimeout(() => {
        // window.location.href = `#${project}`;
        scrollToElement(project);
    }, 250);
};

function isOneColumnDisplay() {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const breakpoint = 1024; //lg
    return viewportWidth < breakpoint;
};

document.addEventListener('alpine:init', () => {
    Alpine.data('heroText', () => ({
        textOverflowMobile: false,
        textOverflowDesktop: false,
        checkOverflow() {
        if (this.textOverflowMobile !== true)
        {
            const mobileElement = document.querySelector('.w-1\\/2');
            const mobileOverflow = (mobileElement.scrollHeight > mobileElement.clientHeight || mobileElement.scrollWidth > mobileElement.clientWidth);
            this.textOverflowMobile = mobileOverflow;
        }
        if (this.textOverflowDesktop !== true){
            const desktopElement = document.querySelector('.w-1\\/3');
            const desktopOverflow = (desktopElement.scrollHeight > desktopElement.clientHeight || desktopElement.scrollWidth > desktopElement.clientWidth);
            this.textOverflowDesktop = desktopOverflow;
        }}
    })),
    Alpine.data('projectCards', () => ({
        //Could implement a real database with sql.js-httpvfs to scale
        projects: [
            { title: 'OCUS', subjects: ['UX Research', 'UX Design', 'Data Analysis'], tools: ['R', 'SQL', 'Google Analytics', 'Hotjar', 'Excel', 'Communication Tools'], image: 'images/ocus.jpg', link: 'projects/ocus.html', description: 'Summarizing my work as an UX Researcher at OCUS.', isCol2: false },
            { title: 'Unilux', subjects: ['UX Research', 'Data Analysis'], tools: ['R', 'Python', 'SPSS', 'SQL', 'Communication Tools'], image: 'images/unilux.PNG', link: 'projects/unilux.html', description: 'Studying the applicability and validity of generic user experience scales.', isCol2: false },
            { title: 'Rush-hour', subjects: ['AI', 'Programming'], tools: ['Prolog'], image: 'images/rush-hour.PNG', link: 'projects/rush-hour.html', description: 'Coding a GUI and AI to play rush hour.', isCol2: false },
            { title: 'Gameloft', subjects: ['UX Research'], tools: ['Communication Tools'], image: 'images/gameloft.PNG', link: 'projects/gameloft.html', description: 'Presenting a usability assessment of the FTUE of the mobile game Asphalt 9: Legends.', isCol2: false },
            { title: 'PassWorthy', subjects: ['Programming', 'UX Design'], tools: ['C#/.NET', 'Windows Forms', 'NHibernate', 'SQL'], image: 'images/passworthy.PNG', link: 'projects/passworthy.html', description: 'Designing a desktop app to store and generate secure passwords.', isCol2: false },
            { title: 'TEEMON', subjects: ['Programming', 'Data Analysis', 'UX Design'], tools: ['React Native', 'SQL', 'Communication Tools'], image: 'images/teemon.PNG', link: 'projects/teemon.html', description: 'Designing a mobile app to team on with other league players.', isCol2: false }
        ],
        originalProjects: [],
        selectedProjectOriginalIndex: 0,
        selectedProjectIndex: 0,
        isSelectedProjectColTwo: false,
        selectedSubjects: [],
        selectedTools: [],

        initOriginalProjects() {
            this.originalProjects = this.projects.map(project => project.title);
        },

        isSelectedSubject(subject){
            return this.selectedSubjects.includes(subject);
        },

        isSelectedTool(tool){
            return this.selectedTools.includes(tool);
        },

        toggleSelectedSubject(subject) {
            const isSelected = this.isSelectedSubject(subject);
            if (isSelected) {
                this.selectedSubjects = this.selectedSubjects.filter(item => item !== subject);
            } else {
                this.selectedSubjects.push(subject);
            }
        },

        toggleSelectedTool(tool) {
            const isSelected = this.isSelectedTool(tool);
            if (isSelected) {
                this.selectedTools = this.selectedTools.filter(item => item !== tool);
            } else {
                this.selectedTools.push(tool);
            }
        },

        moveProject(project) {
            const projectOriginalIndex = this.originalProjects.findIndex(item => item === project);
            if (projectOriginalIndex !== this.selectedProjectOriginalIndex) {
                this.projects.move(0, this.selectedProjectOriginalIndex);
                this.projects.move(projectOriginalIndex, 0);
                this.selectedProjectOriginalIndex = projectOriginalIndex;
            }
        },

        calculateNewProjectIndex(projectTitle){
            const filteredProjects = this.projects.filter(project => this.matchSelectedCriteria(project));
            if (filteredProjects.length === 1) {
                this.selectedProjectIndex = 0;
                }
            else{
                const firstProject = filteredProjects.find(project => project.title !== projectTitle);
                const indexFirst = this.originalProjects.findIndex(item => item === firstProject.title);
                if (indexFirst > this.selectedProjectOriginalIndex) {
                    this.selectedProjectIndex = indexFirst;
                }
                else {
                    this.selectedProjectIndex = indexFirst + 1;
                }
            }
        },

        isProjectSecondColumn(project) {
            if (isOneColumnDisplay()){
                return false;
            }
            else{
                const filteredProjects = this.projects.filter(project => this.matchSelectedCriteria(project));
                projectIndex = filteredProjects.findIndex (item => item === project);
                if (projectIndex){
                    return (projectIndex % 2 === 1);
                }
                else{
                    return false;
                }
            }
        },

        moveProjectTwoColumns(project) {
            const projectOriginalIndex = this.originalProjects.findIndex(item => item === project);
            const projectObject = this.projects.find (p => p.title === project);
            if (projectObject.isCol2 === false) {
                    if (!this.isSelectedProjectColTwo)
                    {
                        this.projects.move(0, this.selectedProjectOriginalIndex);
                    }
                    else{
                        this.projects.move(this.selectedProjectIndex, this.selectedProjectOriginalIndex);
                    }
                    this.isSelectedProjectColTwo = false;
                    this.selectedProjectOriginalIndex = projectOriginalIndex;
                    this.selectedProjectIndex = 0;
                }
            else {
                if (!this.isSelectedProjectColTwo) {
                    this.projects.move(0, this.selectedProjectOriginalIndex);
                }
                else{
                    this.projects.move(this.selectedProjectIndex, this.selectedProjectOriginalIndex);
                }
                this.isSelectedProjectColTwo = true;
                this.selectedProjectOriginalIndex = projectOriginalIndex;
                this.calculateNewProjectIndex(project);
            }
            this.projects.move(projectOriginalIndex, this.selectedProjectIndex);
            this.updateIsCol2();
        },

        matchSelectedCriteria(project) {
            if (this.selectedSubjects.length === 0 && this.selectedTools.length === 0) {
                return true;
            }
            const hasAllSelectedSubjects = this.selectedSubjects.every(subject =>
                project.subjects.includes(subject)
            );
            const hasAllSelectedTools = this.selectedTools.every(tool =>
                project.tools.includes(tool)
            );
            return hasAllSelectedSubjects && hasAllSelectedTools;
        },

        updateIsCol2() {
            this.projects.forEach(project => {
                project.isCol2 = this.isProjectSecondColumn(project);
            });
        }
    }))
})
