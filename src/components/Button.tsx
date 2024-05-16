import { ReactNode } from "react";

interface Props {
  variant: "primary" | "outline" | "danger" | "google" | "none";
  children: ReactNode;
  onClick?: () => void;
  classes?: string;
  full?: boolean;
  submit?: boolean;
}

const Button = ({
  variant,
  children,
  onClick,
  classes,
  full,
  submit,
}: Props) => {
  let className = "";

  switch (variant) {
    case "primary":
      className =
        "text-white dark:text-black bg-purple dark:bg-green border-purple dark:border-green px-5 py-2 border lg:border-2";
      break;
    case "outline":
      className =
        "text-purple dark:text-green border-purple dark:border-green hover:text-white hover:bg-purple dark:hover:bg-green dark:hover:text-black px-5 py-2 border lg:border-2";
      break;
    case "danger":
      className =
        "text-white bg-red-500 px-5 py-2 border lg:border-2 border-red-500";
      break;
    case "google":
      className =
        "flex items-center justify-center w-full gap-5 text-black/80 text-white px-5 py-2 bg-lightGray";
      break;
    case "none":
      className = "";
      break;
    default:
      className = "px-5 py-2 border lg:border-2";
  }

  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={`${
        full ? "w-full" : "w-max"
      } text-base font-poppins font-medium uppercase rounded-xl transition-colors duration-100 ${className} ${classes}`}
    >
      {children}
    </button>
  );
};

export default Button;
