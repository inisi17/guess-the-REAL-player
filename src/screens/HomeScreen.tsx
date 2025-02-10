import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackScreenProps } from '../../App';

import SwitchSelection from '../components/SwitchSelection';
import Button from '../components/Button';
import { getItem } from '../utils/AsyncStorage';
import { LS_PLAYERS_DATA } from '../utils/constants';
import { useGameStorageHook } from '../hooks/useGameStorageHook';

export interface HomeScreenProps {
  navigation: StackScreenProps<'home'>;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { numberOfRounds, setNumberOfRounds, getDataToStartGame } =
    useGameStorageHook();

  const [hasUnfinishedGame, setHasUnfinishedGame] = useState(false);

  useEffect(() => {
    const checkUnfinishedGame = async () => {
      const data = await getItem(LS_PLAYERS_DATA);

      setHasUnfinishedGame(!!data);
    };

    checkUnfinishedGame();
  }, []);

  const startGame = () => {
    getDataToStartGame();

    navigation.navigate('gameContainer');
  };

  const resumeGame = async () => {
    if (!hasUnfinishedGame) {
      getDataToStartGame();
    }

    navigation.navigate('gameContainer');
  };

  const buttons = [
    {
      name: 'restart',
      label: 'Start Game',
      onPress: startGame,
    },

    {
      name: 'resume',
      label: 'Resume Last Game',
      onPress: resumeGame,
    },
  ];

  const selectionButtons = [
    { label: '3', value: 3 },
    { label: '5', value: 5 },
    { label: '7', value: 7 },
  ];

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.img}
        source={Image.resolveAssetSource(require('../assets/gameLogo.png'))}
      />

      <View style={styles.selectionContainer}>
        <Text style={styles.selectText}>Select Number Of Questions:</Text>

        <SwitchSelection
          numberOfRounds={numberOfRounds}
          selectionButtons={selectionButtons}
          setNumberOfRounds={setNumberOfRounds}
        />
      </View>

      <View style={styles.btnContainer}>
        {buttons.map((button, index) => {
          if (!hasUnfinishedGame && button.name === 'resume') {
            return null;
          }
          return (
            <View key={index}>
              <Button
                buttonWidth={300}
                label={button.label}
                onPress={button.onPress}
                buttonStyles={styles.marginVertical}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#18181b',
  },
  img: {
    width: 200,
    height: 200,
    marginBottom: 100,
  },
  marginVertical: { marginVertical: 10 },
  selectionContainer: {
    gap: 10,
    marginTop: 50,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  btnContainer: { position: 'absolute', bottom: 40 },
  selectText: { color: '#dfbf6c', fontSize: 22, width: 300 },
});

export default HomeScreen;
