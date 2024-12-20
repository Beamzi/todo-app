

import { dataRetrieve, isClicked, priorityTasksData } from "./taskData";

let getData = dataRetrieve

let getPriorityData = priorityTasksData




export class AllTasks {

    tasksList() {
        const contents = document.querySelector('.dashboard__contents')
       // const contentsContainer = document.querySelector('.dashboard__contents__container')
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
                input.addEventListener('click', () => {
                    input.style['background-color'] = 'red';
                    fieldContainer.classList.add('priority')
                });
            };

            fieldContainer.append(input)

            for (let i = 0; i < getData.length; i++) {
                const { title, date, details } = getData[i];
                let array = [title, date, details];
                input.placeholder = array[index];
            };
        });


        this.clickAllTasks(allTasksContainer, fieldContainer);


        


    };

    clickAllTasks(allTasksContainer, fieldContainer) {
        const allTasksBtn = document.querySelector('.all-tasks-btn')
        allTasksBtn.addEventListener('click', (event) => {
            allTasksBtn.style['background-color'] = 'red';
            if (isClicked < 1) {
                isClicked.push('clicked')
                console.log(isClicked)
            }
            allTasksContainer.append(fieldContainer)
            this.clickMakePriority();

        });
    }
    

    clickMakePriority() {
        const makePriority = document.querySelector('.makePriority')
        makePriority.addEventListener('click', () => {
            getPriorityData.push(getData)
            console.log(getPriorityData, 'getPriorityData')
        });
    };




};