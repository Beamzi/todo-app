
import { taskDataObj, dataRetrieve } from "./taskData";
import { NewTask } from "./NewTask";

let task = new NewTask;




let taskData = taskDataObj;

export class AllTasks {
    domRemove() {
        const allTasksBtn = document.querySelector('.all-tasks-btn')
        allTasksBtn.addEventListener('click', (e) => {
            const dashboardPageLoad = document.querySelector('.dashboard__page-load')
            dashboardPageLoad.remove();
        //    this.allTasksCreate();
             task.domCreate('.dashboard__contents')




        });
    }



    allTasksCreate() {
        const dashboardContents = document.querySelector('.dashboard__contents')
        const allTasksPanel = document.createElement('div')
        const para = document.createElement('p')
        para.textContent = taskData.title
        dashboardContents.append(allTasksPanel);
        allTasksPanel.classList.add('all-tasks-panel')
        allTasksPanel.append(para);
    //   task.domCreate(allTasksBtnRef, allTasksPanelRef)

        console.log(taskData)

       // this.domCreate();
    };

}

