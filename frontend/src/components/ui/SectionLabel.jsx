export default function SectionLabel({ text, light = false }) {
  return (
    <p className={`typography-label text-color-secondary label-heading-spacing ${
      light ? 'text-secondary-on-dark' : ''
    }`}>
      {text}
    </p>
  )
}
