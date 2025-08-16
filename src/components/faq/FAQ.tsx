import Accordion from './Accordion'

export default function FAQ() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdf4ed] mb-23">
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
            Can't find what you're looking for? Email us or visit our contact page to send a
            message. We'll get back to you as soon as possible.
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
