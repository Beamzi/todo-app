

export const dynamicSelectors = () => {
    const query = (query) => document.querySelector(query)
    const queryAll = (query) => document.querySelectorAll(query)
    
    return {
        allTasksRemoveBtnList: () => queryAll('.all-tasks-remove-btn'),
        projectContainer: () => query('.project__container')
    };
};

export const staticSelectors = {
    dashboard: document.querySelector('.dashboard'),
    dashboardContents: document.querySelector('.dashboard__contents'),
    allTasksBtn: document.querySelector('.all-tasks-btn'),
    priorityTasksBtn: document.querySelector('.priorities-btn'),
    sidebarProjects: document.querySelector('.dashboard__sidebar__projects'),

}

