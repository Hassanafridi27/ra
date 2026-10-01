import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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

const tyreOptions = {
  width: ["165", "175", "185", "195", "205", "215", "225", "235", "245", "255"],
  profile: ["40", "45", "50", "55", "60", "65", "70", "75"],
  rim: ["14", "15", "16", "17", "18", "19", "20"],
  speed: ["T", "H", "V", "W", "Y"],
};

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
  [
    "Sarah Mitchell",
    "Absolutely brilliant! Booked online in minutes and the fitter arrived right on time. Will definitely use again.",
  ],
  [
    "James Thornton",
    "Really impressed with the whole experience. Fast, friendly and very competitive pricing. Highly recommend.",
  ],
  [
    "Emily Clarke",
    "Amazing convenience — tyres fitted on my driveway while I worked from home. Couldn't be easier.",
  ],
  [
    "Mark Patterson",
    "Second time using this service and once again faultless. Punctual, professional and great value.",
  ],
  [
    "Rachel Summers",
    "The fitter was polite, tidy and incredibly quick. Best tyre service I've ever used. Five stars.",
  ],
  [
    "Tom Henderson",
    "Booked the night before and they came next morning. Unbelievable speed and very fair price.",
  ],
  [
    "Lisa Hartley",
    "Smooth process from start to finish. Real-time updates on arrival time were a great touch.",
  ],
  [
    "Andrew Foster",
    "Superb service. The guy knew exactly what he was doing and had both tyres changed in no time.",
  ],
  [
    "Natalie Brooks",
    "So much better than going to a garage. Came to my workplace and got it all sorted in 20 minutes.",
  ],
  [
    "Daniel Pearce",
    "Top quality tyres at a price that beat every local garage. Fast fitting and no fuss whatsoever.",
  ],
];

