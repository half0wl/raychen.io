import * as React from 'react'

/**
 * Based on https://tomekdev.com/posts/anchors-for-headings-in-mdx
 */
const getAnchor = (text: string): string => {
  // @TODO `text` can be an arbitrary react element!
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-')
}

export default (hn: string, props: any) => {
  const { children } = props
  const anchor = getAnchor(children)
  const id = `#${anchor}`
  const inner = (
    <>
      <a href={id} className="anchor-link">
        #
      </a>
      {children}
    </>
  )
  switch (hn) {
    case 'h1':
      return <h1 id={id}>{inner}</h1>
    case 'h2':
      return <h2 id={id}>{inner}</h2>
    // Disabled for anything below h2:
    case 'h3':
      return <h3>{children}</h3>
    case 'h4':
      return <h4>{children}</h4>
    case 'h5':
      return <h5>{children}</h5>
    case 'h6':
      return <h6>{children}</h6>
    default:
      throw new Error(`Unknown heading: ${hn}`)
  }
}
