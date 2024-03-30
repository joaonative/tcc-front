import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./contexts/Auth.context";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./components/NotFound";
import Events from "./pages/Events";
import EventSingle from "./pages/EventSingle";
import Loading from "./components/Loading";

const PrivateRoutes = () => {
  const { authenticated, loadingAuth } = useAuth();

  if (loadingAuth) return <Loading />;

  if (!authenticated) return <Navigate to={"/entre"} replace />;

  return <Outlet />;
};

const Routes = () => {
  return (
    <>
      <Router>
        <Route element={<PrivateRoutes />}>
          <Route path="/perfil" element={<Profile />} />
          <Route path="/eventos" element={<Events />} />
          <Route path="/evento/:id" element={<EventSingle />} />
        </Route>
        <Route path="/" element={<App />} />
        <Route path="/entre" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Router>
    </>
  );
};

export default Routes;
