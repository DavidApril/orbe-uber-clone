import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import es from '../../locales/es.json';
import en from '../../locales/en.json';

export const lenguageSources = {
  es: {translation: es},
  en: {translation: en},
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'es',
  fallbackLng: 'es',
  resources: lenguageSources
});
