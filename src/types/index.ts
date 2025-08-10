export type Language = 'pt-BR' | 'en';

export type Subject = 'matematica' | 'fisica' | 'quimica' | 'biologia' | 'historia' | 'geografia';

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TestResult {
  totalQuestions: number;
  correctAnswers: number;
  questions: TestQuestion[];
  userAnswers: number[];
}

export interface StudySession {
  id: string;
  subject: Subject;
  topic: string;
  type: 'flashcards' | 'test';
  createdAt: Date;
  flashcards?: Flashcard[];
  testResult?: TestResult;
}
