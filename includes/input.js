import Alpine from 'alpinejs'
import navigationMenu from './navigationMenu.js'
import focus from '@alpinejs/focus'
import intersect from '@alpinejs/intersect'
import persist from '@alpinejs/persist'

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
}
Alpine.data('navigationMenu', navigationMenu)
Alpine.data('projectCards', function () {
    return{
        projects: this.$persist([
            { title: 'OCUS', subjects: ['UX Research', 'UX Design', 'Data Analysis'], tools: ['R', 'Hotjar', 'Figma', 'Google Analytics', 'Looker', 'Typeform', 'Communication Tools'], link: 'projects/ocus.html', description: 'Summarizing my work as an UX Researcher at OCUS.', lazy: false, isCol2: false },
            { title: 'Unilux', subjects: ['UX Research', 'Data Analysis'], tools: ['R', 'Python', 'SQL', 'SPSS', 'Communication Tools'], link: 'projects/unilux.html', description: 'Studying the applicability and validity of generic user experience scales.', lazy: false, isCol2: false },
            { title: 'Gameloft', subjects: ['UX Research'], tools: ['Communication Tools'], link: 'projects/gameloft.html', description: 'Presenting a usability assessment of the FTUE of the mobile game Asphalt 9: Legends.', lazy: true, isCol2: false },
            { title: 'TEEMON', subjects: ['Programming', 'Data Analysis', 'UX Design'], tools: ['React Native', 'SQL', 'Axure', 'Communication Tools'], link: 'projects/teemon.html', description: 'Designing a mobile app to team on with other league players.', lazy: true, isCol2: false },
            { title: 'Rush-hour', subjects: ['AI', 'Programming'], tools: ['Prolog'], link: 'projects/rush-hour.html', description: 'Coding a GUI and AI to play rush hour.', lazy: true, isCol2: false },
            { title: 'PassWorthy', subjects: ['Programming', 'UX Design'], tools: ['C#/.NET', 'SQL', 'Windows Forms', 'NHibernate'], link: 'projects/passworthy.html', description: 'Designing a desktop app to store and generate secure passwords.', lazy: true, isCol2: false },
        ]).using(sessionStorage),
        originalProjects: ['OCUS', 'Unilux', 'Gameloft', 'TEEMON', 'Rush-hour', 'PassWorthy'],
        selectedProjectOriginalIndex: this.$persist(0).using(sessionStorage),
        selectedProjectIndex: this.$persist(0).using(sessionStorage),
        isSelectedProjectColTwo: this.$persist(false).using(sessionStorage),
        selectedSubjects: this.$persist([]).using(sessionStorage),
        selectedTools: this.$persist([]).using(sessionStorage),

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
        // moveProject(project) {
        //     const projectOriginalIndex = this.originalProjects.findIndex(item => item === project);
        //     if (projectOriginalIndex !== this.selectedProjectOriginalIndex) {
        //         this.projects.move(0, this.selectedProjectOriginalIndex);
        //         this.projects.move(projectOriginalIndex, 0);
        //         this.selectedProjectOriginalIndex = projectOriginalIndex;
        //     }
        // },
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
        },
        isProjectSecondColumn(project) {
            if (this.isOneColumnDisplay()){
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
        isOneColumnDisplay() {
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            const breakpoint = 1024; //lg
            return viewportWidth < breakpoint;
        },
        scrollToElement(id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },
        scrollToProject(project) {
            setTimeout(() => {
                // window.location.href = `#${project}`;
                this.scrollToElement(project);
            }, 250);
        }
    }
})
Alpine.plugin(focus)
Alpine.plugin(intersect)
Alpine.plugin(persist)
window.Alpine = Alpine
Alpine.start()