import { CalendarClock, Users } from "lucide-react";

import Event from "../../interfaces/event";
import Button from "../Button";

const EventCard = ({
  id,
  title,
  description,
  date,
  participantCount,
  participantLimit,
  imageUrl,
  owner,
  category,
  age,
  location,
  time,
}: Event) => {
  return (
    <div className="w-full col-span-1 flex flex-col gap-2 p-4 rounded-2xl bg-lightGray dark:bg-dark">
      <img
        src={imageUrl}
        alt={`Foto do evento: ${title}`}
        width={400}
        height={230}
        className="object-cover w-full h-[222px] rounded-2xl"
      />
      <div className="flex flex-col gap-0">
        <h2 className="font-prompt text-xl text-black dark:text-white">
          {title}
        </h2>
        <span className="w-full h-16">
          <p className="font-poppins font-medium text-sm text-black/50 dark:text-white/50 line-clamp-3">
            {description}
          </p>
        </span>
      </div>
      <div className="flex items-center justify-between">
        <Button variant="primary">
          <a href={`/evento/${id}`}>Ver mais</a>
        </Button>
        <span className="flex items-center gap-3">
          <CalendarClock size={24} className="text-purple dark:text-green" />
          <h4 className="text-base dark:text-white font-prompt">{date}</h4>
        </span>
        <span className="flex items-center gap-3">
          <Users size={24} className="text-purple dark:text-green" />
          <h4 className="text-base dark:text-white font-prompt">
            {participantCount}/{participantLimit}
          </h4>
        </span>
      </div>
    </div>
  );
};

export default EventCard;
