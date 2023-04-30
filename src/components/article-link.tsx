import Link from 'next/link'

interface Props {
  title: string
  slug: string
  publishedAt: string
}

const ArticleLink: React.FC<Props> = ({ title, slug, publishedAt }) => {
  return (
    <span className="mb-6 flex flex-col">
      <Link className="text-xl" href={slug}>
        {title}
      </Link>
      <span className="text-slate-500">on {publishedAt}</span>
    </span>
  )
}

export default ArticleLink
