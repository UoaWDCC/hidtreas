import Image from "next/image"
import rockCarving from '@/assets/rockCarving.png'

export default function WhatWeDo() {
    return (
        <div>
            <div className=" p-16 flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto gap-x-12">
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-5xl font-bold mb-4">WHAT WE DO</h2>
                    <p className="mb-4">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur
                        adipiscing elit quisque faucibLorem ipsum dolor sit amet consectetur
                        adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sem.
                    </p>
                    <p className="mb-4">
                        Ex sapien vitae pellentesque seLorem ipsum dolor sit amet consectetur
                        adipiscing elit. Consectetur adipiscing elit quisque faucibus ex
                        sapien vitae. us ex sem.
                    </p>

                    <button
                        className="border-2 border-[#13384E] text-[#13384E] font-semibold px-6 py-2 rounded-md hover:bg-[#13384E] hover:text-white transition">
                        SIGN UP
                    </button>
                </div>

                <div className="md:w-1/2 mt-8 md:mt-0">
                    <Image
                        src={rockCarving} // Replace with actual image path
                        alt="Rock Carving"
                        className="w-full rounded-md shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}
