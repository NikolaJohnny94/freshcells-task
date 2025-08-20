//Internal Lib
import { de } from '@/lib/i18n/locales/de'
import { en } from '@/lib/i18n/locales/en'
import { es } from '@/lib/i18n/locales/es'
import { ru } from '@/lib/i18n/locales/ru'
//Types
import { Locale } from '@/types'

export type TranslationKey = keyof typeof en

const translations = {
  en,
  es,
  de,
  ru,
}

export const useTranslation = (locale: Locale = 'en') => {
  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split('.')
    let value: any = translations[locale]

    for (const k of keys) {
      value = value?.[k]
    }

    if (typeof value !== 'string') {
      console.warn(`Translation key not found: ${key}`)
      return key
    }

    if (params) {
      return Object.entries(params).reduce((str, [key, val]) => {
        return str.replace(`{${key}}`, val)
      }, value)
    }

    return value
  }

  return { t, locale }
}
