import { dynamicSelectors, staticSelectors } from "./utility/selectors";
const { projectContainer } = dynamicSelectors();
import { getData, getPriorityData, getProjects, getProjectsData, getIndex, projectArrays, activeIndices, sharedIndex, getValue, recieveIndex, taskData } from "./taskData";
import { DOMRemove } from "./DOMRemove";
import { allTasksBtn } from "./EventManager";
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
            { tag: 'ul', className: 'all-tasks-projects', type: 'button',  value: 'projects' },
            {tag: 'button', type: 'button', value: 'minimise', innerHTML: '<i class="fa-solid fa-window-maximize minimise-icon"></i>', className: 'all-tasks-minimise-btn'},
            { tag: 'button', className: 'all-tasks-remove-btn', innerHTML: '<i class="fa-solid fa-xmark remove-icon"></i>', type: 'button', value: 'remove' },
        ]
    }

    
    classListGen(i, input, index, obj, minimised) {
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
        if (tag !== 'div' && type !== 'text' ) input.classList.add(`minimise-fields-${i}`, `${minimised}`)
    }

   // projectsIcon, assign 
    // fa-angle-right

    renderTopbar(topBar, input, i, textEvent, section, miniIcon, projectsIcon, assign) {
        let projectWrapper = document.createElement('div')
        projectWrapper.classList.add('project-wrapper')
        projectWrapper.innerHTML = `<i class="fa-solid ${projectsIcon} project-list-icon icon-of-list-${i}"></i>`
        topBar.forEach((obj, index) => {
            const { tag, className, value, type, innerHTML } = obj;
            let topBarBtn = document.createElement(tag)
            topBarBtn.type = type;

            topBarBtn.classList.add(className)
            if (innerHTML) topBarBtn.innerHTML = innerHTML
            if (value) topBarBtn.value = value
            if (value === 'projects') topBarBtn.classList.add(`project-list${i}`, `${assign}`)
            if (tag === 'ul') topBarBtn.innerHTML = textEvent
            if (value === 'remove') {
                topBarBtn.classList.add(`removeBtn${i}`, `${section}-remove-btn-${i}`)
                topBarBtn.innerHTML = `<i class="fa-solid fa-xmark remove-icon-${i} all-remove-icons"></i>`
            }
            if (value === 'minimise') {
                topBarBtn.classList.add(`minimise-btn-${i}`, `${section}-minimise-btn-${i}`)
                topBarBtn.innerHTML = `<i class="fa-solid ${miniIcon} minimise-icon-${i} all-minimise-icons"></i>`
            }
            projectWrapper.append(topBarBtn)
            if (tag === 'ul') {
                input.prepend(projectWrapper)
            }
            else input.append(topBarBtn)
           // input.append(topBarBtn)
        });
    }

    displayValues(input, index, getArray) {
        const { title, date, details } = getArray;
        let array = [ 'topBar', title, date, details, 'save'];
        input.placeholder = array[index];
        input.value = array[index]
    }

    domInit(reference, viewTitle) {
        const contents = staticSelectors.dashboardContents;
        const container = document.createElement('div')
        container.classList.add(reference)
        container.innerHTML = `
        <div class="title-container">
        <h3 class="view-title">${viewTitle}</h3><hr></div`
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
                let scrape = {}
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

                const allTasksContainer = document.querySelector('.all-tasks__container')

                if (allTasksContainer) {
                    getData[index] = obj
                    //controlled scope
                    for (let arr = 0; arr < sharedIndex.length; arr++) {
                        if (sharedIndex[arr].includes(index)) {
                            for (let j = 0; j < sharedIndex[arr].length; j++) {
                                if (index === sharedIndex[arr][j]) {
                                    getProjects[arr][j] = getData[index]
                                }
                            }
                        }
                    }
                }
                else {
                    getProjects[arrIndex][index + 1] = obj
                    getData[sharedIndex[arrIndex][index + 1]] = getProjects[arrIndex][index + 1]
                };

                const madePriority = document.querySelector(`.made-priority${index}`)
                if (madePriority) {
                    madePriority.click();
                };
            });
        });
    };





}