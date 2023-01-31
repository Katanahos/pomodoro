import { state } from "./state.js";

const btnStart = document.querySelector('.control__btn_start');
const minuteElem = document.querySelector('.time__minutes');
const secondElem = document.querySelector('.time__seconds');
const audio = new Audio('audio/to-be-continued.mp3');

export const initControl = () => {
    btnStart.addEventListener('click', () => {
        if (state.isActive) {
            clearTimeout(state.timerId);
            state.isActive = false;
            btnStart.textContent = 'Старт';
        } else {
            state.isActive = true;
            btnStart.textContent = 'Пауза';
            startTimer();
        }
    });
}

const showTime = (seconds) => {
    if (seconds > 599) {
        minuteElem.textContent = Math.floor(seconds / 60);
    } else {
        minuteElem.textContent = '0' + Math.floor(seconds / 60);
    }
    if ((seconds % 60) > 9) {
        secondElem.textContent = seconds % 60;
    } else {
        secondElem.textContent = '0' + seconds % 60;
    }
}

const alarm = () => {
    audio.play();
}

const startTimer = () => {
    if (state.timeLeft <= 0) {
        alarm();
    } else {
        state.timeLeft--;

        showTime(state.timeLeft);

        if (state.timeLeft >= 0 && state.isActive) {
            state.timerId = setTimeout(startTimer, 1000);
        }
    }
}

