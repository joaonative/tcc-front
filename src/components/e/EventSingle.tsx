import {
  Bookmark,
  CalendarClock,
  Crown,
  Info,
  Leaf,
  MapPin,
  Music2,
  PaintBucket,
  PartyPopper,
  Users,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ariaLabel } from "../../constants/aria-label";
import Button from "../Button";
import { useAuth } from "../../contexts/Auth.context";
import { useState } from "react";
import { useError } from "../../contexts/Error.context";
import axios from "../../api/api";

interface Props {
  id: string;
}

const EventSingle = ({ id }: Props) => {
  const { user } = useAuth();
  const { setError } = useError();

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
  });

  if (isPending || joinMutation.isPending || leaveMutation.isPending) {
    return (
      <section className="flex flex-col gap-5">
        <h1 className="text-3xl font-prompt">Carregando ...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-start items-start"></div>
      </section>
    );
  }

  const categoryIconMap: { [key: string]: JSX.Element } = {
    Artes: <PaintBucket size={24} className="text-purple dark:text-green" />,
    Festa: <PartyPopper size={24} className="text-purple dark:text-green" />,
    Música: <Music2 size={24} className="text-purple dark:text-green" />,
    Natureza: <Leaf size={24} className="text-purple dark:text-green" />,
  };
  return (
    <>
      <section className="flex flex-col gap-8">
        <div className="flex items-center gap-5">
          <div className="w-1/2 flex flex-col justify-between p-5 lg:p-8 bg-lightGray dark:bg-dark rounded-2xl gap-5">
            <span className="flex items-center gap-2">
              <Bookmark
                size={24}
                className="text-purple dark:text-green"
                aria-label={ariaLabel.bookmark}
              />
              <h1 className="text-base font-prompt">{data.event.name}</h1>
            </span>
            <img
              src={data.event.imageUrl}
              alt={`Foto do evento: ${data.event.name}`}
              width={1024}
              height={768}
              className="object-cover rounded-2xl w-full h-[196px] lg:h-[252px]"
            />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Crown
                  size={24}
                  className="text-purple dark:text-green"
                  aria-label={ariaLabel.bookmark}
                />
                <h1 className="text-base font-prompt">{data.event.name}</h1>
              </span>
              <span className="flex items-center gap-2">
                <Info
                  size={24}
                  className="text-purple dark:text-green"
                  aria-label={ariaLabel.bookmark}
                />
                <h1 className="text-base font-prompt">
                  {data.event.age_range}
                </h1>
              </span>
              <span className="flex items-center gap-2">
                {categoryIconMap[data.event.category]}
                <h1 className="text-base font-prompt">{data.event.category}</h1>
              </span>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-between p-5 lg:p-8 bg-lightGray dark:bg-dark rounded-2xl gap-5">
            <span className="flex items-center gap-2">
              <MapPin
                size={24}
                className="text-purple dark:text-green"
                aria-label={ariaLabel.bookmark}
              />
              <h1 className="text-base font-prompt">{data.event.location}</h1>
            </span>
            <iframe
              title={`localização do evento ${data.event.name} em ${data.event.location}`}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14679.942943620432!2d-47.2478068128418!3d-23.097617999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8b34b7fce5ac3%3A0x34bb4bcb22fc5f49!2sFIEC%20-%20Funda%C3%A7%C3%A3o%20Indaiatubana%20de%20Educa%C3%A7%C3%A3o%20e%20Cultura!5e0!3m2!1spt-BR!2sbr!4v1710267006435!5m2!1spt-BR!2sbr"
              className="object-cover rounded-2xl w-full h-[196px] lg:h-[252px]"
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
          <div className="flex items-center gap-8 overflow-x-scroll">
            {data.participants.map((participant: any) => (
              <div className="flex flex-col items-center gap-2 mb-5">
                <img
                  key={participant.id}
                  src={participant.imageUrl}
                  alt={`foto do participante ${participant.name}`}
                  height={128}
                  width={128}
                  className="h-32 w-32 rounded-full object-cover border-[3px] border-green"
                />
                <h2 className="font-poppinst font-medium">
                  {participant.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex items-center gap-5 justify-end">
          <Button variant="outline">
            <a href="/eventos">Voltar</a>
          </Button>

          {isParticipating ? (
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
    </>
  );
};

export default EventSingle;
