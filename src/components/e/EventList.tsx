import EventCard from "./EventCard";
import Event from "../../interfaces/Event";

const EventList = ({ events }: { events: Event[] }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-start items-start">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            participantCount={event.participantCount}
            participantLimit={event.participantLimit}
            imageUrl={event.imageUrl}
            owner={event.owner}
            category={event.category}
            age={event.age}
            location={event.location}
            time={event.time}
          />
        ))}
      </div>
    </>
  );
};

export default EventList;
