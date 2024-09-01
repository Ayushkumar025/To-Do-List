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


const tskbtn=document.getElementById("add-btn");
const taskinput=document.getElementById("task-title");
const newinput=document.getElementById("task-list");

tskbtn.addEventListener("click", addtask);
function addtask(){
    const taskText = taskinput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.textContent = taskText;

    const hr = document.createElement('hr');

    newinput.prepend(hr);
    newinput.prepend(taskItem);

    taskinput.value= "";
}

// clear
document.getElementById('clear-tasks-btn').addEventListener('click', function() {
    const taskList = document.getElementById('task-list');
    
    taskList.innerHTML = '';
});


