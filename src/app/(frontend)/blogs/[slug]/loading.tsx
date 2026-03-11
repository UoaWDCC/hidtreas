export default function BlogLoading() {
  return (
    <div className="animate-pulse">
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

      {/* Breadcrumb skeleton */}
      <div className="mt-4 mb-2 pl-8">
        <div className="h-3 w-64 bg-gray-200 rounded" />
      </div>

      {/* Title skeleton */}
      <div className="max-w-6xl mx-auto pt-6 px-8">
        <div className="flex flex-col items-center gap-3">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-10 w-full max-w-xl bg-gray-200 rounded" />
          <div className="h-10 w-full max-w-md bg-gray-200 rounded" />
        </div>
      </div>

      {/* Hero image skeleton */}
      <div className="mt-8 flex justify-center px-8">
        <div className="w-full max-w-2xl aspect-[16/9] bg-gray-200 rounded-xl" />
      </div>

      {/* Content skeleton */}
      <div className="mt-12 max-w-3xl mx-auto px-8 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  )
}
