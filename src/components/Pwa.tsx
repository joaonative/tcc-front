import { PlusSquare, Share } from "lucide-react";

const Pwa = () => {
  return (
    <>
      <div className="lg:hidden flex flex-col p-3 bg-white dark:bg-dark dark:text-white shadow-xl rounded-2xl font-poppins font-medium gap-2">
        <h1 className="text-xl">Instale o App do iParque</h1>
        <div className="flex items-center gap-2">
          <h2>1. Clique em</h2>
          <span className="p-2 rounded-lg bg-lightGray dark:bg-darkBg">
            <Share size={24} />
          </span>
          <h2>na barra.</h2>
        </div>
        <div className="flex items-center gap-2">
          <h2>2. Deslize e selecione</h2>
          <span className="p-2 rounded-lg bg-lightGray dark:bg-darkBg">
            <PlusSquare size={24} />
          </span>
          <h2>adicionar à tela inicial.</h2>
        </div>
        <div className="flex items-center gap-2">
          <h2>3. Procure pelo</h2>

          <span className="p-[2px] rounded-lg bg-darkBg flex items-center">
            <img
              src="maskable-icon.png"
              alt=""
              className="object-cover w-8 h-8"
            />
          </span>

          <h2>ícone na sua tela inicial.</h2>
        </div>
      </div>
    </>
  );
};

export default Pwa;
