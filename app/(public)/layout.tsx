'use client'
//Core
import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
//Hooks
import { useAuth } from '@/hooks/useAuthContext'
import { Spinner } from '@/components/layout/Spinner'

export default function PublicLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/account')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading && !isAuthenticated) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
        <Spinner />
      </div>
    )
  }

  if (!isLoading && !isAuthenticated) return <>{children}</>
}
