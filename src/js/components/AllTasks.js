

//factory syntax
import { dataRetrieve } from "./taskData";

let getData = dataRetrieve




export class AllTasks {
    tasksList() {
        const contents = document.querySelector('.dashboard__contents')
        const fieldContainer = document.createElement('div')
        fieldContainer.classList.add('singular-task')
        contents.append(fieldContainer)

 
        let fields = [
            {tag: 'input', type: 'text', className: 'allTasksInput1'},
            {tag: 'input', type: 'date', className: 'allTasksInput2'},
            {tag: 'textarea', className: 'allTasksInput3'},
            {tag: 'input', type: 'submit', value: 'save', className: 'allTasksInput4'},
            {tag: 'button', className: 'priorityTask'}
        ]

        let input
        fields.forEach((element, index) => {
            const { tag, type, value, className } = element;
            input = document.createElement(tag)
            input.classList.add('allTasksInputs', className)
            if (type) { input.type = type }
            if (value) { input.value = value }
            if (tag == 'button') { input.textContent = 'Make Priority'}
            fieldContainer.append(input)

            for (let i = 0; i < getData.length; i++) {
                const { title, date, details } = getData[i];
                let array = [title, date, details];
                input.placeholder = array[index];
            };



        });
    };





}