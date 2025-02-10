import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';
import { StackParamList, StackScreenProps } from '../../App';
import { useGameStorageHook } from '../hooks/useGameStorageHook';
import { RouteProp } from '@react-navigation/native';

export interface EndGameScreenProps {
  navigation: StackScreenProps<'endGame'>;
  route: RouteProp<StackParamList, 'endGame'>;
}

const { width, height } = Dimensions.get('window');

const EndGameScreen = ({ route, navigation }: EndGameScreenProps) => {
  const { isSuccessScreen } = route.params;

  const { removeDataFromLS, getDataToStartGame } = useGameStorageHook();

  const handleExit = () => {
    removeDataFromLS();

    navigation.navigate('home');
  };

  const handleRestartGame = () => {
    getDataToStartGame();

    navigation.navigate('gameContainer');
  };

  const buttons = [
    {
      icon: 'refresh',
      onPress: handleRestartGame,
      label: 'Restart Game',
    },
    {
      icon: 'logout',
      onPress: handleExit,
      label: 'Exit to menu',
    },
  ];

  const renderContent = () => {
    const textColor = { color: isSuccessScreen ? '#16a34a' : '#dc2626' };

    return (
      <View style={styles.container}>
        <Icon
          name={isSuccessScreen ? 'trophy' : 'trophy-broken'}
          size={200}
          color={isSuccessScreen ? '#16a34a' : '#dc2626'}
        />
        <Text style={[styles.text, textColor]}>
          {isSuccessScreen
            ? 'Congratulations, you won the game!'
            : 'Incorrect answer, Game Over!'}
        </Text>

        <View style={styles.buttonContainer}>
          {buttons.map((button, index) => (
            <View key={index}>
              <Button
                buttonWidth={350}
                icon={button.icon}
                label={button.label}
                onPress={button.onPress}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  return <>{renderContent()}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#18181b',
  },
  text: {
    fontSize: 34,
    paddingTop: 20,
    color: '#16a34a',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 10,
    bottom: 40,
    position: 'absolute',
  },
  confetti: { position: 'absolute', width, height },
});

export default EndGameScreen;
