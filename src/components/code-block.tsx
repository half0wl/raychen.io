import SyntaxHighlighter from 'react-syntax-highlighter'
import { hopscotch } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

interface Props {
  code: string
  lang: string
}

const CodeBlock: React.FC<Props> = ({ code, lang }) => {
  return (
    <SyntaxHighlighter
      language={lang}
      style={hopscotch}
      useInlineStyles
      showLineNumbers
      customStyle={{ fontWeight: 700, marginTop: '-1em', marginBottom: '1em' }}
    >
      {code}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
