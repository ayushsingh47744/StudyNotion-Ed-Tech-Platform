import React from "react";
import StaticPage from "../components/common/StaticPage";

export default function PrivacyPolicy() {
  return (
    <StaticPage title="Privacy Policy">
      <p>
        We value your privacy. Any information you provide to StudyNotion —
        such as your name, email, and course activity — is used only to
        provide and improve our services.
      </p>
      <p>
        We do not sell your personal data to third parties. Payment details
        are securely processed via our payment partner and are never stored
        on our servers.
      </p>
    </StaticPage>
  );
}