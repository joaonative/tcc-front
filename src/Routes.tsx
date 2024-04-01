import { Routes as Router, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/Auth.context";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./components/NotFound";
import Events from "./pages/Events";
import EventSingle from "./pages/EventSingle";


const PrivateRoute = ({ element }: RouteProps) => {
  const { authenticated, loadingAuth } = useAuth();

  if (loadingAuth) return <Loading />;

  if (!authenticated) return <Navigate to="/entre" replace />;

  return element;
};

const Routes = () => {
  return (

  );
};

export default Routes;
