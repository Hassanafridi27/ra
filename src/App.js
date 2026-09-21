import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Battery,
  Cable,
  Car,
  CheckCircle2,
  ChevronDown,
  Cog,
  Clock3,
  Headphones,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Truck,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import AreaPage from "./components/AreaPage";
import { areas, getAreaBySlug, slugifyArea } from "./data/areas";
import "./App.css";

const PHONE = "07436 902 787";
const PHONE_LINK = "tel:+447436902787";

const slides = [
  {
    eyebrow: "MOBILE TYRE FITTING",
    title: "WE COME TO YOU.",
    text: "Professional tyre fitting at home, work or roadside across Manchester and surrounding areas.",
    image: "/a.jpeg",
  },
  {
    eyebrow: "EMERGENCY TYRE SERVICE",
    title: "FLAT TYRE? WE'RE ON OUR WAY.",
    text: "Fast, practical roadside tyre support when you need to get moving again.",
    image: "/b.jpeg",
  },
  {
    eyebrow: "PREMIUM • MID-RANGE • BUDGET",
    title: "THE RIGHT TYRE. FITTED WHERE YOU ARE.",
    text: "Choose from a wide range of tyre options and have them professionally fitted at your location.",
    image: "/c.jpeg",
  },
];
const services = [
  {
    icon: Truck,
    title: "Mobile Tyre Replacement & Repairing",
    text: "New tyres fitted at your home, workplace or roadside.",
  },
  {
    icon: Zap,
    title: "Emergency Call-Out",
    text: "Fast assistance when a tyre problem leaves you stranded.",
  },
  {
    icon: Wrench,
    title: "Locking Nut Removals",
    text: "Professional removal of locking wheel nuts when the key is lost, damaged or unavailable.",
  },
  {
    icon: Cable,
    title: "Jump Start",
    text: "Quick and reliable battery jump-start service to get your vehicle back on the road.",
  },
  {
    icon: Battery,
    title: "Battery Replacement",
    text: "Convenient mobile battery replacement at your location.",
  },
  {
    icon: Cog,
    title: "All Types Of Valves And Tpms Sensor Unit Replacement",
    text: "Practical checks to help keep your vehicle road-ready.",
  },
];

const reviews = [
  [
    "Gareth Beaumont",
    "Fantastic service! Very quick and professional. Kept fully updated and very reasonable price.",
  ],
  [
    "Jo",
    "Turned up exactly when they said they would. Very reasonably priced. Quick and efficient.",
  ],
  [
    "David Wright",
    "So easy, kept up to date with time frames. Friendly guy who turned up. 10/10 service.",
  ],
  [
    "Christopher",
    "Fantastic service from initial booking to fitting. Great choice of tyres and speedy fitting.",
  ],
];

