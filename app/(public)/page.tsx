'use client'

//Core
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
//UI Components
import { Card, CardContent } from '@/components/ui/card'
//Lucide React
import { Loader2 } from 'lucide-react'
//Hooks
import { useI18n } from '@/hooks/useI18n'
import { useAuth } from '@/hooks/useAuthContext'

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const { t } = useI18n()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/account')
    } else {
      router.replace('/login')
    }
  }, [isAuthenticated, router])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
      <Card className='w-full max-w-md shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'>
        <CardContent className='flex flex-col items-center justify-center py-12 space-y-4'>
          <Loader2 className='h-8 w-8 animate-spin text-blue-600' />
          <p className='text-muted-foreground'>{t('common.redirecting')}</p>
        </CardContent>
      </Card>
    </div>
  )
}
