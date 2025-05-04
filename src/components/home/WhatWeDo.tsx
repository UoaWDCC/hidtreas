export default function WhatWeDo() {
    return (
        <div className="bg-[#D9D9D9] p-15 flex flex-col md:flex-row items-center justify-between md:gap-x-12">
            <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-5xl font-bold text-slate-800 mb-4">WHAT WE DO</h2>
                <p className="text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur
                    adipiscing elit quisque faucibLorem ipsum dolor sit amet consectetur
                    adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sem.
                </p>
                <p className="text-gray-700 mb-4">
                    Ex sapien vitae pellentesque seLorem ipsum dolor sit amet consectetur
                    adipiscing elit. Consectetur adipiscing elit quisque faucibus ex
                    sapien vitae. us ex sem.
                </p>

                <button className="border-2 border-slate-800 px-6 py-2 rounded-md hover:bg-slate-800 hover:text-white transition">
                    SIGN UP
                </button>
            </div>

            <div className="md:w-1/2 mt-8 md:mt-0">
                <img
                    src="https://www.lovetaupo.com/media/2962417/jpeg_jm_chris_jolly_0014-large.jpg?anchor=center&mode=crop&width=900&height=1013&rnd=132551807629800000" // Replace with actual image path
                    alt="Rock Carving"
                    className="w-full rounded-md shadow-lg"
                />
            </div>
        </div>
    );
}
