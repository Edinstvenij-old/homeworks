import React from "react";
import { Outlet, useMatch } from "react-router-dom";
import Footer from "../components/Footer";

const AppLayout = () => {
  const isDetailPage = useMatch("/person/:personId");

  return (
    <div className="app-container">
      <Outlet />
      {!isDetailPage && <Footer />}
    </div>
  );
};

export default AppLayout;
