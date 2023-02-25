import { graphql } from "gatsby"
import HomepageComponent, { Head } from "@lekoarts/gatsby-theme-minimal-blog-core/src/components/homepage"

/**
 * Shadowed component with the following tweaks:
 *   - Remove limit on allPost
 *   - Support pinning posts
 */

export default HomepageComponent

export { Head }

export const query = graphql`
  query ($formatString: String!) {
    allPost(sort: { date: DESC }) {
      nodes {
        slug
        title
        date(formatString: $formatString)
        excerpt
        timeToRead
        description
        tags {
          name
          slug
        }
        ... on MdxPost {
          parent {
            ... on Mdx {
              frontmatter {
                featured
              }
            }
          }
        }
      }
    }
  }
`
