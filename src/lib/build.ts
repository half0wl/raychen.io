import projects from '@/projects.json'
import { Frontmatter, MdxArticle, articleSchema, projectSchema } from '@/types'
import dayjs from 'dayjs'
import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import remarkGfm from 'remark-gfm'

export const getMdxFiles = (dir: string): string[] =>
  fs.readdirSync(dir).map((f) => fs.readFileSync(path.join(dir, f), 'utf-8'))

export const compileMdx = async (mdx: string) =>
  await serialize<unknown, Frontmatter>(mdx, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  })

export const compileAllMdx = async (): Promise<MdxArticle[]> => {
  const contentDir = path.join(process.cwd(), 'src/content')
  const rawMdx = getMdxFiles(contentDir)
  return await Promise.all(rawMdx.map((r) => compileMdx(r)))
}

export const sortByLatest = (a: MdxArticle, b: MdxArticle) =>
  dayjs(b.frontmatter.publishedAt).isAfter(dayjs(a.frontmatter.publishedAt))
    ? 1
    : -1

export const sortByPinned = (a: MdxArticle, b: MdxArticle) =>
  Number(b.frontmatter.pinned ?? false) - Number(a.frontmatter.pinned ?? false)

export const transformToProps = (a: MdxArticle) => {
  return articleSchema.parse({
    title: a.frontmatter.title,
    slug: a.frontmatter.publication
      ? a.frontmatter.slug
      : `/writing/${a.frontmatter.slug}`,
    publishedAt: dayjs(a.frontmatter.publishedAt).format('DD-MMM-YYYY'),
    publication: a.frontmatter.publication ?? null,
    publicationUrl: a.frontmatter.publicationUrl ?? null,
    pinned: a.frontmatter.pinned ?? false,
  })
}

export const getProjects = () => projects.map((p) => projectSchema.parse(p))