export default function App() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState("reg");
  const [faqOpen, setFaqOpen] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedArea, setSelectedArea] = useState(() => {
    if (typeof window === "undefined") return null;

    const path = window.location.pathname;
    const match = path.match(/^\/areas\/([^/]+)$/);
    if (!match) return null;

    return getAreaBySlug(match[1]) || null;
  });

  useEffect(() => {
    const timer = setInterval(
      () => setSlide((s) => (s + 1) % slides.length),
      6500,
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const syncFromLocation = () => {
      const path = window.location.pathname;
      const match = path.match(/^\/areas\/([^/]+)$/);

      if (!match) {
        setSelectedArea(null);
        return;
      }

      setSelectedArea(getAreaBySlug(match[1]) || null);
    };

    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  useEffect(() => {
    if (selectedArea && typeof window !== "undefined" && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [selectedArea]);

  const current = slides[slide];

  const openArea = (areaName) => {
    const area = getAreaBySlug(slugifyArea(areaName));
    setSelectedArea(area);
    if (typeof window !== "undefined" && area) {
      window.history.pushState({}, "", `/areas/${area.slug}`);
    }
  };

  const closeArea = () => {
    setSelectedArea(null);
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", "/");
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  if (selectedArea) {
    return <AreaPage area={selectedArea} onBack={closeArea} />;
  }

  return (
    <div className="site">
      {/* TOP STRIP */}
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>
            <Clock3 size={15} /> Open 7 days a week
          </span>
          <span className="top-hide-mobile">
            Manchester & surrounding areas
          </span>
          <a href={PHONE_LINK}>
            <Phone size={15} /> {PHONE}
          </a>
        </div>
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="container nav">
          <a
            className="brand"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("home");
            }}
          >
            <div className="brand-mark">
              <span>RA</span>
            </div>
            <div>
              <strong>RA MOBILE TYRES</strong>
              <small>FAST • PROFESSIONAL • MOBILE</small>
            </div>
          </a>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            <button onClick={() => scrollTo("home")}>Home</button>
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("how-it-works")}>
              How It Works
            </button>

            {/* AREAS MEGA DROPDOWN */}
            <div className="areas-nav">
              <button style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <MapPin size={14} /> Areas{" "}
                <ChevronDown size={14} className="chevron-icon" />
              </button>
              <div className="areas-dropdown">
                <div className="areas-dropdown-title">
                  Coverage Areas — Manchester & Beyond
                </div>
                <div className="areas-grid">
                  {areas.map((area) => (
                    <button
                      key={area}
                      className="area-btn"
                      onClick={() => openArea(area)}
                    >
                      {area}
                    </button>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 14,
                    borderTop: "1px solid #e3e8ed",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 11, color: "#647382" }}>
                    Not sure? Call us to check your area.
                  </span>
                  <a
                    href={PHONE_LINK}
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: "#1768a8",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Phone size={13} /> {PHONE}
                  </a>
                </div>
              </div>
            </div>

            <button onClick={() => scrollTo("reviews")}>Reviews</button>
            <button onClick={() => scrollTo("contact")}>Contact</button>
            <a className="nav-call btn" href={PHONE_LINK}>
              <Phone size={17} /> Call Now
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero">
          <div
            className="hero-bg"
            style={{ backgroundImage: `url(${current.image})` }}
          />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <div className="hero-copy">
              <div className="eyebrow">
                <span /> {current.eyebrow}
              </div>
              <h1>{current.title}</h1>
              <p>{current.text}</p>
              <div className="hero-actions">
                <button
                  className="btn btn-yellow"
                  onClick={() => scrollTo("booking")}
                >
                  Book a Mobile Fitter <ArrowRight size={19} />
                </button>
                <a className="btn btn-outline" href={PHONE_LINK}>
                  <Phone size={18} /> Call {PHONE}
                </a>
              </div>
              <div className="hero-trust">
                <span>
                  <BadgeCheck size={18} /> Professional service
                </span>
                <span>
                  <BadgeCheck size={18} /> 4.9 Google rating
                </span>
              </div>
            </div>
          </div>

          <div className="hero-controls container">
            {/* <div className="slide-count"><b>0{slide + 1}</b><span>/ 0{slides.length}</span></div> */}
            {/* <div className="dots">
              {slides.map((_, i) => (
                <button key={i} className={i === slide ? "dot active" : "dot"} onClick={() => setSlide(i)} />
              ))}
            </div> */}
          </div>

          <div className="booking-card-wrap container">
            <div id="booking" className="booking-card">
              <div className="booking-heading">
                <span className="booking-icon">
                  <Car size={23} />
                </span>
                <div>
                  <span className="mini-label">GET STARTED</span>
                  <h2>Find tyres for your vehicle</h2>
                </div>
              </div>
              <div className="booking-tabs">
                <button
                  className={bookingMode === "reg" ? "active" : ""}
                  onClick={() => setBookingMode("reg")}
                >
                  Registration
                </button>
                <button
                  className={bookingMode === "size" ? "active" : ""}
                  onClick={() => setBookingMode("size")}
                >
                  Tyre Size
                </button>
              </div>
              {bookingMode === "reg" ? (
                <div className="booking-form">
                  <label>
                    <span>Vehicle registration</span>
                    <input placeholder="e.g. AB12 CDE" />
                  </label>
                  <label>
                    <span>Postcode</span>
                    <input placeholder="e.g. M43 7UR" />
                  </label>
                  <button className="btn btn-blue">
                    Search Tyres <ArrowRight size={18} />
                  </button>
                </div>
              ) : (
                <div className="booking-form size-form">
                  {["Width", "Profile", "Rim", "Speed"].map((x) => (
                    <label key={x}>
                      <span>{x}</span>
                      <select defaultValue="">
                        <option value="" disabled>
                          Select
                        </option>
                        <option>205</option>
                        <option>215</option>
                        <option>225</option>
                        <option>235</option>
                      </select>
                    </label>
                  ))}
                  <button className="btn btn-blue">
                    Search Tyres <ArrowRight size={18} />
                  </button>
                </div>
              )}
              <small className="booking-note">
                Please double-check your tyre size before booking.
              </small>
            </div>
          </div>
        </section>

        {/* TRUST ROW */}
        <section className="trust-row">
          <div className="container trust-grid">
            <div>
              <CheckCircle2 />
              <span>
                <b>4.9 / 5</b>
                <small>Google rating</small>
              </span>
            </div>
            <div>
              <Truck />
              <span>
                <b>Mobile service</b>
                <small>We come to you</small>
              </span>
            </div>
            <div>
              <ShieldCheck />
              <span>
                <b>Professional</b>
                <small>Qualified fitting</small>
              </span>
            </div>
            <div>
              <Clock3 />
              <span>
                <b>7 days</b>
                <small>Open every week</small>
              </span>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section services-section">
          <div className="container">
            <div className="section-heading centered">
              <span className="section-kicker">WHAT WE DO</span>
              <h2>
                Professional tyre services,
                <br />
                <em>wherever you are.</em>
              </h2>
              <p>
                From routine tyre changes to roadside emergencies, RA Mobile
                Tyres brings the workshop to your location.
              </p>
            </div>
            <div className="service-grid">
              {services.map(({ icon: Icon, title, text }) => (
                <article className="service-card" key={title}>
                  <div className="service-icon">
                    <Icon size={26} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <button onClick={() => scrollTo("contact")}>
                    Learn more <ArrowRight size={16} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SPLIT */}
        <section className="split-section">
          <div className="split-image">
            <div className="image-badge">
              <strong>30–60</strong>
              <span>
                min target
                <br />
                within service areas*
              </span>
            </div>
          </div>
          <div className="split-copy">
            <span className="section-kicker">WHY RA MOBILE TYRES</span>
            <h2>
              Forget the garage.
              <br />
              <em>We come to you.</em>
            </h2>
            <p>
              Save time and avoid the queue. Our mobile tyre service is designed
              around your day — at home, at work or when you're safely parked
              roadside.
            </p>
            <div className="check-list">
              {[
                "Home & workplace fitting",
                "Same-day fitting options",
                "Emergency tyre assistance",
                "Premium, mid-range & budget tyres",
                "No need to wait at a garage",
              ].map((x) => (
                <div key={x}>
                  <CheckCircle2 size={19} /> {x}
                </div>
              ))}
            </div>
            <button
              className="btn btn-dark"
              onClick={() => scrollTo("booking")}
            >
              Find Your Tyres <ArrowRight size={18} />
            </button>
            <small className="fine-print">
              *Actual arrival time depends on location, traffic, availability
              and service demand.
            </small>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="section steps-section">
          <div className="container">
            <div className="section-heading centered">
              <span className="section-kicker">SIMPLE PROCESS</span>
              <h2>
                From booking to fitted
                <br />
                <em>in four simple steps.</em>
              </h2>
            </div>
            <div className="steps">
              {[
                [
                  "01",
                  "Find your tyres",
                  "Search by registration, vehicle or tyre size.",
                ],
                [
                  "02",
                  "Book your service",
                  "Choose your preferred fitting option and location.",
                ],
                [
                  "03",
                  "We come to you",
                  "Our mobile technician arrives with the equipment needed.",
                ],
                [
                  "04",
                  "Back on the road",
                  "Tyres fitted, checked and you're ready to go.",
                ],
              ].map(([num, title, text]) => (
                <div className="step" key={num}>
                  <div className="step-num">{num}</div>
                  <div className="step-line" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BRANDS */}
        <section className="brands-section">
          <div className="container">
            <div className="brands-title">Brands We Offer</div>

            <div className="brands-grid">
              {[
                { name: "Aptany", image: "/aptany.jpeg" },
                { name: "Avon Tyres", image: "/avon.jpeg" },
                { name: "Bridgestone", image: "/bridgestone.jpeg" },
                { name: "Continental", image: "/continental.jpeg" },
                { name: "Cooper Tires", image: "/cooper.jpeg" },
                { name: "Davanti", image: "/davanti.jpeg" },

                { name: "Delinte", image: "/delinte.jpeg" },
                { name: "Dunlop", image: "/dunlop.jpeg" },
                { name: "Envoy", image: "/envoy.jpeg" },
                { name: "Evergreen", image: "/evergreen.jpeg" },
                { name: "Firestone", image: "/firestone.jpeg" },
                { name: "Goodyear", image: "/goodyear.jpeg" },

                { name: "Hankook", image: "/hankook.jpeg" },
                { name: "Linglong Tire", image: "/linglong.jpeg" },
                { name: "Michelin", image: "/michelin.jpeg" },
                { name: "Pirelli", image: "/pirelli.jpeg" },
                { name: "Vredestein", image: "/vredestein.jpeg" },
                { name: "Yokohama", image: "/yokohama.jpeg" },
              ].map((brand) => (
                <div className="brand-card" key={brand.name}>
                  <img
                    src={brand.image}
                    alt={`${brand.name} tyres`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* REVIEWS */}
        <section id="reviews" className="section reviews-section">
          <div className="container">
            <div className="review-top">
              <div>
                <span className="section-kicker">CUSTOMER FEEDBACK</span>
                <h2>
                  Loved by drivers
                  <br />
                  <em>across the region.</em>
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
              {reviews.map(([name, text]) => (
                <article className="review-card" key={name}>
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
          </div>
        </section>

        {/* AREAS */}
        <section id="areas" className="areas-section">
          <div className="container areas-inner">
            <div className="areas-copy">
              <span className="section-kicker">SERVICE COVERAGE</span>
              <h2>
                Serving Manchester
                <br />
                <em>& beyond.</em>
              </h2>
              <p>
                RA Mobile Tyres serves Manchester, Greater Manchester and a
                growing number of surrounding areas.
              </p>
              <button
                className="btn btn-yellow"
                onClick={() => scrollTo("contact")}
              >
                Check Your Area <MapPin size={18} />
              </button>
            </div>
            <div className="areas-cloud">
              {areas.map((area, i) => (
                <button
                  type="button"
                  className={i === 0 ? "area-pill highlight" : "area-pill"}
                  key={area}
                  onClick={() => openArea(area)}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="pricing-section">
          <div className="container">
            <div className="section-heading centered light">
              <span className="section-kicker">TRANSPARENT OPTIONS</span>
              <h2>
                Emergency help when
                <br />
                <em>you need it most.</em>
              </h2>
              <p>
                Current fitting charges shown below — confirm before
                implementation on the live booking system.
              </p>
            </div>
            <div className="price-grid">
              <div className="price-card">
                <span>Same-day fitting</span>
                <strong>£15</strong>
                <small>single tyre</small>
                <p>Free fitting on 2 or more tyres.</p>
              </div>
              <div className="price-card featured">
                <div className="popular">POPULAR</div>
                <span>Emergency before 4pm</span>
                <strong>£45</strong>
                <small>mobile fitting</small>
                <p>For urgent tyre fitting during daytime hours.</p>
              </div>
              <div className="price-card">
                <span>Emergency after 4pm</span>
                <strong>£75</strong>
                <small>mobile fitting</small>
                <p>Out-of-hours emergency support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-copy">
              <span className="section-kicker">GET IN TOUCH</span>
              <h2>
                Need help with a tyre?
                <br />
                <em>Let's get you moving.</em>
              </h2>
              <p>
                Call us for emergency assistance, a tyre quote or advice about
                the right tyres for your vehicle.
              </p>
              <a className="big-phone" href={PHONE_LINK}>
                <Phone size={22} /> {PHONE}
              </a>
              <div className="contact-meta">
                <div>
                  <MapPin />
                  <span>
                    <b>Based in</b>164 Greenside Lane, Droylsden, Greater
                    Manchester M43 7UR
                  </span>
                </div>
                <div>
                  <Headphones />
                  <span>
                    <b>Email</b>ramobiletyres@gmail.com
                  </span>
                </div>
              </div>
            </div>
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <h3>Request a call back</h3>
              <p>Send your details and we'll get back to you.</p>
              <label>
                Your name
                <input required placeholder="Full name" />
              </label>
              <label>
                Phone number
                <input required placeholder="07..." />
              </label>
              <label>
                Email address
                <input type="email" placeholder="you@example.com" />
              </label>
              <label>
                How can we help?
                <textarea
                  rows="4"
                  placeholder="Tell us about your tyre or vehicle..."
                />
              </label>
              <button className="btn btn-blue" type="submit">
                {submitted ? "Request Sent ✓" : "Send Request"}{" "}
                {!submitted && <ArrowRight size={18} />}
              </button>
            </form>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <div className="container faq-grid">
            <div>
              <span className="section-kicker">FAQ</span>
              <h2>
                Questions,
                <br />
                <em>answered.</em>
              </h2>
            </div>
            <div>
              {[
                [
                  "Can you fit tyres at my home or work?",
                  "Yes. The mobile fitting service is designed to fit tyres at convenient locations such as home or work, subject to the service area and booking availability.",
                ],
                [
                  "Do you offer emergency tyre fitting?",
                  "Yes. RA Mobile Tyres offers emergency mobile tyre fitting and out-of-hours services. Call the emergency number for current availability and pricing.",
                ],
                [
                  "Can I search for tyres using my registration?",
                  "Yes. Our booking system supports registration-number search as well as tyre-size search to find the right tyre for your vehicle.",
                ],
                [
                  "Which areas do you cover?",
                  "We cover Manchester and a large surrounding area including Tameside, Stockport, Salford, Trafford, Bolton, Oldham, Rochdale and more. Confirm your postcode when booking.",
                ],
              ].map(([q, a], i) => (
                <div className="faq-item" key={q}>
                  <button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}>
                    <span>{q}</span>
                    <ChevronDown className={faqOpen === i ? "rotated" : ""} />
                  </button>
                  {faqOpen === i && <p>{a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
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
            <h4>Services</h4>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("services");
              }}
            >
              Mobile Fitting
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("services");
              }}
            >
              Emergency Tyres
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("services");
              }}
            >
              Tyre Repair
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("services");
              }}
            >
              Jump Start
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("services");
              }}
            >
              Battery Replacement
            </a>
          </div>
          <div>
            <h4>Company</h4>
            <button onClick={() => scrollTo("reviews")}>Reviews</button>
            <button onClick={() => scrollTo("areas")}>Areas We Cover</button>
            <button onClick={() => scrollTo("contact")}>Contact</button>
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
          <span>Designed for a faster, simpler mobile booking experience.</span>
        </div>
      </footer>

      <a className="floating-call" href={PHONE_LINK}>
        <Phone size={20} />
        <span>Call RA Mobile Tyres</span>
      </a>
    </div>
  );
}
