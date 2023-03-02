/** @jsx jsx */
import { jsx, Heading } from 'theme-ui'
import * as React from 'react'

/**
 * Inject anchor links into `h1` & `h2`s. This also creates a clickable anchor
 * link beside the headings, rendered as "Foobar #" where "#" is an
 * `<a href="$LINK" />`
 *
 * Based on https://tomekdev.com/posts/anchors-for-headings-in-mdx
 */

type HEADING = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const toAnchorText = (input: string): string =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-')

const getReactElementText = (e: React.ReactElement | string): string => {
  // Unwrap a ReactElement's text string by traversing through its children.
  if (!e) {
    return ''
  }
  if (typeof e === 'string') {
    return e
  }
  const children = e.props && e.props.children
  if (Array.isArray(children)) {
    return children.map(getReactElementText).join('')
  }
  return getReactElementText(children)
}

const getAnchorString = (
  e: string | Array<string | React.ReactElement>,
): string => {
  if (Array.isArray(e)) {
    /**
     * `e` can be an array that contains a ReactElement when the heading
     * contains some markup, such as a code block. E.g.:
     *
     *   ```markdown
     *   # Foo `bar` xyz
     *   ```
     *   Will result in:
     *   ```
     *   ["Foo", { ..., type: { displayName: MdxComponents('code') } }, "xyz"]
     *   ```
     *
     * This will unwrap the object and join the strings together, so we get
     * "foo-bar-xyz" from it.
     */
    return toAnchorText(
      e
        .map((_) => (typeof _ === 'object' ? getReactElementText(_) : _))
        .join(''),
    )
  }
  return toAnchorText(e)
}

const injectAnchorIntoHeading = (elementName: HEADING, props: any) => {
  const { children } = props
  const anchor = getAnchorString(children)
  const inner = (
    <React.Fragment>
      {children}
      &nbsp;
      <a
        href={`#${anchor}`}
        sx={{
          color: `white`,
          opacity: `0.2`,
          verticalAlign: `super`,
          fontSize: `1.2rem`,
          '&:hover': {
            opacity: `1.0`,
          },
        }}
      >
        #
      </a>
    </React.Fragment>
  )
  switch (elementName) {
    case 'h2':
      return <Heading as="h2" variant="styles.h2">{inner}</Heading>
    case 'h3':
      return <Heading as="h3" variant="styles.h3">{inner}</Heading>
    case 'h1':
    case 'h4':
    case 'h5':
    case 'h6':
      // Only support h2/h3
      return
    default:
      throw new Error(`Unknown heading: ${elementName}`)
  }
}

export default injectAnchorIntoHeading
