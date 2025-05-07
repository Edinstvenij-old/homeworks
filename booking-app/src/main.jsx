import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store, history } from "./store/store";
import { HistoryRouter as Router } from "redux-first-history/rr6";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
