import { jwtDecode } from 'jwt-decode'
//Types
import type { User } from '@/types'

type DecodedToken = {
  id: string
  exp: number
  iat: number
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token)
  } catch (error) {
    console.error('Invalid token:', error)
    return null
  }
}

export function isTokenExpired(expirationAt: number): boolean {
  try {
    if (!expirationAt) return true

    const currentTime = Math.floor(Date.now() / 1000)
    return expirationAt < currentTime
  } catch (error) {
    console.error('Error checking token expiration:', error)
    return true
  }
}
