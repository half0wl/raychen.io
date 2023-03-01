import * as React from 'react'
import { Text } from 'theme-ui'
import { preToCodeBlock } from '@lekoarts/themes-utils'
import Code from './code'
import Title from './title'
import withAnchorFor from './anchor-heading'

const MdxComponents = {
  h1: (props: any) => withAnchorFor('h1', props),
  h2: (props: any) => withAnchorFor('h2', props),
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
