import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import NotFound from "./components/NotFound.tsx";
import EventSinglePage from "./pages/EventSinglePage.tsx";
import CommunitiesPage from "./pages/CommunitiesPage.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <main className="pb-16 lg:pb-24 lg:px-12 md:px-8 px-4">
          <Routes>
            <Route element={<App />} path="/" />
            <Route element={<EventsPage />} path="/eventos" />
            <Route element={<EventSinglePage />} path={`/evento/:id`} />
            <Route element={<CommunitiesPage />} path="/comunidades" />
            <Route element={<App />} path="/sobre" />
            <Route element={<App />} path="/login" />
            <Route element={<NotFound />} path="/*" />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  </React.StrictMode>
);
