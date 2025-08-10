'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  'pt-BR': {
    'title': 'Sistema de Estudo',
    'selectSubject': 'Selecione o tema',
    'enterTopic': 'Digite o tópico específico',
    'generateFlashcards': 'Gerar Flashcards',
    'generateTest': 'Gerar Teste',
    'matematica': 'Matemática',
    'fisica': 'Física',
    'quimica': 'Química',
    'biologia': 'Biologia',
    'historia': 'História',
    'geografia': 'Geografia',
    'language': 'Idioma',
    'portuguese': 'Português',
    'english': 'Inglês',
    'privacyPolicy': 'Política de Privacidade',
    'loading': 'Carregando...',
    'next': 'Próximo',
    'previous': 'Anterior',
    'submit': 'Enviar',
    'results': 'Resultados',
    'correct': 'Correto',
    'incorrect': 'Incorreto',
    'score': 'Pontuação',
    'explanation': 'Explicação',
    'backToHome': 'Voltar ao Início',
    'generateTestFromFlashcards': 'Gerar Teste',
    'flashcard': 'Flashcard',
    'of': 'de',
    'question': 'Questão',
    'answer': 'Resposta',
    'selectAnswer': 'Selecione uma resposta',
    'reviewAnswers': 'Revisar Respostas',
    'startTest': 'Iniciar Teste',
    'finishTest': 'Finalizar Teste',
    'testComplete': 'Teste Concluído',
    'correctAnswers': 'Respostas Corretas',
    'totalQuestions': 'Total de Questões',
    'percentage': 'Porcentagem',
    'showAnswer': 'Mostrar Resposta',
    'hideAnswer': 'Ocultar Resposta',
  },
  'en': {
    'title': 'Study System',
    'selectSubject': 'Select subject',
    'enterTopic': 'Enter specific topic',
    'generateFlashcards': 'Generate Flashcards',
    'generateTest': 'Generate Test',
    'matematica': 'Mathematics',
    'fisica': 'Physics',
    'quimica': 'Chemistry',
    'biologia': 'Biology',
    'historia': 'History',
    'geografia': 'Geography',
    'language': 'Language',
    'portuguese': 'Portuguese',
    'english': 'English',
    'privacyPolicy': 'Privacy Policy',
    'loading': 'Loading...',
    'next': 'Next',
    'previous': 'Previous',
    'submit': 'Submit',
    'results': 'Results',
    'correct': 'Correct',
    'incorrect': 'Incorrect',
    'score': 'Score',
    'explanation': 'Explanation',
    'backToHome': 'Back to Home',
    'generateTestFromFlashcards': 'Generate Test',
    'flashcard': 'Flashcard',
    'of': 'of',
    'question': 'Question',
    'answer': 'Answer',
    'selectAnswer': 'Select an answer',
    'reviewAnswers': 'Review Answers',
    'startTest': 'Start Test',
    'finishTest': 'Finish Test',
    'testComplete': 'Test Complete',
    'correctAnswers': 'Correct Answers',
    'totalQuestions': 'Total Questions',
    'percentage': 'Percentage',
    'showAnswer': 'Show Answer',
    'hideAnswer': 'Hide Answer',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt-BR');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'pt-BR' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
