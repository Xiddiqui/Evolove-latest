import App from '../app';
import CoachApp from '../coachApp';
import AuthApp from '../auth';
import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();
const AppNavigation = () => {
  return ( 
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name={'Auth'} component={AuthApp} />
        <AppStack.Screen name={'App'} component={App} />
        <AppStack.Screen name={'CoachApp'} component={CoachApp} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;