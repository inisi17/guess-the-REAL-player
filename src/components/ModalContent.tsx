import { BlurView } from '@react-native-community/blur';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ModalTypes,
  QuestionType,
  PlayersDataType,
  QuestionsDataType,
} from '../types/types';
import MenuContent from './modalTypes/MenuContent';
import QuestionsContent from './modalTypes/QuestionsContent';
import GuessContent from './modalTypes/GuessContent';
import AnswerContent from './modalTypes/AnswerContent';

const { width } = Dimensions.get('window');

export interface ModalContentProps {
  answer?: boolean;
  onClose: () => void;
  questionMade?: string;
  numberOfRounds: number;
  modalType?: ModalTypes;
  navigateBack: () => void;
  handleRestart: () => void;
  guessList?: PlayersDataType[];
  questionsData?: QuestionsDataType[];
  validateGuess: (data: PlayersDataType) => void;
  validateQuestion: (question: QuestionType) => void;
}

const ModalContent = ({
  answer,
  onClose,
  guessList,
  modalType,
  navigateBack,
  questionMade,
  handleRestart,
  questionsData,
  validateGuess,
  numberOfRounds,
  validateQuestion,
}: ModalContentProps) => {
  const renderModalContent = () => {
    switch (modalType) {
      case ModalTypes.Menu:
        return (
          <MenuContent
            onClose={onClose}
            navigateBack={navigateBack}
            handleRestart={handleRestart}
          />
        );

      case ModalTypes.Questions:
        return (
          <QuestionsContent
            questionsData={questionsData}
            numberOfRounds={numberOfRounds}
            validateQuestion={validateQuestion}
          />
        );

      case ModalTypes.Guess:
        return (
          <GuessContent guessList={guessList} validateGuess={validateGuess} />
        );

      case ModalTypes.Answer:
        return <AnswerContent answer={answer} questionMade={questionMade} />;

      default:
        return <></>;
    }
  };

  const renderModalTitle = () => {
    switch (modalType) {
      case ModalTypes.Menu:
        return 'Menu';

      case ModalTypes.Questions:
        return 'Make a Question';

      case ModalTypes.Guess:
        return 'Guess Player';

      case ModalTypes.Answer:
        return 'And the answer is ...';

      default:
        return 'Menu';
    }
  };

  return (
    <View style={styles.modalContainer}>
      <BlurView
        blurType="dark"
        blurAmount={50}
        style={styles.bluredPosition}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.header}>
        <Text style={styles.titleText}>{renderModalTitle()}</Text>
        <View style={styles.headerIcon}>
          <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
            <Icon size={28} name="close" color={'#f8fafc'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonsModalContent}>{renderModalContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  btnLabel: {
    fontSize: 16,
    color: '#f8fafc',
    textAlign: 'center',
  },
  btnContainer: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f0f9ff',
    justifyContent: 'center',
    backgroundColor: '#3f3f46',
  },
  icon: {
    height: 200,
    width: width / 3 - 20,
  },
  questionButton: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f0f9ff',
    justifyContent: 'center',
    backgroundColor: '#3f3f46',
  },
  questionsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonsModalContent: {
    minHeight: 300,
    maxHeight: 600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginTop: 15,
    display: 'flex',
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: 'white',
    lineHeight: 22,
    marginLeft: 15,
    fontWeight: 'bold',
  },
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
  headerIcon: {
    right: 0,
    position: 'absolute',
  },
  padding: { padding: 10 },
  modalContainer: { width: width - 32 },
  marginVertical: { marginVertical: 10 },
  rightAnswer: { backgroundColor: '#65a30d' },
  wrongAnwser: { backgroundColor: '#b91c1c' },
  bluredPosition: { ...StyleSheet.absoluteFillObject, borderRadius: 16 },
});

export default ModalContent;
