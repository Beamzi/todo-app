


// returns the object, stored into object instances
export function taskData (title, date, details) {
    return {
        title: title || 'title',
        date: date || 'date',
        details: details || 'details'
    }
}

//stores the object Instances one at a time
export let getData = [];

// recevies copies of the object instances that are 'priortised'
export let getPriorityData = [];

export let activeIndices = [];
export let sharedIndex = [];


export let getProjects = [] 

export function projectArrays (projectTitle) {
    return [ projectTitle ];
}


export let getIndex = [];
