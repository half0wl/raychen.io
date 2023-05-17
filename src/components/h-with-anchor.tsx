import Link from 'next/link'

export enum H {
  h2,
  h3,
}

interface Props {
  h: H
  id: string
  children: React.ReactNode
}

const HWithAnchor: React.FC<Props> = ({ h, id, children }) => {
  const anchor = (
    <Link href={`#${id}`} className="opacity-20 hover:opacity-100">
      #
    </Link>
  )
  switch (h) {
    case H.h2:
      return (
        <h2 id={id} className="mb-4 mt-8 text-2xl font-bold">
          {children} {anchor}
        </h2>
      )
    case H.h3:
      return (
        <h3 id={id} className="mb-4 mt-8 text-xl font-bold">
          {children} {anchor}
        </h3>
      )
    default:
      return <></>
  }
}

export default HWithAnchor
