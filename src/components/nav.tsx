import Link from 'next/link'
import tw from 'tailwind-styled-components'

const ExtLink = tw(Link)`text-lg`

const Nav = () => {
  return (
    <nav className="mt-4 flex flex-col justify-between border-b-2 border-slate-300 md:mt-8 md:flex-row">
      <Link href="/" className="mb-2 text-2xl font-bold tracking-tighter">
        Ray Chen
      </Link>
      <ul className="list-none [&>li:not(:first-child)]:ml-4 [&>li]:inline">
        <li>
          <ExtLink href="https://github.com/half0wl">github</ExtLink>
        </li>
        <li>
          <ExtLink href="https://twitter.com/rayofbytes">twitter</ExtLink>
        </li>
        <li>
          <ExtLink href="mailto:ray@raychen.io">email</ExtLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
