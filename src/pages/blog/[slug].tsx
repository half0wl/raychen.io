import Head from '@/components/head'
import mdxComponents from '@/components/mdx'
import { compileAllMdx, Mdx } from '@/lib/build'
import { MDXRemote } from 'next-mdx-remote'
import Link from 'next/link'

interface ComponentProps {
  compiled: Mdx
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
  const ours = compiled.find((c) => c.frontmatter.slug === params.slug)
  if (!ours) {
    throw new Error(`file not found for slug: ${params.slug}`)
  }
  return { props: { compiled: ours } }
}

const Article: React.FC<ComponentProps> = ({ compiled }) => {
  return (
    <>
      <Head {...compiled.frontmatter} />
      <article className="my-10">
        <div className="mb-6">
          <h1 className="text-4xl">
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
      </article>
    </>
  )
}

export default Article
