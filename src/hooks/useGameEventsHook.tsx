import { useState } from 'react';
import { getItem } from '../utils/AsyncStorage';
import {
  ModalTypes,
  FooterSteps,
  QuestionType,
  PlayersDataType,
  QuestionsDataType,
} from '../types/types';
import {
  LS_PLAYERS_DATA,
  LS_GAME_QUESTIONS,
  LS_SELECTED_PLAYER,
  LS_NUM_OF_ROUNDS,
} from '../utils/constants';
import { useGameStorageHook } from './useGameStorageHook';

const useGameEventsHook = () => {
  const [answer, setAnswer] = useState<boolean>();
  const [modalType, setModalType] = useState<ModalTypes>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [numberOfRounds, setNumberOfRounds] = useState<number>(0);
  const [questionMade, setQuestionMade] = useState<QuestionType>();
  const [lsPlayersData, setLsPlayersData] = useState<PlayersDataType[]>();
  const [selectedPlayer, setSelectedPLayer] = useState<PlayersDataType>();
  const [gameQuestions, setGameQuestions] = useState<QuestionsDataType[]>();
  const [footerStep, setFooterStep] = useState<FooterSteps>(
    FooterSteps.Buttons,
  );

  const { updateLSPlayersList, updateSessionQuestions, setRoundsInLS } =
    useGameStorageHook();

  const fetchDataFromLS = async () => {
    try {
      const data = await getItem(LS_PLAYERS_DATA);

      const selected = await getItem(LS_SELECTED_PLAYER);

      const questions = await getItem(LS_GAME_QUESTIONS);

      const rounds = await getItem(LS_NUM_OF_ROUNDS);

      setGameQuestions(questions);

      setLsPlayersData(data);

      setNumberOfRounds(rounds);

      setSelectedPLayer(selected);
    } catch (error) {
      console.error('Error fetching data from local storage', error);
    }
  };

  const validateQuestion = (question: QuestionType) => {
    setQuestionMade(question);

    const response = !!selectedPlayer?.property.includes(question.key);

    setAnswer(response);

    setIsModalVisible(false);

    setTimeout(() => {
      setModalType(ModalTypes.Answer);

      updateSessionQuestions({
        response,
        gameQuestions,
        question: question?.key,
      });

      setIsModalVisible(true);

      setFooterStep(FooterSteps.Confirmation);
    }, 500);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleEndRoundPress = () => {
    setRoundsInLS(numberOfRounds - 1);

    updateLSPlayersList(lsPlayersData);

    setFooterStep(FooterSteps.Buttons);

    setNumberOfRounds(numberOfRounds - 1);
  };

  return {
    answer,
    modalType,
    footerStep,
    toggleModal,
    questionMade,
    setModalType,
    lsPlayersData,
    gameQuestions,
    numberOfRounds,
    isModalVisible,
    fetchDataFromLS,
    validateQuestion,
    setIsModalVisible,
    handleEndRoundPress,
  };
};

export { useGameEventsHook };
