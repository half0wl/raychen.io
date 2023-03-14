/** @jsx jsx */
import * as React from "react"
import { Global } from "@emotion/react"
import { Box, Container, jsx, get } from "theme-ui"
import { MDXProvider } from "@mdx-js/react"
import MdxComponents from "./mdx-components"
import Header from "./header"
import Footer from "./footer"
import CodeStyles from "@lekoarts/gatsby-theme-minimal-blog/src/styles/code"
import SkipNavLink from "@lekoarts/gatsby-theme-minimal-blog/src/components/skip-nav"

type LayoutProps = { children: React.ReactNode; className?: string }

const Layout = ({ children, className = `` }: LayoutProps) => (
  <MDXProvider components={MdxComponents}>
    <Global
      styles={(t) => ({
        "*": {
          boxSizing: `inherit`,
        },
        html: {
          WebkitTextSizeAdjust: `100%`,
        },
        img: {
          borderStyle: `none`,
        },
        pre: {
          fontFamily: `monospace`,
          fontSize: `1em`,
        },
        "[hidden]": {
          display: `none`,
        },
        "::selection": {
          backgroundColor: get(t, `colors.text`),
          color: get(t, `colors.background`),
        },
        a: {
          transition: `all 0.3s ease-in-out`,
          color: `text`,
        },
        h1: {
          fontSize: `1.85rem`,
          marginTop: `2rem`,
          marginBottom: 0,
        },
        h2: {
          fontSize: `1.55rem`,
          marginTop: `2rem`,
          marginBottom: 0,
        },
        h3: {
          fontSize: `1.35rem`,
          marginTop: `2rem`,
          marginBottom: 0,
        },
        h4: {
          fontSize: `1.15rem`,
          marginTop: `2rem`,
          marginBottom: 0,
        },
        h5: {
          fontSize: `1.rem`,
          marginTop: `2rem`,
          marginBottom: 0,
        },
        h6: {
          fontSize: `0.8rem`,
          marginTop: `2rem`,
          marginBottom: 0,
        },
      })}
    />
    <SkipNavLink>Skip to content</SkipNavLink>
    <Container>
      <Header />
      <Box id="skip-nav" as="main" variant="layout.main" sx={{ ...CodeStyles }} className={className}>
        {children}
      </Box>
      <Footer />
    </Container>
  </MDXProvider>
)

export default Layout
