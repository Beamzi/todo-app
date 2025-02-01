import { getData, getPriorityData } from "./taskData";


import { DOMRemove } from "./DOMRemove";
const domRemove = new DOMRemove



export class PriorityTask {
    constructor() {}
    clickPriorityTasks() {
        const priorityTasksBtn = document.querySelector('.priorities-btn')
        priorityTasksBtn.addEventListener('click', () => {
            this.classToggle();
            domRemove.checkEmpty();
            this.noPriorities();
            domRemove.containerRemove()
            this.domCreatePriorityTasks();
            this.removePriority();
        });
    };

    removePriority() {
        const removeBtn = document.querySelectorAll('.remove-priority')
        removeBtn.forEach((btn, index) => {
            domRemove.checkEmpty();
            if (removeBtn) {
                btn.addEventListener('click', (e) => {
                    let  validIndices = []
                    for (let i = 0; i < getPriorityData.length; i++) {
                        if (getPriorityData[i] !== undefined) {
                            validIndices.push(i)
                            console.log(validIndices)
                        };
                    };
                    getPriorityData.splice(validIndices[index], 1, undefined)
                    // by using `undefined` here to replace tasks, this maintains the implied length of the array
                    console.log(validIndices)
                    this.renderPriority();
                    if (validIndices.length === 1) {
                        const remainingTask = document.querySelector('.singular-priority-task')
                        if (remainingTask) {
                            remainingTask.remove()
                        };
                    };
                });
            };
        });
    };


    renderPriority() {
        const priorityTasksBtn = document.querySelector('.priorities-btn')
        priorityTasksBtn.click()
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
        const contents = document.querySelector('.dashboard__contents')
        const priorityTasks = document.createElement('div')
        priorityTasks.classList.add('priority-tasks__container')
        priorityTasks.innerHTML = `
        <h3 class="view-title">Priority Tasks</h3>
        <hr>
        `
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

    classToggle() {
        const priorityTasksBtn = document.querySelector('.priorities-btn')
        priorityTasksBtn.classList.add('priority-tasks-active')
        const allTasksBtn = document.querySelector('.all-tasks-btn')
        allTasksBtn.classList.remove('all-tasks-active')
    }
};