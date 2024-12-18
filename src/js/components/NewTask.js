
//factory syntax
import { taskDataObj, dataRetrieve, priorityTasksData } from "./taskData";
let taskData = taskDataObj
let getData = dataRetrieve
let getPrioties = priorityTasksData




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
        Btn.addEventListener('click', () => {
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
            {tag: 'input', type: 'text', placeholder: 'placeholder', className: 'fields'},
            {tag: 'input', type: 'date', placeholder: 'placeholder', className: 'fields'},
            {tag: 'textarea', placeholder: 'placeholder', className: 'fields'},
            {tag: 'input', type: 'submit', value: 'save', className: 'field4'}
        ]



        fields.forEach(({ tag, type, placeholder, value, className }, index) => {
            let element
            element = document.createElement(tag)
            if (type) element.type = type; 
            if (value) element.value = value 
            element.placeholder  = placeholder;
            element.classList.add(className)
            form.append(element)
        });
    };

    dataSubmit() {
        const field4 = document.querySelector('.field4')
        field4.addEventListener('click', (event) => {
            event.preventDefault()
            const keys = ['title', 'date', 'details']
            const fields = document.querySelectorAll('.fields')
            fields.forEach((element, index) => {
                this.form[keys[index]] = element.value;
            });
            
            let taskDataInstance = taskData(this.form.title, this.form.date, this.form.details)
            getData.push(taskDataInstance)

            const modalForm = document.querySelector('.modal__form')

            modalForm.remove()
            allTasks.tasksList()
            this.clickPriorityTask(taskDataInstance)
        
           // console.log(getData)

        });
    };

    clickPriorityTask(taskDataInstance) {
        const makePriority = document.querySelectorAll('.priorityTask')
        makePriority.forEach((element) => {
            element.addEventListener('click', (e) => {
                getPrioties.push(taskDataInstance)
                console.log(getPrioties)
            })

        })

    }


};