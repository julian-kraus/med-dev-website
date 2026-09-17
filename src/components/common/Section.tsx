import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  className?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
};

export function Section({ id, className = "", eyebrow, title, intro, children }: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || intro);

  return (
    <section className={`section ${className}`} id={id}>
      <div className="section__inner">
        {hasHeader ? (
          <div className="section__header reveal">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? <h2>{title}</h2> : null}
            {intro ? <p className="section__intro">{intro}</p> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
