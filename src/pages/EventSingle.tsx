import { Navigate, useParams } from "react-router-dom";

import EventSingleComponent from "../components/e/EventSingle";
import { EventService } from "../services/event";
import { useAuth } from "../contexts/Auth.context";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import Page from "../components/Page";

const EventSingle = () => {
  const { user } = useAuth();
  const { id } = useParams();

  if (!id) {
    return <Navigate to={"/eventos"} replace />;
  }

  const get = () => {
    const res = EventService.getEventById(user.token, id);
    return res;
  };

  const { isPending, data } = useQuery({
    queryKey: ["event", id],
    queryFn: get,
    retry: false,
  });

  return (
    <Page>
      {isPending ? (
        <Loading />
      ) : (
        <EventSingleComponent
          owner={data.owner}
          participants={data.participants}
          event={data.event}
          id={id}
        />
      )}
    </Page>
  );
};

export default EventSingle;
