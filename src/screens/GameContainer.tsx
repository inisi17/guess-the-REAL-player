import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';

import Modal from 'react-native-modal';

import ModalContent from '../components/ModalContent';
import PlayerCardContainer from '../components/PlayerCardContainer';
import Footer from '../components/Footer';
import { useGameStorageHook } from '../hooks/useGameStorageHook';
import { useGameEventsHook } from '../hooks/useGameEventsHook';
import Header from '../components/Header';

import { StackScreenProps } from '../../App';
import { PlayersDataType } from '../types/types';

export interface GameContainerProps {
  navigation: StackScreenProps<'gameContainer'>;
}

const GameContainer = ({ navigation }: GameContainerProps) => {
  const [rerender, setRerender] = useState(false);

  const forceRerender = () => {
    setRerender(prev => !prev);
  };

  const { updatePlayesList, getDataToStartGame } = useGameStorageHook();

  const {
    answer,
    modalType,
    footerStep,
    toggleModal,
    questionMade,
    setModalType,
    gameQuestions,
    lsPlayersData,
    numberOfRounds,
    isModalVisible,
    fetchDataFromLS,
    validateQuestion,
    handleEndRoundPress,
  } = useGameEventsHook();

  const navigateBack = () => {
    toggleModal();

    navigation.navigate('home');
  };

  const handleRestart = () => {
    toggleModal();

    getDataToStartGame();

    forceRerender();
  };

  const validateGuess = (guessedPlayer: PlayersDataType) => {
    toggleModal();

    const isValid = !!lsPlayersData?.find(el => el.id === guessedPlayer.id)
      ?.isSelected;

    navigation.replace('endGame', { isSuccessScreen: isValid });
  };

  useEffect(() => {
    fetchDataFromLS();
  }, [rerender]);

  const guessList = lsPlayersData?.filter(el => el.isTurned === false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        toggleModal={toggleModal}
        setModalType={setModalType}
        numberOfRounds={numberOfRounds}
      />
      <FlatList
        numColumns={3}
        data={lsPlayersData}
        keyExtractor={item => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <PlayerCardContainer
            answer={answer}
            playerCard={item}
            question={questionMade?.key}
            onRotateCard={() =>
              updatePlayesList({ id: item.id, data: lsPlayersData })
            }
          />
        )}
      />
      <Footer
        answer={answer}
        footerStep={footerStep}
        toggleModal={toggleModal}
        setModalType={setModalType}
        numberOfRounds={numberOfRounds}
        question={questionMade?.fullQuestion}
        handleEndRoundPress={handleEndRoundPress}
      />
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.8}
        isVisible={isModalVisible}
        style={styles.modalContainer}
        onBackdropPress={toggleModal}
        backdropTransitionOutTiming={1}>
        <ModalContent
          answer={answer}
          guessList={guessList}
          onClose={toggleModal}
          modalType={modalType}
          navigateBack={navigateBack}
          handleRestart={handleRestart}
          questionsData={gameQuestions}
          validateGuess={validateGuess}
          numberOfRounds={numberOfRounds}
          validateQuestion={validateQuestion}
          questionMade={questionMade?.fullQuestion}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#18181b',
  },
  container: {
    paddingBottom: 60,
    flexDirection: 'column',
  },
  modalContainer: { justifyContent: 'center', alignItems: 'center' },
});

export default GameContainer;
