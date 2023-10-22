import Link from 'next/link'
import { ParsedArticle } from '@/lib/build'
import classNames from 'classnames'

const ArticleList: React.FC<{ articles: ParsedArticle[] }> = ({ articles }) => {
  return (
    <ul>
      {articles.map((a) => (
        <li
          className={classNames('mb-2', a.publication && 'relative')}
          key={a.slug}
        >
          {a.publication && (
            <span className="absolute left-[-2%] opacity-50"></span>
          )}
          <>
            <span className="mr-2 font-mono text-slate-500">
              {a.publishedAt}
            </span>
            <Link className="text-lg" href={a.slug}>
              {a.title}
            </Link>
            {a.publication && (
              <span>
                {' '}
                &mdash;{' '}
                {a.publicationUrl ? (
                  <Link href={a.publicationUrl}>⧉ {a.publication}</Link>
                ) : (
                  a.publication
                )}
              </span>
            )}
          </>
        </li>
      ))}
    </ul>
  )
}

export default ArticleList
