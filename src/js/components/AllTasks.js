


import { taskData, getData, getPriorityData } from "./taskData";



import { PriorityTask } from "./PriorityTasks";
let priorityTask = new PriorityTask



export class AllTasks {

    tasksList() {
        this.domRemove()
        const contents = document.querySelector('.dashboard__contents')
        const allTasks = document.createElement('div')
        allTasks.classList.add('all-tasks__container')
        contents.append(allTasks)

        const allTasksContainer = document.querySelector('.all-tasks__container')
        const fieldContainer = document.createElement('div')
        fieldContainer.classList.add('singular-task')

 
        let fields = [
            {tag: 'input', type: 'text', className: 'allTasksInput1'},
            {tag: 'input', type: 'date', className: 'allTasksInput2'},
            {tag: 'textarea', className: 'allTasksInput3'},
            {tag: 'input', type: 'submit', value: 'save', className: 'allTasksInput4'},
            {tag: 'button', className: 'makePriority'}
        ]

        let input


        for (let i = 0; i < getData.length; i++) {
            fields.forEach((element, index) => {
                const { tag, type, value, className } = element;
                input = document.createElement(tag)
                input.classList.add('allTasksInputs', className)
                if (type) { input.type = type }
                if (value) { input.value = value }
                if (tag == 'button') { 
                    input.textContent = 'Make Priority'};

                if (getPriorityData[length] && tag === 'button') {
                        input.classList.add('made-priority')
                }

                fieldContainer.append(input)


                const { title, date, details } = getData[i];
                let array = [title, date, details];
                input.placeholder = array[index];
            });

            allTasksContainer.append(fieldContainer)
        };



       priorityTask.clickMakePriority();

    };

    
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



    clickAllTasks() {
        const singularTask = document.querySelector('.singular-task')
        const allTasksBtn = document.querySelector('.all-tasks-btn')
        allTasksBtn.addEventListener('click', (e) => {

            this.tasksList();


        });
    };
    

};