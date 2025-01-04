import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../Button';
import QuestionCard from './QuestionCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../../services/apiConnector';
import { quizEndpoints } from "../../../services/APIs";
import { setUser } from "../../../slices/AuthSlice";

const QuizQuestions = ({ quizDetails, quizQuestions }) => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Keep track of the current question
    const { token, user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (quizDetails?.timer) {
            setRemainingTime(quizDetails.timer * 60); // Set remaining time in seconds
        }
    }, [quizDetails]);

    useEffect(() => {
        let timer;
        if (quizStarted && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (quizStarted && remainingTime === 0) {
            clearInterval(timer);
            alert('Time is up!');
            submitQuiz();
        }
        return () => clearInterval(timer);
    }, [quizStarted, remainingTime]);

    const handleAnswerChange = useCallback((questionId, selectedOption) => {
        setUserAnswers(prevAnswers => {
            const existingAnswerIndex = prevAnswers.findIndex(
                (answer) => answer.questionId === questionId
            );
            if (existingAnswerIndex >= 0) {
                prevAnswers[existingAnswerIndex].selectedOption = selectedOption;
            } else {
                prevAnswers.push({ questionId, selectedOption });
            }
            return [...prevAnswers];
        });
    }, []);

    const startQuiz = () => {
        setQuizStarted(true);
    };


    const submitQuiz = async () => {
        try {
            const response = await apiConnector(
                'POST',
                `${quizEndpoints.ATTEMMP_QUIZ}/${quizDetails._id}/attempt`,
                {
                    quizId: quizDetails._id,
                    answers: userAnswers,
                },
                {
                    Authorization: `Bearer ${token}`,
                }
            );
    
            // The score directly reflects the number of correct answers.
            const correctAnswers = response.data.score;
    
            // Questions attempted is the number of answers the user submitted.
            const questionsAttempted = userAnswers.length;
    
            // Incorrect answers are calculated as the difference between questions attempted and correct answers.
            const incorrectAnswers = questionsAttempted - correctAnswers;
    
            // Pass this data to the results page
            navigate('/quiz-results', { 
                state: { 
                    score: response.data.score, 
                    total: quizQuestions?.length,
                    questionsAttempted, 
                    correctAnswers, 
                    incorrectAnswers 
                } 
            });
    
            // Optionally, update user state if needed
            dispatch(setUser({ 
                ...user, 
                attemptedQuizzes: [...(user.attemptedQuizzes || []), quizDetails._id] 
            }));
    
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };
    
    
    
    const nextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className='flex py-5 border min-h-[70vh] px-5 justify-center items-start mt-5 rounded-lg bg-slate-900 border-slate-600'>
            {!quizStarted ? (
                <Button className='w-max self-center' onClick={startQuiz}>Start Quiz</Button>
            ) : (
                <div className='w-full flex flex-col'>
                    <h2 className='border border-slate-600 py-2 px-3 rounded-lg text-center md:text-end'>Time Remaining: <span className='text-red-500 ml-2'>{formatTime(remainingTime)}</span></h2>
                    
                    {/* Show only the current question */}
                    <div className='min-h-[50vh]'>
                        {quizQuestions && quizQuestions.length > 0 && (
                            <QuestionCard
                                key={quizQuestions[currentQuestionIndex]._id}
                                question={quizQuestions[currentQuestionIndex]}
                                onAnswerChange={handleAnswerChange}
                            />
                        )}
                    </div>

                    {/* Navigation buttons */}
                    <div className='flex justify-between mt-4'>
                        <Button 
                            className='w-max self-start' 
                            onClick={prevQuestion} 
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </Button>
                        {currentQuestionIndex < quizQuestions.length - 1 && (
                            <Button 
                                className='w-max self-end' 
                                onClick={nextQuestion}
                            >
                                Next
                            </Button>
                        )}

                        {currentQuestionIndex === quizQuestions.length - 1 && (
                        <Button className='w-max self-end' onClick={submitQuiz}>
                            Submit Quiz
                        </Button>
                        )}
                    </div>

                    {/* Submit button */}
                </div>
            )}
        </div>
    );
};

export default QuizQuestions;
