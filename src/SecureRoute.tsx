import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

interface Props {
  children: ReactNode;
}

const SecureRoute = ({ children }: Props) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/entre" replace />;
};

export default SecureRoute;
