import { merge } from 'theme-ui'
import tailwind from '@theme-ui/preset-tailwind'
import {
  darkThemeVars,
} from '@lekoarts/gatsby-theme-minimal-blog/src/utils/prism-themes'

const theme = merge(tailwind, {
  config: {
    initialColorModeName: `dark`,
  },
  colors: {
    text: tailwind.colors.gray[4],
    primary: tailwind.colors.purple[4],
    secondary: `#8a9ab0`,
    toggleIcon: tailwind.colors.gray[4],
    background: `#262d3d`,
    heading: tailwind.colors.white,
    // divide: tailwind.colors.gray[8],
    divide: `#52627d`,
    muted: tailwind.colors.gray[8],
    highlightLineBg: `rgba(255, 255, 255, 0.1)`,
    ...darkThemeVars,
  },
  highlights: {
    orange: {
      color: tailwind.colors.orange[4],
    },
  },
  fonts: {
    body: `-apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
  },
  styles: {
    root: {
      overflowY: `scroll`,
      color: `text`,
      backgroundColor: `background`,
      margin: 0,
      padding: 0,
      boxSizing: `border-box`,
      textRendering: `optimizeLegibility`,
      WebkitFontSmoothing: `antialiased`,
      MozOsxFontSmoothing: `grayscale`,
    },
    p: {
      fontSize: [1, 1, 2],
      letterSpacing: `-0.003em`,
      lineHeight: `body`,
      '--baseline-multiplier': 0.179,
      '--x-height-multiplier': 0.35,
      wordBreak: `break-word`,
    },
    ul: {
      li: {
        fontSize: [1, 1, 2],
        letterSpacing: `-0.003em`,
        lineHeight: `body`,
        '--baseline-multiplier': 0.179,
        '--x-height-multiplier': 0.35,
      },
    },
    ol: {
      li: {
        fontSize: [1, 1, 2],
        letterSpacing: `-0.003em`,
        lineHeight: `body`,
        '--baseline-multiplier': 0.179,
        '--x-height-multiplier': 0.35,
      },
    },
    h1: {
      fontSize: `2.5rem`,
      variant: `text.heading`,
      mt: `1em`,
    },
    h2: {
      fontSize: `2rem`,
      variant: `text.heading`,
      mt: `1.7em`,
    },
    h3: {
      fontSize: `1.5rem`,
      variant: `text.heading`,
      mt: `1.4em`,
    },
    h4: {
      fontSize: `1.2rem`,
      variant: `text.heading`,
      mt: `1.1em`,
    },
    blockquote: {
      borderLeftColor: `primary`,
      borderLeftStyle: `solid`,
      borderLeftWidth: `4px`,
      mx: 0,
      pl: 4,
      p: {
        fontStyle: `italic`,
      },
    },
    table: {
      width: `100%`,
      my: 4,
      borderCollapse: `separate`,
      borderSpacing: 0,
      [[`th`, `td`]]: {
        textAlign: `left`,
        py: `4px`,
        pr: `4px`,
        pl: 0,
        borderColor: `muted`,
        borderBottomStyle: `solid`,
      },
    },
    th: {
      verticalAlign: `bottom`,
      borderBottomWidth: `2px`,
      color: `heading`,
    },
    td: {
      verticalAlign: `top`,
      borderBottomWidth: `1px`,
    },
    hr: {
      mx: 0,
    },
    img: {
      borderRadius: `4px`,
      boxShadow: `lg`,
      maxWidth: `100%`,
    },
  },
  layout: {
    container: {
      padding: [3, 4],
      maxWidth: `960px`,
    },
    content: {
      figure: {
        margin: 0,
        img: {
          borderRadius: `4px`,
          boxShadow: `lg`,
          maxWidth: `100%`,
        },
      },
    },
  },
  text: {
    heading: {
      fontFamily: `heading`,
      fontWeight: `heading`,
      lineHeight: `heading`,
      color: `heading`,
    },
  },
  copyButton: {
    backgroundColor: `background`,
    border: `none`,
    color: `text`,
    cursor: `pointer`,
    fontSize: [`14px`, `14px`, `16px`],
    fontFamily: `body`,
    letterSpacing: `0.025rem`,
    transition: `all 0.3s ease-in-out`,
    '&[disabled]': {
      cursor: `not-allowed`,
    },
    ':not([disabled]):hover': {
      bg: `primary`,
      color: `white`,
    },
    position: `absolute`,
    right: 0,
    zIndex: 1,
    borderRadius: `0 0 0 0.25rem`,
    padding: `0.25rem 0.6rem`,
  },
  dividers: {
    bottom: {
      borderBottomStyle: `solid`,
      borderBottomWidth: `1px`,
      borderBottomColor: `divide`,
      pb: 3,
    },
    top: {
      borderTopStyle: `solid`,
      borderTopWidth: `1px`,
      borderTopColor: `divide`,
      pt: 3,
    },
  },
  links: {
    secondary: {
      color: `secondary`,
      textDecoration: `none`,
      ':hover': {
        color: `heading`,
        textDecoration: `underline`,
      },
      ':focus': {
        color: `heading`,
      },
    },
    listItem: {
      fontSize: [1, 2, 3],
      color: `text`,
    },
  },
})

export default theme
