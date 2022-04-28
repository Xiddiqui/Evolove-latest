/** @format */

import {
  AddModule,
    CoachProfile, CoachSettings, CourseImageSubmission, CourseSubmission, NewSubmission, ProductImageSubmission, ProductPrice, ProductSubmission, SaleBoard,ProductSubmissionDone, BlogSubmission, BlogImageSubmission, BlogPricetype, BlogPrice, BlogSubmissionDone, Fav, EditCoachProfile, Bank, AddBank, WriteBlog, CoursePricetype, CoursePrice, CourseSubmissionDone, AddModulevideo,ChangePassword,CheckEmail, BlogDetails, CourseDetails, ProductDetails, Wallet, Withdraw, Bank1, Done, VideoPlay, EditBank
  } from '../../screens/coachApp';
  import React from 'react';
  import {createStackNavigator} from '@react-navigation/stack';
  
  const CoachStack = createStackNavigator();
  const CoachApp = () => {
    return (
      <CoachStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'CoachProfile'}>
        <CoachStack.Screen name={'CoachProfile'} component={CoachProfile} />
        <CoachStack.Screen name={'NewSubmission'} component={NewSubmission} />
        <CoachStack.Screen name={'SaleBoard'} component={SaleBoard} />
        <CoachStack.Screen name = {'CoachSettings'} component={CoachSettings}/>
        <CoachStack.Screen name = {'CourseSubmission'} component={CourseSubmission}/>
        <CoachStack.Screen name = {'CourseImageSubmission'} component={CourseImageSubmission}/>
        <CoachStack.Screen name = {'AddModule'} component={AddModule}/>
        <CoachStack.Screen name = {'ProductSubmission'} component={ProductSubmission}/>
        <CoachStack.Screen name = {'ProductImageSubmission'} component={ProductImageSubmission}/>
        <CoachStack.Screen name = {'ProductPrice'} component={ProductPrice}/>
        <CoachStack.Screen name = {'ProductSubmissionDone'} component={ProductSubmissionDone}/>
        <CoachStack.Screen name = {'BlogSubmission'} component={BlogSubmission}/>
        <CoachStack.Screen name = {'BlogImageSubmission'} component={BlogImageSubmission}/>
        <CoachStack.Screen name = {'BlogPricetype'} component={BlogPricetype}/>
        <CoachStack.Screen name = {'BlogPrice'} component={BlogPrice}/>
        <CoachStack.Screen name = {'BlogSubmissionDone'} component={BlogSubmissionDone}/>
        <CoachStack.Screen name = {'Fav'} component={Fav}/>
        <CoachStack.Screen name = {'EditCoachProfile'} component={EditCoachProfile}/>
        <CoachStack.Screen name = {'Bank'} component={Bank}/>
        <CoachStack.Screen name = {'AddBank'} component={AddBank}/>
        <CoachStack.Screen name = {'WriteBlog'} component={WriteBlog}/>
        <CoachStack.Screen name = {'CoursePricetype'} component={CoursePricetype}/>
        <CoachStack.Screen name = {'CoursePrice'} component={CoursePrice}/>
        <CoachStack.Screen name = {'CourseSubmissionDone'} component={CourseSubmissionDone}/>
        <CoachStack.Screen name = {'AddModulevideo'} component={AddModulevideo}/>
        <CoachStack.Screen name = {'ChangePassword'} component={ChangePassword}/>
        <CoachStack.Screen name = {'CheckEmail'} component={CheckEmail}/>
        <CoachStack.Screen name = {'BlogDetails'} component={BlogDetails}/>
        <CoachStack.Screen name = {'CourseDetails'} component={CourseDetails}/>
        <CoachStack.Screen name = {'ProductDetails'} component={ProductDetails}/>
        <CoachStack.Screen name = {'Wallet'} component={Wallet}/>
        <CoachStack.Screen name = {'Withdraw'} component={Withdraw}/>
        <CoachStack.Screen name = {'Bank1'} component={Bank1}/>
        <CoachStack.Screen name = {'Done'} component={Done}/>
        <CoachStack.Screen name = {'VideoPlay'} component={VideoPlay}/>
        <CoachStack.Screen name = {'EditBank'} component={EditBank}/>

      </CoachStack.Navigator>
    );
  };
  
  export default CoachApp;
  