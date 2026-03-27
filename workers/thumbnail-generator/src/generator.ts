/**
 * ThumbnailGenerator: Core logic for video thumbnail generation
 */

import type { R2Bucket } from '@cloudflare/workers-types';

interface GenerateResult {
  success: boolean;
  thumbnailUrl?: string;
  error?: string;
}

export class ThumbnailGenerator {
  private bucket: R2Bucket;
  private config: ThumbnailConfig;

  constructor(env: {
    VIDEO_BUCKET: R2Bucket;
    THUMBNAIL_WIDTH?: string;
    THUMBNAIL_HEIGHT?: string;
    THUMBNAIL_QUALITY?: string;
    FRAME_TIME?: string;
  }) {
    this.bucket = env.VIDEO_BUCKET;
    this.config = {
      width: parseInt(env.THUMBNAIL_WIDTH || '1280'),
      height: parseInt(env.THUMBNAIL_HEIGHT || '720'),
      quality: parseInt(env.THUMBNAIL_QUALITY || '60'),
      frameTime: parseFloat(env.FRAME_TIME || '1.0'),
    };
  }

  async generate(videoUrl: string, filename?: string): Promise<GenerateResult> {
    const source = this.detectVideoSource(videoUrl);

    switch (source.type) {
      case 'youtube':
        return await this.generateYouTubeThumbnail(videoUrl, filename);
      case 'vimeo':
        return await this.generateVimeoThumbnail(videoUrl, filename);
      case 'r2':
        return await this.generateR2Thumbnail(videoUrl, filename);
      default:
        return {
          success: false,
          error: `Unsupported video source: ${source.type}`,
        };
    }
  }

  private detectVideoSource(url: string): VideoSource {
    // YouTube: youtube.com or youtu.be
    if (url.match(/(youtube\.com|youtu\.be)/)) {
      const videoId = this.extractYouTubeId(url);
      return { type: 'youtube', videoId };
    }

    // Vimeo: vimeo.com
    if (url.match(/vimeo\.com\/(\d+)/)) {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return { type: 'vimeo', videoId };
    }

    // R2: pub-*.r2.dev
    if (url.match(/r2\.dev/)) {
      const key = url.split('.r2.dev/')[1];
      return { type: 'r2', key };
    }

    return { type: 'unknown' };
  }

  private extractYouTubeId(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match?.[1] || null;
  }

  /**
   * YouTube: Use native thumbnail (maxresdefault)
   * https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
   */
  private async generateYouTubeThumbnail(url: string, filename?: string): Promise<GenerateResult> {
    const source = this.detectVideoSource(url);
    if (source.type !== 'youtube' || !source.videoId) {
      return { success: false, error: 'Invalid YouTube URL' };
    }

    const youtubeThumbnailUrl = `https://img.youtube.com/vi/${source.videoId}/maxresdefault.jpg`;
    const key = filename || `video-thumbnails/youtube-${source.videoId}.jpg`;

    try {
      // Fetch YouTube thumbnail
      const response = await fetch(youtubeThumbnailUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch YouTube thumbnail');
      }

      const blob = await response.blob();

      // Store in R2
      await this.bucket.put(key, blob, {
        httpMetadata: {
          contentType: 'image/jpeg',
        },
      });

      // Construct R2 public URL
      const thumbnailUrl = this.constructR2Url(key);

      return { success: true, thumbnailUrl };
    } catch (error) {
      return { success: false, error: `YouTube thumbnail failed: ${error}` };
    }
  }

  /**
   * Vimeo: Use oEmbed API to get thumbnail URL
   */
  private async generateVimeoThumbnail(url: string, filename?: string): Promise<GenerateResult> {
    const source = this.detectVideoSource(url);
    if (source.type !== 'vimeo' || !source.videoId) {
      return { success: false, error: 'Invalid Vimeo URL' };
    }

    try {
      // Vimeo oEmbed API
      const oembedUrl = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${source.videoId}`;
      const response = await fetch(oembedUrl);

      if (!response.ok) {
        throw new Error('Vimeo oEmbed API failed');
      }

      const data = await response.json();
      const vimeoThumbnailUrl = data.thumbnail_url;

      if (!vimeoThumbnailUrl) {
        throw new Error('No thumbnail in Vimeo response');
      }

      // Fetch and store in R2
      const thumbResponse = await fetch(vimeoThumbnailUrl);
      const blob = await thumbResponse.blob();

      const key = filename || `video-thumbnails/vimeo-${source.videoId}.jpg`;
      await this.bucket.put(key, blob, {
        httpMetadata: {
          contentType: 'image/jpeg',
        },
      });

      const thumbnailUrl = this.constructR2Url(key);

      return { success: true, thumbnailUrl };
    } catch (error) {
      return { success: false, error: `Vimeo thumbnail failed: ${error}` };
    }
  }

  /**
   * R2 Video: For now, use a placeholder approach
   * Full FFmpeg processing requires external service
   */
  private async generateR2Thumbnail(url: string, filename?: string): Promise<GenerateResult> {
    const source = this.detectVideoSource(url);
    if (source.type !== 'r2' || !source.key) {
      return { success: false, error: 'Invalid R2 video URL' };
    }

    // NOTE: Real video thumbnail generation requires FFmpeg
    // Cloudflare Workers cannot run FFmpeg natively
    //
    // Options:
    // 1. Use Cloudflare Images with video support (beta)
    // 2. Use external service (Cloudflare Run, AWS Lambda)
    // 3. Pre-generate thumbnails manually
    //
    // For now: Return error with instructions
    return {
      success: false,
      error: 'R2 video thumbnails require external FFmpeg service. ' +
             'Please upload thumbnail manually or use YouTube/Vimeo.',
    };

    // Future implementation with external service:
    // const response = await fetch('https://your-ffmpeg-service.com/generate', {
    //   method: 'POST',
    //   body: JSON.stringify({ videoUrl, time: this.config.frameTime }),
    // });
    // const thumbnailBlob = await response.blob();
    // await this.bucket.put(key, thumbnailBlob);
  }

  private constructR2Url(key: string): string {
    // Construct R2 public URL
    // Format: https://pub-*.r2.dev/{key}
    const bucketId = this.bucket.name; // Or use env variable
    return `https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/${key}`;
  }
}

interface ThumbnailConfig {
  width: number;
  height: number;
  quality: number;
  frameTime: number;
}

interface VideoSource {
  type: 'youtube' | 'vimeo' | 'r2' | 'unknown';
  videoId?: string;
  key?: string;
}
