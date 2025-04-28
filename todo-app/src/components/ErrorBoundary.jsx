import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    // Обновляем state, чтобы следующий рендер мог показать fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Логируем ошибку для отладки
    console.error("Error caught in Error Boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Выводим информацию об ошибке
      return (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            borderRadius: "4px",
          }}
        >
          <h1>Что-то пошло не так.</h1>
          <details
            style={{
              whiteSpace: "pre-wrap",
              backgroundColor: "#f1f1f1",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <summary style={{ fontWeight: "bold", cursor: "pointer" }}>
              Информация об ошибке
            </summary>
            <p>
              <strong>Ошибка:</strong>{" "}
              {this.state.error && this.state.error.toString()}
            </p>
            <p>
              <strong>Информация о стеке:</strong> <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </p>
          </details>
        </div>
      );
    }

    // Если ошибки нет, рендерим дочерние компоненты
    return this.props.children;
  }
}

export default ErrorBoundary;
