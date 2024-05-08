import { Users } from "lucide-react";
import { Community } from "../../interfaces/Community";
import Button from "../Button";
import { ariaLabel } from "../../constants/aria-label";
import { categoryIconMap } from "../../utils/CategoryIconMap";
import { Link } from "react-router-dom";

interface Props {
  community: Community;
}

const CommunityCard = ({ community }: Props) => {
  return (
    <div className="w-full col-span-1 flex flex-col gap-2 p-4 rounded-2xl bg-lightGray dark:bg-dark shadow-2xl dark:shadow-none">
      <img
        src={community.imageUrl}
        alt={`Foto do evento: ${name}`}
        width={500}
        height={224}
        className="object-cover rounded-2xl w-full h-60 3xl:h-64"
      />
      <div className="flex flex-col gap-0">
        <h2 className="font-prompt text-xl text-black dark:text-white line-clamp-1">
          {community.name}
        </h2>
        <span>
          <p className="font-poppins font-medium text-sm text-black/80 dark:text-white/80 line-clamp-1">
            {community.description}
          </p>
        </span>
      </div>
      <div className="flex items-center justify-between">
        <Link to={`/comunidade/${community._id}`}>
          <Button variant="primary">Ver Mais</Button>
        </Link>
        <span className="flex items-center gap-2">
          {categoryIconMap[community.category]}
          <h1 className="text-base font-prompt">{community.category}</h1>
        </span>
        <span className="flex items-center gap-3">
          <Users
            size={24}
            className="text-purple dark:text-green"
            aria-label={ariaLabel.users}
          />
          <h3 className="text-base dark:text-white font-prompt">
            {community.participantCount}/{community.participantLimit}
          </h3>
        </span>
      </div>
    </div>
  );
};

export default CommunityCard;
