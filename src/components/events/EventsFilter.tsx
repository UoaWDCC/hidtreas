
export default function EventsFilter() {

  return (
    <div className="relative py-3 flex justify-center bg-[#E6E1DE]">
      <div className="flex flex-row gap-10">
        <p className="font-bold text-2xl">Filter Events by: </p>
        <div className="flex flex-row overflow-x-auto w-200 no-scrollbar gap-5">
        <button className="font-bold text-2xl text-[#13384E] border-2 rounded-2xl gap px-2 cursor-pointer bg-[#FFF8F3] border-[#13384E]">
          Upcoming
        </button>
        <button className="font-bold text-2xl text-[#13384E] border-2 rounded-xl gap px-2 cursor-pointer bg-[#FFF8F3] border-[#13384E]">
          Past
        </button>
        <button className="font-bold text-2xl text-[#13384E] border-2 rounded-xl gap px-2 cursor-pointer bg-[#FFF8F3] border-[#13384E]">
          Workshop
        </button>
        <button className="font-bold text-2xl text-[#13384E] border-2 rounded-xl gap px-2 cursor-pointer bg-[#FFF8F3] border-[#13384E]">
          Exhibition
        </button>
        <button className="font-bold text-2xl text-[#13384E] border-2 rounded-xl gap px-2 cursor-pointer bg-[#FFF8F3] border-[#13384E]">
          Social
        </button>
      </div>
      </div>
    </div>
  )
}
