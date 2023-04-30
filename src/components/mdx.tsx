import SyntaxHighlighter from 'react-syntax-highlighter'
import { hopscotch } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import HWithAnchor, { H } from '@/components/h-with-anchor'

const components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  H2: (props: any) => <HWithAnchor h={H.h2} {...props} />,
  H3: (props: any) => <HWithAnchor h={H.h3} {...props} />,
  p: (props: any) => (
    <p {...props} className="my-4 text-xl leading-7">
      {props.children}
    </p>
  ),
  ul: (props: any) => (
    <ul {...props} className="my-6 list-inside list-disc text-xl">
      {props.children}
    </ul>
  ),
  ol: (props: any) => (
    <ol {...props} className="my-6 list-inside list-decimal text-xl">
      {props.children}
    </ol>
  ),
  li: (props: any) => (
    <li {...props} className="my-4 pl-6">
      {props.children}
    </li>
  ),
  h2: (props: any) => (
    <h2 {...props} className="mb-4 mt-8 text-3xl font-bold">
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 {...props} className="mb-4 mt-8 text-2xl font-bold">
      {props.children}
    </h3>
  ),
  h4: (props: any) => (
    <h4 {...props} className="mb-4 mt-8 text-xl font-bold">
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
        style={hopscotch}
        useInlineStyles
        showLineNumbers
        customStyle={{ fontSize: '1.2rem' }}
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
