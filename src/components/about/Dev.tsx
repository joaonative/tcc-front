import { Github, Mail } from "lucide-react";

interface Props {
  name: string;
  imageUrl: string;
  job: string;
  email: string;
  github: string;
  username: string;
}

const Dev = ({ name, imageUrl, job, email, github, username }: Props) => {
  return (
    <div className="flex flex-col items-center bg-lightGray dark:bg-dark p-5 rounded-2xl gap-3 shadow-xl dark:shadow-none">
      <img
        src={imageUrl}
        alt=""
        className="object cover border-[3px] border-purple dark:border-green rounded-full"
        width={144}
        height={144}
      />
      <div className="flex flex-col gap-1 items-center">
        <h2 className="text-xl font-prompt">{name}</h2>
        <h3 className="text-base font-poppins font-medium">{job}</h3>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Mail size={32} className="text-purple dark:text-green" />
          <h4 className="font-poppins">{email}</h4>
        </div>
        <div className="flex items-center gap-2">
          <Github size={32} className="text-purple dark:text-green" />
          <a className="font-poppins" href={github} target="_blank">
            @{username}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dev;
