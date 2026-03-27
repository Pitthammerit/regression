# Cloudflare Worker: Video Thumbnail Generator

On-demand thumbnail generation for R2, YouTube, and Vimeo videos.

## Features

- **YouTube**: Extracts native thumbnail (maxresdefault)
- **Vimeo**: Uses oEmbed API for thumbnail
- **R2 Videos**: Returns error (requires external FFmpeg service)
- **Storage**: All thumbnails stored in R2 `/video-thumbnails/` folder

## Setup

### 1. Install Dependencies

```bash
cd workers/thumbnail-generator
npm install
```

### 2. Configure Wrangler

Update `wrangler.toml`:

```toml
# Update this to your actual R2 bucket name
bucket_name = "your-bucket-name"
```

### 3. Authenticate Wrangler

```bash
npx wrangler login
```

### 4. Set R2 Bucket Secret

```bash
npx wrangler secret put R2_BUCKET
# Enter: regression-videos (or your bucket name)
```

### 5. Deploy

```bash
npm run deploy
```

## API Usage

### Endpoint

```
POST https://thumbnail-generator.your-subdomain.workers.dev/generate-thumbnail
```

### Request Body

```json
{
  "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "filename": "video-thumbnails/my-video-thumb.jpg" // optional
}
```

### Response

**Success (200):**
```json
{
  "success": true,
  "thumbnailUrl": "https://pub-*.r2.dev/video-thumbnails/my-video-thumb.jpg"
}
```

**Error (400/500):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Examples

### cURL

```bash
curl -X POST \
  https://thumbnail-generator.your-subdomain.workers.dev/generate-thumbnail \
  -H "Content-Type: application/json" \
  -d '{
    "videoUrl": "https://www.youtube.com/watch?v=U5L07PmViis"
  }'
```

### JavaScript (Frontend)

```javascript
const response = await fetch('https://thumbnail-generator.workers.dev/generate-thumbnail', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    videoUrl: 'https://www.youtube.com/watch?v=U5L07PmViis',
  }),
});

const { success, thumbnailUrl, error } = await response.json();

if (success) {
  console.log('Thumbnail:', thumbnailUrl);
  // Store in content layer: hero.posterUrl = thumbnailUrl
} else {
  console.error('Error:', error);
}
```

## Development

### Local Development

```bash
npm run dev
# Starts at http://localhost:8787
```

### Tail Logs

```bash
npm run tail
# Stream real-time logs from deployed worker
```

## Limitations

### R2 Video Thumbnails

Cloudflare Workers **cannot run FFmpeg natively**. For R2-hosted videos, you have three options:

1. **Manual Upload** (Current Approach)
   - Extract thumbnail locally: `ffmpeg -i video.mp4 -ss 1 -vframes 1 thumb.jpg`
   - Upload to R2 `/video-thumbnails/`

2. **External Service** (Recommended for automation)
   - Deploy FFmpeg service (Cloudflare Run, AWS Lambda, etc.)
   - Worker calls service → receives thumbnail → stores in R2

3. **Cloudflare Images** (Beta)
   - Use Cloudflare Images API with video support
   - May require Cloudflare Enterprise plan

### YouTube/Vimeo

These platforms provide native thumbnails, so no FFmpeg needed.

## Future Enhancements

- [ ] Integrate external FFmpeg service for R2 videos
- [ ] Add thumbnail caching TTL
- [ ] Support custom resolutions
- [ ] Batch generation API
- [ ] Webhook notifications

## Troubleshooting

### "R2_BUCKET binding not found"

Run: `npx wrangler secret put R2_BUCKET`

### "Method not allowed"

Ensure you're sending `POST` request, not `GET`.

### "Invalid YouTube URL"

Check URL format: `youtube.com/watch?v=ID` or `youtu.be/ID`

---

**Worker URL after deploy:** `https://thumbnail-generator.YOUR_SUBDOMAIN.workers.dev`
