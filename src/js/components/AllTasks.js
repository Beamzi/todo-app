


import { taskData, getData, getPriorityData } from "./taskData";



import { PriorityTask } from "./PriorityTasks";
let priorityTask = new PriorityTask



export class AllTasks {


    tasksList() {
        const contents = document.querySelector('.dashboard__contents')
        const allTasksContainer = document.querySelector('.all-tasks__container')
        contents.append(allTasksContainer)
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


        fields.forEach((element, index) => {
            const { tag, type, value, className } = element;
            input = document.createElement(tag)
            input.classList.add('allTasksInputs', className)
            if (type) { input.type = type }
            if (value) { input.value = value }
            if (tag == 'button') { 
                input.textContent = 'Make Priority'
              //  input.setAttribute('id', `makePriority${[idCount]}`)
            };

            for (let i = 0; i < getData.length; i++) {
                const { title, date, details } = getData[i];
                let array = [title, date, details];
                input.placeholder = array[index];
            };

           fieldContainer.append(input)
        });
        

       allTasksContainer.append(fieldContainer)
       priorityTask.clickMakePriority();
    };



    clickAllTasks(fieldContainer) {
        const allTasksContainer = document.querySelector('.all-tasks__container')
        const allTasksBtn = document.querySelector('.all-tasks-btn')
        allTasksBtn.addEventListener('click', (e) => {
            if (isClicked[0] === 'clicked') {
                allTasksBtn.style['background-color'] = 'red'
                allTasksContainer.append(fieldContainer)
                this.clickMakePriority()
            };
        });
    };
    

};