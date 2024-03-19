import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import NotFound from "./components/NotFound.tsx";
import EventSinglePage from "./pages/EventSinglePage.tsx";
import CommunitiesPage from "./pages/CommunitiesPage.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import SecureRoute from "./SecureRoute.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import CommunitySinglePage from "./pages/CommunitySinglePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider
    clientId={
      "449306918566-08e7ln3lkq2jj9ulb8pgb4bs5525ebdq.apps.googleusercontent.com"
    }
  >
    <React.StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Header />
            <main className="dark:text-white pb-16 lg:pb-24 lg:px-12 md:px-8 px-4 lg:mt-0 mt-24">
              <Routes>
                <Route element={<App />} path="/" />
                <Route
                  element={
                    <SecureRoute>
                      <EventsPage />
                    </SecureRoute>
                  }
                  path="/eventos"
                />
                <Route
                  element={
                    <SecureRoute>
                      <EventSinglePage />
                    </SecureRoute>
                  }
                  path="/evento/:id"
                />
                <Route
                  element={
                    <SecureRoute>
                      <CommunitiesPage />
                    </SecureRoute>
                  }
                  path="/comunidades"
                />
                <Route
                  element={
                    <SecureRoute>
                      <CommunitySinglePage />
                    </SecureRoute>
                  }
                  path="/comunidade/:id"
                />
                <Route
                  element={
                    <SecureRoute>
                      <ProfilePage />
                    </SecureRoute>
                  }
                  path="/perfil"
                />
                <Route element={<AboutPage />} path="/sobre" />
                <Route element={<LoginPage />} path="/entre" />
                <Route element={<RegisterPage />} path="/cadastro" />
                <Route element={<NotFound />} path="/*" />
              </Routes>
            </main>
          </BrowserRouter>
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
