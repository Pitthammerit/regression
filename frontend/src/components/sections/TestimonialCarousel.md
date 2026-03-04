# TestimonialCarousel Component

## Overview
A simple, accessible testimonial carousel for the Regression website that displays client testimonials with auto-advance and manual navigation.

## Features
- **Auto-advance**: 5 seconds per slide with visual progress indicator
- **Manual navigation**: Arrow buttons and dot indicators
- **Keyboard support**: Arrow keys to navigate
- **Pause on hover**: Auto-advance pauses when user hovers over the carousel
- **CSS transitions**: Smooth slide animations (no framer-motion dependency)
- **Cloudflare R2 integration**: Optimized image loading with lazy loading
- **Responsive design**: Works on mobile and desktop
- **Accessibility**: ARIA labels and keyboard navigation

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `testimonials` | `Array` | `[]` | Array of testimonial objects |
| `label` | `string` | - | Section label (e.g., "ERFAHRUNGEN") |
| `subtitle` | `string` | - | Section subtitle/headline |
| `language` | `string` | `"de"` | Language for quote selection |

## Testimonial Object Shape

```javascript
{
  name: string,      // Client name (required)
  context: string,   // Client role/location (optional)
  image: string,     // R2 image URL (optional)
  quote: string,     // German quote text (required)
  quoteDe: string,   // Alternative German quote (optional)
  highlight: string  // Short highlight text (optional)
}
```

## Usage Example

```javascript
import { TestimonialCarousel } from './components/sections/TestimonialCarousel'

const testimonials = [
  {
    name: "Anna K.",
    context: "Health Coach, Deutschland",
    image: "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/client-portraits/anna.jpg",
    quote: "Durch Benjamins Ruhe und Klarheit konnte ich mich trotz anfänglicher starker Aufregung schnell auf die Session einlassen.",
    highlight: "Ich fühle mich geführt und getragen."
  },
  // ... more testimonials
]

<TestimonialCarousel
  testimonials={testimonials}
  label="ERFAHRUNGEN"
  subtitle="Was Klienten sagen"
  language="de"
/>
```

## Design Integration

The component uses Regression's brand colors from `tailwind.config.js`:
- Background: `bg-brand-cream` (#F0EBE1)
- Primary text: `text-brand-deep` (#224160)
- Secondary text: `text-brand-steel` (#7696AD)
- Muted text: `text-brand-muted` (#5A5550)
- Borders: `border-brand-sand` (#EDE7DC)
- Card background: `bg-white/80`

## Architecture Notes

- **No framer-motion**: Uses CSS `transition-transform` for smooth slides
- **No radix-ui**: Uses native button elements with Tailwind styling
- **Image optimization**: Leverages existing `LazyImage` component with R2 CDN
- **State management**: React hooks (useState, useEffect, useCallback)
- **Performance**: Only renders visible testimonials in the carousel

## Accessibility

- Arrow button aria-labels in German
- Keyboard navigation with arrow keys
- Semantic HTML with proper heading hierarchy
- Focus indicators on interactive elements
- Pause indicator for screen readers

## Future Enhancements

- Swipe gestures for mobile
- Variable slide counts (show 2-3 on desktop)
- Transition animations (fade, slide, scale)
- testimonial filtering/category selection
- Integration with CMS for dynamic content
