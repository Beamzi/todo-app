import { taskData, getData, getPriorityData } from "./taskData";

import { makePriorityBtn, allTasksBtn, priorityTasksBtn } from "./EventManager"

export class PriorityTask {
    constructor() {
    }

    clickPriorityTasks() {
        const priorityTasksBtn = document.querySelector('.priorities-btn')
        priorityTasksBtn.addEventListener('click', () => {

           // this.matchPriorities();
            this.domCreatePriorityTasks();
            console.log(makePriorityBtn)

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

    fillPriorityArray() {
        for (let i = 0; i < getData.length; i++) {
            getPriorityData.push(i)
        }
    }



    domRemove() {
        const allTasksContainer = document.querySelector('.all-tasks__container')
        if (allTasksContainer) {
            allTasksContainer.remove();
        }
    }

    domCreatePriorityTasks() {
        this.domRemove();
        const singularPriorityTask = document.createElement('div')
        singularPriorityTask.classList.add('singular-priority-task')
       // const dashboardContents = document.querySelector('.dashboard__contents')
        const priorityTasksContainer = document.querySelector('.priority-tasks__container')

        let fields = [
            {tag: 'input', type: 'text', className: 'priority-field-input-1'},
            {tag: 'input', type: 'date', className: 'priority-field-input-2'},
            {tag: 'textarea', className: 'priority-field-input-3'},
            {tag: 'input', type: 'submit', value: 'save', className: 'submit'},
        ]

        for (let i = 0; i < getPriorityData.length; i++) {
            fields.forEach((field, index) => {
                let input 
                const { tag, type, className, value } = field
                input = document.createElement(tag)
                if (value) { input.value = value}
                input.classList.add(className)
                if (type) { input.type = type }
                singularPriorityTask.append(input)

                const { title, date, details } = getPriorityData[i];
                let array = [title, date, details];
                input.placeholder = array[index];
            });
            priorityTasksContainer.append(singularPriorityTask)
        };

        console.log(getPriorityData, 'getPriorityData')
    };

    matchPriorities() {
        for (let i = 0; i < getPriorityData.length; i++) {
            this.domCreatePriorityTasks();
        }
    }
    
    



};


/*


*/
