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
      <span className="brand-name-text"><span className="brand-new">new</span>value foundation</span>
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

const inspirationLogos = [
  "Goldman Sachs",
  "JPMorganChase",
  "Morgan Stanley",
  "Bank of America",
  "Citi",
  "Barclays",
  "UBS"
];

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
      <span className="ln-sec-num" aria-hidden="true">06</span>
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
  const diagnosticScopingHref = CALENDLY_DIAGNOSTIC_URL.includes("your-link") ? "#contact" : CALENDLY_DIAGNOSTIC_URL;

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
              <Typewriter text="decision infrastructure. built on wall street standards." speed={50} delay={600} />
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
            Decision infrastructure for institutions where{" "}
            <span className="ln-hero-wellbeing">
              <span className="ln-hero-accent">outcomes</span> matter
              <svg className="ln-hero-scribble" viewBox="0 0 260 18" fill="none" aria-hidden="true">
                <path d="M2 10h34l11-6 13 12 16-9h27l12-5 12 10h23l10-7 12 11h26l9-6h41" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </h1>

          <p className="ln-hero-sub">
            Built by operators from the world&apos;s leading financial institutions. We design and deliver the platforms, pipelines, and AI systems that turn fragmented data into confident, auditable decisions.
          </p>

          <div className="ln-hero-actions">
            <a className="ln-btn ln-btn--primary" href={executiveBriefingHref}>Book Executive Briefing</a>
            <a href={diagnosticScopingHref} className="ln-btn ln-btn--ghost">Book Diagnostic Sprint Scoping</a>
          </div>

          <div className="ln-hero-image-wrap ln-hero-image-wrap--composite">
            <img
              className="ln-hero-image ln-hero-image--left"
              src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1400&q=80"
              alt="Professional financial analytics dashboard in a modern operations environment"
            />
            <img
              className="ln-hero-image ln-hero-image--right"
              src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1400&q=80"
              alt="Professional digital payments point-of-sale interaction"
            />
          </div>
        </section>
      </div>

      <section className="ln-trust">
        <div className="ln-trust-row">
          <span><span className="ln-trust-icon"><BoltIcon /></span> Research platforms and analytics infrastructure</span>
          <span><span className="ln-trust-icon"><ShieldIcon /></span> AI governance, data pipelines, and controls</span>
          <span><span className="ln-trust-icon"><SparkIcon /></span> Decision systems for investors and institutions</span>
        </div>
      </section>

      <section className="ln-section ln-exec-stats" id="execution">
        <span className="ln-sec-num" aria-hidden="true">01</span>
        <p className="ln-section-eyebrow">Execution Standard</p>
        <h2 className="ln-section-heading">Designed for measurable commercial impact and control</h2>
        <p className="ln-section-sub">
          We target cycle-time reduction, sharper research output, and stronger decision confidence across trading, risk, and operations. Market scenarios suggest central AI adoption could improve banking cost bases by roughly 15-20 percent, with outsized gains for early movers.
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

      <section className="ln-section ln-market" id="approach">
        <span className="ln-sec-num" aria-hidden="true">02</span>
        <p className="ln-section-eyebrow">How we implement</p>
        <h2 className="ln-section-heading">From fragmented data to institutional-grade decision systems</h2>
        <p className="ln-section-sub">
          Each engagement starts with infrastructure and workflow diagnosis, then moves into production-ready platforms with measurable improvements in speed, quality, and decision confidence.
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
            <p className="ln-market-card-label">What changes with our execution stack</p>
            <div className="ln-market-metric-list">
              <div className="ln-market-metric">
                <strong>Unified research and analytics platforms</strong>
                <span>One trusted layer connecting market data, proprietary models, and decision workflows.</span>
              </div>
              <div className="ln-market-metric">
                <strong>AI-augmented analysis at scale</strong>
                <span>LLM-powered summarization, extraction, and enrichment that teams actually adopt.</span>
              </div>
              <div className="ln-market-metric">
                <strong>Governed, auditable AI infrastructure</strong>
                <span>Model orchestration with policy controls, human oversight, and enterprise-grade audit trails.</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="ln-logo-band" id="inspiration">
        <div className="ln-logo-band-inner">
          <p className="ln-logo-band-title">Built on standards set at the world&apos;s leading financial institutions</p>
          <div className="ln-logo-dial" role="list" aria-label="Industry inspiration institutions">
            <div className="ln-logo-track">
              {inspirationLogos.map((name) => (
                <span className="ln-logo-chip" role="listitem" key={`a-${name}`}>{name}</span>
              ))}
              {inspirationLogos.map((name) => (
                <span className="ln-logo-chip" role="listitem" key={`b-${name}`}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ln-editorial-ribbon" aria-label="Execution visuals">
        <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80" alt="Advisory team in strategic execution session" />
        <img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1400&q=80" alt="Fintech analytics workspace" />
        <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1400&q=80" alt="High-performance product and engineering control room" />
      </section>

      <section className="ln-section" id="services">
        <span className="ln-sec-num" aria-hidden="true">03</span>
        <p className="ln-section-eyebrow">Flagship Engagements</p>
        <h2 className="ln-section-heading">Enterprise scope with clear entry points</h2>
        <p className="ln-section-sub">
          Engage at the level you need now: an immediate operating wedge, core platform expansion, or strategic leadership and governance.
        </p>

        <p className="ln-section-eyebrow" style={{ marginTop: 22 }}>Entry</p>
        <div className="ln-features-grid ln-features-grid--three">
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
            <h3>Financial Data Infrastructure</h3>
            <p>Unified data architecture for market feeds, internal systems, and third-party sources. Streaming ingestion, entity resolution, feature engineering, and decision-serving layers.</p>
            <a className="ln-feature-link" href="/service-intelligent-data-pipelines.html">Read breakdown</a>
          </article>
          <article className="ln-feature-card">
            <h3>Autonomous Operations</h3>
            <p>Policy-governed workflows that execute operational decisions autonomously, with approval checkpoints, escalation logic, and full auditability.</p>
            <a className="ln-feature-link" href="/service-agentic-ai-operations.html">Read breakdown</a>
          </article>
          <article className="ln-feature-card">
            <h3>Decision Reliability Engineering</h3>
            <p>Model reliability, observability, and fallback design for high-stakes financial decisions.</p>
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

      <section className="ln-section ln-service-editorial" id="service-preview">
        <span className="ln-sec-num" aria-hidden="true">04</span>
        <p className="ln-section-eyebrow">Service Preview</p>
        <h2 className="ln-section-heading">How we deliver for leadership and on the ground</h2>
        <div className="ln-split-row">
          <div className="ln-split-media">
            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80" alt="Executive fintech planning session" />
          </div>
          <div className="ln-split-copy">
            <h3>Commercial narrative for leadership</h3>
            <p>We frame each program around revenue velocity, risk reduction, and operational leverage, so executive stakeholders see commercial value before technical detail.</p>
            <a className="ln-feature-link" href="/service-fractional-ai-leadership.html">See leadership offer</a>
          </div>
        </div>
        <div className="ln-split-row ln-split-row--reverse">
          <div className="ln-split-media">
            <img src="https://images.unsplash.com/photo-1600267165477-6d4cc741b379?auto=format&fit=crop&w=1600&q=80" alt="Fintech operations team in execution mode" />
          </div>
          <div className="ln-split-copy">
            <h3>Operator-grade delivery in production</h3>
            <p>We execute in live environments with measurable controls: research platform builds, API and data infrastructure, AI model deployment, and decision systems tied to real business outcomes.</p>
            <a className="ln-feature-link" href="/service-ai-payments-acceleration.html">See delivery in action</a>
          </div>
        </div>
      </section>

      <section className="ln-section ln-showcase" id="journey">
        <span className="ln-sec-num" aria-hidden="true">05</span>
        <p className="ln-section-eyebrow">Execution Impact</p>
        <h2 className="ln-section-heading">Built for financial institutions where every decision carries weight</h2>
        <p className="ln-section-sub">
          We combine a decade of platform delivery at top-tier banks with modern AI and data engineering to build faster, more reliable, and commercially stronger decision infrastructure.
        </p>

        <div className="ln-showcase-grid">
          <article className="ln-network-panel">
            <header className="ln-network-head">
              <h3>Where we focus</h3>
              <span className="ln-network-pill">Execution-first</span>
            </header>
            <div className="ln-journey-points">
              <p>Research and analytics platforms that unify market data, proprietary signals, and LLM-powered insight generation for investment and risk teams.</p>
              <p>AI infrastructure including model governance, API platforms, data pipelines, and enterprise-grade deployment for regulated environments.</p>
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
        <p className="ln-section-eyebrow">Workflow</p>
        <h2 className="ln-section-heading">From raw signals to controlled decisions at scale</h2>
        <div className="ln-workflow-diagram">
          <div><b>01</b><span>Capture</span><p>Market data, internal systems, third-party feeds.</p></div>
          <div><b>02</b><span>Enrich</span><p>Entity resolution, risk context, and signal normalization.</p></div>
          <div><b>03</b><span>Score</span><p>Model + policy prioritization.</p></div>
          <div><b>04</b><span>Decide</span><p>Recommend, approve, or auto-execute.</p></div>
          <div><b>05</b><span>Learn</span><p>Outcome telemetry and continuous tuning.</p></div>
        </div>
      </section>

      <section className="ln-manifesto" id="manifesto">
        <div className="ln-manifesto-inner">
          <p className="ln-manifesto-kicker">Manifesto</p>
          <h2>Execution is the brand.</h2>
          <p>
            We build financial infrastructure that decides faster, scales cleaner, and holds up under institutional scrutiny.
            Strategy is useful. Production outcomes are what matter.
          </p>
        </div>
      </section>

      <ContactForm />

      <footer className="ln-footer">
        <div className="ln-footer-inner">
          <div>
            <div className="ln-logo-text ln-footer-brand"><BrandName /></div>
            <p>Decision infrastructure firm for banks, fintechs, and institutional operators. Based in London.</p>
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
              <a href="#">Registered in England &amp; Wales</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
