
import { dynamicSelectors, staticSelectors } from "./utility/selectors";
import { getData, getPriorityData, getProjects, getProjectsData, getIndex, activeIndices, sharedIndex } from "./taskData";
import { DOMRemove } from "./DOMRemove";
const domRemove = new DOMRemove
import { TaskCard } from "./TaskCard";
const taskCard = new TaskCard


export class AllTasks {
    constructor() {
        this.references = [];
        this.dashboardContents = staticSelectors.dashboardContents;
        // Ensure the listener is only attached once
        if (!this.dashboardContents.__listenerAttached) {
            this.dashboardContents.addEventListener('click', (event) => {
                this.clickProjects(event)
            });
            this.dashboardContents.__listenerAttached = true; // Mark as attached
        };
    }


    clickProjects(event) {
        getData.forEach((fas, index) => {
            if (event.target.classList.contains(`project-list${index}`)) {
                this.renderProjectList(event.target, index);
                this.expandProjects(event.target)
                this.clickProjectInList(index)
                
              //event.stopPropagation()
            };
        });


    }

    clickProjectIfSaved() {
    }


    syncArrays(j) {
        if (getProjects[j].length - 1 < getData.length) {
        let  validIndices = []
            if (getProjects[arrIndex][i] !== undefined && i > 0) {
                validIndices.push(i)
                console.log(validIndices)
            };
        

        getProjects[arrIndex][i + 1].splice(validIndices[index], 1, undefined)
        // by using `undefined` here to replace tasks, this maintains the implied length of the array
        console.log(validIndices)
        }
    }

    clickProjectInList(index) {
            //index from getData in clickProjects
        for (let j = 0; j < getProjects.length; j++) {
            const projectOfList = document.querySelector(`.project-${j}-of-list-${index}`)
            if (projectOfList) {
                projectOfList.addEventListener('click', (event) => {
                    console.log(j, 'j', index, 'i')

                    

                    getData.forEach((element, k) => {
                        if (getProjects[j].length - 1 < getData.length) {
                            if (typeof getProjects[j][k + 1] !== 'object' ) {
                                getProjects[j][k + 1] = undefined
                            }
                        }


                    });

                    sharedIndex.splice(0, 1, index + 1)

                    console.log(sharedIndex, 'sharedIndex in all tasks')



                    getProjects[j].splice(index + 1, 1, getData[index]);

                    
                 //   this.syncArrays(j);
                    console.log(getProjects)


                    


                    /*
                    for (let i = 0; i < getData.length; i ++) {
                        getIndex[i] = 'x';
                    }
                    getIndex[index] = index
                    console.log(getIndex, 'getIndex')
                    */





                });
            };
        };
    }

    expandProjects(projects) {
        projects.classList.toggle('expand-list')
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
            subBtn.classList.add(`project-${i}-of-list-${index}`, 'all-projects-menu')
            projectList.append(subLi)
            subLi.append(subBtn)
        })
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
                    getData.splice(index, 1)
                    getPriorityData.splice(index, 1);
                    allTasksBtn.click();
                });
            };
        });
    }

    clickAllTasks() {
        const allTasksBtn = document.querySelector('.all-tasks-btn');
        allTasksBtn.addEventListener('click', (e) => {
            this.classToggle();
            domRemove.checkEmpty();
            this.noTasks();
            domRemove.containerRemove();
            this.tasksList();
           // this.clickProjectInList()
        });
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

    clickSave() {
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

                getData[index] = obj
                console.log(getData)
                console.log(getProjects)

                const madePriority = document.querySelector(`.made-priority${index}`)
                if (madePriority) {
                    madePriority.click();
                };
            });
        });
    };


    tasksList() {
       const allTasks = taskCard.domInit('all-tasks__container', 'All Tasks');
       this.renderFields(taskCard.fields(), taskCard.topBar(), allTasks)
       this.clickMakePriority();
       taskCard.clickSave();
       this.removeTask();
    };


    renderFields(fields, topBar, allTasks) {
        for (let i = 0; i < getData.length; i++) {
            const fieldContainer = document.createElement('div')
            fieldContainer.classList.add('singular-task', `task${i}`)
            fields.forEach((obj, index) => {
                const { tag, type, value, className } = obj;
                let input = document.createElement(tag)
                if (tag === 'button') input.textContent = 'Make Priority';
                if (type) input.type = type

                taskCard.classListGen(i, input, index, obj)
                if (index < 1) taskCard.renderTopbar(topBar, input, i)
                taskCard.displayValues(input, index, getData[i])

                fieldContainer.append(input)
            });
            domRemove.checkEmpty();
            allTasks.append(fieldContainer)
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
};