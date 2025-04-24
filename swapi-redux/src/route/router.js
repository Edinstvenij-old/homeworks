import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import PeopleList from "../components/PeopleList";
import PersonDetail from "../components/PersonDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <PeopleList /> },
      { path: "person/:personId", element: <PersonDetail /> },
    ],
  },
]);
