import { useCallback, useEffect } from 'react'
import i18n from '../i18n/config'
import { useTranslation } from 'react-i18next'

export type Lang = 'en' | 'tr'

const KEY = 'kerem.lang'
const supported: Lang[] = ['en', 'tr']

function persist(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang)
  } catch {
    /* storage blocked — language still applies for this session */
  }
  document.documentElement.setAttribute('lang', lang)
}

export function setLanguage(lang: Lang) {
  persist(lang)
  void i18n.changeLanguage(lang)
}

export function useLanguage() {
  const { i18n: instance } = useTranslation()
  const current = (instance.resolvedLanguage || instance.language || 'en').split('-')[0] as Lang
  const language: Lang = supported.includes(current) ? current : 'en'

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.setAttribute('lang', language)
  }, [language])

  const toggle = useCallback(() => {
    setLanguage(language === 'en' ? 'tr' : 'en')
  }, [language])

  return { language, setLanguage: (lang: Lang) => setLanguage(lang), toggle }
}