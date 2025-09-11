'use client'

export default function Search() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl px-4 mb-10 sm:px-6 lg:px-8">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full px-6 py-3 sm:py-4 rounded-full border-2 border-transparent ring-1 ring-[#13384e] focus:border-[#13384e] focus:outline-none text-sm sm:text-base placeholder-gray-500"
        />
      </div>
    </div>
  )
}
