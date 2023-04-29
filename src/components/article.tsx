import Link from 'next/link'
import Head from '@/components/head'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  keywords?: string[]
  description: string
  ogImageLink?: string
  ogImageHeight?: string
  ogImageWidth?: string
  publishedAt: Date
  slug: string
  title: string
}

const Article: React.FC<Props> = ({
  children,
  keywords,
  description,
  ogImageLink,
  ogImageHeight,
  ogImageWidth,
  publishedAt,
  slug,
  title,
}) => {
  const [fmtDay, fmtMonth, fmtYear] = [
    publishedAt.getDay().toString().padStart(2, '0'),
    new Intl.DateTimeFormat('us', { month: 'short' }).format(publishedAt),
    publishedAt.getFullYear(),
  ]
  const fmtDate = `${fmtMonth} ${fmtDay}, ${fmtYear}`

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
          <h1 className="mb-4 text-4xl font-extrabold">
            <Link href={slug}>{title}</Link>
          </h1>
          <span>{fmtDate}</span>
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
