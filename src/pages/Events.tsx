import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import EventList from "../components/e/EventList";
import { useAuth } from "../contexts/Auth.context";
import Button from "../components/Button";
import CreateEventForm from "../components/e/CreateEventForm";
import { useTheme } from "../contexts/Theme.context";
import { EventService } from "../services/event";
import Page from "../components/Page";
import Loading from "../components/Loading";

const Events = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const get = async (page: number) => {
    const res = await EventService.getEvents(user.token, page);
    setTotalPages(res.totalPages);
    return res;
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
    refetch;
  };

  const { isPending, data, refetch } = useQuery({
    queryKey: ["events", currentPage],
    queryFn: () => get(currentPage),
  });

  if (isPending) {
    return (
      <Page>
        <Loading />
      </Page>
    );
  }

  return (
    <>
      <Page>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl font-prompt">
            {data.events && data.events.length >= 1
              ? "Eventos Ativos"
              : "Sem eventos, começe agora!"}
          </h1>
          <Button
            variant="primary"
            onClick={handleOpen}
            classes="hidden lg:block"
          >
            Criar evento
          </Button>
        </div>
        {data.events && data.events.length >= 1 ? (
          <>
            <EventList events={data.events} />
            <div className="flex items-center justify-center gap-5">
              {totalPages > 1 &&
                Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePagination(index)}
                    className={`h-8 w-8 bg-purple dark:bg-green text-white dark:text-black font-medium font-poppins ${
                      currentPage === index && "border-4"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <img
              src={darkMode ? "/notfoundDark.svg" : "/notfound.svg"}
              width={768}
              height={512}
              className="object-cover w-full lg:w-[512px]"
            />
          </div>
        )}
      </Page>
      {isOpen && <CreateEventForm handleCancel={() => setIsOpen(false)} />}
      {!isOpen && (
        <Button
          variant="primary"
          onClick={handleOpen}
          classes="lg:hidden fixed bottom-24 right-4"
        >
          Criar evento
        </Button>
      )}
    </>
  );
};

export default Events;
