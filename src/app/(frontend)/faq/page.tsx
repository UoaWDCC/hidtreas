import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import HeroSection from '@/components/faq/HeroSection'
import SecondAccordion from '@/components/faq/SecondAccordion'
import FAQComponent from '@/components/faq/FAQ'

const items = [
  {
    title: 'What is Hidden Treasure?',
    content:
      'Aut quia assumenda eum nostrum velit est quidem facere aut impedit doloribus ut rerum culpa est eligendi veniam. Qui blanditiis N ut sint beatae.',
  },
  {
    title: 'A very fascinating question? ',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Another very fascinating question? ',
    content:
      'Aut quia assumenda eum nostrum velit est quidem facere aut impedit doloribus ut rerum culpa est eligendi veniam. Qui blanditiis N ut sint beatae.',
  },
  {
    title: 'An extremely shocking question?',
    content:
      'Aut quia assumenda eum nostrum velit est quidem facere aut impedit doloribus ut rerum culpa est eligendi veniam. Qui blanditiis N ut sint beatae.',
  },
]

export default function FAQ() {
  return (
    <div className="faq">
      <Header />
      <HeroSection />
      <FAQComponent />
      <SecondAccordion items={items} />
      <Footer />
    </div>
  )
}
