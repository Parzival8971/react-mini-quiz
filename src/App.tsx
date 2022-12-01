import React, { useState } from 'react';
// 엔드포인트
import { fetchQuizQuestions } from './API';
// 컴포넌트
import QuestionCard from './components/QuestionCard';
// 타입정의
import { QuestionsState, Difficulty } from './API';

export type newUserAnswerType = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Array<QuestionsState>>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Array<newUserAnswerType>>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
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
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
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
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };
  return (
    <div className='App'>
      <h1>REACTT MINI QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className='start' onClick={startTrivia}>
          Start
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
    </div>
  );
};

export default App;