export default function App() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState("size");
  const [faqOpen, setFaqOpen] = useState(0);
  const [emergencyOptionsOpen, setEmergencyOptionsOpen] = useState(false);
  const [emergencyType, setEmergencyType] = useState("");
  const [emergencyDetailOpen, setEmergencyDetailOpen] = useState(false);
  const [tyreSize, setTyreSize] = useState({
    width: "",
    profile: "",
    rim: "",
    speed: "",
  });
  const [tyreSearchOpen, setTyreSearchOpen] = useState(false);
  const [tyreSearchStep, setTyreSearchStep] = useState("result");
  const [areaPostcode, setAreaPostcode] = useState("");
  const [postcodeChecked, setPostcodeChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const reviewTrackRef = useRef(null);
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
    if (
      selectedArea &&
      typeof window !== "undefined" &&
      typeof window.scrollTo === "function"
    ) {
      try {
        window.scrollTo({ top: 0, behavior: "instant" });
      } catch (error) {
        // Some test environments do not implement scrollTo.
      }
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

  const scrollReviews = (direction) => {
    const track = reviewTrackRef.current;
    if (track) {
      track.scrollBy({
        left: direction * track.clientWidth * 0.85,
        behavior: "smooth",
      });
    }
  };

  const handleTyreSearch = (event) => {
    event.preventDefault();
    setAreaPostcode("");
    setPostcodeChecked(false);
    setTyreSearchStep("result");
    setTyreSearchOpen(true);
  };

  const handlePostcodeCheck = (event) => {
    event.preventDefault();
    setAreaPostcode((postcode) => postcode.trim().toUpperCase());
    setPostcodeChecked(true);
  };

  const selectedTyreSize = `${tyreSize.width}/${tyreSize.profile} R${tyreSize.rim} ${tyreSize.speed}`;

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
                  className={bookingMode === "size" ? "active" : ""}
                  onClick={() => setBookingMode("size")}
                >
                  Tyre Size
                </button>
                <button
                  className={bookingMode === "reg" ? "active" : ""}
                  onClick={() => setBookingMode("reg")}
                >
                  Registration
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
                <form
                  className="booking-form size-form"
                  onSubmit={handleTyreSearch}
                >
                  {["Width", "Profile", "Rim", "Speed"].map((x) => (
                    <label key={x}>
                      <span>{x}</span>
                      <select
                        required
                        value={tyreSize[x.toLowerCase()]}
                        onChange={(event) =>
                          setTyreSize((currentSize) => ({
                            ...currentSize,
                            [x.toLowerCase()]: event.target.value,
                          }))
                        }
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        {tyreOptions[x.toLowerCase()].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                  <button className="btn btn-blue" type="submit">
                    Search Tyres <ArrowRight size={18} />
                  </button>
                </form>
              )}
              <small className="booking-note">
                Please double-check your tyre size before booking.
              </small>
            </div>
          </div>
        </section>

        {tyreSearchOpen && (
          <div
            className="tyre-search-backdrop"
            onClick={() => setTyreSearchOpen(false)}
          >
            <section
              className="tyre-search-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="tyre-search-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="emergency-modal-close"
                type="button"
                aria-label="Close tyre search"
                onClick={() => setTyreSearchOpen(false)}
              >
                <X size={20} />
              </button>
              <ol className="tyre-search-progress" aria-label="Search steps">
                <li className={tyreSearchStep === "result" ? "active" : "done"}>
                  Tyre result
                </li>
                <li className={tyreSearchStep === "postcode" ? "active" : ""}>
                  Check your area
                </li>
              </ol>
              {tyreSearchStep === "result" ? (
                <>
                  <span className="section-kicker">SAMPLE TYRE RESULT</span>
                  <h2 id="tyre-search-title">
                    Tyres matching {selectedTyreSize}
                  </h2>
                  <article className="sample-tyre-card">
                    <div className="sample-tyre-visual" aria-hidden="true">
                      <div />
                    </div>
                    <div className="sample-tyre-copy">
                      <span className="sample-listing-label">
                        DEMONSTRATION LISTING
                      </span>
                      <h3>RA RoadPro Touring</h3>
                      <p>
                        An example all-season touring tyre for everyday driving,
                        designed for dependable grip and a comfortable ride.
                      </p>
                      <strong>From £59.99 per tyre</strong>
                      <small>
                        Sample price only. Final tyre options and fitted price
                        depend on your postcode and availability.
                      </small>
                    </div>
                  </article>
                  <button
                    className="btn btn-blue tyre-search-next"
                    type="button"
                    onClick={() => setTyreSearchStep("postcode")}
                  >
                    Check fitting availability <ArrowRight size={18} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="emergency-back"
                    type="button"
                    onClick={() => {
                      setTyreSearchStep("result");
                      setPostcodeChecked(false);
                    }}
                  >
                    <ChevronLeft size={17} /> Back to tyre result
                  </button>
                  <span className="section-kicker">STEP 2: SERVICE AREA</span>
                  <h2 id="tyre-search-title">Check your fitting area</h2>
                  <p className="tyre-area-intro">
                    Enter the postcode where you need the tyres fitted. Your
                    postcode is used to check the service area and confirm the
                    final fitting price.
                  </p>
                  <div className="tyre-size-summary">
                    Sample tyre size: <strong>{selectedTyreSize}</strong>
                  </div>
                  <form
                    className="postcode-check-form"
                    onSubmit={handlePostcodeCheck}
                  >
                    <label htmlFor="tyre-search-postcode">Your postcode</label>
                    <div>
                      <input
                        id="tyre-search-postcode"
                        autoComplete="postal-code"
                        placeholder="e.g. M43 7UR"
                        pattern="[A-Za-z]{1,2}[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}"
                        title="Enter a valid UK postcode"
                        required
                        value={areaPostcode}
                        onChange={(event) => {
                          setAreaPostcode(event.target.value);
                          setPostcodeChecked(false);
                        }}
                      />
                      <button className="btn btn-blue" type="submit">
                        Check postcode
                      </button>
                    </div>
                  </form>
                  {postcodeChecked && (
                    <p className="postcode-check-result" role="status">
                      We&apos;ve noted {areaPostcode}. Contact RA Mobile Tyres
                      to confirm live service availability, stock and your
                      final fitted price.
                    </p>
                  )}
                </>
              )}
            </section>
          </div>
        )}

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
                  <button
                    onClick={() => {
                      if (title === "Emergency Call-Out") {
                        setEmergencyType("");
                        setEmergencyDetailOpen(false);
                        setEmergencyOptionsOpen(true);
                      } else {
                        scrollTo("contact");
                      }
                    }}
                  >
                    {title === "Emergency Call-Out"
                      ? "Choose emergency service"
                      : "Learn more"}{" "}
                    <ArrowRight size={16} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {emergencyOptionsOpen && (
          <div
            className="emergency-modal-backdrop"
            onClick={() => setEmergencyOptionsOpen(false)}
          >
            <section
              className={
                emergencyDetailOpen
                  ? "emergency-modal emergency-modal-large"
                  : "emergency-modal"
              }
              role="dialog"
              aria-modal="true"
              aria-labelledby="emergency-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="emergency-modal-close"
                type="button"
                aria-label="Close emergency options"
                onClick={() => setEmergencyOptionsOpen(false)}
              >
                <X size={20} />
              </button>
              {emergencyDetailOpen ? (
                <div className="emergency-detail">
                  <button
                    className="emergency-back"
                    type="button"
                    onClick={() => {
                      setEmergencyDetailOpen(false);
                      setEmergencyType("");
                    }}
                  >
                    <ChevronLeft size={17} /> Back to emergency options
                  </button>
                  {emergencyType === "motorway" ? (
                    <>
                      <span className="section-kicker">
                        MOTORWAY EMERGENCY TYRE BREAKDOWN
                      </span>
                      <h2 id="emergency-modal-title">
                        Need Emergency Motorway Tyre Assistance?
                      </h2>
                      <p>
                        Don&apos;t arrange recovery just to visit a tyre shop if
                        the tyre can safely be replaced where you are. Let the
                        tyre shop come to you.
                      </p>
                      <p className="emergency-detail-lead">
                        RA Mobile Tyres — Emergency Mobile Tyre Fitting When You
                        Need It Most.
                      </p>
                      <div className="emergency-detail-cta">
                        <strong>GET EMERGENCY ASSISTANCE</strong>
                        <a className="btn btn-blue" href={PHONE_LINK}>
                          <Phone size={17} /> CALL NOW
                        </a>
                      </div>
                      <h3>
                        Stranded on the motorway with a flat or damaged tyre?
                      </h3>
                      <p>
                        A tyre blowout, puncture or damaged tyre on the motorway
                        can leave you in a stressful and potentially dangerous
                        situation. RA Mobile Tyres provides an emergency mobile
                        tyre fitting service designed to get you safely back on
                        the road as quickly as possible.
                      </p>
                      <p>
                        Our mobile tyre fitting vans can come directly to your
                        location, assess the problem and, where it is safe to do
                        so, replace your tyre at the roadside.
                      </p>
                      <h3>Emergency Mobile Tyre Assistance</h3>
                      <p>
                        Whether you&apos;ve suffered a sudden blowout, severe
                        puncture, sidewall damage or a tyre that is no longer
                        safe to drive on, our team is ready to help.
                      </p>
                      <h3>Don&apos;t Risk Driving on a Damaged Tyre</h3>
                      <p>
                        Continuing to drive on a flat or severely damaged tyre
                        can cause further damage to your wheel and vehicle and
                        may put you and other road users at risk.
                      </p>
                      <p>
                        If you&apos;re in a safe location, contact RA Mobile
                        Tyres and we&apos;ll arrange mobile tyre assistance to
                        come to you.
                      </p>
                      <h3>What Happens Next?</h3>
                      <ol className="emergency-steps">
                        <li>
                          <strong>Tell us where you are</strong>
                          <span>
                            Send us your motorway, junction, service area or
                            precise location.
                          </span>
                        </li>
                        <li>
                          <strong>Tell us your vehicle and tyre size</strong>
                          <span>
                            We&apos;ll identify the correct tyre and confirm
                            available options.
                          </span>
                        </li>
                        <li>
                          <strong>Receive your price</strong>
                          <span>
                            We&apos;ll confirm the cost before dispatch.
                          </span>
                        </li>
                        <li>
                          <strong>We come to you</strong>
                          <span>
                            Our mobile tyre fitter travels to your location with
                            the equipment required to replace your tyre.
                          </span>
                        </li>
                        <li>
                          <strong>Get back on the road</strong>
                          <span>
                            Once your tyre has been replaced and checked, you
                            can continue your journey.
                          </span>
                        </li>
                      </ol>
                    </>
                  ) : (
                    <>
                      <span className="section-kicker">
                        ROADSIDE EMERGENCY TYRE BREAKDOWN
                      </span>
                      <h2 id="emergency-modal-title">
                        Emergency Tyre Help When You&apos;re Stranded
                      </h2>
                      <p>
                        A tyre problem can happen without warning. That&apos;s
                        why our emergency service is built around one simple
                        idea:
                      </p>
                      <p className="emergency-detail-lead">
                        You don&apos;t come to the tyre shop. We bring the tyre
                        shop to you.
                      </p>
                      <p>
                        For fast roadside tyre assistance, contact RA Mobile
                        Tyres.
                      </p>
                      <div className="emergency-detail-cta">
                        <strong>GET EMERGENCY ASSISTANCE</strong>
                        <a className="btn btn-blue" href={PHONE_LINK}>
                          <Phone size={17} /> CALL NOW
                        </a>
                      </div>
                      <h3>Flat tyre? Blowout? Stranded at the roadside?</h3>
                      <p>Don&apos;t let a damaged tyre leave you stuck.</p>
                      <p>
                        RA Mobile Tyres brings the tyre shop directly to you,
                        providing emergency mobile tyre fitting when you&apos;re
                        stranded at the roadside and unable to continue your
                        journey safely.
                      </p>
                      <p>
                        Whether you&apos;re stuck on a main road, outside work,
                        in a car park or away from home, simply tell us where
                        you are and what tyre you need.
                      </p>
                      <h3>Emergency Tyre Replacement at Your Location</h3>
                      <p>
                        Our mobile tyre fitting vans are equipped to replace
                        tyres away from a traditional tyre shop.
                      </p>
                      <p>We can help with:</p>
                      <ul className="emergency-help-list">
                        <li>Flat tyres</li>
                        <li>Tyre blowouts</li>
                        <li>Punctures</li>
                        <li>Sidewall damage</li>
                        <li>Pothole-damaged tyres</li>
                        <li>Split or damaged tyres</li>
                        <li>Emergency tyre replacement</li>
                        <li>Vehicles without a spare wheel</li>
                        <li>Multiple tyre replacements</li>
                      </ul>
                      <h3>How It Works</h3>
                      <ol className="emergency-steps">
                        <li>
                          <strong>Contact RA Mobile Tyres</strong>
                          <span>
                            Give us your location and vehicle registration.
                          </span>
                        </li>
                        <li>
                          <strong>We&apos;ll identify your tyre</strong>
                          <span>
                            Provide your tyre size if you know it, or send us a
                            clear photograph of the tyre markings.
                          </span>
                        </li>
                        <li>
                          <strong>Choose your tyre</strong>
                          <span>
                            Subject to availability, we&apos;ll provide suitable
                            tyre options and confirm your price.
                          </span>
                        </li>
                        <li>
                          <strong>Mobile fitter dispatched</strong>
                          <span>
                            We&apos;ll send a mobile tyre fitter directly to
                            your location.
                          </span>
                        </li>
                        <li>
                          <strong>Tyre fitted at the roadside</strong>
                          <span>
                            Where it is safe to carry out the work, we&apos;ll
                            replace the damaged tyre and get you moving again.
                          </span>
                        </li>
                      </ol>
                      <h3>No Spare Tyre? No Problem.</h3>
                      <p>
                        Many modern vehicles no longer carry a full-size spare
                        wheel. If your tyre cannot be safely driven on, that
                        doesn&apos;t necessarily mean you need to have the
                        vehicle recovered to a garage.
                      </p>
                      <p>
                        Our mobile service can bring a replacement tyre and
                        fitting equipment directly to you.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <span className="section-kicker">EMERGENCY TYRE SUPPORT</span>
                  <h2 id="emergency-modal-title">
                    What do you need help with?
                  </h2>
                  <p className="emergency-modal-intro">
                    Choose the situation that best describes where you are.
                  </p>
                  <div className="emergency-options">
                    <button
                      className="emergency-option"
                      type="button"
                      onClick={() => {
                        setEmergencyType("motorway");
                        setEmergencyDetailOpen(true);
                      }}
                    >
                      <span className="emergency-option-title">
                        Emergency motorway breakdown
                      </span>
                      <span className="emergency-option-description">
                        Urgent tyre help after a motorway breakdown.
                      </span>
                    </button>
                    <button
                      className="emergency-option"
                      type="button"
                      onClick={() => {
                        setEmergencyType("roadside");
                        setEmergencyDetailOpen(true);
                      }}
                    >
                      <span className="emergency-option-title">
                        Emergency roadside breakdown
                      </span>
                      <span className="emergency-option-description">
                        Mobile support for a tyre problem at the roadside.
                      </span>
                    </button>
                  </div>
                  <a
                    className="btn btn-blue emergency-call-button"
                    href={PHONE_LINK}
                  >
                    <Phone size={17} /> Call now for an immediate response
                  </a>
                </>
              )}
            </section>
          </div>
        )}

        {/* SPLIT */}
        <section className="split-section">
          <div className="split-image">
            <div className="image-badge">
              <strong>45–90</strong>
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
              Mobile Tyre Fitting
              <br />
              <em>Wherever You Need Us</em>
            </h2>
            <p>
              <strong>
                Stranded Roadside? Broken Down on the Motorway? At Home or Work?
                We Come to You.
              </strong>
            </p>
            <p>
              From urgent motorway breakdowns and roadside emergencies to
              convenient tyre fitting at your home, workplace or any safe
              location, our mobile tyres service has got you covered. Our mobile
              tyre fitters come directly to you, helping you get back on the
              road quickly, safely and with minimum hassle.
            </p>
            <div className="check-list">
              {[
                "Emergency Roadside Tyre Fitting",
                "Motorway Breakdown Assistance",
                "Home & Workplace Tyre Fitting",
                "Puncture & Tyre Replacement",
                "Fast Mobile Response",
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
            <p className="split-closing">
              No garage. No queues. No hassle. Just fast mobile tyre fitting
              that gets you moving again.
            </p>
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
              <div className="review-tools">
                <div className="rating-box">
                  <div>
                    <strong>4.9</strong>
                    <span>/ 5</span>
                  </div>
                  <div className="stars">★★★★★</div>
                  <small>Based on 1,200+ Google reviews</small>
                </div>
                <div className="review-controls" aria-label="Review navigation">
                  <button
                    type="button"
                    aria-label="Previous reviews"
                    onClick={() => scrollReviews(-1)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next reviews"
                    onClick={() => scrollReviews(1)}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
            <div className="review-grid" ref={reviewTrackRef}>
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
                <span>Same-day fitting Starts from*</span>
                <strong>£45</strong>
                <small>Mobile Fitting</small>
                <p>
                  For non emergency tyre fitting during daytime hours, depending
                  on the location.
                </p>
              </div>
              <div className="price-card featured">
                <div className="popular">POPULAR</div>
                <span>Emergency before 4pm Starts from*</span>
                <strong>£75</strong>
                <small>mobile fitting</small>
                <p>
                  For urgent tyre fitting during daytime hours, depending on the
                  location.
                </p>
              </div>
              <div className="price-card">
                <span>Emergency after 4pm Starts from*</span>
                <strong>£100</strong>
                <small>mobile fitting</small>
                <p>
                  Out-of-hours emergency support, depending on the location.
                </p>
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
                [
                  "How do I book a mobile tyre fitting?",
                  "You can book online through our website at any time. Simply enter your registration number or tyre size, choose your tyres, select a date and time, and confirm your location.",
                ],
                [
                  "How long does a mobile tyre fitting take?",
                  "Most standard tyre fits take between 20 and 45 minutes depending on the number of tyres and vehicle type. Our fitter will work efficiently with minimal disruption to your day.",
                ],
                [
                  "What brands of tyres do you supply?",
                  "We stock a wide range of tyres from leading brands including Michelin, Pirelli, Continental, Bridgestone, Goodyear, and more affordable budget options. All tyres are sourced from reputable suppliers.",
                ],
                [
                  "Is there a call-out fee for mobile fitting?",
                  "No hidden call-out fees. The price you see when booking includes the tyre, fitting, balancing and valve replacement. You only pay what is quoted at the time of booking.",
                ],
                [
                  "Do you balance the tyres after fitting?",
                  "Yes. All tyres are balanced as standard after fitting using professional-grade mobile balancing equipment to ensure a smooth and safe ride.",
                ],
                [
                  "What payment methods do you accept?",
                  "We accept all major credit and debit cards, as well as contactless payments. Payment is taken securely at the time of booking or on completion of the job.",
                ],
                [
                  "Can you fit run-flat tyres?",
                  "Yes. Our fitters are experienced with run-flat tyres. Please ensure you select the correct run-flat option when searching for tyres during the booking process.",
                ],
                [
                  "What if I am not sure what tyre size I need?",
                  "You can find your tyre size printed on the sidewall of your existing tyre or by entering your vehicle registration into our booking system, which will automatically identify the correct size.",
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
