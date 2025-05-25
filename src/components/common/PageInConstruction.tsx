import { IconBuildingCog } from '@tabler/icons-react'
import Footer from './Footer'
import Header from './Header'

export default function PageInConstruction() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center h-full text-center my-10">
        <IconBuildingCog className="w-50 h-50" />
        <h1 className="text-5xl font-bold mb-4">Page In Construction</h1>
        <p className="text-lg mb-8">
          Sorry, the page you are looking is not yet complete. Please try again later.
        </p>
        <a href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </a>
      </div>
      <Footer />
    </div>
  )
}
