import '../css/styles.css';

import { NewTask } from './components/NewTask.js'
const task = new NewTask

import { AllTasks } from './components/AllTasks.js';
const allTasks = new AllTasks

import { PriorityTask } from './components/PriorityTasks.js';
const priorityTask = new PriorityTask;

import { Overview } from './components/Overview.js';
const overview = new Overview

import { Projects } from './components/Projects.js';
const projects = new Projects

overview.welcomePanel();
priorityTask.clickPriorityTasks()
task.clickNewTask();
allTasks.clickAllTasks();
projects.clickNewProject();

