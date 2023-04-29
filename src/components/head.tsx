import Head from 'next/head'

interface Props {
  description?: string
  keywords?: string[]
  ogImageLink?: string
  ogImageHeight?: string
  ogImageWidth?: string
  slug?: string
  title?: string
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
        <title>{title ? `${title} | Ray Chen` : 'Ray Chen'}</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={description ?? 'Random bits of knowledge.'}
        />
        <meta name="author" content="Ray Chen" />
        <meta
          property="og:title"
          content={title ? `${title} | Ray Chen` : 'Ray Chen'}
        />
        <meta
          property="og:description"
          content={description ?? 'Random bits of knowledge.'}
        />
        <meta name="keywords" content={keywords ? keywords.join(', ') : ''} />
        {process.env.NODE_ENV === 'production' && (
          <meta
            property="og:url"
            content={slug ? `https://raychen.io/${slug}` : `https://raychen.io`}
          />
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
