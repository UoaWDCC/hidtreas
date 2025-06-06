import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import '../global.css'

export default async function NotFound() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      {/* Entire 404 Page */}
      <div className="w-full h-full flex flex-col items-center justify-center text-center">
        {/* Centerpiece with 404 message */}
        <div className="text-3xl font-black relative flex flex-col items-center justify-center">
          <div className="text-5xl font-[900] tracking-widest absolute z-10 opacity-30">
            <h2 className="font-black text-[150px]">404</h2>
          </div>
          <h1>Oh No!</h1>
          <h1>This Treasure Does Not Exist.</h1>
        </div>

        {/* Links out of page */}
        <div className="underline font-semibold text-sm mt-5 flex flex-col gap-4 justify-center mt-20 uppercase tracking-wider">
          <a href="/">Return to Home</a>
          <a href="/events">Explore our Stories and Events</a>
        </div>
      </div>
      <Footer />
    </div>
  )
}
