
import { dynamicSelectors, staticSelectors } from "./utility/selectors";
import { getData, getPriorityData, getProjects, getProjectsData, getIndex, sharedIndex, getValue, recieveIndex } from "./taskData";
import { DOMRemove } from "./DOMRemove";
const domRemove = new DOMRemove
import { TaskCard } from "./TaskCard";
const taskCard = new TaskCard


export class AllTasks {
    constructor() {
        this.dashboardContents = staticSelectors.dashboard;
        this.references = [];
        this.txtAssigned = [];
        this.isMinimised = [];

        this.projectsIcon = [];
        this.assign = []

    }

    delegate() {
        if (!this.dashboardContents.__listenerAttached) {
            this.dashboardContents.addEventListener('click', (event) => {
                this.clickAllTasks(event)
                this.clickProjects(event)
            });
            this.dashboardContents.__listenerAttached = true; // Mark as attached
        };
    }

    clickAllTasks(event) {
        if (event.target.classList.contains('all-tasks-btn')) {
            this.classToggle();
            domRemove.checkEmpty();
            this.noTasks();
            domRemove.containerRemove();
            this.tasksList();
          //  this.assigned();
        }
    }

    clickProjects(event) {
        getData.forEach((fas, index) => {
            if (event.target.classList.contains(`project-list${index}`)) {

                this.renderProjectList(event.target, index);
                this.expandProjects(event.target, index)
                this.clickProjectInList(index, event.target)
                //this.assignProjectTask(index)
                //event.stopPropagation()
                console.log(sharedIndex)
            };
            if (event.target.classList.contains(`minimise-btn-${index}`)) {
                this.miniIconSwitch(index)

                this.minimiseTask(event, index)
            };
        });
    }


    miniIconSwitch(index) {
        const icon = document.querySelector(`.minimise-icon-${index}`)
        const mini = icon.classList.toggle('fa-window-minimize')
        icon.classList.toggle('fa-window-maximize', !mini)  
    }
    
    minimiseTask(event, index) {
        this.miniContainer(index)
        const fieldsToMinimise = document.querySelectorAll(`.minimise-fields-${index}`)
        fieldsToMinimise.forEach((element, i, arr) => {
            if (element.classList.contains('minimise') && !element.classList.contains('mini-anima-close')) {
                this.isMinimised[index] = false
                element.classList.remove('minimise')
                element.classList.add('mini-anima-open')
            }
            else {
            element.classList.toggle('mini-anima-close')
                if (element.classList.contains('mini-anima-close')) {
                    this.isMinimised[index] = true
                    element.classList.remove('mini-anima-open')
                    }
                else  { 
                    this.isMinimised[index] = false
                    element.classList.add('mini-anima-open')
                }
            }
        });
    }

    miniContainer(index) {
        const container = document.querySelector(`.task${index}`)
        if (container.classList.contains('container-minimise') && !container.classList.contains('container-anima')) {
            this.isMinimised[index] = false
            container.classList.remove('container-minimise')
            container.classList.add('cont-anima-open')

        }

    else {
        container.classList.toggle('container-anima')
            if (container.classList.contains('container-anima')) {
                this.isMinimised[index] = true
                container.classList.remove('cont-anima-open')
            }
            else { 
                this.isMinimised[index] = false
                container.classList.add('cont-anima-open')

            }
        }
    }


    tasksList() {
        const allTasks = taskCard.domInit('all-tasks__container', 'All Tasks');
        this.renderFields(taskCard.fields(), taskCard.topBar(), allTasks)
        this.clickMakePriority();
        taskCard.clickSave();
        this.removeTask();
    };


    assigned() {
        getData.forEach((obj, index) => {
            sharedIndex.forEach((value, i) => {
                if (sharedIndex[i].includes(index)) {
                    const listIcon = document.querySelector('.project-list-icon')
                //    const listIcon = document.querySelector(`.icon-of-list-${index}`)
                    if (listIcon) {
                        console.log(listIcon, 'listIcon', index, 'index')
                        listIcon.classList.remove('fa-angle-right', 'project-list-icon')
                        listIcon.classList.add('fa-check', 'assigned-icon')
                        const projectList = document.querySelector(`.project-list${index}`)
                        projectList.classList.add('assigned-init')
                    }
                }
            });
        });
    }

    assignedTrans(index) {
        const projectList = document.querySelector(`.project-list${index}`)
        projectList.classList.add('assigned-task')
    }


    clickProjectInList(index, projects) {
            //index from getData in clickProjects
        for (let j = 0; j < getProjects.length; j++) {
            const projectOfList = document.querySelector(`.project-${j}-of-list-${index}`)
            if (projectOfList) {
                projectOfList.addEventListener('click', (event) => {
                    getProjects[j].push(getData[index])
                    sharedIndex[j].push(index)
                    this.assignProjectTask(index)

                });
            }
        }
    }

