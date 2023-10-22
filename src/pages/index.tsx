import ArticleList from '@/components/article-list'
import Head from '@/components/head'
import { ParsedArticle, ParsedArticleSchema, compileAllMdx } from '@/lib/build'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

interface ComponentProps {
  articles: ParsedArticle[]
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
            className="rounded-full border-8 border-slate-400 shadow-md"
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
          <h2 className="mb-4 text-2xl font-semibold">Blog</h2>
          <ArticleList articles={articles} />
        </section>
        <section className="mt-4 md:mt-8">
          {/* @TODO Move to a static data file */}
          <h2 className="mb-4 text-2xl font-semibold">Projects</h2>
          <p className="mb-4">
            A list of stuff that I hack on &mdash; 🟢 = active, 🟠 =
            WIP/prototype, 🪦 dead/unmaintaned
          </p>
          <ul>
            <li className="mb-2">
              <>
                🟢&nbsp;
                <Link className="font-mono text-lg" href="/">
                  raychen.io
                </Link>
                : You're here!
              </>
            </li>
            <li className="mb-2">
              <>
                🟢&nbsp;
                <Link className="font-mono text-lg" href="/">
                  money.ts
                </Link>
                : A TypeScript library for working with monetary values.
              </>
            </li>
            <li className="mb-2">
              <>
                🟠&nbsp;
                <Link className="font-mono text-lg" href="/">
                  php-statemachine
                </Link>
                : A PHP library for working with state machines.
              </>
            </li>
            <li className="mb-2">
              <>
                🟠&nbsp;
                <Link className="font-mono text-lg" href="/">
                  railway-chord
                </Link>
                : Log egress for Railway projects.
              </>
            </li>
            <li className="mb-2">
              <>
                🟠&nbsp;
                <Link
                  className="font-mono text-lg"
                  href="https://github.com/half0wl/openai-api-playground"
                >
                  openai-api-playground
                </Link>
                : An alternative UI for playing with ChatGPT.
              </>
            </li>
            <li className="mb-2">
              <>
                🪦&nbsp;
                <Link className="font-mono text-lg" href="/">
                  simon
                </Link>
                : Minimal macOS menu bar system monitor.
              </>
            </li>
            <li className="mb-2">
              <>
                🪦&nbsp;
                <Link
                  className="font-mono text-lg"
                  href="https://github.com/half0wl/tg-mac-remote"
                >
                  tg-mac-remote
                </Link>
                : Remote-control macOS using a Telegram chatbot.
              </>
            </li>
            <li className="mb-2">
              <>
                🪦&nbsp;
                <Link className="font-mono text-lg" href="/">
                  datagovsg-api
                </Link>
                : Python API wrapper for data.gov.sg.
              </>
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
  const transformed = sortedByDescPubDate
    .map((c) => ({
      title: c.frontmatter.title,
      slug: c.frontmatter.publication
        ? c.frontmatter.slug
        : `/blog/${c.frontmatter.slug}`,
      publishedAt: dayjs(c.frontmatter.publishedAt).format('DD-MMM-YYYY'),
      publication: c.frontmatter.publication ?? null,
      publicationUrl: c.frontmatter.publicationUrl ?? null,
    }))
    .map((c) => ParsedArticleSchema.parse(c))
  return {
    props: {
      articles: transformed,
    },
  }
}

export default Home
