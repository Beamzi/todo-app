import { taskData, getData, getPriorityData } from "./taskData";

import { makePriorityBtn, allTasksBtn, priorityTasksBtn } from "./EventManager"

export class PriorityTask {
    constructor() {}

    clickPriorityTasks() {
        const priorityTasksBtn = document.querySelector('.priorities-btn')
        priorityTasksBtn.addEventListener('click', () => {
            this.domCreatePriorityTasks();
            console.log(makePriorityBtn)
            this.removePriority();
       });
    };

    clickMakePriority() {
        const makePriority = document.querySelectorAll('.makePriority')
        makePriority.forEach((btn, index) => {
            btn.setAttribute('id', `btn${index}`)
            btn.addEventListener ('click', (event) => {
                event.preventDefault();
                btn.style['background-color'] = 'red';
                getPriorityData[index] = getData[index]
                console.log(getPriorityData, 'getPriorityData')
            });
        });
    };

    removePriority() {
        const removeBtn = document.querySelectorAll('.remove-priority')
        removeBtn.forEach((btn, index) => {
            if (removeBtn) {
                btn.addEventListener('click', (e) => {
                    let amount = 0
                    for (let i = 0; i < getPriorityData.length; i++) {
                        if (getPriorityData[i] === undefined) amount++
                    }
                    if (getPriorityData[index] === undefined) {
                        getPriorityData.splice(index, amount)
                    }
                    if (getPriorityData[index]) getPriorityData.splice(index, 1) 

                console.log(getPriorityData)
                this.renderPriority();
                });
            };
        });
    };

    renderPriority() {
        const priorityTasksBtn = document.querySelector('.priorities-btn')
        priorityTasksBtn.click()
    }

    domRemove() {
        const allTasksContainer = document.querySelector('.all-tasks__container')
        if (allTasksContainer) {
            allTasksContainer.remove();
        }
        const priorityTasksContainer = document.querySelector('.priority-tasks__container')
        if (priorityTasksContainer) {
            priorityTasksContainer.remove();
        }
    }

    domCreatePriorityTasks() {
        this.domRemove();
        const contents = document.querySelector('.dashboard__contents')
        const  priorityTasks = document.createElement('div')
        priorityTasks.classList.add('priority-tasks__container')
        contents.append(priorityTasks)


        const singularPriorityTask = document.createElement('div')
        singularPriorityTask.classList.add('singular-priority-task')
        const priorityTasksContainer = document.querySelector('.priority-tasks__container')

        let fields = [
            {tag: 'input', type: 'text', className: 'priority-field-input-1'},
            {tag: 'input', type: 'date', className: 'priority-field-input-2'},
            {tag: 'textarea', className: 'priority-field-input-3'},
            {tag: 'input', type: 'submit', value: 'save', className: 'submit'},
            {tag: 'input', type: 'button', value: 'remove', className: 'remove-priority'}
        ]

        for (let i = 0; i < getPriorityData.length; i++) {
            fields.forEach((field, index) => {
              //let input 
                if (getPriorityData[i]) {
                    const { tag, type, className, value } = field
                   let  input = document.createElement(tag)
                    if (value) { input.value = value}
                    input.classList.add(className)
                    if (type) { input.type = type }
                    singularPriorityTask.append(input)
            
                    const { title, date, details } = getPriorityData[i];
                    let array = [title, date, details];
                    input.placeholder = array[index];

                };
            });
            priorityTasksContainer.append(singularPriorityTask)
        };
        console.log(getPriorityData, 'getPriorityData')
    };

};


