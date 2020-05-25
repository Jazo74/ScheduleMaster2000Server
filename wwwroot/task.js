const createTaskTitleEl = document.querySelector('#create-tasktitle');
const createTaskDescEl = document.querySelector('#create-taskdescription');
const createTaskColorEl = document.querySelector('#create-taskcolor');
const createTaskButtonEl = document.querySelector('#create-taskbutton');
createTaskButtonEl.addEventListener('click', createTask);




// Opening the task panel

function openTasksPanel() {
    schedulesPanelEl.style.display = 'none';
    loginPanelEl.style.display = 'none';
    slotsPanelEl.style.display = 'none';
    tasksPanelEl.style.display = 'grid';
    middlePanelEl.style.height = 'auto';
}

function createTask() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', createTaskDone);
    xhr.open('POST', serverURL + '/api/Tasks');
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.withCredentials = true; // pass along cookies
    const taskData = `userId=${currentUserID}&taskTitle=${createTaskTitleEl.value}&taskDescription=${createTaskDescEl.value}&taskColor=${createTaskColorEl.value}`;
    console.log(createTaskTitleEl.value);
    xhr.send(taskData);
}

function createTaskDone() {
    console.log('task has created');
    createTaskTitleEl.value = '';
    createTaskDescEl.value = '';
    createTaskColorEl.value = '';
    hideMiddlePanel();
}