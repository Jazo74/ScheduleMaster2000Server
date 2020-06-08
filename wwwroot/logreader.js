const serverURL = 'https://localhost:5001';

const userIdInputBoxEl = document.querySelector("#user-id");
const methodInputBoxEl = document.querySelector("#method");
const searchButtonEl = document.querySelector("#load-log");
const resultSectionEl = document.querySelector(".result-section");
const filteredSearchButtonEl = document.querySelector("#load-filtered-log");
const tableBodyEl = document.querySelector("#table-body");

searchButtonEl.addEventListener("click", allLogRequest);
filteredSearchButtonEl.addEventListener("click", logRequest);

function logRequest() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', gotLog);
    xhr.open('GET', `${serverURL}/api/Log/${userIdInputBoxEl.value}/${methodInputBoxEl.value}`);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.withCredentials = true; // pass along cookies
    xhr.send();
}

function allLogRequest() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', gotLog);
    xhr.open('GET', serverURL + '/api/Log');
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.withCredentials = true; // pass along cookies
    xhr.send();
}

function gotLog() {
    resultSectionEl.style.display = "block";
    while (tableBodyEl.firstChild) {
        tableBodyEl.removeChild(tableBodyEl.firstChild);
    }
    const logList = JSON.parse(this.responseText);
    for (i = 0; i < logList.length; i++) {
        const trEl = document.createElement("tr");

        const tdLogId = document.createElement("td");
        tdLogId.innerText = logList[i].logId;
        trEl.appendChild(tdLogId);

        const tdUserId = document.createElement("td");
        tdUserId.innerText = logList[i].userId;
        trEl.appendChild(tdUserId);

        const tdType = document.createElement("td");
        tdType.innerText = logList[i].logType;
        trEl.appendChild(tdType);

        const tdPath = document.createElement("td");
        tdPath.innerText = logList[i].logPath;
        trEl.appendChild(tdPath);
        
        const tdP1 = document.createElement("td");
        tdP1.innerText = logList[i].logParam1;
        trEl.appendChild(tdP1);

        const tdP2 = document.createElement("td");
        tdP2.innerText = logList[i].logParam2;
        trEl.appendChild(tdP2);

        const tdP3 = document.createElement("td");
        tdP3.innerText = logList[i].logParam3;
        trEl.appendChild(tdP3);

        const tdTime = document.createElement("td");
        tdTime.innerText = logList[i].timeStamp;
        trEl.appendChild(tdTime);
        tableBodyEl.appendChild(trEl);
    }
}