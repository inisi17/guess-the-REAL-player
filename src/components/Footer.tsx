import React from 'react';

import { BlurView } from '@react-native-community/blur';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FooterSteps, ModalTypes } from '../types/types';
import Button from './Button';
import {
  Easing,
  withTiming,
  withRepeat,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export interface FooterProps {
  answer?: boolean;
  question?: string;
  numberOfRounds: number;
  footerStep: FooterSteps;
  toggleModal: () => void;
  handleEndRoundPress: () => void;
  setModalType: (type: ModalTypes) => void;
}

const Footer = ({
  answer,
  question,
  footerStep,
  toggleModal,
  setModalType,
  numberOfRounds,
  handleEndRoundPress,
}: FooterProps) => {
  const buttons = [
    {
      name: 'guess',
      icon: 'trophy-outline',
      label: 'Guess Player',
      onPress: () => {
        toggleModal();

        setModalType(ModalTypes.Guess);
      },
    },
    {
      name: 'question',
      icon: 'head-question-outline',
      label: 'Make a Question',
      onPress: () => {
        toggleModal();

        setModalType(ModalTypes.Questions);
      },
    },
  ];

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.01, { duration: 500, easing: Easing.ease }),
        withTiming(1, { duration: 500, easing: Easing.ease }),
      ),
      -1,
      true,
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 500, easing: Easing.ease }),
        withTiming(1, { duration: 500, easing: Easing.ease }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const renderFooter = () => {
    if (FooterSteps.Buttons === footerStep) {
      return buttons.map((button, index) => {
        const buttonWidth = button.label ? 150 : 50;

        const shouldButtonAnimate =
          button.name === 'guess' && numberOfRounds < 1;

        return (
          <View key={index}>
            <Button
              icon={button.icon}
              label={button.label}
              onPress={button.onPress}
              buttonWidth={buttonWidth}
              buttonStyles={shouldButtonAnimate && animatedStyle}
            />
          </View>
        );
      });
    } else {
      const answerColor = { color: answer ? 'green' : 'red' };

      return (
        <View style={styles.endRound}>
          <View style={styles.endRoundText}>
            <Text style={styles.boldText}>
              Q:{' '}
              <Text style={styles.qAText}>
                Is the selected player {question}
              </Text>
            </Text>
            <Text style={styles.boldText}>
              A: <Text style={answerColor}>{answer ? 'Yes' : 'No'}</Text>
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={handleEndRoundPress}>
            <View style={[styles.btn, styles.endRoundBtn]}>
              <Icon name={'arrow-left-bottom'} size={20} color={'black'} />
              <Text style={styles.text}>End Round</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.footer}>
      <BlurView
        blurType="dark"
        blurAmount={20}
        style={styles.bluredPosition}
        reducedTransparencyFallbackColor="white"
      />
      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#f0f9ff',
    justifyContent: 'center',
    backgroundColor: '#3f3f46',
  },
  footer: {
    bottom: 0,
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  endRound: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-around',
  },
  endRoundText: {
    width: '50%',
    paddingVertical: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  endRoundBtn: {
    borderColor: 'black',
    backgroundColor: '#dfbf6c',
  },
  text: { paddingLeft: 10 },
  qAText: { color: '#f0f9ff' },
  boldText: { fontWeight: 'bold', color: '#dfbf6c' },
  bluredPosition: { ...StyleSheet.absoluteFillObject },
  modalContainer: { justifyContent: 'center', alignItems: 'center' },
});

export default Footer;
