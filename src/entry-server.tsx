// Prerender entry. Must import App directly and never main.tsx: main.tsx pulls
// in global.css and calls document.getElementById, neither of which exists here.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { App } from "./app/App";

export { appRoutes, prerenderRoutes } from "./app/routes";
export {
  redirectRoutes,
  routeMeta,
  siteOrigin,
  defaultOgImage,
  absoluteUrl,
  canonicalPath,
  noindexSite,
} from "./content/routeMeta";

export function render(url: string) {
  // StaticRouter matches the full location, so it has to include the basename.
  // Callers pass plain route paths ("/team"); the base is applied here.
  const base = import.meta.env.BASE_URL;
  const location = `${base}${url.replace(/^\//, "")}`;

  return renderToString(
    <StrictMode>
      <StaticRouter basename={base} location={location}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
