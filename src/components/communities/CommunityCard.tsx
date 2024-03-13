import Community from "../../interfaces/community";
import { Users, Info } from "lucide-react";
import Button from "../Button";

const CommunityCard = ({
  id,
  title,
  description,
  participantCount,
  participantLimit,
  imageUrl,
  owner,
  category,
  age,
  location,
}: Community) => {
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
          <p className="font-poppins font-medium text-sm text-black/50 dark:text-white/50 line-clamp-2">
            {description}
          </p>
        </span>
      </div>
      <div className="flex items-center justify-between">
        <Button variant="primary">
          <a href={`/comunidade/${id}`}>Ver mais</a>
        </Button>
        <span className="flex items-center gap-3">
          <Info size={24} className="text-purple dark:text-green" />
          <h4 className="text-base">{age}</h4>
        </span>
        <span className="flex items-center gap-3">
          <Users size={24} className="text-purple dark:text-green" />
          <h4 className="text-base">{category}</h4>
        </span>
      </div>
    </div>
  );
};

export default CommunityCard;
