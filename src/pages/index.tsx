import articles from '@/articles'
import ArticleLink from '@/components/article-link'
import Head from '@/components/head'
import Image from 'next/image'
import Link from 'next/link'

const Home: React.FC = () => {
  const articleLinks = Object.entries(articles).map(([key, article]) => {
    return (
      <li key={key}>
        <ArticleLink
          title={article.title}
          publishedAt={article.publishedAt}
          slug={article.slug}
        />
      </li>
    )
  })

  return (
    <>
      <Head />
      <div className="mt-10 md:mt-20">
        <section className="flex flex-col items-center gap-8 md:flex-row">
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
        <section className="mt-20">
          <h2 className="mb-4 text-2xl font-bold">Writing</h2>
          <ul>{articleLinks}</ul>
        </section>
      </div>
    </>
  )
}

export default Home
