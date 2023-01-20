import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dashboard, PostDetails} from '@screens';

//Navigator params types
export type RootParamList = {
  dashboard: undefined;
  postDetails: {postUrl: string};
};

const Stack = createNativeStackNavigator<RootParamList>();

/**
 * Root stack navigator for Dashboard and PostDetials screens
 */
export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="dashboard"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="postDetails" component={PostDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
