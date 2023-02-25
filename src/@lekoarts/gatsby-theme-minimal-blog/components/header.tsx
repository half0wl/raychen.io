/** @jsx jsx */
import { jsx, Flex } from "theme-ui"
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config"
import Navigation from "@lekoarts/gatsby-theme-minimal-blog/src/components/navigation"
import HeaderExternalLinks from "@lekoarts/gatsby-theme-minimal-blog/src/components/header-external-links"
import HeaderTitle from "./header-title"

/**
 * Shadowed component with the following tweaks:
 *   - Use shadowed HeaderTitle
 */

const Header = () => {
  const { navigation: nav } = useMinimalBlogConfig()

  return (
    <header sx={{ mb: [3, 4] }}>
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between` }}>
        <HeaderTitle />
      </Flex>
      <div
        sx={{
          boxSizing: `border-box`,
          display: `flex`,
          variant: `dividers.bottom`,
          alignItems: `center`,
          justifyContent: `space-between`,
          mt: 3,
          color: `secondary`,
          a: { color: `secondary`, ":hover": { color: `heading` } },
          flexFlow: `wrap`,
        }}
      >
        <Navigation nav={nav} />
        <HeaderExternalLinks />
      </div>
    </header>
  )
}

export default Header
