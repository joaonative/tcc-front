import { LockIcon, PlusCircle, RefreshCcwIcon } from "lucide-react";

const Browser = () => {
  return (
    <div className="w-max lg:flex flex-col gap-5 lg:gap-3 bg-lightGray dark:bg-dark p-3 rounded-xl select-none">
      <div className="flex justify-between items-center">
        <div className="flex justify-center gap-[2px] lg:gap-2 w-8 lg:w-16">
          {/* Browser Dots */}
          <div className="rounded-full h-1 w-1 lg:w-3 lg:h-3 bg-[red]" />
          <div className="rounded-full h-1 w-1 lg:w-3 lg:h-3 bg-[orange]" />
          <div className="rounded-full h-1 w-1 lg:w-3 lg:h-3 bg-[green]" />
        </div>
        <div className="bg-white dark:bg-gray flex items-center gap-5 lg:gap-32 py-1 px-5 rounded-md">
          {/* Secure Icon */}
          <LockIcon size={16} className="text-black/50 dark:text-white/50" />
          {/* Search Bar */}
          <h2 className="font-poppins text-sm text-black/50 dark:text-white/50">
            iparque.com
          </h2>
          {/* Reload Icon */}
          <RefreshCcwIcon
            size={16}
            className="text-black/50 dark:text-white/50"
          />
        </div>
        <div className="w-8 lg:w-16 flex justify-end">
          {/* Broser Icon */}
          <PlusCircle size={16} className="text-black/50 dark:text-white/50" />
        </div>
      </div>
      <div className="bg-cover bg-showcaseMobileLight dark:bg-showcaseMobile lg:bg-showcaseLigt lg:dark:bg-showcase h-[384px] lg:w-[1024px] w-full mt-2 lg:mt-1" />
    </div>
  );
};

export default Browser;
