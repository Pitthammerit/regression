import React from 'react'
import VideoPlayer from './VideoPlayer'

/**
 * YouTubeVideoPlayer — YouTube-specific player with stronger blur
 *
 * Wrapper around VideoPlayer with YouTube-specific styling.
 * Uses CSS utility class for stronger backdrop blur (12px vs 2px).
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
      className={`youtube-player-strong-blur ${className}`}
      {...props}
    />
  )
}
