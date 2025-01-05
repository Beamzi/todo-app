import '../css/styles.css';

import { NewTask } from './components/NewTask.js'
const task = new NewTask


//////////////////////////////////
//import { DataSubmit } from './components/DataSubmit.js';
//const dataSubmit = new DataSubmit
/////////////////////////////////////


import { AllTasks } from './components/AllTasks.js';
const allTasks = new AllTasks

import { PriorityTask } from './components/PriorityTasks.js';
const priorityTask = new PriorityTask;


priorityTask.clickPriorityTasks()
task.clickNewTask();
allTasks.clickAllTasks();




