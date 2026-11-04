import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  register: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
export interface IUser {
  username: string;
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
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  console.log("initial user", user);
  console.log("Is logged in in auth provider", isLoggedIn);
  const register = () => {};
  const login = () => {};
  const logout = () => {};
  return (
    <AuthContext.Provider value={{ isLoggedIn, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("use Auth must be use within a Auth Provider");
  return context;
};
