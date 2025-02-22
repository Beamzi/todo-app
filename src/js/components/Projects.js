import { allTasksBtn } from "./EventManager";
import { getProjectsData, getProjects, projectArrays, getPriorityData, getData, getIndex, sharedIndex } from "./taskData"
import { staticSelectors, dynamicSelectors } from "./utility/selectors"
const { projectContainer } = dynamicSelectors();
import { DOMRemove } from "./DOMRemove";
const domRemove = new DOMRemove
import { TaskCard } from "./TaskCard";
const taskCard = new TaskCard



export class Projects {
    constructor() {
        this.num = 0;
        this.fieldReferences = [];
        const sidebarProjects = document.querySelector('.dashboard')
        sidebarProjects.addEventListener('click', (event) => {
            this.clickViewProject(event)
        });
    }



    clickViewProject(event) {
        getProjects.forEach((project, arrIndex) => {
            if (event.target.classList.contains(`dashboard-project-btn${arrIndex}`)) {
                this.refreshProjectView(arrIndex)
                taskCard.clickSave(arrIndex);
            }
            this.clickTaskRemove(project, arrIndex, event)
        });
    }

    clickTaskRemove(project, arrIndex, event) {
        project.forEach((task, index) => {
            if (event.target.classList.contains(`project${arrIndex}-remove-btn-${index}`)) {
                console.log(getProjects[arrIndex])
                this.taskRemove(event, arrIndex, index)
            }
        });
    }

    refreshProjectView(arrIndex) {
        domRemove.checkEmpty();
        domRemove.containerRemove()
        const allTasks = taskCard.domInit(`project__container`, 'Projects');
        this.renderProjectTasks(allTasks, arrIndex, taskCard.fields(), taskCard.topBar())
    }


    taskRemove(event, arrIndex, index) {
        getProjects[arrIndex].splice(index + 1, 1)
        console.log(index)
        sharedIndex[arrIndex].splice(index + 1, 1)
        this.refreshProjectView(arrIndex)
    }

    renderProjectTasks(allTasks, arrIndex, fields, topBar) {
        for (let j = 0; j < getProjects[arrIndex].length; j++) {

            if (j > 0 && getProjects[arrIndex][j] !== undefined) {

                const fieldContainer = document.createElement('div')
                fieldContainer.classList.add('singular-project-task')
                let input
                fields.forEach((object, index) => {
                    const { tag, type, className, value } = object
                    input = document.createElement(tag);
                    if (type) input.type = type
                    if (value) input.value = value
                    if (type === 'submit') {
                        input.dataset.indexNumber = j
                    }
                    taskCard.classListGen(j, input, index, object)
                    let i = j - 1
                    if (index < 1) taskCard.renderTopbar(topBar, input, i, 'projects', `project${arrIndex}`)
                    taskCard.displayValues(input, index, getProjects[arrIndex][j])
                    fieldContainer.append(input)
                });
                allTasks.append(fieldContainer)
            };
        };

        const fieldContainer = document.querySelectorAll(`.singular-project-task`)
        fieldContainer.forEach((element, index) => {
            element.classList.add(`task${index}`)
        });
    }

    clickNewProject() {
        const newProjectBtn = document.querySelector('.create-new-project')
        newProjectBtn.addEventListener('click', (e) => {
            this.newProjectfields()
        });
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
            { tag: 'button', innerHTML: `<i class="fa-solid fa-angle-right"></i><span>${btnText}</span><i class="fa-solid fa-ellipsis-vertical"></i>` },
        ];
        let li
        let btn
        for (let object of projectList) {
            const { tag, textContent, innerHTML } = object
            if (tag === 'li') li = document.createElement(tag)
            if (innerHTML) {
                btn = document.createElement(tag)
               // btn.textContent = textContent
                btn.innerHTML = innerHTML
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

            //this will eventually mirror the true index values of getProjects
            sharedIndex.push(this.projectInstances(projectTitle))
            
            this.fieldRemove();
            console.log(getProjects)
            this.projectList()
        });
    };


    blahrg(arrIndex, index) {

        getData.forEach((object, index) => {
            let  validIndices = []
                if (getProjects[arrIndex][i] !== undefined && i > 0) {
                    validIndices.push(i)
                    console.log(validIndices)
                };
            

            getProjects[arrIndex][i + 1].splice(validIndices[index], 1, undefined)
            // by using `undefined` here to replace tasks, this maintains the implied length of the array
            console.log(validIndices)
            this.renderPriority();
        })


    }


    

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