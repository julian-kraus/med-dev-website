import { useEffect, useState } from "react";
import { ButtonLink } from "../common/ButtonLink";

const storageKey = "med-dev-cookie-notice";

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(storageKey) !== "accepted");
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="cookie-notice" aria-label="Privacy notice">
      <div>
        <p className="eyebrow">Privacy</p>
        <p>
          This site uses necessary local storage to remember this notice.
          External services such as WhatsApp, LinkedIn, Substack, RSS2JSON,
          and Luma are handled by those providers.
        </p>
      </div>
      <div className="cookie-notice__actions">
        <ButtonLink href="/legal/privacy" variant="ghost">
          Privacy notes
        </ButtonLink>
        <button
          className="button-link button-link--primary"
          type="button"
          onClick={() => {
            window.localStorage.setItem(storageKey, "accepted");
            setIsVisible(false);
          }}
        >
          Got it
        </button>
      </div>
    </aside>
  );
}
