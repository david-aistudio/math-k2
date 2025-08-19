import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enTranslation from '../locales/en/translation.json';
import idTranslation from '../locales/id/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  id: {
    translation: idTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
