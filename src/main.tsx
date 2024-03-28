import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import Routes from "./Routes.tsx";
import { AuthProvider } from "./contexts/Auth.context.tsx";
import { ErrorProvider } from "./contexts/Error.context.tsx";
import { ThemeProvider } from "./contexts/Theme.context.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorProvider>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="lg:p-12 md:p-8 p-4 mt-16 md:mt-0 flex-grow">
                <Routes />
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </ErrorProvider>
  </React.StrictMode>
);
