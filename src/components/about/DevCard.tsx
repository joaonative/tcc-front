import { Github, Mail } from "lucide-react";

interface Props {
  name: string;
  work: string;
  gitHubLink: string;
  email: string;
  imgUrl: string;
}

const DevCard = ({ name, work, gitHubLink, email, imgUrl }: Props) => {
  return (
    <div className="rounded-2xl flex flex-col items-center p-5 gap-4 col-span-1 text-black dark:text-white bg-lightGray dark:bg-dark lg:px-0">
      <img
        src={imgUrl}
        alt={`Foto de ${name}`}
        className="h-32 w-32 rounded-full border-4 border-purple dark:border-green"
      />
      <div>
        <h2 className="font-poppins font-medium text-sm text-center">{work}</h2>
        <h1 className="font-poppins font-medium md:text-xl text-center text-sm lg:w-64 w-44">
          {name}
        </h1>
      </div>
      <div className="flex items-center gap-5">
        <a href={gitHubLink}>
          <Github
            size={24}
            className="text-purple dark:text-green"
            aria-label="github logo"
          />
        </a>
        <a href={`mailto:${email}?subject=Olá ${name}&body=`}>
          <Mail
            size={24}
            className="text-purple dark:text-green"
            aria-label="Envelope de e-mail"
          />
        </a>
      </div>
    </div>
  );
};

export default DevCard;
