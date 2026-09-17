import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Background } from "../components/layout/Background";
import { CookieNotice } from "../components/layout/CookieNotice";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { ActivityFeed } from "../components/sections/ActivityFeed";
import { ActivityPillars } from "../components/sections/ActivityPillars";
import { CommunityValue } from "../components/sections/CommunityValue";
import { Contact } from "../components/sections/Contact";
import { CurrentStory } from "../components/sections/CurrentStory";
import { Hero } from "../components/sections/Hero";
import { InnerCircle, InnerCirclePreview } from "../components/sections/InnerCircle";
import { Imprint, Privacy } from "../components/sections/Legal";
import { LumaCalendarEmbed } from "../components/sections/LumaCalendarEmbed";
import { MemberPartnerCtas } from "../components/sections/MemberPartnerCtas";
import { NewsletterFeature } from "../components/sections/NewsletterFeature";
import { Partners, PartnersPreview } from "../components/sections/Partners";
import { Team, TeamPreview } from "../components/sections/Team";

function PageIntro({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
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

function ScrollToRouteTarget() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    window.setTimeout(() => {
      if (hash) {
        document.querySelector(hash)?.scrollIntoView();
        return;
      }

      window.scrollTo({ top: 0, left: 0 });
    }, 0);
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <CurrentStory variant="preview" />
      <ActivityFeed />
      <InnerCirclePreview />
      <PartnersPreview />
      <TeamPreview />
      <Contact variant="cta" />
    </>
  );
}

function ActivityPage() {
  return (
    <>
      <PageIntro
        eyebrow="Activity"
        title="What's happening at med-dev"
        intro="See upcoming community events, read recent recaps, and follow what members are learning, building, and organizing."
      />
      <LumaCalendarEmbed />
      <NewsletterFeature />
    </>
  );
}

function InnerCirclePage() {
  return (
    <>
      <PageIntro
        eyebrow="Inner Circle"
        title="Help shape med-dev from the inside"
        intro="A half-year program for members who want to organize events, build projects, write health-tech content, and connect more deeply with the ecosystem."
      />
      <InnerCircle />
    </>
  );
}

function PartnersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Partners"
        title="Collaborators and community partners"
        intro="A view of organizations, companies, and communities connected to med-dev events, learning formats, and ecosystem work."
      />
      <Partners />
      <MemberPartnerCtas />
    </>
  );
}

function TeamPage() {
  return (
    <>
      <PageIntro
        eyebrow="Team"
        title="People behind med-dev"
        intro="Meet the organizers and contributors behind the community."
      />
      <Team />
    </>
  );
}

export function App() {
  return (
    <>
      <Background />
      <ScrollToRouteTarget />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/events" element={<Navigate to="/activity" replace />} />
          <Route path="/inner-circle" element={<InnerCirclePage />} />
          <Route path="/newsletter" element={<Navigate to="/activity" replace />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/legal/imprint" element={<Imprint />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route
            path="/community"
            element={
              <>
                <PageIntro
                  eyebrow="Community"
                  title="How med-dev works"
                  intro="The med-dev mission, community formats, and ways to get involved in one place."
                />
                <CurrentStory />
                <ActivityPillars />
                <CommunityValue />
                <MemberPartnerCtas />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <CookieNotice />
    </>
  );
}
