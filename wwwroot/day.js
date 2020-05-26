function openSlotsPanel() {
    schedulesPanelEl.style.display = 'none';
    tasksPanelEl.style.display = 'none';
    loginPanelEl.style.display = 'none';
    slotsPanelEl.style.display = 'grid';
    middlePanelEl.style.height = 'auto';
}

// Requesting the days of the current schedule

function getDaysByScheduleId() {
    //console.log("getDaysByScheduleId started");
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onDaysReceived);
    xhr.open('GET', serverURL + '/api/Days/Schedule/' + currentScheduleId);
    xhr.withCredentials = true; // pass along cookies
    xhr.send();
}

// The data of the days has loaded, requesting the slots of the days

function onDaysReceived() {
    //console.log("onDaysReceived started");
    const text = this.responseText;
    const days = JSON.parse(text);
    currentDaysJSON = days;
    for (i = 0; i < days.length; i++) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', onSlotsReceived);
        xhr.open('GET', serverURL + '/api/Slots/Day/' + days[i].dayId);
        xhr.withCredentials = true; // pass along cookies
        xhr.send();
    }
    setTimeout(showSchedules, 2000);
}

// The data of the slots has loaded

function onSlotsReceived() {
    const text = this.responseText;
    const slots = JSON.parse(text);
    currentSlotsJSON.push(slots);

}

function showSchedules() {
    //console.log("schowSchedules started");
    //console.log(currentDaysJSON);
    for (a = 0; a < currentDaysJSON.length; a++) {
        showDays(currentDaysJSON[a]);
    }
    setTimeout(ShowSlots, 1000);

}

function showDays(day) {
    const dayTitleEl = document.createElement("div");
    dayTitleEl.className = 'headSlot';
    const dayTitleText = document.createElement("p");
    dayTitleText.innerText = day.dayName;
    dayTitleEl.appendChild(dayTitleText);
    const targetDayDivEL = document.querySelector(`.day${day.dayNumber}`);
    targetDayDivEL.appendChild(dayTitleEl);
}

function ShowSlots() {
    console.log(currentSlotsJSON);
    let dayNumber;
    for (c = 0; c < currentSlotsJSON.length; c++) {
        for (b = 0; b < 24; b++) {
            if (currentSlotsJSON[c][b].slotNumber == b) {
                const slotEl = document.createElement("div");
                slotEl.className = 'hourSlot';
                slotEl.id = `slot_${currentSlotsJSON[c][b].slotId}`;
                const slotText = document.createElement("p");
                slotText.id = `slot-p-${currentSlotsJSON[c][b].slotId}`;
                for (l = 0; l < currentTasks.length; l++) {
                    if (currentTasks[l].taskId == currentSlotsJSON[c][b].taskId) {
                        slotText.innerText = currentTasks[l].taskTitle;
                    }
                }
                slotEl.appendChild(slotText);
                const dayId = currentSlotsJSON[c][b].dayId;

                for (d = 0; d < currentDaysJSON.length; d++) {
                    if (currentDaysJSON[d].dayId == dayId) {
                        dayNumber = currentDaysJSON[d].dayNumber;
                    }
                }
                const targetDayDivEL = document.querySelector(`.day${dayNumber}`);
                slotText.addEventListener('click', slotClick);
                targetDayDivEL.appendChild(slotEl);
            }
        }
    }
}

function createDaysDone() {
}

function slotClick() {
    const extendedSlot = document.querySelector(`.extended-slot`);
    if (!extendedSlot) {
        const slotEl = document.querySelector(`#${this.id}`).parentNode;
        const parentId = slotEl.id;
        slotEl.style.height = '160px';
        const taskListEl = document.createElement("input");
        taskListEl.className = "extended-slot";
        taskListEl.type = "text";
        taskListEl.setAttribute("list", "task-list");
        const dataTaskListEl = document.createElement("datalist");
        dataTaskListEl.id = "task-list"
        for (m = 0; m < currentTasks.length; m++) {
            const newOptionEl = document.createElement('option');
            newOptionEl.value = `${currentTasks[m].taskTitle} (${currentTasks[m].taskId})`;
            dataTaskListEl.appendChild(newOptionEl);
        }
        taskListEl.appendChild(dataTaskListEl);
        const chooseTaskButtonEl = document.createElement('button');
        chooseTaskButtonEl.className = 'extended-button button';
        chooseTaskButtonEl.innerText = 'Choose task';
        chooseTaskButtonEl.addEventListener('click', chooseTask.bind(null,parentId));
        slotEl.appendChild(taskListEl);
        slotEl.appendChild(chooseTaskButtonEl);
    }
}

function slotLeft(slotId) {
    const extendedSlot = document.querySelector('.extended-slot');
    const extendedButton = document.querySelector('.extended-button');
    const slotEl = document.querySelector(`#${slotId}`);
    slotEl.style.height = '30px';
    extendedSlot.parentNode.removeChild(extendedSlot);
    extendedButton.parentNode.removeChild(extendedButton);
}

function chooseTask(slotId) {
    const choosedTask = document.querySelector('.extended-slot').value;
    const start = choosedTask.indexOf("(")+1;
    const end = choosedTask.indexOf(")");
    const taskId = choosedTask.slice(start, end);
    const xhr = new XMLHttpRequest();
    const slotID = slotId.slice(slotId.indexOf("_") + 1,);
    console.log(slotID);
    xhr.addEventListener('load', onTaskSaved.bind(null, slotId));
    xhr.open('PUT', serverURL + '/api/Slots/' + slotID);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.withCredentials = true; // pass along cookies
    const slotData = `taskId=${taskId}`;
    xhr.send(slotData);
    
}

function onTaskSaved(slotId) {
    slotLeft(slotId);
    console.log(this);
}