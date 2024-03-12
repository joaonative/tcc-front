import { useState, useEffect } from "react";

import { getCommunities } from "../../api/communities";
import Community from "../../interfaces/community";
import EventLoadingList from "../events/EventLoadingList";
import CommunityCard from "./CommunityCard";

const CommunityList = () => {
  const [communities, setCommunities] = useState<Community[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getCommunities();
        setCommunities(response);
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
        <EventLoadingList />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-start items-start">
          {communities &&
            communities.map((result) => (
              <CommunityCard
                key={result.id}
                id={result.id}
                title={result.title}
                description={result.description}
                participantCount={result.participantCount}
                participantLimit={result.participantLimit}
                imageUrl={result.imageUrl}
                owner={result.owner}
                category={result.category}
                age={result.age}
                location={result.location}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default CommunityList;
