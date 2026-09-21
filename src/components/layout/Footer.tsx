import { Link } from "react-router-dom";
import { siteLinks } from "../../content/siteLinks";
import { asset } from "../../content/assets";

const pageLinks = [
  { to: "/community", label: "Community" },
  { to: "/activity", label: "Activity" },
  { to: "/inner-circle", label: "Inner Circle" },
  { to: "/partners", label: "Partners" },
  { to: "/team", label: "Team" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <img
          src={asset("/assets/images/image05.webp")}
          alt="med-dev"
          width={400}
          height={91}
          loading="lazy"
          decoding="async"
        />
        <p>Healthcare. Technology. Innovation.</p>
      </div>
      {/* The nav used to be header-only, which left every page one mis-scroll
          away from being a dead end. */}
      <nav className="footer__links" aria-label="Site pages">
        {pageLinks.map((link) => (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ))}
      </nav>
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
