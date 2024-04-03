import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import EventList from "../components/e/EventList";
import { useAuth } from "../contexts/Auth.context";
import Loading from "../components/Loading";
import Button from "../components/Button";
import CreateEventForm from "../components/e/CreateEventForm";
import axios from "../api/api";
import { useError } from "../contexts/Error.context";
import { Navigate } from "react-router-dom";

const Events = () => {
  const { user } = useAuth();
  const { setError } = useError();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const getEvents = async () => {
    const response = await axios.get("/events", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (response.status !== 200) {
      setError(response.data.message);
      return;
    }
    return response.data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  if (error) {
    setError("erro interno no servidor");
    return <Navigate to={"/"} replace />;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-prompt">Eventos Ativos</h1>{" "}
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
