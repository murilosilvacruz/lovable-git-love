import { GoogleGenerativeAI } from '@google/generative-ai';
import { Flashcard, TestQuestion, Subject } from '@/types';

function getModel() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key não configurada. Defina NEXT_PUBLIC_GEMINI_API_KEY no .env.local.');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
}

export async function generateFlashcards(subject: Subject, topic: string, language: 'pt-BR' | 'en'): Promise<Flashcard[]> {
  const model = getModel();

  const prompt = language === 'pt-BR' 
    ? `Gere 15 flashcards sobre ${topic} na disciplina de ${subject}. 
       Cada flashcard deve ter uma pergunta clara e uma resposta concisa.
       Retorne apenas um JSON válido com o formato:
       [
         {"id": "1", "question": "pergunta aqui", "answer": "resposta aqui"},
         {"id": "2", "question": "pergunta aqui", "answer": "resposta aqui"}
       ]`
    : `Generate 15 flashcards about ${topic} in the subject of ${subject}.
       Each flashcard should have a clear question and a concise answer.
       Return only a valid JSON with the format:
       [
         {"id": "1", "question": "question here", "answer": "answer here"},
         {"id": "2", "question": "question here", "answer": "answer here"}
       ]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }
    
    const flashcards = JSON.parse(jsonMatch[0]);
    return flashcards.map((fc: { id?: string; question: string; answer: string }, index: number) => ({
      id: fc.id || (index + 1).toString(),
      question: fc.question,
      answer: fc.answer
    }));
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw new Error('Failed to generate flashcards');
  }
}

export async function generateTest(subject: Subject, topic: string, language: 'pt-BR' | 'en'): Promise<TestQuestion[]> {
  const model = getModel();

  const prompt = language === 'pt-BR'
    ? `Gere 10 questões de múltipla escolha sobre ${topic} na disciplina de ${subject}.
       Cada questão deve ter 4 alternativas (A, B, C, D) com apenas uma correta.
       Inclua uma explicação para cada resposta correta.
       Retorne apenas um JSON válido com o formato:
       [
         {
           "id": "1",
           "question": "pergunta aqui",
           "options": ["A) alternativa A", "B) alternativa B", "C) alternativa C", "D) alternativa D"],
           "correctAnswer": 0,
           "explanation": "explicação da resposta correta"
         }
       ]
       O campo correctAnswer deve ser o índice da alternativa correta (0-3).`
    : `Generate 10 multiple choice questions about ${topic} in the subject of ${subject}.
       Each question should have 4 options (A, B, C, D) with only one correct answer.
       Include an explanation for each correct answer.
       Return only a valid JSON with the format:
       [
         {
           "id": "1",
           "question": "question here",
           "options": ["A) option A", "B) option B", "C) option C", "D) option D"],
           "correctAnswer": 0,
           "explanation": "explanation of correct answer"
         }
       ]
       The correctAnswer field should be the index of the correct option (0-3).`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }
    
    const questions = JSON.parse(jsonMatch[0]);
    return questions.map((q: { id?: string; question: string; options: string[]; correctAnswer: number; explanation: string }, index: number) => ({
      id: q.id || (index + 1).toString(),
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation
    }));
  } catch (error) {
    console.error('Error generating test:', error);
    throw new Error('Failed to generate test');
  }
}
