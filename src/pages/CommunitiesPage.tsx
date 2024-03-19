import { useState, useEffect } from "react";

import Section from "../components/Section";
import CommunityList from "../components/communities/CommunityList";
import Community from "../interfaces/community";
import { getCommunities } from "../api/communities";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getCommunities();
        setCommunities(response);
        setIsLoading(false);
      } catch (err) {}
    };

    fetch();
  }, []);
  return (
    <Section title="Comunidades">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <CommunityList communities={communities} />
      )}
    </Section>
  );
}
