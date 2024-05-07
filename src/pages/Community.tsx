import { Navigate, useParams } from "react-router-dom";
import CommunitySingle from "../components/c/CommunitySingle";

const Community = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to={"/comunidades"} replace />;
  }
  return <CommunitySingle id={id} />;
};

export default Community;
