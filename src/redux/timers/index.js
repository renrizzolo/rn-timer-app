import {createSlice} from '@reduxjs/toolkit';
import {differenceInMilliseconds} from 'date-fns';

const timerLengthInMs = arr => {
  const m = arr.reverse().reduce((acc, curr, i) => {
    return acc + curr * Math.pow(60, i);
  }, 0);
  return m * 1000;
};

export const timersSlice = createSlice({
  name: 'timers',
  initialState: [],
  reducers: {
    add: (state, action) => {
      const {id, text, description, timerLength, timeArray} = action.payload;

      const start = new Date();
      const end = new Date();
      const tl = timerLengthInMs(timeArray);
      const endTime = new Date(end.getTime() + tl);
      const totalMS = differenceInMilliseconds(new Date(), endTime);
      // createSlice uses Immer so we can use push / mutate the state in the reduce
      state.push({
        id:
          // make a random-ish id with current time + random string
          new Date().getTime().toString(36) +
          '-' +
          Math.random()
            .toString(36)
            .substr(2, 6),
        text,
        description,
        timeArray,
        totalMS,
        timerLength: tl,
        startTime: start.toISOString(),
        endTime: endTime.toISOString(),
        paused: false,
        cancelled: false,
        cancelledAt: null,
        finished: false,
      });
    },
    // I want to distiguish between
    // natuarally finished and cancelled early
    finish: (state, action) => {
      console.log('finish', action.payload);

      const timer = state.filter(({id}) => id === action.payload.id)[0];

      timer.finished = true;
    },
    cancel: (state, action) => {
      console.log('cancel', action.payload);
      const now = new Date();
      const timer = state.filter(({id}) => id === action.payload.id)[0];
      timer.cancelled = true;
      timer.cancelledAt = now.toISOString();
    },
    pause: (state, action) => {
      console.log('pause', action.payload);
      const now = new Date();
      const timer = state.filter(({id}) => id === action.payload.id)[0];
      timer.paused = true;
      timer.pausedAt = now.toISOString();
    },
    resume: (state, action) => {
      console.log('resume', action.payload);
      const now = new Date();
      const timer = state.filter(({id}) => id === action.payload.id)[0];
      timer.paused = false;
      timer.resumedAt = now.toISOString();
      const end = timer.endTime;
      // the time between pause and resume...
      const diff = differenceInMilliseconds(
        new Date(timer.resumedAt),
        new Date(timer.pausedAt),
      );
        // ... plus the current end time = new end time
      const newEndTime = new Date(new Date(end).getTime() + diff);
      // update end time when resumed
      timer.endTime = newEndTime.toISOString();
    },
    remove: (state, action) => {
      console.log('remove', action.payload);

      return state.filter(({id}) => id !== action.payload.id);
    },
  },
});

export const {add, finish, pause, resume, cancel, remove} = timersSlice.actions;
export const {reducer} = timersSlice;
