import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import '../global.css'

export default async function NotFound() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="w-full h-full flex flex-col items-center justify-center text-center tracking-widest">
        <div className="text-3xl font-[900]">
          <h1>Oh No!</h1>
          <h1>This Treasure Does Not Exist.</h1>
        </div>
        <div className="underline font-semibold text-sm mt-5 flex flex-col gap-4 justify-center mt-20 uppercase tracking-wider">
          <a href="/">Return to Home</a>
          <a href="/events">Explore our Stories and Events</a>
        </div>
      </div>
      <Footer />
    </div>
  )
}
