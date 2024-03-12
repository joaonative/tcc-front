import EventList from "../components/events/EventList";
import Section from "../components/Section";

export default function EventsPage() {
  return (
    <Section title="Eventos Ativos">
      <EventList />
    </Section>
  );
}
