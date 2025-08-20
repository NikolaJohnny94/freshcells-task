//Core
import { useRouter } from 'next/navigation'
//Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'
//Lucide Icons
import { LogOut, User } from 'lucide-react'
//Hooks
import { useAuth } from '@/hooks/useAuthContext'
import { useI18n } from '@/hooks/useI18n'
//Internal Lib
import { getUserInitials } from '@/lib/utils/user.utils'

export function AvatarUserDropdown() {
  const { userData, clearAuth } = useAuth()
  const { t } = useI18n()
  const router = useRouter()

  const logoutUser = () => {
    router.push('/login')
    toast.success('Successfully logged out!')
    clearAuth()
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='h-10 w-10 border-2  cursor-pointer shadow-md'>
            <AvatarFallback className='!bg-primary text-white dark:text-black border-none shadow-md'>
              {getUserInitials({
                firstName: userData?.firstName,
                lastName: userData?.lastName,
              })}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem>
            <User className='h-4 w-4' />
            <span>{t('account.profile')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button className='cursor-pointer w-full' onClick={logoutUser}>
              <LogOut className='h-4 w-4 mr-2' /> {t('auth.logout')}
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
