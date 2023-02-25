/** @jsx jsx */
import { jsx, Text } from "theme-ui";
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
import Hero from "../texts/hero.mdx";

/**
 * Shadowed component with the following tweaks:
 *   - Remove light/dark mode toggle
 *   - Adjust hero margin (original: mb=[5, 6, 7])
 *   - Change Title text ("Latest Posts" -> "Writing")
 *   - Remove <Bottom /> component (originally for "Projects" section in theme)
 *   - Turn "Read all posts" into "View all tags"
 *   - Hardcode hero section instead of using content from hero.mdx
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

const Highlight = ({ children }: { children: ReactNode }) => {
  return <strong style={{ color: "rgb(255, 146, 112)" }}>{children}</strong>;
};

const Homepage = ({ posts }: MBHomepageProps) => {
  const { basePath, tagsPath } = useMinimalBlogConfig()
  const { siteTitle } = useSiteMetadata()

  return (
    <Layout>
      <h1 sx={visuallyHidden}>{siteTitle}</h1>
      <section sx={{ mb: [4, 5, 5], p: { fontSize: [1, 2, 3], mt: 2 }, variant: `section_hero` }}>
        <Text sx={{ fontWeight: 600, fontSize: [4, 5, 5], color: `heading` }}>
          Hi. I'm <Highlight>Ray</Highlight>.
        </Text>
        <br/>
        <br/>
        <Text sx={{ fontSize: [3, 3, 3], color: `heading` }}>
          I'm passionate about <Highlight>software and technology</Highlight>
          ; I love <Highlight>building stuff</Highlight> and <Highlight>writing</Highlight>.
          <br/>
          This is my <Highlight>personal scratchpad</Highlight> filled with
          <Highlight> ideas</Highlight>, <Highlight>notes</Highlight>,
          and <Highlight>random bits of knowledge</Highlight>.
        </Text>
      </section>
      <Title text="Writing">
        <Link to={replaceSlashes(`/${basePath}/${tagsPath}`)}>View tags &rarr;</Link>
      </Title>
      <Listing posts={posts} showTags={true} />
    </Layout>
  )
}

export default Homepage

export const Head: HeadFC = () => <Seo />
