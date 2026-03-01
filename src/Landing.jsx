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
const CALENDLY_DIAGNOSTIC_URL = "https://calendly.com/tonykkwawu/30min";
const NAV_LINKS = [
  { href: "/about.html", label: "About" },
  { href: "#services", label: "Services" },
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
      <h2 className="ln-section-heading">Book a 30-minute session directly</h2>
      <p className="ln-section-sub">
        Pick a time and we&apos;ll discuss your priorities across research platforms, data infrastructure, AI systems, and fintech execution.
      </p>

      <div className="ln-contact-actions">
        <a className="ln-btn ln-btn--primary" href={bookingHref} target="_blank" rel="noopener noreferrer">
          Book Directly
        </a>
      </div>
    </section>
  );
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const executiveBriefingHref = CALENDLY_EXEC_BRIEFING_URL.includes("your-link") ? "#contact" : CALENDLY_EXEC_BRIEFING_URL;
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
            Book Executive Briefing
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
            Built in financial markets and applied where decisions carry consequence. We step into complex product, data, AI, and platform mandates, diagnose what is broken, and help leadership deliver governed systems that hold up in production.
          </p>

          <div className="ln-hero-actions">
            <a className="ln-btn ln-btn--primary" href={executiveBriefingHref}>Book Executive Briefing</a>
            <a href="#mandates" className="ln-btn ln-btn--ghost">See Mandate Triggers</a>
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

          <div className="ln-hero-proof" aria-label="Decision infrastructure system map">
            <div className="ln-hero-proof-main">
              <div className="ln-hero-proof-head">
                <span className="ln-proof-kicker">Operator system map</span>
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
      </div>

      <section className="ln-trust">
        <div className="ln-trust-row">
          <span><span className="ln-trust-icon"><BoltIcon /></span> Product and platform advisory for institutional teams</span>
          <span><span className="ln-trust-icon"><ShieldIcon /></span> AI governance, data architecture, and control design</span>
          <span><span className="ln-trust-icon"><SparkIcon /></span> Delivery mandates across regulated, capital-intensive, and high-consequence environments</span>
        </div>
      </section>

      <section className="ln-section ln-exec-stats" id="execution">
        <span className="ln-sec-num" aria-hidden="true">01</span>
        <p className="ln-section-eyebrow">Execution Standard</p>
        <h2 className="ln-section-heading">Designed for measurable commercial impact and control</h2>
        <p className="ln-section-sub">
          We target cycle-time reduction, sharper operating visibility, and stronger decision confidence across trading, risk, and operations. The point is not experimentation. It is a faster, better-governed operating model with measurable commercial upside.
        </p>
        <p className="ln-market-source">
          Market references:{" "}
          <a href="https://www.mckinsey.com/featured-insights/week-in-charts/bankings-agentic-ai-opportunity" target="_blank" rel="noopener noreferrer">Banking&apos;s agentic AI opportunity</a>
          {" "}and{" "}
          <a href="https://www.mckinsey.com/industries/financial-services/our-insights/global-banking-annual-review" target="_blank" rel="noopener noreferrer">Global Banking Annual Review</a>.
        </p>
        <div className="ln-exec-grid">
          <article>
            <i><PulseIcon /></i>
            <strong>Cycle time</strong>
            <span>Shortened decision loops from signal to action.</span>
          </article>
          <article>
            <i><GraphIcon /></i>
            <strong>Throughput</strong>
            <span>More operational decisions handled at the same team size.</span>
          </article>
          <article>
            <i><LinkIcon /></i>
            <strong>Control</strong>
              <span>Policy-bound execution with evidence-ready audit trails.</span>
            </article>
          <article>
            <i><CompassIcon /></i>
            <strong>Clarity</strong>
              <span>Leadership visibility across risk, speed, and value capture.</span>
            </article>
        </div>
      </section>

      <section className="ln-section ln-mandate-triggers" id="mandates">
        <span className="ln-sec-num" aria-hidden="true">02</span>
        <p className="ln-section-eyebrow">When to Call Us</p>
        <h2 className="ln-section-heading">Bring Rayleigh Stark in when the mandate is real, not theoretical</h2>
        <p className="ln-section-sub">
          The right moment is usually when the organisation already knows the cost of delay. These are the situations where operator-led advisory actually matters.
        </p>
        <div className="ln-trigger-grid">
          <article className="ln-trigger-card">
            <strong>Product is stalling in implementation</strong>
            <p>Roadmaps exist, but operator workflows, approvals, and adoption logic are still weak. The team keeps building without landing.</p>
          </article>
          <article className="ln-trigger-card">
            <strong>Data is fragmented across critical decisions</strong>
            <p>Signals sit across internal systems, vendor feeds, and analyst workarounds. Leadership wants one governed operating picture.</p>
          </article>
          <article className="ln-trigger-card">
            <strong>AI ambition is outrunning controls</strong>
            <p>There is pressure to deploy models or agentic workflows, but oversight, auditability, and fallback design are not where they need to be.</p>
          </article>
          <article className="ln-trigger-card">
            <strong>High-stakes change needs senior execution help</strong>
            <p>Post-merger integration, platform consolidation, payments change, or institutional transformation is underway and the internal team needs sharper delivery leadership.</p>
          </article>
        </div>
      </section>

      <section className="ln-section ln-market" id="approach">
        <span className="ln-sec-num" aria-hidden="true">03</span>
        <p className="ln-section-eyebrow">How we implement</p>
        <h2 className="ln-section-heading">From fragmented systems to governed execution</h2>
        <p className="ln-section-sub">
          Each mandate starts with diagnosis. We identify where workflow, product, data, and control gaps are slowing the business down, then move into implementation with clear owners, tighter sequencing, and measurable outcomes.
        </p>

        <div className="ln-market-grid">
          <article className="ln-market-card">
            <p className="ln-market-card-label">Where value leaks today</p>
            <div className="ln-market-metric-list">
              <div className="ln-market-metric">
                <strong>Fragmented research and data infrastructure</strong>
                <span>Critical signals across market data, internal platforms, and third-party sources sit in disconnected systems.</span>
              </div>
              <div className="ln-market-metric">
                <strong>Manual analysis bottlenecks</strong>
                <span>Analysts and portfolio teams spend too much time assembling context before reaching conviction.</span>
              </div>
              <div className="ln-market-metric">
                <strong>Low platform adoption</strong>
                <span>Teams lack trusted, well-designed AI tools that integrate into existing workflows.</span>
              </div>
            </div>
          </article>

          <article className="ln-market-card ln-market-card--accent">
            <p className="ln-market-card-label">What changes when the mandate is run properly</p>
            <div className="ln-market-metric-list">
              <div className="ln-market-metric">
                <strong>Unified operating picture</strong>
                <span>One trusted view across market data, internal systems, proprietary models, and decision workflows.</span>
              </div>
              <div className="ln-market-metric">
                <strong>Production-ready workflows</strong>
                <span>AI-assisted analysis, triage, and enrichment shaped around how teams actually work.</span>
              </div>
              <div className="ln-market-metric">
                <strong>Governed delivery</strong>
                <span>Controls, escalation paths, oversight, and audit trails built into the execution model.</span>
              </div>
            </div>
          </article>
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
              src="./src/images/atlas-mobile-payment.jpg"
              alt="Illustration of mobile payment confirmation"
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

      <section className="ln-logo-band" id="inspiration">
        <div className="ln-logo-band-inner">
          <p className="ln-logo-band-title">Execution Standard</p>
          <div className="ln-standard-band">
            <div className="ln-standard-copy">
              <h2>Built to Wall Street standards</h2>
              <p>Operator discipline, controlled delivery, and commercial sharpness for institutions where mistakes are expensive.</p>
            </div>
            <div className="ln-standard-dial" aria-hidden="true">
              <span className="ln-standard-end">Idea</span>
              <div className="ln-standard-track">
                <span className="ln-standard-tick" />
                <span className="ln-standard-tick" />
                <span className="ln-standard-compass"><CompassIcon /></span>
                <span className="ln-standard-tick" />
                <span className="ln-standard-tick" />
              </div>
              <span className="ln-standard-end">Execution</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ln-editorial-ribbon" aria-label="Execution visuals">
        <img src="./src/images/ribbon-strategy-session.jpg" alt="Advisory team in strategic execution session" />
        <img src="./src/images/ribbon-analytics-workspace.jpg" alt="Fintech analytics workspace" />
        <img src="./src/images/ribbon-control-room.jpg" alt="High-performance product and engineering control room" />
      </section>

      <section className="ln-section" id="services">
        <span className="ln-sec-num" aria-hidden="true">04</span>
        <p className="ln-section-eyebrow">Flagship Engagements</p>
        <h2 className="ln-section-heading">Advisory mandates with clear entry points</h2>
        <p className="ln-section-sub">
          Engage at the level you need now: a focused wedge, a core build mandate, or senior advisory leadership across product, data, AI, and execution.
        </p>

        <p className="ln-section-eyebrow" style={{ marginTop: 22 }}>Entry</p>
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
        </div>

        <p className="ln-section-eyebrow" style={{ marginTop: 24 }}>Core</p>
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
        </div>

        <p className="ln-section-eyebrow" style={{ marginTop: 24 }}>Strategic</p>
        <div className="ln-features-grid ln-features-grid--three">
          <article className="ln-feature-card">
            <h3>Technology Due Diligence</h3>
            <p>Independent review of technology, data, and AI stacks, including controls, architecture maturity, and execution risk, for leadership and investors.</p>
            <a className="ln-feature-link" href="/service-ai-due-diligence.html">Read breakdown</a>
          </article>
          <article className="ln-feature-card">
            <h3>Fractional CPO / CTO</h3>
            <p>Embedded product and technology leadership. Roadmap ownership, cross-functional governance, and hands-on delivery acceleration.</p>
            <a className="ln-feature-link" href="/service-fractional-ai-leadership.html">Read breakdown</a>
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
        </div>
      </section>

      <section className="ln-section ln-case-studies" id="case-studies">
        <span className="ln-sec-num" aria-hidden="true">05</span>
        <p className="ln-section-eyebrow">Selected Mandates</p>
        <h2 className="ln-section-heading">Recent work, stated the way institutional buyers actually read it</h2>
        <p className="ln-section-sub">
          These are anonymized by design. The point is not name-dropping. It is showing the shape of the mandate, the change made, and the measurable result.
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

      <section className="ln-section ln-service-editorial" id="service-preview">
        <span className="ln-sec-num" aria-hidden="true">06</span>
        <p className="ln-section-eyebrow">Service Preview</p>
        <h2 className="ln-section-heading">How we deliver for leadership and on the ground</h2>
        <div className="ln-split-row">
          <div className="ln-split-media ln-split-media--diagram">
            <div className="ln-service-diagram ln-service-diagram--leadership" aria-label="Leadership decision program structure">
              <div className="ln-service-diagram-head">
                <span>Leadership operating frame</span>
                <strong>Commercial view</strong>
              </div>
              <div className="ln-service-lanes">
                <div>
                  <b>Value</b>
                  <span>Revenue velocity</span>
                  <span>Adoption wedge</span>
                </div>
                <div>
                  <b>Risk</b>
                  <span>Controls</span>
                  <span>Model oversight</span>
                </div>
                <div>
                  <b>Execution</b>
                  <span>Owner cadence</span>
                  <span>90-day roadmap</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ln-split-copy">
            <h3>Commercial narrative for leadership</h3>
            <p>We frame each program around revenue velocity, risk reduction, and operating leverage, so leadership sees a mandate, a sequence, and a commercial case before the technical detail takes over.</p>
            <a className="ln-feature-link" href="/service-fractional-ai-leadership.html">See leadership offer</a>
          </div>
        </div>
        <div className="ln-split-row ln-split-row--reverse">
          <div className="ln-split-media ln-split-media--diagram">
            <div className="ln-service-diagram ln-service-diagram--delivery" aria-label="Operator delivery loop">
              <div className="ln-service-diagram-head">
                <span>Operator loop</span>
                <strong>Production path</strong>
              </div>
              <div className="ln-delivery-loop">
                <span>Signal</span>
                <span>Prioritise</span>
                <span>Approve</span>
                <span>Execute</span>
                <span>Measure</span>
              </div>
              <div className="ln-delivery-controls">
                <span>API layer</span>
                <span>Data pipeline</span>
                <span>Audit log</span>
                <span>Fallback path</span>
              </div>
            </div>
          </div>
          <div className="ln-split-copy">
            <h3>Operator-grade delivery in production</h3>
            <p>We execute in live environments with measurable controls: platform builds, workflow redesign, data architecture, AI deployment, and operational handoff tied to real business outcomes.</p>
            <a className="ln-feature-link" href="/service-ai-payments-acceleration.html">See delivery in action</a>
          </div>
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

      <section className="ln-section ln-showcase" id="journey">
        <span className="ln-sec-num" aria-hidden="true">08</span>
        <p className="ln-section-eyebrow">Execution Impact</p>
        <h2 className="ln-section-heading">Built in financial markets. Applied where every mandate carries consequence</h2>
        <p className="ln-section-sub">
          We combine nearly a decade of Wall Street operator experience with modern AI, product, and data engineering to help institutions and high-consequence operators move faster without losing control.
        </p>

        <div className="ln-showcase-grid">
          <article className="ln-network-panel">
            <header className="ln-network-head">
              <h3>Where we focus</h3>
              <span className="ln-network-pill">Execution-first</span>
            </header>
            <div className="ln-journey-points">
              <p>Research and analytics platforms that unify market data, proprietary signals, and LLM-powered insight generation for investment and risk teams.</p>
              <p>AI infrastructure including model governance, API platforms, data pipelines, and enterprise-grade deployment for regulated and audit-sensitive environments.</p>
              <p>Financial data systems spanning real-time ingestion, entity resolution, feature engineering, and decision-serving architecture.</p>
              <p>Product transformation that turns internal tools into high-adoption platforms through design discipline and measurable rollout governance.</p>
            </div>
          </article>

          <aside className="ln-showcase-metrics">
            <article className="ln-metric-card">
              <header><h3>Representative outcomes</h3><span>Execution</span></header>
              <div className="ln-delay-grid">
                <div><strong>Faster</strong><span>transaction triage and action cycles</span></div>
                <div><strong>Higher</strong><span>decision confidence with richer context</span></div>
                <div><strong>Lower</strong><span>manual operational overhead and cost drag</span></div>
              </div>
            </article>
            <article className="ln-metric-card">
              <header><h3>Delivery model</h3><span>How we work</span></header>
              <div className="ln-delay-grid">
                <div><strong>Hands-on</strong><span>pipeline and model implementation</span></div>
                <div><strong>Pragmatic</strong><span>focused on production outcomes</span></div>
                <div><strong>Transparent</strong><span>weekly metrics and risks</span></div>
              </div>
            </article>
          </aside>
        </div>
      </section>

      <section className="ln-section ln-workflow" id="workflow">
        <span className="ln-sec-num" aria-hidden="true">09</span>
        <p className="ln-section-eyebrow">Workflow</p>
        <h2 className="ln-section-heading">How a mandate moves from diagnostic to handoff</h2>
        <div className="ln-workflow-diagram">
          <div><b>01</b><span>Diagnostic</span><p>Find where product, data, controls, and ownership are breaking the operating model.</p></div>
          <div><b>02</b><span>Design</span><p>Set the workflow, architecture, governance, and commercial sequence for the mandate.</p></div>
          <div><b>03</b><span>Implementation</span><p>Build, embed, and govern the operating change in live environments.</p></div>
          <div><b>04</b><span>Handoff</span><p>Leave behind documentation, controls, metrics, and a team that can run it properly.</p></div>
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
            <p>Rayleigh Stark is a trading name of Premium Network and Services Ltd.</p>
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
              <a href="#contact">Contact</a>
              <a href="#">Terms</a>
              <a href="#">Premium Network and Services Ltd</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
