//Types
import type { User } from '@/types'

export function getUserInitials(
  userData: Pick<User, 'firstName' | 'lastName'>
): string {
  const firstInitial = userData?.firstName?.[0] || ''
  const lastInitial = userData?.lastName?.[0] || ''
  return `${firstInitial}${lastInitial}`
}
