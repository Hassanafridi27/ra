import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

const PHONE = "07436 902 787";
const PHONE_LINK = "tel:+447436902787";

export default function AreaPage({ area, onBack }) {
  if (!area) return null;

  return (
    <div className="area-page-shell">
      <header
        className="area-page-header"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(5, 20, 34, 0.96), rgba(17, 57, 86, 0.9)), url(${area.heroImage})`,
        }}
      >
        <div className="container area-page-header-inner">
          <button className="btn btn-outline btn-light" onClick={onBack}>
            <ArrowRight size={16} className="back-arrow" /> Back to all services
          </button>

          <h1>{area.headline}</h1>
          <p>{area.subtitle}</p>

          <div className="area-hero-actions">
            <a className="btn btn-yellow" href={PHONE_LINK}>
              <Phone size={18} /> Book in {area.name}
            </a>
            <button className="btn btn-outline btn-light" onClick={onBack}>
              Explore other areas
            </button>
          </div>

          <div className="area-stats-grid">
            {area.stats.map((item) => (
              <div key={item.label} className="area-stat-box">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="container area-page-main">
        <section className="area-page-section area-showcase">
          <div>
            <span className="section-kicker">WHY LOCAL DRIVERS CHOOSE US</span>
            <h2>
              Premium service,
              <em> without the garage queue.</em>
            </h2>
            <p>{area.summary}</p>
            <div className="check-list area-checks">
              {area.features.map((feature) => (
                <div key={feature}>
                  <CheckCircle2 size={19} /> {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="area-feature-panel">
            <div className="feature-panel-top">
              <MapPin size={20} />
              <span>{area.name} coverage</span>
            </div>
            <ul>
              {area.serviceList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {area.introParagraphs && area.introParagraphs.length > 0 && (
          <section className="area-page-section area-copy-card">
            <span className="section-kicker">ABOUT OUR SERVICE</span>
            <h2>
              Same day fitting in <em>{area.name}</em>
            </h2>
            {area.introParagraphs.map((paragraph, index) => (
              <p key={`${area.slug}-intro-${index}`}>{paragraph}</p>
            ))}
          </section>
        )}

        <section className="area-page-section area-service-grid">
          <div className="service-card elevated">
            <div className="service-icon">
              <Truck size={26} />
            </div>
            <h3>Mobile tyre replacement</h3>
            <p>
              We fit new tyres at your location, with attention to tyre size,
              driving style and road conditions.
            </p>
          </div>

          <div className="service-card elevated">
            <div className="service-icon">
              <Wrench size={26} />
            </div>
            <h3>Locking nut removal</h3>
            <p>
              Locked wheel nuts can be frustrating; we provide a safe and
              efficient removal service to keep you moving.
            </p>
          </div>

          <div className="service-card elevated">
            <div className="service-icon">
              <Zap size={26} />
            </div>
            <h3>Emergency support</h3>
            <p>
              When an unexpected puncture or blowout hits, our mobile team can
              be on hand with practical support.
            </p>
          </div>
        </section>

        <section className="area-page-section area-review-section">
          <div className="review-top">
            <div>
              <span className="section-kicker">CUSTOMER FEEDBACK</span>
              <h2>
                Local drivers trust us
                <br />
                <em>in {area.name}.</em>
              </h2>
            </div>
            <div className="rating-box">
              <div>
                <strong>4.9</strong>
                <span>/ 5</span>
              </div>
              <div className="stars">★★★★★</div>
              <small>Based on 1,200+ Google reviews</small>
            </div>
          </div>

          <div className="review-grid">
            {area.reviews.map(([name, text]) => (
              <article className="review-card" key={`${area.slug}-${name}`}>
                <div className="stars">★★★★★</div>
                <p>"{text}"</p>
                <div className="reviewer">
                  <div>{name.charAt(0)}</div>
                  <span>
                    <b>{name}</b>
                    <small>Verified customer</small>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="area-page-section area-cta-card">
          <div>
            <span className="section-kicker dark">BOOK YOUR SLOT</span>
            <h3>{area.quote}</h3>
          </div>
          <a className="btn btn-blue" href={PHONE_LINK}>
            <Phone size={18} /> Call {PHONE}
          </a>
        </section>
      </main>

      <footer className="footer area-page-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <div className="brand">
              <div className="brand-mark">
                <span>RA</span>
              </div>
              <div>
                <strong>RA MOBILE TYRES</strong>
                <small>FAST • PROFESSIONAL • MOBILE</small>
              </div>
            </div>
            <p>
              Professional mobile tyre fitting and vehicle services across
              Manchester and surrounding areas.
            </p>
            <a href={PHONE_LINK} className="footer-phone">
              <Phone size={17} /> {PHONE}
            </a>
          </div>

          <div>
            <h4>Quick links</h4>
            <button type="button" onClick={onBack}>
              Back to services
            </button>
            <a href={PHONE_LINK}>Book by phone</a>
            <a href="/areas/manchester">Manchester coverage</a>
          </div>

          <div>
            <h4>Services</h4>
            <a href={PHONE_LINK}>Mobile fitting</a>
            <a href={PHONE_LINK}>Emergency tyres</a>
            <a href={PHONE_LINK}>Tyre repair</a>
            <a href={PHONE_LINK}>Battery replacement</a>
          </div>

          <div>
            <h4>Opening Hours</h4>
            <p>Monday – Sunday</p>
            <strong>08:30 – 18:00</strong>
            <small>Emergency availability may vary.</small>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} RA Mobile Tyres. All rights reserved.
          </span>
          <span>
            Fast, professional service for {area.name} and nearby roads.
          </span>
        </div>
      </footer>
    </div>
  );
}
