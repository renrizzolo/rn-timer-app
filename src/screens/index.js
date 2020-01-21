import React from 'react';
import {Provider} from 'react-redux';
import {
  persistStore,
} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import {Navigation} from 'react-native-navigation';
import store from '../redux/store';
import TimersScreen from './TimersScreen';
import AddTimerScreen from './AddTimerScreen';
import { ActivityIndicator } from '../UI';
  let persistor = persistStore(store);

export function registerScreens() {
  Navigation.registerComponent('Timers', () => withRedux(TimersScreen));
  Navigation.registerComponent('AddTimer', () => withRedux(AddTimerScreen));
}
const withRedux = Component => props => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator/>} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
};
