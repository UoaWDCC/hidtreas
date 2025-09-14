export default function PastEventsFilter() {
  return (
    <div className="relative px-2 sm:px-4 md:px-6 py-2 sm:py-4 flex justify-left w-full bg-[#E6E1DE]">
      <div className="px-2 sm:px-4 py-2 bg-[#13384E] rounded-2xl w-full">
        <div className="flex flex-row gap-2 sm:gap-4 md:gap-6 items-center overflow-x-auto w-full no-scrollbar">
          <p className="font-bold text-lg sm:text-xl md:text-2xl px-1 sm:px-2 whitespace-nowrap flex-shrink-0 text-[#E6E1DE]">
            Filter Events by:{' '}
          </p>
          <button className="font-bold text-base sm:text-lg md:text-2xl text-[#13384E] border-2 rounded-xl px-2 py-1 cursor-pointer bg-[#E6E1DE] border-[#FFF8F3] whitespace-nowrap flex-shrink-0">
            Workshop
          </button>
          <button className="font-bold text-base sm:text-lg md:text-2xl text-[#13384E] border-2 rounded-xl px-2 py-1 cursor-pointer bg-[#E6E1DE] border-[#FFF8F3] whitespace-nowrap flex-shrink-0">
            Exhibition
          </button>
          <button className="font-bold text-base sm:text-lg md:text-2xl text-[#13384E] border-2 rounded-xl px-2 py-1 cursor-pointer bg-[#E6E1DE] border-[#FFF8F3] whitespace-nowrap flex-shrink-0">
            Social
          </button>
        </div>
      </div>
    </div>
  )
}
