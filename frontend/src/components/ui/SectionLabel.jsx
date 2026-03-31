export default function SectionLabel({ text, light = false }) {
  return (
    <p className={`typography-label text-color-secondary ${
      light ? 'text-secondary-on-dark' : ''
    }`}>
      {text}
    </p>
  )
}
