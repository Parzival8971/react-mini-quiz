import React from 'react';
// 타입정의
import { newUserAnswerType } from '../App';
// 스타일정의
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

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
    <Wrapper>
      <div className='question'>
        Question: {questionNr} / {totalQuestions}
      </div>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div>
        {answers.map((answer) => (
          <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            {/* <button disabled={!!userAnswer} value={answer} onClick={callback}> */}
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
