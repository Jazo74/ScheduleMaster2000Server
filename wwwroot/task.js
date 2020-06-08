const createTaskTitleEl = document.querySelector('#create-tasktitle');
const createTaskDescEl = document.querySelector('#create-taskdescription');
const updateTaskTitleEl = document.querySelector('#update-tasktitle');
const updateTaskDescEl = document.querySelector('#update-taskdescription');
const createTaskColorEl = document.querySelector('#create-taskcolor');
const createTaskButtonEl = document.querySelector('#create-taskbutton');
const updateTaskButtonEl = document.querySelector('#update-taskbutton');
const coloredButtonEl = document.querySelectorAll('.colored-button');
const redButtonEl = document.querySelector('#red');
const purpleButtonEl = document.querySelector('#purple');
const orangeButtonEl = document.querySelector('#orange');
const yellowButtonEl = document.querySelector('#yellow');
const greenButtonEl = document.querySelector('#green');
const blueButtonEl = document.querySelector('#blue');
const cyanButtonEl = document.querySelector('#cyan');
const brownButtonEl = document.querySelector('#brown');

createTaskButtonEl.addEventListener('click', createTask);
updateTaskButtonEl.addEventListener('click', updateTask);

for (z = 0; z < coloredButtonEl.length; z++) {
    coloredButtonEl[z].addEventListener('click', chooseColor);
}

let choosedColor = "white";

// Opening the task panel

function openTasksPanel() {
    schedulesPanelEl.style.display = 'none';
    loginPanelEl.style.display = 'none';
    slotsPanelEl.style.display = 'none';
    tasksPanelEl.style.display = 'grid';
    middlePanelEl.style.height = 'auto';
    const dataTaskListEl = document.querySelector("#task-list");
    while (dataTaskListEl.firstChild) {
        dataTaskListEl.removeChild(dataTaskListEl.firstChild);
    }
    for (m = 0; m < currentTasks.length; m++) {
        const newOptionEl = document.createElement('option');
        newOptionEl.value = `${currentTasks[m].taskTitle} (${currentTasks[m].taskId})`;
        dataTaskListEl.appendChild(newOptionEl);
    }
}

function createTask() {
    if (createTaskTitleEl.value != "" && createTaskDescEl.value != "") {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', createTaskDone);
        xhr.open('POST', serverURL + '/api/Tasks');
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.withCredentials = true; // pass along cookies
        const taskData = `userId=${currentUserID}&taskTitle=${createTaskTitleEl.value}&taskDescription=${createTaskDescEl.value}&taskColor=${choosedColor}`;
        console.log(createTaskTitleEl.value);
        xhr.send(taskData);
    } else {
        alert("Please fill the form");
    }
}

function createTaskDone() {
    console.log('task has created');
    createTaskTitleEl.value = '';
    createTaskDescEl.value = '';
    choosedColor = "white";
    hideMiddlePanel();
    getTasksByUser(currentUserID);
    alert("A task has created.");
}

function getTasksByUser(userId) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', gotTasksByUser);
    xhr.open('GET', serverURL + '/api/Tasks/Users/' + userId);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.withCredentials = true; // pass along cookies
    xhr.send();
}

function gotTasksByUser() {
    currentTasks = JSON.parse(this.responseText);
    for (z = 0; z < coloredButtonEl.length; z++) {
        coloredButtonEl[z].style.border = "0px solid #1bff00";
    }
}

function chooseColor() {
    for (z = 0; z < coloredButtonEl.length; z++) {
        coloredButtonEl[z].style.border = "0px solid #1bff00";
    }
    sameColoredEL = document.querySelectorAll(`#${this.id}`);
    for (z = 0; z < sameColoredEL.length; z++) {
        sameColoredEL[z].style.border = "3px solid #1bff00";
    }
    choosedColor = this.id;
}

function updateTask() {
    if (updateTaskTitleEl.value != "" && updateTaskDescEl.value != "") {
        const start = updateTaskTitleEl.value.indexOf("(") + 1;
        const end = updateTaskTitleEl.value.indexOf(")");
        const taskId = updateTaskTitleEl.value.slice(start, end);
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', updateTaskDone);
        xhr.open('PUT', serverURL + '/api/Tasks/' + taskId);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.withCredentials = true; // pass along cookies
        const taskData = `taskDescription=${updateTaskDescEl.value}&taskColor=${choosedColor}`;
        console.log(createTaskTitleEl.value);
        xhr.send(taskData);
    } else {
        alert("Please fill the form");
    }
}

function updateTaskDone() {
    console.log('task has created');
    createTaskTitleEl.value = '';
    createTaskDescEl.value = '';
    choosedColor = "white";
    hideMiddlePanel();
    updateTaskTitleEl.value = "";
    updateTaskDescEl.value = "";
    getTasksByUser(currentUserID);
}