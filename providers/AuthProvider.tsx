'use client'

//Core (React/Next)
import { useState, useEffect, type ReactNode } from 'react'
//Provider
import { AuthContext } from '@/context/AuthContext'
//Internal Lib
import { decodeToken, isTokenExpired } from '@/lib/utils/auth.utils'
//Hooks
import { useI18n } from '@/hooks/useI18n'
//Types
import type { User } from '@/types'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null)
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const { t } = useI18n()

  useEffect(() => {
    const token = localStorage.getItem('jwt')

    if (token) {
      const decoded = decodeToken(token)
      if (decoded) {
        if (isTokenExpired(decoded.exp)) {
          clearAuth()
          setIsLoading(false)
          return
        }
        setUserId(decoded.id)
        setIsAuthenticated(true)
      } else {
        clearAuth()
      }
    }
    setIsLoading(false)
  }, [])

  const setUserIdAndToken = (token: string) => {
    localStorage.setItem('jwt', token)

    const decoded = decodeToken(token)

    if (decoded) {
      if (isTokenExpired(decoded.exp)) {
        clearAuth()
        setIsLoading(false)
        throw new Error(t('auth.loginError'))
      }
      setUserId(decoded.id)
      setIsAuthenticated(true)
    } else {
      clearAuth()
      throw new Error(t('auth.loginError'))
    }
  }

  const clearAuth = () => {
    setIsLoggingOut(true)
    localStorage.removeItem('jwt')
    setIsAuthenticated(false)
    setUserId(null)
    setUserData(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        isLoggingOut,
        userId,
        userData,
        setUserIdAndToken,
        setUserData,
        clearAuth,
        setIsLoggingOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
