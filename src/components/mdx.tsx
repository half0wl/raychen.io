/* eslint @typescript-eslint/no-explicit-any: 0 */
import HWithAnchor, { H } from '@/components/h-with-anchor'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import styled from 'styled-components'

const UL = styled.ul`
  font-size: 16px;
  list-style-position: inside;
  list-style-type: square;
  li {
    padding-left: 24px;
    margin-top: 10px;
  }
  ul {
    margin-top: 1px;
    margin-bottom: 1px;
    list-style-type: circle;
    li {
      padding-left: 2px;
      margin-left: 16px;
    }
  }
`

const P = styled.p`
  letter-spacing: 0.15px;
  font-size: 16px;
  line-height: 26px;
`

const components = {
  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="border-l-4 py-0.5 pl-4 text-slate-500"
      style={{ borderColor: '#bc6800' }}
    >
      {props.children}
    </blockquote>
  ),
  H2: (props: any) => <HWithAnchor h={H.h2} {...props} />,
  H3: (props: any) => <HWithAnchor h={H.h3} {...props} />,
  p: (props: any) => (
    <P {...props} className="my-4">
      {props.children}
    </P>
  ),
  ul: (props: any) => (
    <UL {...props} className="my-6">
      {props.children}
    </UL>
  ),
  h2: (props: any) => (
    <h2 {...props} className="mb-4 mt-8 text-2xl font-bold">
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 {...props} className="mb-4 mt-8 text-xl font-bold">
      {props.children}
    </h3>
  ),
  h4: (props: any) => (
    <h4 {...props} className="mb-4 mt-8 font-bold">
      {props.children}
    </h4>
  ),
  code: ({
    className,
    children,
  }: {
    className: string
    children: string | string[]
  }) => {
    const match = /language-(\w+)/.exec(className || '')
    const cleaned =
      typeof children === 'string' || children instanceof String
        ? children.trim()
        : Array.isArray(children)
        ? children.map((c) => c.trim())
        : children
    return match ? (
      <SyntaxHighlighter
        language={match[1]}
        style={atomOneDark}
        useInlineStyles
        showLineNumbers
        customStyle={{ fontSize: '1rem' }}
      >
        {cleaned}
      </SyntaxHighlighter>
    ) : (
      <code className={className}>{children}</code>
    )
  },
  Video: (props: any) => {
    return (
      <video
        autoPlay
        muted
        loop
        controls
        style={{
          width: '100%',
          marginTop: '1em',
        }}
      >
        <source type="video/mp4" src={`${props.link}#t=${props.startAt}`} />
      </video>
    )
  },
}

export default components
