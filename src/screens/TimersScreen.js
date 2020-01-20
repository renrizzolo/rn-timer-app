import React, {useEffect} from 'react';
import {UIManager, LayoutAnimation} from 'react-native';
import {useSelector} from 'react-redux';
import Timer from '../components/Timer';
import {Text, Button, H1, H2, H3} from '../UI';
import Root from '../components/Root';
import {Navigation} from 'react-native-navigation';

const TimersScreen = () => {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  const timers = useSelector(state => state);
  useEffect(() => {
    LayoutAnimation.spring();

    return () => {};
  }, [timers.length]);
  const addTimer = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'AddTimer',
              // passProps: {
              //   state,
              // },
              options: {
                layout: {
                  componentBackgroundColor: 'transparent',
                },
                modalPresentationStyle: 'overCurrentContext',
                topBar: {
                  visible: false,
                  drawBehind: true,
                },
                animations: {
                  showModal: {
                    alpha: {
                      from: 0,
                      to: 1,
                      duration: 400,
                      startDelay: 0,
                      interpolation: 'accelerate',
                    },
                  },
                  dismissModal: {
                    alpha: {
                      from: 1,
                      to: 0,
                      duration: 400,
                      startDelay: 0,
                      interpolation: 'accelerate',
                    },
                  },
                },
              },
            },
          },
        ],
      },
    });
  };
  return (
    <Root>
      <H1>Timers</H1>
      <H3 fontWeight="normal">These are your current timers</H3>
      {timers
        .map((timer, i) => timer)
        .sort((a, b) => b > a)
        .map((timer, i) => (
          <Timer key={timer.id} timer={timer} />
        ))}

      <Button
        onPress={addTimer}
        fontSize={4}
        width={64}
        height={64}
        textAlign="center"
        alignSelf="center"
        mt={'auto'}>
        +
      </Button>
    </Root>
  );
};
export default TimersScreen;
