const SkeletronProduct = () => {
  return (
    <div className="flex flex-col w-[280px]">
      <div className="relative aspect-square overflow-hidden bg-white rounded-2xl">
        <div className="animate-pulse bg-gray-300 w-full h-full"></div>
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
        >
          <div className="w-4 h-4 bg-gray-300"></div>
        </button>
      </div>
      <div className="py-4">
        <span className="animate-pulse bg-gray-300 h-4 w-1/4 block rounded"></span>
        <div className="mt-1">
          <h3 className="animate-pulse bg-gray-300 h-6 w-3/4 block rounded"></h3>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="animate-pulse bg-gray-300 h-6 w-1/3 block rounded"></span>
        </div>
        <button
          className="w-full mt-4 bg-gray-300 h-9 px-4 py-2 has-[>svg]:px-3 rounded"
        ></button>
      </div>
    </div>
  );
};

export default SkeletronProduct;
