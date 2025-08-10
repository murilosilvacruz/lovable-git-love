'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Subject } from '@/types';

interface HomeFormProps {
  onSubmit: (subject: Subject, topic: string, type: 'flashcards' | 'test') => void;
  isLoading: boolean;
}

export default function HomeForm({ onSubmit, isLoading }: HomeFormProps) {
  const { t } = useLanguage();
  const [subject, setSubject] = useState<Subject>('matematica');
  const [topic, setTopic] = useState('');

  const subjects: { value: Subject; label: string }[] = [
    { value: 'matematica', label: t('matematica') },
    { value: 'fisica', label: t('fisica') },
    { value: 'quimica', label: t('quimica') },
    { value: 'biologia', label: t('biologia') },
    { value: 'historia', label: t('historia') },
    { value: 'geografia', label: t('geografia') },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(subject, topic.trim(), 'flashcards');
    }
  };

  const handleGenerateTest = () => {
    if (topic.trim()) {
      onSubmit(subject, topic.trim(), 'test');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
            {t('selectSubject')}
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value as Subject)}
            className="w-full px-3 py-2 text-base text-gray-900 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            disabled={isLoading}
          >
            {subjects.map((subj) => (
              <option key={subj.value} value={subj.value}>
                {subj.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-900 mb-2">
            {t('enterTopic')}
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-3 py-2 text-base text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder={t('enterTopic')}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="flex-1 bg-blue-700 text-white text-base font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? t('loading') : t('generateFlashcards')}
          </button>
          
          <button
            type="button"
            onClick={handleGenerateTest}
            disabled={isLoading || !topic.trim()}
            className="flex-1 bg-green-700 text-white text-base font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? t('loading') : t('generateTest')}
          </button>
        </div>
      </form>
    </div>
  );
}
