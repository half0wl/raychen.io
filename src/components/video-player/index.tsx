/**
 * Renders a HTML video player.
 *
 * Usage (`mdx`):
 * ```typescript
 * import VideoPlayer from "../../../src/components/video-player.tsx"
 * <VideoPlayer video="foo" />
 * ```
 *
 * @NOTE:
 * The current build process doesn't include mp4s as public assets. Importing
 * them here is a workaround to make it present in the build. I'd like to find
 * a better solution to this where I can pass in a path to this component.
 */
import * as React from 'react'
import { match } from 'ts-pattern'

// Import video files here. See @NOTE above :-(
import autocomplete from './videos/autocomplete.mp4'
import gotodefinition from './videos/goto-definition.mp4'
import navigation from './videos/navigation.mp4'
import search from './videos/search.mp4'
import autofix from './videos/autofix.mp4'

type Video =
  | 'autocomplete.mp4'
  | 'goto-definition.mp4'
  | 'navigation.mp4'
  | 'search.mp4'
  | 'autofix.mp4'

interface Props {
  startAt?: number
  video: Video
}

const VideoPlayer: React.FC<Props> = ({ startAt, video }) => {
  const videoSrc = match(video)
    .with('autocomplete.mp4', () => autocomplete)
    .with('goto-definition.mp4', () => gotodefinition)
    .with('navigation.mp4', () => navigation)
    .with('search.mp4', () => search)
    .with('autofix.mp4', () => autofix)
    .exhaustive()
  const startVideoAt = startAt ?? 0

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
      <source type="video/mp4" src={`${videoSrc}#t=${startVideoAt}`} />
    </video>
  )
}

export default VideoPlayer
