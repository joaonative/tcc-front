import { ReactNode, useEffect, useState } from "react";

interface Props {
  variant: "primary" | "outline" | "danger";
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
          "text-white dark:text-black bg-purple dark:bg-green border-purple dark:border-green"
        );
        break;
      case "outline":
        setClassName(
          "text-purple dark:text-green border-purple dark:border-green hover:text-white hover:bg-purple dark:hover:bg-green dark:hover:text-black"
        );
        break;
      case "danger":
        setClassName("c");
        break;
      default:
        setClassName("d");
    }
  }, []);

  return (
    <button
      onClick={onClick}
      className={`w-max px-3 py-1 border lg:border-2 text-base font-poppins font-medium uppercase rounded-lg transition-colors duration-100 ${className} ${classes}`}
    >
      {children}
    </button>
  );
};

export default Button;
