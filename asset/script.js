window.onload = function() {
    const sidebar = document.querySelector('.side-bar');
    const optionsList = document.getElementById('optionsList');
    
    // Add the 'shrink' class on load
    sidebar.classList.add('shrink');
    optionsList.classList.add('hidden');
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
});


document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting');

    // Get the current hour
    const currentHour = new Date().getHours();

    // Determine the greeting message based on the time of day
    let greetingMessage;
    if (currentHour < 12) {
        greetingMessage = "Good Morning !";
    } else if (currentHour < 18){
        greetingMessage = "Good Afternoon !";
    } else {
        greetingMessage = "Good Evening !";
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
    });

    status.addEventListener("click", () => {
        if (status.textContent === "incomplete") {
            status.textContent = "completed";
            status.style.background = "lightgreen";
        } else {
            status.textContent = "incomplete";
            status.style.background = "red";
        }
        alert(`task status: ${status.textContent}`);
    });

    taskinput.value = "";
}

// Clear all tasks
document.getElementById('clear-tasks-btn').addEventListener('click', function() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
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


