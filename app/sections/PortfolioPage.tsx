"use client";

import { type FormEvent, useEffect, useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { ThemePrecisionText } from "./ThemePrecisionText";
import {
  certifications,
  heroStats,
  navLinks,
  profile,
  projects,
  skillCategories,
  socialLinks,
  typingSkills,
} from "./data";
import { Typewriter } from "./Typewriter";
import { ThemeToggle } from "./ThemeToggle";
import { useThemeStrings } from "./useThemeStrings";

function BreathingDivider({ text }: { text: string }) {
  return (
    <div className="breathing-divider" aria-hidden="true">
      <span>{text}</span>
    </div>
  );
}

type StringsShape = {
  nav: Record<string, string>;
  buttons: {
    hire: string;
    viewProjects: string;
    contact: string;
    downloadCv: string;
    send: string;
  };
  hero: {
    badge: string;
    headlineLead: string;
    subtitle: string;
    specializingLabel: string;
    profileTag: string;
    profileRole: string;
    profileSummary: string;
    statStories: string;
    statLeetCode: string;
    statCodeChef: string;
    statCerts: string;
  };
  dividers: string[];
  sections: {
    about: { eyebrow: string; title: string; description: string };
    skills: { eyebrow: string; title: string; description: string };
    projects: { eyebrow: string; title: string; description: string };
    experience: { eyebrow: string; title: string };
    achievements: { eyebrow: string; title: string };
    contact: { eyebrow: string; title: string; description: string };
  };
  aboutCards: Array<{ title: string; text: string }>;
  experienceTimeline: string;
  experienceBullets: string[];
  achievementTitles: { competitive: string; certifications: string };
  achievementBullets: string[];
  connectTitle: string;
  contactForm: {
    name: string;
    email: string;
    subject: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
  };
  footerQuote: string;
};

export function PortfolioPage() {
  const [isBooting, setIsBooting] = useState(true);
  const strings = useThemeStrings() as unknown as StringsShape;
  const emailTarget =
    socialLinks.find((link) => link.label.toLowerCase() === "email")?.href.replace(/^mailto:/i, "") ??
    "dipeshsinghpawar@gmail.com";

  useEffect(() => {
    const timer = window.setTimeout(() => setIsBooting(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const fallbackSubject = `Portfolio inquiry from ${name || "Website Visitor"}`;
    const finalSubject = subject || fallbackSubject;
    const bodyLines = [
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      "",
      "Message:",
      message || "-",
    ];
    const finalBody = bodyLines.join("\n");
    const mailtoUrl = `mailto:${encodeURIComponent(emailTarget)}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(finalBody)}`;
    window.location.href = mailtoUrl;
  };

  if (isBooting) {
    return (
      <main className="loader-screen" aria-label="Loading portfolio">
        <div className="loader-core">
          <div className="loader-orb" />
          <p>Loading Theme Matrix...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="portfolio-root">
      <div className="bg-pattern" />
      <div className="water-flow" aria-hidden="true" />
      <div className="flame-embers" aria-hidden="true" />

      <header className="site-header fixed left-0 right-0 top-0 z-50 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-2.5">
          <a href="#home" className="tone-accent-a font-heading text-lg font-bold tracking-wide">
            {profile.name}
          </a>
          <ul className="tone-body hidden items-center gap-5 text-xs font-semibold uppercase tracking-[0.15em] md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  {strings.nav[link.label.toLowerCase()] ?? link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href="#contact" className="btn-sm">
              {strings.buttons.hire}
            </a>
          </div>
        </nav>
      </header>

      <section
        id="home"
        className="mx-auto grid min-h-[92vh] w-full max-w-6xl items-center px-6 pt-28 pb-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10"
      >
        <div>
          <p className="hero-badge mb-5 inline-flex rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em]">
            {strings.hero.badge}
          </p>
          <h1 className="tone-heading font-heading text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            {strings.hero.headlineLead}
            <ThemePrecisionText />
          </h1>
          <p className="tone-body mt-6 max-w-2xl text-base leading-8 sm:text-lg">
            {strings.hero.subtitle}
          </p>
          <p className="tone-muted mt-4 text-sm sm:text-base">
            {strings.hero.specializingLabel} <Typewriter words={typingSkills} />
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">
              {strings.buttons.viewProjects}
            </a>
            <a href="#contact" className="btn-secondary">
              {strings.buttons.contact}
            </a>
            <a href={profile.cvPath} className="btn-secondary" download>
              {strings.buttons.downloadCv}
            </a>
          </div>
        </div>

        <div className="hero-panel mt-14 lg:mt-0">
          <p className="tone-accent-b text-xs uppercase tracking-[0.28em]">{strings.hero.profileTag}</p>
          <h2 className="tone-heading mt-3 font-heading text-3xl font-bold">{profile.name}</h2>
          <p className="tone-body mt-2">{strings.hero.profileRole}</p>
          <p className="tone-muted mt-6 text-sm leading-7">{strings.hero.profileSummary}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            <div className="stat-chip">
              <span>{heroStats.storiesCount}</span>
              <small>{strings.hero.statStories}</small>
            </div>
            <div className="stat-chip">
              <span>{heroStats.leetcodeCount}</span>
              <small>{strings.hero.statLeetCode}</small>
            </div>
            <div className="stat-chip">
              <span>{heroStats.codechefRank}</span>
              <small>{strings.hero.statCodeChef}</small>
            </div>
            <div className="stat-chip">
              <span>{heroStats.certCount}</span>
              <small>{strings.hero.statCerts}</small>
            </div>
          </div>
        </div>
      </section>

      <BreathingDivider text={strings.dividers[0]} />

      <section id="about" className="section-wrap breath-section mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={strings.sections.about.eyebrow}
          title={strings.sections.about.title}
          description={strings.sections.about.description}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {strings.aboutCards.map((card) => (
            <article key={card.title} className="glass-card">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-text">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <BreathingDivider text={strings.dividers[1]} />

      <section id="skills" className="section-wrap breath-section mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={strings.sections.skills.eyebrow}
          title={strings.sections.skills.title}
          description={strings.sections.skills.description}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <article key={category.title} className="skill-card">
              <h3 className="card-title">{category.title}</h3>
              <p className="tone-body mt-3 text-sm leading-7">{category.items.join(" | ")}</p>
              <div className="skill-track mt-6 h-2 rounded-full">
                <div
                  className="skill-glow-bar"
                  style={{ width: `${category.progress}%` }}
                  aria-label={`${category.title} proficiency ${category.progress}%`}
                />
              </div>
              <p className="tone-accent-a mt-3 text-xs font-semibold uppercase tracking-[0.16em]">
                Proficiency: {category.progress}%
              </p>
            </article>
          ))}
        </div>
      </section>

      <BreathingDivider text={strings.dividers[2]} />

      <section id="projects" className="section-wrap breath-section mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={strings.sections.projects.eyebrow}
          title={strings.sections.projects.title}
          description={strings.sections.projects.description}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            (() => {
              const hasDemo = Boolean(project.demo && project.demo !== "#");
              const hasGithub = Boolean(project.github && project.github !== "#");

              return (
                <article key={project.title} className="project-card">
                  <p className="tone-accent-b text-xs uppercase tracking-[0.24em]">{project.type}</p>
                  <h3 className="tone-heading mt-3 font-heading text-2xl font-bold">{project.title}</h3>
                  <p className="tone-body mt-4 text-sm leading-7">{project.description}</p>
                  <p className="tone-accent-a mt-5 text-xs uppercase tracking-[0.16em]">
                    {project.stack.join(" | ")}
                  </p>
                  {hasDemo || hasGithub ? (
                    <div className="mt-7 flex flex-wrap gap-3">
                      {hasDemo ? (
                        <a href={project.demo} className="btn-primary" target="_blank" rel="noreferrer">
                          Live Demo
                        </a>
                      ) : null}
                      {hasGithub ? (
                        <a href={project.github} className="btn-secondary" target="_blank" rel="noreferrer">
                          GitHub
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              );
            })()
          ))}
        </div>
      </section>

      <BreathingDivider text={strings.dividers[3]} />

      <section id="experience" className="section-wrap breath-section mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={strings.sections.experience.eyebrow}
          title={strings.sections.experience.title}
        />
        <article className="glass-card">
          <p className="tone-accent-b text-xs uppercase tracking-[0.24em]">
            {strings.experienceTimeline}
          </p>
          <ul className="tone-body mt-5 space-y-3 text-sm leading-7">
            {strings.experienceBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
      </section>

      <BreathingDivider text={strings.dividers[4]} />

      <section id="achievements" className="section-wrap breath-section mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={strings.sections.achievements.eyebrow}
          title={strings.sections.achievements.title}
        />
        <div className="grid gap-5 md:grid-cols-2">
          <article className="glass-card">
            <h3 className="card-title">{strings.achievementTitles.competitive}</h3>
            <ul className="tone-body mt-4 space-y-3 text-sm">
              {strings.achievementBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="glass-card">
            <h3 className="card-title">{strings.achievementTitles.certifications}</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {certifications.map((certification) => (
                <span key={certification} className="badge-glow">
                  {certification}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <BreathingDivider text={strings.dividers[5]} />

      <section id="contact" className="section-wrap breath-section mx-auto max-w-6xl px-6 pb-16">
        <SectionHeading
          eyebrow={strings.sections.contact.eyebrow}
          title={strings.sections.contact.title}
          description={strings.sections.contact.description}
        />
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="glass-card">
            <h3 className="card-title">{strings.connectTitle}</h3>
            <ul className="tone-body mt-5 space-y-4 text-sm">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <p className="tone-accent-a mb-1 text-xs uppercase tracking-[0.18em]">{item.label}</p>
                  <a href={item.href} className="social-link" target="_blank" rel="noreferrer">
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </article>
          <form className="contact-card" onSubmit={handleContactSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span>{strings.contactForm.name}</span>
                <input type="text" name="name" placeholder={strings.contactForm.namePlaceholder} />
              </label>
              <label>
                <span>{strings.contactForm.email}</span>
                <input type="email" name="email" placeholder={strings.contactForm.emailPlaceholder} />
              </label>
            </div>
            <label>
              <span>{strings.contactForm.subject}</span>
              <input type="text" name="subject" placeholder={strings.contactForm.subjectPlaceholder} />
            </label>
            <label>
              <span>{strings.contactForm.message}</span>
              <textarea
                name="message"
                rows={5}
                placeholder={strings.contactForm.messagePlaceholder}
              />
            </label>
            <button type="submit" className="btn-primary mt-2 w-full sm:w-auto">
              {strings.buttons.send}
            </button>
          </form>
        </div>
      </section>

      <footer className="site-footer py-8 text-center text-xs uppercase tracking-[0.22em]">
        {strings.footerQuote}
      </footer>
    </main>
  );
}
