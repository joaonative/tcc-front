import { useParams } from "react-router-dom";

export default function CommunitySinglePage() {
  const { id } = useParams();
  return <>{id && <p>{id}</p>}</>;
}
