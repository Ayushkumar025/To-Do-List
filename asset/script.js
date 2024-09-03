window.onload = function() {
    const sidebar = document.querySelector('.side-bar');
    const optionsList = document.getElementById('optionsList');
    
    // Add the 'shrink' class on load
    sidebar.classList.add('shrink');
    optionsList.classList.add('hidden');
    
    loadTasksFromLocalStorage(); // Load tasks from local storage on page load
};

function toggleSidebar() {
    const sidebar = document.querySelector('.side-bar');
    const optionsList = document.getElementById('optionsList');
    
    optionsList.classList.toggle('hidden');
    sidebar.classList.toggle('shrink');
}

document.addEventListener('DOMContentLoaded', () => {
    const userMenuToggle = document.getElementById('toggleuser');
    const userSubMenu = document.getElementById('userSubMenu');

    userMenuToggle.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        userSubMenu.classList.toggle('show-sub-menu');
    });

    const greetingElement = document.getElementById('greeting');

    // Get the current hour
    const currentHour = new Date().getHours();

    // Determine the greeting message based on the time of day
    let greetingMessage;
    if (currentHour < 12) {
        greetingMessage = "Good Morning!";
    } else if (currentHour < 18) {
        greetingMessage = "Good Afternoon!";
    } else {
        greetingMessage = "Good Evening!";
    }

    // Set the greeting message
    greetingElement.textContent = greetingMessage;
});


const tskbtn = document.getElementById("add-btn");
const taskinput = document.getElementById("task-title");
const newinput = document.getElementById("task-list");

tskbtn.addEventListener("click", addtask);

function addtask() {
    const taskText = taskinput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskcontainer = document.createElement("div");
    taskcontainer.className = "task-container";

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.textContent = taskText;

    const deletebutton = document.createElement("button");
    deletebutton.className = "deletebutton";
    deletebutton.textContent = "delete";

    const status = document.createElement("button");
    status.className = "status-button";
    status.textContent = "incomplete";

    taskcontainer.appendChild(taskItem);
    taskcontainer.appendChild(deletebutton);
    taskcontainer.appendChild(status);

    newinput.prepend(taskcontainer);

    deletebutton.addEventListener("click", () => {
        taskcontainer.remove();
        saveTasksToLocalStorage(); // Save tasks after deletion
    });

    status.addEventListener("click", () => {
        if (status.textContent === "incomplete") {
            status.textContent = "completed";
            status.style.background = "lightgreen";
        } else {
            status.textContent = "incomplete";
            status.style.background = "red";
        }
        saveTasksToLocalStorage(); // Save tasks after status change
    });

    saveTasksToLocalStorage(); // Save tasks after adding a new task
    taskinput.value = "";
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task-container').forEach(task => {
        const taskText = task.querySelector('.task-item').textContent;
        const taskStatus = task.querySelector('.status-button').textContent;
        tasks.push({ text: taskText, status: taskStatus });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskcontainer = document.createElement("div");
        taskcontainer.className = "task-container";

        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.textContent = task.text;

        const deletebutton = document.createElement("button");
        deletebutton.className = "deletebutton";
        deletebutton.textContent = "delete";

        const status = document.createElement("button");
        status.className = "status-button";
        status.textContent = task.status;
        status.style.background = task.status === "completed" ? "lightgreen" : "red";

        taskcontainer.appendChild(taskItem);
        taskcontainer.appendChild(deletebutton);
        taskcontainer.appendChild(status);

        newinput.prepend(taskcontainer);

        deletebutton.addEventListener("click", () => {
            taskcontainer.remove();
            saveTasksToLocalStorage(); // Save tasks after deletion
        });

        status.addEventListener("click", () => {
            if (status.textContent === "incomplete") {
                status.textContent = "completed";
                status.style.background = "lightgreen";
            } else {
                status.textContent = "incomplete";
                status.style.background = "red";
            }
            saveTasksToLocalStorage(); // Save tasks after status change
        });
    });
}

// Clear all tasks
document.getElementById('clear-tasks-btn').addEventListener('click', function() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    localStorage.removeItem('tasks'); // Clear tasks from local storage
});

// Filter tasks
document.getElementById('show-all-btn').addEventListener('click', function() {
    filterTasks('all');
});

document.getElementById('show-completed-btn').addEventListener('click', function() {
    filterTasks('completed');
});

document.getElementById('show-incomplete-btn').addEventListener('click', function() {
    filterTasks('incomplete');
});

function filterTasks(status) {
    const tasks = document.querySelectorAll('.task-container');
    
    tasks.forEach(task => {
        const statusButton = task.querySelector('.status-button');
        
        if (status === 'all' || statusButton.textContent === status) {
            task.style.display = 'block'; // Show the task
        } else {
            task.style.display = 'none'; // Hide the task
        }
    });
}