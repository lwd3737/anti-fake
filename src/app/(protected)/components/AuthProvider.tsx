'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PageRoutes } from '@/constants/routes';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  login?: () => void;
  logout?: () => void;
}>({ isAuthenticated: false });

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(() => {
    setIsAuthenticated(true);
    // router.replace('/');
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    router.push(PageRoutes.LOGIN);
  }, [router]);

  useEffect(
    function authenticate() {
      if (isAuthenticated) return;

      const accessTokenCookie = document.cookie
        .split(';')
        .find((cookie) => cookie.includes('access-token'));
      if (!accessTokenCookie) {
        return;
      }

      const accessToken = accessTokenCookie.split('=')[1];
      if (accessToken) {
        setIsAuthenticated(true);
      }
    },
    [isAuthenticated, login, logout],
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  if (!login || !logout) {
    throw new Error('AuthProvider를 사용하지 않았습니다.');
  }

  return {
    isAuthenticated,
    login,
    logout,
  };
}
