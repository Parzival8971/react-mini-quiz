import React, { useCallback, useState } from 'react';
// 엔드포인트
import { fetchQuizQuestions } from './API';
// 컴포넌트
import QuestionCard from './components/QuestionCard';
// 타입정의
import { QuestionsState, Difficulty } from './API';
// 스타일지정
import { GlobalStyle, Wrapper } from './App.styles';

export type newUserAnswerType = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  // 비동기처리
  const [loading, setLoading] = useState(false);
  // API 요청
  const [questions, setQuestions] = useState<Array<QuestionsState>>([]);
  // 시작순서
  const [number, setNumber] = useState(0);
  // API object 새로운 배열로 반환
  const [userAnswers, setUserAnswers] = useState<Array<newUserAnswerType>>([]);
  // 점수시작
  const [score, setScore] = useState(0);
  // 시작과 끝
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = useCallback(async () => {
    setLoading(true);
    setGameOver(false);

    try {
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );

      setQuestions(newQuestions);
    } catch (e) {
      if (e instanceof Error) alert('error:' + e.message);
      else alert('error:' + e);
    }

    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }, []);

  const checkAnswer = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!gameOver) {
        // 유저의 값
        const answer = e.currentTarget.value;
        // 유저가 체크한 값
        const correct = questions[number].correct_answer === answer;
        // 두 값이 맞으면 점수 +1
        if (correct) setScore((prev) => prev + 1);
        // Save the answer in the array for user answers
        const newUserAnswer = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer,
        };
        setUserAnswers((prev) => [...prev, newUserAnswer]);
      }
    },
    [gameOver, number, questions]
  );

  const nextQuestion = useCallback(() => {
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  }, [number]);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT MINI QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            Start !
          </button>
        ) : null}
        {!gameOver ? <p className='score'>Score : {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
