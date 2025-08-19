import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="flex items-center gap-1">
      <div className="flex rounded-md border border-border bg-background">
        <Button
          variant={currentLanguage === 'id' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => changeLanguage('id')}
          className="rounded-r-none px-3 py-1 h-8 text-xs font-medium transition-colors"
        >
          ID
        </Button>
        <div className="w-px bg-border"></div>
        <Button
          variant={currentLanguage === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => changeLanguage('en')}
          className="rounded-l-none px-3 py-1 h-8 text-xs font-medium transition-colors"
        >
          EN
        </Button>
      </div>
    </div>
  );
};
