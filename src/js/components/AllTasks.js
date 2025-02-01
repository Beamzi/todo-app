
import { dynamicSelectors, staticSelectors } from "./utility/selectors";
import { getData, getPriorityData, getProjects, getProjectsData } from "./taskData";
import { DOMRemove } from "./DOMRemove";
const domRemove = new DOMRemove

export class AllTasks {
    constructor() {
        this.references = [];
        this.fields = [
            { tag: 'div', className: 'task-top-bar' },
            { tag: 'input', type: 'text', className: 'all-tasks-text' },
            { tag: 'input', type: 'date', className: 'all-tasks-text' },
            { tag: 'textarea', className: 'all-tasks-text' },
            { tag: 'input', type: 'submit', value: 'save', className: 'save-btn' },
            { tag: 'button', className: 'makePriority' },
        ];
        this.topBar = [
            { tag: 'ul', className: 'all-tasks-projects', textContent: 'projects', type: 'button',  value: 'projects' },
            { tag: 'button', className: 'all-tasks-remove-btn', textContent: 'remove', type: 'button', value: 'remove' },
        ]


        this.dashboardContents = staticSelectors.dashboardContents;
        // Ensure the listener is only attached once
        if (!this.dashboardContents.__listenerAttached) {
            this.dashboardContents.addEventListener('click', (event) => {
                this.clickProjects(event)

            });
            this.dashboardContents.__listenerAttached = true; // Mark as attached
        };
    }


    clickProjects(event) {
        getData.forEach((fas, index) => {
            if (event.target.classList.contains(`project-list${index}`)) {
                this.renderProjectList(event.target, index);
                this.clickProjectInList(index)
              //event.stopPropagation()
            };
        });
    }

    clickProjectIfSaved() {
        
    }

    clickProjectInList(index) {
            //index from getData in clickProjects
        for (let j = 0; j < getProjects.length; j++) {
            const projectOfList = document.querySelector(`.project-${j}-of-list-${index}`)
            if (projectOfList) {
                projectOfList.addEventListener('click', (event) => {
                    console.log(j, 'j', index, 'i')
                    getProjects[j].splice(index + 1, 1, getData[index])
                    console.log(getProjects)
                });
            };
        };
    }

    renderProjectList(projectList, index) {
        //index from getData in clickProjects
        let subLi
        let subBtn
        for (let i = 0; i < getProjects.length; i++) {
            subLi = document.createElement('li')
            subBtn = document.createElement('button')

            const  [ string ] = getProjects[i]
            console.log(string)
            subBtn.textContent = string
            subBtn.value = getProjects[i]
            subBtn.classList.add(`project-${i}-of-list-${index}`, 'all-projects-menu')
            projectList.append(subLi)
            subLi.append(subBtn)
        }
    }





    removeTask() {
        const allTasksBtn = staticSelectors.allTasksBtn
        getData.forEach((obj, index) => {
            const remove = document.querySelector(`.removeBtn${index}`)
            if (remove) {
                remove.addEventListener('click', () => {
                    getData.splice(index, 1)
                    getPriorityData.splice(index, 1);
                    allTasksBtn.click();
                });
            };
        });
    }

    clickAllTasks() {
        const allTasksBtn = document.querySelector('.all-tasks-btn');
        allTasksBtn.addEventListener('click', (e) => {
            this.classToggle();
            domRemove.checkEmpty();
            this.noTasks();
            domRemove.containerRemove();
            this.tasksList();
            this.clickProjectInList()


        });
    }
    
    clickMakePriority() {
        const makePriority = document.querySelectorAll('.makePriority')
        makePriority.forEach((btn, index) => {
            btn.setAttribute('id', `btn${index}`)
            btn.addEventListener ('click', (event) => {
            //priorityTrigger.splice(0, 1, index);
                event.preventDefault();
                btn.classList.add('made-priority-init')
                getPriorityData[index] = getData[index]
                console.log(getPriorityData, 'getPriorityData')
            });
        });
    }

