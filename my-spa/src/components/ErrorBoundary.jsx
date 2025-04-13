import { Component } from "react";
import "../styles/ErrorBoundary.css";

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
    this.setState({ errorInfo });

    if (import.meta.env.PROD) {
      console.log("Production error log:", error, errorInfo);
    } else {
      console.error("Development error log:", error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          ⚠️ Щось пішло не так...
          <br />
          <button onClick={this.handleRetry}>🔁 Спробувати знову</button>
          {import.meta.env.DEV && this.state.error && (
            <details>
              <summary>Деталі помилки</summary>
              <pre>
                {this.state.error.toString()}
                {"\n"}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
