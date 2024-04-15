import { LockIcon, PlusCircle } from "lucide-react";

import { CategoriesEnum } from "../interfaces/categories";
import EventList from "./e/EventList";

const Browser = () => {
  const mockedEvents = [
    {
      _id: "",
      name: "Batalha da Pista",
      description:
        "Evento cultural onde MCs irão realiazar batalhas de rimas um contra o outro de forma eliminatória até formar um vencedor.",
      date: "2024-07-02T00:00:00.000+00:00",
      category: CategoriesEnum.Música,
      age_range: "18",
      imageUrl: "eventExample1.webp",
      location:
        "Av. Eng. Fábio Roberto Barnabé - Jardim Esplanada, Indaiatuba - SP",
      owner: "iParque Administradores",
      participantCount: 68,
      participantLimit: 128,
      isExpired: true,
      participants: [""],
    },
    {
      _id: "",
      name: "Caminhada matinal no parque ecológico",
      description:
        "Caminhada matinal visando saúde, somos amigáveis a nossa meta é dar uma volta inteira no parque.",
      date: "2024-07-02T00:00:00.000+00:00",
      category: CategoriesEnum.Natureza,
      age_range: "Livre",
      imageUrl: "eventExample2.webp",
      location:
        "Av. Eng. Fábio Roberto Barnabé - Chácara Areal, Indaiatuba - SP",
      owner: "iParque Administradores",
      participantCount: 9,
      participantLimit: 16,
      isExpired: true,
      participants: [""],
    },
    {
      _id: "",
      name: "Churrasco no parque ecológico",
      description:
        "Churrasco de boas no parque ecológico, cada um leva obrigatóriamente um kit-churrasco, sem menores de idade, por favor.",
      date: "2024-07-02T00:00:00.000+00:00",
      category: CategoriesEnum.Festa,
      age_range: "18",
      imageUrl: "eventExample3.webp",
      location:
        "Av. Eng. Fábio Roberto Barnabé - Jardim Esplanada, Indaiatuba - SP",
      owner: "iParque",
      participantCount: 15,
      participantLimit: 24,
      isExpired: true,
      participants: [""],
    },
  ];

  return (
    <div className="lg:flex w-full flex-col gap-5 lg:gap-3 border-4 border-lightGray dark:border-dark bg-white dark:bg-darkBg p-2 lg:p-3 rounded-xl select-none pointer-events-none">
      <div className="flex justify-between items-center">
        <span
          className="flex justify-center gap-[4px] lg:gap-2 w-8 lg:w-16"
          aria-label="ícones de abrir, minimizar e fechar, sugerindo botões de uma janela de programa de computador"
        >
          {/* Browser Dots */}
          <div className="rounded-full h-2 w-2 lg:w-3 lg:h-3 bg-[red]" />
          <div className="rounded-full h-2 w-2 lg:w-3 lg:h-3 bg-[orange]" />
          <div className="rounded-full h-2 w-2 lg:w-3 lg:h-3 bg-[green]" />
        </span>
        <div className="bg-lightGray dark:bg-dark flex items-center gap-3 lg:gap-5 py-1 px-3 lg:px-12 rounded-md">
          {/* Secure Icon */}
          <LockIcon
            size={16}
            className="text-black dark:text-white/50"
            aria-label="ícone de cadeado, sugerindo segurança"
          />
          {/* Search Bar */}
          <h2 className="font-poppins text-sm text-black dark:text-white/50">
            iparque.com/eventos
          </h2>
        </div>
        <div className="w-8 lg:w-16 flex justify-end">
          {/* Broser Icon */}
          <PlusCircle
            size={16}
            className="text-black dark:text-white/50"
            aria-label="ícone de adicionar, sugerindo um botão para abrir uma nova página
"
          />
        </div>
      </div>
      <div className="flex flex-col items-start mt-2 lg:mt-0 mb-4">
        <h2 className="ml-2 py-2 font-prompt text-xl lg:text-2xl dark:text-white">
          Eventos Ativos
        </h2>
        <EventList events={mockedEvents} />
      </div>
    </div>
  );
};

export default Browser;
