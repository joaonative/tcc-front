import { PlusSquare, Share } from "lucide-react";
import { useEffect, useState } from "react";

const Pwa = () => {
  const [browser, setBrowser] = useState<string>("");
  const [deviceType, setDeviceType] = useState<string>("");

  useEffect(() => {
    const detectBrowser = () => {
      const userAgent = navigator.userAgent;

      if (userAgent.includes("Chrome") && !userAgent.includes("Safari")) {
        setBrowser("Chrome");
      } else if (
        userAgent.includes("Safari") &&
        !userAgent.includes("Chrome")
      ) {
        setBrowser("Safari");
      } else {
        setBrowser("Other");
      }
    };

    const detectDeviceType = () => {
      const userAgent = navigator.userAgent;

      if (/Mobile/.test(userAgent)) {
        if (/(iPad|iPhone|iPod)/.test(userAgent)) {
          setDeviceType("iOS");
        } else if (/Android/.test(userAgent)) {
          setDeviceType("Android");
        } else {
          setDeviceType("Other");
        }
      } else {
        setDeviceType("Desktop");
      }
    };

    detectBrowser();
    detectDeviceType();
  }, []);

  return (
    <>
      {deviceType === "iOS" && (
        <div className="flex flex-col p-3 bg-white shadow-xl rounded-2xl">
          <h1>Instale o App do iParque</h1>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <h2>Clique em</h2>
              <Share size={32} className="p-2 rounded-lg bg-red-300" />
              <h2>na barra.</h2>
            </div>
            <div className="flex items-center gap-2">
              <h2>Deslize e selecione</h2>
              <span>
                <Share size={32} className="p-2 rounded-lg bg-red-300" />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pwa;
