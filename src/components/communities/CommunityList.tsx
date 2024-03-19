import Community from "../../interfaces/community";
import CommunityCard from "./CommunityCard";

const CommunityList = ({ communities }: { communities: Community[] }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-start items-start">
        {communities.map((result) => (
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
    </>
  );
};

export default CommunityList;
