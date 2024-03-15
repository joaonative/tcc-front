import { CalendarClock, Users } from "lucide-react";

import { ariaLabel } from "../../constants/accessibility";
import Event from "../../interfaces/event";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const EventCard = ({
  id,
  title,
  description,
  date,
  participantCount,
  participantLimit,
  imageUrl,
}: Event) => {
  const navigate = useNavigate();

  const handleClick = (path: string) => () => {
    navigate(`/${path}`);
  };

  return (
    <div className="w-full col-span-1 flex flex-col gap-2 p-4 rounded-2xl bg-lightGray dark:bg-dark">
      <img
        crossOrigin="anonymous"
        src={imageUrl}
        alt={`Foto do evento: ${title}`}
        width={400}
        height={222}
        className="object-cover w-full h-[222px] rounded-2xl"
        loading="lazy"
      />
      <div className="flex flex-col gap-0">
        <h2 className="font-prompt text-xl text-black dark:text-white">
          {title}
        </h2>
        <span className="w-full h-16">
          <p className="font-poppins font-medium text-sm text-black/80 dark:text-white/80 line-clamp-3">
            {description}
          </p>
        </span>
      </div>
      <div className="flex items-center justify-between">
        <Button variant="primary" onClick={handleClick(`evento/${id}`)}>
          Ver Mais
        </Button>
        <span className="flex items-center gap-3">
          <CalendarClock
            size={24}
            className="text-purple dark:text-green"
            aria-label={ariaLabel.calendarClock}
          />
          <h3 className="text-base dark:text-white font-prompt">{date}</h3>
        </span>
        <span className="flex items-center gap-3">
          <Users
            size={24}
            className="text-purple dark:text-green"
            aria-label={ariaLabel.users}
          />
          <h3 className="text-base dark:text-white font-prompt">
            {participantCount}/{participantLimit}
          </h3>
        </span>
      </div>
    </div>
  );
};

export default EventCard;
