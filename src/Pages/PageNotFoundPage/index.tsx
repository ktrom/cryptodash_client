import { t } from "i18next";
import React from "react";
import { Link } from "react-router-dom";

/**
 * Functional component for the Page Not Found Page
 * @return {JsxElement} Component for the Page Not Found Page
 */
export default function PageNotFoundPage() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>{t("pageNotFound")}</h2>
      <Link to="/">{t("home")}</Link>
    </main>
  );
}
