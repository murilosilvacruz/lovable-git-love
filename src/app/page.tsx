'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Subject, Flashcard, TestQuestion } from '@/types';
import { generateFlashcards, generateTest } from '@/services/gemini';
import HomeForm from '@/components/HomeForm';
import FlashcardsView from '@/components/FlashcardsView';
import TestView from '@/components/TestView';

type ViewState = 'home' | 'flashcards' | 'test';

export default function Home() {
  const { t, language } = useLanguage();
  const [viewState, setViewState] = useState<ViewState>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [currentSubject, setCurrentSubject] = useState<Subject>('matematica');
  const [currentTopic, setCurrentTopic] = useState('');

  const handleSubmit = async (subject: Subject, topic: string, type: 'flashcards' | 'test') => {
    setIsLoading(true);
    setCurrentSubject(subject);
    setCurrentTopic(topic);

    try {
      if (type === 'flashcards') {
        const generatedFlashcards = await generateFlashcards(subject, topic, language);
        setFlashcards(generatedFlashcards);
        setViewState('flashcards');
      } else {
        const generatedQuestions = await generateTest(subject, topic, language);
        setTestQuestions(generatedQuestions);
        setViewState('test');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Erro ao gerar conteúdo. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    setViewState('home');
    setFlashcards([]);
    setTestQuestions([]);
  };

  const handleGenerateTestFromFlashcards = async () => {
    setIsLoading(true);
    try {
      const generatedQuestions = await generateTest(currentSubject, currentTopic, language);
      setTestQuestions(generatedQuestions);
      setViewState('test');
    } catch (error) {
      console.error('Error generating test:', error);
      alert('Erro ao gerar teste. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (viewState) {
      case 'flashcards':
        return (
          <FlashcardsView
            flashcards={flashcards}
            subject={t(currentSubject)}
            topic={currentTopic}
            onBackToHome={handleBackToHome}
            onGenerateTest={handleGenerateTestFromFlashcards}
          />
        );
      case 'test':
        return (
          <TestView
            questions={testQuestions}
            subject={t(currentSubject)}
            topic={currentTopic}
            onBackToHome={handleBackToHome}
          />
        );
      default:
        return (
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t('title')}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Sistema web para auxiliar estudantes a se prepararem para provas escolares, 
                permitindo a geração de flashcards e testes personalizados com correção automática.
              </p>
            </div>
            
            <HomeForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto">
      {renderContent()}
    </div>
  );
}
