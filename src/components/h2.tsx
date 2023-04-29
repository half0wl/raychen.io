import Link from 'next/link'

interface Props {
  id?: string
  children: React.ReactNode
}

const H2: React.FC<Props> = ({ id, children }) => {
  return (
    <h2 id={id ?? ''} className="mb-4 text-2xl font-bold">
      {children}
      {id && (
        <>
          {'  '}
          <Link href={`#${id}`} className="opacity-20 hover:opacity-100">
            #
          </Link>
        </>
      )}
    </h2>
  )
}

export default H2
