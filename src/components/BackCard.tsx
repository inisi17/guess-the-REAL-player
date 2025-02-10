import React from 'react';
import { Pressable, Image, Dimensions, StyleSheet } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const BackCard = ({ rotate }: { rotate: SharedValue<number> }) => {
  return (
    <Pressable
      onPress={() => {
        rotate.value = rotate.value ? 0 : 1;
      }}>
      <Image
        style={styles.icon}
        resizeMode="contain"
        source={Image.resolveAssetSource(require('../assets/backCard.png'))}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: { width: width / 3, height: 200 },
});

export default BackCard;
