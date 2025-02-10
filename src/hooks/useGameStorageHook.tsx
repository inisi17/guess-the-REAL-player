import {
  playersData,
  questionsData,
  LS_PLAYERS_DATA,
  LS_GAME_QUESTIONS,
  LS_SELECTED_PLAYER,
  LS_NUM_OF_ROUNDS,
} from '../utils/constants';

import { removeItem, setItem } from '../utils/AsyncStorage';
import {
  PlayersDataType,
  UpdatePlayersType,
  UpdateSessionParamsTypes,
} from '../types/types';
import { useState } from 'react';

const useGameStorageHook = () => {
  const [numberOfRounds, setNumberOfRounds] = useState(5);
  const setSelectedPlayerOnLS = (players: PlayersDataType[]) => {
    const selectedPlayer = players.find(player => player.isSelected);

    const stringifiedSelected = JSON.stringify(selectedPlayer);

    setItem(LS_SELECTED_PLAYER, stringifiedSelected);
  };

  const getRandomPlayer = () => {
    const randomIndex = Math.floor(Math.random() * playersData.length);

    const sortedPlayersData = playersData.sort(() => Math.random() - 0.5);

    sortedPlayersData[randomIndex].isSelected = true;

    const stringifiedPlayers = JSON.stringify(playersData);

    setItem(LS_PLAYERS_DATA, stringifiedPlayers);

    setSelectedPlayerOnLS(sortedPlayersData);
  };

  const getGameQuestions = () => {
    const stringified = JSON.stringify(questionsData);

    setItem(LS_GAME_QUESTIONS, stringified);
  };

  const updateSessionQuestions = ({
    response,
    question,
    gameQuestions,
  }: UpdateSessionParamsTypes) => {
    gameQuestions?.map(game => {
      game.questions.map(el => {
        el.key === question && (el.answer = response);
      });
    });

    const stringified = JSON.stringify(gameQuestions);

    setItem(LS_GAME_QUESTIONS, stringified);
  };

  const updatePlayesList = ({ id, data }: UpdatePlayersType) => {
    data?.map(el => {
      el.id === id && (el.isTurned = !el.isTurned);
    });
  };

  const updateLSPlayersList = (data?: PlayersDataType[]) => {
    const stringified = JSON.stringify(data);

    setItem(LS_PLAYERS_DATA, stringified);
  };

  const removeGameDataFromLS = () => {
    removeItem(LS_PLAYERS_DATA);

    removeItem(LS_NUM_OF_ROUNDS);

    removeItem(LS_GAME_QUESTIONS);
  };

  const setRoundsInLS = (numOfRounds: number) => {
    setItem(LS_NUM_OF_ROUNDS, JSON.stringify(numOfRounds));
  };

  const removeDataFromLS = () => {
    removeItem(LS_PLAYERS_DATA);

    removeItem(LS_NUM_OF_ROUNDS);

    removeItem(LS_GAME_QUESTIONS);

    removeItem(LS_SELECTED_PLAYER);
  };

  const getDataToStartGame = () => {
    getRandomPlayer();

    getGameQuestions();

    setRoundsInLS(numberOfRounds);
  };

  return {
    setRoundsInLS,
    numberOfRounds,
    getRandomPlayer,
    getGameQuestions,
    removeDataFromLS,
    updatePlayesList,
    setNumberOfRounds,
    getDataToStartGame,
    updateLSPlayersList,
    removeGameDataFromLS,
    updateSessionQuestions,
  };
};

export { useGameStorageHook };
