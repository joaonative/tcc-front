import {
  Bookmark,
  CalendarClock,
  Crown,
  Info,
  MapPin,
  Users,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ariaLabel } from "../../constants/aria-label";
import Button from "../Button";
import { useAuth } from "../../contexts/Auth.context";
import { useState } from "react";
import Loading from "../Loading";
import { deleteImage } from "../../api/deleteImage";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { categoryIconMap } from "../../utils/CategoryIconMap";
import Event from "../../interfaces/Event";
import { EventService } from "../../services/event";
import Page from "../Page";

interface Props {
  id: string;
  event: Event;
  participants: { id: string; imageUrl: string; name: string }[];
  owner: string;
}

const EventSingle = ({ event, owner, participants }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isOwner = event.owner === user.id;
  const isParticipating: boolean = event.participants.includes(user.id);

  const join = async () => {
    const res = await EventService.joinEvent(user.token, event._id, user.id);
    return res;
  };
  const leaveEvent = async () => {
    const res = await EventService.leaveEvent(user.token, event._id, user.id);
    return res;
  };

  const deleteEvent = async () => {
    const eventDate = new Date(event.date);
    eventDate.setDate(eventDate.getDate() + 1);

    const day = String(eventDate.getDate()).padStart(2, "0");
    const month = String(eventDate.getMonth() + 1).padStart(2, "0");
    const year = String(eventDate.getFullYear());

    await deleteImage(
      `${user.id}-${year}-${month}-${day}-${event.name.replace(/\s+/g, "")}`
    );

    const res = await EventService.deleteEvent(user.token, event._id, user.id);
    return res;
  };

  const queryClient = useQueryClient();

  const joinMutation = useMutation({
    mutationFn: join,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event" + event._id, "events" + user.id],
      });
    },
  });

  const leaveMutation = useMutation({
    mutationFn: leaveEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event" + event._id, "events" + user.id],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/eventos");
    },
  });

  if (
    joinMutation.isPending ||
    leaveMutation.isPending ||
    deleteMutation.isPending
  ) {
    return (
      <Page>
        <Loading />
      </Page>
    );
  }

  return (
    <>
      <Page>
        <div className="flex lg:flex-row flex-col items-center lg:gap-8 gap-5">
          <div className="lg:w-1/2 w-full flex flex-col justify-between p-5 lg:p-8 bg-lightGray dark:bg-dark rounded-2xl gap-5">
            <span className="flex items-center gap-2">
              <Bookmark
                size={24}
                className="text-purple dark:text-green"
                aria-label={ariaLabel.bookmark}
              />
              <h1 className="text-base font-prompt w-full">{event.name}</h1>
            </span>
            <img
              src={event.imageUrl}
              alt={`Foto do evento: ${event.name}`}
              width={1024}
              height={768}
              className="object-cover rounded-2xl w-full h-64 lg:h-80"
            />
            <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between gap-4">
              <span className="flex items-center gap-2">
                <Crown
                  size={24}
                  className="text-purple dark:text-green"
                  aria-label={ariaLabel.bookmark}
                />
                <h1 className="text-base font-prompt">{owner}</h1>
              </span>
              <div className="flex items-center lg:gap-5 justify-between">
                <span className="flex items-center gap-2">
                  <Info
                    size={24}
                    className="text-purple dark:text-green"
                    aria-label={ariaLabel.bookmark}
                  />
                  <h1 className="text-base font-prompt">
                    Idade Mínima: {event.age_range}
                  </h1>
                </span>
                <span className="flex items-center gap-2">
                  {categoryIconMap[event.category]}
                  <h1 className="text-base font-prompt">{event.category}</h1>
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
                {event.location}
              </h1>
            </span>
            <iframe
              title={`localização do evento ${event.name} em ${event.location}`}
              src={event.mapUrl}
              className="object-cover rounded-2xl w-full h-64 lg:h-80"
            />
            <span className="flex items-center gap-2">
              <CalendarClock
                size={24}
                className="text-purple dark:text-green"
                aria-label={ariaLabel.bookmark}
              />
              <h1 className="text-base font-prompt">
                {`${String(new Date(event.date).getDate() + 1).padStart(
                  2,
                  "0"
                )}/${String(new Date(event.date).getMonth() + 1).padStart(
                  2,
                  "0"
                )}/${String(new Date(event.date).getFullYear())}`}
              </h1>
            </span>
          </div>
        </div>
        <div className="w-full p-5 lg:p-8 bg-lightGray dark:bg-dark rounded-2xl gap-5">
          <blockquote className="font-poppins font-medium">
            {event.description}
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
              {event.participantCount}/{event.participantLimit}
            </h1>
          </span>
          <div className=" overflow-x-scroll">
            <div className="flex items-center gap-8 w-max">
              {participants.map((participant) => (
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
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center gap-5 justify-end">
          <Link to={"/eventos"}>
            <Button variant="outline">Voltar</Button>
          </Link>

          {isOwner ? (
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
      </Page>
      {isOpen && (
        <Modal
          handleCancel={() => setIsOpen(false)}
          handleConfirm={deleteMutation.mutate}
          title="Tem certeza?"
          cancelMessage="Cancelar"
          confirmMessage="Deletar"
        >
          <h1 className="text-xl">O evento será removido para sempre!</h1>
        </Modal>
      )}
    </>
  );
};

export default EventSingle;
