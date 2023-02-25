/** @jsx jsx */
import { jsx, Link } from "theme-ui"
import useSiteMetadata from "../hooks/use-site-metadata"

/**
 * Shadowed component with the following tweaks:
 *   - Change content and style
 *   - Include commit hash (CF_PAGES_COMMIT_SHA)
 */

const Footer = () => {
  const { siteTitle, version } = useSiteMetadata()

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `space-between`,
        mt: [6],
        fontSize: `0.8em`,
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: [`column`, `column`, `row`],
        variant: `dividers.top`,
      }}
    >
      <div>
        &copy; {new Date().getFullYear()} by {siteTitle}. All rights reserved. Version <Link aria-label="Link to source code of the current version on GitHub" href={`https://github.com/half0wl/raychen.io/commit/${version}`}>{ version }</Link>.
      </div>
      <div>
        Built with{' '}
        <Link aria-label="Link to Gatsby JS" href="https://www.gatsbyjs.com/">GatsbyJS</Link>.{' '}
        <Link
          aria-label="Link to the theme's GitHub repository"
          href="https://github.com/LekoArts/gatsby-themes/tree/main/themes/gatsby-theme-minimal-blog"
        >
          Original theme
        </Link>
        {` `}
        by
        {` `}
        <Link
          aria-label="Link to the theme author's website"
          href="https://www.lekoarts.de?utm_source=raychen.io&utm_medium=Theme"
        >
          LekoArts
        </Link>
        , <Link aria-label="Link to the GitHub repository with modified theme" href="https://github.com/half0wl/raychen.io">modified by me</Link>.
      </div>
    </footer>
  )
}

export default Footer
