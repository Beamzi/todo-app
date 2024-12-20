import { priorityTasksData } from "./taskData"

let getPriorityData = priorityTasksData

export class PriorityTask {
    constructor() {
    }

    clickPriorityTasks() {

        const priorityTasksBtn = document.querySelector('.priorities-btn')
        priorityTasksBtn.addEventListener('click', () => {
            console.log(getPriorityData, 'getprioritydata')

          // const allTasksContainer = document.querySelector('.all-tasks__container')
        //   allTasksContainer.remove();
         //  this.domCreatePriorityTasks();

       });
    };

    domCreatePriorityTasks() {

        const singularPriorityTask = document.createElement('div')
        singularPriorityTask.classList.add('singular-priority-task')
       // const dashboardContents = document.querySelector('.dashboard__contents')
        const priorityTasksContainer = document.querySelector('.priority-tasks__container')
        priorityTasksContainer.append(singularPriorityTask)


        let fields = [
            {tag: 'input', type: 'text', className: 'priority-field-input-1'},
            {tag: 'input', type: 'date', className: 'priority-field-input-2'},
            {tag: 'textarea', className: 'priority-field-input-3'},
            {tag: 'input', type: 'submit', value: 'save', className: 'submit'},
        ]

        fields.forEach((field, index) => {
            let input 
            const { tag, type, className, value } = field
            input = document.createElement(tag)
            if (value) { input.value = value}
            input.classList.add(className)
            if (type) { input.type = type }
            singularPriorityTask.append(input)

        });




    };
    
    



};