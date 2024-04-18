const LoadingCardSkeleton = () => {
  return (
    <div className="w-full col-span-1 flex flex-col gap-2 p-4 rounded-2xl bg-lightGray dark:bg-dark">
      <div className="object-cover rounded-2xl w-full h-60 lg:h-72 loading-image" />
      <div className="flex flex-col gap-0 loading-description rounded-2xl">
        <div className="w-full h-7" />
        <div className="w-full h-10" />
      </div>
      <div className="flex items-center justify-between"></div>
    </div>
  );
};

export default LoadingCardSkeleton;
