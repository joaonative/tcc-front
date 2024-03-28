import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "../interfaces/User";

type Props = {
  children: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;

  loadingAuth: boolean;

  user: User;
  setUser: (newSate: User) => void;
};

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},

  loadingAuth: true,

  user: {
    id: "0",
    name: "user_name",
    age: 0,
    email: "",
    phone: "",
    imageUrl: "/default.webp",
    token: "",
  },
  setUser: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );

  const [loadingAuth, setLoadingAuth] = useState(initialValue.loadingAuth);

  const [user, setUser] = useState(initialValue.user);

  useEffect(() => {
    //looking for previous userdata
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setAuthenticated(true);
      setLoadingAuth(false);
    } else {
      setLoadingAuth(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loadingAuth,
        setAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export { AuthContext, AuthProvider, useAuth };
