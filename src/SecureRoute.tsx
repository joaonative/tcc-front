import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

interface Props {
  redirectPath: string;
  children: ReactNode;
}

const SecureRoute = ({ redirectPath, children }: Props) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to={redirectPath} replace />;
};

export default SecureRoute;
