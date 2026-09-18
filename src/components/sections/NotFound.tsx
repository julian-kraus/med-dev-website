import { ButtonLink } from "../common/ButtonLink";
import { PageIntro } from "../common/PageIntro";
import { Section } from "../common/Section";

export function NotFound() {
  return (
    <>
      <PageIntro
        eyebrow="404"
        title="This page does not exist"
        intro="The link may be out of date, or the page may have moved. Everything else is still where you left it."
      />
      <Section id="not-found" className="section--content-only">
        <div className="section-actions">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
          <ButtonLink href="/activity" variant="secondary">
            See upcoming events
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
