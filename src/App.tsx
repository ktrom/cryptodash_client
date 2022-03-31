import React from "react";
import "./App.css";
import { Link, Outlet } from "react-router-dom";

/**
 * Returns the application
 * @return {HTMLDivElement} the application
 */
function App() {
  return (
    <div>
      <h1>Appy</h1>
      <nav>
        <Link to="/explore">Explore</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
