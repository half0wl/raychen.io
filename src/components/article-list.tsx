import { ParsedArticle } from '@/lib/build'
import Link from 'next/link'

const ArticleList: React.FC<{ articles: ParsedArticle[] }> = ({ articles }) => {
  return (
    <ul>
      {articles.map((a) => (
        <li className="mb-2" key={a.slug}>
          <span className="mr-2 font-mono text-slate-500">{a.publishedAt}</span>
          {a.publication && <span className="text-slate-500">🔗 </span>}
          {a.pin && <span className="text-slate-500">🌠 </span>}
          <Link className="text-lg" href={a.slug}>
            {a.title}
          </Link>
          {a.publication && (
            <span>
              {' '}
              [in{' '}
              {a.publicationUrl ? (
                <Link href={a.publicationUrl}>{a.publication}</Link>
              ) : (
                a.publication
              )}
              ]
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default ArticleList
