
import { createI18n } from 'vue-i18n';
import en from './en'
import zh from './zh'
import vi from './vi'
import th from './th'
import ms from './ms'

let currLang = 'th'
if (navigator.language.includes('en')) {
  currLang = 'en'
}
if (navigator.language.includes('zh')) {
  currLang = 'zh'
}
if (navigator.language.includes('vi')) {
  currLang = 'vi'
}
if (navigator.language.includes('ms')) {
  currLang = 'ms'
}
if (navigator.language.includes('th')) {
  currLang = 'th'
}

const i18n = createI18n({
  locale: currLang, // 默认语言
  messages: {
    en,
    zh,
    vi,
    th,
    ms
  }
});

const lang = localStorage.getItem('lang')
if (lang) {
  i18n.global.locale = lang
} else {
  localStorage.setItem('lang', i18n.global.locale)
}

export default i18n

