import i18next from 'i18next';
import en from './locales/en.json'
import ru from './locales/ru.json'


i18next.init({
lng: "en",
fallbackLng: "en",
  debug: true,
  resources: {
    en: {translation: en},
    ru: {translation: ru}
    }
  });
