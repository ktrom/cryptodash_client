import { t } from "i18next";
import React from "react";

/**
 * Functional component for the Profile page
 * @return {JsxElement} Component for the Profile Page
 */
export default function ProfilePage() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>{t("profile")}</h2>
    </main>
  );
}
