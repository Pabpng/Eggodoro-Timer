//Imports
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const shortBreak = document.getElementById("shortBreak");
const timer = document.getElementById("timer");
const pomodoroTimer = document.getElementById("pomodoro");
const minimizeBtn = document.getElementById("minimizeBtn");
const closeBtn = document.getElementById("closeBtn");
const backWin = document.getElementById("backWindow");

//Starting Screen Buttons
const playBtn = document.getElementById("play");

//Menu Screen Buttons
const orbTimerBtn = document.getElementById("orbTimer");
const settingBtn = document.getElementById("settings");
const galleryBtn = document.getElementById("gallery");
const musicBtn = document.getElementById("music");
const backBtnMS = document.getElementById("backMenuToStart");

const backBtnOM = document.getElementById("backTimerToMenu");
const backBtnSM = document.getElementById("backSettingToMenu");
const backBtnGM = document.getElementById("backGalleryToMenu");
const backBtnMM = document.getElementById("backMusicToMenu");

//const backBtnTM = document.getElementById("backTimerToMenu");
//const backBtnSM = document.getElementById("backSettingToMenu");


//Timer Logic
let timeLeft = 25 * 60;
let selectedTime = 25 * 60;
let interval;
let isRunning = false;

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

const pomodoro = () => {
    clearInterval(interval);
    timeLeft = 25 * 60;
    selectedTime = 25 * 60;
    updateTimer();
}

const shortTimer = () => {
    clearInterval(interval);
    timeLeft = 5 * 60;
    selectedTime = 5 * 60;
    updateTimer();
}

//Starting the timer!
start.addEventListener("click", () => {
    if(!isRunning){
        startTimer();
        start.textContent = "Pause";
        isRunning = true;
    } else {
        pauseTimer();
        start.textContent = "Start";
        isRunning = false;
    }
});

//Reseting the timer!
reset.addEventListener("click", () => {
    start.textContent = "Start";
    isRunning = false;
    resetTimer();
});

//Changing to short-break timer!
shortBreak.addEventListener("click", () => {
    start.textContent = "Start";
    isRunning = false;
    shortTimer();
});

//Changing to the Pomodoro-timer!
pomodoroTimer.addEventListener("click", () => {
    start.textContent = "Start";
    isRunning = false;
    pomodoro();
});

//Minimizing the application!
minimizeBtn.addEventListener("click", () => {
    window.windowAPI.minimize();
});

//Closing the application!
closeBtn.addEventListener("click", () => {
    window.windowAPI.close();
});


// TODO: Create a page selection function

let currentScreen = "start";


const startScreen = document.querySelector(".startScreen");
const menuScreen = document.querySelector(".menuScreen");
const timerScreen = document.querySelector(".timerScreen");
const settingScreen = document.querySelector(".settingScreen");
const galleryScreen = document.querySelector(".galleryScreen");
const musicScreen = document.querySelector(".musicScreen");

function show(screen) {
    screen.style.display = "flex";
}

function hide(screen) {
    screen.style.display = "none";
}

backWin.addEventListener("click", () => {
    if(currentScreen === "menu"){
        hide(menuScreen);
        show(startScreen);
        hide(backWin);
        currentScreen = "start";
    } else if (currentScreen === "timer") {
        hide(timerScreen);
        show(menuScreen);
        currentScreen = "menu";
    } else if (currentScreen === "settings") {
        hide(settingScreen);
        show(menuScreen);
        currentScreen = "menu";
    } else if (currentScreen === "gallery") {
        hide(galleryScreen);
        show(menuScreen);
        currentScreen = "menu";
    } else if (currentScreen === "music") {
        hide(musicScreen);
        show(menuScreen);
        currentScreen = "menu";
    } else {
        return;
    }
});


//Start Screen 
playBtn.addEventListener("click", () => {
    hide(startScreen);
    show(menuScreen);
    show(backWin);
    currentScreen = "menu";
})

//Menu Screen
orbTimerBtn.addEventListener("click", () => {
    hide(menuScreen);
    show(timerScreen);
    show(backWin);
    currentScreen = "timer";
})

settingBtn.addEventListener("click", () => {
    hide(menuScreen);
    show(settingScreen);
    show(backWin);
    currentScreen = "settings";
})

galleryBtn.addEventListener("click", () => {
    hide(menuScreen);
    show(galleryScreen);
    show(backWin);
    currentScreen = "gallery";

})

musicBtn.addEventListener("click", () => {
    hide(menuScreen);
    show(musicScreen);
    show(backWin);
    currentScreen = "music";

})

// backBtnMS.addEventListener("click", () => {
//     hide(menuScreen);
//     show(startScreen);
// })

// //Timer Screen 
// backBtnOM.addEventListener("click", () => {
//     hide(timerScreen);
//     show(menuScreen);
// })

// //Setting Screen
// backBtnSM.addEventListener("click", () => {
//     hide(settingScreen);
//     show(menuScreen);
// })

// //Gallery Screen
// backBtnGM.addEventListener("click", () => {
//     hide(galleryScreen);
//     show(menuScreen);
// })

// //Music Screen
// backBtnMM.addEventListener("click", () => {
//     hide(musicScreen);
//     show(menuScreen);
// })




//TODO: Reset the timer state, whenever the display changes from section to section