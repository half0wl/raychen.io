import ArticleItem from '@/components/article-item'
import Head from '@/components/head'
import ProjectItem from '@/components/project-item'
import {
  compileAllMdx,
  getProjects,
  sortByLatest,
  sortByPinned,
  transformToProps,
} from '@/lib/build'
import { Article, Project } from '@/types'
import Image from 'next/image'

interface ComponentProps {
  articles: Article[]
  projects: Project[]
}

interface StaticPropsOut {
  props: { [key in keyof ComponentProps]: ComponentProps[key] }
}

const Home: React.FC<ComponentProps> = ({ articles, projects }) => {
  return (
    <>
      <Head />
      <section className="flex flex-col gap-6">
        <article className="space-y-4">
          <div className="flex items-center space-x-4 md:space-x-8 md:space-y-2">
            <figure className="w-[400px] sm:w-[120px]">
              <Image
                src="/profile.png"
                alt="Profile Image"
                width="0"
                height="0"
                sizes="100vw"
                className="h-auto w-full rounded-full border-4 border-slate-800 shadow-md"
              />
            </figure>
            <p className="text-lg">
              Hi, I’m{' '}
              <span className="text-2xl font-bold tracking-tighter">Ray</span>.
              I enjoy building stuff at the intersection of software, humans,
              and infrastructure.
            </p>
          </div>
        </article>
        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <p className="text-lg font-bold underline">🖊️ Writing</p>
            <ul className="space-y-2">
              {articles.map((a) => (
                <ArticleItem key={a.slug} article={a} />
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-bold underline">🛠️ Projects</p>
            <ul className="space-y-2">
              {projects.map((p) => (
                <ProjectItem key={p.link} project={p} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps = async (): Promise<StaticPropsOut> => {
  return {
    props: {
      articles: (await compileAllMdx())
        .sort(sortByLatest)
        .sort(sortByPinned)
        .map(transformToProps),
      projects: getProjects(),
    },
  }
}

export default Home
