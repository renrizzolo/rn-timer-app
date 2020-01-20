import React from 'react';
import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import { store } from '../redux/timers'
import TimersScreen from './TimersScreen';
import AddTimerScreen from './AddTimerScreen';

export function registerScreens() {
  Navigation.registerComponent('Timers', () => withRedux(TimersScreen));
  Navigation.registerComponent('AddTimer', () => withRedux(AddTimerScreen));
}

const withRedux = Component => (props) => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
);