import { ReactNode } from "react";

interface Props {
  variant: "primary" | "outline" | "danger" | "google" | "none";
  children: ReactNode;
  onClick?: () => void;
  classes?: string;
  full?: boolean;
  submit?: boolean;
  disabled?: boolean;
}

const Button = ({
  variant,
  children,
  onClick,
  classes,
  full,
  submit,
  disabled,
}: Props) => {
  let className = "";

  switch (variant) {
    case "primary":
      className =
        "text-white dark:text-black bg-purple dark:bg-green border-purple dark:border-green px-2 py-1 border lg:border-2";
      break;
    case "outline":
      className =
        "text-purple dark:text-green border-purple dark:border-green hover:text-white hover:bg-purple dark:hover:bg-green dark:hover:text-black px-2 py-1 border lg:border-2";
      break;
    case "danger":
      className =
        "text-white bg-red-600  px-2 py-1 border lg:border-2 border-red-bg-red-600";
      break;
    case "google":
      className =
        "flex items-center justify-center w-full gap-5 text-black/80 text-white px-2 py-1 bg-lightGray";
      break;
    case "none":
      className = "";
      break;
    default:
      className = "px-2 py-1 border lg:border-2";
  }

  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={`${
        full ? "w-full" : "w-max"
      } disabled:bg-slate-500 border-white text-base font-poppins font-medium uppercase rounded-xl transition-colors duration-100 ${className} ${classes}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
