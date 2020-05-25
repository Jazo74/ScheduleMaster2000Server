const currentScheduleNameEl = document.querySelector('#schedule-name');
const chooseScheduleButtonEl = document.querySelector('#choose-schedule');
const createShedulenameEL = document.querySelector('#create-schedulename');
const daysNumberEl = document.getElementById('days-number');
const dataListEl = document.getElementById('schedule-list');
const extendedPartEl = document.querySelector('.extended-part');
const nextButtonEl = document.querySelector('.next-button');
chooseScheduleButtonEl.addEventListener('click', setCurrentSchedId);

// Opening the schedule panel and requesting the current user existing schedules

function openSchedPanel() {
    resetMainPanel();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onSchedulesReceived);
    xhr.open('GET', serverURL + `/api/Schedules/Users/${currentUserID}`);
    xhr.withCredentials = true; // pass along cookies
    xhr.send();
    tasksPanelEl.style.display = 'none';
    loginPanelEl.style.display = 'none';
    slotsPanelEl.style.display = 'none';
    schedulesPanelEl.style.display = 'grid';
    middlePanelEl.style.height = 'auto';
}

// The the data of the current user's existing schedules has loaded

function onSchedulesReceived() {
    schedules = "";
    currentSchedulesJSON = "";
    mainPanelEl.style.display = 'grid';
    const text = this.responseText;
    schedules = JSON.parse(text);
    currentSchedulesJSON = schedules;
    for (i = 0; i < schedules.length; i++) {
        const newOptionEl = document.createElement('option');
        console.log(schedules[i].scheduleName);
        newOptionEl.value = schedules[i].scheduleName;
        dataListEl.appendChild(newOptionEl);
    }
}

// Setting the current schedule id

function setCurrentSchedId() {
    for (i = 0; i < schedules.length; i++) {
        if (schedules[i].scheduleName == currentScheduleNameEl.value) {
            currentScheduleId = schedules[i].scheduleId;
            document.querySelector('.schedule-name').innerText = 'Schedule name: ' + schedules[i].scheduleName;
            currentScheduleJSON = schedules[i];
        }
    }
    createShedulenameEL.value = '';
    daysNumberEl.value = '';
    currentScheduleNameEl.value = '';
    while (extendedPartEl.firstChild) {
        extendedPartEl.removeChild(extendedPartEl.firstChild);
    }
    hideMiddlePanel();
    getDaysByScheduleId();
}

function extendForm() {
    extendedPartEl.appendChild(document.createElement('hr'));
    nextButtonEl.style.display = 'none';
    for (i = 1; i <= daysNumberEl.value; i++) {
        const newLabelEl = document.createElement('label');
        newLabelEl.className = 'subpanel-label create-days-labels';
        newLabelEl.innerText = 'Name of the ' + i + '. day name';

        const newInputEl = document.createElement('input');
        newInputEl.className = 'input-text created-days';
        newInputEl.id = i;

        const newAttrType = document.createAttribute('type');
        newAttrType.value = 'text';
        const newAttrName = document.createAttribute('name');
        newAttrName.value = 'name' + i;
        const newAttrReq = document.createAttribute('required');
        newInputEl.setAttributeNode(newAttrType);
        newInputEl.setAttributeNode(newAttrName);
        newInputEl.setAttributeNode(newAttrReq);

        extendedPartEl.appendChild(newLabelEl);
        extendedPartEl.appendChild(document.createElement('br'));
        extendedPartEl.appendChild(newInputEl);
        extendedPartEl.appendChild(document.createElement('br'));
    }
    const newSubmitButtonEl = document.createElement('button');
    newSubmitButtonEl.className = 'task-button button';
    newSubmitButtonEl.id = 'create-schedule-button';
    newSubmitButtonEl.innerText = 'Create schedule';
    extendedPartEl.appendChild(document.createElement('br'));
    extendedPartEl.appendChild(newSubmitButtonEl);
    document.querySelector('#create-schedule-button').addEventListener('click', createSchedule);
}

// Creating a schedule

function createSchedule() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', getLastScheduleIdByUser);
    xhr.open('POST', serverURL + '/api/Schedules');
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.withCredentials = true; // pass along cookies
    const scheduleData = `userId=${currentUserID}&scheduleName=${createShedulenameEL.value}`;
    xhr.send(scheduleData);
}

function getLastScheduleIdByUser() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', createDays);
    xhr.open('GET', serverURL + `/api/Schedules/Last/${currentUserID}`);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.withCredentials = true; // pass along cookies
    xhr.send();
}
function createDays() {
    const lastSchedule = JSON.parse(this.responseText);
    const createdDaysNames = document.querySelectorAll('.created-days');
    for (e = 0; e < createdDaysNames.length; e++) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', createDaysDone);
        xhr.open('POST', serverURL + '/api/Days');
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.withCredentials = true; // pass along cookies
        const dayData = `scheduleId=${lastSchedule[0].scheduleId}&dayNumber=${e + 1}&dayName=${createdDaysNames[e].value}`;
        console.log(dayData);
        xhr.send(dayData);
    }
    createdScheduleId = "";
}

function createDaysDone() {
    console.log("days creation attempted");
    createShedulenameEL.value = '';
    daysNumberEl.value = '';
    currentScheduleNameEl.value = '';
    hideMiddlePanel();
    const createdDaysNamesEl = document.querySelectorAll('.created-days');
    const createdDaysLabelsEl = document.querySelectorAll('.create-days-labels');
    while (extendedPartEl.firstChild) {
        extendedPartEl.removeChild(extendedPartEl.firstChild);
    }
}