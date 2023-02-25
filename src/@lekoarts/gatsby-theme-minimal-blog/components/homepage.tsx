/** @jsx jsx */
import { jsx } from "theme-ui";
import { ReactNode } from "react";
import { HeadFC, Link } from "gatsby";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title";
import Listing from "@lekoarts/gatsby-theme-minimal-blog/src/components/listing";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import { visuallyHidden } from "@lekoarts/gatsby-theme-minimal-blog/src/styles/utils";
import Seo from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";
import List from "./list";
import Hero from "../texts/hero.mdx";
import Bottom from "../texts/bottom.mdx";

/**
 * Shadowed component with the following tweaks:
 *   - Remove light/dark mode toggle
 *   - Change Title text ("Latest Posts" -> "Writing")
 *   - Remove <Bottom /> component (originally for "Projects" section in theme)
 */

export type MBHomepageProps = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    tags?: {
      name: string
      slug: string
    }[]
  }[]
}

const Homepage = ({ posts }: MBHomepageProps) => {
  const { basePath, blogPath } = useMinimalBlogConfig()
  const { siteTitle } = useSiteMetadata()

  return (
    <Layout>
      <h1 sx={visuallyHidden}>{siteTitle}</h1>
      <section sx={{ mb: [3, 4, 4], p: { fontSize: [1, 2, 3], mt: 2 }, variant: `section_hero` }}>
        <Hero />
      </section>
      <Title text="Writing">
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>Read all posts</Link>
      </Title>
      <Listing posts={posts} showTags={true} />
    </Layout>
  )
}

export default Homepage

export const Head: HeadFC = () => <Seo />
