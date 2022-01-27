// Finding and Display the Date Object
const dateElement = document.querySelector("#date-element");
let today = new Date();
const [month, day, year] = [today.getMonth() + 1, today.getDate(), today.getFullYear()];
let dateString = `Current Date: ${day}/${month}/${year}`;
dateElement.innerHTML = dateString;

// Collapsible Task - Rotate down arrow when clicked
$(".rotate").click(function () {
    $(this).toggleClass("down");
})

const taskManager = new TaskManager(0);
// console.log(taskManager);

// testing inserting a new task into tasks array
// taskManager.addTask("name1", "description1", "assignedT person1", "20/02/2023");
// taskManager.addTask("name2", "description2", "assignedT person2", "20/02/2024", "in progress");

// console.log(taskManager.tasks); // returns tasks [{}]

// to print the name of tasks with index 0
// console.log(taskManager.tasks[0].name); // returns name1

// testing createTaskHtml
const taskHtml = createTaskHtml();
// console.log(taskHtml);


// Validating form
const addNewTaskForm = document.getElementById('newTaskForm'); 
const editTaskForm = document.getElementById('editTaskForm'); 
const addToListTaskForm = document.getElementById('addToListTaskForm'); 
const newTaskNameEl = document.getElementById('newTaskName');
const newTaskDescriptionEl = document.getElementById('newTaskDescription');
const newTaskAssignedToEl = document.getElementById('newAssignedTo');
const newTaskDueDateEl = document.getElementById('newTaskDueDate');
const newListNameEl = document.getElementById('newListName');
const newTaskStatusEl = document.getElementById('newTaskStatus')
const newTaskPriorityEl = document.getElementById('newTaskPriority')
const addListTaskNameEl = document.getElementById('listTaskName');
const addListTaskDescriptionEl = document.getElementById('listTaskDescription');
const addListAssignedToEl = document.getElementById('listAssignedTo');
const addListTaskDueDateEl = document.getElementById('listTaskDueDate');
const addListTaskStatusEl = document.getElementById('listTaskStatus');
const addListTaskPriorityEl = document.getElementById('listTaskPriority');
const editTaskNameEl = document.getElementById('editTaskName');
const editTaskDescriptionEl = document.getElementById('editTaskDescription');
const editAssignedToEl = document.getElementById('editAssignedTo');
const editTaskListNameEl = document.getElementById('editTaskListName');
const editTaskDueDateEl = document.getElementById('editTaskDueDate');
const editTaskStatusEl = document.getElementById('editTaskStatus');
const tasksListHtml = document.getElementById('tasksList');

// The following isRequired() function returns true if the input argument is empty:
const isRequired = value => value === '' ? false : true; // ternary operator - if empty, return false & if not empty, return true

// The following isMinLength() function returns false if the length argument is not between min and max argument:
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// The following isMinLength() function returns false if the length argument is not more than the min argument:
const isMinLength = (length, min) => length < min ? false : true;

// The following isMaxLength() function returns false if the length argument is more than the max argument:
// const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isMaxLength = (length, max) => length > max ? false : true;

// The following inPast() function returns false if date has passed
// const isPast = (firstDate, secondDate) => firstDate.setHours(0,0,0,0) > secondDate.setHours(0,0,0,0) ? false : true;
const isPast = (firstDate, secondDate) => firstDate > secondDate ? false : true;

// showError functions to show error / success
// The following showError() function highlights the border of the input field and displays an error message if the input field is invalid:
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

