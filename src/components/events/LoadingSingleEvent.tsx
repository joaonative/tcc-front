const LoadingSingleEvent = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl flex flex-col p-6 gap-2 bg-lightGray dark:bg-dark">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 lg:w-1/2">
            <span className="loading-title" />
            <div className="loading-image rounded-2xl w-full h-[240px]" />
            <div className="loading-description" />
          </div>
          <div className="flex flex-col gap-2 lg:w-1/2">
            <span className="loading-title" />
            <div className="loading-image rounded-2xl w-full h-[240px]" />
            <div className="loading-description" />
          </div>
        </div>
        <div className="loading-description" />
      </div>
      <div className="flex flex-col p-6 gap-2 rounded-2xl bg-lightGray dark:bg-dark">
        <div className="loading-description" />
      </div>
    </div>
  );
};

export default LoadingSingleEvent;
