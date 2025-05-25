import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Image from 'next/image'
import placeholderImage from '@/assets/rockCarving.png'
import kiwiBird from '@/assets/kiwiBirdContactUs.svg'
import fern from '@/assets/fern.svg'

export default async function ContactPage() {
    return (
        <div className="home">
            <Header/>

            <section className="px-10 md:px-40 py-12 mb-6">
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className="pr-5 w-full md:w-1/2 flex flex-col items-center justify-center relative">
                        <h1 className="text-5xl font-extrabold mb-6">CONTACT US</h1>
                        <div className="relative w-full max-w-sm">
                            <Image src={placeholderImage} alt="Placeholder Image" className="w-full h-auto"/>
                            <Image
                                src={fern}
                                alt="Fern Leaf"
                                className="absolute bottom-0 right-0 w-40 h-auto translate-x-[4.5rem] translate-y-[1.75rem]"
                            />
                        </div>
                    </div>

                    <p className="pl-5 w-full md:w-1/2 text-center px-4 text-2xl">
                        Aut quia assumenda eum nostrum velit est quidem facere aut impedit
                        doloribus ut rerum culpa est eligendi veniam. Qui blanditiis N ut sint beatae.
                    </p>
                </div>
            </section>

            <section className="px-6 md:px-10 py-10 mb-16">
                <div className="w-full max-w-screen-md mx-auto">
                    <h2 className="text-2xl font-semibold mb-2">Get in touch.</h2>
                    <p className="text-sm mb-6">Send a message here!</p>

                    <div className={"pl-5"}>
                        <div className="shadow-md p-6 bg-white flex flex-col md:flex-row gap-6 min-h-[400px] w-full">
                            <div className="md:w-1/3 border-r border-black pr-6 flex flex-col justify-between">
                                <Image src={kiwiBird} alt="Bird"
                                       className="w-16 h-auto border border-dashed border-black mb-6"/>
                                <div className="flex flex-col justify-end">
                                    <input className="border-b border-black rounded-none mb-6"
                                           placeholder="FIRST NAME"/>
                                    <input className="border-b border-black rounded-none mb-6" placeholder="LAST NAME"/>
                                    <input className="border-b border-black rounded-none mb-6"
                                           placeholder="EMAIL ADDRESS"/>
                                </div>
                            </div>

                            <div className="md:w-2/3 pl-6 flex flex-col justify-between">
                                <input className="bg-gray-100 text-base rounded-none mb-4 h-10" placeholder="SUBJECT"/>
                                <textarea className="flex-grow bg-gray-100 text-base h-32 rounded-none mb-4"
                                          placeholder="MESSAGE"/>
                                <button
                                    className="bg-[#13384E] text-white px-6 py-3 font-semibold rounded-md hover:bg-slate-700 transition">
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs mt-4">Have more questions? Visit our FAQ page.</p>
                </div>
            </section>

            <section className="px-10 md:px-40 py-16">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="w-full md:w-1/2 text-center">
                        <h2 className="text-2xl font-semibold mb-4">Where You’ll Find Us</h2>
                        <p className="mb-6 max-w-sm mx-auto">
                            ADDRESS HERE: Aut quia assumenda eum nostrum velit est quidem facere aut impedit doloribus
                            ut rerum culpa est eligendi veniam. Qui blanditiis N ut sint beatae.
                        </p>

                        <h3 className="text-xl font-medium mb-1">Office Hours</h3>
                        <p className="italic text-sm mb-2">"We're here when you need us."</p>
                        <p className="text-sm">
                            🕓 Monday – Friday: 9:00 AM – 5:00 PM<br/>
                            <span className="text-xs text-gray-500">
                                (Closed weekends and public holidays — but we’ll get back to you as soon as we can!)
                            </span>
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 flex items-center justify-center">
                        <Image src={placeholderImage} alt="placeholderImage"
                               className="h-auto w-[75%] border mb-6"/>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
}