    clickSave() {
        const save = document.querySelectorAll('.save-btn')
        save.forEach((btn, index) => {
            const fields = document.querySelectorAll(`.task${index} > *`)
            fields.forEach((field, index) => {
                field.addEventListener('click', () => {
                    if (index > 0 && index <= 3) {
                        btn.classList.remove('save-btn-init')
                        field.classList.remove('all-tasks-text-init')
                    };
                });
            });
            btn.addEventListener('click', (event) => {
                btn.value = 'saved'
                btn.classList.add('save-btn-click', 'save-animation')
                let obj = {}
                event.preventDefault()
                const fields = document.querySelectorAll(`.task${index} > *`)
                fields.forEach((field, index) => {
                    let keys = ['top-bar', 'title', 'date', 'details']
                    if (index > 0 && index <= 3) {
                        obj[keys[index]] = field.value
                        field.classList.add('save-toggle-text')
                        field.addEventListener('click', () => {
                            field.classList.remove('save-toggle-text')
                            btn.classList.remove('save-btn-click')
                        });
                    };
                });
                getData[index] = obj
                console.log(getData)
                console.log(getProjects)

                const madePriority = document.querySelector(`.made-priority${index}`)
                if (madePriority) {
                    madePriority.click();
                };
            });
        });
    };


    tasksList() {
       const allTasks = this.domInit();
       this.renderFields(this.fields, this.topBar, allTasks)
       this.clickMakePriority();
       this.clickSave();
       this.removeTask();
    };

    domInit() {
        const contents = staticSelectors.dashboardContents;
        const allTasks = document.createElement('div')
        allTasks.classList.add('all-tasks__container')
        allTasks.innerHTML = `
        <h3 class="view-title">All Tasks</h3>
        <hr>`
        contents.prepend(allTasks)
        return allTasks
    }

    renderFields(fields, topBar, allTasks) {
        for (let i = 0; i < getData.length; i++) {
            const fieldContainer = document.createElement('div')
            fieldContainer.classList.add('singular-task', `task${i}`)
            fields.forEach((obj, index) => {
                const { tag, type, value, className } = obj;
                let input = document.createElement(tag)
                if (tag === 'button') input.textContent = 'Make Priority';
                if (type) input.type = type
                this.classListGen(i, input, index, obj)
                if (index < 1) this.renderTopbar(topBar, input, i)
                this.displayValues(input, index, i)
                fieldContainer.append(input)
            });
            domRemove.checkEmpty();
            allTasks.append(fieldContainer)
        };
    }

    classListGen(i, input, index, obj) {
        const { tag, type, value, className } = obj;
        let fieldClass
        if (index > 0 ) fieldClass = `field${index - 1}`
        else fieldClass = `top-bar${i}`;
        input.classList.add('all-tasks-fields', className, fieldClass)
        if (index > 0 && index <= 3) input.classList.add('all-tasks-text-init')
        if (type === 'submit') {
            input.classList.add(`save-btn${i}`, 'save-btn-init' )
        };
        if (getPriorityData[i] && tag === 'button') {
            input.classList.add('made-priority', `made-priority${i}`)
        };
    }


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
            this.references.push(input)
            input.append(topBarBtn)

        });
    }

    displayValues(input, index, i) {
        const { title, date, details } = getData[i];
        let array = [ 'top-bar', title, date, details, 'save' ];
        input.placeholder = array[index];
        input.value = array[index]
    }

    classToggle() {
        const priorityTasksBtn = document.querySelector('.priorities-btn')
        priorityTasksBtn.classList.remove('priority-tasks-active')
        const allTasksBtn = document.querySelector('.all-tasks-btn')
        allTasksBtn.classList.add('all-tasks-active')
    }


    noTasks() {
       // const singularTask = document.querySelector('.singular-task')
        const dashboard = document.querySelector('.dashboard__contents')
        let allTasksEmpty = document.createElement('div')
        allTasksEmpty.classList.add('empty-all-tasks')
        allTasksEmpty.innerHTML = `<h3>:( no tasks here yet</h3>
        <p>get started by clicking New Task</p>`;
        dashboard.append(allTasksEmpty)
    };
};