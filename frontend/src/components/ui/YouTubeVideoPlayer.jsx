import React from 'react'
import VideoPlayer from './VideoPlayer'

/**
 * YouTubeVideoPlayer — YouTube-specific player wrapper
 *
 * Wraps VideoPlayer with YouTube-specific CSS class for stronger blur.
 * The blur-player-glass utility (2px) is overridden by youtube-blur-strong (12px).
 *
 * @param {Object} props
 * @param {string} props.videoId - YouTube video ID
 * @param {string} props.className - Additional CSS classes
 */
export default function YouTubeVideoPlayer({ videoId, className = '', ...props }) {
  return (
    <VideoPlayer
      type="youtube"
      videoId={videoId}
      className={`youtube-blur-strong ${className}`}
      {...props}
    />
  )
}
