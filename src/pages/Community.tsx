import { Navigate, useParams } from "react-router-dom";
import CommunitySingle from "../components/c/CommunitySingle";
import { useAuth } from "../contexts/Auth.context";
import { CommunityService } from "../services/community";
import Page from "../components/Page";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";

const Community = () => {
  const { user } = useAuth();
  const { id } = useParams();

  if (!id) {
    return <Navigate to={"/comunidades"} replace />;
  }

  const get = () => {
    const res = CommunityService.getCommunityById(user.token, id);
    return res;
  };

  const { isPending, data } = useQuery({
    queryKey: [
      ["community", id],
      ["communities", user.id],
    ],
    queryFn: get,
    retry: false,
  });

  return (
    <Page>
      {isPending ? (
        <Loading />
      ) : (
        <CommunitySingle
          owner={data.owner}
          participants={data.participants}
          community={data.community}
          id={id}
        />
      )}
    </Page>
  );
};

export default Community;
