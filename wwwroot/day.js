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
    let dayNumber;
    for (c = 0; c < currentSlotsJSON.length; c++) {
        for (b = 0; b < 24; b++) {
            if (currentSlotsJSON[c][b].slotNumber == b) {
                const slotEl = document.createElement("div");
                slotEl.className = 'hourSlot';
                //slotEl.id = currentSlotsJSON[c][b].slotId;
                const slotText = document.createElement("p");
                slotText.innerText = currentSlotsJSON[c][b].taskId;
                slotEl.appendChild(slotText);
                const dayId = currentSlotsJSON[c][b].dayId;

                for (d = 0; d < currentDaysJSON.length; d++) {
                    if (currentDaysJSON[d].dayId == dayId) {
                        dayNumber = currentDaysJSON[d].dayNumber;
                    }
                }
                const targetDayDivEL = document.querySelector(`.day${dayNumber}`);
                targetDayDivEL.appendChild(slotEl);
                const slotExtendEl = document.createElement("div");
                slotExtendEl.id = `ext${currentSlotsJSON[c][b].slotId}`
            }
        }
    }
}

function createDaysDone() {

}