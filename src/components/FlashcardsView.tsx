'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Flashcard } from '@/types';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface FlashcardsViewProps {
  flashcards: Flashcard[];
  subject: string;
  topic: string;
  onBackToHome: () => void;
  onGenerateTest: () => void;
}

export default function FlashcardsView({ 
  flashcards, 
  subject, 
  topic, 
  onBackToHome, 
  onGenerateTest 
}: FlashcardsViewProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentFlashcard = flashcards[currentIndex];

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={onBackToHome}
          className="flex items-center space-x-2 text-gray-900 hover:text-gray-700"
        >
          <Home className="h-5 w-5" />
          <span className="font-medium">{t('backToHome')}</span>
        </button>
        
        <button
          onClick={onGenerateTest}
          className="text-sm font-semibold text-blue-800 hover:text-blue-900 underline"
        >
          {t('generateTestFromFlashcards')}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('flashcard')} {currentIndex + 1} {t('of')} {flashcards.length}
          </h2>
          <p className="text-gray-700">
            {subject} - {topic}
          </p>
        </div>

        <div className="min-h-[300px] flex flex-col justify-center">
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('question')}:
            </h3>
            <p className="text-gray-900 text-lg">{currentFlashcard.question}</p>
          </div>

          {showAnswer && (
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                {t('answer')}:
              </h3>
              <p className="text-blue-900 text-lg">{currentFlashcard.answer}</p>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={toggleAnswer}
              className="bg-blue-700 text-white text-base font-semibold px-6 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              {showAnswer ? t('hideAnswer') : t('showAnswer')}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 text-gray-900 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">{t('previous')}</span>
          </button>

          <div className="flex space-x-2">
            {flashcards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowAnswer(false);
                }}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-700' : 'bg-gray-400'
                }`}
                aria-label={`Ir para o flashcard ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="flex items-center space-x-2 px-4 py-2 text-gray-900 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-medium">{t('next')}</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
