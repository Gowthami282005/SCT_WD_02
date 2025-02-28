let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let lapCount = 0;

const display = document.querySelector(".display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.querySelector(".laps");

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    
    let totalMilliseconds = elapsedTime;
    let hours = Math.floor(totalMilliseconds / 3600000);
    let minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    let seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    
    display.innerHTML = 
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;
}

function startPause() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 1000);
        startPauseBtn.textContent = "Pause";
        startPauseBtn.classList.add("pause");
        lapBtn.disabled = false;
    } else {
        clearInterval(timer);
        startPauseBtn.textContent = "Start";
        startPauseBtn.classList.remove("pause");
        lapBtn.disabled = true;
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    display.innerHTML = "00:00:00";
    startPauseBtn.textContent = "Start";
    startPauseBtn.classList.remove("pause");
    lapBtn.disabled = true;
    lapList.innerHTML = "";
    lapCount = 0;
}

function recordLap() {
    lapCount++;
    const lapTime = document.createElement("li");
    lapTime.textContent = `Lap ${lapCount}: ${display.innerHTML}`;
    lapList.appendChild(lapTime);
}

// Event Listeners
startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);
