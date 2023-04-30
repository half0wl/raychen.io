import Link from 'next/link'

type ExternalSite = { name: string; siteLink: string; articleLink: string }
interface Props {
  title: string
  publishedAt: string
  slug?: string
  inExternalSite?: ExternalSite
}

const ArticleLink: React.FC<Props> = ({
  title,
  slug,
  publishedAt,
  inExternalSite,
}) => {
  if (inExternalSite) {
    return (
      <span className="mb-6 flex flex-col">
        <Link className="text-xl" href={inExternalSite.articleLink}>
          ⧉{' '}{title}
        </Link>
        <span className="text-slate-500">
          on {publishedAt} in{' '}
          <Link
            className="font-normal text-pink-400"
            href={inExternalSite.siteLink}
          >
            {inExternalSite.name}
          </Link>
        </span>
      </span>
    )
  }
  if (slug === undefined) {
    throw new Error(`slug must be defined when inExternalSite=false`)
  }
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
