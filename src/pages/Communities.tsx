import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../contexts/Auth.context";
import axios from "../api/api";
import { useTheme } from "../contexts/Theme.context";
import { useError } from "../contexts/Error.context";
import LoadingCardSkeleton from "../components/LoadingCardSkeleton";
import Button from "../components/Button";
import CommunityForm from "../components/c/CommunityForm";
import CommunityList from "../components/c/CommunityList";

const Communities = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const { setError } = useError();

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const getCommunities = async (page: number) => {
    try {
      const response = await axios.get("/communities", {
        headers: { Authorization: `Bearer ${user.token}` },
        params: { page },
      });
      setTotalPages(response.data.totalPages);
      return response.data;
    } catch (error: any) {
      setError(error.response.data.message);
      return;
    }
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
    refetch;
  };

  const { isPending, data, refetch } = useQuery({
    queryKey: ["communities", currentPage],
    queryFn: () => getCommunities(currentPage),
  });

  if (isPending) {
    return (
      <section className="flex flex-col gap-5">
        <h1 className="text-2xl lg:text-3xl font-prompt">Carregando ...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-start items-start">
          <LoadingCardSkeleton />
          <LoadingCardSkeleton />
          <LoadingCardSkeleton />
          <LoadingCardSkeleton />
          <LoadingCardSkeleton />
          <LoadingCardSkeleton />
        </div>
      </section>
    );
  }

  if (!data.communities || data.communities.length === 0) {
    return (
      <>
        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl lg:text-3xl font-prompt">
              Sem comunidades, começe agora!
            </h1>
            <Button
              variant="primary"
              onClick={handleOpen}
              classes="hidden lg:block"
            >
              Criar comunidade
            </Button>
          </div>
          {isOpen && <CommunityForm handleCancel={() => setIsOpen(false)} />}
          <div className="flex items-center justify-center">
            <img
              src={darkMode ? "notfoundDark.svg" : "notfound.svg"}
              width={768}
              height={512}
              className="object-cover w-full lg:w-[512px]"
            />
          </div>
        </section>
        {!isOpen && (
          <Button
            variant="primary"
            onClick={handleOpen}
            classes="lg:hidden fixed bottom-24 right-4"
          >
            Criar comunidade
          </Button>
        )}
      </>
    );
  }
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl lg:text-3xl font-prompt">Comunidades</h1>
        <Button
          variant="primary"
          onClick={handleOpen}
          classes="hidden lg:block"
        >
          Criar comunidade
        </Button>
      </div>
      <CommunityList communities={data.communities} />
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
      {isOpen && <CommunityForm handleCancel={() => setIsOpen(false)} />}
      {!isOpen && (
        <Button
          variant="primary"
          onClick={handleOpen}
          classes="lg:hidden fixed bottom-24 right-4"
        >
          Criar comunidade
        </Button>
      )}
    </section>
  );
};

export default Communities;
