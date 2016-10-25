var startStopChange = 'Start';
var pauseTimeDisplay = 0;
var count = 0;
var timerId = 0;
var on_timer;  // for on/off setInterval
var on_display;  // for on/off setInterval
var BEGIN_TIME = 0; // const
var currentTime = 0;
var splitTime = 0;
var split_counter = 0;
var stop_counter = 0;
var mls =0;

function startCounter() {
    cData = new Date();
    currentTime = cData.getTime();
    count = currentTime - BEGIN_TIME;
};

function view_display() {
    var t = parseInt(count);
    var milliseconds = Math.floor((t % 1000)) + 000;
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    //display mast have 2 digits for sec, min and 3 - for milliseconds
    milliseconds = (milliseconds < 10 ? '00' + milliseconds : milliseconds);
    milliseconds = (milliseconds < 100 ? '0' + milliseconds : milliseconds);
    seconds = (seconds < 10 ? '0' + seconds : seconds);
    minutes = (minutes < 10 ? '0' + minutes : minutes);
    hours = (hours < 10 ? '0' + hours : hours);
    timerId = hours + ":" + minutes + ":" + seconds + ":"; // after + milliseconds
    document.getElementById('display-id').value = timerId;
    document.getElementById('display-id-mls').value =  milliseconds;
    mls = milliseconds;
};

function startOn() {
    data = new Date();
    BEGIN_TIME = data.getTime() - pauseTimeDisplay;
    on_timer = setInterval("this.startCounter()", 6);
    on_display = setInterval("this.view_display()", 12);
    startStopChange = ( startStopChange == 'Start' ? 'Pause' : 'Start');
    document.getElementById('start_stop_btn').setAttribute("value", startStopChange);
};

function startOff() {
    pauseTimeDisplay = currentTime - BEGIN_TIME;
    clearInterval(on_timer);
    clearInterval(on_display);
    startStopChange = ( startStopChange == 'Start' ? 'Pause' : 'Start');
    document.getElementById('start_stop_btn').setAttribute("value", startStopChange);
    // add DOM element
    var insertPause = document.createElement('p');
    insertPause.classList.add('pause_p');
    insertPause.innerHTML = 'Stop' + (++stop_counter) + " : " + timerId + mls;
    var parent = document.getElementById('wrapper');
    parent.appendChild(insertPause);
};

function onOff() {
    if (startStopChange == 'Start') {
        return startOn();
    } else {
        return startOff();
    }
};

function onOffSplit() {
    if (startStopChange == 'Start') {
        return 0;   //button Split is block
    } else {
        return splitClock();  //button Split is ready
    }
};

function splitClock() {
    d = new Date();
    currentTime = d.getTime();
    splitTime = currentTime - BEGIN_TIME;
    var t = parseInt(splitTime);

    var milliseconds = Math.floor((t % 1000));
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    //display mast have 2 digits for sec, min, h, day
    milliseconds = (milliseconds < 10 ? '00' + milliseconds : milliseconds);
    milliseconds = (milliseconds < 100 ? '0' + milliseconds : milliseconds);
    seconds = (seconds < 10 ? '0' + seconds : seconds);
    minutes = (minutes < 10 ? '0' + minutes : minutes);
    hours = (hours < 10 ? '0' + hours : hours);
    timeForSplit = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
    console.log('timeForSplit=' + timeForSplit);
    // add DOM element
    var insertSplit = document.createElement('p');
    insertSplit.classList.add('split_p');
    insertSplit.innerHTML = 'Split' + (++split_counter) + " : " + timeForSplit;
    var parent = document.getElementById('wrapper');
    parent.appendChild(insertSplit);
};

function clearСlock() {
    startStopChange = 'Start';
    split_counter = 0;
    splitTime = 0;
    stop_counter = 0;
    count = 0;
    mls =0;
    timerId = 0;
    pauseTimeDisplay = 0;
    clearInterval(on_timer);
    clearInterval(on_display);
    document.getElementById('display-id').value = "00:00:00.";
    document.getElementById('display-id-mls').value = "000";
    document.getElementById('start_stop_btn').setAttribute("value", startStopChange);
    // remove DOM element
    var elements = document.querySelectorAll('.split_p');
    var elements_p = document.querySelectorAll('.pause_p');
    var parent = document.getElementById('wrapper');
    for (var i = 0; i < elements.length; i++) {
        parent.removeChild(elements[i]);
    }
    for (var i = 0; i < elements_p.length; i++) {
        parent.removeChild(elements_p[i]);
    }
};

// buttons
document.getElementById('start_stop_btn').addEventListener("click", onOff);
document.getElementById('reset_btn').addEventListener("click", clearСlock);
document.getElementById('split_btn').addEventListener("click", onOffSplit);
