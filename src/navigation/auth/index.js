/** @format */

import {
    Splash,
    IntroScreen,
    Login,
    SignUp,
    Forgot,
    NewPassword,
    CheckEmail,
    Verify,
    RestSuccess
  } from '../../screens/auth';
  import React from 'react';
  import {createStackNavigator} from '@react-navigation/stack';
  
  const AuthStack = createStackNavigator();
  const AuthApp = () => {
    return (
      <AuthStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Splash'}>
        <AuthStack.Screen name={'Splash'} component={Splash} />
        <AuthStack.Screen name={'IntroScreen'} component={IntroScreen} />
        <AuthStack.Screen name={'Login'} component={Login} />
        <AuthStack.Screen name={'SignUp'} component={SignUp} />
        <AuthStack.Screen name={'Forgot'} component={Forgot} />
        <AuthStack.Screen name={'NewPassword'} component={NewPassword} />
        <AuthStack.Screen name={'CheckEmail'} component={CheckEmail} />
        <AuthStack.Screen name={'Verify'} component={Verify} />
        <AuthStack.Screen name={'RestSuccess'} component={RestSuccess} />


      </AuthStack.Navigator>
    );
  };
  
  export default AuthApp;
  