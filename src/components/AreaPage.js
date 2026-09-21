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
    </div>
  );
}
