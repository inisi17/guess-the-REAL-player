import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface AnswerContentProps {
  answer?: boolean;
  questionMade?: string;
}

const AnswerContent = ({ answer, questionMade }: AnswerContentProps) => {
  const textColor = { color: answer ? '#65a30d' : '#b91c1c' };

  return (
    <View>
      <Animated.Text style={styles.question} entering={FadeInUp.duration(500)}>
        Is the selected player {questionMade} ?
      </Animated.Text>
      <Animated.Text
        style={[styles.answer, textColor]}
        entering={FadeInDown.duration(700)}>
        {answer ? 'Yes' : 'No'}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  answer: {
    fontSize: 40,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  question: {
    fontSize: 26,
    lineHeight: 28,
    color: '#f8fafc',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AnswerContent;
