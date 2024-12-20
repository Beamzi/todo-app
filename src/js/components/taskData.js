


// returns the object, stored into object instances
export function taskDataObj (title, date, details) {
    return {
        title: title || 'title',
        date: date || 'date',
        details: details || 'details'
    }
}

//stores the object Instances one at a time
export let dataRetrieve = [];

// recevies copies of the object instances that are 'priortised'
export let priorityTasksData = [];


export let isClicked = [];