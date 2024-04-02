import { CalendarClock, Users } from "lucide-react";

import { ariaLabel } from "../../constants/aria-label";
import Event from "../../interfaces/Event";
import Button from "../Button";

const EventCard = ({
  _id,
  name,
  description,
  date,
  participantCount,
  participantLimit,
  imageUrl,
}: Event) => {
  const toDate = new Date(date);
  const day = String(toDate.getDate()).padStart(2, "0");
  const month = String(toDate.getMonth() + 1).padStart(2, "0");

  const formattedDate = `${day}/${month}`;

  return (
    <div className="w-full col-span-1 flex flex-col gap-2 p-4 rounded-2xl bg-lightGray dark:bg-dark">
      <img
        src={imageUrl}
        alt={`Foto do evento: ${name}`}
        width={400}
        height={222}
        className="object-cover w-full h-[222px] rounded-2xl"
      />
      <div className="flex flex-col gap-0">
        <h2 className="font-prompt text-xl text-black dark:text-white line-clamp-1">
          {name}
        </h2>
        <span>
          <p className="font-poppins font-medium text-sm text-black/80 dark:text-white/80 line-clamp-2 text-nowrap max-w-96">
            {description}
          </p>
        </span>
      </div>
      <div className="flex items-center justify-between">
        <Button variant="primary">
          <a href={`/evento/${_id}`}>Ver Mais</a>
        </Button>
        <span className="flex items-center gap-3">
          <CalendarClock
            size={24}
            className="text-purple dark:text-green"
            aria-label={ariaLabel.calendarClock}
          />
          <h3 className="text-base dark:text-white font-prompt">
            {formattedDate}
          </h3>
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
