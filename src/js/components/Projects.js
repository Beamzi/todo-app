import { getProjectsData, getProjects } from "./taskData"
import { staticSelectors } from "./utility/selectors"

export class Projects {
    constructor() {
        this.fieldReferences = [];
    }

    clickNewProject() {
        const newProjectBtn = document.querySelector('.create-new-project')
        newProjectBtn.addEventListener('click', (e) => {
            this.newProjectfields()
            e.target.style['background-color'] = 'red';
        });
    }


    projectList() {

    };

    newProjectfields() {

        let field
        const container = staticSelectors.sidebarProjects

        const fields = [
            { tag: 'input', type: 'text', className: 'project-name' },
            { tag: 'input', type: 'submit', className: 'project-name-submit'},
        ]

        for (let obj of fields) {
            const { tag, type, className } = obj
            field = document.createElement(tag)
            field.type = type
            field.classList.add(className)
            this.fieldReferences.push(field)
            container.append(field)
        };

        console.log(this.fieldReferences)
        this.projectSubmit();
    }

    projectList() {
        const projects = document.querySelector('.projects-list')
        const project = document.createElement('button')
        project.textContent = getProjects[getProjects.length - 1]
        projects.append(project)
    }



    projectSubmit() {
        this.fieldReferences[1].addEventListener('click', () => {
            getProjects.push(this.fieldReferences[0].value)
            this.fieldRemove();
            console.log(getProjects)
            this.projectList()
        });
    };

    fieldRemove() {
        for (let field of this.fieldReferences) {
            field.remove()
        };
        this.fieldReferences = [];
    }


    




    clickProjectList() {

    };


    
}