import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { darkMode, toggleTheme } = useTheme();

  return (
    <>
      <header className="flex items-center justify-between py-5">
        <div className="lg:w-48 ">
          <a href="/">
            <img src={"/logo.svg"} alt="iParque logo" width={36} height={36} />
          </a>
        </div>
        <div className="hidden lg:flex items-center gap-3 font-prompt text-base text-black/75 dark:text-white/75">
          <a href="/eventos" className="w-20 text-center">
            Eventos
          </a>
          <a href="/comunidades" className="w-36 text-center">
            Comunidades
          </a>
          <a href="/sobre" className="w-20 text-center">
            Sobre
          </a>
        </div>
        <div className="lg:w-48 flex justify-end">
          <div className="flex items-center gap-5">
            <button
              className="text-purple dark:text-green"
              onClick={toggleTheme}
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>

            <a
              href="/entre"
              className="hidden lg:block text-base font-poppins font-medium uppercase px-3 py-1 rounded-lg bg-purple dark:bg-green text-white dark:text-black"
            >
              Iniciar Sessão
            </a>

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
        <div className="w-full flex lg:hidden flex-col gap-2 pb-5 font-prompt text-2xl text-black dark:text-white">
          <a href="/eventos">Eventos</a>
          <a href="/comunidades">Comunidades</a>
          <a href="/sobre">Sobre</a>
          <a href="/entre">Iniciar Sessão</a>
        </div>
      )}
    </>
  );
};

export default Header;
