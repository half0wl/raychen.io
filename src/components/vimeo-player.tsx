/**
 * Renders an embedded Vimeo player.
 *
 * Usage (`mdx`):
 * ```typescript
 * import VimeoPlayer from "../../../src/components/vimeo-player.tsx"
 * <VimeoPlayer id="" />
 * ```
 */
import * as React from 'react'

const containerStyle: React.CSSProperties = {
  padding: '56.25% 0 0 0',
  position: 'relative',
}

const iframeStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  marginTop: '1em',
}

interface Props {
  id: string
}

const VimeoPlayer: React.FC<Props> = ({ id }) => {
  const cfg = {
    // @TODO Parameterize as props?
    autoplay: '1',
    loop: '1',
    title: '0',
    byline: '0',
    portrait: '0',
    background: '1',
    muted: '1',
  }
  const qs = new URLSearchParams(cfg).toString()
  return (
    <>
      <div style={containerStyle}>
        <iframe
          src={`https://player.vimeo.com/video/${id}?${qs}`}
          frameBorder="0"
          style={iframeStyle}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </>
  )
}

export default VimeoPlayer
