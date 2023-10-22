import fs from 'fs'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import remarkGfm from 'remark-gfm'
import z from 'zod'

export const ParsedArticleSchema = z.object({
  title: z.string(),
  publishedAt: z.string(),
  publication: z.string().nullable(),
  publicationUrl: z.string().nullable(),
  slug: z.string(),
})

export type ParsedArticle = z.infer<typeof ParsedArticleSchema>

export interface FrontmatterRaw {
  title: string
  slug: string
  publishedAt: string
  publication?: string
  publicationUrl?: string
  description?: string
  keywords?: string
  ogImageLink?: string
  ogImageHeight?: string
  ogImageWidth?: string
}

export type Mdx = MDXRemoteSerializeResult<unknown, FrontmatterRaw>

export const getMdxFiles = (dir: string): string[] =>
  fs.readdirSync(dir).map((f) => fs.readFileSync(path.join(dir, f), 'utf-8'))

export const compileMdx = async (mdx: string) =>
  await serialize<unknown, FrontmatterRaw>(mdx, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  })

export const compileAllMdx = async (): Promise<Mdx[]> => {
  const contentDir = path.join(process.cwd(), 'src/content')
  const rawMdx = getMdxFiles(contentDir)
  return await Promise.all(rawMdx.map((r) => compileMdx(r)))
}
