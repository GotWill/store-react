const Skeletron = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="animate-pulse bg-gray-300 w-[300px] h-6"></div>
          <div className="animate-pulse bg-gray-300 w-[300px] h-6"></div>
        </div>
        <div className="animate-pulse bg-gray-300 w-[150px] h-9 rounded-md"></div>
      </div>

      <div className="bg-card border rounded-xl p-6 relative">
        <div className="animate-pulse bg-gray-300 w-[90px] h-7 absolute top-4 right-4 flex items-center rounded-full"></div>
        <div className="flex items-start gap-4">
          <div className="animate-pulse bg-gray-300 w-12 h-12 mb-2 rounded-xl"></div>
          <div className="flex flex-col gap-2">
            <div className="animate-pulse bg-gray-300 w-[200px] h-4"></div>
            <div className="animate-pulse bg-gray-300 w-[200px] h-4"></div>
            <div className="animate-pulse bg-gray-300 w-[200px] h-4"></div>
            <div className="animate-pulse bg-gray-300 w-[200px] h-4"></div>
          </div>
        </div>

        <div className="animate-pulse bg-gray-300 w-full h-1 mt-6"></div>

        <div className="flex gap-3 pt-6">
          <div className="animate-pulse bg-gray-300 w-[80px] h-8 rounded-md"></div>
          <div className="animate-pulse bg-gray-300 w-[80px] h-8 rounded-md"></div>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6 relative">
        <div className="animate-pulse bg-gray-300 w-[90px] h-7 absolute top-4 right-4 flex items-center rounded-full"></div>
        <div className="flex items-start gap-4">
          <div className="animate-pulse bg-gray-300 w-12 h-12 mb-2 rounded-xl"></div>
          <div className="flex flex-col gap-2">
            <div className="animate-pulse bg-gray-300 w-[200px] h-4"></div>
            <div className="animate-pulse bg-gray-300 w-[200px] h-4"></div>
            <div className="animate-pulse bg-gray-300 w-[200px] h-4"></div>
            <div className="animate-pulse bg-gray-300 w-[200px] h-4"></div>
          </div>
        </div>

        <div className="animate-pulse bg-gray-300 w-full h-1 mt-6"></div>

        <div className="flex gap-3 pt-6">
          <div className="animate-pulse bg-gray-300 w-[80px] h-8 rounded-md"></div>
          <div className="animate-pulse bg-gray-300 w-[80px] h-8 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeletron;
