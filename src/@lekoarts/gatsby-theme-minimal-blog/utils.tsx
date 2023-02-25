/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ReactNode } from 'react'

export const Highlight = ({ children }: { children: ReactNode }) => {
  return <strong style={{ color: 'rgb(255, 146, 112)' }}>{children}</strong>
}
