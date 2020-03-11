import React, {useEffect, useState} from 'react';
import {Animated, Easing, UIManager, LayoutAnimation} from 'react-native';
import {useSelector} from 'react-redux';
import Timer from '../../components/Timer';
import {Text, View, Button, H1, H2, H3} from '../../UI';
import Root from '../../components/Root';

// how far button will translateY
const HIDE_OFFSET = 125;
// how much scroll is needed to
// make the button travel HIDE_OFFSET
const HIDE_SCROLL_AMT = 50;

const Home = ({navigation}) => {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

  let _deltaY = new Animated.Value(0);
  // credit https://medium.com/@andi.gu.ca/a-collapsing-navbar-with-tabs-in-react-native-e80790588830
  let clamp = Animated.multiply(
    Animated.diffClamp(_deltaY, 0, HIDE_SCROLL_AMT),
    -1,
  );

  const {timers} = useSelector(state => state);

  useEffect(() => {
    LayoutAnimation.spring();

    return () => {};
  }, [timers.length]);

  // hacky way to rest the 
  // add button position on changes
  // but I changed it to hiding
  // on scroll down instead of up
  // so this isn't neede
  // useEffect(() => {
  //   Animated.timing(_deltaY, {
  //     toValue: HIDE_OFFSET,
  //     duration: 350,
  //     useNativeDriver: true,
  //   }).start();
  // }, [timers]);
  const addTimer = () => {
    // Navigation.showModal({
    //   stack: {
    //     children: [
    //       {
    //         component: {
    //           name: 'AddTimer',
    //           // passProps: {
    //           //   state,
    //           // },
    //           options: {
    //             layout: {
    //               componentBackgroundColor: 'transparent',
    //             },
    //             modalPresentationStyle: 'overCurrentContext',
    //             topBar: {
    //               visible: false,
    //               drawBehind: true,
    //             },
    //             animations: {
    //               showModal: {
    //                 alpha: {
    //                   from: 0,
    //                   to: 1,
    //                   duration: 400,
    //                   startDelay: 0,
    //                   interpolation: 'accelerate',
    //                 },
    //               },
    //               dismissModal: {
    //                 alpha: {
    //                   from: 1,
    //                   to: 0,
    //                   duration: 400,
    //                   startDelay: 0,
    //                   interpolation: 'accelerate',
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //     ],
    //   },
    // });
    navigation.navigate('AddTimer')
  };
  const st = clamp.interpolate({
    inputRange: [-HIDE_SCROLL_AMT, -(HIDE_SCROLL_AMT / 2), 0],
    outputRange: [HIDE_OFFSET, HIDE_OFFSET / 3, 0],
    extrapolate: 'clamp',
  });

  return (
    <Root
      bg={'background'}
      as={Animated.ScrollView}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {y: _deltaY},
            },
          },
        ],
        {useNativeDriver: true},
      )}
      afterScrollView={() => (
        <View
          as={Animated.View}
          style={{
            position: 'absolute',
            transform: [{translateY: st}],
          }}
          bottom={2}
          alignSelf="center">
          <Button
            borderColor="text"
            borderWidth={1}
            bg="secondary"
            onPress={addTimer}
            fontSize={4}
            width={64}
            height={64}
            textAlign="center"
            alignSelf="center"
            mt={'auto'}>
            +
          </Button>
        </View>
      )}>
      <H1>Timers</H1>
      <H3 fontWeight="normal">These are your timers</H3>
      {[...timers]
        // sort by recently created
        .reverse()
        // push finished timers to bottom
        .sort((a, b) => {
          return a.finished - b.finished;
        })
        .map((timer, i) => (
          <Timer key={timer.id} timer={timer} />
        ))}
    </Root>
  );
};
export default Home;
