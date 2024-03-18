import { Users } from "lucide-react";
import { ariaLabel } from "../constants/accessibility";

interface Props {
  count: number;
  limit: number;
  usersImagesUrls: string[];
}

const UsersList = ({ count, limit, usersImagesUrls }: Props) => {
  return (
    <div className="flex flex-col p-6 gap-5 bg-lightGray dark:bg-dark rounded-2xl">
      <span className="flex gap-2 items-center font-prompt text-base">
        <Users
          className="text-purple dark:text-green"
          aria-label={ariaLabel.users}
        />
        <h1>
          {count}/{limit}
        </h1>
      </span>
      <div className="scrollbar scrollbar-thumb-purple dark:scrollbar-thumb-green scrollbar-track-white dark:scrollbar-track-gray flex items-center gap-8 overflow-x-scroll">
        {usersImagesUrls.map((userImageUrl) => (
          <img
            src={userImageUrl}
            width={128}
            height={128}
            className="rounded-full object-cover lg:mb-5"
            alt="Foto de perfil do usuário"
          />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
