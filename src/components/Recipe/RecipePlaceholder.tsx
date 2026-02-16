const RecipePlaceholder = () => {
  return (
    <div className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
      <div className="group relative mt-3 overflow-hidden rounded-card border border-gray-200 bg-white shadow-card">
        <div className="relative block aspect-[37/22] w-full animate-pulse bg-gray-200"></div>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <div className="mb-3 h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>
          <div className="mb-4 h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePlaceholder;
