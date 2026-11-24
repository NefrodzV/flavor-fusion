import type { ReactNode } from "react";
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { AuthApiService } from "~/services/auth/auth-api";

interface AuthContextType {
  isLoggedIn: boolean;
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;

  initialUser?: IUser | null;
}
export function AuthProvider({
  children,
  initialUser = null
}: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(initialUser);
  const isLoggedIn = !!user;

  const authService = useMemo(() => new AuthApiService(), []);

  useEffect(() => {
    const getUser = async () => {
      const res = await authService.getCurrentUser();
      setUser(res.user || null);
    };

    getUser();
  }, []);

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const res = await authService.register(
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    );
    setUser(res.user || null);
  };

  const login = async (email: string, password: string) => {
    const res = await authService.login(email, password);
    setUser(res.user || null);
  };

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("use Auth must be use within a Auth Provider");
  return context;
};
