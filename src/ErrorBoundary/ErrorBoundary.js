import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    console.log(error)
    return { 
      hasError: true
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>Error occurred - could not display this content.</h2>
      )
    }
    return (
      this.props.children
    )
  }
}

export default ErrorBoundary;