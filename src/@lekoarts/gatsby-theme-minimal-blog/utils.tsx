/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ReactNode } from 'react'

const DEFAULT_VARIANT = 'highlights.orange'

export const Highlight = ({
  children,
  variant,
}: {
  children: ReactNode
  variant?: string
}) => {
  return (
    <strong sx={variant ? { variant } : { variant: DEFAULT_VARIANT }}>
      {children}
    </strong>
  )
}
