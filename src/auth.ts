const AUTH_KEY = 'isAuthenticated';

const VALID_EMAIL = 'test@example.com';
const VALID_PASSWORD = 'password123';

export function login(email: string, password: string): boolean {
  if (email.trim() === VALID_EMAIL && password === VALID_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function logout(): void {
  sessionStorage.clear();
}
