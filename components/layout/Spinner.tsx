'use client'

//Lucide Icons
import { Loader2 } from 'lucide-react'
//Internal Lib
import { cn } from '@/lib/utils/tailwind.utils'

type SpinnerProps = { message?: string }

export const Spinner = ({ message }: SpinnerProps) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Loader2 className='h-8 w-8 animate-spin text-gray-600' />
      <p
        className={cn(
          'text-muted-foreground h-10',
          message ? 'opacity-100' : 'opacity-0'
        )}
      >
        {message}
      </p>
    </div>
  )
}
