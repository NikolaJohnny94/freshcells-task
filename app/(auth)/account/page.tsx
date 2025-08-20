'use client'

//Apollo & Queries
import { useQuery } from '@apollo/client'
import { GET_USER_QUERY } from '@/graphql/queries/user.queries'
//Lucide Icons
import { User, UserCircle } from 'lucide-react'
//Hooks
import { useAuth } from '@/hooks/useAuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
//UI Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/layout/Spinner'
//Localization
import { useI18n } from '@/hooks/useI18n'
import { getUserInitials } from '@/lib/utils/user.utils'

export default function AccountPage() {
  const { setUserData, userId, isLoggingOut } = useAuth()
  const { t } = useI18n()
  const router = useRouter()

  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    variables: { id: userId },
    skip: !userId,
  })

  useEffect(() => {
    if (data?.user) {
      setUserData({
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
      })
    }
  }, [data?.user])

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
        <Spinner message={t('account.loadingDetails')} />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative'>
        <Card className='w-full max-w-md shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'>
          <CardContent className='flex flex-col items-center justify-center py-12 space-y-4'>
            <div className='text-red-500 text-center'>
              <UserCircle className='h-12 w-12 mx-auto mb-2' />
              <p className='text-sm text-muted-foreground'>
                {error ? t('account.errorLoading') : t('auth.enterCredentials')}
              </p>
              {error && (
                <p className='text-xs text-red-600 mt-1'>{error.message}</p>
              )}
            </div>
            <Button onClick={() => router.push('/login')} variant='outline'>
              {error ? t('common.retry') : t('auth.login')}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoggingOut) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
        <Spinner message={t('auth.loggingOut')} />
      </div>
    )
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 relative'>
      <Card className='w-full max-w-md shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'>
        <CardHeader className='space-y-1 pb-4'>
          <div className='flex items-center justify-center mb-4'>
            <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white dark:text-black text-xl font-bold'>
              {getUserInitials({
                firstName: data?.user?.firstName,
                lastName: data?.user?.lastName,
              })}
            </div>
          </div>
          <CardTitle className='text-2xl font-bold text-center text-primary bg-clip-text'>
            {t('account.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label className='text-sm font-medium text-muted-foreground flex items-center gap-2'>
                <User className='h-4 w-4' />
                {t('account.firstName')}
              </Label>
              <Input
                type='text'
                placeholder='First Name'
                value={data?.user?.firstName || ''}
                disabled
              />
            </div>

            <div className='space-y-2'>
              <Label className='text-sm font-medium text-muted-foreground flex items-center gap-2'>
                <User className='h-4 w-4' />
                {t('account.lastName')}
              </Label>

              <Input
                type='text'
                placeholder='Last Name'
                value={data?.user?.lastName || ''}
                disabled
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
