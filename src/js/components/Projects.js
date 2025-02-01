import { allTasksBtn } from "./EventManager";
import { getProjectsData, getProjects, projectArrays } from "./taskData"
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

    }

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

    projectInstances(projectTitle) {
        let instance = projectArrays(projectTitle)
        return instance
    }

    projectList() {
        const projects = document.querySelector('.projects-list')
        let btnText = getProjects[getProjects.length - 1]
        let projectList = [
            { tag: 'li' },
            { tag: 'button', textContent: btnText },
        ];
        let li
        let btn
        for (let object of projectList) {
            const { tag, textContent } = object
            if (tag === 'li') li = document.createElement(tag)
            if (textContent) {
                btn = document.createElement(tag)
                btn.textContent = textContent
            };
        }
        projects.append(li)
        li.append(btn)
    }

    projectSubmit() {
        this.fieldReferences[1].addEventListener('click', () => {
            let projectTitle = this.fieldReferences[0].value

            getProjects.push(this.projectInstances(projectTitle))
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

        /*
        const projects = document.querySelector('.projects-list')
        let projectListItem = { tag1: 'li'}
        let projectBtn = { tag2: 'button'}

        const { tag1 } = projectListItem
        let item = document.createElement(tag1)
        const { tag2 } = projectBtn
        let btn = document.createElement(tag2)
        projects.append(item) */