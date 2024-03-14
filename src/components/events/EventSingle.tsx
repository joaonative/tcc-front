"use client";

import { useState, useEffect } from "react";
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

import { getSingleEvent } from "../../api/events";
import Event from "../../interfaces/event";
import LoadingSingleEvent from "./LoadingSingleEvent";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const EventSingle = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<Event>();

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/eventos");
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getSingleEvent(id);
        setEvent(result);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSingleEvent />
      ) : (
        event && (
          <div className="flex flex-col gap-4 dark:text-white">
            <div className="bg-lightGray dark:bg-dark rounded-2xl flex flex-col p-5 lg:p-8 gap-2">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8">
                <div className="flex flex-col gap-2 w-full lg:w-1/2">
                  <span className="w-full flex items-center gap-2">
                    <Bookmark
                      size={24}
                      className="text-purple dark:text-green"
                    />
                    <h1 className="text-base font-prompt">{event.title}</h1>
                  </span>
                  <img
                    src={event.imageUrl}
                    alt={`Foto do evento: ${event.title}`}
                    width={1024}
                    height={768}
                    className="object-cover rounded-2xl w-full h-[196px] lg:h-[252px]"
                  />
                  <div className="flex items-center flex-col lg:flex-row gap-3 justify-between font-prompt lg:h-20">
                    <span className="flex items-center lg:justify-between w-full lg:w-max gap-2">
                      <Crown
                        size={24}
                        className="text-purple dark:text-green"
                      />
                      <h2>{event.owner}</h2>
                    </span>
                    <div className="flex gap-2 w-full lg:w-max items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Info
                          size={24}
                          className="text-purple dark:text-green"
                        />
                        <h2>{event.age}</h2>
                      </span>
                      <span className="flex items-center gap-2">
                        {event.category === "Artes" && (
                          <PaintBucket
                            size={24}
                            className="text-purple dark:text-green"
                          />
                        )}
                        {event.category === "Festa" && (
                          <PartyPopper
                            size={24}
                            className="text-purple dark:text-green"
                          />
                        )}
                        {event.category === "Música" && (
                          <Music2
                            size={24}
                            className="text-purple dark:text-green"
                          />
                        )}
                        {event.category === "Natureza" && (
                          <Leaf
                            size={24}
                            className="text-purple dark:text-green"
                          />
                        )}
                        <h2>{event.category}</h2>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 w-full flex flex-col gap-2 font-prompt">
                  <span className="flex items-center gap-2">
                    <MapPin className="text-purple dark:text-green" />
                    <h2 className="w-full">{event.location}</h2>
                  </span>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14679.942943620432!2d-47.2478068128418!3d-23.097617999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8b34b7fce5ac3%3A0x34bb4bcb22fc5f49!2sFIEC%20-%20Funda%C3%A7%C3%A3o%20Indaiatubana%20de%20Educa%C3%A7%C3%A3o%20e%20Cultura!5e0!3m2!1spt-BR!2sbr!4v1710267006435!5m2!1spt-BR!2sbr"
                    className="object-cover rounded-2xl w-full h-[196px] lg:h-[252px]"
                  />
                  <span className="flex items-center gap-2 justify-start lg:h-20">
                    <CalendarClock className="text-purple dark:text-green" />
                    <h2 className="w-full">{event.time}</h2>
                  </span>
                </div>
              </div>
              <blockquote className="text-base font-poppins font-medium text-black/50 dark:text-white/50">
                {event.description}
              </blockquote>
            </div>
            <div className="flex flex-col p-6 gap-2 bg-lightGray dark:bg-dark rounded-2xl">
              <span className="flex gap-2 items-center font-prompt text-base">
                <Users className="text-purple dark:text-green" />{" "}
                <h1>
                  {event.participantCount}/{event.participantLimit}
                </h1>
              </span>
              <div className="scrollbar scrollbar-thumb-purple dark:scrollbar-thumb-green scrollbar-track-white dark:scrollbar-track-gray  w-full flex gap-32 overflow-x-scroll"></div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={handleBack}>
                Voltar
              </Button>
              <Button variant="primary">Participar</Button>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default EventSingle;
