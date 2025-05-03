import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error);
    console.error("Error details:", errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      return (
        <div style={styles.container}>
          <h1>Что-то пошло не так.</h1>
          <details style={styles.details}>
            {error?.toString()}
            <br />
            {errorInfo?.componentStack}
          </details>
          <button onClick={this.handleReload} style={styles.button}>
            Перезагрузить
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#fff3f3",
    color: "#333",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  details: {
    whiteSpace: "pre-wrap",
    marginTop: "10px",
  },
  button: {
    marginTop: "16px",
    padding: "8px 16px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ErrorBoundary;
