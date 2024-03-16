import { ReactNode, useEffect, useState } from "react";

interface Props {
  variant: "primary" | "outline" | "danger" | "google" | "none";
  children: ReactNode;
  onClick?: () => void;
  classes?: string;
}

const Button = ({ variant, children, onClick, classes }: Props) => {
  const [className, setClassName] = useState("");

  useEffect(() => {
    switch (variant) {
      case "primary":
        setClassName(
          "w-max text-white dark:text-black bg-purple dark:bg-green border-purple dark:border-green px-3 py-1 border lg:border-2 "
        );
        break;
      case "outline":
        setClassName(
          "w-max text-purple dark:text-green border-purple dark:border-green hover:text-white hover:bg-purple dark:hover:bg-green dark:hover:text-black px-3 py-1 border lg:border-2 "
        );
        break;
      case "danger":
        setClassName("w-max px-3 py-1 border lg:border-2 ");
        break;
      case "google":
        setClassName(
          "flex items-center justify-center w-full gap-5 text-black/80 bg-white px-3 py-1 bg-lightGray"
        );
        break;
      case "none":
        setClassName("");
        break;
      default:
        setClassName("px-3 py-1 border lg:border-2 ");
    }
  }, []);

  return (
    <button
      onClick={onClick}
      className={`text-base font-poppins font-medium uppercase rounded-lg transition-colors duration-100 ${className} ${classes}`}
    >
      {children}
    </button>
  );
};

export default Button;
