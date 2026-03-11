export default function Loading() {
  return (
    <div className="animate-pulse min-h-screen">
      {/* Header skeleton */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-16 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="h-5 w-36 bg-gray-200 rounded" />
        </div>
        <div className="hidden lg:flex items-center space-x-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-16 bg-gray-200 rounded" />
          ))}
          <div className="h-10 w-24 bg-gray-200 rounded-md" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="px-4 sm:px-[3vw] py-4 sm:py-[1vw]">
        <div className="relative rounded-b-[4vw] overflow-hidden w-full sm:w-[95%] mx-auto h-[60vh] sm:h-[80vh] md:h-[40vw] bg-gray-200" />
      </div>

      {/* Content sections skeleton */}
      <div className="max-w-6xl mx-auto px-6 mt-12 space-y-16">
        <div className="space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto" />
          <div className="h-4 w-full max-w-2xl bg-gray-200 rounded mx-auto" />
          <div className="h-4 w-full max-w-xl bg-gray-200 rounded mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="space-y-4 py-8">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-4/6 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="mt-24 bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-3">
            <div className="h-6 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-56 bg-gray-200 rounded" />
          </div>
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
