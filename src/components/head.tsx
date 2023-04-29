import Head from 'next/head'

interface Props {
  description: string
  keywords?: string[]
  ogImageLink?: string
  ogImageHeight?: string
  ogImageWidth?: string
  slug: string
  title: string
}

const EnrichedHead: React.FC<Props> = ({
  description,
  keywords,
  ogImageLink,
  ogImageHeight,
  ogImageWidth,
  slug,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title ? `Ray Chen | ${title}` : 'Ray Chen'}</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="author" content="Ray Chen" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="keywords" content={keywords ? keywords.join(', ') : ''} />
        {process.env.NODE_ENV === 'production' && (
          <meta property="og:url" content={`https://raychen.io/${slug}`} />
        )}
        {ogImageLink && <meta property="og:image" content={ogImageLink} />}
        {ogImageHeight && (
          <meta property="og:image:height" content={ogImageHeight} />
        )}
        {ogImageWidth && (
          <meta property="og:image:width" content={ogImageWidth} />
        )}
      </Head>
    </>
  )
}

export default EnrichedHead
