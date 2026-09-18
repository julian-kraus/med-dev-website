import { Link } from "react-router-dom";
import { Section } from "../common/Section";
import { siteLinks } from "../../content/siteLinks";

function ImprintContent() {
  return (
    <article className="legal-card" id="imprint">
      <h3>Imprint / Impressum</h3>
      <dl>
        <div>
          <dt>Information according to Section 5 TMG</dt>
          <dd>
            Leonard Rinser
            <br />
            Keltenstr. 8
            <br />
            86934 Reichling
            <br />
            Germany
          </dd>
        </div>
        <div>
          <dt>Represented by / responsible for content</dt>
          <dd>Leonard Rinser</dd>
        </div>
        <div>
          <dt>Contact</dt>
          <dd>
            Phone: +49 1573 7261900
            <br />
            Email: <a href={`mailto:${siteLinks.contactEmail}`}>{siteLinks.contactEmail}</a>
          </dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>Munich, Germany</dd>
        </div>
      </dl>
      <p>
        Liability for content and links follows the statutory rules. External links are checked when
        added, but med-dev has no influence over future third-party content.
      </p>
    </article>
  );
}

function PrivacyContent() {
  return (
    <article className="legal-card" id="privacy">
      <h3>Data privacy</h3>
      <p>
        Controller for this website is Leonard Rinser, Keltenstr. 8, 86934 Reichling, Germany,
        reachable at <a href={`mailto:${siteLinks.contactEmail}`}>{siteLinks.contactEmail}</a>.
      </p>
      <p>
        When you visit the site, technically necessary hosting and security data can be processed by
        the website host so the page can be delivered. This can include request metadata such as IP
        address, browser information, requested URL, referrer, and timestamps.
      </p>
      <p>We do not use Google Analytics, Google AdSense, or Vercel Web Analytics.</p>
      <p>
        Upcoming events are embedded from the public med-dev Luma calendar. Event details,
        registration, and attendance flows are handled by Luma.
      </p>
      <p>
        Newsletter entries are loaded from the public med-dev Substack RSS feed through RSS2JSON,
        similar to the current med-dev website. Clicking Substack, WhatsApp, LinkedIn, or Luma links
        opens third-party services whose own privacy policies apply.
      </p>
      <p>
        Contact currently happens through email or linked services such as WhatsApp, LinkedIn, Luma,
        and Substack. A dedicated website contact form is not configured yet.
      </p>
    </article>
  );
}

export function Imprint() {
  return (
    <Section
      id="imprint"
      eyebrow="Legal"
      title="Imprint / Impressum"
      intro="Responsible person and contact details for the med-dev website."
    >
      <div className="legal-grid legal-grid--single reveal">
        <ImprintContent />
        <div className="section-actions">
          <Link className="button-link button-link--secondary" to="/legal/privacy">
            Read data privacy
          </Link>
        </div>
      </div>
    </Section>
  );
}

export function Privacy() {
  return (
    <Section
      id="privacy"
      eyebrow="Legal"
      title="Data privacy"
      intro="How this website handles hosting, analytics, public calendar data, newsletter data, and external links."
    >
      <div className="legal-grid legal-grid--single reveal">
        <PrivacyContent />
        <div className="section-actions">
          <Link className="button-link button-link--secondary" to="/legal/imprint">
            Read imprint
          </Link>
        </div>
      </div>
    </Section>
  );
}
