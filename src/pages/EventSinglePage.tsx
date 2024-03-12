import { useParams } from "react-router-dom";

import EventSingle from "../components/events/EventSingle";

export default function EventSinglePage() {
  const { id } = useParams();
  return <>{id && <EventSingle id={id} />}</>;
}
