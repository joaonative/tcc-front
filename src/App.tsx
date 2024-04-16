import { Lock, Calendar, Users } from "lucide-react";

import { ariaLabel } from "./constants/aria-label";
import Button from "./components/Button";
import { useTheme } from "./contexts/Theme.context";

export default function Home() {
  const { darkMode } = useTheme();
  return (
    <>
      <div className="flex flex-col gap-5 pb-5">
        <span className="font-prompt text-5xl lg:text-6xl lg:space-y-4 lg:text-center">
          <h1 className="text-black dark:text-white">
            Seu guia de eventos em parques:
          </h1>
          <h1 className="text-purple dark:text-green">
            Descubra, Participe e Crie!
          </h1>
        </span>
        <div className="flex lg:justify-center">
          <Button variant="primary">
            <a href="/eventos">Ver Eventos</a>
          </Button>
        </div>
        <h2 className="text-base lg:text-center text-black dark:text-white font-poppins font-medium">
          Com o iParque, você tem o poder de explorar eventos locais ou mesmo
          criar o seu próprio, tudo isso em um ambiente amigável e acolhedor.
        </h2>
      </div>

      <div className="flex justify-between items-center select-none">
        <img
          src={darkMode ? "desktop-dark.png" : "desktop.png"}
          width={512}
          height={512}
          className="hidden lg:block object-contain w-full h-[612px]"
        />
        <img
          src={darkMode ? "mobile-dark.png" : "mobile.png"}
          width={512}
          height={512}
          className="hidden lg:block object-contain w-full h-[512px]"
        />
      </div>
      <section className="mt-12 flex flex-col lg:flex-row items-center gap-5 justify-between dark:text-white lg:mb-0 mb-12">
        <div className="card flex flex-col items-center gap-2 lg:gap-5 p-6 bg-lightGray dark:bg-dark rounded-2xl w-full shadow-xl dark:shadow-none">
          <Calendar
            size={58}
            className="text-purple dark:text-green"
            aria-label={ariaLabel.calendar}
          />
          <h2 className="font-prompt  text-xl lg:text-2xl text-purple dark:text-green">
            Eventos
          </h2>
          <p className="text-base font-poppins font-medium h-40 lg:h-32">
            No iParque, eventos ao ar livre oferecem experiências únicas, de
            concertos a piqueniques. Crie ou participe de eventos com detalhes
            personalizados. Celebre a vida ao ar livre conosco!
          </p>
        </div>
        <div className="card flex flex-col items-center gap-2 lg:gap-5 p-6 bg-lightGray dark:bg-dark rounded-2xl w-full shadow-xl dark:shadow-none">
          <Users
            size={58}
            className="text-purple dark:text-green"
            aria-label={ariaLabel.users}
          />
          <h2 className="font-prompt  text-xl lg:text-2xl text-purple dark:text-green">
            Comunidades
          </h2>
          <p className="text-base font-poppins font-medium h-40 lg:h-32">
            No iParque, participe de comunidades unidas por interesses como
            música, festas e natureza. Descubra eventos relacionados e
            compartilhe suas paixões conosco!
          </p>
        </div>
        <div className="card flex flex-col items-center gap-2 lg:gap-5 p-6 bg-lightGray dark:bg-dark rounded-2xl w-full shadow-xl dark:shadow-none">
          <Lock
            size={58}
            className="text-purple dark:text-green"
            aria-label={ariaLabel.lock}
          />
          <h2 className="font-prompt  text-xl lg:text-2xl text-purple dark:text-green">
            Segurança e Privacidade
          </h2>
          <p className="text-base font-poppins font-medium h-40 lg:h-32">
            Com limites de idade e privacidade em vigor, garantimos um ambiente
            seguro. Participe de eventos e comunidades sem preocupações. Sua
            experiência no iParque é protegida e privada.
          </p>
        </div>
      </section>
    </>
  );
}
