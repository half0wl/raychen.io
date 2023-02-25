/** @jsx jsx */
import { Link } from "gatsby";
import { jsx } from "theme-ui";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";

/**
 * Shadowed component with the following tweaks:
 *   - Hardcode title instead of using title from config
 */

const HeaderTitle = () => {
  const { siteTitle } = useSiteMetadata();
  const { basePath } = useMinimalBlogConfig();

  return (
    <Link
      to={replaceSlashes(`/${basePath}`)}
      aria-label={`${siteTitle} - Back to home`}
      sx={{ color: `heading`, textDecoration: `none` }}
    >
      <div sx={{ my: 0, fontWeight: `semibold`, fontSize: [3, 4] }}>
        🦉 Ray Chen
      </div>
    </Link>
  );
};

export default HeaderTitle;
