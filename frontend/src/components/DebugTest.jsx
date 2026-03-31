import React from 'react'

export default function DebugTest() {
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    try {
      // Test if contexts are working
      console.log('DebugTest mounting...')

      // Test imports
      import('../contexts/SiteContext').then(m => {
        console.log('SiteContext loaded:', !!m.SiteProvider)
      })

      import('../contexts/ContentContext').then(m => {
        console.log('ContentContext loaded:', !!m.ContentProvider)
      })

    } catch (e) {
      console.error('Error in DebugTest:', e)
      setError(e.message)
    }
  }, [])

  if (error) {
    return <div style={{padding: '20px', color: 'red'}}>ERROR: {error}</div>
  }

  return (
    <div style={{padding: '20px'}}>
      <h1>Debug Test Page</h1>
      <p>If you see this, React is mounting!</p>
      <p>URL: {window.location.href}</p>
      <p>Site/Pathname: {window.location.pathname}</p>
    </div>
  )
}
