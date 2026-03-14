import { useEffect, useState } from "react";

function WaveMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 44 12" fill="none" aria-hidden="true">
      <path d="M1 6h7l3-4 4 8 4-6h6l3-3 3 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrandName({ className = "" }) {
  return (
    <span className={`brand-red brand-name ${className}`}>
      <span className="brand-name-text">Rayleigh<span className="brand-new"> Stark</span></span>
      <WaveMark className="brand-ekg" />
    </span>
  );
}

function Typewriter({ text, speed = 45, delay = 400 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return (
    <span className="ln-brand-tagline">
      <span>{displayed}</span>
      <WaveMark className={`ln-typewriter-ekg ${displayed.length >= text.length ? "ln-typewriter-ekg--done" : ""}`} />
    </span>
  );
}

function BoltIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 5 6v6c0 5 3.4 8.3 7 9 3.6-.7 7-4 7-9V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12h5l2-4 3 8 2-4h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GraphIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19V5M4 19h16M8 14l3-3 3 2 4-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 14 14 10M8.5 17.5 6 20a4 4 0 1 1-5.7-5.6L3 12M15.5 6.5 18 4a4 4 0 1 1 5.7 5.6L21 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="m15.8 8.2-2.2 5.6-5.4 2.2 2.2-5.4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

const CALENDLY_EXEC_BRIEFING_URL = "https://calendly.com/tonykkwawu/30min";
const CONTACT_EMAIL = "contact@rayleighstark.com";
const NAV_LINKS = [
  { href: "/about.html", label: "About" },
  { href: "#services", label: "Services" },
  { href: "/operator-notes.html", label: "Operator Notes" },
  { href: "#approach", label: "Approach" },
  { href: "#journey", label: "Impact" },
  { href: "#contact", label: "Contact" }
];

function ContactForm() {
  const bookingHref = CALENDLY_EXEC_BRIEFING_URL.includes("your-link") ? "#contact" : CALENDLY_EXEC_BRIEFING_URL;

  return (
    <section className="ln-section ln-contact" id="contact">
      <span className="ln-sec-num" aria-hidden="true">10</span>
      <p className="ln-section-eyebrow">Let&apos;s Talk</p>
      <h2 className="ln-section-heading">Schedule a conversation</h2>
      <p className="ln-section-sub">
        Pick a time and we&apos;ll discuss your priorities across research platforms, data infrastructure, AI systems, and fintech execution.
      </p>

      <div className="ln-contact-actions">
        <a className="ln-btn ln-btn--primary" href={bookingHref} target="_blank" rel="noopener noreferrer">
          Discuss a Mandate
        </a>
      </div>
      <p className="ln-contact-email">
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </section>
  );
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openServiceGroup, setOpenServiceGroup] = useState("entry");
  const executiveBriefingHref = CALENDLY_EXEC_BRIEFING_URL.includes("your-link") ? "#contact" : CALENDLY_EXEC_BRIEFING_URL;

  useEffect(() => {
    const scrollToHashTarget = () => {
      const hash = window.location.hash;
      if (!hash) {
        return;
      }

      const target = document.querySelector(hash);
      if (!target) {
        return;
      }

      requestAnimationFrame(() => {
        target.scrollIntoView({ block: "start" });
      });
    };

    const timeoutId = window.setTimeout(scrollToHashTarget, 80);
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <div className="landing">
      <div className="ln-page-frame">
      <nav className="ln-nav">
        <div className="ln-nav-inner">
          <button
            type="button"
            className={`ln-menu-toggle ${menuOpen ? "is-open" : ""}`}
            aria-expanded={menuOpen}
            aria-controls="site-nav-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <a className="ln-logo" href="#top">
            <div className="ln-logo-block">
              <span className="ln-logo-text"><BrandName /></span>
              <Typewriter text="operator-led advisory for high-consequence systems." speed={50} delay={600} />
            </div>
          </a>
          <div className="ln-nav-links">
            {NAV_LINKS.map((link) => (
              <a href={link.href} key={link.href}>{link.label}</a>
            ))}
          </div>
          <a className="ln-btn ln-btn--outline ln-btn--sm" href={executiveBriefingHref}>
            Discuss a Mandate
          </a>
        </div>
        <div
          className={`ln-nav-drawer ${menuOpen ? "is-open" : ""}`}
          id="site-nav-menu"
        >
          {NAV_LINKS.map((link) => (
            <a
              href={link.href}
              key={`drawer-${link.href}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="ln-hero-area" id="top">
        <section className="ln-hero ln-hero--light">
          <div className="ln-hero-icons" aria-hidden="true">
            <svg className="ln-hero-icon ln-hero-icon--1" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v15" /><circle cx="12" cy="5" r="1.5" /><path d="M7 13a5 5 0 0 0 10 0" /><path d="M5 13H3M21 13h-2" /></svg>
            <svg className="ln-hero-icon ln-hero-icon--2 ln-hero-icon--dark" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="1.8" /><path d="M12 5v2.5M12 16.5V19M5 12h2.5M16.5 12H19M7.1 7.1l1.8 1.8M15.1 15.1l1.8 1.8M16.9 7.1l-1.8 1.8M8.9 15.1l-1.8 1.8" /></svg>
            <svg className="ln-hero-icon ln-hero-icon--3" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21h6" /><path d="M10 21l1.3-11h1.4L14 21" /><path d="M9.5 10h5M10.5 7h3" /><path d="M12 3l2 4h-4z" /><path d="M14 11l6-2M10 11l-6-2" /></svg>
            <svg className="ln-hero-icon ln-hero-icon--4 ln-hero-icon--dark" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8" /><path d="M14.8 9.2l-2.1 5.6-5.5 2.2 2.2-5.6z" /><circle cx="12" cy="12" r="1" /></svg>
          </div>

          <h1 className="ln-hero-heading">
            <img
              className="ln-hero-motif"
              src="./src/images/hero-workflow-illustration-2.jpg"
              alt=""
              aria-hidden="true"
            />
            Operator-led advisory for institutions where{" "}
            <span className="ln-hero-wellbeing">
              <span className="ln-hero-accent">outcomes</span> matter
              <svg className="ln-hero-scribble" viewBox="0 0 260 18" fill="none" aria-hidden="true">
                <path d="M2 10h34l11-6 13 12 16-9h27l12-5 12 10h23l10-7 12 11h26l9-6h41" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </h1>

          <p className="ln-hero-sub">
            Operator-led advisory on AI, data platforms, product systems, and financial infrastructure. Built on Wall Street and applied to fintech, research, and complex operating environments.
          </p>

          <div className="ln-hero-actions">
            <a className="ln-btn ln-btn--primary" href="#services">View Services</a>
            <a href="#approach" className="ln-btn ln-btn--ghost">How We Work</a>
          </div>

          <div className="ln-hero-image-wrap ln-hero-image-wrap--composite">
            <img
              className="ln-hero-image ln-hero-image--left"
              src="./src/images/hero-clock-abstract.jpg"
              alt="Abstract close-up of a clock with colored numbers"
            />
            <img
              className="ln-hero-image ln-hero-image--right"
              src="./src/images/hero-meeting.jpg"
              alt="Professionals in a collaborative business meeting"
            />
          </div>
        </section>
      </div>

      <section className="ln-trust">
        <div className="ln-trust-row">
          <span><span className="ln-trust-icon"><BoltIcon /></span> Product and platform advisory for institutional teams</span>
          <span><span className="ln-trust-icon"><ShieldIcon /></span> AI governance, data architecture, and control design</span>
          <span><span className="ln-trust-icon"><SparkIcon /></span> Delivery mandates across regulated, capital-intensive, and high-consequence environments</span>
        </div>
      </section>

      <section className="ln-section ln-exec-stats" id="execution">
        <p className="ln-section-eyebrow">Execution Standard</p>
        <h2 className="ln-section-heading">Designed for measurable commercial impact and control</h2>
        <p className="ln-section-sub">
          Built on Wall Street operating discipline, we focus on faster cycle time, stronger visibility, and tighter control in live systems.
        </p>
        <div className="ln-exec-grid">
          <article>
            <i><PulseIcon /></i>
            <strong>Cycle time</strong>
            <span>Shorter decision loops from signal to action.</span>
          </article>
          <article>
            <i><GraphIcon /></i>
            <strong>Throughput</strong>
            <span>More decisions handled without expanding team size.</span>
          </article>
          <article>
            <i><LinkIcon /></i>
            <strong>Control</strong>
            <span>Policy-bound execution with evidence-ready audit trails.</span>
          </article>
          <article>
            <i><CompassIcon /></i>
            <strong>Clarity</strong>
            <span>Leadership visibility across risk, speed, and value.</span>
          </article>
        </div>
      </section>

      <section className="ln-section" id="services">
        <span className="ln-sec-num" aria-hidden="true">01</span>
        <p className="ln-section-eyebrow">Ways to Engage</p>
        <h2 className="ln-section-heading">Three clear entry points</h2>
        <p className="ln-section-sub">
          Choose the level of support that matches your current mandate.
        </p>
        <div className="ln-features-grid ln-features-grid--three">
          <article className="ln-feature-card">
            <h3>Diagnostic</h3>
            <p>A focused review of product, platform, data, or operating constraints with clear recommendations and decision support.</p>
            <a className="ln-feature-link" href="/service-platform-diagnostic.html">View diagnostic</a>
          </article>
          <article className="ln-feature-card">
            <h3>Sprint</h3>
            <p>A short, high-intensity engagement to unblock a specific strategic or technical priority and move it into execution.</p>
            <a className="ln-feature-link" href="/service-product-workflow-sprint.html">View sprint</a>
          </article>
          <article className="ln-feature-card">
            <h3>Fractional Leadership</h3>
            <p>Senior product, platform, and AI leadership for teams navigating complex builds, operating change, or critical transitions.</p>
            <a className="ln-feature-link" href="/service-fractional-ai-leadership.html">View leadership model</a>
          </article>
        </div>
      </section>

      <section className="ln-logo-band" id="execution">
        <div className="ln-logo-band-inner">
          <p className="ln-logo-band-title">Execution Standard</p>
          <div className="ln-standard-band">
            <div className="ln-standard-copy">
              <h2>Built to Wall Street standards</h2>
              <p>Operator discipline, controlled delivery, and commercial sharpness for institutions where mistakes are expensive.</p>
            </div>
            <div className="ln-standard-dial" aria-hidden="true">
              <span className="ln-standard-end">Idea</span>
              <div className="ln-standard-instrument">
                <div className="ln-standard-track">
                  <span className="ln-standard-tick ln-standard-tick--short" />
                  <span className="ln-standard-tick" />
                  <span className="ln-standard-tick ln-standard-tick--tall" />
                  <span className="ln-standard-tick" />
                  <span className="ln-standard-tick ln-standard-tick--short" />
                  <span className="ln-standard-tick" />
                  <span className="ln-standard-tick ln-standard-tick--tall" />
                  <span className="ln-standard-tick" />
                  <span className="ln-standard-tick ln-standard-tick--short" />
                </div>
                <div className="ln-standard-marker">
                  <span className="ln-standard-marker-core" />
                  <span className="ln-standard-marker-stem" />
                  <span className="ln-standard-marker-arm" />
                  <span className="ln-standard-marker-weight ln-standard-marker-weight--left" />
                  <span className="ln-standard-marker-weight ln-standard-marker-weight--right" />
                </div>
                <div className="ln-standard-scale">
                  <span>01</span>
                  <span>05</span>
                  <span>10</span>
                </div>
              </div>
              <span className="ln-standard-end">Execution</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ln-section ln-mandate-triggers" id="mandates">
        <span className="ln-sec-num" aria-hidden="true">02</span>
        <p className="ln-section-eyebrow">Selected Capabilities</p>
        <h2 className="ln-section-heading">Mandate areas we are brought in to solve</h2>
        <p className="ln-section-sub">
          Structured around the decisions and systems that move commercial outcomes.
        </p>
        <div className="ln-trigger-grid">
          <article className="ln-trigger-card">
            <strong>Product and operating design</strong>
            <p>Decision workflows, platform adoption, rollout sequencing, and operating cadence for teams under pressure.</p>
          </article>
          <article className="ln-trigger-card">
            <strong>Data and platform architecture</strong>
            <p>Data models, integration design, APIs, and decision-serving layers that work in production.</p>
          </article>
          <article className="ln-trigger-card">
            <strong>AI and research systems</strong>
            <p>Model-enabled workflows with oversight, escalation, and clear evidence paths for high-trust teams.</p>
          </article>
          <article className="ln-trigger-card">
            <strong>Payments and financial infrastructure</strong>
            <p>Exception triage, control design, and speed improvements in transaction-intensive environments.</p>
          </article>
        </div>
      </section>

      <section className="ln-section ln-showcase" id="journey">
        <span className="ln-sec-num" aria-hidden="true">03</span>
        <p className="ln-section-eyebrow">Who We Help</p>
        <h2 className="ln-section-heading">Teams with complex systems and expensive mistakes</h2>
        <p className="ln-section-sub">
          We work with teams that need operator judgment, not presentation-only advice.
        </p>
        <div className="ln-trigger-grid">
          <article className="ln-trigger-card">
            <strong>Fintech and payments platforms</strong>
            <p>Operators modernizing transaction workflows, controls, and platform reliability.</p>
          </article>
          <article className="ln-trigger-card">
            <strong>Research and data product teams</strong>
            <p>Organizations turning fragmented analysis into reusable decision systems.</p>
          </article>
          <article className="ln-trigger-card">
            <strong>Internal platform teams</strong>
            <p>Large organizations with operational complexity across products, data, and governance.</p>
          </article>
          <article className="ln-trigger-card">
            <strong>Leadership in live transformation</strong>
            <p>Founders and senior operators carrying high-stakes delivery mandates with limited room for drift.</p>
          </article>
        </div>
      </section>

      <section className="ln-section ln-workflow" id="approach">
        <span className="ln-sec-num" aria-hidden="true">04</span>
        <p className="ln-section-eyebrow">How We Work</p>
        <h2 className="ln-section-heading">Diagnostic, design, implementation, handoff</h2>
        <p className="ln-section-sub">
          Clear operator judgment, technical depth, and execution realism from first assessment through live handoff.
        </p>
        <div className="ln-workflow-diagram">
          <div><b>01</b><span>Diagnostic</span><p>Find where product, data, controls, and ownership are breaking performance.</p></div>
          <div><b>02</b><span>Design</span><p>Set the workflow, architecture, and decision model needed to execute.</p></div>
          <div><b>03</b><span>Implementation</span><p>Build and embed changes in production with weekly decision support.</p></div>
          <div><b>04</b><span>Handoff</span><p>Transfer controls, documentation, and operating cadence to internal teams.</p></div>
        </div>
      </section>

      <section className="ln-implementation-atlas" aria-label="Implementation illustrations">
        <div className="ln-implementation-atlas-grid">
          <figure className="ln-atlas-image-card ln-atlas-image-card--wide">
            <img
              src="./src/images/atlas-brain-network.jpg"
              alt="Stylized brain with neural network connections"
            />
            <figcaption className="ln-atlas-overlay">
              <strong>Unified operating picture</strong>
              <span>One trusted view across inputs, systems, and workflows.</span>
            </figcaption>
          </figure>
          <figure className="ln-atlas-image-card">
            <img
              src="./src/images/service-product-platform-design-3.jpg"
              alt="Abstract infrastructure illustration"
            />
            <figcaption className="ln-atlas-overlay">
              <strong>Production-ready workflows</strong>
              <span>AI-assisted triage and enrichment shaped around real work.</span>
            </figcaption>
          </figure>
          <figure className="ln-atlas-image-card">
            <img
              src="./src/images/atlas-financial-graph.jpg"
              alt="Financial graph showing upward and downward movement"
            />
            <figcaption className="ln-atlas-overlay">
              <strong>Governed delivery</strong>
              <span>Controls, escalation paths, and audit trails built in.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="ln-section" id="service-library">
        <span className="ln-sec-num" aria-hidden="true">05</span>
        <p className="ln-section-eyebrow">Service Library</p>
        <h2 className="ln-section-heading">Detailed mandates and service pages</h2>
        <p className="ln-section-sub">
          Deeper service descriptions, scope examples, and use-case detail.
        </p>

        <div className={`ln-service-group ${openServiceGroup === "entry" ? "is-open" : ""}`}>
          <button
            type="button"
            className="ln-service-group-toggle"
            aria-expanded={openServiceGroup === "entry"}
            aria-controls="service-group-entry"
            onClick={() => setOpenServiceGroup((current) => current === "entry" ? "" : "entry")}
          >
            <span>Entry</span>
            <span className="ln-service-group-meta">4 services</span>
          </button>
          <div className="ln-service-group-panel" id="service-group-entry">
            <div className="ln-service-group-panel-inner">
              <div className="ln-features-grid ln-features-grid--three">
                <article className="ln-feature-card">
                  <h3>Product Workflow Sprint</h3>
                  <p>A focused sprint to shape operator-facing workflows, decision interfaces, and rollout logic before committing to a larger product or platform build.</p>
                  <a className="ln-feature-link" href="/service-product-workflow-sprint.html">Read breakdown</a>
                </article>
                <article className="ln-feature-card">
                  <h3>Instant Payments Decision-Speed Sprint</h3>
                  <p>A focused 90-day engagement for FedNow, RTP, ACH, Faster Payments, and SWIFT operations. We reduce exception latency and improve control under live conditions.</p>
                  <a className="ln-feature-link" href="/service-ai-payments-acceleration.html">Read breakdown</a>
                </article>
                <article className="ln-feature-card">
                  <h3>Platform and Data Infrastructure Diagnostic</h3>
                  <p>A 4-week assessment of your research platforms, data pipelines, API architecture, and decision systems. We deliver a prioritized remediation roadmap with commercial impact estimates.</p>
                  <a className="ln-feature-link" href="/service-platform-diagnostic.html">Read breakdown</a>
                </article>
                <article className="ln-feature-card">
                  <h3>Fractional CPO / CTO</h3>
                  <p>Embedded product and technology leadership. Roadmap ownership, cross-functional governance, and hands-on delivery acceleration.</p>
                  <a className="ln-feature-link" href="/service-fractional-ai-leadership.html">Read breakdown</a>
                </article>
              </div>
            </div>
          </div>
        </div>

        <div className={`ln-service-group ${openServiceGroup === "core" ? "is-open" : ""}`}>
          <button
            type="button"
            className="ln-service-group-toggle"
            aria-expanded={openServiceGroup === "core"}
            aria-controls="service-group-core"
            onClick={() => setOpenServiceGroup((current) => current === "core" ? "" : "core")}
          >
            <span>Core</span>
            <span className="ln-service-group-meta">5 services</span>
          </button>
          <div className="ln-service-group-panel" id="service-group-core">
            <div className="ln-service-group-panel-inner">
              <div className="ln-features-grid ln-features-grid--three">
                <article className="ln-feature-card">
                  <h3>Data Infrastructure and Decision Layers</h3>
                  <p>Unified data architecture for fragmented systems, external inputs, and operator workflows. Ingestion, entity resolution, feature engineering, and decision-serving layers.</p>
                  <a className="ln-feature-link" href="/service-intelligent-data-pipelines.html">Read breakdown</a>
                </article>
                <article className="ln-feature-card">
                  <h3>Autonomous Operations</h3>
                  <p>Policy-governed workflows that execute operational decisions autonomously, with approval checkpoints, escalation logic, and full auditability.</p>
                  <a className="ln-feature-link" href="/service-agentic-ai-operations.html">Read breakdown</a>
                </article>
                <article className="ln-feature-card">
                  <h3>Decision Reliability Engineering</h3>
                  <p>Model reliability, observability, and fallback design for regulated, audit-sensitive, and high-consequence decisions.</p>
                  <a className="ln-feature-link" href="/service-decision-reliability-engineering.html">Read breakdown</a>
                </article>
                <article className="ln-feature-card">
                  <h3>Escrow Intelligence Automation</h3>
                  <p>Automated release logic and dispute triage for multi-party escrow, covering fiat settlement, digital assets, and cross-border holding structures.</p>
                  <a className="ln-feature-link" href="/service-escrow-intelligence-automation.html">Read breakdown</a>
                </article>
                <article className="ln-feature-card">
                  <h3>Cloud Cost Control and Infrastructure Efficiency</h3>
                  <p>Cloud cost discipline across AWS, on-prem, and Kubernetes environments, with architectural fixes that reduce waste without weakening resilience.</p>
                  <a className="ln-feature-link" href="/service-cloud-cost-control.html">Read breakdown</a>
                </article>
              </div>
            </div>
          </div>
        </div>

        <div className={`ln-service-group ${openServiceGroup === "strategic" ? "is-open" : ""}`}>
          <button
            type="button"
            className="ln-service-group-toggle"
            aria-expanded={openServiceGroup === "strategic"}
            aria-controls="service-group-strategic"
            onClick={() => setOpenServiceGroup((current) => current === "strategic" ? "" : "strategic")}
          >
            <span>Strategic</span>
            <span className="ln-service-group-meta">4 services</span>
          </button>
          <div className="ln-service-group-panel" id="service-group-strategic">
            <div className="ln-service-group-panel-inner">
              <div className="ln-features-grid ln-features-grid--three">
                <article className="ln-feature-card">
                  <h3>Technology Due Diligence</h3>
                  <p>Independent review of technology, data, and AI stacks, including controls, architecture maturity, and execution risk, for leadership and investors.</p>
                  <a className="ln-feature-link" href="/service-ai-due-diligence.html">Read breakdown</a>
                </article>
                <article className="ln-feature-card">
                  <h3>Product and Platform Design</h3>
                  <p>Decision interfaces, human-in-the-loop workflows, and platform experiences that make intelligent systems usable and trusted.</p>
                  <a className="ln-feature-link" href="/service-ai-product-workflow-design.html">Read breakdown</a>
                </article>
                <article className="ln-feature-card">
                  <h3>M&amp;A and Advisory Intelligence</h3>
                  <p>Automated diligence extraction and deal signal scoring for CIM, QoE, NWC, TSA, SPA, carve-out, and PMI workflows.</p>
                  <a className="ln-feature-link" href="/service-ma-advisory-intelligence.html">Read breakdown</a>
                </article>
                <article className="ln-feature-card">
                  <h3>Private Markets Technology, Diligence, and Research</h3>
                  <p>Technology diligence and research support for private markets teams evaluating platforms, operating risk, data maturity, and execution readiness.</p>
                  <a className="ln-feature-link" href="/service-private-markets-technology.html">Read breakdown</a>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ln-editorial-ribbon" aria-label="Execution visuals">
        <img src="./src/images/ribbon-strategy-session.jpg" alt="Advisory team in strategic execution session" />
        <img src="./src/images/ribbon-analytics-workspace.jpg" alt="Fintech analytics workspace" />
        <img src="./src/images/ribbon-control-room.jpg" alt="High-performance product and engineering control room" />
      </section>

      <section className="ln-section ln-case-studies" id="case-studies">
        <span className="ln-sec-num" aria-hidden="true">06</span>
        <p className="ln-section-eyebrow">Selected Mandates</p>
        <h2 className="ln-section-heading">Recent work, framed for institutional buyers</h2>
        <p className="ln-section-sub">
          These examples are anonymized by design. The goal is to show mandate shape, intervention, and measurable result.
        </p>
        <div className="ln-case-grid">
          <article className="ln-case-card">
            <div className="ln-case-head">
              <span className="ln-case-tag">Tier 1 bank</span>
              <strong>Research and analytics platform rebuild</strong>
            </div>
            <p className="ln-case-summary">
              Mandate: replace fragmented research workflows, unify internal and third-party data inputs, and give senior teams a governed decision layer with clearer auditability.
            </p>
            <div className="ln-case-metrics">
              <div><b>42%</b><span>faster analyst prep time</span></div>
              <div><b>31%</b><span>drop in manual data handling</span></div>
              <div><b>1</b><span>shared operating layer across teams</span></div>
            </div>
          </article>
          <article className="ln-case-card ln-case-card--accent">
            <div className="ln-case-head">
              <span className="ln-case-tag">Payments operator</span>
              <strong>Exception triage and decision-speed programme</strong>
            </div>
            <p className="ln-case-summary">
              Mandate: tighten exception handling across live transaction operations, introduce policy-bound AI triage, and reduce cycle time without weakening control.
            </p>
            <div className="ln-case-metrics">
              <div><b>55%</b><span>faster exception routing</span></div>
              <div><b>28%</b><span>more throughput at same team size</span></div>
              <div><b>100%</b><span>decision traceability for escalations</span></div>
            </div>
          </article>
          <article className="ln-case-card">
            <div className="ln-case-head">
              <span className="ln-case-tag">Climate startup</span>
              <strong>Data, cloud, and cost operating model reset</strong>
            </div>
            <p className="ln-case-summary">
              Mandate: restructure fragmented data workflows, tighten cloud architecture, and build a cost-conscious operating model so the team could scale without burning capital into avoidable infrastructure sprawl.
            </p>
            <div className="ln-case-metrics">
              <div><b>47%</b><span>reduction in cloud run-rate</span></div>
              <div><b>3.2x</b><span>faster delivery from data request to usable output</span></div>
              <div><b>9 months</b><span>of additional operating runway unlocked</span></div>
            </div>
          </article>
          <article className="ln-case-card ln-case-card--accent">
            <div className="ln-case-head">
              <span className="ln-case-tag">Private investors</span>
              <strong>Market insight engine for opportunity discovery</strong>
            </div>
            <p className="ln-case-summary">
              Mandate: build a market intelligence workflow that pulled fragmented signals into one operating view, so investors could identify opportunities earlier and spend more time on high-conviction situations.
            </p>
            <div className="ln-case-metrics">
              <div><b>4.1x</b><span>increase in screened opportunities reviewed at conviction level</span></div>
              <div><b>61%</b><span>faster time from signal to investment memo</span></div>
              <div><b>2x</b><span>more live opportunities advanced without adding analyst headcount</span></div>
            </div>
          </article>
        </div>
      </section>

      <section className="ln-section ln-proof-artifact" id="proof-artifact">
        <span className="ln-sec-num" aria-hidden="true">07</span>
        <p className="ln-section-eyebrow">Proof Artifact</p>
        <h2 className="ln-section-heading">A workflow proof tied to a real service outcome</h2>
        <p className="ln-section-sub">
          Example: payments exception triage. The work is not a dashboard. It is the operating path from raw event to governed action, with measurable improvement in speed and control.
        </p>
        <div className="ln-proof-artifact-grid">
          <div className="ln-proof-board" aria-label="Payments exception triage workflow">
            <div className="ln-proof-board-head">
              <span>Payments decision-speed sprint</span>
              <strong>Exception workflow</strong>
            </div>
            <div className="ln-proof-flow">
              <span>Event intake</span>
              <span>Context enrich</span>
              <span>Risk score</span>
              <span>Route or escalate</span>
              <span>Action + audit</span>
            </div>
            <div className="ln-proof-rails">
              <div>
                <b>Inputs</b>
                <span>RTP, ACH, SWIFT, case notes</span>
              </div>
              <div>
                <b>Controls</b>
                <span>policy rules, human checkpoint, evidence log</span>
              </div>
              <div>
                <b>Outcome</b>
                <span>faster resolution with traceable decisions</span>
              </div>
            </div>
          </div>
          <aside className="ln-proof-outcome">
            <h3>Measured shift</h3>
            <div className="ln-proof-outcome-grid">
              <div><strong>Before</strong><span>Manual routing, inconsistent escalation, weak visibility</span></div>
              <div><strong>After</strong><span>Scored triage, approval logic, and evidence-ready audit path</span></div>
              <div><strong>Commercial result</strong><span>Faster queue movement, fewer avoidable delays, stronger control in live operations</span></div>
            </div>
            <a className="ln-feature-link" href="/service-ai-payments-acceleration.html">See the service</a>
          </aside>
        </div>
      </section>

      <section className="ln-section" id="research-proof">
        <span className="ln-sec-num" aria-hidden="true">08</span>
        <p className="ln-section-eyebrow">Proof Vignette</p>
        <h2 className="ln-section-heading">From analyst-owned scripts to governed research infrastructure</h2>
        <section className="ln-hero-caseproof" aria-label="Research infrastructure proof point">
          <div className="ln-hero-caseproof-copy">
            <p>
              Analysts and research teams were backtesting markets and testing index ideas through individually maintained scripts. Each desk had its own version. Results were not reproducible. Client simulations moved only as fast as the one analyst who knew the right script.
            </p>
            <div className="ln-hero-caseproof-notes">
              <article>
                <strong>Intervention</strong>
                <span>Mapped the live script landscape, identified the 20% of workflows covering 80% of use cases, and productised them first into reusable AWS services.</span>
              </article>
              <article>
                <strong>Platform shift</strong>
                <span>Built shared libraries, governed data pipelines, compute services, and a client-facing simulation layer so scenarios no longer depended on one analyst.</span>
              </article>
              <article>
                <strong>Adoption</strong>
                <span>Did not force migration. Made the new platform the easier path and moved teams across with research-lead support.</span>
              </article>
            </div>
            <div className="ln-hero-caseproof-actions">
              <a className="ln-feature-link" href="/case-study-governed-research-infrastructure.html">Read full case study</a>
              <span>Shared standard. Reusable services. Faster client simulations.</span>
            </div>
          </div>
          <div className="ln-hero-caseproof-board">
            <div className="ln-caseproof-flow">
              <div>
                <b>Analyst scripts</b>
                <span>person-dependent logic</span>
              </div>
              <div>
                <b>Pattern mapping</b>
                <span>20% covering 80%</span>
              </div>
              <div>
                <b>Shared libraries</b>
                <span>versioned research logic</span>
              </div>
              <div>
                <b>AWS services</b>
                <span>governed compute + data</span>
              </div>
              <div>
                <b>Client simulation</b>
                <span>direct scenario testing</span>
              </div>
              <div>
                <b>Auditable outputs</b>
                <span>reproducible results</span>
              </div>
            </div>
            <div className="ln-caseproof-visuals">
              <figure className="ln-caseproof-panel">
                <img src="./src/images/atlas-financial-graph.jpg" alt="Financial chart illustration" />
                <figcaption>Research demand moved from desk-owned logic to reusable simulation infrastructure.</figcaption>
              </figure>
              <figure className="ln-caseproof-panel ln-caseproof-panel--accent">
                <img src="./src/images/service-data-infrastructure-2.jpg" alt="Data centre cabling and infrastructure" />
                <figcaption>Shared services, pipelines, controls, and compute replaced fragmented analyst scripts.</figcaption>
              </figure>
            </div>
            <div className="ln-caseproof-results">
              <div><strong>Faster turnaround</strong><span>Client simulation requests no longer waited on a specific analyst.</span></div>
              <div><strong>Shared standard</strong><span>Teams stopped duplicating logic and started using versioned libraries.</span></div>
              <div><strong>Leadership visibility</strong><span>Research activity became visible, attributable, and governable.</span></div>
            </div>
          </div>
        </section>
      </section>

      <section className="ln-section" id="operator-map">
        <span className="ln-sec-num" aria-hidden="true">09</span>
        <p className="ln-section-eyebrow">Operator System Map</p>
        <h2 className="ln-section-heading">How decision infrastructure is structured in production</h2>
        <div className="ln-hero-proof" aria-label="Decision infrastructure system map">
          <div className="ln-hero-proof-main">
            <div className="ln-hero-proof-head">
              <span className="ln-proof-kicker">System map</span>
              <span className="ln-proof-status">Policy-bound</span>
            </div>
            <div className="ln-hero-proof-grid">
              <article className="ln-proof-column">
                <span className="ln-proof-label">Signals</span>
                <div className="ln-proof-stack">
                  <span>Market data</span>
                  <span>Internal systems</span>
                  <span>Third-party inputs</span>
                </div>
              </article>
              <article className="ln-proof-column ln-proof-column--accent">
                <span className="ln-proof-label">Decision core</span>
                <div className="ln-proof-stack">
                  <span>Entity resolution</span>
                  <span>LLM + rules orchestration</span>
                  <span>Human approval gates</span>
                </div>
              </article>
              <article className="ln-proof-column">
                <span className="ln-proof-label">Execution</span>
                <div className="ln-proof-stack">
                  <span>Recommended action</span>
                  <span>Audit trail</span>
                  <span>Outcome telemetry</span>
                </div>
              </article>
            </div>
          </div>
          <aside className="ln-hero-proof-side">
            <div className="ln-proof-metric">
              <strong>Control surface</strong>
              <span>Approvals, policy, escalation, evidence</span>
            </div>
            <div className="ln-proof-metric">
              <strong>Delivery model</strong>
              <span>Platform build, governance layer, operating rhythm</span>
            </div>
            <div className="ln-proof-trace">
              <span>Capture</span>
              <span>Enrich</span>
              <span>Score</span>
              <span>Decide</span>
              <span>Learn</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="ln-manifesto" id="manifesto">
        <div className="ln-manifesto-inner">
          <p className="ln-manifesto-kicker">Manifesto</p>
          <h2>Execution is the brand.</h2>
          <p>
            We help institutions fix high-stakes product, data, and AI execution.
            Strategy matters. Delivery, control, and visible outcomes matter more.
          </p>
          <div className="ln-manifesto-proof">
            <div className="ln-manifesto-proof-copy">
              <p className="ln-section-eyebrow">Operator Proof</p>
              <h3>Track record that reads like execution, not branding</h3>
            </div>
            <div className="ln-operator-grid">
              <div>
                <strong>Domains</strong>
                <span>Payments, research, risk, treasury, institutional operations</span>
              </div>
              <div>
                <strong>Systems</strong>
                <span>API platforms, data pipelines, analytics products, AI workflows, control layers</span>
              </div>
              <div>
                <strong>Environments</strong>
                <span>Regulated institutions, production systems, audit-sensitive workflows</span>
              </div>
              <div>
                <strong>Track record</strong>
                <span>Wall Street operating standards, cloud migration at scale, LLM analytics build-out, institutional platform ownership</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />

      <footer className="ln-footer">
        <div className="ln-footer-inner">
          <div>
            <div className="ln-logo-text ln-footer-brand"><BrandName /></div>
            <p>Operator-led advisory shaped in financial markets and applied to institutions, investors, and high-consequence teams navigating product, data, AI, and platform change. Based in London.</p>
            <p>Rayleigh Stark is a trading name of Premium Services & Network UK Ltd.</p>
            <p><a className="ln-feature-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
          </div>
          <div className="ln-footer-cols">
            <div>
              <h4>Explore</h4>
              <a href="#services">Services</a>
              <a href="#approach">Approach</a>
              <a href="#journey">Journey</a>
            </div>
            <div>
              <h4>Deep Dives</h4>
              <a href="/service-ai-payments-acceleration.html">Payments Sprint</a>
              <a href="/service-ma-advisory-intelligence.html">M&amp;A Intelligence</a>
              <a href="/service-agentic-ai-operations.html">Autonomous Ops</a>
            </div>
            <div>
              <h4>Legal</h4>
              <a href="/contact.html">Contact</a>
              <a href="/terms.html">Terms</a>
              <span>Premium Services & Network UK Ltd</span>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
