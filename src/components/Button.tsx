import { ReactNode, useEffect, useState } from "react";

interface Props {
  variant: "primary" | "outline" | "danger" | "google" | "none";
  children: ReactNode;
  onClick?: () => void;
  classes?: string;
  full?: boolean;
}

const Button = ({ variant, children, onClick, classes, full }: Props) => {
  const [className, setClassName] = useState("");

  useEffect(() => {
    switch (variant) {
      case "primary":
        setClassName(
          "text-white dark:text-black bg-purple dark:bg-green border-purple dark:border-green px-3 py-1 border lg:border-2 "
        );
        break;
      case "outline":
        setClassName(
          "text-purple dark:text-green border-purple dark:border-green hover:text-white hover:bg-purple dark:hover:bg-green dark:hover:text-black px-3 py-1 border lg:border-2 "
        );
        break;
      case "danger":
        setClassName("px-3 py-1 border lg:border-2 ");
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
      className={`${
        full ? "w-full" : "w-max"
      } text-base font-poppins font-medium uppercase rounded-lg transition-colors duration-100 ${className} ${classes}`}
    >
      {children}
    </button>
  );
};

export default Button;
