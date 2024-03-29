import { Navigate, useParams } from "react-router-dom";

import EventSingleComponent from "../components/e/EventSingle";

const EventSingle = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to={"/eventos"} replace />;
  }

  return (
    <div>
      <EventSingleComponent id={id} />
    </div>
  );
};

export default EventSingle;
