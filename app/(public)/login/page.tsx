'use client'
//Core (React/Next)
import { useEffect, useState } from 'react'
//Lucide Icons
import { Loader2, AlertCircle } from 'lucide-react'
//React Hook Form & Zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
//Apollo & GraphQL
import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '@/graphql/mutations/auth/auth.mutations'
//UI Components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import { toast } from 'sonner'
//Hooks
import { useAuth } from '@/hooks/useAuthContext'
//Schemas
import {
  loginSchema,
  type LoginFormValues,
} from '@/lib/schemas/validation/auth/auth.schemas'
//Mock
import { MockCredentials } from '@/components/mock/MockCredentials'
import { useRouter } from 'next/navigation'
//Localization
import { useI18n } from '@/hooks/useI18n'

export default function LoginPage() {
  const { setUserIdAndToken, isAuthenticated } = useAuth()
  const { t } = useI18n()
  const router = useRouter()

  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isMockMode =
    !process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT === 'mock'

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      try {
        setUserIdAndToken(data.login.jwt)
        toast.success(t('auth.loginSuccess'))
        router.push('/account')
      } catch (error: any) {
        toast.error(error.message)
      }
    },
    onError: (error) => {
      const errorMessage = error.message || t('auth.loginError')
      setServerError(errorMessage)
      toast.error(errorMessage)
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    setServerError(null)
    loginMutation({
      variables: {
        identifier: data.email.trim(),
        password: data.password,
      },
    })
  }

  useEffect(() => {
    let toastId: string | number | null = null

    if (loading && !isAuthenticated) {
      toastId = toast.loading(t('auth.loggingIn'))
    }
    return () => {
      if (toastId) {
        toast.dismiss(toastId)
      }
    }
  }, [loading, isAuthenticated, t])

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10 mt-10'>
      <div className='w-full max-w-sm'>
        <Card className='mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>{t('auth.login')}</CardTitle>
            <CardDescription>{t('auth.enterCredentials')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                {serverError && (
                  <div className='flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg'>
                    <AlertCircle className='h-4 w-4 flex-shrink-0' />
                    <span>{serverError}</span>
                  </div>
                )}
                <div className='grid gap-4'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem className='grid gap-2'>
                        <FormLabel htmlFor='email'>{t('auth.email')}</FormLabel>
                        <FormControl>
                          <Input
                            id='email'
                            placeholder='johndoe@mail.com'
                            type='email'
                            autoComplete='email'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem className='grid gap-2'>
                        <div className='flex justify-between items-center'>
                          <FormLabel htmlFor='password'>
                            {t('auth.password')}
                          </FormLabel>
                        </div>
                        <FormControl>
                          <PasswordInput
                            id='password'
                            placeholder='******'
                            autoComplete='current-password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit' className='w-full'>
                    {loading ? (
                      <span className='flex items-center gap-2'>
                        <span> {t('auth.loggingIn')}</span>{' '}
                        <Loader2 className='animate-spin' />
                      </span>
                    ) : (
                      <span> {t('auth.login')}</span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        {isMockMode && (
          <div className='mt-8'>
            <MockCredentials />
          </div>
        )}
      </div>
    </div>
  )
}
