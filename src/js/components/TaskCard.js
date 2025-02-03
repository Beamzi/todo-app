import { dynamicSelectors, staticSelectors } from "./utility/selectors";
import { getData, getPriorityData, getProjects, getProjectsData } from "./taskData";
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



}


