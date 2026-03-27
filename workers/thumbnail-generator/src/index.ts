/**
 * Cloudflare Worker: Video Thumbnail Generator
 *
 * Generates thumbnails from video URLs and stores them in R2.
 * Supports:
 * - R2-hosted videos (mp4, webm)
 * - YouTube videos (native thumbnails)
 * - Vimeo videos (native thumbnails)
 *
 * API: POST /generate-thumbnail
 * Body: { videoUrl: string, filename?: string }
 */

import { ThumbnailGenerator } from './generator';

interface GenerateRequest {
  videoUrl: string;
  filename?: string;
}

interface GenerateResponse {
  success: boolean;
  thumbnailUrl?: string;
  error?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle OPTIONS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only POST allowed
    if (request.method !== 'POST') {
      return jsonResponse(
        { success: false, error: 'Method not allowed. Use POST.' },
        405,
        corsHeaders
      );
    }

    try {
      const body = await request.json() as GenerateRequest;
      const { videoUrl, filename } = body;

      if (!videoUrl) {
        return jsonResponse(
          { success: false, error: 'videoUrl is required' },
          400,
          corsHeaders
        );
      }

      const generator = new ThumbnailGenerator(env);
      const result = await generator.generate(videoUrl, filename);

      if (result.success) {
        return jsonResponse(
          { success: true, thumbnailUrl: result.thumbnailUrl },
          200,
          corsHeaders
        );
      } else {
        return jsonResponse(
          { success: false, error: result.error },
          500,
          corsHeaders
        );
      }
    } catch (error) {
      return jsonResponse(
        { success: false, error: 'Invalid request body' },
        400,
        corsHeaders
      );
    }
  },
};

function jsonResponse(data: GenerateResponse, status: number, headers: HeadersInit): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

interface Env {
  VIDEO_BUCKET: R2Bucket;
  THUMBNAIL_WIDTH?: string;
  THUMBNAIL_HEIGHT?: string;
  THUMBNAIL_QUALITY?: string;
  FRAME_TIME?: string;
}
