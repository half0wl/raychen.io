import Link from 'next/link'
import { formatDate } from '@/utils'

interface Props {
  title: string
  slug: string
  publishedAt: Date
}

const ArticleLink: React.FC<Props> = ({ title, slug, publishedAt }) => {
  return (
    <span className="mb-6 flex flex-col">
      <Link className="text-xl" href={slug}>
        {title}
      </Link>
      <span className="text-slate-500">on {formatDate(publishedAt)}</span>
    </span>
  )
}

export default ArticleLink
