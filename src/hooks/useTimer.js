import {useEffect, useState, useMemo} from 'react';
import {formatRelative} from 'date-fns';

const pad = n => {
  return ('00' + n).slice(-2);
};

const unPad = (n, u) => {
 return n === 0 ? '' : `${n}${u}`
}

const msToTimeString = s => {
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  const hrs = (s - mins) / 60;
  unPad(hrs)
  return unPad(hrs, 'h') + unPad(mins, 'm') + unPad(secs, 's');
};

const useTimer = ({endTime, startTime, cancelledAt, timerLength, timeArray}) => {
  const [timerData, setTimerData] = useState({});
  useEffect(() => {
    const lengthPretty = msToTimeString(timerLength);
    setTimerData({
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      endRelative: formatRelative(
        new Date(cancelledAt ? cancelledAt : endTime),
        new Date(),
      ),
      lengthPretty,
    });
  }, [endTime, startTime, cancelledAt]);
  return timerData;
};

export default useTimer;
