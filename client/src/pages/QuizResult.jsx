import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from "../components/Button"
import { FaHome } from "react-icons/fa";

const QuizResults = () => {
  const location = useLocation();
  const { score, total, questionsAttempted, correctAnswers, incorrectAnswers } = location.state || { score: 0, total: 0, questionsAttempted: 0, correctAnswers: 0, incorrectAnswers: 0 };
  const navigate = useNavigate();

  return (
    <div className='min-h-[80vh] flex flex-col gap-5 justify-center items-center'>
      <div className='text-center'>
        <h1 className='text-3xl border-b border-slate-600 pb-5'>Quiz Results</h1>
        <p className='text-2xl mt-4 flex items-center gap-3 font-thin'>Your Score: <span className='font-semibold'><span className={`${score / total >= 0.4 ? "text-green-500" : "text-red-700"} `}>{score}</span> / {total}</span> </p>
        <p className='text-2xl mt-4 flex items-center gap-3 font-thin'>Questions Attempted: <span className='font-semibold'>{questionsAttempted}</span> / {total}</p>
        <p className='text-2xl mt-4 flex items-center gap-3 font-thin'>Correct Answers: <span className='font-semibold'>{correctAnswers}</span></p>
        <p className='text-2xl mt-4 flex items-center gap-3 font-thin'>Incorrect Answers: <span className='font-semibold'>{incorrectAnswers}</span></p>
      </div>
      <div className='w-full min-h-[50vh] mt-1 grid place-content-center'>
          <p> </p>
          <Button onClick={() => navigate('/')} className='w-max flex gap-3 items-center py-2'>
            <FaHome /> Return to Home
          </Button>
      </div>
    </div>
  );
};

export default QuizResults;