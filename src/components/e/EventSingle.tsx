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

import Event from "../../interfaces/Event";
import { ariaLabel } from "../../constants/aria-label";
import Button from "../Button";
import { useAuth } from "../../contexts/Auth.context";
import { useEffect, useState } from "react";
import { getEventById, joinEvent, leaveEvent } from "../../api/Events";
import { useError } from "../../contexts/Error.context";
import { getUserImageUrl } from "../../api/User";

interface Props {
  id: string;
}

const EventSingle = ({ id }: Props) => {
  const { user } = useAuth();
  const { setError } = useError();

  const [event, setEvent] = useState<Event>();

  const [isParticipating, setisParticipating] = useState<boolean>();

  const [imagesUrls, setImagesUrls] = useState<string[]>([]);

  const fetchEvent = async () => {
    const res = await getEventById(user.token, id, { setError });
    setEvent(res);
    console.log(res.participants);

    const urlsPromises = res.participants.map((participant: string) => {
      return getUserImageUrl(user.token, participant);
    });

    const urls = await Promise.all(urlsPromises);
    setImagesUrls(urls);

    setisParticipating(res.participants.includes(user.id));
  };

  const join = async () => {
    if (!event) {
      return;
    }
    await joinEvent(user.token, id, user.id, { setError });
    fetchEvent();
  };

  const leave = async () => {
    if (!event) {
      return;
    }
    await leaveEvent(user.token, id, user.id, { setError });
    fetchEvent();
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const categoryIconMap: { [key: string]: JSX.Element } = {
    Artes: <PaintBucket size={24} className="text-purple dark:text-green" />,
    Festa: <PartyPopper size={24} className="text-purple dark:text-green" />,
    Música: <Music2 size={24} className="text-purple dark:text-green" />,
    Natureza: <Leaf size={24} className="text-purple dark:text-green" />,
  };
  return (
    <>
      {event ? (
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-5">
            <div className="w-1/2 flex flex-col justify-between p-5 lg:p-8 bg-lightGray dark:bg-dark rounded-2xl gap-5">
              <span className="flex items-center gap-2">
                <Bookmark
                  size={24}
                  className="text-purple dark:text-green"
                  aria-label={ariaLabel.bookmark}
                />
                <h1 className="text-base font-prompt">{event.name}</h1>
              </span>
              <img
                src={event.imageUrl}
                alt={`Foto do evento: ${event.name}`}
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
                  <h1 className="text-base font-prompt">{event.name}</h1>
                </span>
                <span className="flex items-center gap-2">
                  <Info
                    size={24}
                    className="text-purple dark:text-green"
                    aria-label={ariaLabel.bookmark}
                  />
                  <h1 className="text-base font-prompt">{event.age_range}</h1>
                </span>
                <span className="flex items-center gap-2">
                  {categoryIconMap[event.category]}
                  <h1 className="text-base font-prompt">{event.category}</h1>
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
                <h1 className="text-base font-prompt">{event.location}</h1>
              </span>
              <iframe
                title={`localização do evento ${event.name} em ${event.location}`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14679.942943620432!2d-47.2478068128418!3d-23.097617999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8b34b7fce5ac3%3A0x34bb4bcb22fc5f49!2sFIEC%20-%20Funda%C3%A7%C3%A3o%20Indaiatubana%20de%20Educa%C3%A7%C3%A3o%20e%20Cultura!5e0!3m2!1spt-BR!2sbr!4v1710267006435!5m2!1spt-BR!2sbr"
                className="object-cover rounded-2xl w-full h-[196px] lg:h-[252px]"
              />
              <span className="flex items-center gap-2">
                <CalendarClock
                  size={24}
                  className="text-purple dark:text-green"
                  aria-label={ariaLabel.bookmark}
                />
                <h1 className="text-base font-prompt">{event.date}</h1>
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
            <div className="flex items-center gap-8 overflow-x-scroll">
              {imagesUrls.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt="foto do participante"
                  height={128}
                  width={128}
                  className="h-32 w-32 rounded-full object-cover border-[3px] border-green"
                />
              ))}
            </div>
          </div>
          <div className="w-full flex items-center gap-5 justify-end">
            <Button variant="outline">
              <a href="/eventos">Voltar</a>
            </Button>
            {isParticipating ? (
              <Button variant="danger" onClick={leave}>
                Sair do evento
              </Button>
            ) : (
              <Button variant="primary" onClick={join}>
                Participar
              </Button>
            )}
          </div>
        </section>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default EventSingle;
