import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import fr from './fr.json'

const saved = localStorage.getItem('soul-lab-locale')
const lng = saved === 'en' || saved === 'fr' ? saved : 'fr'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
