import EventCard from "./EventCard";
import Event from "../../interfaces/Event";

const EventList = ({ events }: { events: Event[] }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-start items-start">
        {events.map((event) => (
          <EventCard
            key={event._id}
            _id={event._id}
            name={event.name}
            description={event.description}
            date={event.date}
            participantCount={event.participantCount}
            participantLimit={event.participantLimit}
            imageUrl={event.imageUrl}
            owner={event.owner}
            category={event.category}
            age_range={event.age_range}
            location={event.location}
            participants={event.participants}
            isExpired={event.isExpired}
          />
        ))}
      </div>
    </>
  );
};

export default EventList;
