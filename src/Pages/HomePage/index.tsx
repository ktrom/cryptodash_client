import { t } from "i18next";
import React from "react";

/**
 * Functional component for the Home page
 * @return {JsxElement} Component for the Home Page
 */
export default function  HomePage() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>{t("home")}</h2>
    </main>
  );
}
