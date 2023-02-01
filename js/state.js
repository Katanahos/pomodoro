const WORK_TIME = 0.1;
const BREAK_TIME = 0.2;
const RELAX_TIME = 0.3;
const BREAK_COUNT = 4;

export const state = {
  work: WORK_TIME,
  break: BREAK_TIME,
  relax: RELAX_TIME,
  condition: 'work',
  count: BREAK_COUNT,
  timeLeft: WORK_TIME * 60,
  isActive: false,
  timerId: 0,
};
