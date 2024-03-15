import { ReactNode, useEffect, useState } from "react";

interface Props {
  variant: "primary" | "outline" | "danger" | "none";
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
      className={`w-max text-base font-poppins font-medium uppercase rounded-lg transition-colors duration-100 ${className} ${classes}`}
    >
      {children}
    </button>
  );
};

export default Button;
