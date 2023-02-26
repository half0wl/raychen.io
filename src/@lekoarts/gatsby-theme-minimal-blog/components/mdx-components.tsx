import * as React from 'react'
import { Text } from 'theme-ui'
import { preToCodeBlock } from '@lekoarts/themes-utils'
import Code from './code'
import Title from './title'
import makeH from './anchor-headings'

const MdxComponents = {
  h1: (props: any) => makeH('h1', props),
  h2: (props: any) => makeH('h2', props),
  h3: (props: any) => makeH('h3', props),
  h4: (props: any) => makeH('h4', props),
  h5: (props: any) => makeH('h5', props),
  h6: (props: any) => makeH('h6', props),
  Text: (props: any) => <Text {...props} />,
  Title: (props: any) => <Title {...props} />,
  pre: (preProps: any) => {
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />
  },
}

export default MdxComponents