// VALIDATING ADD NEW TASK FORM
const newCheckTaskName = () => {
    let valid = false;
    const min = 8;
    const max = 30;
    const taskName = newTaskNameEl.value.trim();

    if(!isRequired(taskName)) {
        showError(newTaskNameEl, 'Task name cannot be empty.');
    } else if (!isBetween(taskName.length, min, max)) {
        showError(newTaskNameEl, `Task name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(newTaskNameEl);
        valid = true;
    }
    return valid;
};

const newCheckTaskDescription = () => {
    let valid = false;
    const min = 15;
    const taskDescription = newTaskDescriptionEl.value.trim();

    if(!isRequired(taskDescription)) {
        showError(newTaskDescriptionEl, 'Description cannot be empty.');
    } else if (!isMinLength(taskDescription.length, min)) {
        showError(newTaskDescriptionEl, `Description must be more than ${min} characters.`)
    } else {
        showSuccess(newTaskDescriptionEl);
        valid = true;
    }
    return valid;
};

const newCheckAssignedTo = () => {
    let valid = false;
    const min = 8;
    const taskAssignedTo = newTaskAssignedToEl.value.trim();

    if(!isRequired(taskAssignedTo)) {
        showError(newTaskAssignedToEl, 'Name cannot be empty.');
    } else if (!isMinLength(taskAssignedTo.length, min)) {
        showError(newTaskAssignedToEl, `Name must be more than ${min} characters.`)
    } else {
        showSuccess(newTaskAssignedToEl);
        valid = true;
    }
    return valid;
};

const newCheckListName = () => {
    let valid = false;
    const newListName = newListNameEl.value.trim();

    if(!isRequired(newListName)) {
        showError(newListNameEl, 'List name cannot be empty.');
    } else {
        showSuccess(newListNameEl);
        valid = true;
    }
    return valid;
};

const newCheckDueDate = () => {
    let valid = false;
    const newTaskDueDate = newTaskDueDateEl.value;
    
    // Getting today's date for comparison & reformatting it to yyyy-mm-dd
    let todayDate = new Date();
    let dd = String(todayDate.getDate()).padStart(2, '0');
    let mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = todayDate.getFullYear();
    todayDate = yyyy + '-' + mm + '-' + dd;

    if(!isRequired(newTaskDueDate)) {
        showError(newTaskDueDateEl, 'Due date cannot be empty.');
    } else if (!isPast(todayDate, newTaskDueDate)) {
        showError(newTaskDueDateEl, `Due date cannot be in the past.`)
    } else {
        showSuccess(newTaskDueDateEl);
        valid = true;
    }
    return valid;
};


// const newValidateTaskForm = function() {

//     // validate form
//     let isTaskNameValid = newCheckTaskName(),
//         isTaskDescriptionValid = newCheckTaskDescription(),
//         isAssignedToValid = newCheckAssignedTo(),
//         isListNameValid = newCheckListName(),
//         isDueDateValid = newCheckDueDate();
    
//     // submit to server if the form is valid
//     let isFormValid = isTaskNameValid && 
//         isTaskDescriptionValid && isAssignedToValid &&
//         isListNameValid && isDueDateValid;

    
//     if(isFormValid) {
//         addNewTaskForm.submit();
//     }
// };

// resetting form's error message and border colour
addNewTaskForm.addEventListener('reset', function() {
    
    newTaskNameEl.parentElement.querySelector('small').innerText = '';
    newTaskNameEl.parentElement.classList.remove('error', 'success');
    newTaskNameEl.parentElement.classList.add('error');
    
    newTaskDescriptionEl.parentElement.querySelector('small').innerText = '';
    newTaskDescriptionEl.parentElement.classList.remove('error', 'success');
    newTaskDescriptionEl.parentElement.classList.add('error');
    
    newTaskAssignedToEl.parentElement.querySelector('small').innerText = '';
    newTaskAssignedToEl.parentElement.classList.remove('error', 'success');
    newTaskAssignedToEl.parentElement.classList.add('error');
    
    newListNameEl.parentElement.querySelector('small').innerText = '';
    newListNameEl.parentElement.classList.remove('error', 'success');
    newListNameEl.parentElement.classList.add('error');
    
    newTaskDueDateEl.parentElement.querySelector('small').innerText = '';
    newTaskDueDateEl.parentElement.classList.remove('error', 'success');
    newTaskDueDateEl.parentElement.classList.add('error');
    
    
});

addNewTaskForm.addEventListener('submit', function(event) {
    // prevent the form from submitting
    event.preventDefault();


    // // Validate form
    // newValidateTaskForm();

    // validate form
    let isTaskNameValid = newCheckTaskName(),
        isTaskDescriptionValid = newCheckTaskDescription(),
        isAssignedToValid = newCheckAssignedTo(),
        isListNameValid = newCheckListName(),
        isDueDateValid = newCheckDueDate();
    
    // submit to server if the form is valid
    let isFormValid = isTaskNameValid && 
        isTaskDescriptionValid && isAssignedToValid &&
        isListNameValid && isDueDateValid;

    if(isFormValid) {
        // addNewTaskForm.submit(); // commented out to prevent form from being submitted
        // Getting the values of the inputs
        const name = newTaskNameEl.value;
        const description = newTaskDescriptionEl.value;
        const assignedTo = newTaskAssignedToEl.value;
        const listName = newListNameEl.value;
        const dueDate = newTaskDueDateEl.value;
        const status = newTaskStatusEl.value;
        const priority = newTaskPriorityEl.value;

        // Adding task to the taskManager
        taskManager.addTask(name, description, assignedTo, listName, dueDate, status, priority);
        taskManager.render();

        console.log(taskManager.tasks);

        // Clear form
        newTaskNameEl.value = '';
        newTaskDescriptionEl.value = '';
        newTaskAssignedToEl.value = '';
        newListNameEl.value = '';
        newTaskDueDateEl.value = '';
        newTaskStatusEl.value = 'To Do';
        newTaskPriorityEl.value = '';
    }
    


    

});

console.log(taskManager.tasks.length);

// console.log(taskManager.tasks)

// VALIDATING ADD TO LIST FORM
const addListCheckTaskName = () => {
    let valid = false;
    const min = 5;
    const max = 30;
    const taskName = addListTaskNameEl.value.trim();

    if(!isRequired(taskName)) {
        showError(addListTaskNameEl, 'Task name cannot be empty.');
    } else if (!isBetween(taskName.length, min, max)) {
        showError(addListTaskNameEl, `Task name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(addListTaskNameEl);
        valid = true;
    }
    return valid;
};

const addListCheckTaskDescription = () => {
    let valid = false;
    const min = 5;
    const taskDescription = addListTaskDescriptionEl.value.trim();

    if(!isRequired(taskDescription)) {
        showError(addListTaskDescriptionEl, 'Description cannot be empty.');
    } else if (!isMinLength(taskDescription.length, min)) {
        showError(addListTaskDescriptionEl, `Description must be more than ${min} characters.`)
    } else {
        showSuccess(addListTaskDescriptionEl);
        valid = true;
    }
    return valid;
};

const addListCheckAssignedTo = () => {
    let valid = false;
    const min = 5;
    const max = 30;
    const taskAssignedTo = addListAssignedToEl.value.trim();

    if(!isRequired(taskAssignedTo)) {
        showError(addListAssignedToEl, 'Name cannot be empty.');
    } else if (!isBetween(taskAssignedTo.length, min, max)) {
        showError(addListAssignedToEl, `Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(addListAssignedToEl);
        valid = true;
    }
    return valid;
};


const addListCheckDueDate = () => {
    let valid = false;
    const newTaskDueDate = addListTaskDueDateEl.value;
    
    // Getting today's date for comparison & reformatting it to yyyy-mm-dd
    let todayDate = new Date();
    let dd = String(todayDate.getDate()).padStart(2, '0');
    let mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = todayDate.getFullYear();
    todayDate = yyyy + '-' + mm + '-' + dd;

    if(!isRequired(newTaskDueDate)) {
        showError(addListTaskDueDateEl, 'Due date cannot be empty.');
    } else if (!isPast(todayDate, newTaskDueDate)) {
        showError(addListTaskDueDateEl, `Due date cannot be in the past.`)
    } else {
        showSuccess(addListTaskDueDateEl);
        valid = true;
    }
    return valid;
};

const addListValidateTaskForm = function() {

    // validate form
    let isTaskNameValid = addListCheckTaskName(),
        isTaskDescriptionValid = addListCheckTaskDescription(),
        isAssignedToValid = addListCheckAssignedTo(),
        isDueDateValid = addListCheckDueDate();
    

    // submit to server if the form is valid
    let isFormValid = isTaskNameValid && 
        isTaskDescriptionValid && isAssignedToValid &&
        isDueDateValid;


    if(isFormValid) {
        addToListTaskForm.submit();
    }
};

// Resetting form's error message and border colour
addToListTaskForm.addEventListener('reset', function() {
    
    addListTaskNameEl.parentElement.querySelector('small').innerText = '';
    addListTaskNameEl.parentElement.classList.remove('error', 'success');
    addListTaskNameEl.parentElement.classList.add('error');
    
    addListTaskDescriptionEl.parentElement.querySelector('small').innerText = '';
    addListTaskDescriptionEl.parentElement.classList.remove('error', 'success');
    addListTaskDescriptionEl.parentElement.classList.add('error');
    
    addListAssignedToEl.parentElement.querySelector('small').innerText = '';
    addListAssignedToEl.parentElement.classList.remove('error', 'success');
    addListAssignedToEl.parentElement.classList.add('error');
    
    addListTaskDueDateEl.parentElement.querySelector('small').innerText = '';
    addListTaskDueDateEl.parentElement.classList.remove('error', 'success');
    addListTaskDueDateEl.parentElement.classList.add('error');
    
    
});

addToListTaskForm.addEventListener('submit', function(event) {
    // prevent the form from submitting
    event.preventDefault();

    
    // addListValidateTaskForm();

    // validate form
    let isTaskNameValid = addListCheckTaskName(),
        isTaskDescriptionValid = addListCheckTaskDescription(),
        isAssignedToValid = addListCheckAssignedTo(),
        isDueDateValid = addListCheckDueDate();
    
    // submit to server if the form is valid
    let isFormValid = isTaskNameValid && 
        isTaskDescriptionValid && isAssignedToValid &&
        isDueDateValid;

    if(isFormValid) {
        // addNewTaskForm.submit(); // commented out to prevent form from being submitted
        // Getting the values of the inputs
        const name = addListTaskNameEl.value;
        const description = addListTaskDescriptionEl.value;
        const assignedTo = addListAssignedToEl.value;
        const dueDate = addListTaskDueDateEl.value;
        let status = addListTaskStatusEl.value;
        const priority = addListTaskPriorityEl.value;
        // let id;

        // setting default value of status to 'To Do'
        if (status) {
            status = status;
        } else {
            status = 'To Do'
        }
        // Adding task to the taskManager
        taskManager.addTask(name, description, assignedTo, dueDate, status, priority);
        taskManager.render();

        console.log(taskManager.tasks); // to check tasks
        // console.log(tasksListHtml.innerHTML); // to check HTML for tasksList

        // Clear form
        addListTaskNameEl.value = '';
        addListTaskDescriptionEl.value = '';
        addListAssignedToEl.value = '';
        addListTaskDueDateEl.value = '';
        addListTaskStatusEl.value = 'To Do'; // setting default value of status to 'To Do'
        addListTaskPriorityEl.value = '';
    }
});


// VALIDATING EDIT FORM
const editCheckTaskName = () => {
    let valid = false;
    const min = 8;
    const taskName = editTaskNameEl.value.trim();

    if(!isRequired(taskName)) {
        showError(editTaskNameEl, 'Task name cannot be empty.');
    } else if (!isMinLength(taskName.length, min)) {
        showError(editTaskNameEl, `Task name must be more than ${min} characters.`)
    } else {
        showSuccess(editTaskNameEl);
        valid = true;
    }
    return valid;
};

const editCheckTaskDescription = () => {
    let valid = false;
    const min = 15;
    const taskDescription = editTaskDescriptionEl.value.trim();

    if(!isRequired(taskDescription)) {
        showError(editTaskDescriptionEl, 'Description cannot be empty.');
    } else if (!isMinLength(taskDescription.length, min)) {
        showError(editTaskDescriptionEl, `Description must be more than ${min} characters.`)
    } else {
        showSuccess(editTaskDescriptionEl);
        valid = true;
    }
    return valid;
};

const editCheckAssignedTo = () => {
    let valid = false;
    const min = 8;
    const taskAssignedTo = editAssignedToEl.value.trim();

    if(!isRequired(taskAssignedTo)) {
        showError(editAssignedToEl, 'Name cannot be empty.');
    } else if (!isMinLength(taskAssignedTo.length, min)) {
        showError(editAssignedToEl, `Name must be more than ${min} characters.`)
    } else {
        showSuccess(editAssignedToEl);
        valid = true;
    }
    return valid;
};

const editCheckListName = () => {
    let valid = false;
    const newListName = editTaskListNameEl.value.trim();

    if(!isRequired(newListName)) {
        showError(editTaskListNameEl, 'List name cannot be empty.');
    } else {
        showSuccess(editTaskListNameEl);
        valid = true;
    }
    return valid;
};

const editCheckDueDate = () => {
    let valid = false;
    const newTaskDueDate = editTaskDueDateEl.value;
    
    // Getting today's date for comparison & reformatting it to yyyy-mm-dd
    let todayDate = new Date();
    let dd = String(todayDate.getDate()).padStart(2, '0');
    let mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = todayDate.getFullYear();
    todayDate = yyyy + '-' + mm + '-' + dd;

    if(!isRequired(newTaskDueDate)) {
        showError(editTaskDueDateEl, 'Due date cannot be empty.');
    } else if (!isPast(todayDate, newTaskDueDate)) {
        showError(editTaskDueDateEl, `Due date cannot be in the past.`)
    } else {
        showSuccess(editTaskDueDateEl);
        valid = true;
    }
    return valid;
};


const editValidateTaskForm = function() {

    // validate form
    let isTaskNameValid = editCheckTaskName(),
        isTaskDescriptionValid = editCheckTaskDescription(),
        isAssignedToValid = editCheckAssignedTo(),
        isListNameValid = editCheckListName(),
        isDueDateValid = editCheckDueDate();
    

    // submit to server if the form is valid
    let isFormValid = isTaskNameValid && 
        isTaskDescriptionValid && isAssignedToValid &&
        isListNameValid && isDueDateValid;


    if(isFormValid) {
        editTaskForm.submit();
    }
};

// Resetting form's error message and border colour
editTaskForm.addEventListener('reset', function() {
    
    editTaskNameEl.parentElement.querySelector('small').innerText = '';
    editTaskNameEl.parentElement.classList.remove('error', 'success');
    editTaskNameEl.parentElement.classList.add('error');
    
    editTaskDescriptionEl.parentElement.querySelector('small').innerText = '';
    editTaskDescriptionEl.parentElement.classList.remove('error', 'success');
    editTaskDescriptionEl.parentElement.classList.add('error');
    
    editAssignedToEl.parentElement.querySelector('small').innerText = '';
    editAssignedToEl.parentElement.classList.remove('error', 'success');
    editAssignedToEl.parentElement.classList.add('error');
    
    editTaskListNameEl.parentElement.querySelector('small').innerText = '';
    editTaskListNameEl.parentElement.classList.remove('error', 'success');
    editTaskListNameEl.parentElement.classList.add('error');
    
    editTaskDueDateEl.parentElement.querySelector('small').innerText = '';
    editTaskDueDateEl.parentElement.classList.remove('error', 'success');
    editTaskDueDateEl.parentElement.classList.add('error');
    
    
    
});

editTaskForm.addEventListener('submit', function(event) {
    // prevent the form from submitting
    event.preventDefault();

    
    editValidateTaskForm();

    // const name = taskNameEl.value;
    // const description = taskDescriptionEl.value;
    // const assignedTo = taskAssignedToEl.value;
    // const dueDate = newTaskDueDateEl.value;
    // const status = newTaskStatusEl.value;
});


// OPTIONAL: Debounce technique - To ensure that time-consuming tasks do not fire so often, that it stalls the performance of the web page.
const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

// Add New Task Form input check
// Passing the input event handler to the debounce() function to debounce it:
addNewTaskForm.addEventListener('input', debounce(function (event) {
    switch (event.target.id) {
        case 'newTaskName':
            newCheckTaskName();
            break;
        case 'newTaskDescription':
            newCheckTaskDescription();
            break;
        case 'newAssignedTo':
            newCheckAssignedTo();
            break;
        case 'newTaskDueDate':
            newCheckDueDate();
            break;
        case 'newListName':
            newCheckListName();
            break;
    }
}));

// Add to List Task Form input check
// Passing the input event handler to the debounce() function to debounce it:
addToListTaskForm.addEventListener('input', debounce(function (event) {
    switch (event.target.id) {
        case 'listTaskName':
            addListCheckTaskName();
            break;
        case 'listTaskDescription':
            addListCheckTaskDescription();
            break;
        case 'listAssignedTo':
            addListCheckAssignedTo();
            break;
        case 'listTaskDueDate':
            addListCheckDueDate();
            break;
    }
}));

// Edit Task Form input check
// Passing the input event handler to the debounce() function to debounce it:
editTaskForm.addEventListener('input', debounce(function (event) {
    switch (event.target.id) {
        case 'editTaskName':
            editCheckTaskName();
            break;
        case 'editTaskDescription':
            editCheckTaskDescription();
            break;
        case 'editAssignedTo':
            editCheckAssignedTo();
            break;
        case 'editTaskListName':
            editCheckListName();
            break;
        case 'editTaskDueDate':
            editCheckDueDate();
            break;
    }
}));

