import { PlusSquare, Share } from "lucide-react";

const Pwa = () => {
  return (
    <>
      <div className="lg:hidden flex flex-col items-start p-4 bg-white dark:bg-dark dark:text-white shadow-xl rounded-2xl text-base font-poppins font-medium gap-4">
        <h1 className="text-xl">Instale o App do iParque</h1>
        <div className="flex items-center">
          <h2 className="w-48">1. Pressione no ícone</h2>
          <span className="p-2 rounded-lg bg-lightGray dark:bg-darkBg">
            <Share size={24} />
          </span>
        </div>
        <div className="flex items-center">
          <h2 className="w-48">2. Deslize e selecione</h2>
          <span className="p-2 rounded-lg bg-lightGray dark:bg-darkBg">
            <PlusSquare size={24} />
          </span>
        </div>
        <div className="flex items-center">
          <h2 className="w-48">3. Procure pelo ícone</h2>
          <span className="p-[2px] rounded-lg bg-darkBg flex items-center">
            <img
              src="maskable-icon.png"
              alt=""
              className="object-cover w-8 h-8"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default Pwa;
