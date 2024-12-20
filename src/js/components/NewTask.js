
//factory syntax
import { taskDataObj, dataRetrieve, priorityTasksData, isClicked, nextInstance } from "./taskData";
let taskData = taskDataObj
let getData = dataRetrieve
let getPriorityData = priorityTasksData

//class syntax
import { AllTasks } from "./AllTasks";
let allTasks = new AllTasks


export class NewTask {
    constructor() {
        this.form = {
        }
    }

    clickNewTask() {
        const Btn = document.querySelector('.new-task-btn')
        Btn.addEventListener('click', (event) => {
            event.preventDefault();
            const modal = document.querySelector('.modal')
            const modalForm = document.createElement('form')
            modal.append(modalForm)
            modalForm.classList.add('modal__form')
            this.domCreate('.modal__form');
            this.dataSubmit();
        });
    };

    domCreate(location) {
        const form = document.querySelector(location)
        let fields = [
            {tag: 'input', type: 'text', placeholder: 'title', className: 'fields'},
            {tag: 'input', type: 'date', placeholder: '', className: 'fields'},
            {tag: 'textarea', placeholder: 'details', className: 'fields'},
            {tag: 'input', type: 'submit', value: 'save', className: 'submit'}
        ]

        fields.forEach(({ tag, type, placeholder, value, className }, index) => {
            let element
            element = document.createElement(tag)
            if (type) element.type = type; 
            if (value) element.value = value 
            element.placeholder = placeholder;
            element.classList.add(className)
            form.append(element)
        });
    };

    nextInstance() {
        let taskDataInstance = taskData(this.form.title, this.form.date, this.form.details)
        return taskDataInstance
    }
    
    dataSubmit() {
        const submit = document.querySelector('.submit')
        submit.addEventListener('click', (event) => {
            event.preventDefault()
            const keys = ['title', 'date', 'details']
            const fields = document.querySelectorAll('.fields')
            fields.forEach((field, index) => {
                this.form[keys[index]] = field.value;
            });

            getData.push(this.nextInstance())
            this.domRemove()
           allTasks.tasksList()
         //  allTasks.clickAllTasks();


           /*
           if (isClicked < 1) {
            isClicked.push('clicked')
        }

        if (isClicked[0] === 'clicked') { 
            this.clicked()
            console.log(isClicked)
        };
        */              
        });
    };
    domRemove() {
        const modalForm = document.querySelector('.modal__form')
        modalForm.remove()
    }
    /*
    clicked() {
        const allTasksBtn = document.querySelector('.all-tasks-btn')
        allTasksBtn.click();
    }

    clickCheck() {
        const allTasksBtn = document.querySelector('.all-tasks-btn')
        allTasksBtn.addEventListener('click', () => {
        })
    }
        */
        
        

};