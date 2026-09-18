import { CalendarDays, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ButtonLink } from "../common/ButtonLink";
import { siteLinks } from "../../content/siteLinks";

const navItems = [
  { href: "/", label: "Community", end: true },
  { href: "/activity", label: "Activity" },
  { href: "/inner-circle", label: "Inner Circle" },
  { href: "/partners", label: "Partners" },
  { href: "/team", label: "Team" },
];

const panelId = "header-mobile-nav";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>("a, button");

      if (!focusable?.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <NavLink className="header__brand" to="/" aria-label="med-dev home">
        <img src="/assets/current-site/images/image02.png" alt="med-dev" />
      </NavLink>
      <nav className="header__nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.end}
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <ButtonLink
        href={siteLinks.whatsappInvite}
        target="_blank"
        rel="noreferrer"
        className="header__cta"
      >
        <CalendarDays size={18} aria-hidden="true" />
        Join WhatsApp
      </ButtonLink>
      <button
        className="header__menu-toggle"
        type="button"
        ref={toggleRef}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls={panelId}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
      <div
        className="header__mobile-nav"
        id={panelId}
        ref={panelRef}
        hidden={!isMenuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
