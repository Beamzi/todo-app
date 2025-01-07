


import { getData, getPriorityData } from "./taskData";

import { PriorityTask } from "./PriorityTasks";
const priorityTask = new PriorityTask

import { DOMRemove } from "./DOMRemove";
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

    tasksList() {
        const contents = document.querySelector('.dashboard__contents')
        const allTasks = document.createElement('div')
        allTasks.classList.add('all-tasks__container')
        allTasks.innerHTML = `<h3>All Tasks</h3>`
        contents.prepend(allTasks)

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
                if (getPriorityData[i] && tag === 'button') {
                    input.classList.add('made-priority')
                }
                fieldContainer.append(input)
                const { title, date, details } = getData[i];
                let array = [title, date, details];
                input.placeholder = array[index];
            });

            domRemove.checkEmpty();
            allTasks.append(fieldContainer)
        };

       priorityTask.clickMakePriority();
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