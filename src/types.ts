import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import z from 'zod'

export interface Frontmatter {
  title: string
  slug: string
  pinned?: boolean
  publishedAt: string
  publication?: string
  publicationUrl?: string
  description?: string
  keywords?: string
  ogImageLink?: string
  ogImageHeight?: string
  ogImageWidth?: string
}

export const articleSchema = z.object({
  title: z.string(),
  publishedAt: z.string(),
  publication: z.string().nullable(),
  publicationUrl: z.string().nullable(),
  slug: z.string(),
  pinned: z.boolean(),
})

export type Article = z.infer<typeof articleSchema>

export type MdxArticle = MDXRemoteSerializeResult<unknown, Frontmatter>

export const projectSchema = z.object({
  name: z.string(),
  link: z.string(),
  desc: z.string(),
  emoji: z.string(),
})

export type Project = z.infer<typeof projectSchema>
