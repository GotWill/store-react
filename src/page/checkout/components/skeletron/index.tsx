export function Skeletron() {
  return (
    <div className="bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="h-6 w-48 bg-gray-200 rounded mb-8 animate-pulse"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
              <div className="h-6 w-40 bg-gray-200 rounded mb-6"></div>

              <div className="flex items-center justify-between py-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="h-10 w-24 bg-gray-100 rounded-md"></div>
                  <div className="h-5 w-20 bg-gray-200 rounded"></div>
                  <div className="h-5 w-5 bg-gray-100 rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between py-6">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-64 bg-gray-200 rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="h-10 w-24 bg-gray-100 rounded-md"></div>
                  <div className="h-5 w-20 bg-gray-200 rounded"></div>
                  <div className="h-5 w-5 bg-gray-100 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4 animate-pulse">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex-shrink-0"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-48 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
              <div className="h-6 w-40 bg-gray-200 rounded mb-8"></div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-100 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-12 bg-gray-100 rounded"></div>
                  <div className="h-4 w-16 bg-green-100 rounded"></div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-gray-100 mb-8">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-8 w-32 bg-gray-300 rounded"></div>
              </div>

              <div className="h-9 px-4 py-2 w-full bg-gray-800 rounded-lg mb-4"></div>
              <div className="h-3 w-48 bg-gray-100 mx-auto rounded"></div>

              <div className="mt-8 space-y-3">
                <div className="h-3 w-32 bg-gray-100 mx-auto rounded"></div>
                <div className="flex justify-center space-x-2">
                  <div className="h-6 w-10 bg-gray-100 rounded"></div>
                  <div className="h-6 w-10 bg-gray-100 rounded"></div>
                  <div className="h-6 w-10 bg-gray-100 rounded"></div>
                  <div className="h-6 w-10 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
