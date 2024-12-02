import type { InferSelectModel } from 'drizzle-orm'
import { sysFaqCategoryTable, sysFaqTable } from '../schemas'
import { db } from '../../../areas/base/server/utils/db'

export async function seedFaqs() {
  console.log('Seeding faqs...')
  const faqsData = [
    {
      title: 'Pricing and Subscription Plans',
      icon: 'ri-bank-card-fill',
      subtitle: 'Get answers to common questions.',
      faqs: [
        {
          question: 'How do I cancel my subscription?',
          answer: 'You can cancel your subscription at any time by clicking \'Account Settings\' and then \'Manage Subscription\'. You\'ll have full access to the application through the end of the current billing period.',
        },
      ],
    },
    {
      title: 'Support and Contact',
      icon: 'ri-contacts-fill',
      subtitle: 'Get answers to common questions.',
      faqs: [
        {
          question: 'I have more questions.',
          answer: 'You can visit our Help and Support Center for answers to common questions. You can also email contact@thecodeorigin.com with any additional questions and I will get back to you ASAP.',
        },
      ],
    },
  ]
  for (const faqData of faqsData) {
    const category = await db.insert(sysFaqCategoryTable).values({
      title: faqData.title,
      icon: faqData.icon,
      subtitle: faqData.subtitle,
    }).returning()
    const faqs = faqData.faqs.map(item => ({ ...item, category_id: category[0].id }))
    await db.insert(sysFaqTable).values(faqs)
  }
}
