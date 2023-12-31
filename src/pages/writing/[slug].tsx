import Head from '@/components/head'
import Link from '@/components/link'
import mdxComponents from '@/components/mdx'
import { compileAllMdx } from '@/lib/build'
import { MdxArticle } from '@/types'
import dayjs from 'dayjs'
import { MDXRemote } from 'next-mdx-remote'

interface ComponentProps {
  compiled: MdxArticle
}

interface StaticPropsIn {
  params: {
    slug: string
  }
}

interface StaticPropsOut {
  props: { [key in keyof ComponentProps]: ComponentProps[key] }
}

export const getStaticPaths = async () => ({
  paths: (await compileAllMdx()).map((c) => ({
    params: { slug: c.frontmatter.slug },
  })),
  fallback: false,
})

export const getStaticProps = async ({
  params,
}: StaticPropsIn): Promise<StaticPropsOut> => {
  const compiled = await compileAllMdx()
  const found = compiled.find((c) => c.frontmatter.slug === params.slug)
  if (!found) {
    throw new Error(`file not found for slug: ${params.slug}`)
  }
  found.frontmatter.publishedAt = dayjs(found.frontmatter.publishedAt).format(
    'MMMM DD, YYYY',
  )
  return { props: { compiled: found } }
}

const Article: React.FC<ComponentProps> = ({ compiled }) => {
  return (
    <>
      <Head {...compiled.frontmatter} />
      <article>
        <div className="mb-6">
          <h1 className="text-3xl">
            <Link className="font-bold" href={compiled.frontmatter.slug}>
              {compiled.frontmatter.title}
            </Link>
          </h1>
          <span className="text-sm text-slate-500">
            {compiled.frontmatter.publishedAt}
          </span>
        </div>
        {/* @ts-expect-error - lazy to type this properly; runtime's ok */}
        <MDXRemote {...compiled} components={mdxComponents} />
        <div className="mt-12">
          <Link className="text-slate-600" href="/">
            &larr; Back
          </Link>
        </div>
      </article>
    </>
  )
}

export default Article
