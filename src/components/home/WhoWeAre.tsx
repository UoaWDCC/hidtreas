import Image from "next/image"
import groupPic from '@/assets/groupPic.png'

export default function WhoWeAre() {
    return (
        <div className="py-16 px-6 flex justify-center">
            <div className="w-full max-w-4xl">
                <h2 className="text-5xl font-bold text-center mb-8">
                    WHO WE ARE
                </h2>

                <div className="flex justify-center mb-8">
                    <Image
                        src={groupPic} // Replace with actual path
                        alt="Group of people smiling"
                        className="rounded-md shadow-lg"
                    />
                </div>

                <div className="flex flex-col items-end text-right max-w-2xl ml-auto">
                    <p className="mb-6">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit
                        quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id.
                        Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu
                        aenean.
                    </p>

                    <button
                        className="bg-[#13384E] text-white px-6 py-3 font-semibold rounded-md hover:bg-slate-700 transition">
                        FIND OUT MORE
                    </button>
                </div>
            </div>
        </div>
    );
}
