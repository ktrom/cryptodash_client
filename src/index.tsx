import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExplorePage from "./Pages/ExplorePage";
import ProfilePage from "./Pages/ProfilePage";
import PageNotFoundPage from "./Pages/PageNotFoundPage";
import "./i18next/i18n";
import { t } from "i18next";
import AppBar from "./Components/AppBar";
import HomePage from "./Pages/HomePage";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppBar />}>
        <Route path="home" element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<PageNotFoundPage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
