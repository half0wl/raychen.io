import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="my-20">
      <h1 className="text-2xl font-bold">404 Not Found</h1>
      <p className="text-lg">
        Click <Link href="/">here</Link> to go back.
      </p>
    </div>
  )
}

export default NotFound
