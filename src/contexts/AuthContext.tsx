import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate, redirect } from "react-router-dom";

interface AuthContextType {
  userData: userData | undefined;
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
}

interface userData {
  sub: string;
  name: string;
  given_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<userData>();
  const [storedData] = useState<userData | undefined>(() => {
    const stored = localStorage.getItem("user-data");
    if (stored) {
      return JSON.parse(stored);
    }
    return undefined;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (storedData) {
      return true;
    }

    return false;
  });

  const loginCallback = async (tokenResponse: TokenResponse) => {
    const expirationDate = new Date(
      Date.now() + tokenResponse.expires_in * 1000
    );

    document.cookie = `access-token=${
      tokenResponse.access_token
    }; expires=${expirationDate.toUTCString()}; path=/; HttpOnly;`;

    console.log(document.cookie);

    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
    );

    setUserData(response.data);
    localStorage.setItem("user-data", JSON.stringify(response.data));
    setIsLoggedIn(true);
    window.location.href = "/eventos";
  };

  useEffect(() => {
    if (storedData) {
      setUserData(storedData);
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: loginCallback,
  });

  const logout = () => {
    setUserData(undefined);
    localStorage.removeItem("user-data");
    document.cookie =
      "access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
