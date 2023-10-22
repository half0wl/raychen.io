/* eslint @typescript-eslint/no-explicit-any: 0 */
import Link from 'next/link'
import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import styled from 'styled-components'
import { match } from 'ts-pattern'

const UL = styled.ul`
  font-size: 1.1em;
  font-weight: 400;
  line-height: 1.6em;
  letter-spacing: -0.15px;
  list-style-type: square;
  margin-left: 2em;
  li {
    margin-bottom: 0.6em;
  }
`

const H2 = styled.h2`
  font-size: 1.4rem;
  margin: 1.1rem 0;
  font-weight: 800;
`

const H3 = styled.h3`
  font-size: 1.3rem;
  margin: 1.1rem 0;
  font-weight: 700;
`

const H4 = styled.h4`
  font-size: 1.2rem;
  margin: 1.1rem 0;
  font-weight: 600;
`

const P = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.6em;
  letter-spacing: -0.15px;
  margin: 1rem 0;
`

const HWithAnchor: React.FC<{
  h: 'h2' | 'h3'
  id: string
  children: React.ReactNode
}> = ({ h, id, children }) => {
  const anchor = (
    <Link
      href={`#${id}`}
      className="absolute left-[-2%] opacity-20 hover:opacity-100"
    >
      #
    </Link>
  )
  return match(h)
    .with('h2', () => (
      <H2 id={id} className="relative">
        {anchor} {children}
      </H2>
    ))
    .with('h3', () => (
      <H3 id={id} className="relative">
        {anchor} {children}
      </H3>
    ))
    .exhaustive()
}

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
  p: (props: any) => <P {...props}>{props.children}</P>,
  ul: (props: any) => <UL {...props}>{props.children}</UL>,
  h1: () => {
    throw new Error('Forbidden h1 in article content body')
  },
  h2: (props: any) => <H2 {...props}>{props.children}</H2>,
  h3: (props: any) => <H3 {...props}>{props.children}</H3>,
  h4: (props: any) => <H4 {...props}>{props.children}</H4>,
  H2A: (props: any) => (
    <HWithAnchor h="h2" {...props}>
      {props.children}
    </HWithAnchor>
  ),
  H3A: (props: any) => (
    <HWithAnchor h="h3" {...props}>
      {props.children}
    </HWithAnchor>
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
        customStyle={{
          fontSize: '1.1rem',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
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
  ImageWithCaption: (props: any) => {
    return (
      <div className="mb-6 mt-3 flex flex-col items-center">
        <img src={props.src} alt={props.alt} />
        <span className="mt-2 text-sm text-gray-500">{props.caption}</span>
      </div>
    )
  },
}

export default components
