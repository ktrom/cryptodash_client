import { t } from "i18next";
import React from "react";

/**
 * Functional component for the Explore page
 * @return {JsxElement} Component for the Explore Page
 */
export default function ExplorePage() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>{t("explore")}</h2>
    </main>
  );
}
