import { useEffect, useState } from "react";

import EventList from "../components/e/EventList";
import Event from "../interfaces/Event";
import { getEvents } from "../api/Events";
import { useAuth } from "../contexts/Auth.context";
import { useError } from "../contexts/Error.context";
import Loading from "../components/Loading";
import Button from "../components/Button";
import CreateEventForm from "../components/e/CreateEventForm";

const Events = () => {
  const { user } = useAuth();
  const { setError } = useError();

  const [events, setEvents] = useState<Event[]>();

  const fetchEvents = async () => {
    const res = await getEvents(user.token, { setError });
    setEvents(res);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleCreateEventSuccess = () => {
    fetchEvents();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-prompt">Eventos Ativos</h1>{" "}
          <Button variant="primary" onClick={handleOpen}>
            Criar evento
          </Button>
        </div>
        {events ? <EventList events={events} /> : <Loading />}
        {isOpen && (
          <CreateEventForm
            onCreateEventSuccess={handleCreateEventSuccess}
            cancel={handleCancel}
          />
        )}
      </section>
    </>
  );
};

export default Events;
