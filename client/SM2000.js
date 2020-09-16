let renderHeight = document.documentElement.clientHeight;
let renderWidth = document.documentElement.clientWidth;
console.log(renderWidth, renderHeight);
const body = document.querySelector('body');
//body.style.height = renderHeight + 'px';
body.style.width = renderWidth + 'px';
const day1 = document.querySelector('.day1');
const hourDivEl = document.querySelector('.hour');
const schedLinkEl = document.querySelector('#link-schedules');
const tasksLinkEl = document.querySelector('#link-tasks');
const loginLinkEl = document.querySelector('#link-login');
const userNameEl = document.querySelector('#user-name');
const middlePanelEl = document.querySelector('.middle-panel');
const loginPanelEl = document.querySelector('.login');
const schedulesPanelEl = document.querySelector('.schedules');
const tasksPanelEl = document.querySelector('.tasks');
const slotsPanelEl = document.querySelector('.slots');
const closerButtonsEl = document.querySelectorAll('.closer-button');
const extensibleFormEl = document.querySelector('.extensible-form');
const nextButtonEl = document.querySelector('.next-button');


// creating 1 title + 24 slot in a day
// creating a title for the day
function createHourElement(){
    const hourEl = document.createElement("div");
    hourEl.className = 'hourSlot';

    const hourText = document.createElement("p");
    hourText.innerText = 'Time';

    hourEl.appendChild(hourText);
    hourDivEl.appendChild(hourEl);
    for (i = 0; i<24; i++) {
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

function openSchedPanel(){
    tasksPanelEl.style.display= 'none';
    loginPanelEl.style.display= 'none';
    slotsPanelEl.style.display= 'none';
    schedulesPanelEl.style.display= 'grid';
    middlePanelEl.style.height= 'auto';
}

function openTasksPanel(){
    schedulesPanelEl.style.display= 'none';
    loginPanelEl.style.display= 'none';
    slotsPanelEl.style.display= 'none';
    tasksPanelEl.style.display= 'grid';
    middlePanelEl.style.height= 'auto';
}

function openLoginPanel(){
    schedulesPanelEl.style.display= 'none';
    tasksPanelEl.style.display= 'none';
    slotsPanelEl.style.display= 'none';
    loginPanelEl.style.display= 'grid';
    middlePanelEl.style.height= 'auto';
}

function openSlotsPanel(){
    schedulesPanelEl.style.display= 'none';
    tasksPanelEl.style.display= 'none';
    loginPanelEl.style.display= 'none';
    slotsPanelEl.style.display= 'grid';
    middlePanelEl.style.height= 'auto';
}

function hideMiddlePanel(){
    schedulesPanelEl.style.display= 'none';
    tasksPanelEl.style.display= 'none';
    loginPanelEl.style.display= 'none';
    slotsPanelEl.style.display= 'none';

}

function extendForm(){
    extensibleFormEl.appendChild(document.createElement('hr'));
    const daysNumber = document.getElementById('days-number').value;
    nextButtonEl.style.display = 'none';
    for (i=1; i<=daysNumber; i++){
        const newLabelEl = document.createElement('label');
        newLabelEl.className = 'subpanel-label';
        newLabelEl.innerText = 'Name of the ' + i + '. day name';

        const newInputEl = document.createElement('input');
        newInputEl.className = 'input-text';

        const newAttrType = document.createAttribute('type');
        newAttrType.value = 'text';
        const newAttrName = document.createAttribute('name');
        newAttrName.value = 'name' + i;
        const newAttrReq = document.createAttribute('required');
        newInputEl.setAttributeNode(newAttrType);
        newInputEl.setAttributeNode(newAttrName);
        newInputEl.setAttributeNode(newAttrReq);

        extensibleFormEl.appendChild(newLabelEl);
        extensibleFormEl.appendChild(document.createElement('br'));
        extensibleFormEl.appendChild(newInputEl);
        extensibleFormEl.appendChild(document.createElement('br'));
    }
    const newSubmitButtonEl = document.createElement('button');
    newSubmitButtonEl.className = 'task-button button';
    newSubmitButtonEl.innerText = 'Create schedule';
    extensibleFormEl.appendChild(document.createElement('br'));
    extensibleFormEl.appendChild(newSubmitButtonEl);
}
    

function init() {
    nextButtonEl.addEventListener('click', extendForm);
    schedLinkEl.addEventListener('mouseover', openSchedPanel);
    tasksLinkEl.addEventListener('mouseover', openTasksPanel);
    loginLinkEl.addEventListener('mouseover', openLoginPanel);
    for (i=0; i<closerButtonsEl.length; i++){
        closerButtonsEl[i].addEventListener('click', hideMiddlePanel);
    }
}


createHourElement();
init();
