import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {remove, cancel, finish} from '../../redux/timers';
import {Text, View, Button, H1, H2, H3} from '../../UI';
import theme from '../../commons/theme';
const ANIMATED_DURATION = 300;

const Timer = ({timer}) => {
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);
  const [remaining, setRemaining] = useState('00:00:00');
  const [prettyLength, setPrettyLength] = useState();
  const [prettyCancelledAt, setPrettyCancelledAt] = useState();

  const [elapsed, setElapsed] = useState(0);

  const pad = n => {
    return ('00' + n).slice(-2);
  };
  const msToTimeString = s => {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) // + ':' + pad(ms);
  };

  let loopValue = new Animated.Value(0);
  const loopIn = () => {
    Animated.timing(loopValue, {
      toValue: 1,
      duration: ANIMATED_DURATION,
      easing: Easing.ease,
    }).start(event => {
      if (event.finished) {
        // loop it
        loopOut();
      }
    });
  };
  const stopLoop = () => {
    Animated.timing(loopValue, {
      toValue: 0,
      duration: ANIMATED_DURATION,
      easing: Easing.ease,
    }).stop();
  };
  const loopOut = () => {
    Animated.timing(loopValue, {
      toValue: 0,
      duration: ANIMATED_DURATION,
      easing: Easing.linear,
    }).start(event => {
      if (event.finished) {
        // loop it
        loopIn();
      }
    });
  };
  const doTimeStuff = () => {
    const now = new Date();
    const startTime = new Date(timer.startTime);
    const endTime = new Date(timer.endTime);
    let timeDiff = now - startTime; //in ms
    const totalTime = endTime - startTime;

    // get seconds
    const seconds = msToTimeString(Math.round(timeDiff));

    const totalTimeString = msToTimeString(totalTime);
    setElapsed(seconds);
    setPrettyLength(totalTimeString);

    const s = Math.round(-(now - endTime));
    // don't display a negative
    // remaining time if already finished
    // (could also just check timer.finished)
    if (s > 0) {
      const remaining = msToTimeString(s);
      setRemaining(remaining);
    }
    if (timer.cancelledAt) {
      // make sure the remaining time comes
      // from the cancelled time
      console.log('cancelled at', timer.cancelledAt);
      const cancelled = new Date(timer.cancelledAt);
      const diff = endTime - cancelled;
      const str = msToTimeString(diff);
      setRemaining(str);

    }
  };
  useEffect(() => {
    console.log('setting useEffect interval on ', timer.id);
    let ti;
    if (timer && timer.endTime && !timer.finished) {
      // not really sure how reliable it is
      // having a lot of intervals running at once
      // (change the interval duration to 1 and try adding a timer, it's
      // pretty obvious how blocking this is to the UI)
      ti = setInterval(() => {
        console.log('zzz it runs');
        const endTime = new Date(timer.endTime);

        doTimeStuff();
        if (Date.now() >= endTime) {
          console.log('it has ended', id);
          setDone(true);
          loopIn();
          dispatch(finish({id: timer.id}));
        }
      }, 1000);
    }
    console.log('interval id', ti);

    return () => {
      console.log('clearing interval', ti);

      clearInterval(ti);
    };
  }, [timer.finished]);
  const cancelTimer = () => {
    const {id} = timer;
    console.log('cancel id', id);
    // setDone(true);
    dispatch(cancel({id}));
    // we also need to stop the timer running
    dispatch(finish({id}));
  };
  const removeTimer = () => {
    const {id} = timer;
    console.log('remove id', id);
    dispatch(remove({id}));
  };
  // timeArray map function
  const timeArrayToHMS = (t, i) => {
    if ( t == '00') {
      return;
    }
    // this doesn't convert
    // 60 + seconds / minutes to 1 minute / hour
    // (neither does the number pad though, 
    // so it's consistent with that...)
    let s = '';
    switch (i) {
      case 0:
        s = 'h';
        break;
      case 1:
        s = 'm';
        break;
      case 2:
        s = 's';
        break;
      default:
        break;
    }
    return `${t}${s}`;
  };
  useEffect(() => {
    elapsed && loopIn();
    return () => {
      stopLoop();
    };
  }, [timer.finished]);

  useEffect(() => {
    // calculate timer length etc.
    // on mount in case timer already
    // finished (thus no interval set)
    doTimeStuff();
  }, []);

  const loop = loopValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.secondary, theme.colors.primaryLight],
    //  extrapolate: 'clamp',
  });
  const fade = loopValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    // extrapolate: 'clamp',
  });
  const {
    id,
    text,
    startTime,
    endTime,
    timerLength,
    timeArray,
    finished,
    cancelled,
  } = timer;
  return (
    <View
      as={Animated.View}
      width={1}
      mb={3}
      bg={'backgroundDark'}
      // style={{backgroundColor: loop, width: '100%'}}
      p={3}
      borderRadius={1}>
      <Text
        as={Animated.Text}
        style={{opacity: fade}}
        color={finished || cancelled ? 'text' : 'secondary'}
        fontWeight="bold"
        fontSize={finished ? 4 : 6}
        lineHeight={6}>
        {remaining}
      </Text>

      <H2 mb={1} fontSize={finished ? 3 : undefined}>
        {text}
      </H2>

      <H3 fontWeight="normal" mb={1}>
        {timeArray &&
          [...timeArray].reverse().map(timeArrayToHMS)}{' '}
        timer{' '}
        {finished && (
          <Text fontSize={1}>
            started: {new Date(startTime).toLocaleTimeString()}
          </Text>
        )}
      </H3>

      {/* <Text mb={0}>
          started: {new Date(startTime).toLocaleTimeString()} ends at:{' '}
          {new Date(endTime).toLocaleTimeString()}
        </Text>

        <Text>Elapsed: {elapsed}</Text> */}
      <View
        flexDirection="row"
        alignItems="flex-end"
        justifyContent="space-between">
        {finished && !cancelled ? (
          <Text
            mb={0}
            p={0}
            color="success"
            bg="background"
            borderRadius={99}
            lineHeight={'28px'}
            width={32}
            height={32}
            onPress={() => setDone(true)}
            textAlign="center">
            ✓
          </Text>
        ) : cancelled ? (
          <Text
            mb={0}
            px={2}
            color="warning"
            bg="text"
            borderRadius={99}
            lineHeight={'28px'}
            textAlign="center">
            cancelled
          </Text>
        ) : (
          <Button
            px={2}
            py={1}
            mr={1}
            alignSelf={'flex-start'}
            alignItems={'center'}
            justifyContent={'center'}
            textAlign={'center'}
            onPress={cancelTimer}>
            Cancel
          </Button>
        )}
        <Button
          px={2}
          py={1}
          justiftySelf={'flex-end'}
          alignItems={'center'}
          justifyContent={'center'}
          textAlign={'center'}
          onPress={removeTimer}>
          Remove
        </Button>
      </View>
    </View>
  );
};

Timer.propTypes = {
  timer: PropTypes.object,
};

export default Timer;
