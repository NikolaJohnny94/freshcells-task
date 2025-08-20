'use client'

//Components
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
//Icons
import { Globe, Check } from 'lucide-react'
//Hooks
import { useI18n } from '@/hooks/useI18n'
//Types
import { Locale } from '@/types'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]

type LanguageSwitcherProps = {
  variant?: 'default' | 'compact' | 'icon-only'
  align?: 'start' | 'center' | 'end'
}

export function LanguageSwitcher({
  variant = 'default',
  align = 'end',
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n()

  const selectedLanguage = languages.find((lang) => lang.code === locale)

  const handleLanguageChange = (language: (typeof languages)[0]) => {
    setLocale(language.code as Locale)
  }

  if (!selectedLanguage) {
    console.error(`Locale "${locale}" not found in language list.`)
    return null
  }

  if (variant === 'icon-only') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='h-9 w-9'>
            <Globe className='h-4 w-4' />
            <span className='sr-only'>Switch language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} className='w-48'>
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className='flex items-center justify-between cursor-pointer'
            >
              <div className='flex items-center gap-2'>
                <span className='text-lg'>{language.flag}</span>
                <span>{language.name}</span>
              </div>
              {selectedLanguage.code === language.code && (
                <Check className='h-4 w-4 text-primary' />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm' className='h-8 gap-1 px-2'>
            <span className='text-sm'>{selectedLanguage.flag}</span>
            <span className='text-xs font-medium'>
              {selectedLanguage.code.toUpperCase()}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} className='w-48'>
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className='flex items-center justify-between cursor-pointer'
            >
              <div className='flex items-center gap-2'>
                <span className='text-lg'>{language.flag}</span>
                <span>{language.name}</span>
              </div>
              {selectedLanguage.code === language.code && (
                <Check className='h-4 w-4 text-primary' />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='gap-2 bg-transparent'>
          <span>{selectedLanguage.flag}</span>
          <span>{selectedLanguage.name}</span>
          <Globe className='h-4 w-4 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className='w-48'>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className='flex items-center justify-between cursor-pointer'
          >
            <div className='flex items-center gap-2'>
              <span className='text-lg'>{language.flag}</span>
              <span>{language.name}</span>
            </div>
            {selectedLanguage.code === language.code && (
              <Check className='h-4 w-4 text-primary' />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
