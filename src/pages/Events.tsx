import { useEffect, useState } from "react";

import EventList from "../components/e/EventList";
import Event from "../interfaces/Event";
import { getEvents } from "../api/Events";
import { useAuth } from "../contexts/Auth.context";
import { useError } from "../contexts/Error.context";

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

  return <>{events ? <EventList events={events} /> : <div>loading...</div>}</>;
};

export default Events;
