import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#ffebee', color: '#c62828', fontFamily: 'monospace' }}>
          <h1>Something went wrong!</h1>
          <h2>Error: {this.state.error?.toString()}</h2>
          <details style={{ marginTop: '20px' }}>
            <summary>Stack trace</summary>
            <pre style={{ marginTop: '10px', padding: '10px', background: '#fff', overflow: 'auto' }}>
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
