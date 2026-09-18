type PageIntroProps = {
  eyebrow: string;
  title: string;
  intro: string;
};

export function PageIntro({ eyebrow, title, intro }: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="page-intro__inner reveal">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );
}
