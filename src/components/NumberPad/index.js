import React, {useState, useMemo} from 'react';
import {View, Text, Button} from '../../UI';
const NumberPad = ({setForm, form, settings, error}) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];



  const initialTime = () => {
    let val = '';
    for (let i = 0; i < settings.timerLength; i++) {
      console.log('calculating initialTime', i);
      
      val += '0';
    }
    return val;
  };

  const initTime = useMemo(initialTime, [settings.timerLength]);
  const [time, setTime] = useState(initTime);
  const [count, setCount] = useState(0);
  const [timeArray, setTimeArray] = useState(['00', '00', '00']);

  const prettifyTime = timeArray => {
    let val = '';
    timeArray.map((n, i) => (i > 0 ? (val += ':' + n) : (val += n)));
    return val;
  };

  const [prettyTime, setPrettyTime] = useState(prettifyTime(timeArray));

  const onPress = num => {
    if (count === settings.timerLength) {
      return;
    }
    setCount(count + 1);
    const t = time.slice(1, settings.timerLength) + num;
    console.log(
      'time before set',
      time,
      t,
    );

    setTime(t);
    console.log('time after set', time);

    update(t);

  };
  const del = () => {
    if (count === 0) {
      return;
    }
    setCount(count - 1);

    const sliceEnd = settings.timerLength - 1;
    const t = 0 + time.slice(0, sliceEnd);
    setTime(t);
    update(t);
  };

  const reset = () => {
    setTime(initTime);
    setCount(0);
    update(initTime);
  };

  const update = (t) => {
    console.log('time now', t);
    // split string at every 2nd digit
    const splitArray = t
      .split(/(\d{2})/)
      // trims the empty array items (why tho)
      .filter(Boolean);
    setTimeArray(splitArray);

    const timeString = prettifyTime(splitArray);
    setPrettyTime(timeString);

    setForm({
      ...form,
      timerLength: t,
      timeArray: splitArray,
    });
  };



  const set = n => {
    // if (form.timerLength && form.timerLength.length > 5) {
    //   console.log('too long', form.timerLength);

    //   return;
    // }
    setForm({
      ...form,
      timerLength: time,
    });
  };
  // const del = () => {
  //     setForm({
  //       ...form,
  //       timerLength: `${form.timerLength ? form.timerLength.slice(0, form.timerLength.length - 1) : ''}`,
  //     });
  // }

  return (
    <View>
      <Text
      my={2}
        textAlign="center"
        fontWeight="bold"
        fontFamily="monospace"
        fontSize={5}
        lineHeight={5}
        color={error ? 'crimson' : 'text'}
        accessibilityLabel="Time">
        {prettyTime}
      </Text>
      <View flexDirection="row" justifyContent="space-between" flex={1} mb={2}>
        <Button bg="transparent" native onPress={reset}>
        reset
        </Button>
        <Button bg="transparent" native onPress={del}>
          del
        </Button>
      </View>
      <View
        // flex={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap">
        {numbers.map(n => (
          <Button
            key={n}
            onPress={() => onPress(n)}
            p={0}
            m={1}
            flexBasis={70}
            bg="secondary"
            width={40}
            height={60}
            borderRadius={99}
            alignItems="center"
            justifyContent="center">
            <Text p={0} m={0} testID={`num-${n}`}>
              {n}
            </Text>
          </Button>
        ))}
      </View>
    </View>
  );
};

NumberPad.defaultProps = {
  settings: {
    timerLength: 6,
  }
}
export default NumberPad;
