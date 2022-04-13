import { t } from "i18next";
import React from "react";

/**
 * Functional component for the Login page
 * @return {JsxElement} Component for the Login Page
 */
export default function  LoginPage() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>{t("login")}</h2>
    </main>
  );
}