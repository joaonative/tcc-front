import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  userData: userData | undefined;
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

interface userData {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
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
  const [userData, setUserData] = useState<userData | undefined>(undefined);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/auth", {
          withCredentials: true,
        });
        setIsLoggedIn(response.status === 200);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  const login = async (email: string, password: string) => {
    console.log(isLoggedIn);
    const response = await axios.post(
      "http://localhost:8080/users/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    const userData = response.data.userData;
    if (userData) {
      setUserData(userData);
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    await axios.get("http://localhost:8080/users/logout", {
      withCredentials: true,
    });
    setUserData(undefined);
    setIsLoggedIn(false);
  };

  if (isLoggedIn === null) {
    return <div>carreando</div>;
  }

  return (
    <AuthContext.Provider
      value={{ userData, login, logout, isLoggedIn: isLoggedIn || false }}
    >
      {children}
    </AuthContext.Provider>
  );
};
