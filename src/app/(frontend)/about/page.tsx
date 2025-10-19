import { Suspense } from 'react'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import MeetTheTeam from '@/components/AboutUs/MeetTheTeam'
import Hero from '@/components/about/Hero'
import Descriptions from '@/components/about/Descriptions'
import MeetTheWDCCTeam from '@/components/about/MeetTheWDCCTeam'
import QuotesSection from '@/components/about/QuotesSection'
import { getAboutPageImages } from '@/lib/payload/images'

// Use dynamic rendering to avoid build-time fetch errors, but cache for 5 minutes in production
export const dynamic = 'force-dynamic'
export const revalidate = 300

// ✅ Loading fallback
function SectionSkeleton() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto h-64 bg-gray-200 rounded-lg animate-pulse" />
    </div>
  )
}

// ✅ Independent async components
async function HeroContent() {
  const heroImage = await getAboutPageImages('hero')
  return <Hero heroImage={heroImage} />
}

async function DescriptionsContent() {
  const [descriptionImage1, descriptionImage2] = await Promise.all([
    getAboutPageImages('description-1'),
    getAboutPageImages('description-2'),
  ])
  return (
    <Descriptions descriptionImage1={descriptionImage1} descriptionImage2={descriptionImage2} />
  )
}

async function QuotesContent() {
  const quoteImage = await getAboutPageImages('quote')
  return <QuotesSection quoteImage={quoteImage} />
}

export default function AboutPage() {
  return (
    <div className="home">
      <Header />

      <Suspense fallback={<SectionSkeleton />}>
        <HeroContent />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <DescriptionsContent />
      </Suspense>

      <MeetTheTeam />

      <Suspense fallback={<SectionSkeleton />}>
        <QuotesContent />
      </Suspense>

      <MeetTheWDCCTeam />
      <Footer />
    </div>
  )
}
