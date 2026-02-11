import { useEffect, useMemo, useState } from "react";

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
      <span className="brand-name-text">newvalue foundation</span>
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

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

const EMAIL_CODES = [97, 110, 116, 104, 111, 110, 121, 107, 119, 97, 119, 117, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];

function decode(codes) {
  return String.fromCharCode(...codes);
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

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState("");
  const emailAddress = useMemo(() => decode(EMAIL_CODES), []);
  const bookingHref = CALENDLY_EXEC_BRIEFING_URL.includes("your-link") ? "#contact" : CALENDLY_EXEC_BRIEFING_URL;

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const openMailClient = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("Please complete all required fields.");
      return;
    }

    const subject = encodeURIComponent(`Consultancy enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || "N/A"}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setStatus("Thanks - we will be in touch within 24 hours.");
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <section className="ln-section ln-contact" id="contact">
      <span className="ln-sec-num" aria-hidden="true">06</span>
      <p className="ln-section-eyebrow">Let&apos;s Talk</p>
      <h2 className="ln-section-heading">Discuss your payments, platform, or reliability roadmap</h2>
      <p className="ln-section-sub">
        For payments modernization, digital asset infrastructure, escrow architecture, cloud migration, or practical AI in financial operations.
      </p>

      <div className="ln-contact-actions">
        <button className="ln-btn ln-btn--primary" onClick={openMailClient} type="button">
          <span className="ln-btn-icon"><MailIcon /></span>
          Email
        </button>
        <a className="ln-btn ln-btn--outline" href={bookingHref} target="_blank" rel="noopener noreferrer">
          Book Directly
        </a>
      </div>

      <form className="ln-contact-form" onSubmit={handleSubmit}>
        <div className="ln-contact-grid">
          <div className="ln-contact-field">
            <label htmlFor="name">Name *</label>
            <input id="name" value={form.name} onChange={update("name")} required />
          </div>
          <div className="ln-contact-field">
            <label htmlFor="email">Email *</label>
            <input id="email" type="email" value={form.email} onChange={update("email")} required />
          </div>
        </div>
        <div className="ln-contact-field">
          <label htmlFor="company">Company</label>
          <input id="company" value={form.company} onChange={update("company")} />
        </div>
        <div className="ln-contact-field">
          <label htmlFor="message">Message *</label>
          <textarea id="message" rows="5" value={form.message} onChange={update("message")} required />
        </div>

        <button className="ln-btn ln-btn--primary" type="submit">Submit</button>
        <p className="ln-contact-status" aria-live="polite">{status}</p>
      </form>
    </section>
  );
}

export default function Landing() {
  const executiveBriefingHref = CALENDLY_EXEC_BRIEFING_URL.includes("your-link") ? "#contact" : CALENDLY_EXEC_BRIEFING_URL;
  const diagnosticScopingHref = CALENDLY_DIAGNOSTIC_URL.includes("your-link") ? "#contact" : CALENDLY_DIAGNOSTIC_URL;

  return (
    <div className="landing">
      <nav className="ln-nav">
        <div className="ln-nav-inner">
          <a className="ln-logo" href="#top">
            <div className="ln-logo-block">
              <span className="ln-logo-text"><BrandName /></span>
              <Typewriter text="precision systems for fintech execution" speed={50} delay={600} />
            </div>
          </a>
          <div className="ln-nav-links">
            <a href="#services">Services</a>
            <a href="#approach">Approach</a>
            <a href="#journey">Impact</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="ln-btn ln-btn--outline ln-btn--sm" href={executiveBriefingHref}>
            Book Executive Briefing
          </a>
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
            AI decision infrastructure{" "}
            <span className="ln-hero-wellbeing">
              for financial <span className="ln-hero-accent">institutions</span>
              <svg className="ln-hero-scribble" viewBox="0 0 640 18" fill="none" aria-hidden="true">
                <path d="M2 10h44l12-6 14 12 18-9h30l13-5 13 10h25l11-7 13 11h29l10-6h86l14-6 14 12 19-9h31l13-5 13 10h26l11-7 14 11h31l11-6h92" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </h1>

          <p className="ln-hero-sub">
            We build premium execution systems for banks, processors, and regulated fintechs where speed, control, and auditability directly affect margin and risk posture.
          </p>
          <p className="ln-hero-sub" style={{ marginTop: 10 }}>
            Start with our Instant Payments Decision-Speed Sprint: a 90-day engagement to cut exception cycle time, improve straight-through processing, and strengthen policy-bound decisioning.
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
          <span><span className="ln-trust-icon"><BoltIcon /></span> Multi-rail payments and crypto ramps</span>
          <span><span className="ln-trust-icon"><ShieldIcon /></span> Decision-grade data pipelines and controls</span>
          <span><span className="ln-trust-icon"><SparkIcon /></span> M&amp;A and advisory decision acceleration</span>
        </div>
      </section>

      <section className="ln-section ln-exec-stats" id="execution">
        <span className="ln-sec-num" aria-hidden="true">01</span>
        <p className="ln-section-eyebrow">Execution Standard</p>
        <h2 className="ln-section-heading">Designed for measurable commercial impact and control</h2>
        <p className="ln-section-sub">
          We target cycle-time reduction, higher throughput, and stronger profit capture. Market scenarios suggest central AI adoption could improve banking cost bases by roughly 15-20 percent, with outsized gains for early movers.
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
        <h2 className="ln-section-heading">From fragmented data to precision operational decisions</h2>
        <p className="ln-section-sub">
          Each engagement starts with workflow and control diagnosis, then moves into production decision systems with measurable cycle-time, quality, and margin impact.
        </p>

        <div className="ln-market-grid">
          <article className="ln-market-card">
            <p className="ln-market-card-label">Where value leaks today</p>
            <div className="ln-market-metric-list">
              <div className="ln-market-metric">
                <strong>Siloed transaction intelligence</strong>
                <span>Critical payment, escrow, and advisory signals are spread across tools and teams.</span>
              </div>
              <div className="ln-market-metric">
                <strong>Manual decision loops</strong>
                <span>Analysts spend too much time collecting context before acting.</span>
              </div>
              <div className="ln-market-metric">
                <strong>Low decision confidence</strong>
                <span>Teams lack explainable, auditable intelligence to automate with confidence.</span>
              </div>
            </div>
          </article>

          <article className="ln-market-card ln-market-card--accent">
            <p className="ln-market-card-label">What changes with our execution stack</p>
            <div className="ln-market-metric-list">
              <div className="ln-market-metric">
                <strong>Faster transaction decisions</strong>
                <span>Context-rich recommendations generated in real time for operations and risk teams.</span>
              </div>
              <div className="ln-market-metric">
                <strong>Lower manual workload</strong>
                <span>Pipeline-driven enrichment and summarization reduce repetitive analysis.</span>
              </div>
              <div className="ln-market-metric">
                <strong>Controlled autonomy</strong>
                <span>Rule + model orchestration with policy checks, human approval where required, and audit trails.</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="ln-logo-band" id="inspiration">
        <div className="ln-logo-band-inner">
          <p className="ln-logo-band-title">Inspired by experts from leading financial institutions</p>
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
        </div>

        <p className="ln-section-eyebrow" style={{ marginTop: 24 }}>Core</p>
        <div className="ln-features-grid ln-features-grid--three">
          <article className="ln-feature-card">
            <h3>Intelligent Data Pipelines</h3>
            <p>Streaming ingestion, entity resolution, feature pipelines, and high-quality decision context.</p>
            <a className="ln-feature-link" href="/service-intelligent-data-pipelines.html">Read breakdown</a>
          </article>
          <article className="ln-feature-card">
            <h3>Agentic Operations</h3>
            <p>Autonomous workflows with policy guards, approval checkpoints, escalation logic, and full auditability.</p>
            <a className="ln-feature-link" href="/service-agentic-ai-operations.html">Read breakdown</a>
          </article>
          <article className="ln-feature-card">
            <h3>Decision Reliability Engineering</h3>
            <p>Model reliability, observability, and fallback design for high-stakes financial decisions.</p>
            <a className="ln-feature-link" href="/service-decision-reliability-engineering.html">Read breakdown</a>
          </article>
          <article className="ln-feature-card">
            <h3>Escrow Intelligence Automation</h3>
            <p>AI-assisted release logic for fiat and stablecoin escrow, plus dispute analysis and trust monitoring for multi-party transactions.</p>
            <a className="ln-feature-link" href="/service-escrow-intelligence-automation.html">Read breakdown</a>
          </article>
        </div>

        <p className="ln-section-eyebrow" style={{ marginTop: 24 }}>Strategic</p>
        <div className="ln-features-grid ln-features-grid--three">
          <article className="ln-feature-card">
            <h3>AI Due Diligence</h3>
            <p>Independent review of AI/data stacks, controls, and execution risk for leadership and investors.</p>
            <a className="ln-feature-link" href="/service-ai-due-diligence.html">Read breakdown</a>
          </article>
          <article className="ln-feature-card">
            <h3>Fractional AI Leadership</h3>
            <p>Hands-on AI program leadership, roadmap ownership, and implementation governance.</p>
            <a className="ln-feature-link" href="/service-fractional-ai-leadership.html">Read breakdown</a>
          </article>
          <article className="ln-feature-card">
            <h3>AI Product and Workflow Design</h3>
            <p>Human-in-the-loop product flows that make autonomous intelligence usable and trusted.</p>
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
        <h2 className="ln-section-heading">How we position execution in the boardroom and on the ground</h2>
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
            <p>We execute in live workflows with measurable controls: rail-aware payments, on/off-ramp crypto decisions, and M&A intelligence tied to CIM, QoE, TSA, and PMI milestones.</p>
            <a className="ln-feature-link" href="/service-ai-payments-acceleration.html">See payments offer</a>
          </div>
        </div>
      </section>

      <section className="ln-section ln-showcase" id="journey">
        <span className="ln-sec-num" aria-hidden="true">05</span>
        <p className="ln-section-eyebrow">Execution Impact</p>
        <h2 className="ln-section-heading">Built for fintech execution where every decision has financial consequence</h2>
        <p className="ln-section-sub">
          We combine a decade of transaction-system delivery with modern decision engineering to build faster, safer, and commercially stronger operating models.
        </p>

        <div className="ln-showcase-grid">
          <article className="ln-network-panel">
            <header className="ln-network-head">
              <h3>Where we focus</h3>
              <span className="ln-network-pill">Execution-first</span>
            </header>
            <div className="ln-journey-points">
              <p>Payment-speed optimization with intelligent routing and exception handling across SEPA, Faster Payments, FedNow, RTP, ACH, and SWIFT.</p>
              <p>Crypto operating intelligence across on-chain signals, off-chain controls, and fiat/crypto on-ramp and off-ramp workflows.</p>
              <p>M&amp;A and advisory pipelines covering CIM and VDR intake, QoE and NWC analysis, and SPA/TSA decision support through PMI.</p>
              <p>Escrow and transaction orchestration with AI-assisted release logic, dispute workflows, explainability, governance, and human override.</p>
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
          <div><b>01</b><span>Capture</span><p>Rails, on-chain, off-chain events.</p></div>
          <div><b>02</b><span>Enrich</span><p>Entity, risk, and context normalization.</p></div>
          <div><b>03</b><span>Score</span><p>Model + policy prioritization.</p></div>
          <div><b>04</b><span>Decide</span><p>Recommend, approve, or auto-execute.</p></div>
          <div><b>05</b><span>Learn</span><p>Outcome telemetry and continuous tuning.</p></div>
        </div>
      </section>

      <section className="ln-emotional ln-emotional--alt" id="about">
        <div className="ln-emotional-inner">
          <div className="ln-emotional-media">
            <img
              src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Professional team reviewing infrastructure plans"
              className="ln-emotional-img"
            />
          </div>
          <div className="ln-emotional-content">
            <p className="ln-section-eyebrow">About</p>
            <h2 className="ln-emotional-heading">Execution depth with business-level clarity</h2>
            <p className="ln-emotional-body">
              We implement decision systems that capture, structure, and operationalize fintech data so teams can act faster and automate high-value decisions safely.
            </p>
            <p className="ln-emotional-body" style={{ marginTop: 12 }}>
              We focus on intelligent operating pipelines: decision-ready context, policy-bound workflow triggers, and resilient production controls.
            </p>
          </div>
        </div>
      </section>

      <section className="ln-manifesto" id="manifesto">
        <div className="ln-manifesto-inner">
          <p className="ln-manifesto-kicker">Manifesto</p>
          <h2>Execution is the brand.</h2>
          <p>
            We build fintech systems that decide faster, move cleaner, and hold up under pressure.
            Strategy is useful. Production outcomes are what matter.
          </p>
        </div>
      </section>

      <ContactForm />

      <footer className="ln-footer">
        <div className="ln-footer-inner">
          <div>
            <div className="ln-logo-text ln-footer-brand"><BrandName /></div>
            <p>Decision-systems implementation firm for fintech operators, based in London.</p>
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
              <a href="/service-ai-payments-acceleration.html">AI Payments</a>
              <a href="/service-ma-advisory-intelligence.html">M&amp;A Intelligence</a>
              <a href="/service-agentic-ai-operations.html">Agentic Ops</a>
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
