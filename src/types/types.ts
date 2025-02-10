import { ImageSourcePropType } from 'react-native';

export enum ModalTypes {
  Menu = 'MENU',
  Guess = 'GUESS',
  Answer = 'ANSWER',
  Questions = 'QUESTIONS',
}

export enum FooterSteps {
  Confirmation = 'CONFIRMATION',
  Buttons = 'BUTTONS',
}

export interface QuestionType {
  key: string;
  label: string;
  fullQuestion: string;
  answer?: boolean | null;
}

export interface PlayersDataType {
  id: number;
  name: string;
  isTurned: boolean;
  property: string[];
  isSelected?: boolean;
  image: ImageSourcePropType;
}

export interface QuestionsDataType {
  hasQuestionOfGroupBeenMade: boolean;
  questions: QuestionType[];
}

export interface UpdateSessionParamsTypes {
  response: boolean;
  question?: string;
  gameQuestions?: QuestionsDataType[];
}

export interface UpdatePlayersType {
  id?: number;
  data?: PlayersDataType[];
}
