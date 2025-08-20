'use client'

//Components
import { AvatarUserDropdown } from './AvatarUserDropdown'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
//Hooks
import { useAuth } from '@/hooks/useAuthContext'

export const Navbar = () => {
  const { userData } = useAuth()

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xs'>
      <div className=' mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex justify-center gap-2 items-center'>
            <ThemeToggle />
            <h1 className='text-xl font-bold text-primary'>freshcells</h1>
          </div>

          <div className='flex items-center gap-3'>
            <div className='hidden sm:block'>
              <LanguageSwitcher variant='compact' />
            </div>
            <div className='sm:hidden'>
              <LanguageSwitcher variant='icon-only' />
            </div>

            {userData && (
              <div className='flex items-center space-x-3'>
                <AvatarUserDropdown />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
