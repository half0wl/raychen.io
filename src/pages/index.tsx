import ArticleLink from '@/components/article-link'
import dayjs from 'dayjs'
import Head from '@/components/head'
import { compileAllMdx } from '@/lib/build'
import Image from 'next/image'
import Link from 'next/link'

interface ComponentProps {
  articles: { title: string; slug: string; publishedAt: string }[]
}

interface StaticPropsOut {
  props: { [key in keyof ComponentProps]: ComponentProps[key] }
}

const Home: React.FC<ComponentProps> = ({ articles }) => {
  return (
    <>
      <Head />
      <div className="mt-10 md:mt-20">
        <section className="flex flex-col gap-8 md:flex-row md:items-center">
          <Image
            src="/owl.png"
            className="rounded-full border-8 border-slate-400 shadow-sm"
            alt="Logo"
            width={200}
            height={200}
          />
          <article className="">
            <h1 className="mb-4 text-2xl">
              Hello! I'm <span className="font-bold">Ray</span>.
            </h1>
            <p className="mb-4 text-lg">
              I love building stuff and writing. I work on arming developers
              with infrastructure superpowers at{' '}
              <Link href="https://railway.app/?utm_source=raychen.io">
                Railway
              </Link>
              .
            </p>
            <p className="text-lg">
              This is my personal scratchpad filled with random bits of
              knowledge.
            </p>
          </article>
        </section>
        <section className="mt-10 md:mt-20">
          <h2 className="mb-4 text-2xl font-semibold">Writing</h2>
          <ul>
            {articles.map((a) => (
              <li key={a.slug}>
                <ArticleLink {...a} />
              </li>
            ))}
            <li>
              <ArticleLink
                title="Remote-controlling macOS with a Python Telegram bot"
                publishedAt="September 20, 2017"
                inExternalSite={{
                  articleLink:
                    'https://chatbotslife.com/remote-controlling-macos-with-a-python-telegram-bot-d656d2e00226?utm_source=raychen.io',
                  siteLink: 'https://chatbotslife.com/?utm_source=raychen.io',
                  name: 'Chatbots Life',
                }}
              />
            </li>

            <li>
              <ArticleLink
                title="Server-rendered charts in Django"
                publishedAt="September 04, 2017"
                inExternalSite={{
                  articleLink:
                    'https://hackernoon.com/server-rendered-charts-in-django-2604f903389d?utm_source=raychen.io',
                  siteLink: 'https://hackernoon.com/?utm_source=raychen.io',
                  name: 'Hacker Noon',
                }}
              />
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}

export const getStaticProps = async (): Promise<StaticPropsOut> => {
  const articles = await compileAllMdx()
  const sortedByDescPubDate = articles.sort((a, b) => {
    return dayjs(b.frontmatter.publishedAt).isAfter(
      dayjs(a.frontmatter.publishedAt),
    )
      ? 1
      : -1
  })
  const transformed = sortedByDescPubDate.map((c) => ({
    title: c.frontmatter.title,
    slug: `/blog/${c.frontmatter.slug}`,
    publishedAt: dayjs(c.frontmatter.publishedAt).format('DD MMMM YYYY'),
  }))
  return {
    props: {
      articles: transformed,
    },
  }
}

export default Home
