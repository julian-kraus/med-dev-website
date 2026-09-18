import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "../styles/global.css";

const container = document.getElementById("root")!;

const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Production HTML is prerendered, so hydrate it. The dev server and any route
// that failed to prerender leave the container empty, and hydrating that logs
// a mismatch on every load. firstElementChild ignores the <!--app-html-->
// comment, which is exactly the distinction needed.
if (container.firstElementChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
