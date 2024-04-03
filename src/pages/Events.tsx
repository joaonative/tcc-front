import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import EventList from "../components/e/EventList";
import { useAuth } from "../contexts/Auth.context";
import Button from "../components/Button";
import CreateEventForm from "../components/e/CreateEventForm";
import axios from "../api/api";
import { useError } from "../contexts/Error.context";
import LoadingCardSkeleton from "../components/LoadingCardSkeleton";

const Events = () => {
  const { user } = useAuth();
  const { setError } = useError();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const getEvents = async () => {
    try {
      const response = await axios.get("/events", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      return response.data;
    } catch (error: any) {
      setError(error.response.data.message);
      return;
    }
  };

  const { isPending, data } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  if (isPending) {
    return (
      <section className="flex flex-col gap-5">
        <h1 className="text-3xl font-prompt">Carregando ...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-start items-start">
          <LoadingCardSkeleton />
          <LoadingCardSkeleton />
          <LoadingCardSkeleton />
          <LoadingCardSkeleton />
          <LoadingCardSkeleton />
          <LoadingCardSkeleton />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-prompt">Eventos Ativos</h1>
          <Button variant="primary" onClick={handleOpen}>
            Criar evento
          </Button>
        </div>
        <EventList events={data.events} />
        {isOpen && <CreateEventForm handleCancel={() => setIsOpen(false)} />}
      </section>
    </>
  );
};

export default Events;
