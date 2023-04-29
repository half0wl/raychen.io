interface Article {
  title: string
  slug: string
  publishedAt: Date
  description: string
  keywords?: string[]
  ogImageLink?: string
  ogImageHeight?: string
  ogImageWidth?: string
}

const articles: Record<string, Article> = {
  'debug-statsd-locally': {
    title: 'How-to: Debug StatsD locally',
    publishedAt: new Date(2023, 3, 22),
    description: `It's useful to know what StatsD metrics you're sending
locally before it hits your production metrics sink. Getting a metric name,
namespace, or data type incorrect in production is annoying ...`,
    slug: '/blog/how-to-debug-statsd-locally',
  },
  'postgres-migra': {
    title: 'Managing Postgres schema changes with Migra',
    publishedAt: new Date(2022, 11, 5),
    description: '',
    slug: '/blog/managing-postgres-schema-changes-with-migra',
  },
}

export default articles
