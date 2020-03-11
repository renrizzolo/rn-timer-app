import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import store from './redux/store';

import React from 'react';
import {StyleSheet, ActivityIndicator, Text, View, Button} from 'react-native';
// import { createBrowserApp,  } from '@react-navigation/web';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/home';

import Feed from './screens/feed';
import AddTimer from './screens/addTimer';

let persistor = persistStore(store);

// const AppNavigator = createBrowserApp()

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Feed" component={Feed} />
    </MainStack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <RootStack.Navigator mode="modal">
            <RootStack.Screen
              name="Main"
              component={MainStackScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="AddTimer"
              component={AddTimer}
            />
          </RootStack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

export default RootStackScreen;
