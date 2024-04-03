import { Mail } from "lucide-react";

interface Props {
  name: string;
  imageUrl: string;
  job: string;
  email: string;
}

const Dev = ({ name, imageUrl, job, email }: Props) => {
  return (
    <div className="flex flex-col items-center bg-lightGray dark:bg-dark p-5 rounded-2xl gap-5">
      <img
        src={imageUrl}
        alt=""
        className="object cover border-[3px] border-purple dark:border-green rounded-full"
        width={256}
        height={256}
      />
      <div className="flex flex-col gap-3 items-center">
        <h2 className="text-2xl font-prompt">{name}</h2>
        <h3 className="text-xl font-poppins font-medium">{job}</h3>
      </div>
      <div className="flex items-center gap-5">
        <Mail size={32} className="text-purple dark:text-green" />
        <h4 className="font-poppins">{email}</h4>
      </div>
    </div>
  );
};

export default Dev;
