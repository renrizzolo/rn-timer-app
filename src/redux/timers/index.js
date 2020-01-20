import {configureStore, createSlice} from '@reduxjs/toolkit';

const timerLengthInMs = arr => {
  const m = arr.reverse().reduce((acc, curr, i) => {
    return acc + curr * Math.pow(60, i);
  }, 0);
  return m * 1000;
};

let nextTimer = 0;

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

      // createSlice uses Immer so we can use push / mutate the state in the reduce
      state.push({
        id: nextTimer++,
        text,
        description,
        timerLength: tl,
        startTime: start.toISOString(),
        endTime: endTime.toISOString(),
        cancelled: false,
        finished: false,
      });
    },
    // I want to distiguish between
    // natuarally finished and cancelled eary
    finish: (state, action) => {
      console.log('toggle', action.payload);

      const timer = state.filter(({id}) => id === action.payload.id)[0];
      if (!timer) {
        return;
      }

      timer.finished = true;
    },
    cancel: (state, action) => {
      console.log('cancel', action.payload);

      const timer = state.filter(({id}) => id === action.payload.id)[0];
      if (!timer) {
        return;
      }
      timer.cancelled = true;
    },
    remove: (state, action) => {
      console.log('remove', action.payload);

      return state.filter(({id}) => id !== action.payload.id);
    },
  },
});

export const {add, finish, cancel, remove} = timersSlice.actions;

export const store = configureStore({
  reducer: timersSlice.reducer,
});
