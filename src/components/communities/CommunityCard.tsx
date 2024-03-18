import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  CalendarClock,
  Crown,
  Info,
  Leaf,
  MapPin,
  Music2,
  PaintBucket,
  PartyPopper,
  Users,
} from "lucide-react";

import { ariaLabel } from "../../constants/accessibility";
import Community from "../../interfaces/community";
import Button from "../Button";

const CommunityCard = ({
  id,
  title,
  description,
  imageUrl,
  category,
  age,
}: Community) => {
  const navigate = useNavigate();

  const handleClick = (path: string) => () => {
    navigate(`/${path}`);
  };

  const categoryIconMap: { [key: string]: JSX.Element } = {
    Artes: <PaintBucket size={24} className="text-purple dark:text-green" />,
    Festa: <PartyPopper size={24} className="text-purple dark:text-green" />,
    Música: <Music2 size={24} className="text-purple dark:text-green" />,
    Natureza: <Leaf size={24} className="text-purple dark:text-green" />,
  };

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
        <span className="w-full h-12">
          <p className="font-poppins font-medium text-sm text-black/80 dark:text-white/80 line-clamp-2">
            {description}
          </p>
        </span>
      </div>
      <div className="flex items-center justify-between">
        <Button variant="primary" onClick={handleClick(`comunidade/${id}`)}>
          Ver Mais
        </Button>
        <span className="flex items-center gap-3">
          <Info
            size={24}
            className="text-purple dark:text-green"
            aria-label={ariaLabel.info}
          />
          <h4 className="text-base">{age}</h4>
        </span>
        <span className="flex items-center gap-3">
          {categoryIconMap[category]}
          <h4 className="text-base">{category}</h4>
        </span>
      </div>
    </div>
  );
};

export default CommunityCard;
