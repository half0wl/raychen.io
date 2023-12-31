import Link from '@/components/link'
import { Project } from '@/types'

const ProjectItem = ({ project }: { project: Project }) => (
  <li className="list-inside list-disc" key={project.link}>
    {project.emoji} <Link href={project.link}>{project.name}</Link>
    {':'} {project.desc}
  </li>
)

export default ProjectItem
