export class Overview {
    constructor() {
    }

    welcomePanel() {
        const contents = document.querySelector('.dashboard__contents')
        const welcome = document.createElement('section')
        welcome.className = 'welcome__container'
        welcome.innerHTML = `<h3>Welcome to Task Manager!</h3> <p>click on <b>New Task</b> to begin.<p>`
        contents.append(welcome)
    }
}