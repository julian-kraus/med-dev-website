import { Link } from "react-router-dom";
import { siteLinks } from "../../content/siteLinks";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <img src="/assets/current-site/images/image05.png" alt="med-dev" />
        <p>Healthcare. Technology. Innovation.</p>
      </div>
      <div className="footer__links">
        <a href={`mailto:${siteLinks.contactEmail}`}>Mail</a>
        <a href={siteLinks.linkedIn} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <Link to="/legal/imprint">Imprint/Impressum</Link>
        <Link to="/legal/privacy">Data privacy</Link>
        <Link to="/#contact">Contact</Link>
      </div>
      <p className="footer__meta">Munich, Germany. © med-dev.</p>
    </footer>
  );
}
