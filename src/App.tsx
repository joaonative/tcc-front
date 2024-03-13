import { Lock, Calendar, Users } from "lucide-react";

import Browser from "./components/Browser";

export default function Home() {
  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex justify-center">
          <span className="py-1 px-3 rounded-lg bg-purple dark:bg-green">
            <h4 className="text-sm lg:text-base font-medium font-poppins uppercase text-white dark:text-black">
              Bem vindo ao iParque
            </h4>
          </span>
        </div>
        <span className="font-prompt text-5xl lg:text-6xl lg:space-y-4 lg:text-center">
          <h1 className="text-black dark:text-white">
            Seu guia de eventos em parques:
          </h1>
          <h1 className="text-purple dark:text-green">
            Descubra, Participe e Crie!
          </h1>
        </span>
        <h4 className="text-base lg:text-center text-black dark:text-white font-poppins font-medium">
          Com o iParque, você tem o poder de explorar eventos locais ou mesmo
          criar o seu próprio, tudo isso em um ambiente amigável e acolhedor.
        </h4>
        <div className="flex justify-center">
          <Browser />
        </div>
      </section>
      <section className="mt-12 flex flex-col lg:flex-row items-center gap-5 justify-between dark:text-white">
        <div className="flex flex-col items-center gap-2 lg:gap-5 p-6 bg-lightGray dark:bg-dark rounded-2xl w-full">
          <Calendar size={58} className="text-purple dark:text-green" />
          <h2 className="font-prompt text-2xl text-purple dark:text-green">
            Eventos
          </h2>
          <p className="text-xl font-poppins font-medium h-40 lg:h-32">
            No iParque, eventos ao ar livre oferecem experiências únicas, de
            concertos a piqueniques. Crie ou participe de eventos com detalhes
            personalizados. Celebre a vida ao ar livre conosco!
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 lg:gap-5 p-6 bg-lightGray dark:bg-dark rounded-2xl w-full">
          <Users size={58} className="text-purple dark:text-green" />
          <h2 className="font-prompt text-2xl text-purple dark:text-green">
            Comunidades
          </h2>
          <p className="text-xl font-poppins font-medium h-40 lg:h-32">
            No iParque, participe de comunidades unidas por interesses como
            música, festas e natureza. Descubra eventos relacionados e
            compartilhe suas paixões conosco!
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 lg:gap-5 p-6 bg-lightGray dark:bg-dark rounded-2xl w-full">
          <Lock size={58} className="text-purple dark:text-green" />
          <h2 className="font-prompt text-2xl text-purple dark:text-green">
            Segurança e Privacidade
          </h2>
          <p className="text-xl font-poppins font-medium h-40 lg:h-32">
            Com limites de idade e privacidade em vigor, garantimos um ambiente
            seguro. Participe de eventos e comunidades sem preocupações. Sua
            experiência no iParque é protegida e privada.
          </p>
        </div>
      </section>
    </>
  );
}
