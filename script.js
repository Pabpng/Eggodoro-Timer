/* ======================= 
   IMPORTS : BUTTONS
======================== */

//Timer Imports
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");

//Window Imports
const minimizeBtn = document.getElementById("minimizeBtn");
const closeBtn = document.getElementById("closeBtn");
const backWin = document.getElementById("backWindow");

//Start Menu Imports
const playBtn = document.getElementById("play");

//Main Menu Imports
const orbTimerBtn = document.getElementById("orbTimer");
const settingBtn = document.getElementById("settings");
const galleryBtn = document.getElementById("gallery");
const musicBtn = document.getElementById("music");

const startAudio = document.getElementById("startMusic");
const timerAudio = document.getElementById("timerMusic");

const timerSlider = document.getElementById("timerSlider");
const breakSlider = document.getElementById("breakSlider");

//const pomodoroTimer = document.getElementById("pomodoro");
//const shortBreak = document.getElementById("shortBreak");


/* Start of Timer Logic 
-
-
-
*/

let timeLeft = 25 * 60;
let breakTime = 5 * 60;
let selectedTime = 25 * 60;
let interval;
let isRunning = false;
let intermission = false;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft % 60);

    timer.innerHTML = 
    `${minutes.toString().padStart(2, "0")} 
    : 
    ${seconds.toString().padStart(2, "0")}`;
};

const startTimer = () => {
    if(isRunning) return;

    isRunning = true;

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if(timeLeft < 0) {
            clearInterval(interval);
            alert("Good Work!");
            timeLeft = selectedTime;
            updateTimer();
        }
    }, 1000)
};

//Pause Timer Function
const pauseTimer = () => {
    clearInterval(interval);
}

const resetTimer = () => {
    clearInterval(interval);
    timeLeft = selectedTime;
    updateTimer();
}


timerSlider.addEventListener("input", (e) => {
    let minutes = parseInt(e.target.value);
    timeLeft = minutes * 60;
    selectedTime = minutes * 60;
    updateTimer();
})

//Rest period to automatically start once the main timer finishes
breakSlider.addEventListener("input", (e) => {
    let minutes = parseInt(e.target.value);
    breakTime = minutes * 60;
    updateTimer();
})


/* End of Timer Logic 
-
-
-
*/

//Starting the timer!
start.addEventListener("click", () => {
    if(!isRunning){
        startTimer();
        start.textContent = "Pause";
        isRunning = true;
        timerAudio.muted = false;
        timerAudio.play()
    } else {
        pauseTimer();
        start.textContent = "Start";
        isRunning = false;
        timerAudio.muted = true;
        timerAudio.pause();
        timerAudio.currentTime = 0;
    }
});

//Reseting the timer!
reset.addEventListener("click", () => {
    start.textContent = "Start";
    isRunning = false;
    resetTimer();
});


//Minimizing the application!
minimizeBtn.addEventListener("click", () => {
    window.windowAPI.minimize();
});

//Closing the application!
closeBtn.addEventListener("click", () => {
    window.windowAPI.close();
});



function show(button) {
    button.style.display = "flex";
}

function hide(button) {
    button.style.display = "none";
}
//New Screen Function

function showScreen(name) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.querySelector(`.${name}`).classList.add("active");
}

let currentScreen = "start";

backWin.addEventListener("click", () => {
    if(currentScreen === "menu"){
        showScreen("startScreen");
        hide(backWin);
        currentScreen = "start";
        startAudio.muted = false;
        startAudio.play();
    } else if (currentScreen === "timer") {
        showScreen("menuScreen");
        currentScreen = "menu";
        isRunning = false;
        resetTimer();
        start.textContent = "Start";
    } else if (currentScreen === "settings") {
        showScreen("menuScreen");
        currentScreen = "menu";
    } else if (currentScreen === "gallery") {
        showScreen("menuScreen");
        currentScreen = "menu";
    } else if (currentScreen === "music") {
        showScreen("menuScreen");
        currentScreen = "menu";
    } else {
        return;
    }
});


//Start Screen 
playBtn.addEventListener("click", () => {
    showScreen("menuScreen");
    show(backWin);
    currentScreen = "menu";
    startAudio.muted = true;
    startAudio.pause();
    startAudio.currentTime = 0;
})

//Menu Screen
orbTimerBtn.addEventListener("click", () => {
    showScreen("timerScreen");
    show(backWin);
    currentScreen = "timer";
})

settingBtn.addEventListener("click", () => {
    showScreen("settingScreen");
    show(backWin);
    currentScreen = "settings";
})

galleryBtn.addEventListener("click", () => {
    showScreen("galleryScreen");
    show(backWin);
    currentScreen = "gallery";
})

musicBtn.addEventListener("click", () => {
    showScreen("musicScreen");
    show(backWin);
    currentScreen = "music";
})

/* Slider Button Function 
-
-
-
*/



//TODO: Create sliders in the settings that adjusts the Timer,
//The Rest time and the volume of the app.

//TODO: Add music to the app and the slider in settings can adjust the volume.
//Add a few selections of music in the music page.

//Cosmetic

//TODO: Figure out the html nested structure for what's best suited when 
//Developing the application aesthetics and animation

//TODO: Redesign the version app into something a bit more colourful
//and intriguing 


//Fixes:

//When the timer finishes, the rest timer should start straight away.

//Create a separate rest timer, so when the timer is changed in settings it doesn't affect the main timer screen.

//When the user wants to leave the timer page, send out a pop out prompt if they.