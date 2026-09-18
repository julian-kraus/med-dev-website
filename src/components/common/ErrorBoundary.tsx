import { Component, type ErrorInfo, type ReactNode } from "react";
import { siteLinks } from "../../content/siteLinks";

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean };

/**
 * Last line of defence: a render throw anywhere in the tree would otherwise
 * unmount everything and leave a blank page.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled error in med-dev app", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <section className="page-intro">
        <div className="page-intro__inner">
          <p className="eyebrow">Something went wrong</p>
          <h1>This page could not be displayed</h1>
          <p>
            Reloading usually fixes it. If it keeps happening, reach the team at{" "}
            <a href={`mailto:${siteLinks.contactEmail}`}>{siteLinks.contactEmail}</a>.
          </p>
          <div className="section-actions">
            <a className="button-link button-link--primary" href="/">
              Back to the homepage
            </a>
          </div>
        </div>
      </section>
    );
  }
}