    assignProjectTask(index) {
        sharedIndex.forEach((value, i) => {
            if (sharedIndex[i].includes(index)) {
                const projectList = document.querySelector(`.project-list${index}`)
                projectList.textContent = `Assigned to ${sharedIndex[i][0]}`
                projectList.classList.remove('projects-unassigned')
                this.assign[0] = 'projects-assigned'
                projectList.classList.add(this.assign[0])

                const icon = document.querySelector(`.icon-of-list-${index}`)
                icon.classList.add('fa-check')
                icon.classList.remove('fa-angle-right', 'active-list-icon')

               projectList.disabled = true
            }
        });
    }

    expandProjects(projects, index) {
        projects.classList.toggle('expand-list')
        const listIcon = document.querySelector(`.icon-of-list-${index}`)
        const allIcons = document.querySelector('.project-list-icon')

        if (allIcons) {
            // Toggle between active and closed states
            const isActive = listIcon.classList.toggle('active-list-icon');
            listIcon.classList.toggle('closed-list-icon', !isActive);
        }
    }




    renderProjectList(projectList, index) {
        //index from getData in clickProjects
        this.resetProjectList();
        getProjects.forEach((item, i) => {
            let subLi = document.createElement('li')
            subLi.classList.add('expand-list-items', `items-of-list-${index}`)
            let subBtn = document.createElement('button')
            this.references.push(subLi)
            const  [ string ] = getProjects[i]
            console.log(string)
            subBtn.textContent = string
            subBtn.value = getProjects[i]
            subBtn.classList.add(`project-${i}-of-list-${index}`, 'all-projects-menu', `project-${i}`)
            projectList.append(subLi)
            subLi.append(subBtn)
        });
    }

    resetProjectList() {
        this.references.forEach((item, i) => {
            this.references[i].remove();
        });
        this.references = [];
    }

    removeTask() {
        const allTasksBtn = staticSelectors.allTasksBtn
        getData.forEach((obj, index) => {
            const remove = document.querySelector(`.removeBtn${index}`)
            if (remove) {
                remove.addEventListener('click', () => {
                this.unassignTaskTrace(index)
                this.adjustIndices(index)
                getData.splice(index, 1)
                getPriorityData.splice(index, 1);
                allTasksBtn.click();
                });
            }
        });
    }
    //controlled scope
    unassignTaskTrace(index) {
        for (let arr = 0; arr < sharedIndex.length; arr++) {
            if (sharedIndex[arr].includes(index)) {
                for (let j = 0; j < sharedIndex[arr].length; j++) {
                    if (index === sharedIndex[arr][j]) {
                        sharedIndex[arr].splice(j, 1)
                        getProjects[arr].splice(j, 1)
                    }
                }
            }
        }
    }
    //controlled scope
    adjustIndices(index) {
        for (let arr = 0; arr < sharedIndex.length; arr++) {
            for (let i = 0; i < sharedIndex[arr].length; i++) {
                if (i > 0) {
                    if (index < sharedIndex[arr][i]) {
                        sharedIndex[arr][i] -= 1
                    }
                }
            }
        }
    }


    clickMakePriority() {
        const makePriority = document.querySelectorAll('.makePriority')
        makePriority.forEach((btn, index) => {
            btn.setAttribute('id', `btn${index}`)
            btn.addEventListener ('click', (event) => {
            //priorityTrigger.splice(0, 1, index);
                event.preventDefault();
                btn.classList.add('made-priority-init')
                getPriorityData[index] = getData[index]
                console.log(getPriorityData, 'getPriorityData')
            });
        });
    }



    renderFields(fields, topBar, allTasks) {
        for (let i = 0; i < getData.length; i++) {
            if (getData[i] !== undefined) {
            
            const fieldContainer = document.createElement('div')



            let contMini = 'z';
            if (this.isMinimised[i] === true) { 
                contMini = 'container-minimise'
            }

            fieldContainer.classList.add('singular-task', `task${i}`, `${contMini}`)

            fields.forEach((obj, index) => {
                const { tag, type, value, className } = obj;
                let input = document.createElement(tag)
                if (tag === 'button') input.textContent = 'Make Priority';
                if (type) input.type = type


                let minimise = 'z';
                let miniIcon = 'fa-window-maximize'

                if (this.isMinimised[i] === true) { 
                    minimise = 'minimise'
                    miniIcon = 'fa-window-minimize'
                }



                
                
                taskCard.classListGen(i, input, index, obj, minimise)
                console.log(minimise)
                console.log(this.isMinimised)



                this.projectsIcon[0] = 'fa-angle-right'
                this.assign[0] = `projects-unassigned`
                this.txtAssigned[0] = 'projects'

                sharedIndex.forEach((arr, j) => {
                    if (sharedIndex[j].includes(i)) {
                        this.txtAssigned[0] = `Assigned to ${sharedIndex[j][0]}`
                        this.projectsIcon[0] = 'fa-check'
                        this.assign[0] = 'projects-assigned-state-change';
                    }
                });




                if (index < 1) taskCard.renderTopbar(topBar, input, i, this.txtAssigned[0], 'alltasks', miniIcon, this.projectsIcon[0], this.assign[0])

                taskCard.displayValues(input, index, getData[i])
                fieldContainer.append(input)
            });
            domRemove.checkEmpty();
            allTasks.append(fieldContainer)
            }
        };
    }

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
    };
}
