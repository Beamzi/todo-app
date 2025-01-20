
import { dynamicSelectors, staticSelectors } from "./utility/selectors";
import { getData, getPriorityData, getProjects, getProjectsData } from "./taskData";
import { DOMRemove } from "./DOMRemove";
import { saveOrSaved } from "./EventManager"

const domRemove = new DOMRemove

export class AllTasks {
    clickAllTasks() {
        const allTasksBtn = document.querySelector('.all-tasks-btn')
        allTasksBtn.addEventListener('click', (e) => {
            this.classToggle();
            domRemove.checkEmpty();
            this.noTasks();
            domRemove.containerRemove();
            this.tasksList();
        });
    };
    
    clickMakePriority() {
        const makePriority = document.querySelectorAll('.makePriority')
        makePriority.forEach((btn, index) => {
            btn.setAttribute('id', `btn${index}`)
            btn.addEventListener ('click', (event) => {
              //  priorityTrigger.splice(0, 1, index)
                event.preventDefault();
                btn.classList.add('made-priority-init')
                getPriorityData[index] = getData[index]
                console.log(getPriorityData, 'getPriorityData')
            });
        });
    };

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
                const madePriority = document.querySelector(`.made-priority${index}`)
                if (madePriority) {
                    madePriority.click();
                };
                
            });
        });
    };

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

    tasksList(topBarBtn) {
        const contents = staticSelectors.dashboardContents;
        const allTasks = document.createElement('div')
        allTasks.classList.add('all-tasks__container')
        allTasks.innerHTML = `
        <h3 class="view-title">All Tasks</h3>
        <hr>`

        contents.prepend(allTasks)
        let fields = [
            {tag: 'div', className: 'task-top-bar'},
            {tag: 'input', type: 'text', className: 'all-tasks-text'},
            {tag: 'input', type: 'date', className: 'all-tasks-text'},
            {tag: 'textarea', className: 'all-tasks-text'},
            {tag: 'input', type: 'submit', value: 'save', className: 'save-btn'},
            {tag: 'button', className: 'makePriority'},
        ]

        let topBar = [

            { tag: 'button', className: 'all-tasks-projects', textContent: 'projects', type: 'button',  value: 'Projects', },
            { tag: 'button', className: 'all-tasks-remove-btn', textContent: 'remove', type: 'button', value: 'remove' },
        ]

        let input

        for (let i = 0; i < getData.length; i++) {
            const fieldContainer = document.createElement('div')
            fieldContainer.classList.add('singular-task', `task${i}`)
            fields.forEach((obj, index) => {
                let fieldClass
                const { tag, type, value, className } = obj;
                input = document.createElement(tag)

                if (index > 0 ) fieldClass = `field${index - 1}`
                else fieldClass = `top-bar${i}`;
                input.classList.add('all-tasks-fields', className, fieldClass)
                if (type) input.type = type
                if (tag == 'button') input.textContent = 'Make Priority';
                if (getPriorityData[i] && tag === 'button') {
                    input.classList.add('made-priority', `made-priority${i}`)
                }
                if (index > 0 && index <= 3) input.classList.add('all-tasks-text-init')
                if (type === 'submit') {
                    input.classList.add(`save-btn${i}`, 'save-btn-init' )
                }

                /////separate function /////
                if (index < 1) {
                    topBar.forEach((obj, index) => {
                        const { tag, className, value, textContent, type } = obj;

                        topBarBtn = document.createElement(tag)
                        if (value) topBarBtn.value = value
                        if (value === 'remove') {
                            topBarBtn.classList.add(className, `removeBtn${i}`) 
                        }
                        topBarBtn.textContent = textContent
                        topBarBtn.type = type;

                        
                      //  topBarBtn.textContent = 'remove'

                        input.append(topBarBtn)

                    });

                }

                fieldContainer.append(input)


                saveOrSaved[0] = 'saved'
                //destructuring nested loop
                const { title, date, details } = getData[i];
                let array = [ 'top-bar', title, date, details, saveOrSaved ];
                input.placeholder = array[index];
                input.value = array[index]
            });






            domRemove.checkEmpty();
            allTasks.append(fieldContainer)
        };

       this.clickMakePriority();
       this.clickSave();
       this.removeTask();
    };



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