import Link from 'next/link'
import tw from 'tailwind-styled-components'

const ExtLink = tw(Link)`text-lg`

const Nav = () => {
  return (
    <nav className="mt-8 flex flex-col justify-between border-b-2 border-slate-400 md:flex-row">
      <Link href="/" className="text-3xl font-semibold tracking-tighter">
        Ray Chen
      </Link>
      <ul className="list-none [&>li:not(:first-child)]:ml-4 [&>li]:inline">
        <li>
          <ExtLink href="/work">Work</ExtLink>
        </li>
        <li>
          <ExtLink href="https://github.com/half0wl">GitHub</ExtLink>
        </li>
        <li>
          <ExtLink href="mailto:ray@raychen.io">E-mail</ExtLink>
        </li>
        <li>
          <ExtLink href="https://twitter.com/rayofbytes">Twitter</ExtLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
