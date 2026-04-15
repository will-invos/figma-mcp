/**
 * Minimal mock auth helpers — reads/writes localStorage only.
 * Not a service layer; inlined here for prototype simplicity.
 */

const STORAGE_KEY = 'auth_user'

export interface AuthUser {
  email: string
  loginAt: number
  provider?: 'email' | 'google' | 'apple' | 'line'
}

export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function setAuthUser(user: AuthUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function clearAuthUser(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function isAuthenticated(): boolean {
  return getAuthUser() !== null
}

/** Mock delay helper — used to simulate API latency. */
export function mockDelay(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim())
}

/** Password: ≥ 8 chars, contains at least one letter and one digit. */
export function isValidPassword(pw: string): boolean {
  return pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw)
}
