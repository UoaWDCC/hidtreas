const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017]

export default function YearFilter() {
  return (
    <div className="flex w-[90vw] max-w-[90vw] flex-row items-center justify-center gap-6">
      <p className="font-bold text-lg md:text-xl lg:text-2xl">YEAR</p>
      <div className="flex min-w-0 flex-row items-center gap-4 overflow-x-auto no-scrollbar">
        {YEARS.map((year) => (
          <button
            key={year}
            className="inline-flex min-w-[4.5rem] shrink-0 items-center justify-center rounded-2xl border-2 border-[#13384E] bg-[#FFF8F3] px-4 py-1.5 font-bold text-lg text-[#13384E] md:text-xl lg:text-2xl"
            type="button"
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  )
}
