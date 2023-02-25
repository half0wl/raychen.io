import { graphql, useStaticQuery } from "gatsby"

/**
 * Shadowed component with the following tweaks:
 *   - Add `version` to siteMetadata (burn in git commit hash via
 *     `CF_PAGES_COMMIT_SHA` env)
 */

type UseSiteMetadataProps = {
  site: {
    siteMetadata: {
      siteTitle: string
      siteTitleAlt: string
      siteHeadline: string
      siteUrl: string
      siteDescription: string
      siteImage: string
      author: string
      version: string
      [key: string]: unknown
    }
  }
}

const useSiteMetadata = () => {
  const data = useStaticQuery<UseSiteMetadataProps>(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteTitleAlt
          siteHeadline
          siteUrl
          siteDescription
          siteImage
          author
          version
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata
