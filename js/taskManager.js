// Creating New Task Function
const createTaskHtml = (name, description, assignedTo, dueDate, status, priority, id) => {
    const html = `
    <!-- List item ${id} -->
    <li class="list-group-item" id="accordion${id}">
    <div class="todo-indicator bg-warning"></div>
    <div class="widget-content p-0">
        <div class="widget-content-wrapper">
            <div class="widget-content-left mr-2">
                <div class="custom-checkbox custom-control"> <input class="custom-control-input" id="exampleCustomCheckbox${id}" type="checkbox"><label class="custom-control-label" for="exampleCustomCheckbox${id}">&nbsp;</label> </div>
            </div>
            <div class="widget-content-right">
                <div class="widget-heading">
                <div class="task-title">
                ${name}<div class="badge badge-warning ml-2">${priority}</div>
                </div>
                <span class="blank"> </span>
                <div class="button-icons">
                    <i class="fa fa-edit fa-lg edit-icon icons" data-toggle="modal" data-target="#editTaskButtonModal"></i>
                    <i class="fa fa-trash fa-lg trash-icon icons" data-toggle="modal" data-target="#deleteTaskModal"></i> 
                    <i class="fa fa-chevron-down fa-md icons rotate" data-toggle="collapse" data-target="#collapse${id}" aria-expanded="false" aria-controls="collapse${id}"><span></span></i>
                </div>
                </div>
                <div id="collapse${id}" class="collapse" aria-labelledby="content-expansion" data-parent="#accordion${id}">
                    <div class="widget-subheading"><small>Assigned To: ${assignedTo}</small></div>
                    <div class="d-flex w-100 mb-3 justify-content-between">
                    <small><i>${status}</i></small>
                    <small>Due: ${dueDate}</small>
                </div>
                <p>${description}</p>
            


            <!-- EDIT FORM  -->
                <!-- Modal -->
                <div class="modal fade" id="editTaskButtonModal" tabindex="-1" role="dialog" aria-labelledby="editTaskModalForm" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title2" id="editTaskModalForm">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                    <!-- Bootstrap form -->
                    <form id="editTaskForm" method="POST">
        
                        <!-- Form: Task Name -->
                        <div class="mb-3 form-field error">
                        <label for="editTaskName" class="col-form-label" style="display:None">Task Name</label>
                        <input type="text" class="form-control" id="editTaskName" placeholder="Task Name">
                        <small></small>
                        </div>
        
                        <!-- Form: Description -->
                        <div class="mb-3 form-field error">
                        <label for="editTaskDescription" style="display:none">Description</label>
                        <textarea class="form-control" id="editTaskDescription" placeholder="Description"></textarea>
                        <small></small>
                        </div>
        
                        <!-- Form: Assigned To -->
                        <div class="mb-3 form-field error">
                        <label for="editAssignedTo" class="col-form-label" style="display:none">Assigned to</label>
                        <input type="text" class="form-control" id="editAssignedTo" placeholder="Assigned to">
                        <small></small>
                        </div>
        
        
                        <!-- Form: Select Date -->
                        <div class="mb-3 form-field error">
                        <label for="editTaskDueDate" style="display:none">Due Date</label>
                        <input type="date" class="form-control" id="editTaskDueDate" value="Due date">
                        <small></small>
                        </div>
        
                        
                        <!-- Form: Status -->
                                
                        <div class="form-group">
                        <label for="editTaskStatus" style="display: none">Select status:</label>
                        <select class="form-control" id="editTaskStatus">
                            <option value="">Status option</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Review">Review</option>
                            <option value="Done">Done</option>
                        </select>
                        </div>
        
                        <!-- Form: Priority Options -->
        
                        <div class="form-group">
                        <label for="editTaskPriority" style="display: none">Select priority:</label>
                        <select class="form-control" id="editTaskPriority">
                            <option value="">Priority option</option>
                            <option value="Priority 1"><span class="emoji">🟥</span> Priority 1</option>
                            <option value="Priority 2"><span class="emoji">🟧</span> Priority 2</option>
                            <option value="Priority 3"><span class="emoji">🟦</span> Priority 3</option>
                            <option value="Priority 4"><span class="emoji">⬜</span> Priority 4</option>
                        </select>
                        <div class="invalid-feedback">Example invalid custom select feedback</div>
                        </div>
                                                                    
        
                    <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button> -->
                        <!-- <button class="btn btn-secondary" type="close">Cancel</button> -->
                        <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button class="btn btn-primary" type="submit">Save</button>
                    </div>
                    </form>
                    </div>


                    </div>
                    </div>
                </div>
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
};