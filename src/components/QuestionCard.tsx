import React from 'react';
// 타입정의
import { newUserAnswerType } from '../App';

type questionCardType = {
  question: string;
  answers: Array<string>;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: newUserAnswerType | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}: questionCardType) => {
  return (
    <div>
      <p>
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div>
        {answers.map((answer) => (
          <div key={answer}>
            {/* <button disabled={!!userAnswer} value={answer} onClick={callback}> */}
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
