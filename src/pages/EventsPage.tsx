import { useEffect, useState } from "react";
import EventList from "../components/events/EventList";
import Section from "../components/Section";
import Event from "../interfaces/event";
import { getEvents } from "../api/events";
import EventLoadingList from "../components/events/EventLoadingList";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    <Section title="Eventos Ativos">
      {isLoading ? <EventLoadingList /> : <EventList events={events} />}
    </Section>
  );
}
