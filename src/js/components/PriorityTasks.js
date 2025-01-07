import { taskData, getData, getPriorityData } from "./taskData";

import { validPriorities, priorityMatch } from "./EventManager"

export class PriorityTask {
    constructor() {}

    clickPriorityTasks() {
        const priorityTasksBtn = document.querySelector('.priorities-btn')
        priorityTasksBtn.addEventListener('click', () => {
            this.checkEmpty();
            this.noPriorities();
            this.domCreatePriorityTasks();
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

    checkEmpty() {
        const emptyWindow = document.querySelector('.emptyPriorities')
        if (emptyWindow) {
            emptyWindow.remove()
        }
    }

    

    removePriority() {
        const removeBtn = document.querySelectorAll('.remove-priority')
        removeBtn.forEach((btn, index) => {
            this.checkEmpty();
            if (removeBtn) {
                btn.addEventListener('click', (e) => {
                   let  validIndices = []
                    for (let i = 0; i < getPriorityData.length; i++) {
                        if (getPriorityData[i] !== undefined) {
                            validIndices.push(i)
                            console.log(validIndices)
                          //  validIndices[i] = validPriorities[i]
                           //console.log(validPriorities)
                        };
                    };

                    getPriorityData.splice(validIndices[index], 1, undefined)
                    console.log(getPriorityData)
                    console.log(validIndices)
                    this.renderPriority();

                    if (validIndices.length === 1) {
                        const remainingTask = document.querySelector('.singular-priority-task')
                        if (remainingTask) {
                            remainingTask.remove()
                        }
                    }
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

    noPriorities() {

        const dashBoard = document.querySelector('.dashboard__contents')
        let emptyWindow = document.createElement('div')
        emptyWindow.classList.add('emptyPriorities')
        emptyWindow.innerHTML = `<h3>You have not prioritized any tasks </h3>
        <p>click the <b>'make Priority'</b> button in <b>All Tasks</b> to prioritize a task</p>`;
        dashBoard.append(emptyWindow)
    }


    domCreatePriorityTasks() {
        this.domRemove();
        const contents = document.querySelector('.dashboard__contents')

        const priorityTasks = document.createElement('div')
        priorityTasks.classList.add('priority-tasks__container')
        priorityTasks.innerHTML = `<h3>Priority Tasks</h3>`
        contents.prepend(priorityTasks)
        

        const singularPriorityTask = document.createElement('div')
        singularPriorityTask.classList.add('singular-priority-task')


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
                    if (value === 'remove') {
                        input.classList.add(`remove-index${i}`)
                     //   priorityMatch[i] = i
                    }
                    const { title, date, details } = getPriorityData[i];
                    let array = [title, date, details];
                    input.placeholder = array[index];
                };
            });

            priorityTasks.append(singularPriorityTask)

        };
        console.log(getPriorityData, 'getPriorityData')
    };

};


