import { CalendarClock, Users } from "lucide-react";

import { Link } from "react-router-dom";
import { ariaLabel } from "../../constants/aria-label";
import Event from "../../interfaces/Event";
import { categoryIconMap } from "../../utils/CategoryIconMap";

const EventCard = ({
  _id,
  name,
  description,
  date,
  participantCount,
  participantLimit,
  imageUrl,
  category,
}: Event) => {
  const eDate = new Date(date);
  const day = ("0" + eDate.getUTCDate()).slice(-2);
  const month = ("0" + (eDate.getUTCMonth() + 1)).slice(-2);

  return (
    <Link
      to={`/evento/${_id}`}
      className="w-full col-span-1 flex flex-col gap-2 p-4 rounded-2xl bg-lightGray dark:bg-dark shadow-2xl dark:shadow-none"
    >
      <img
        src={imageUrl}
        alt={`Foto do evento: ${name}`}
        width={500}
        height={224}
        className="object-cover rounded-2xl w-full h-60 3xl:h-64"
      />
      <div className="flex flex-col gap-0">
        <h2 className="font-prompt text-xl text-black dark:text-white line-clamp-1">
          {name}
        </h2>
        <span>
          <p className="font-poppins font-medium text-sm text-black/80 dark:text-white/80 line-clamp-1">
            {description}
          </p>
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          {categoryIconMap[category]}
          <h1 className="text-base font-prompt">{category}</h1>
        </span>

        <span className="flex items-center gap-3">
          <CalendarClock
            size={24}
            className="text-purple dark:text-green"
            aria-label={ariaLabel.calendarClock}
          />
          <h3 className="text-base dark:text-white font-prompt">
            {day}/{month}
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
    </Link>
  );
};

export default EventCard;
