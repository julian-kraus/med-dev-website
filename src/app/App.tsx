import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import { Background } from "../components/layout/Background";
import { CookieNotice } from "../components/layout/CookieNotice";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { NotFound } from "../components/sections/NotFound";
import { redirectRoutes } from "../content/routeMeta";
import { appRoutes } from "./routes";
import { useDocumentMeta } from "./useDocumentMeta";

function ScrollToRouteTarget() {
  const { pathname, hash } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // On the very first render the page is already prerendered and painted, so
    // scrolling to top here would visibly yank a restored scroll position away
    // from the visitor. Anchor links still need handling, though.
    const isInitial = isFirstRender.current;
    isFirstRender.current = false;

    if (isInitial && !hash) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        // A hash is not necessarily a valid CSS selector: "#2024" throws.
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        target?.scrollIntoView();
        return;
      }

      window.scrollTo({ top: 0, left: 0 });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

function DocumentMeta() {
  useDocumentMeta();
  return null;
}

export function App() {
  return (
    <ErrorBoundary>
      <Background />
      <ScrollToRouteTarget />
      <DocumentMeta />
      <Header />
      <main>
        <Routes>
          {appRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          {Object.entries(redirectRoutes).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          {/* Renders NotFound in place rather than redirecting, so the client
              matches the prerendered 404.html and the bad URL is preserved. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieNotice />
    </ErrorBoundary>
  );
}
