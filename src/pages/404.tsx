import Link from '@/components/link'

const NotFound = () => {
  return (
    <div className="mx-auto my-20">
      <h1 className="text-2xl font-bold">Oops! This page does not exist.</h1>
      <p>
        Click{' '}
        <Link variant="underline" href="/">
          here
        </Link>{' '}
        to go back.
      </p>
    </div>
  )
}

export default NotFound
