import Link from '@/components/link'
import { Article } from '@/types'
import classNames from 'classnames'

const ArticleItem = ({ article }: { article: Article }) => (
  <li className="list-inside list-disc" key={article.slug}>
    <Link
      className={classNames(article.pinned && 'font-bold')}
      href={article.slug}
    >
      {article.title}
    </Link>
    {article.publication && (
      <span>
        {' '}
        [🔗{' '}
        {article.publicationUrl ? (
          <Link href={article.publicationUrl}>{article.publication}</Link>
        ) : (
          article.publication
        )}
        ]
      </span>
    )}
    <span className="ml-2 font-mono text-sm text-slate-500">
      {article.publishedAt}
    </span>
  </li>
)

export default ArticleItem
