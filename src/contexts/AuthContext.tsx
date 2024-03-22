import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface AuthContextType {
  userData: userData | undefined;
  error: any | undefined;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (
    email: string,
    password: string,
    name: string,
    phone: string,
    age: number
  ) => void;
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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const [storedData] = useState<userData | null>(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      return JSON.parse(data) as userData;
    } else {
      return null;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!storedData;
  });

  useEffect(() => {
    if (storedData) {
      setUserData(storedData);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");
    try {
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
        localStorage.setItem("userData", JSON.stringify(userData));
        setIsLoggedIn(true);
      }
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Erro interno no servidor");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await axios.get("http://localhost:8080/users/logout", {
      withCredentials: true,
    });
    setUserData(undefined);
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setIsLoading(false);
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    phone: string,
    age: number
  ) => {
    setIsLoading(true);
    const response = await axios.post(
      "http://localhost:8080/users",
      { email, password, name, age, phone },
      {
        withCredentials: true,
      }
    );
    const userData = response.data.userData;
    if (userData) {
      setUserData(userData);
      localStorage.setItem("userData", JSON.stringify(userData));
      setUserData(userData);
      setIsLoggedIn(true);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>carreando</div>;
  }

  return (
    <AuthContext.Provider
      value={{ userData, login, logout, isLoggedIn, register, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
