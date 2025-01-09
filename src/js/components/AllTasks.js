


import { getData, getPriorityData, taskData } from "./taskData";

import { PriorityTask } from "./PriorityTasks";
const priorityTask = new PriorityTask

import { DOMRemove } from "./DOMRemove";
const domRemove = new DOMRemove

import { madePriorityIndex } from "./EventManager";

export class AllTasks {
    constructor() {
        this.form = {}
    }


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
                btn.style['background-color'] = 'red';
                getPriorityData[index] = getData[index]
                console.log(getPriorityData, 'getPriorityData')
            });
        });
    };

    clickSave() {
        const save = document.querySelectorAll('.save-btn')
        save.forEach((btn, index) => {
            btn.addEventListener('click', (event) => {
            //    btn.style['background-color'] = 'red';
                btn.classList.toggle('save-toggle-btn')
                setTimeout(() => {
                    btn.classList.toggle('save-toggle-btn')
                }, 300)
                let obj = {}

                event.preventDefault()
                const fields = document.querySelectorAll(`.task${index} > *`)
                fields.forEach((field, index) => {
                    let keys = ['title', 'date', 'details']
                    if (index <= 2) {
                        obj[keys[index]] = field.value
                        field.classList.add('save-toggle')
                        field.addEventListener('click', () => {
                            field.classList.remove('save-toggle')
                        });
                    };
                });
                getData[index] = obj
                console.log(getData)
                
                const madePriority = document.querySelector(`.made-priority${index}`)
                if (madePriority) {
                    madePriority.click();
                }

            });
        });
    };




    tasksList() {
        const contents = document.querySelector('.dashboard__contents')
        const allTasks = document.createElement('div')
        allTasks.classList.add('all-tasks__container')
        allTasks.innerHTML = `<h3>All Tasks</h3>`
        contents.prepend(allTasks)

      //  const fieldContainer = document.createElement('div')
       // fieldContainer.classList.add('singular-task')
 
        let fields = [
            {tag: 'input', type: 'text', className: 'all-tasks-text'},
            {tag: 'input', type: 'date', className: 'all-tasks-text'},
            {tag: 'textarea', className: 'all-tasks-text'},
            {tag: 'input', type: 'submit', value: 'save', className: 'save-btn'},
            {tag: 'button', className: 'makePriority'}
        ]

        let input
        for (let i = 0; i < getData.length; i++) {
            const fieldContainer = document.createElement('div')
            fieldContainer.classList.add('singular-task', `task${i}`)
    
            fields.forEach((element, index) => {
                const { tag, type, value, className } = element;
                input = document.createElement(tag)
                input.classList.add('all-tasks-fields', className)
                if (type) { input.type = type }
                if (tag == 'button') { 
                    input.textContent = 'Make Priority'};
                if (getPriorityData[i] && tag === 'button') {
                    input.classList.add('made-priority', `made-priority${i}`)
                }
               // if (getData[i] && type === 'submit') input.classList.add('saved')

                fieldContainer.append(input)
                const { title, date, details } = getData[i];
                let array = [title, date, details, 'save'];
                input.placeholder = array[index];
                input.value = array[index]
            });

            domRemove.checkEmpty();
            allTasks.append(fieldContainer)
        };

       this.clickMakePriority();
       this.clickSave();

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
    }
    

};