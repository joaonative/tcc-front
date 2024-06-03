import { useState } from "react";
import Event from "../../interfaces/Event";
import Button from "../Button";
import Page from "../Page";
import EventList from "../e/EventList";
import { useTheme } from "../../contexts/Theme.context";
import CreateEventForm from "../e/CreateEventForm";
import { Community } from "../../interfaces/Community";

interface Props {
  events: Event[];
  community: Community;
  isParticipating: boolean;
}

const CommunityEvents = ({ events, community, isParticipating }: Props) => {
  const { darkMode } = useTheme();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Page>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl font-prompt">
            {events && events.length >= 1
              ? "Eventos Ativos"
              : "Sem eventos, começe agora!"}
          </h1>
          {isParticipating ? (
            <Button
              variant="primary"
              onClick={handleOpen}
              classes="hidden lg:block"
            >
              Criar evento
            </Button>
          ) : (
            <Button disabled variant="primary" classes="hidden lg:block">
              Participe para criar eventos
            </Button>
          )}
        </div>
        {events && events.length >= 1 ? (
          <EventList events={events} />
        ) : (
          <div className="flex items-center justify-center">
            <img
              src={darkMode ? "/notfoundDark.svg" : "/notfound.svg"}
              width={768}
              height={512}
              className="object-cover w-full lg:w-[512px]"
              alt="desenho grafico de um jovem procurando algo, simbolizando nao encontrado"
            />
          </div>
        )}
      </Page>
      {isOpen && (
        <CreateEventForm
          community={community}
          handleCancel={() => setIsOpen(false)}
        />
      )}
      {!isOpen && (
        <Button
          variant="primary"
          onClick={handleOpen}
          classes="lg:hidden fixed bottom-24 right-4"
        >
          Criar evento
        </Button>
      )}
    </>
  );
};

export default CommunityEvents;
