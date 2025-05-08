import Header from "./components/Header";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import { store, appHistory } from "./app/store";
import { HistoryRouter } from "redux-first-history/rr6";

export default function App() {
  return (
    <Provider store={store}>
      <HistoryRouter history={appHistory}>
        <Header />
        <AppRouter />
      </HistoryRouter>
    </Provider>
  );
}
