import {
  Bookmark,
  CalendarClock,
  Crown,
  Drama,
  HeartPulse,
  Info,
  Leaf,
  MapPin,
  Music2,
  PartyPopper,
  PlaneLanding,
  Users,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ariaLabel } from "../../constants/aria-label";
import Button from "../Button";
import { useAuth } from "../../contexts/Auth.context";
import { useState } from "react";
import { useError } from "../../contexts/Error.context";
import axios from "../../api/api";
import Loading from "../Loading";
import { deleteImage } from "../../api/deleteImage";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "../Modal";

interface Props {
  id: string;
}

const EventSingle = ({ id }: Props) => {
  const { user } = useAuth();
  const { setError } = useError();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isParticipating, setisParticipating] = useState<boolean>();

  const getEvent = async () => {
    try {
      const response = await axios.get(`/events/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setisParticipating(response.data.event.participants.includes(user.id));
      return response.data;
    } catch (error: any) {
      setError(error.response.data.message);
      return;
    }
  };

  const joinEvent = async () => {
    try {
      const response = await axios.put(
        `/events/join/${id}`,
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

  const leaveEvent = async () => {
    try {
      const response = await axios.get(`/events/leave/${id}`, {
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

  const deleteEvent = async () => {
    try {
      const eventDate = new Date(data.event.date);
      eventDate.setDate(eventDate.getDate() + 1);

      const day = String(eventDate.getDate()).padStart(2, "0");
      const month = String(eventDate.getMonth() + 1).padStart(2, "0");
      const year = String(eventDate.getFullYear());

      await deleteImage(
        `${user.id}-${year}-${month}-${day}-${data.event.name.replace(
          /\s+/g,
          ""
        )}`
      );

      const response = await axios.delete(`/events/${id}`, {
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
    mutationFn: joinEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", id] });
    },
  });

  const leaveMutation = useMutation({
    mutationFn: leaveEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", id] });
    },
  });

  const { isPending, data } = useQuery({
    queryKey: ["event", id],
    queryFn: getEvent,
    retry: false,
  });

  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/eventos");
    },
  });

  if (typeof id !== "string" || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return <Navigate to={"/eventos"} replace />;
  }

  if (!isPending && !data) {
    return <Navigate to={"/eventos"} replace />;
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

  const categoryIconMap: { [key: string]: JSX.Element } = {
    Cultura: <Drama size={24} className="text-purple dark:text-green" />,
    Festa: <PartyPopper size={24} className="text-purple dark:text-green" />,
    Música: <Music2 size={24} className="text-purple dark:text-green" />,
    Natureza: <Leaf size={24} className="text-purple dark:text-green" />,
    Esportes: (
      <PlaneLanding size={24} className="text-purple dark:text-green" />
    ),
    Saúde: <HeartPulse size={24} className="text-purple dark:text-green" />,
  };
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
                {data.event.name}
              </h1>
            </span>
            <img
              src={data.event.imageUrl}
              alt={`Foto do evento: ${data.event.name}`}
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
                    Idade Mínima: {data.event.age_range}
                  </h1>
                </span>
                <span className="flex items-center gap-2">
                  {categoryIconMap[data.event.category]}
                  <h1 className="text-base font-prompt">
                    {data.event.category}
                  </h1>
                </span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col justify-between p-5 lg:p-8 bg-lightGray dark:bg-dark rounded-2xl gap-5">
            <span className="flex items-center gap-2">
              <MapPin
                size={24}
                className="text-purple dark:text-green"
                aria-label={ariaLabel.bookmark}
              />
              <h1 className="text-base font-prompt line-clamp-1 w-full">
                {data.event.location}
              </h1>
            </span>
            <iframe
              title={`localização do evento ${data.event.name} em ${data.event.location}`}
              src={data.event.mapUrl}
              className="object-cover rounded-2xl w-full h-64 lg:h-80 3xl:h-[512px]"
            />
            <span className="flex items-center gap-2">
              <CalendarClock
                size={24}
                className="text-purple dark:text-green"
                aria-label={ariaLabel.bookmark}
              />
              <h1 className="text-base font-prompt">
                {`${String(new Date(data.event.date).getDate() + 1).padStart(
                  2,
                  "0"
                )}/${String(new Date(data.event.date).getMonth() + 1).padStart(
                  2,
                  "0"
                )}/${String(new Date(data.event.date).getFullYear())}`}
              </h1>
            </span>
          </div>
        </div>
        <div className="w-full p-5 lg:p-8 bg-lightGray dark:bg-dark rounded-2xl gap-5">
          <blockquote className="font-poppins font-medium">
            {data.event.description}
          </blockquote>
        </div>
        <div className="w-full flex flex-col p-5 lg:p-8 bg-lightGray dark:bg-dark rounded-2xl gap-5">
          <span className="flex items-center gap-2">
            <Users
              size={24}
              className="text-purple dark:text-green"
              aria-label={ariaLabel.users}
            />
            <h1 className="text-base font-prompt">
              {data.event.participantCount}/{data.event.participantLimit}
            </h1>
          </span>
          <div className=" overflow-x-scroll">
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
                      {participant.name.length <= 16
                        ? participant.name
                        : `${participant.name.slice(0, 16)}...`}
                    </h2>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center gap-5 justify-end">
          <Button variant="outline">
            <a href="/eventos">Voltar</a>
          </Button>

          {data.event.owner === user.id ? (
            <Button variant="danger" onClick={() => setIsOpen(true)}>
              Excluir evento
            </Button>
          ) : isParticipating ? (
            <Button variant="danger" onClick={leaveMutation.mutate}>
              Sair do evento
            </Button>
          ) : (
            <Button variant="primary" onClick={joinMutation.mutate}>
              Participar
            </Button>
          )}
        </div>
      </section>
      {isOpen && (
        <Modal
          handleCancel={() => setIsOpen(false)}
          handleConfirm={deleteMutation.mutate}
          title="Tem certeza?"
          cancelMessage="Cancelar"
          confirmMessage="Deletar"
        >
          <img src={data.event.imageUrl} width={512} height={256} />
          <h1 className="font-poppins font-medium text-xl">
            O evento: {data.event.name} será excluido permanentemente!
          </h1>
        </Modal>
      )}
    </>
  );
};

export default EventSingle;
