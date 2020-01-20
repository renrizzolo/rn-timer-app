import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {remove, cancel, finish} from '../../redux/timers';
import {Text, View, Button, H1, H2, H3} from '../../UI';
import theme from '../../commons/theme';
const ANIMATED_DURATION = 500;
const Timer = ({timer}) => {
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);
  const [timerInterval, setTimerInterval] = useState();
  const [remaining, setRemaining] = useState('00:00:00');
  const [prettyLength, setPrettyLength] = useState();

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

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
  };
  let loopValue = new Animated.Value(0);
  const loopIn = () => {
    Animated.timing(loopValue, {
      toValue: 1,
      duration: ANIMATED_DURATION,
      easing: Easing.linear,
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
      easing: Easing.linear,
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

  useEffect(() => {
    console.log('setting useEffect interval on ', timer.id);
    let ti;
    if (timer && timer.endTime && !timer.finished) {
      ti = setInterval(() => {
        console.log('zzz it runs');

        const now = new Date();
        const startTime = new Date(timer.startTime);
        const endTime = new Date(timer.endTime);
        let timeDiff = now - startTime; //in ms
        const totalTime = endTime - startTime;
        // strip the ms

        // get seconds
        const seconds = msToTimeString(Math.round(timeDiff));
        const s = Math.round(-(now - endTime));
        const remaining = msToTimeString(s);
        const totalTimeString = msToTimeString(totalTime);
        setElapsed(seconds);
        setRemaining(remaining);
        setPrettyLength(totalTimeString);
        console.log(seconds + ' seconds');
        console.log('totalTime', totalTime);
        console.log('endTime', endTime);
        console.log('now', Date.now());
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
  }, [done, timer.finished]);
  const cancelTimer = () => {
    const {id} = timer;
    console.log('cancel id', id);
    setDone(true);
    dispatch(cancel({id}));
    // we also need to stop the timer running
    dispatch(finish({id}));

  };
  const removeTimer = () => {
    const {id} = timer;
    console.log('remove id', id);
    dispatch(remove({id}));
  };

  useEffect(() => {
    elapsed && loopIn();
    return () => {
      stopLoop();
    };
  }, [done, timer.finished]);

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
  const {id, text, startTime, endTime, timerLength, finished, cancelled} = timer;
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
        fontSize={6}
        lineHeight={6}>
        {remaining}
      </Text>

      <H2 mb={2}>{text}</H2>

      <H3 fontWeight="normal">{prettyLength} timer</H3>
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
            bg="text"
            borderRadius={99}
            lineHeight={'28px'}
            width={32}
            height={32}
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
            {' '}
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

Timer.propTypes = {};

export default Timer;
