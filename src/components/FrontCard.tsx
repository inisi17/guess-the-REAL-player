import React from 'react';
import {
  Pressable,
  Image,
  Dimensions,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import { SharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export interface FrontCardTypes {
  answer?: boolean;
  shake: () => void;
  isCardTurned?: boolean;
  onRotateCard: () => void;
  rotate: SharedValue<number>;
  playerImage: ImageSourcePropType;
}

const FrontCard = ({
  shake,
  rotate,
  answer,
  isCardTurned,
  playerImage,
  onRotateCard,
}: FrontCardTypes) => {
  const rotateCard = () => {
    onRotateCard();

    rotate.value = rotate.value ? 0 : 1;
  };

  return (
    <Pressable
      onPress={() => {
        !answer ? shake() : rotateCard();
      }}
      disabled={isCardTurned}>
      <Image
        source={
          !isCardTurned
            ? playerImage
            : Image.resolveAssetSource(require('../assets/backCard.png'))
        }
        resizeMode="contain"
        style={styles.icon}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: { width: width / 3, height: 200 },
});

export default FrontCard;
