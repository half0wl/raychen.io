import ArticleLink from '@/components/article-link'
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
                title="Blah"
                publishedAt='01 January, 2023'
                inExternalSite={{ articleLink: '', siteLink: '', name: 'blah' }}
              />
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}

export const getStaticProps = async (): Promise<StaticPropsOut> => ({
  props: {
    articles: (await compileAllMdx()).map((c) => ({
      title: c.frontmatter.title,
      slug: `/blog/${c.frontmatter.slug}`,
      publishedAt: c.frontmatter.publishedAt,
    })),
  },
})

export default Home
