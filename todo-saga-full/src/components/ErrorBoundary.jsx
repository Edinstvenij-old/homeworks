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
    // Обновляем state, чтобы при следующем рендере показать fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Логируем ошибку, можно интегрировать с системой мониторинга
    console.error("Error caught by ErrorBoundary: ", error);
    console.error("Error details: ", errorInfo);

    // Сохраняем информацию об ошибке в состоянии
    this.setState({ error, errorInfo });

    // Можно отправить данные в систему мониторинга
    // logErrorToMyService(error, errorInfo); // пример
  }

  render() {
    if (this.state.hasError) {
      // Сообщение о произошедшей ошибке, можно улучшить UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }

    // Возвращаем дочерние компоненты, если ошибки нет
    return this.props.children;
  }
}

export default ErrorBoundary;
