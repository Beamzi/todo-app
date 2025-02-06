import { dynamicSelectors, staticSelectors } from "./utility/selectors";
import { getData, getPriorityData, getProjects, getProjectsData, getIndex, projectArrays, activeIndices, sharedIndex } from "./taskData";
import { DOMRemove } from "./DOMRemove";
const domRemove = new DOMRemove

export class TaskCard {
    constructor() {
    }
    fields() {
        return [
            { tag: 'div', className: 'task-top-bar' },
            { tag: 'input', type: 'text', className: 'all-tasks-text' },
            { tag: 'input', type: 'date', className: 'all-tasks-text' },
            { tag: 'textarea', className: 'all-tasks-text' },
            { tag: 'input', type: 'submit', value: 'save', className: 'save-btn' },
            { tag: 'button', className: 'makePriority' },
        ];
    }

    topBar() {
        return [
            { tag: 'ul', className: 'all-tasks-projects', textContent: 'projects', type: 'button',  value: 'projects' },
            { tag: 'button', className: 'all-tasks-remove-btn', textContent: 'remove', type: 'button', value: 'remove' },
        ]
    }

    classListGen(i, input, index, obj) {
        const { tag, type, value, className } = obj;
        let fieldClass
        if (index > 0 ) fieldClass = `field${index - 1}`
        else fieldClass = `top-bar${i}`;
        input.classList.add('all-tasks-fields', className, fieldClass)
        if (index > 0 && index <= 3) input.classList.add('all-tasks-text-init')
        if (type === 'submit') {
            input.classList.add(`save-btn${i}`, 'save-btn-init' )
        };
        if (getPriorityData[i] && tag === 'button') {
            input.classList.add('made-priority', `made-priority${i}`)
        };
    }

    renderTopbar(topBar, input, i) {
        topBar.forEach((obj, index) => {
            const { tag, className, value, textContent, type } = obj;
            let topBarBtn = document.createElement(tag)
            if (value) topBarBtn.value = value
            if (value === 'remove') {
                topBarBtn.classList.add(className, `removeBtn${i}`) 
            }
            if (value === 'projects') topBarBtn.classList.add(className, `project-list${i}`)
            topBarBtn.textContent = textContent;
            topBarBtn.type = type;
            input.append(topBarBtn)
        });
    }

    displayValues(input, index, getArray) {
        const { title, date, details } = getArray;
        let array = [ 'topBar', title, date, details, 'save' ];
        input.placeholder = array[index];
        input.value = array[index]
    }

    domInit(reference, viewTitle) {
        const contents = staticSelectors.dashboardContents;
        const container = document.createElement('div')
        container.classList.add(reference)
        container.innerHTML = `
        <h3 class="view-title">${viewTitle}</h3>
        <hr>`
        contents.prepend(container)
        return container
    }

    clickSave(arrIndex) {
        const save = document.querySelectorAll('.save-btn')
        save.forEach((btn, index) => {
            const fields = document.querySelectorAll(`.task${index} > *`)
            fields.forEach((field, index) => {
                field.addEventListener('click', () => {
                    if (index > 0 && index <= 3) {
                        btn.classList.remove('save-btn-init')
                        field.classList.remove('all-tasks-text-init')
                    };
                });
            });
            btn.addEventListener('click', (event) => {
                btn.value = 'saved'
                btn.classList.add('save-btn-click', 'save-animation')
                let obj = {}
                event.preventDefault()
                const fields = document.querySelectorAll(`.task${index} > *`)
                fields.forEach((field, index) => {
                    let keys = ['top-bar', 'title', 'date', 'details']
                    if (index > 0 && index <= 3) {
                        obj[keys[index]] = field.value
                        field.classList.add('save-toggle-text')
                        field.addEventListener('click', () => {
                            field.classList.remove('save-toggle-text')
                            btn.classList.remove('save-btn-click')
                        });
                    };
                });


                getProjects[arrIndex][sharedIndex[0]] = obj
                getData[sharedIndex[0] - 1] = getProjects[arrIndex][sharedIndex[0]]
     


                            
        
                const madePriority = document.querySelector(`.made-priority${index}`)
                if (madePriority) {
                    madePriority.click();
                };
            });
        });
    };



}


