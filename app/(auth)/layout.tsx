'use client'

//Core
import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
//Components
import { Spinner } from '@/components/layout/Spinner'
//Hooks
import { useAuth } from '@/hooks/useAuthContext'
import { useI18n } from '@/hooks/useI18n'

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, userId, clearAuth, isLoggingOut } =
    useAuth()
  const router = useRouter()
  const { t } = useI18n()

  useEffect(() => {
    if ((!isLoading && !isAuthenticated) || isLoggingOut) {
      router.replace('/login')
    }
  }, [isAuthenticated, router, isLoading])

  if ((isLoading && !isAuthenticated) || isLoggingOut) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
        <Spinner message={isLoggingOut ? t('auth.loggingOut') : ''} />
      </div>
    )
  }

  if (!isLoading && isAuthenticated && !userId) {
    clearAuth()
    router.push('/login')
  }

  if (!isLoading && isAuthenticated && userId) return <>{children}</>

  return null
}
