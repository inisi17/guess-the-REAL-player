import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import FrontCard from './FrontCard';
import BackCard from './BackCard';
import { PlayersDataType } from '../types/types';

export interface FlipCardProps {
  answer?: boolean;
  question?: string;
  onRotateCard: () => void;
  playerCard: PlayersDataType;
}

const PlayerCardContainer = ({
  answer,
  question,
  playerCard,
  onRotateCard,
}: FlipCardProps) => {
  const rotate = useSharedValue(0);

  const shouldCardBeTurned = () => {
    const hasPlayerThatProperty = playerCard.property.includes(question ?? '');

    return !hasPlayerThatProperty === answer;
  };

  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);

    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });

  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);

    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });

  const shakeTranslateX = useSharedValue(0);

  const shake = useCallback(() => {
    const TranslationAmount = 5;
    const timingConfig = {
      easing: Easing.bezier(0.35, 0.7, 0.5, 0.7),
      duration: 80,
    };

    shakeTranslateX.value = withSequence(
      withTiming(TranslationAmount, timingConfig),
      withRepeat(withTiming(-TranslationAmount, timingConfig), 3, true),
      withSpring(0, {
        mass: 0.5,
      }),
    );
  }, [shakeTranslateX]);

  const rStyle = useAnimatedStyle(() => {
    return {
      zIndex: 10,
      transform: [{ translateX: shakeTranslateX.value }],
    };
  }, []);

  return (
    <View>
      <Animated.View
        style={[
          styles.frontCard,
          shouldCardBeTurned() ? frontAnimatedStyles : rStyle,
        ]}>
        <FrontCard
          shake={shake}
          rotate={rotate}
          onRotateCard={onRotateCard}
          answer={shouldCardBeTurned()}
          playerImage={playerCard.image}
          isCardTurned={playerCard.isTurned}
        />
      </Animated.View>
      <Animated.View style={[styles.backCard, backAnimatedStyles]}>
        <BackCard rotate={rotate} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  frontCard: {
    backfaceVisibility: 'hidden',
  },
  backCard: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
});

export default PlayerCardContainer;
