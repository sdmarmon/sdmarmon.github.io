export default () => ({
    open: false,

    projects: [
        { title: 'OCUS', subjects: ['UX Research', 'UX Design', 'Data Analysis'], tools: ['R', 'Hotjar', 'Figma', 'Google Analytics', 'Looker', 'Typeform', 'Communication Tools'], link: 'projects/ocus.html', description: 'Summarizing my work as an UX Researcher at OCUS.', lazy: false, isCol2: false },
        { title: 'Unilux', subjects: ['UX Research', 'Data Analysis'], tools: ['R', 'Python', 'SQL', 'SPSS', 'Communication Tools'], link: 'projects/unilux.html', description: 'Studying the applicability and validity of generic user experience scales.', lazy: false, isCol2: false },
        { title: 'Gameloft', subjects: ['UX Research'], tools: ['Communication Tools'], link: 'projects/gameloft.html', description: 'Presenting a usability assessment of the FTUE of the mobile game Asphalt 9: Legends.', lazy: true, isCol2: false },
        { title: 'TEEMON', subjects: ['Programming', 'Data Analysis', 'UX Design'], tools: ['React Native', 'SQL', 'Axure', 'Communication Tools'], link: 'projects/teemon.html', description: 'Designing a mobile app to team on with other league players.', lazy: true, isCol2: false },
        { title: 'Rush-hour', subjects: ['AI', 'Programming'], tools: ['Prolog'], link: 'projects/rush-hour.html', description: 'Coding a GUI and AI to play rush hour.', lazy: true, isCol2: false },
        { title: 'PassWorthy', subjects: ['Programming', 'UX Design'], tools: ['C#/.NET', 'SQL', 'Windows Forms', 'NHibernate'], link: 'projects/passworthy.html', description: 'Designing a desktop app to store and generate secure passwords.', lazy: true, isCol2: false },
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
})