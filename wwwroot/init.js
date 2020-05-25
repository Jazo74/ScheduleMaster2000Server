const serverURL = 'https://localhost:5001';

const body = document.querySelector('body');
const hourDivEl = document.querySelector('.hour');
const schedLinkEl = document.querySelector('#link-schedules');
const tasksLinkEl = document.querySelector('#link-tasks');
const mainPanelEl = document.querySelector('.main-panel');
const middlePanelEl = document.querySelector('.middle-panel');
const loginPanelEl = document.querySelector('.login');
const schedulesPanelEl = document.querySelector('.schedules');
const tasksPanelEl = document.querySelector('.tasks');
const slotsPanelEl = document.querySelector('.slots');
const closerButtonsEl = document.querySelectorAll('.closer-button');

const greetingEl = document.querySelector('#greeting');
let renderHeight = document.documentElement.clientHeight;
let renderWidth = document.documentElement.clientWidth;
loginPanelEl.style.height = renderHeight - 100 + 'px';

let createdScheduleId;
let schedules;
let currentSchedulesJSON = [];
let currentScheduleJSON;
let currentDaysJSON = [];
let currentSlotsJSON = [];
let currentScheduleId;
let currentDaysIds = [];
let currentUserID = 'nouser@nouser.net';
let currentUserNickname = 'nouser'; 
let currentTasks = [];

function resetMainPanel() {
    currentSchedulesJSON = [];
    currentScheduleJSON = '';
    currentDaysJSON = [];
    currentSlotsJSON = [];
    currentScheduleId = 0;
    currentDaysIds = [];
    const day1Panel = document.querySelector('.day1');
    const day2Panel = document.querySelector('.day2');
    const day3Panel = document.querySelector('.day3');
    const day4Panel = document.querySelector('.day4');
    const day5Panel = document.querySelector('.day5');
    const day6Panel = document.querySelector('.day6');
    const day7Panel = document.querySelector('.day7');
    const dataListEl = document.getElementById('schedule-list');
    while (dataListEl.firstChild) {
        dataListEl.removeChild(dataListEl.firstChild);
    }
    while (day1Panel.firstChild) {
        day1Panel.removeChild(day1Panel.firstChild);
    }
    while (day2Panel.firstChild) {
        day2Panel.removeChild(day2Panel.firstChild);
    }
    while (day3Panel.firstChild) {
        day3Panel.removeChild(day3Panel.firstChild);
    }
    while (day4Panel.firstChild) {
        day4Panel.removeChild(day4Panel.firstChild);
    }
    while (day5Panel.firstChild) {
        day5Panel.removeChild(day5Panel.firstChild);
    }
    while (day6Panel.firstChild) {
        day6Panel.removeChild(day6Panel.firstChild);
    }
    while (day7Panel.firstChild) {
        day7Panel.removeChild(day7Panel.firstChild);
    }
}

function hideMiddlePanel() {
    schedulesPanelEl.style.display = 'none';
    tasksPanelEl.style.display = 'none';
    loginPanelEl.style.display = 'none';
    slotsPanelEl.style.display = 'none';

}

function logoutHideElements() {
    tasksLinkEl.innerText = '';
    schedLinkEl.innerText = '';
    logoutLinkEl.innerText = '';
    hideMiddlePanel();
    loginPanelEl.style.display = 'grid';
    mainPanelEl.style.display = 'none';
    loginPanelEl.style.height = renderHeight - 100 + 'px';
    greetingEl.innerText = ``;
}



function init() {
    nextButtonEl.addEventListener('click', extendForm);
    schedLinkEl.addEventListener('click', openSchedPanel);
    tasksLinkEl.addEventListener('click', openTasksPanel);
    for (i = 0; i < closerButtonsEl.length; i++) {
        closerButtonsEl[i].addEventListener('click', hideMiddlePanel);
    }
    loginButton.addEventListener('click', loginRequest);
    regButtonEL.addEventListener('click', regRequest);
    tasksLinkEl.innerText = '';
    schedLinkEl.innerText = '';
    logoutLinkEl.innerText = '';
}

function createHourElement() {
    const hourEl = document.createElement("div");
    hourEl.className = 'hourHead';
    const hourText = document.createElement("p");
    hourText.innerText = 'Time';
    hourEl.appendChild(hourText);
    hourDivEl.appendChild(hourEl);
    for (i = 0; i < 24; i++) {
        //creating a slot
        const slotEl = document.createElement("div");
        slotEl.className = 'hourSlot';
        slotEl.id = i;
        const slotText = document.createElement("p");
        slotText.innerText = i + ':00';
        slotEl.appendChild(slotText);
        hourDivEl.appendChild(slotEl);
    }
}

createHourElement();
init();