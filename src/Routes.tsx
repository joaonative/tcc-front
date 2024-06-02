import { Routes as Router, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/Auth.context";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./components/NotFound";
import Events from "./pages/Events";
import EventSingle from "./pages/EventSingle";
import Loading from "./components/Loading";
import { ReactNode, useEffect } from "react";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Communities from "./pages/Communities";
import Community from "./pages/Community";
import SearchEvent from "./pages/SearchEvent";
import SearchComm from "./pages/SearchComm";
import { configureInterceptorFunctions } from "./api/api";
import { useError } from "./contexts/Error.context";

interface RouteProps {
  element: ReactNode;
}

const PrivateRoute = ({ element }: RouteProps) => {
  const { authenticated, loadingAuth } = useAuth();

  if (loadingAuth) return <Loading />;

  if (!authenticated) return <Navigate to="/entre" replace />;

  return element;
};

const Routes = () => {
  const { logout } = useAuth();
  const { setError } = useError();
  useEffect(() => {
    configureInterceptorFunctions(logout, setError);
  }, [logout, setError]);
  return (
    <Router>
      <Route path="/" element={<App />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/entre" element={<Login />} />
      <Route path="/contato" element={<Contact />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/eventos" element={<PrivateRoute element={<Events />} />} />
      <Route
        path="/eventos/pesquisar"
        element={<PrivateRoute element={<SearchEvent />} />}
      />
      <Route
        path="/evento/:id"
        element={<PrivateRoute element={<EventSingle />} />}
      />
      <Route
        path="/comunidades"
        element={<PrivateRoute element={<Communities />} />}
      />
      <Route
        path="/comunidades/pesquisar"
        element={<PrivateRoute element={<SearchComm />} />}
      />
      <Route
        path="/comunidade/:id"
        element={<PrivateRoute element={<Community />} />}
      />
      <Route path="/perfil" element={<PrivateRoute element={<Profile />} />} />
    </Router>
  );
};

export default Routes;
