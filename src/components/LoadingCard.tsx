const LoadingCard = () => {
  return (
    <div className="loding-card w-full col-span-1 flex flex-col gap-2 p-4 rounded-2xl bg-lightGray dark:bg-dark">
      <div className="loading-image w-full h-[222px] rounded-2xl" />
      <h2 className="loading-title w-2/5"></h2>
      <p className="loading-description w-full"></p>
    </div>
  );
};

export default LoadingCard;
