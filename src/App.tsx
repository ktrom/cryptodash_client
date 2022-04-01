import React from "react";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { t } from "i18next";

/**
 * Returns the application
 * @return {HTMLDivElement} the application
 */
function App() {
  return (
    <div>
      <h1>Appy</h1>
      <nav>
        <Link to="/explore">{t("explore")}</Link>
        <Link to="/profile">{t("profile")}</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
