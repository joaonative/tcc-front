import EventLoadingCard from "./EventLoadingCard";

const EventLoadingList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-start items-start">
      <EventLoadingCard />
      <EventLoadingCard />
      <EventLoadingCard />
      <EventLoadingCard />
      <EventLoadingCard />
      <EventLoadingCard />
    </div>
  );
};

export default EventLoadingList;
