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
} from "./content/routeMeta";

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
