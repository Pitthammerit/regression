export default function SectionLabel({ text, light = false }) {
  return (
    <p className={`font-primary text-label label text-color-label label-heading-spacing ${
      light ? 'text-on-dark-meta' : ''
    }`}>
      {text}
    </p>
  )
}
