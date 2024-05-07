import { Bookmark, Crown, Info, Users } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ariaLabel } from "../../constants/aria-label";
import Button from "../Button";
import { useAuth } from "../../contexts/Auth.context";
import { useState } from "react";
import { useError } from "../../contexts/Error.context";
import axios from "../../api/api";
import Loading from "../Loading";
import { deleteImage } from "../../api/deleteImage";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { categoryIconMap } from "../../utils/CategoryIconMap";
import EventList from "../e/EventList";
import CreateEventForm from "../e/CreateEventForm";
import { useTheme } from "../../contexts/Theme.context";

interface Props {
  id: string;
}

const CommunitySingle = ({ id }: Props) => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const { setError } = useError();

  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsFormModalOpen(true);
  };

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const getEvents = async (page: number) => {
    try {
      const response = await axios.get("/events/owner/" + data.community._id, {
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
    eventsQuery.refetch();
  };

  const eventsQuery = useQuery({
    queryKey: ["commuunuity events", currentPage],
    queryFn: () => getEvents(currentPage),
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isParticipating, setisParticipating] = useState<boolean>();

  const getCommunity = async () => {
    try {
      const response = await axios.get(`/communities/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setisParticipating(
        response.data.community.participants.includes(user.id)
      );
      return response.data;
    } catch (error: any) {
      setError(error.response.data.message);
      return;
    }
  };

  const joinCommunity = async () => {
    try {
      const response = await axios.put(
        `/communities/join/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            id: user.id,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      setError(error.response.data.message);
      return;
    }
  };

  const leaveCommunity = async () => {
    try {
      const response = await axios.get(`/communities/leave/${id}`, {
        headers: {
          Authorization: `Bearer: ${user.token}`,
          id: user.id,
        },
      });
      return response.data;
    } catch (error: any) {
      setError(error.response.data.message);
      return;
    }
  };

  const deleteCommunity = async () => {
    try {
      await deleteImage(
        `${user.id}-${data.community.name.replace(/\s+/g, "")}-comunidade`
      );

      const response = await axios.delete(`/communities/${id}`, {
        headers: {
          Authorization: `Bearer: ${user.token}`,
          id: user.id,
        },
      });
      return response.data;
    } catch (error: any) {
      setError(error.response.data.message);
      return;
    }
  };

  const queryClient = useQueryClient();

  const joinMutation = useMutation({
    mutationFn: joinCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ["community", id],
          ["communities", user.id],
        ],
      });
    },
  });

  const leaveMutation = useMutation({
    mutationFn: leaveCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ["community", id],
          ["communities", user.id],
        ],
      });
    },
  });

  const { isPending, data } = useQuery({
    queryKey: ["communities", id],
    queryFn: getCommunity,
    retry: false,
  });

  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: deleteCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      navigate("/comunidades");
    },
    retry: false,
  });

  if (typeof id !== "string" || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return <Navigate to={"/comunidades"} replace />;
  }

  if (!isPending && !data) {
    return <Navigate to={"/comunidades"} replace />;
  }

  if (
    isPending ||
    joinMutation.isPending ||
    leaveMutation.isPending ||
    deleteMutation.isPending
  ) {
    return (
      <section className="flex flex-col gap-5">
        <Loading />
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col lg:gap-8 gap-5">
        <div className="flex lg:flex-row flex-col items-center lg:gap-8 gap-5">
          <div className="lg:w-1/2 w-full flex flex-col justify-between p-5 lg:p-8 bg-lightGray dark:bg-dark rounded-2xl gap-5">
            <span className="flex items-center gap-2">
              <Bookmark
                size={24}
                className="text-purple dark:text-green"
                aria-label={ariaLabel.bookmark}
              />
              <h1 className="text-base font-prompt w-full">
                {data.community.name}
              </h1>
            </span>
            <img
              src={data.community.imageUrl}
              alt={`Foto da comunidade: ${data.community.name}`}
              width={1024}
              height={768}
              className="object-cover rounded-2xl w-full h-64 lg:h-80 3xl:h-[512px]"
            />
            <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between gap-4">
              <span className="flex items-center gap-2">
                <Crown
                  size={24}
                  className="text-purple dark:text-green"
                  aria-label={ariaLabel.bookmark}
                />
                <h1 className="text-base font-prompt">{data.owner}</h1>
              </span>
              <div className="flex items-center lg:gap-5 justify-between">
                <span className="flex items-center gap-2">
                  <Info
                    size={24}
                    className="text-purple dark:text-green"
                    aria-label={ariaLabel.bookmark}
                  />
                  <h1 className="text-base font-prompt">
                    Idade Mínima: {data.community.age_range}
                  </h1>
                </span>
                <span className="flex items-center gap-2">
                  {categoryIconMap[data.community.category]}
                  <h1 className="text-base font-prompt">
                    {data.community.category}
                  </h1>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-5 lg:p-8 bg-lightGray dark:bg-dark rounded-2xl gap-5">
          <blockquote className="font-poppins font-medium">
            {data.community.description}
          </blockquote>
        </div>
        <div className="w-full flex flex-col justify-between p-5 lg:p-8 bg-lightGray dark:bg-dark rounded-2xl gap-5">
          <span className="flex items-center gap-2">
            <Users
              size={24}
              className="text-purple dark:text-green"
              aria-label={ariaLabel.users}
            />
            <h1 className="text-base font-prompt">
              {data.community.participantCount}/
              {data.community.participantLimit}
            </h1>
          </span>
          <div className="overflow-x-scroll">
            <div className="flex items-center gap-8 w-max">
              {(data.participants ?? []).map(
                (participant: {
                  id: string;
                  imageUrl: string;
                  name: string;
                }) => (
                  <div
                    className="flex flex-col items-center gap-2 mb-5"
                    key={participant.id}
                  >
                    <img
                      src={participant.imageUrl}
                      alt={`foto do participante ${participant.name}`}
                      height={128}
                      width={128}
                      className="h-32 w-32 rounded-full object-cover border-[3px] border-purple dark:border-green"
                    />
                    <h2 className="font-poppinst font-medium">
                      {participant.name.length <= 22
                        ? participant.name
                        : `${participant.name.slice(0, 22)}...`}
                    </h2>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {!eventsQuery.data ||
        !eventsQuery.data.events ||
        eventsQuery.data.events.length === 0 ||
        eventsQuery.isPending ? (
          <>
            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl lg:text-3xl font-prompt">
                  Sem eventos na comunidade, começe agora!
                </h1>
                <Button
                  variant="primary"
                  onClick={handleOpen}
                  classes="hidden lg:block"
                >
                  Criar evento
                </Button>
              </div>
              {isFormModalOpen && (
                <CreateEventForm
                  handleCancel={() => setIsFormModalOpen(false)}
                />
              )}
              <div className="flex items-center justify-center">
                <img
                  src={darkMode ? "/notfoundDark.svg" : "/notfound.svg"}
                  width={768}
                  height={512}
                  className="object-cover w-full lg:w-[512px]"
                />
              </div>
            </section>
            {!isFormModalOpen && (
              <Button
                variant="primary"
                onClick={handleOpen}
                classes="lg:hidden fixed bottom-24 right-4"
              >
                Criar evento
              </Button>
            )}
          </>
        ) : (
          <section className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl lg:text-3xl font-prompt">
                Eventos Ativos
              </h1>
              <Button
                variant="primary"
                onClick={handleOpen}
                classes="hidden lg:block"
              >
                Criar evento
              </Button>
            </div>
            <EventList events={eventsQuery.data.events} />
            {isFormModalOpen && (
              <CreateEventForm handleCancel={() => setIsFormModalOpen(false)} />
            )}
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
          </section>
        )}

        <div className="w-full flex items-center gap-5 justify-end">
          <Link to={"/comunidades"}>
            <Button variant="outline">Voltar</Button>
          </Link>

          {data.community.owner === user.id ? (
            <Button variant="danger" onClick={() => setIsOpen(true)}>
              Excluir comunidade
            </Button>
          ) : isParticipating ? (
            <Button variant="danger" onClick={leaveMutation.mutate}>
              Sair do comunidade
            </Button>
          ) : (
            <Button variant="primary" onClick={joinMutation.mutate}>
              Participar
            </Button>
          )}
        </div>
      </section>

      {!isFormModalOpen && (
        <Button
          variant="primary"
          onClick={handleOpen}
          classes="lg:hidden fixed bottom-24 right-4"
        >
          Criar evento
        </Button>
      )}

      {isOpen && (
        <Modal
          handleCancel={() => setIsOpen(false)}
          handleConfirm={deleteMutation.mutate}
          title="Tem certeza?"
          cancelMessage="Cancelar"
          confirmMessage="Deletar"
        >
          <h1 className="text-xl">A comunidade será removida para sempre!</h1>
        </Modal>
      )}
    </>
  );
};

export default CommunitySingle;
