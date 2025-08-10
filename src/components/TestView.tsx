'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TestQuestion, TestResult } from '@/types';
import { Home, CheckCircle, XCircle } from 'lucide-react';

interface TestViewProps {
  questions: TestQuestion[];
  subject: string;
  topic: string;
  onBackToHome: () => void;
}

export default function TestView({ questions, subject, topic, onBackToHome }: TestViewProps) {
  const { t } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishTest = () => {
    setShowResults(true);
  };

  const calculateResults = (): TestResult => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    return {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      questions,
      userAnswers
    };
  };

  if (showResults) {
    const results = calculateResults();
    const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);

    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-2 text-gray-900 hover:text-gray-700"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">{t('backToHome')}</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('testComplete')}</h2>
            <div className="text-6xl font-extrabold text-blue-800 mb-4">{percentage}%</div>
            <div className="text-xl text-gray-800">
              {results.correctAnswers} {t('correctAnswers')} {t('of')} {results.totalQuestions} {t('totalQuestions')}
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="border rounded-lg p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 mt-1" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {t('question')} {index + 1}: {question.question}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-md border ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-50 border-green-400 text-gray-900'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'bg-red-50 border-red-400 text-gray-900'
                                : 'bg-gray-50 border-gray-300 text-gray-900'
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>

                      <div className="bg-blue-50 rounded-md p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">{t('explanation')}:</h4>
                        <p className="text-blue-900">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-6">
        <button
          onClick={onBackToHome}
          className="flex items-center space-x-2 text-gray-900 hover:text-gray-700"
        >
          <Home className="h-5 w-5" />
          <span className="font-medium">{t('backToHome')}</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('question')} {currentQuestionIndex + 1} {t('of')} {questions.length}
          </h2>
          <p className="text-gray-800">
            {subject} - {topic}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 text-gray-900 transition-colors ${
                  userAnswers[currentQuestionIndex] === index
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-400 hover:border-gray-500 bg-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 text-gray-900 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('previous')}
          </button>

          <div className="flex space-x-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentQuestionIndex ? 'bg-blue-700' : 
                  userAnswers[index] !== -1 ? 'bg-green-600' : 'bg-gray-400'
                }`}
                aria-label={`Ir para a questão ${index + 1}`}
              />
            ))}
          </div>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleFinishTest}
              disabled={userAnswers.some(answer => answer === -1)}
              className="px-6 py-2 bg-green-700 text-white text-base font-semibold rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {t('finishTest')}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={userAnswers[currentQuestionIndex] === -1}
              className="px-4 py-2 text-gray-900 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('next')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
