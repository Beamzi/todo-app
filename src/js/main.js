import '../css/styles.css';
import { NewTask } from './components/NewTask.js'
const task = new NewTask

import { AllTasks } from './components/AllTasks.js';
const allTasks = new AllTasks

import { PriorityTask } from './components/PriorityTasks.js';
const priorityTask = new PriorityTask;

task.clickNewTask();

priorityTask.clickPriorityTasks()


