// Creating New Task Function
// Add an data-task-id attribute to each task - required for checkbox DOM
// Checkbox to be hidden if status is set to Done
const createTaskHtml = (name, description, assignedTo, dueDate, status, priority, id) => {
    const html = `
    <!-- List item ${id} -->
    <li class="list-group-item ${status != 'Done' ? '' : 'stroked'}" id="accordion${id}" data-task-id=${id}>
    <div class="todo-indicator bg-warning"></div>
    <div class="widget-content p-0">
        <div class="widget-content-wrapper">
            <div class="widget-content-left mr-2">
                <div class="custom-checkbox custom-control"> <input class="custom-control-input" id="exampleCustomCheckbox${id} newTaskItem" type="checkbox"><label class="custom-control-label done-checkbox ${status != 'Done' ? 'visible' : 'invisible'}" for="exampleCustomCheckbox${id}"></label></div>
                <div class="badge badge-pill badge-info ${status != 'Done' ? 'invisible' : 'visible'}">Done</div>
            </div>
            <div class="widget-content-right">
                <div class="widget-heading">
                <div class="task-title">
                ${name}<div class="${priority === 'Priority 1' ? "badge badge-danger" : priority === 'Priority 2' ? "badge badge-warning" : priority === 'Priority 3' ? "badge badge-primary" : "badge badge-success"} ml-2 ${status != 'Done' ? 'visible' : 'invisible'}">${priority}</div>
                </div>
                
                <div class="button-icons">
                    <i class="fa fa-edit fa-lg edit-icon icons ${status != 'Done' ? 'visible' : 'invisible'}" data-toggle="modal" data-target="#editTaskButtonModal"></i>
                    <span class="fa fa-trash fa-lg trash-icon icons delete-button ${status != 'Done' ? 'visible' : 'visible'}" id="deleteButton${id}" data-toggle="modal" data-target="#deleteTaskModal"></span>
                    <span class="fa fa-chevron-down fa-md icons rotate" id="downArrow" data-toggle="collapse" data-target="#collapse${id}" aria-expanded="false" aria-controls="collapse${id}"><span></span></span>
                </div>
                </div>
                <div id="collapse${id}" class="collapse" aria-labelledby="content-expansion" data-parent="#accordion${id}">
                    <div class="widget-subheading"><small>Assigned To: ${assignedTo}</small></div>
                    <div class="d-flex w-100 mb-3 justify-content-between">
                    <small><i class="${status != 'Done' ? 'visible' : 'invisible'}" for="exampleCustomCheckbox${id}">${status}</i></small>
                    <small>Due: ${dueDate}</small>
                </div>
                <p>${description}</p>
            


            
</li>
    `
    return html;
}

// Create a TaskManager class
class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    // Create the addTask method
    addTask(name, description, assignedTo, dueDate, status, priority) {
        const task = {
            // Increment the currentId property
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
            priority: priority
            
        };

        // Push the task to the tasks property
        this.tasks.push(task);
    }

    getTaskById(taskId) {
        // Create a variable to store the found task
        let foundTask;

        // Loop over the tasks and find the task with the id passed as a parameter
        for (let i = 0; i < this.tasks.length; i++) {
            // Get the current task in the loop
            const task = this.tasks[i];

            // Check if its the right task by comparing the task's id to the id passed as a parameter
            if (task.id === taskId) {
                // Store the task in the foundTask variable
                foundTask = task;
            }
        }

        // Return the found task
        return foundTask;
    }

     // Create the render method
    render() {
        // Create an array to store the tasks' HTML
        const tasksHtmlList = [];
        
        // Loop over our tasks and create the html, storing it in the array
        for (let i = 0; i < this.tasks.length; i++) {
            // Get the current task in the loop
            const task = this.tasks[i];

            // Format the date
            const date = new Date(task.dueDate);
            const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

            // Create the task html
            const taskHtml = createTaskHtml(task.name, task.description, task.assignedTo, formattedDate, task.status, task.priority, task.id);

            // Push it to the tasksHtmlList array
            tasksHtmlList.push(taskHtml);
        }

        // Create the tasksHtml by joining each item in the tasksHtmlList
        // with a new line in between each item.
        const tasksHtml = tasksHtmlList.join('\n');

        // Set the inner html of the tasksList on the page
        const tasksList = document.querySelector('#tasksList');
        tasksList.innerHTML = tasksHtml;

    }

    // Storing locally - localStorage can only store strings
    // so we have to convert this.tasks array to a string 
    save() {
        // Create a JSON string of the tasks
        const tasksJson = JSON.stringify(this.tasks);
    
        // Store the JSON string in localStorage
        localStorage.setItem("tasks", tasksJson);
    
        // Convert the currentId to a string;
        const currentId = String(this.currentId);
    
        // Store the currentId in localStorage
        localStorage.setItem("currentId", currentId);
    }

    // Converting saved JSON for this.tasks to an array when
    // we load the tasks
    load() {
        // Check if any tasks are saved in localStorage
        if (localStorage.getItem("tasks")) {
            // Get the JSON string of tasks in localStorage
            const tasksJson = localStorage.getItem("tasks");
    
            // Convert it to an array and store it in our TaskManager
            this.tasks = JSON.parse(tasksJson);
        }
    
        // Check if the currentId is saved in localStorage
        if (localStorage.getItem("currentId")) {
          // Get the currentId string in localStorage
            const currentId = localStorage.getItem("currentId");
    
          // Convert the currentId to a number and store it in our TaskManager
            this.currentId = Number(currentId);
        }
    }
    
    deleteTask(taskId) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
        // Get the current task in the loop
        const task = this.tasks[i];

        // Check if the task id is not the task id passed in as a parameter
        if (task.id !== taskId) {
        // Push the task to the newTasks array
        newTasks.push(task);
        }
    }

    // Set this.tasks to newTasks
    this.tasks = newTasks;
    }
};