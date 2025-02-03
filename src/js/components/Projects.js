import { allTasksBtn } from "./EventManager";
import { getProjectsData, getProjects, projectArrays } from "./taskData"
import { staticSelectors } from "./utility/selectors"
import { DOMRemove } from "./DOMRemove";
const domRemove = new DOMRemove
import { TaskCard } from "./TaskCard";
const taskCard = new TaskCard


export class Projects {
    constructor() {
        this.fieldReferences = [];

        const sidebarProjects = document.querySelector('.dashboard__sidebar__projects')
        sidebarProjects.addEventListener('click', (event) => {
            this.clickViewProject(event)
        })
    }

    clickViewProject(event) {
        getProjects.forEach((item, arrIndex) => {
            if (event.target.classList.contains(`dashboard-project-btn${arrIndex}`)) {
                domRemove.containerRemove()
                const allTasks = this.domInit(`project__container`);
                this.renderViewProject(allTasks, arrIndex, taskCard.fields(), taskCard.topBar())
              //   taskCard.tasksList(arrIndex);
            }

        })
    }

    renderViewProject(allTasks, arrIndex, fields, topBar) {
        for (let j = 0; j < getProjects[arrIndex].length; j++) {
            if (j > 0) {
                const fieldContainer = document.createElement('div')
                fieldContainer.classList.add('singular-project-task')
                let input
               /* let fields = [
                    { tag: 'input', type: 'text', className: 'all-tasks-text' },
                    { tag: 'input', type: 'date', className: 'all-tasks-text' },
                    { tag: 'textarea', className: 'all-tasks-text' },
                    { tag: 'input', type: 'submit', value: 'save', className: 'save-btn' },
                    { tag: 'button', className: 'makePriority' },
                ]; */
                fields.forEach((object, index) => {
                    const { tag, type, className, value } = object

                    input = document.createElement(tag);
                    if (type) input.type = type
                    if (value) input.value = value
                    input.classList.add(className)

                    if (index < 1) taskCard.renderTopbar(topBar, input, j)

                    const { title, date, details } = getProjects[arrIndex][j];
                    let array = [ 'topBar', title, date, details, 'save' ];
                    input.placeholder = array[index];
                    input.value = array[index]

                    fieldContainer.append(input)
                
                });
                allTasks.append(fieldContainer)
            };
        };
    }


    /*
    renderTopbar(topBar, input, i) {
        topBar.forEach((obj, index) => {
            const { tag, className, value, textContent, type } = obj;
            let topBarBtn = document.createElement(tag)
            if (value) topBarBtn.value = value
            if (value === 'remove') {
                topBarBtn.classList.add(className, `removeBtn${i}`) 
            }
            if (value === 'projects') topBarBtn.classList.add(className, `project-list${i}`)
            topBarBtn.textContent = textContent;
            topBarBtn.type = type;
          //  topBarBtn.textContent = 'remove'
          //  this.references.push(input)
            input.append(topBarBtn)

        });
    }
        */

    domInit(reference) {
        const contents = staticSelectors.dashboardContents;
        const container = document.createElement('div')
        container.classList.add(reference)
        container.innerHTML = `
        <h3 class="view-title">projects</h3>
        <hr>`
        contents.prepend(container)
        return container
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
                btn.classList.add('dashboard-project-btns', `dashboard-project-btn${getProjects.length - 1}` )
            };
        }
        projects.append(li)
        li.append(btn)
    }

    projectInstances(projectTitle) {
        let instance = projectArrays(projectTitle)
        return instance
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