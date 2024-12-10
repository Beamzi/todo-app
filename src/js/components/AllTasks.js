
import { taskDataObj, dataRetrieve } from "./taskData";
import { NewTask } from "./NewTask";

let task = new NewTask;




let taskData = taskDataObj;

let getData = dataRetrieve

export class AllTasks {
    domRemove() {
        const allTasksBtn = document.querySelector('.all-tasks-btn')
        allTasksBtn.addEventListener('click', (e) => {
            const dashboardPageLoad = document.querySelector('.dashboard__page-load')
            if (dashboardPageLoad) {
                dashboardPageLoad.remove();
                this.tasksList()
            }
            else {
               this.tasksList()
            }
            console.log(getData)
        });
    }


    tasksList() {
        const contents = document.querySelector('.dashboard__contents')
 
        let fields = [
            {tag: 'input', type: 'text', className: 'allTasksInput1'},
            {tag: 'input', type: 'date', className: 'allTasksInput2'},
            {tag: 'textarea', className: 'allTasksInput3'},
            {tag: 'input', type: 'submit', value: 'save', className: 'allTasksInput4'}
        ]

        let input
        fields.forEach((element, index) => {
            const { tag, type, value, className } = element;
            input = document.createElement(tag)
            input.classList.add('allTasksInputs', className)
            if (type) { input.type = type }
            if (value) { input.value = value }
            contents.append(input)

            for (let i = 0; i < getData.length; i++) {
                const { title, date, details } = getData[i];
                let array = [title, date, details];
                input.placeholder = array[index];
            };

        });
    };
}

