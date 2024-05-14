import { Calendar, Info, Moon, Sun, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ariaLabel } from "../constants/aria-label";
import { useTheme } from "../contexts/Theme.context";
import Button from "./Button";
import { useAuth } from "../contexts/Auth.context";
import { useState } from "react";

const Header = () => {
  const { authenticated, user } = useAuth();

  const navigate = useNavigate();

  const handleClick = (path: string) => () => {
    navigate(`/${path}`);
  };

  const { darkMode, toggleTheme } = useTheme();

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <>
      <menu className="fixed top-0 flex items-center justify-between lg:hidden"></menu>

      <header className="z-10 w-full fixed bottom-0 bg-white border-b-[3px] dark:border-gray border-lightGray dark:bg-dark lg:dark:bg-darkBg lg:relative lg:flex items-center justify-between py-2 lg:px-12 md:px-8 px-4">
        {/* desktop navigation links */}
        <div className="hidden lg:block lg:w-52">
          <a href="/">
            <img src={"/logo.svg"} alt="iParque logo" width={36} height={36} />
          </a>
        </div>
        <ul className="hidden lg:flex items-center gap-8 font-prompt text-base text-black/75 dark:text-white/75">
          <li className="text-center">
            <a href="/eventos" className="w-20 text-center">
              Eventos
            </a>
          </li>
          <li className="text-center">
            <a href="/comunidades" className="w-36 text-center">
              Comunidades
            </a>
          </li>
          <li className="text-center">
            <a href="/sobre" className="w-20 text-center">
              Sobre
            </a>
          </li>
        </ul>

        <div className="lg:w-52 lg:flex items-center justify-end">
          {/* mobile bottom navigation */}
          <ul className="flex lg:hidden items-center justify-between px-8 py-2 text-purple dark:text-green">
            <li>
              <a href="/eventos">
                <Calendar size={32} aria-label={ariaLabel.calendar} />
              </a>
            </li>
            <li>
              <a href="/comunidades">
                <Users size={32} aria-label={ariaLabel.users} />
              </a>
            </li>
            <li>
              <a href="/sobre">
                <Info size={32} aria-label={ariaLabel.info} />
              </a>
            </li>
          </ul>

          {/* desktop menu, theme button & auth button*/}
          <div className="fixed left-0 px-5 py-4 top-0 w-full lg:w-max flex lg:relative items-center justify-between lg:justify-normal gap-5 bg-white dark:bg-dark lg:dark:bg-transparent">
            <a href="/" className="lg:hidden">
              <img
                src={"/logo.svg"}
                alt="iParque logo"
                width={36}
                height={36}
              />
            </a>
            <div className="flex items-center gap-5">
              <button
                className="text-purple dark:text-green"
                onClick={toggleTheme}
                aria-label={`Alterar tema para modo ${
                  darkMode ? "claro" : "escuro"
                }`}
              >
                {darkMode ? <Sun size={32} /> : <Moon size={32} />}
              </button>
              {authenticated ? (
                <a href="/perfil" className="h-8 w-8">
                  <img
                    src={user.imageUrl}
                    alt={`Foto do usuário: ${user.name}`}
                    width={32}
                    height={32}
                    className={`${
                      !imageLoaded && "loading-image"
                    } object-cover border-2 border-purple dark:border-green rounded-full`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </a>
              ) : (
                <Button variant="primary" onClick={handleClick("entre")}>
                  Iniciar Sessão
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
