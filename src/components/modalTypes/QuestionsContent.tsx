import React from 'react';
import Button from './../Button';
import { View, StyleSheet, Dimensions } from 'react-native';
import { QuestionsDataType, QuestionType } from '../../types/types';

const { width } = Dimensions.get('window');

interface QuestionsContentProps {
  numberOfRounds: number;
  questionsData?: QuestionsDataType[];
  validateQuestion: (question: QuestionType) => void;
}

const QuestionsContent = ({
  questionsData,
  numberOfRounds,
  validateQuestion,
}: QuestionsContentProps) => {
  const getButtonStyles = (response?: boolean | null) => {
    return response ? styles.rightAnswer : styles.wrongAnwser;
  };

  return (
    <View style={styles.padding}>
      {questionsData?.map((question, index) => {
        const { questions } = question;

        return (
          <View style={styles.questionsContainer} key={index}>
            {questions.map((el, i) => {
              const buttonWidth = (width - 64) / questions.length;

              return (
                <View key={i}>
                  <Button
                    label={el.label}
                    buttonWidth={buttonWidth}
                    disabled={numberOfRounds < 1}
                    onPress={() => validateQuestion(el)}
                    buttonStyles={
                      el.answer !== null && getButtonStyles(el.answer)
                    }
                  />
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  padding: { padding: 10 },
  questionsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rightAnswer: { backgroundColor: '#65a30d' },
  wrongAnwser: { backgroundColor: '#b91c1c' },
});

export default QuestionsContent;
