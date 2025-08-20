'use client'

//Core
import { useState } from 'react'
//Lucide Icons
import { Info, Copy, Check } from 'lucide-react'
//Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
//Internal Lib
import { mockCredentials } from '@/lib/mocks/mockData'
//Hooks
import { useI18n } from '@/hooks/useI18n'

type Copied = {
  copied: boolean
  text: string
}

export function MockCredentials() {
  const [copied, setCopied] = useState<Copied>()
  const { t } = useI18n()

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied({ copied: true, text })
      setTimeout(() => setCopied({ copied: false, text }), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Card className='w-full max-w-md shadow-lg border-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 mb-6'>
      <CardHeader className='pb-3'>
        <div className='flex items-center gap-2'>
          <Info className='h-5 w-5 text-blue-600' />
          <CardTitle className='text-lg text-blue-800 dark:text-blue-200'>
            {t('mock.testCredentials')}
          </CardTitle>
          <Badge variant='secondary' className='text-xs'>
            {t('mock.mockMode')}
          </Badge>
        </div>
        <CardDescription className='text-blue-700 dark:text-blue-300'>
          {t('mock.useCredentials')}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-blue-800 dark:text-blue-200'>
              {t('auth.email')}:
            </span>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => copyToClipboard(mockCredentials.email)}
              className='h-6 px-2 text-xs'
            >
              {copied?.text === mockCredentials.email ? (
                <Check className='h-3 w-3 text-green-600' />
              ) : (
                <Copy className='h-3 w-3' />
              )}
            </Button>
          </div>
          <div className='p-2 bg-white dark:bg-gray-800 rounded border font-mono text-sm'>
            {mockCredentials.email}
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-blue-800 dark:text-blue-200'>
              {t('auth.password')}:
            </span>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => copyToClipboard(mockCredentials.password)}
              className='h-6 px-2 text-xs'
            >
              {copied?.text === mockCredentials.password ? (
                <Check className='h-3 w-3 text-green-600' />
              ) : (
                <Copy className='h-3 w-3' />
              )}
            </Button>
          </div>
          <div className='p-2 bg-white dark:bg-gray-800 rounded border font-mono text-sm'>
            {mockCredentials.password}
          </div>
        </div>

        <div className='pt-2 border-t border-blue-200 dark:border-blue-800'>
          <p className='text-xs text-blue-600 dark:text-blue-400'>
            {t('mock.tryWrongCredentials')}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
