const LoadingList = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-dark bg-opacity-75">
      <div className="inline-block w-32 h-32 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-purple dark:text-green">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingList;
