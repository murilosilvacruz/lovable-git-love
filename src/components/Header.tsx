'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              {t('title')}
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-gray-700" />
              <span className="text-sm text-gray-900">{t('language')}:</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'pt-BR' | 'en')}
                className="text-sm text-gray-900 bg-white border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="pt-BR">{t('portuguese')}</option>
                <option value="en">{t('english')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
