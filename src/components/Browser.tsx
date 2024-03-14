import { LockIcon, PlusCircle } from "lucide-react";

import EventCard from "./events/EventCard";

const Browser = () => {
  return (
    <div className="lg:flex flex-col gap-5 lg:gap-3 border-4 border-lightGray dark:border-dark bg-white dark:bg-darkBg p-2 lg:p-3 rounded-xl select-none pointer-events-none">
      <div className="flex justify-between items-center">
        <div className="flex justify-center gap-[4px] lg:gap-2 w-8 lg:w-16">
          {/* Browser Dots */}
          <div className="rounded-full h-2 w-2 lg:w-3 lg:h-3 bg-[red]" />
          <div className="rounded-full h-2 w-2 lg:w-3 lg:h-3 bg-[orange]" />
          <div className="rounded-full h-2 w-2 lg:w-3 lg:h-3 bg-[green]" />
        </div>
        <div className="bg-lightGray dark:bg-dark flex items-center gap-3 lg:gap-5 py-1 px-3 lg:px-12 rounded-md">
          {/* Secure Icon */}
          <LockIcon size={16} className="text-black dark:text-white/50" />
          {/* Search Bar */}
          <h2 className="font-poppins text-sm text-black dark:text-white/50">
            iparque.com/eventos
          </h2>
        </div>
        <div className="w-8 lg:w-16 flex justify-end">
          {/* Broser Icon */}
          <PlusCircle size={16} className="text-black dark:text-white/50" />
        </div>
      </div>
      <div className="flex flex-col items-start mt-2 lg:mt-0 mb-4">
        <h2 className="ml-2 py-2 font-prompt text-xl lg:text-2xl dark:text-white">
          Eventos Ativos
        </h2>
        <div className="flex flex-col lg:flex-row justify-center gap-3">
          <EventCard
            id=""
            title="Batalha da Pista"
            description="Evento cultural onde MCs irão realiazar batalhas de rimas um contra o outro de forma eliminatória até formar um vencedor."
            date="13/03"
            category="Música"
            age="18"
            imageUrl="https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/05/10/batalha-da-aldeia,-em-barueri-(sp)-e-uma-das-principais-do-brasil-foto_-danilo-tamashiro-1iextrft6o4s6.jpg"
            location="Av. Eng. Fábio Roberto Barnabé - Jardim Esplanada, Indaiatuba - SP"
            owner="iParque Administradores"
            participantCount={68}
            participantLimit={128}
            time="Quarta, 13 de março de 2024 às 19:00 até quarta, 13 de março de 2024 às 00:00."
          />
          <EventCard
            id=""
            title="Caminhada matinal no parque ecológico"
            description="Caminhada matinal visando saúde, somos amigáveis a nossa meta é dar uma volta inteira no parque."
            date="14/03"
            category="Natureza"
            age="Livre"
            imageUrl="https://jundiai.sp.gov.br/noticias/wp-content/uploads/sites/32/2019/02/parque-do-engordadouro_c_-2.jpg"
            location="Av. Eng. Fábio Roberto Barnabé - Chácara Areal, Indaiatuba - SP"
            owner="iParque Administradores"
            participantCount={9}
            participantLimit={16}
            time="Quinta, 14 de março de 2024 às 05:00 até quinta, 14 de março de 2024 às 08:00."
          />
          <EventCard
            id=""
            title="Churrasco no parque ecológico"
            description="Churrasco de boas no parque ecológico, cada um leva obrigatóriamente um kit-churrasco, sem menores de idade, por favor."
            date="17/03"
            category="Festa"
            age="18"
            imageUrl="https://static.dw.com/image/16922429_605.jpg"
            location="Av. Eng. Fábio Roberto Barnabé - Jardim Esplanada, Indaiatuba - SP"
            owner="iParque"
            participantCount={15}
            participantLimit={24}
            time="Domingo, 17 de março de 2024 às 12:00 até domingo, 17 de março de 2024 às 16:00."
          />
        </div>
      </div>
    </div>
  );
};

export default Browser;
