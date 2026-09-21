import { Link } from "react-router-dom";
import { PageIntro } from "../common/PageIntro";
import { Section } from "../common/Section";
import { siteLinks } from "../../content/siteLinks";

function ImprintContent() {
  return (
    <article className="legal-card" id="imprint">
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
        Fonts are loaded from Google Fonts (fonts.googleapis.com and fonts.gstatic.com) on every
        page view. Your IP address and browser information are transmitted to Google in the process.
      </p>
      <p>
        Upcoming events are embedded from the public med-dev Luma calendar, so your browser loads
        content directly from Luma when you open that page. Past events are fetched from the same
        calendar when this site is built; their cover images are served from Luma's image CDN. Event
        details, registration, and attendance are handled by Luma.
      </p>
      <p>
        Newsletter entries are loaded in your browser from the public med-dev Substack RSS feed
        through RSS2JSON, similar to the previous med-dev website. Your IP address reaches RSS2JSON
        as part of that request.
      </p>
      <p>
        The contact form is a Google Form hosted by Google. Anything you enter there, including your
        name and email address, is submitted to and processed by Google, not by this website.
        Contact by email, WhatsApp, LinkedIn, or Substack is also possible.
      </p>
      <p>
        Clicking Substack, WhatsApp, LinkedIn, Google, or Luma links opens third-party services
        whose own privacy policies apply.
      </p>
    </article>
  );
}

export function Imprint() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Imprint / Impressum"
        intro="Responsible person and contact details for the med-dev website."
      />
      <Section id="imprint-details" className="section--content-only">
        <div className="legal-grid legal-grid--single reveal">
          <ImprintContent />
          <div className="section-actions">
            <Link className="button-link button-link--secondary" to="/legal/privacy">
              Read data privacy
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

export function Privacy() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Data privacy"
        intro="How this website handles hosting, fonts, public calendar data, newsletter data, the contact form, and external links."
      />
      <Section id="privacy-details" className="section--content-only">
        <div className="legal-grid legal-grid--single reveal">
          <PrivacyContent />
          <div className="section-actions">
            <Link className="button-link button-link--secondary" to="/legal/imprint">
              Read imprint
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
