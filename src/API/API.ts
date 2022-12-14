import axios from 'axios';

import { shuffleArray } from '../utils/utils';

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
}

// eunm
// export enum Difficulty {
//   EASY = "easy",
//   MEDIUM = "medium",
//   HARD = "hard",
// }

// union
export const Difficulty = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Difficulty = typeof Difficulty[keyof typeof Difficulty];

// type
// export type QuestionsState = Question & { answers: Array<string> };

// interface
export interface QuestionsState extends Question {
  answers: Array<string>;
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<Array<QuestionsState>> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=9&difficulty=${difficulty}&type=multiple`;
  const response = await axios.get(endpoint);
  return response.data.results.map((question: QuestionsState) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
