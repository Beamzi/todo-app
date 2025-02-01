

export const dynamicSelectors = () => {
//    const query = (query) => document.querySelector(query)
    const queryAll = (query) => document.querySelectorAll(query)
    
    return {
        allTasksRemoveBtnList: () => queryAll('.all-tasks-remove-btn'),
    };
};

export const staticSelectors = {
    dashboardContents: document.querySelector('.dashboard__contents'),
    allTasksBtn: document.querySelector('.all-tasks-btn'),
    priorityTasksBtn: document.querySelector('.priorities-btn'),
    sidebarProjects: document.querySelector('.dashboard__sidebar__projects'),

}

