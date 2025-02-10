import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import GameContainer from './src/screens/GameContainer';
import EndGameScreen from './src/screens/EndGameScreen';

export type StackParamList = {
  home: undefined;
  gameContainer: undefined;
  endGame: { isSuccessScreen: boolean };
};

export type StackScreenProps<T extends keyof StackParamList> =
  StackNavigationProp<StackParamList, T>;

const Stack = createStackNavigator<StackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="gameContainer" component={GameContainer} />
        <Stack.Screen name="endGame" component={EndGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
