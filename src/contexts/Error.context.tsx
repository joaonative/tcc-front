import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

type IErrorContext = {
  error: string;
  setError: (newState: string) => void;
};

const initialValue = {
  error: "",
  setError: () => {},
};

const ErrorContext = createContext<IErrorContext>(initialValue);

const ErrorProvider = ({ children }: Props) => {
  const [error, setError] = useState(initialValue.error);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
const useError = () => useContext(ErrorContext);

export { ErrorContext, ErrorProvider, useError };
