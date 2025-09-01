import Accordion from './Accordion'

export default function FAQ() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdf4ed]">
      {/* Content wrapper to control top alignment */}
      <div className="flex flex-col md:flex-row gap-12 max-w-6xl w-full">
        {/* LEFT SIDE */}
        <div className="flex flex-col text-center max-w-lg w-full pl-4 md:text-left">
          <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold mb-4 leading-tight">
            Any questions? We got you.
          </h1>
          <p>
            Can't find what you're looking for? Email us or visit our contact page to send a
            message. We'll get back to you as soon as possible.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="max-w-xl">
          <Accordion />
        </div>
      </div>
    </div>
  )
}
