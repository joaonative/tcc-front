import { useState, useEffect } from "react";
import { useError } from "../contexts/Error.context";

const ErrorPopUp = () => {
  const { error, setError } = useError();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer: any;
    if (error) {
      setProgress(100);
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress <= 0) {
            clearInterval(timer);
            setError("");
            return 0;
          }
          return prevProgress - 1;
        });
      }, 50);
    }

    return () => {
      clearInterval(timer);
    };
  }, [error, setError]);

  return (
    <>
      {error && (
        <div className="z-50 fixed flex flex-col left-1/2 top-5 transform -translate-x-1/2 shadow-2xl">
          <div className="p-3 bg-red-500 rounded-xl border-[3px] border-red-500 text-white uppercase mt-1">
            <div className="flex items-center gap-2">{error}</div>
            <div
              className="bg-white h-1 mt-2 rounded-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorPopUp;
