import { useEffect, useState } from "react";
import EventList from "../components/events/EventList";
import Section from "../components/Section";
import Event from "../interfaces/event";
import { getEvents } from "../api/events";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Button from "../components/Button";
import Modal from "../components/Modal";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [age_range, setAgeRange] = useState<string>("");
  const [participantLimit, setParticipantLimit] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getEvents();
        setEvents(response);
        setIsLoading(false);
      } catch (err) {}
    };
    fetch();
  }, []);

  return (
    <>
      <Section title="">
        <div className="flex items-center justify-between py-4">
          <h1 className="font-prompt text-2xl lg:text-3xl">Eventos Ativos</h1>
          <Button variant="primary" onClick={handleOpen}>
            Criar evento
          </Button>
        </div>
        {isLoading ? <LoadingSkeleton /> : <EventList events={events} />}
      </Section>
      {isOpen && (
        <Modal
          title="Criar evento"
          handleConfirm={() => console.log("criou")}
          confirmMessage="Criar"
          handleCancel={handleClose}
          cancelMessage="Voltar"
        >
          <form>
            <input />
          </form>
        </Modal>
      )}
    </>
  );
}
