import { useEffect, useState } from "react";
import { ButtonLink } from "../common/ButtonLink";

const storageKey = "med-dev-cookie-notice";

// Touching localStorage throws (rather than returning null) when site data is
// blocked, so every access is guarded. A read failure shows the notice, which
// is the safe default.
function hasAccepted() {
  try {
    return window.localStorage.getItem(storageKey) === "accepted";
  } catch {
    return false;
  }
}

function rememberAccepted() {
  try {
    window.localStorage.setItem(storageKey, "accepted");
  } catch {
    // Nothing to do: the notice reappears next visit, which is acceptable.
  }
}

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!hasAccepted());
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
            rememberAccepted();
            setIsVisible(false);
          }}
        >
          Got it
        </button>
      </div>
    </aside>
  );
}
