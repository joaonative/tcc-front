import { useEffect, useState } from "react";

import { getEvents } from "../../api/events";
import EventCard from "./EventCard";
import Event from "../../interfaces/event";
import EventLoadingList from "./EventLoadingList";

const EventList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getEvents();
        setEvents(response);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {isLoading ? (
        <EventLoadingList />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-start items-start">
          {events &&
            events.map((result) => (
              <EventCard
                key={result.id}
                id={result.id}
                title={result.title}
                description={result.description}
                date={result.date}
                participantCount={result.participantCount}
                participantLimit={result.participantLimit}
                imageUrl={result.imageUrl}
                owner={result.owner}
                category={result.category}
                age={result.age}
                location={result.location}
                time={result.time}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default EventList;
