import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import SecondAccordion from '@/components/faq/SecondAccordion'

const items = [
  {
    title: 'What is Hidden Treasure?',
    content:
      'Aut quia assumenda eum nostrum velit est quidem facere aut impedit doloribus ut rerum culpa est eligendi veniam. Qui blanditiis N ut sint beatae.',
  },
  {
    title: 'A very fascinating question? ',
    content:
      'Aut quia assumenda eum nostrum velit est quidem facere aut impedit doloribus ut rerum culpa est eligendi veniam. Qui blanditiis N ut sint beatae.',
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

export default async function AboutPage() {
  return (
    <div className="home">
      <Header />
      <SecondAccordion items={items} />
      <Footer />
    </div>
  )
}
