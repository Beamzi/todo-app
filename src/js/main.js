import '../css/styles.css';
import { NewTask } from './components/NewTask.js'
import { AllTasks } from './components/AllTasks.js';

const task = new NewTask
const allTasks = new AllTasks

task.clickNewTask();
allTasks.allTasksDisplay();
