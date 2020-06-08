function openSlotsPanel() {
    schedulesPanelEl.style.display = 'none';
    tasksPanelEl.style.display = 'none';
    loginPanelEl.style.display = 'none';
    slotsPanelEl.style.display = 'grid';
    middlePanelEl.style.height = 'auto';
}

// Requesting the days of the current schedule

function getDaysByScheduleId() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onDaysReceived);
    xhr.open('GET', serverURL + '/api/Days/Schedule/' + currentScheduleId);
    xhr.withCredentials = true; // pass along cookies
    xhr.send();
}

// The data of the days has loaded, requesting the slots of the days

function onDaysReceived() {
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
                slotEl.id = `slot_${currentSlotsJSON[c][b].slotId}`;
                const slotText = document.createElement("p");
                slotText.id = `slot-p-${currentSlotsJSON[c][b].slotId}`;
                const slotDesc = document.createElement("p");
                slotDesc.id = `slot-d-${currentSlotsJSON[c][b].slotId}`;
                slotDesc.className = `p-small`;
                for (l = 0; l < currentTasks.length; l++) {
                    if (currentTasks[l].taskId == currentSlotsJSON[c][b].taskId) {
                        slotText.innerText = currentTasks[l].taskTitle;
                        slotDesc.innerText = currentTasks[l].taskDescription;
                        slotDesc.style.display = "none";
                        slotEl.style.backgroundColor = currentTasks[l].taskColor;
                        if (slotEl.style.backgroundColor == "white" ||
                            slotEl.style.backgroundColor == "yellow" ||
                            slotEl.style.backgroundColor == "cyan" ||
                            slotEl.style.backgroundColor == "dodgerblue") {
                            slotEl.style.color = "#0012e8";
                        } else {
                            slotEl.style.color = "white";
                        }
                    }
                }
                slotEl.appendChild(slotText);
                slotEl.appendChild(slotDesc);
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
        //Identifying Parent
        document.querySelector(`#${this.id.replace("p", "d")}`).style.display = "block"; 
        const slotEl = document.querySelector(`#${this.id}`).parentNode;
        slotEl.style.height = 'auto';
        //Creating Input element
        const inputTaskEl = document.createElement("input");
        inputTaskEl.className = "extended-slot";
        inputTaskEl.type = "text";
        inputTaskEl.setAttribute("list", "tasks-list");
        // Creating Datalist element
        const dataTaskListEl = document.createElement("datalist");
        dataTaskListEl.id = "tasks-list"
        slotEl.appendChild(inputTaskEl);
        slotEl.appendChild(dataTaskListEl);
        for (m = 0; m < currentTasks.length; m++) {
            const newOptionEl = document.createElement('option');
            newOptionEl.value = `${currentTasks[m].taskTitle} (${currentTasks[m].taskId})`;
            dataTaskListEl.appendChild(newOptionEl);
        }
        //Creating Button
        const chooseTaskButtonEl = document.createElement('button');
        chooseTaskButtonEl.className = 'extended-button button';
        chooseTaskButtonEl.innerText = 'Choose task';
        chooseTaskButtonEl.addEventListener('click', chooseTask.bind(null, slotEl.id));
        slotEl.appendChild(chooseTaskButtonEl);
    }
}

function slotLeft(slotId) {
    const extendedSlot = document.querySelector('.extended-slot');
    const extendedButton = document.querySelector('.extended-button');
    const slotEl = document.querySelector(`#${slotId}`);
    const slotDesc = document.querySelector(`#slot-d-${slotId.slice(5,)}`);
    slotDesc.style.display = "none";
    slotEl.style.height = '30px';
    extendedSlot.parentNode.removeChild(extendedSlot);
    extendedButton.parentNode.removeChild(extendedButton);
}

function chooseTask(slotId) {
    if (document.querySelector('.extended-slot').value != "") {
        const choosedTask = document.querySelector('.extended-slot').value;
        const start = choosedTask.indexOf("(") + 1;
        const end = choosedTask.indexOf(")");
        const taskId = choosedTask.slice(start, end);
        const xhr = new XMLHttpRequest();
        const slotID = slotId.slice(slotId.indexOf("_") + 1);
        xhr.addEventListener('load', onTaskSaved.bind(null, slotId));
        xhr.open('PUT', serverURL + '/api/Slots/' + slotID);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.withCredentials = true; // pass along cookies
        const slotData = `taskId=${taskId}`;
        xhr.send(slotData);
        const slotText = document.querySelector(`#slot-p-${slotID}`);
        const slotDesc = document.querySelector(`#slot-d-${slotID}`);
        for (g = 0; g < currentTasks.length; g++) {
            if (currentTasks[g].taskId == taskId) {
                slotText.innerText = currentTasks[g].taskTitle;
                slotDesc.innerText = currentTasks[g].taskDescription;
                document.querySelector('.extended-slot').parentNode.style.backgroundColor = currentTasks[g].taskColor;
                if (document.querySelector('.extended-slot').parentNode.style.backgroundColor == "white" ||
                    document.querySelector('.extended-slot').parentNode.style.backgroundColor == "yellow" ||
                    document.querySelector('.extended-slot').parentNode.style.backgroundColor == "cyan" ||
                    document.querySelector('.extended-slot').parentNode.style.backgroundColor == "dodgerblue") {
                    document.querySelector('.extended-slot').parentNode.style.color = "#0012e8";
                } else {
                    document.querySelector('.extended-slot').parentNode.style.color = "white";
                }
            }
        }
    } else {
        alert("Please choose a task");
    }
    
}

function onTaskSaved(slotId) {
    slotLeft(slotId);
}