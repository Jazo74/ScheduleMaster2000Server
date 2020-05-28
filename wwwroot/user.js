const loginButton = document.querySelector('#login-button');
const loginUserId = document.querySelector('#user-id');
const loginPassword = document.querySelector('#password');
const logoutLinkEl = document.querySelector('#link-logout');
const regUserIdEL = document.querySelector('#reg-userid');
const regNickNameEL = document.querySelector('#reg-nickname');
const regPasswordEL = document.querySelector('#reg-password');
const regButtonEL = document.querySelector('#reg-button');

const userNameEl = document.querySelector('#user-name');
logoutLinkEl.addEventListener('click', logoutRequest);

// User login
function loginRequest() {
    if (loginUserId.value != "" && loginPassword.value != "") {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', loginDone);
        xhr.open('POST', serverURL + '/api/Users/Login');
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.withCredentials = true; // pass along cookies
        const loginData = `userId=${loginUserId.value}&password=${loginPassword.value}`;
        xhr.send(loginData);
    } else {
        alert("Please fill the form");
    }
    
}

function loginDone() {
    user = JSON.parse(this.responseText);
    if (user.userId != 'fakeuser@fakeuser.com') {
        currentUserID = user.userId;
        currentUserNickname = user.nickName;
        loginPanelEl.style.display = 'none';
        mainPanelEl.style.display = 'grid';
        greetingEl.innerText = `Welcome ${currentUserNickname}!`;
        regUserIdEL.value = '';
        regNickNameEL.value = '';
        regPasswordEL.value = '';
        loginUserId.value = '';
        loginPassword.value = '';
        tasksLinkEl.innerText = 'Tasks';
        schedLinkEl.innerText = 'Schedules';
        logoutLinkEl.innerText = 'Logout';
        openSchedPanel();
    } else {
        alert('Wrong email or password');
    }
}


// User registration
function regRequest() {
    if (regUserIdEL.value != "" && regPasswordEL.value != "" && regNickNameEL.value != "") {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', regDone);
        xhr.open('POST', serverURL + '/api/Users/Register');
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.withCredentials = true; // pass along cookies
        const loginData = `userId=${regUserIdEL.value}&password=${regPasswordEL.value}&nickName=${regNickNameEL.value}`;
        xhr.send(loginData);
    } else {
        alert("Please fill the form");
    }
    
}

function regDone() {
    alert('user has registered');
    regUserIdEL.value = '';
    regNickNameEL.value = '';
    regPasswordEL.value = '';
    loginUserId.value = '';
    loginPassword.value = '';
}

function logoutRequest() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', logoutDone);
    xhr.open('GET', serverURL + '/api/Users/Logout');
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.withCredentials = true; // pass along cookies
    xhr.send();
}

function logoutDone() {
    logoutHideElements();
    currentSchedulesJSON = [];
    currentScheduleJSON = '';
    currentDaysJSON = [];
    currentSlotsJSON = [];
    currentScheduleId = '';
    currentDaysIds = [];
    currentUserID = 'nouser@nouser.net';
    currentUserNickname = 'nouser'; 
}





