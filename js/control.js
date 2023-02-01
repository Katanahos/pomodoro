import { state } from "./state.js";

const btnStart = document.querySelector(".control__btn_start");
const btnStop = document.querySelector(".control__btn_stop");
const btnsNavigation = document.querySelectorAll(".navigation__btn");
const pomodoroCount = document.querySelector(".count_num");
const minuteElem = document.querySelector(".time__minutes");
const secondElem = document.querySelector(".time__seconds");
const audio = {
  work: new Audio("audio/to-be-continued.mp3"),
  break: new Audio("audio/san-andreas.mp3"),
  relax: new Audio("audio/ya-zvezda.mp3"),
};

export const initControl = () => {
  btnStart.addEventListener("click", start);
  btnStop.addEventListener("click", stop);
  changeTimer();

  showTime(state.timeLeft);
};

const changeTimer = () => {
  for (let i = 0; i < btnsNavigation.length; i++) {
    btnsNavigation[i].addEventListener("click", () => {
      removeActive(btnsNavigation);
      btnsNavigation[i].classList.add("navigation__btn_active");
      state.condition = btnsNavigation[i].dataset.use;
      state.timeLeft = state[state.condition] * 60;
      showTime(state.timeLeft);
    });
  }
};

const removeActive = ([]) => {
  for (let i = 0; i < btnsNavigation.length; i++) {
    btnsNavigation[i].classList.remove("navigation__btn_active");
  }
};

const changeActiveBtn = (dataUse) => {
  for (let i = 0; i < btnsNavigation.length; i++) {
    if (btnsNavigation[i].dataset.use === dataUse) {
      btnsNavigation[i].classList.add("navigation__btn_active");
    } else {
      btnsNavigation[i].classList.remove("navigation__btn_active");
    }
  }
};

const start = () => {
  if (state.isActive) {
    clearTimeout(state.timerId);
    state.isActive = false;
    btnStart.textContent = "Старт";
  } else {
    state.isActive = true;
    btnStart.textContent = "Пауза";
    startTimer();
  }
};

const stop = () => {
  clearTimeout(state.timerId);
  stopAlarm();
  state.isActive = false;
  btnStart.textContent = "Старт";
  state.timeLeft = state[state.condition] * 60;
  showTime(state.timeLeft);
};

const breaks = () => {
  if (state.condition === "work") {
    state.activeTodo.pomodoro++;
    pomodoroCount.textContent = state.activeTodo.pomodoro;
    if (state.activeTodo.pomodoro % state.count) {
      state.condition = "break";
    } else {
      state.condition = "relax";
    }
  } else {
    state.condition = "work";
  }
  state.timeLeft = state[state.condition] * 60;
  changeActiveBtn(state.condition);
  startTimer();
};

const addZero = (n) => (n < 10 ? "0" + n : n);

const showTime = (seconds) => {
  minuteElem.textContent = addZero(Math.floor(seconds / 60));
  secondElem.textContent = addZero(seconds % 60);
};

const alarm = () => audio[state.condition].play();
const stopAlarm = () => audio[state.condition].pause();

const startTimer = () => {
  if (state.timeLeft <= 0) {
    breaks();
    alarm();
  } else {
    state.timeLeft--;

    showTime(state.timeLeft);

    if (state.timeLeft >= 0 && state.isActive) {
      state.timerId = setTimeout(startTimer, 1000);
    }
  }
};
