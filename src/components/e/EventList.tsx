import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import EventCard from "./EventCard";
import Event from "../../interfaces/Event";

const EventList = ({ events }: { events: Event[] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <>
      <ul
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-start items-start"
      >
        {events.map((event, index) => (
          <motion.li
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.12, delay: index * 0.12 }}
            key={event._id}
          >
            <EventCard
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
          </motion.li>
        ))}
      </ul>
    </>
  );
};

export default EventList;
