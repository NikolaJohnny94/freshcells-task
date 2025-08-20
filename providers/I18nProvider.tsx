'use client'

//Core
import { useState, ReactNode, useEffect } from 'react'
//Context
import { I18nContext } from '@/context/I18nContext'
//Hooks
import { useTranslation } from '@/hooks/useTranslations'
//Types
import { Locale } from '@/types'

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('en')

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedLocale = localStorage.getItem('locale') as Locale
    if (storedLocale) {
      setLocaleState(storedLocale)
    }
  }, [])

  const { t } = useTranslation(locale)

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (isClient) {
      localStorage.setItem('locale', newLocale)
    }
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}
