import { User } from '@/types'
import { createContext, Dispatch, SetStateAction } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  userId: string | null
  userData: User | null
  isLoading: boolean
  isLoggingOut: boolean
  setUserIdAndToken: (token: string) => void
  setUserData: Dispatch<SetStateAction<User | null>>
  setIsLoggingOut: Dispatch<SetStateAction<boolean>>
  clearAuth: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
