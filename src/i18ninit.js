import i18next from 'i18next'
import en from './locales/en.json'
import ru from './locales/ru.json'

i18next.init({
  lng: 'ru',
  fallbackLng: 'ru',
  debug: true,
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
})
window.i18next = i18next
