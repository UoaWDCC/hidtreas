import Accordion from './Accordion'

export default function FAQ() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdf4ed] px-6 py-12">
      {/* Content wrapper to control top alignment */}
      <div className="flex flex-col md:flex-row gap-12 max-w-6xl w-full">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-start items-start text-left max-w-lg w-full">
          <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold mb-4 leading-tight">
            Any questions?
            <br />
            We got you.
          </h1>
          <p className="text-base">
            Aut quia assumenda eum nostrum velit est quidem facere aut impedit doloribus ut rerum
            culpa est eligendi veniam. Qui blanditiis N ut sint beatae.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-start items-start max-w-xl w-full pl-4">
          <Accordion />
        </div>
      </div>
    </div>
  )
}
