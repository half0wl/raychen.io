/** @jsx jsx */
import { jsx } from "theme-ui"
import BlogListItem from "./blog-list-item";

/**
 * Shadowed component with the following tweaks:
 *   - Lower margin-bottom
 *   - Support pinning posts
 */

type ListingProps = {
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
    parent: {
      frontmatter: {
        [key: string]: any
      }
    }
  }[]
  className?: string
  showTags?: boolean
}

const Listing = ({ posts, className = ``, showTags = true }: ListingProps) => (
  <section sx={{ mb: [3, 3, 3] }} className={className}>
    {posts.map((post) => (
      <BlogListItem
        key={post.slug}
        featured={post.parent.frontmatter.featured}
        post={post}
        showTags={showTags}
      />
    ))}
  </section>
)

export default Listing
