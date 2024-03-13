import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

import { useTheme } from "../contexts/ThemeContext";
import Button from "./Button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { darkMode, toggleTheme } = useTheme();
  return (
    <>
      <header className="flex items-center justify-between py-5">
        <div className="lg:w-52 ">
          <a href="/">
            <img src={"/logo.svg"} alt="iParque logo" width={36} height={36} />
          </a>
        </div>
        <ul className="hidden lg:flex items-center gap-3 font-prompt text-base text-black/75 dark:text-white/75">
          <li>
            <a href="/eventos" className="w-20 text-center">
              Eventos
            </a>
          </li>
          <li>
            <a href="/comunidades" className="w-36 text-center">
              Comunidades
            </a>
          </li>
          <li>
            <a href="/sobre" className="w-20 text-center">
              Sobre
            </a>
          </li>
        </ul>
        <div className="lg:w-52 flex justify-end">
          <div className="flex items-center gap-5">
            <button
              className="text-purple dark:text-green"
              onClick={toggleTheme}
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>

            {/* 
            <a
              href="/entre"
              className="hidden lg:block text-base font-poppins font-medium uppercase px-3 py-1 rounded-lg bg-purple dark:bg-green text-white dark:text-black"
            >
              Iniciar Sessão
            </a>
            */}

            <Button variant="primary" classes="hidden lg:block">
              <a href="/entre">Iniciar Sessão</a>
            </Button>

            <button
              className="lg:hidden text-purple dark:text-green"
              onClick={handleMenu}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      {isOpen && (
        <ul className="w-full flex lg:hidden flex-col gap-2 pb-5 font-prompt text-2xl text-black dark:text-white">
          <li>
            <a href="/eventos">Eventos</a>
          </li>
          <li>
            <a href="/comunidades">Comunidades</a>
          </li>
          <li>
            <a href="/sobre">Sobre</a>
          </li>
          <li>
            <a href="/entre">Iniciar Sessão</a>
          </li>
        </ul>
      )}
    </>
  );
};

export default Header;
