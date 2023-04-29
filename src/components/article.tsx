import articles from '@/articles'
import Head from '@/components/head'
import { formatDate } from '@/utils'
import classNames from 'classnames'
import Link from 'next/link'

interface Props {
  articleKey: string
  children: React.ReactNode
}

const Article: React.FC<Props> = ({ articleKey, children }) => {
  const {
    title,
    slug,
    publishedAt,
    description,
    keywords,
    ogImageLink,
    ogImageWidth,
    ogImageHeight,
  } = articles[articleKey]
  return (
    <>
      <Head
        title={title}
        slug={slug}
        description={description}
        keywords={keywords}
        ogImageLink={ogImageLink}
        ogImageWidth={ogImageWidth}
        ogImageHeight={ogImageHeight}
      />
      <section className="mt-12">
        <div className="mb-6">
          <h1 className="mb-4 text-4xl">
            <Link className="font-extrabold" href={slug}>
              {title}
            </Link>
          </h1>
          <span>{formatDate(publishedAt)}</span>
        </div>
        <article
          className={classNames(
            'text-lg text-slate-800',
            '[&>ul]:list-inside [&>ul]:list-disc',
            '[&>ul]:-mt-4',
            '[&>ul]:pl-8',
            '[&>ul]:mb-4',
            '[&>ul>li]:mb-2',
            '[&>p]:mb-8',
          )}
        >
          {children}
        </article>
      </section>
    </>
  )
}

export default Article
