import { Bookmark, Crown, Info, Users } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ariaLabel } from "../../constants/aria-label";
import Button from "../Button";
import { useAuth } from "../../contexts/Auth.context";
import { useState } from "react";
import Loading from "../Loading";
import { deleteImage } from "../../api/deleteImage";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { categoryIconMap } from "../../utils/CategoryIconMap";
import { Community } from "../../interfaces/Community";
import { CommunityService } from "../../services/community";
import Page from "../Page";
import CommunityEvents from "./CommunityEvents";
import { EventService } from "../../services/event";
import { useTheme } from "../../contexts/Theme.context";

interface Props {
  id: string;
  community: Community;
  participants: { id: string; imageUrl: string; name: string }[];
  owner: string;
}

const CommunitySingle = ({ id, community, owner, participants }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const isOwner = community.owner === user.id;
  const isParticipating: boolean = community.participants.includes(user.id);

  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsFormModalOpen(true);
  };

  const get = async () => {
    const res = await EventService.getEventsByOwner(user.token, community._id);
    return res;
  };

  const eventsQuery = useQuery({
    queryKey: ["community events" + community._id],
    queryFn: get,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const join = async () => {
    const res = await CommunityService.joinCommunity(
      user.token,
      community._id,
      user.id
    );
    return res;
  };

  const leave = async () => {
    const res = await CommunityService.leaveCommunity(
      user.token,
      community._id,
      user.id
    );
    return res;
  };

  const deleteC = async () => {
    await deleteImage(
      `${user.id}-${community.name.replace(/\s+/g, "")}-comunidade`
    );
    const res = CommunityService.deleteCommunity(
      user.token,
      community._id,
      user.id
    );
    return res;
  };

  const queryClient = useQueryClient();

  const joinMutation = useMutation({
    mutationFn: join,
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
    mutationFn: leave,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ["community", id],
          ["communities", user.id],
        ],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteC,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      navigate("/comunidades");
    },
    retry: false,
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
              <h1 className="text-base font-prompt w-full">{community.name}</h1>
            </span>
            <img
              src={community.imageUrl}
              alt={`Foto da comunidade: ${community.name}`}
              width={1024}
              height={768}
              className="object-cover rounded-2xl h-full"
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
                    Idade Mínima: {community.age_range}
                  </h1>
                </span>
                <span className="flex items-center gap-2">
                  {categoryIconMap[community.category]}
                  <h1 className="text-base font-prompt">
                    {community.category}
                  </h1>
                </span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col justify-between p-5 lg:p-8 bg-lightGray dark:bg-dark rounded-2xl gap-5">
            {!eventsQuery.isPending &&
            eventsQuery.data.events &&
            eventsQuery.data.events.length >= 1 ? (
              <>
                <span className="flex items-center gap-2">
                  <Bookmark
                    size={24}
                    className="text-purple dark:text-green"
                    aria-label={ariaLabel.bookmark}
                  />
                  <h1 className="text-base font-prompt w-full">
                    Último Evento de {community.name}
                  </h1>
                </span>
                <img
                  src={eventsQuery.data.events[0].imageUrl}
                  alt={`Foto do evento: ${eventsQuery.data.events[0].name}`}
                  width={1024}
                  height={768}
                  className="object-cover rounded-2xl h-full"
                />

                <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between gap-4">
                  <span className="flex items-center gap-2">
                    <Crown
                      size={24}
                      className="text-purple dark:text-green"
                      aria-label={ariaLabel.bookmark}
                    />
                    <h1 className="text-base font-prompt">{community.name}</h1>
                  </span>
                  <div className="flex items-center lg:gap-5 justify-between">
                    <span className="flex items-center gap-2">
                      <Info
                        size={24}
                        className="text-purple dark:text-green"
                        aria-label={ariaLabel.bookmark}
                      />
                      <h1 className="text-base font-prompt">
                        Idade Mínima: {eventsQuery.data.events[0].age_range}
                      </h1>
                    </span>
                    <span className="flex items-center gap-2">
                      {categoryIconMap[eventsQuery.data.events[0].category]}
                      <h1 className="text-base font-prompt">
                        {eventsQuery.data.events[0].category}
                      </h1>
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={darkMode ? "/notfoundDark.svg" : "/notfound.svg"}
                    width={768}
                    height={512}
                    className="object-cover rounded-2xl h-full"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-full p-5 lg:p-8 bg-lightGray dark:bg-dark rounded-2xl gap-5">
          <blockquote className="font-poppins font-medium break-words">
            {community.description}
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
              {community.participantCount}/{community.participantLimit}
            </h1>
          </span>
          <div className="overflow-x-scroll">
            <div className="flex items-center gap-8 w-max">
              {participants.map(
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

        <CommunityEvents
          communityId={community._id}
          events={eventsQuery.isPending ? [] : eventsQuery.data.events}
        />

        <div className="w-full flex items-center gap-5 justify-end">
          <Link to={"/comunidades"}>
            <Button variant="outline">Voltar</Button>
          </Link>

          {isOwner ? (
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
      </Page>

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
