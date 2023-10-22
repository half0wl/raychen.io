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
      <div className="mt-10 md:mt-12">
        <section className="flex flex-col gap-8 md:flex-row md:items-center">
          <Image
            src="/owl.png"
            className="rounded-full border-8 border-slate-400 shadow-md"
            alt="Logo"
            width={200}
            height={200}
          />
          <article>
            <h1 className="mb-4 text-2xl">
              Hi, I’m <span className="font-bold tracking-tighter">Ray</span>.
            </h1>
            <p className="mb-4 text-lg">
              I enjoy building stuff at the intersection of
              software«~»humans«~»infrastructure. I work on arming developers
              with superpowers at{' '}
              <Link href="https://railway.app/?utm_source=raychen.io">
                Railway
              </Link>
              .
            </p>
            <p className="mb-4 text-lg">
              You can find me on{' '}
              <Link href="https://twitter.com/rayofbytes">Twitter/X</Link>, or{' '}
              <Link href="https://github.com/half0wl">GitHub</Link>.
            </p>
          </article>
        </section>
        <section className="mt-10 md:mt-12">
          <h2 className="mb-4 text-xl font-semibold tracking-tighter">Blog</h2>
          <ArticleList articles={articles} />
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
      pin: c.frontmatter.pin ?? false,
    }))
    .map((c) => ParsedArticleSchema.parse(c))
    .sort((a, b) => Number(b.pin) - Number(a.pin)) // Pinned articles first
  return {
    props: {
      articles: transformed,
    },
  }
}

export default Home
