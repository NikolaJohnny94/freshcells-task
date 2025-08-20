'use client'

//Core
import { useEffect } from 'react'
//Lucide Icons
import { AlertTriangle, RefreshCw } from 'lucide-react'
//Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Next.js Error Boundary caught an error:', error)
  }, [error])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4'>
      <Card className='w-full max-w-md shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'>
        <CardHeader className='space-y-1 pb-4'>
          <div className='flex items-center justify-center mb-4'>
            <div className='w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center'>
              <AlertTriangle className='h-8 w-8 text-red-600' />
            </div>
          </div>
          <CardTitle className='text-2xl font-bold text-center text-red-600'>
            Something went wrong
          </CardTitle>
          <CardDescription className='text-center text-muted-foreground'>
            An unexpected error occurred. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {error && (
            <div className='p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg'>
              <p className='text-sm text-red-600 dark:text-red-400 font-mono'>
                {error.message}
              </p>
            </div>
          )}
          <div className='flex gap-2'>
            <Button
              // Use the `reset` prop provided by Next.js to attempt to re-render the segment.
              onClick={() => reset()}
              className='flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
            >
              <RefreshCw className='h-4 w-4 mr-2' />
              Try Again
            </Button>
            <Button
              // A fallback button to force a full page reload.
              onClick={() => window.location.reload()}
              variant='outline'
              className='flex-1'
            >
              Reload Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
