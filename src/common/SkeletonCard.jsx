const SkeletonCard = () => {
  return (
    <div className="border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded bg-white animate-pulse">
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded bg-gray-200" />
      <div className="flex items-center gap-1 px-2">
        <div className="h-4 w-14 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </div>
      <div className="px-2 lg:px-0 h-4 w-3/4 bg-gray-200 rounded" />
      <div className="w-fit px-2 lg:px-0 h-4 bg-gray-200 rounded" />
      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3">
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="h-8 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default SkeletonCard;
