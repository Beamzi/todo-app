

export class DOMRemove {
    constructor() {
    }
    containerRemove() {
        const allTasksContainer = document.querySelector('.all-tasks__container')
        if (allTasksContainer) {
            allTasksContainer.remove();
        }
        const priorityTasksContainer = document.querySelector('.priority-tasks__container')
        if (priorityTasksContainer) {
            priorityTasksContainer.remove();
        }
        const welcomeContainer = document.querySelector('.welcome__container')
        if (welcomeContainer) {
            welcomeContainer.remove();
        }
    }
    checkEmpty() {
        const emptyWindow = document.querySelector('.emptyPriorities')
        if (emptyWindow) {
            emptyWindow.remove()
        }
        const emptyAllTasks = document.querySelector('.empty-all-tasks')
        if (emptyAllTasks) {
            emptyAllTasks.remove();
        }
    }
}