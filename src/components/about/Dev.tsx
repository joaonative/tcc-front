import { Github } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  imageUrl: string;
  job: string;
  email: string;
  github: string;
  username: string;
}

const Dev = ({ name, imageUrl, job, github, username }: Props) => {
  return (
    <div className="w-full flex flex-col items-start bg-lightGray dark:bg-dark p-5 gap-5 lg:rounded-2xl rounded-xl shadow-xl dark:shadow-none">
      <div className="flex items-center justify-between w-full">
        <img
          src={imageUrl}
          alt=""
          width={144}
          height={144}
          className="md:w-36 md:h-36 w-28 h-2w-28 object-cover rounded-full border-4 dark:border-green border-purple"
        />
        <div className="flex flex-col gap-2 items-center w-full">
          <div className="text-center">
            <h2 className="text-base font-poppins font-medium text-black/75 dark:text-white/75">
              {job}
            </h2>
            <h1 className="text-xl font-prompt">{name}</h1>
          </div>
          <Link to={github} target="_blank" className="flex items-center gap-2">
            <Github size={32} className="dark:text-green text-purple" />@
            {username}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dev;
