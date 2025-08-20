//Core
import { createContext } from 'react'
//Types
import { Locale } from '@/types'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string>) => string
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined)
