export default function SectionLabel({ text, light = false }) {
  return (
    <p className={`font-sans text-label label text-color-label label-heading-spacing ${
      light ? 'text-on-dark-label' : ''
    }`}>
      {text}
    </p>
  )
}
