
const activeTimers = document.getElementById('activeTimers');

displayNoTimersText();


const startTimerButton = document.getElementById('startTimer');

let isTimerActive = false;


startTimerButton.addEventListener('click', () => {
    
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds > 0) {
       
        createTimer(totalSeconds);
    
        isTimerActive = true;
        
        removeNoTimersText();
    } else {
        alert("Please enter a valid time.");
    }
});


function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')} hr : ${m.toString().padStart(2, '0')} min : ${s.toString().padStart(2, '0')} sec`;
}


function createTimer(totalSeconds) {
    
    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timer-container');

    
    const timeLeftElement = document.createElement('div');
    timeLeftElement.classList.add('time-left');
    timeLeftElement.textContent = 'Time Left:';

    
    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');

    
    const timerControls = document.createElement('div');
    timerControls.classList.add('timer-controls');

   
    const stopButton = document.createElement('button');
    stopButton.classList.add('control-button', 'stop-button');
    stopButton.textContent = 'Stop Timer';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('control-button', 'delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.display = 'none'; 

    let timerInterval;

    
    function updateTimerDisplay() {
        totalSeconds--;
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerElement.classList.add('timer-ended');
            timerElement.textContent = "Time is up!";
            stopButton.style.display = 'none'; 
            deleteButton.style.display = 'inline'; 
            timeLeftElement.style.display = 'none';
            
            playAudioAlert();
        } else {
            timerElement.textContent = formatTime(totalSeconds);
        }
    }


    stopButton.addEventListener('click', () => {
      
        clearInterval(timerInterval);
        timerContainer.remove();
        isTimerActive = false; 
       
        if (activeTimers.children.length === 0) {
            displayNoTimersText();
        }
    });

    
    deleteButton.addEventListener('click', () => {
        
        timerContainer.remove();
       
        if (activeTimers.children.length === 0) {
            displayNoTimersText();
        }
    });

  
    timerInterval = setInterval(updateTimerDisplay, 1000);

   
    timerControls.appendChild(stopButton);
    timerControls.appendChild(deleteButton);

   
    timerContainer.appendChild(timeLeftElement);
    timerContainer.appendChild(timerElement);
    timerContainer.appendChild(timerControls);

    activeTimers.appendChild(timerContainer);
}


function displayNoTimersText() {
    const noTimersText = document.createElement('p');
    noTimersText.classList.add('no-timers-text');
    noTimersText.textContent = 'You have no timers currently!';
    noTimersText.style.fontSize = "14px";
    activeTimers.appendChild(noTimersText);
}


function removeNoTimersText() {
   
    const noTimersText = activeTimers.querySelector('.no-timers-text');
    if (noTimersText) {
        noTimersText.remove();
    }
}


function playAudioAlert() {
    const audio = new Audio('alert.mp3'); 
    audio.play();
}