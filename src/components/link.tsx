import classNames from 'classnames'
import Link from 'next/link'
import { ReactNode } from 'react'
import { match } from 'ts-pattern'

const LinkComponent = ({
  children,
  href,
  className,
  variant = 'default',
}: {
  children: ReactNode
  href: string
  className?: string
  variant?: 'default' | 'underline'
}) => {
  const variantClasses = match(variant)
    .with('underline', () => 'underline decoration-dotted')
    .with('default', () => undefined)
    .exhaustive()
  return (
    <Link
      href={href}
      className={classNames(
        'hover:text-orange-300 hover:underline hover:decoration-dotted',
        variantClasses,
        className,
      )}
    >
      {children}
    </Link>
  )
}

export default LinkComponent
