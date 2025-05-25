import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import { IconError404 } from '@tabler/icons-react'

export default async function Custom404Page() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center h-full text-center my-10">
        <IconError404 className="w-50 h-50" />
        <h1 className="text-5xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </a>
      </div>
      <Footer />
    </div>
  )
}
