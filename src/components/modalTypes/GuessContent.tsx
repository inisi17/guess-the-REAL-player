import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { PlayersDataType } from '../../types/types';

const { width } = Dimensions.get('window');

interface GuessContentProps {
  guessList?: PlayersDataType[];
  validateGuess: (data: PlayersDataType) => void;
}

const GuessContent = ({ guessList, validateGuess }: GuessContentProps) => {
  return (
    <FlatList
      numColumns={3}
      data={guessList}
      keyExtractor={item => item.name}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => validateGuess(item)}>
          <Image source={item.image} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  icon: {
    height: 200,
    width: width / 3 - 20,
  },
});

export default GuessContent;
