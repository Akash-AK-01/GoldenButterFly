// ============================================================
//  src/pages/HomePage.jsx
//  Golden Butterflies — Children's Palliative Care Foundation
// ============================================================
//
//  HOW TO ADD YOUR PHOTOS:
//  1. Drop your GB images into:  src/assets/images/
//  2. Import them at the top:
//       import heroImg from "../assets/images/hero.jpg";
//  3. Replace the PLACEHOLDER urls in the IMG object below.
//
//  HOW TO ADD THE LOGO:
//  1. Download GB Logo-04.png from your Drive
//  2. Place in:  src/assets/images/logo.png
//  3. Uncomment:  import logo from "../assets/images/logo.png";
//  4. Set:  logo: logo   inside the IMG object
// ============================================================

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ── Google Fonts ─────────────────────────────────────────────
const injectFonts = () => {
    if (document.getElementById("gb-fonts")) return;
    const l = document.createElement("link");
    l.id = "gb-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(l);
};

// ── Intersection observer reveal ─────────────────────────────
function useReveal(threshold = 0.14) {
    const ref = useRef(null);
    const [on, set] = useState(false);
    useEffect(() => {
        injectFonts();
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) set(true); },
            { threshold }
        );
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, []);
    return [ref, on];
}

function Reveal({ children, delay = 0, y = 28, style = {}, className = "" }) {
    const [ref, on] = useReveal();
    return (
        <div ref={ref} className={className}
            style={{
                opacity: on ? 1 : 0, transform: on ? "none" : `translateY(${y}px)`,
                transition: `opacity .9s ease ${delay}s, transform .9s ease ${delay}s`, ...style
            }}>
            {children}
        </div>
    );
}

// ── Animated stat counter ────────────────────────────────────
function Counter({ raw, suffix = "" }) {
    const [val, set] = useState(0);
    const [ref, on] = useReveal(0.5);
    const num = parseInt(raw, 10);
    useEffect(() => {
        if (!on) return;
        let cur = 0;
        const step = Math.ceil(num / 60);
        const id = setInterval(() => {
            cur += step;
            if (cur >= num) { set(num); clearInterval(id); }
            else set(cur);
        }, 22);
        return () => clearInterval(id);
    }, [on, num]);
    return <span ref={ref}>{val.toLocaleString("en-IN")}{suffix}</span>;
}

// ── Static data ───────────────────────────────────────────────
const NAV = [
    { label: "Why Supportive (Palliative) care", to: "/why-palliative-care" },
    { label: "What We Do", to: "/what-we-do" },
    {
        label: "Who We Are", to: "/who-we-are",
        dropdown: [
            { label: "Our Purpose & People", to: "/who-we-are/purpose" },
            { label: "Where We Work", to: "/who-we-are/where-we-work" },
            { label: "Publications", to: "/who-we-are/publications" },
            { label: "Awards", to: "/who-we-are/awards" },
            { label: "Annual Reports", to: "/who-we-are/annual-reports" },
            { label: "Get Involved", to: "/get-involved" },
        ]
    },
    { label: "Celebrations & Moments", to: "/celebrations" },
    { label: "Donation", to: "/donate" },
];

const STATS = [
    { raw: "2000", suffix: "+", label: "Children Enrolled" },
    { raw: "380", suffix: "+", label: "Home Care Visits" },
    { raw: "8000", suffix: "+", label: "Art & Therapy Sessions" },
    { raw: "150", suffix: "+", label: "Bereavement Counselling" },
    { raw: "500", suffix: "+", label: "Families Supported" },
    { raw: "2500", suffix: "+", label: "Training Programs" },
];

const SERVICES = [
    {
        icon: "🏥", title: "Holistic Care", sub: "Hospital & Home",
        body: "We support children and families across hospital, home, and respite settings — ensuring care continues wherever it is needed most, with comfort, dignity, and continuity.",
        to: "/what-we-do#holistic"
    },
    {
        icon: "🎨", title: "Expressive & Therapeutic", sub: "Activities",
        body: "Through art, music, play, movement, and storytelling, children are given safe spaces to communicate feelings that are difficult to put into words.",
        to: "/what-we-do#expressive"
    },
    {
        icon: "📚", title: "Capacity Building", sub: "& Advocacy",
        body: "Certificate courses for nurses and social workers, awareness programs across schools and hospitals, and our unique game-based learning experience — Aram Vizha.",
        to: "/what-we-do#advocacy"
    },
    {
        icon: "🕊️", title: "Grief & Bereavement", sub: "Support Circles",
        body: "Our care continues even after loss. Through our biannual Finding Strength in Loss circles, bereaved families find compassion, community, and a space to heal.",
        to: "/what-we-do#bereavement"
    },
];

const TIERS = [
    { amt: "₹500", label: "Bring Comfort", desc: "Provides small essentials that ease a child's day." },
    { amt: "₹1,000", label: "Support a Visit", desc: "Helps a child and family travel for care." },
    { amt: "₹2,000", label: "Care for the Family", desc: "Supports counselling and emotional care." },
    { amt: "₹2,500", label: "Enable Care", desc: "Supports medicines, scans, and basic tests." },
    { amt: "₹5,000", label: "Support the Family", desc: "Helps with livelihood and essential needs." },
    { amt: "₹10,000", label: "Sustain Treatment", desc: "Helps continue ongoing medical care." },
];

import heroImg from "../assets/images/Photos/Home Page/DSC04148.jpg";
import care1Img from "../assets/images/Photos/Home Page/DSC04790.jpg";
import care2Img from "../assets/images/Photos/Home Page/DSC04925.jpg";
import cel1Img from "../assets/images/Photos/Home Page/DSC05107.jpg";
import cel2Img from "../assets/images/Photos/Home Page/DSC05588.jpg";
import cel3Img from "../assets/images/Photos/Home Page/DSC_4870.JPG";

const IMG = {
    logo: null,
    hero: heroImg,
    care1: care1Img,
    care2: care2Img,
    cel1: cel1Img,
    cel2: cel2Img,
    cel3: cel3Img,
};

// ─────────────────────────────────────────────────────────────
export default function HomePage() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTier, setActiveTier] = useState("₹2,500");
    const [customAmt, setCustomAmt] = useState("");
    const [donated, setDonated] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const displayAmt = customAmt ? `₹${customAmt}` : activeTier;

    return (
        <>
            <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; overflow-x: hidden; }
        body { background: #FDFAF6; overflow-x: hidden; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .sans  { font-family: 'DM Sans', system-ui, sans-serif; }

        /* ── Buttons ── */
        .btn-gold {
          display: inline-block; background: #C47A3A; color: #fff;
          border: none; border-radius: 2px; padding: 14px 36px;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer; transition: background .25s, transform .18s;
          text-decoration: none;
        }
        .btn-gold:hover { background: #A85F22; transform: translateY(-1px); }

        .btn-ghost {
          display: inline-block; background: transparent; color: #C47A3A;
          border: 1.5px solid #C47A3A; border-radius: 2px; padding: 13px 34px;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer; transition: background .25s, color .25s;
          text-decoration: none;
        }
        .btn-ghost:hover { background: #C47A3A; color: #fff; }

        .btn-ghost-lt {
          display: inline-block; background: transparent; color: #EDE0D0;
          border: 1.5px solid #EDE0D0; border-radius: 2px; padding: 13px 34px;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer; transition: background .25s, color .25s;
          text-decoration: none;
        }
        .btn-ghost-lt:hover { background: #EDE0D0; color: #1E1410; }

        /* ── Helpers ── */
        .eyebrow {
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 3px; text-transform: uppercase; color: #C47A3A;
        }
        .gold-rule      { width: 42px; height: 1.5px; background: #C47A3A; margin: 18px auto; }
        .gold-rule-left { width: 42px; height: 1.5px; background: #C47A3A; margin: 18px 0; }

        /* ── Cards ── */
        .svc-card {
          background: #fff; border: 1px solid #EDE0D0; padding: 38px 30px;
          border-radius: 2px; height: 100%;
          transition: transform .25s, box-shadow .25s;
        }
        .svc-card:hover { transform: translateY(-5px); box-shadow: 0 18px 44px rgba(30,20,10,.08); }

        /* ── Donation tier ── */
        .tier {
          border: 1px solid #E8D9C8; padding: 20px 16px;
          background: #fff; cursor: pointer; border-radius: 2px;
          text-align: left; transition: border-color .2s, background .2s;
        }
        .tier:hover, .tier.on { border-color: #C47A3A; background: #FDF6EE; }
        .tier.on { border-width: 1.5px; }

        /* ── Nav ── */
        .nav-link {
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
          letter-spacing: 1.4px; text-transform: uppercase; color: #5C4033;
          text-decoration: none; transition: color .2s;
        }
        .nav-link:hover { color: #C47A3A; }

        /* ── Dropdown ── */
        .nav-dropdown-wrap {
          position: relative; display: inline-flex; align-items: center;
        }
        .nav-dropdown-wrap:hover .nav-dropdown { opacity: 1; pointer-events: auto; transform: translateY(0); }
        .nav-dropdown {
          position: absolute; top: calc(100% + 14px); left: 50%;
          transform: translateX(-50%) translateY(-6px);
          min-width: 220px; background: #FDFAF6;
          border: 1px solid #EDE0D0; border-radius: 4px;
          box-shadow: 0 12px 32px rgba(30,20,10,.10);
          opacity: 0; pointer-events: none;
          transition: opacity .22s ease, transform .22s ease;
          z-index: 400; padding: 8px 0;
        }
        .nav-dropdown::before {
          content: ''; position: absolute; top: -6px; left: 50%;
          transform: translateX(-50%);
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 6px solid #EDE0D0;
        }
        .nav-dropdown::after {
          content: ''; position: absolute; top: -5px; left: 50%;
          transform: translateX(-50%);
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 6px solid #FDFAF6;
        }
        .dd-link {
          display: block; padding: 10px 22px;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 400;
          color: #5C4033; text-decoration: none; letter-spacing: 0.5px;
          transition: background .18s, color .18s;
          white-space: nowrap;
        }
        .dd-link:hover { background: #FDF6EE; color: #C47A3A; }
        .dd-caret { font-size: 8px; margin-left: 5px; color: #C47A3A; transition: transform .2s; }
        .nav-dropdown-wrap:hover .dd-caret { transform: rotate(180deg); }

        /* ── Input ── */
        .amt-in {
          width: 100%; border: 1px solid #D9C9B4; padding: 12px 16px 12px 28px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; color: #1E1410;
          background: #fff; border-radius: 2px; outline: none;
        }
        .amt-in:focus { border-color: #C47A3A; }

        /* ── Footer link ── */
        .ft-link {
          display: block; font-family: 'DM Sans', sans-serif; font-size: 13px;
          color: #6B5040; font-weight: 300; margin-bottom: 11px;
          text-decoration: none; transition: color .2s;
        }
        .ft-link:hover { color: #C47A3A; }

        /* ── Social ── */
        .soc {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid #E8D9C8; display: flex; align-items: center;
          justify-content: center; font-size: 15px; text-decoration: none;
          color: #1E1410;
          transition: border-color .2s, background .2s;
        }
        .soc:hover { border-color: #C47A3A; background: rgba(196,122,58,.15); color: #C47A3A; }

        /* ── Hero text in ── */
        @keyframes hIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        .h1 { animation: hIn 1s ease .08s both; }
        .h2 { animation: hIn 1s ease .28s both; }
        .h3 { animation: hIn 1s ease .48s both; }
        .h4 { animation: hIn 1s ease .66s both; }
        .h5 { animation: hIn 1s ease .82s both; }

        /* ── Scroll caret ── */
        @keyframes cb { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
        .caret { animation: cb 2s ease-in-out infinite; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .svc-grid  { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 640px) {
          .two-col   { flex-direction: column !important; }
          .stat-grid { grid-template-columns: 1fr 1fr !important; }
          .svc-grid  { grid-template-columns: 1fr !important; }
          .tier-grid { grid-template-columns: 1fr !important; }
          .nav-links { display: none !important; }
          .mob-btn   { display: flex !important; }
          .photo-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          .photo-grid img { grid-row: auto !important; grid-column: 1 / -1 !important; height: auto !important; max-height: 250px !important; }
        }
        @media (min-width: 641px) { .mob-btn { display: none !important; } }
      `}</style>

            {/* ════ NAVBAR ════════════════════════════════════════ */}
            <nav style={{
                position: "sticky", top: 0, zIndex: 300,
                background: "rgba(253,250,246,0.97)",
                backdropFilter: "blur(10px)",
                borderBottom: "1px solid #EDE0D0",
                boxShadow: scrolled ? "0 2px 18px rgba(30,20,10,.07)" : "none",
                padding: "0 5%", height: 70,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                transition: "box-shadow .3s",
            }}>
                {/* Brand */}
                <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
                    {IMG.logo
                        ? <img src={IMG.logo} alt="Golden Butterflies logo" style={{ height: 44 }} />
                        : <>
                            <div style={{
                                width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                                background: "linear-gradient(135deg,#C47A3A,#E8A96A)",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <span style={{ fontSize: 20 }}>🦋</span>
                            </div>
                            <div>
                                <p className="serif" style={{ fontSize: 18, fontWeight: 500, color: "#1E1410", lineHeight: 1.1 }}>Golden Butterflies</p>
                                <p className="sans" style={{ fontSize: 9.5, letterSpacing: 1.8, color: "#8B6A50", textTransform: "uppercase", fontWeight: 500 }}>
                                    Children's Palliative Care
                                </p>
                            </div>
                        </>
                    }
                </Link>

                {/* Desktop links */}
                <div className="nav-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
                    {NAV.map(l => l.dropdown ? (
                        <div key={l.label} className="nav-dropdown-wrap">
                            <Link to={l.to} className="nav-link" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                {l.label}
                                <span className="dd-caret">▼</span>
                            </Link>
                            <div className="nav-dropdown">
                                {l.dropdown.map(d => (
                                    <Link key={d.label} to={d.to} className="dd-link">{d.label}</Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Link key={l.label} to={l.to} className="nav-link">{l.label}</Link>
                    ))}
                </div>

                <Link to="/gift-today" className="btn-gold" style={{ padding: "10px 22px", fontSize: 11 }}>Gift Today</Link>

                {/* Mobile hamburger */}
                <button className="mob-btn" onClick={() => setMenuOpen(!menuOpen)}
                    style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 4 }}>
                    {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: 22, height: 1.5, background: "#5C4033" }} />)}
                </button>
            </nav>

            {menuOpen && (
                <div style={{ background: "#FDFAF6", borderBottom: "1px solid #EDE0D0", padding: "16px 5%", display: "flex", flexDirection: "column", gap: 12 }}>
                    {NAV.map(l => l.dropdown ? (
                        <div key={l.label}>
                            <Link to={l.to} className="nav-link" onClick={() => setMenuOpen(false)}
                                style={{ display: "block", marginBottom: 8 }}>{l.label}</Link>
                            <div style={{ paddingLeft: 16, display: "flex", flexDirection: "column", gap: 8, borderLeft: "2px solid #EDE0D0" }}>
                                {l.dropdown.map(d => (
                                    <Link key={d.label} to={d.to} className="nav-link"
                                        style={{ fontSize: 11, letterSpacing: 1, color: "#8B6A50" }}
                                        onClick={() => setMenuOpen(false)}>{d.label}</Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Link key={l.label} to={l.to} className="nav-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
                    ))}
                    <Link to="/gift-today" className="btn-gold" style={{ textAlign: "center", marginTop: 8 }} onClick={() => setMenuOpen(false)}>Gift Today</Link>
                </div>
            )}

            {/* ════ HERO ══════════════════════════════════════════ */}
            <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
                {/* BG image — swap IMG.hero with your imported photo */}
                <div style={{ position: "absolute", inset: 0, background: `url(${IMG.hero}) center/cover no-repeat`, zIndex: 0 }} />
                {/* Gradient overlay */}
                <div style={{
                    position: "absolute", inset: 0, zIndex: 1,
                    background: "linear-gradient(108deg, rgba(12,6,2,.85) 0%, rgba(12,6,2,.55) 50%, rgba(12,6,2,.12) 100%)"
                }} />

                <div style={{ position: "relative", zIndex: 2, padding: "80px 5%", maxWidth: 760 }}>

                    <p className="h1 eyebrow" style={{ color: "#E8A96A", marginBottom: 24 }}>
                        Golden Butterflies Foundation · Chennai, India
                    </p>

                    <h1 className="h2 serif" style={{ fontSize: "clamp(34px,5vw,56px)", fontWeight: 300, lineHeight: 1.15, color: "#FDF6EE", marginBottom: 24 }}>
                        Why Supportive<br />
                        <em style={{ fontStyle: "italic", color: "#E8A96A" }}>(Palliative) Care?</em>
                    </h1>

                    {/* Dame Cicely Saunders quote */}
                    <blockquote className="h3" style={{ borderLeft: "2px solid #C47A3A", paddingLeft: 20, marginBottom: 34 }}>
                        <p className="serif" style={{ fontStyle: "italic", fontSize: "clamp(15px,1.9vw,18px)", color: "#D4B896", lineHeight: 1.8, fontWeight: 300 }}>
                            "You matter because you are you, and you matter to the last moment of your life."
                        </p>
                        <p className="sans" style={{ fontSize: 10.5, color: "#A88060", marginTop: 10, letterSpacing: 1.5, textTransform: "uppercase" }}>
                            — Dame Cicely Saunders
                        </p>
                    </blockquote>

                    <p className="h4 sans" style={{ fontSize: "clamp(14px,1.6vw,16px)", lineHeight: 1.9, color: "#C4A888", maxWidth: 530, marginBottom: 44, fontWeight: 300 }}>
                        When a child is living with a serious illness, care must go beyond treatment. It must hold space for their pain, their fears, their moments of joy, and the people who love them.
                    </p>

                    <div className="h5" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <Link to="/gift-today" className="btn-gold">Support a Child</Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="caret" style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 2, textAlign: "center", opacity: .5 }}>
                    <div style={{ width: 1, height: 44, background: "#C47A3A", margin: "0 auto 8px" }} />
                    <p className="sans" style={{ fontSize: 9, color: "#C47A3A", letterSpacing: 2.5, textTransform: "uppercase" }}>Scroll</p>
                </div>
            </section>

            {/* ════ QUOTE STRIP ═══════════════════════════════════ */}
            <div style={{ background: "#FDFAF6", padding: "30px 5%", textAlign: "center", borderTop: "1px solid #EDE0D0" }}>
                <p className="serif" style={{ fontStyle: "italic", fontSize: "clamp(15px,2.2vw,21px)", color: "#C47A3A", lineHeight: 1.65, maxWidth: 860, margin: "0 auto" }}>
                    "Pediatric palliative care is about ensuring that no child or family walks this journey alone."
                </p>
            </div>

            {/* ════ ABOUT — what is palliative care ═══════════════ */}
            <section style={{ background: "#FDFAF6", padding: "96px 5%" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div className="two-col" style={{ display: "flex", gap: 72, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 80 }}>
                        {/* Photo collage */}
                        <Reveal delay={0.1} style={{ flex: "1 1 300px" }}>
                            <div className="photo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "220px 220px", gap: 12 }}>
                                <img src={IMG.care1} alt="Care visit" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2, gridRow: "1/3" }} />
                                <img src={IMG.care2} alt="Family support" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }} />
                                <div style={{ background: "#C47A3A", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", padding: 22 }}>
                                    <p className="serif" style={{ fontStyle: "italic", fontSize: 16, color: "#FDF6EE", lineHeight: 1.65, textAlign: "center" }}>
                                        "Care that holds space for every moment of life."
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        {/* Text: What is Pediatric Palliative Care */}
                        <Reveal delay={0.25} style={{ flex: "1 1 300px" }}>
                            <h2 className="serif" style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 300, lineHeight: 1.25, color: "#1E1410" }}>
                                What is Pediatric<br />
                                <em style={{ color: "#E8A96A", fontStyle: "italic" }}>Palliative Care?</em>
                            </h2>
                            <div className="gold-rule-left" />
                            <p className="sans" style={{ fontSize: 15, lineHeight: 1.95, color: "#6B5040", fontWeight: 300, marginBottom: 20 }}>
                                Pediatric palliative care is a holistic approach to supporting children with serious or life-limiting illnesses. It focuses on improving quality of life through medical care, emotional support, and compassionate presence.
                            </p>
                            <p className="sans" style={{ fontSize: 15, lineHeight: 1.95, color: "#6B5040", fontWeight: 300, marginBottom: 20 }}>
                                It begins at diagnosis and continues alongside treatment, adapting to the needs of the child and their family at every stage.
                            </p>
                            <p className="sans" style={{ fontSize: 15, lineHeight: 1.95, color: "#6B5040", fontWeight: 300, marginBottom: 28 }}>
                                It is not only about the final days of life. It is not about giving up on treatment. It is not limited to pain management alone.{" "}
                                <strong style={{ color: "#C4A070", fontWeight: 500 }}>
                                    It is about living as fully and comfortably as possible, for as long as possible.
                                </strong>
                            </p>
                        </Reveal>
                    </div>

                    <div className="two-col" style={{ display: "flex", gap: 72, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 80 }}>
                        <Reveal delay={0.1} style={{ flex: "1 1 300px" }}>
                            <h3 className="serif" style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 300, color: "#1E1410", marginBottom: 16 }}>Why It Matters</h3>
                            <div className="gold-rule-left" style={{ width: 30 }} />
                            <p className="sans" style={{ fontSize: 15, lineHeight: 1.95, color: "#6B5040", fontWeight: 300, marginBottom: 16 }}>
                                A child's illness affects far more than the body.
                            </p>
                            <p className="sans" style={{ fontSize: 15, lineHeight: 1.95, color: "#6B5040", fontWeight: 300, marginBottom: 16 }}>
                                There is physical discomfort, but also fear, confusion, and emotional distress. Families carry the weight of uncertainty, decision-making, and caregiving, often without enough support.
                            </p>
                            <p className="sans" style={{ fontSize: 15, lineHeight: 1.95, color: "#6B5040", fontWeight: 300, marginBottom: 16 }}>
                                Medical treatment alone cannot address all of this.
                            </p>
                            <p className="sans" style={{ fontSize: 15, lineHeight: 1.95, color: "#6B5040", fontWeight: 300 }}>
                                Pediatric palliative care brings in the missing layer — one that focuses on comfort, connection, and dignity, for both the child and their family.
                            </p>
                        </Reveal>

                        <Reveal delay={0.2} style={{ flex: "1 1 300px" }}>
                            <h3 className="serif" style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 300, color: "#1E1410", marginBottom: 16 }}>What Does This Care Include?</h3>
                            <div className="gold-rule-left" style={{ width: 30 }} />
                            {["Pain and symptom management", "Emotional and psychological support",
                                "Support for parents and caregivers", "Guidance through complex medical journeys",
                                "End-of-life care, when needed"].map(item => (
                                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 13, marginBottom: 12 }}>
                                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C47A3A", marginTop: 8, flexShrink: 0 }} />
                                        <p className="sans" style={{ fontSize: 15, color: "#6B5040", fontWeight: 300 }}>{item}</p>
                                    </div>
                                ))}
                        </Reveal>
                    </div>

                    <div className="two-col" style={{ display: "flex", gap: 72, alignItems: "flex-start", flexWrap: "wrap" }}>
                        <Reveal delay={0.1} style={{ flex: "1 1 300px" }}>
                            <h3 className="serif" style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 300, color: "#1E1410", marginBottom: 16 }}>Who Is It For?</h3>
                            <div className="gold-rule-left" style={{ width: 30 }} />
                            <p className="sans" style={{ fontSize: 15, lineHeight: 1.95, color: "#6B5040", fontWeight: 300, marginBottom: 16 }}>
                                Pediatric palliative care supports children with a wide range of conditions — including cancer, neurological disorders, genetic conditions, and other chronic illnesses.
                            </p>
                            <p className="sans" style={{ fontSize: 15, lineHeight: 1.95, color: "#6B5040", fontWeight: 300 }}>
                                It is not limited to a specific diagnosis or stage. Many children can benefit from this care much earlier than it is often introduced.
                            </p>
                        </Reveal>

                        <Reveal delay={0.2} style={{ flex: "1 1 300px" }}>
                            <h3 className="serif" style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 300, color: "#1E1410", marginBottom: 16 }}>The Gap We See</h3>
                            <div className="gold-rule-left" style={{ width: 30 }} />
                            <p className="sans" style={{ fontSize: 15, lineHeight: 1.95, color: "#6B5040", fontWeight: 300, marginBottom: 16 }}>
                                Across India, many children who could benefit from palliative care do not receive it.
                            </p>
                            <p className="sans" style={{ fontSize: 15, lineHeight: 1.95, color: "#6B5040", fontWeight: 300 }}>
                                Awareness remains limited — not just among families, but even within the healthcare system. As a result, children continue to experience unnecessary suffering, and families are left to cope on their own.
                            </p>
                        </Reveal>
                    </div>

                    <Reveal delay={0.3} style={{ marginTop: 80, padding: "40px", background: "#fff", border: "1px solid #EDE0D0", borderRadius: 2, textAlign: "center" }}>
                        <h3 className="serif" style={{ fontSize: "clamp(26px,3.2vw,40px)", fontWeight: 300, color: "#1E1410", marginBottom: 16 }}>Our Role</h3>
                        <div className="gold-rule" style={{ width: 30, margin: "0 auto 20px" }} />
                        <p className="sans" style={{ fontSize: 16, lineHeight: 1.95, color: "#6B5040", fontWeight: 300, maxWidth: 800, margin: "0 auto" }}>
                            At Golden Butterflies, we bring this care closer to children and families through our work in hospitals, home & respite care home. We walk alongside them — not just as caregivers, but as companions in their journey.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ════ STATS ═════════════════════════════════════════ */}
            <section style={{ background: "#FDFAF6", borderTop: "1px solid #EDE0D0", borderBottom: "1px solid #EDE0D0", padding: "80px 5%" }}>
                <Reveal>
                    <p className="eyebrow" style={{ textAlign: "center", marginBottom: 10 }}>Our Reach</p>
                    <h2 className="serif" style={{ textAlign: "center", fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 300, color: "#1E1410" }}>
                        The difference, in numbers
                    </h2>
                    <div className="gold-rule" />
                </Reveal>
                <Reveal delay={0.15}>
                    <div className="stat-grid" style={{ maxWidth: 1000, margin: "32px auto 0", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0 }}>
                        {STATS.map((s, i) => (
                            <div key={i} style={{
                                textAlign: "center", padding: "28px 16px",
                                borderRight: (i + 1) % 3 !== 0 ? "1px solid #E8D9C8" : "none",
                                borderBottom: i < 3 ? "1px solid #E8D9C8" : "none",
                            }}>
                                <p className="serif" style={{ fontSize: "clamp(34px,4.5vw,52px)", fontWeight: 300, color: "#C47A3A", lineHeight: 1 }}>
                                    <Counter raw={s.raw} suffix={s.suffix} />
                                </p>
                                <div style={{ width: 22, height: 1, background: "#D9C9B4", margin: "12px auto" }} />
                                <p className="sans" style={{ fontSize: 11, letterSpacing: 1.8, textTransform: "uppercase", color: "#8B6A50", fontWeight: 600 }}>
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            {/* ════ WHAT WE DO — 4 pillars ════════════════════════ */}
            <section style={{ background: "#FDFAF6", padding: "96px 5%" }}>
                <Reveal>
                    <p className="eyebrow" style={{ textAlign: "center", marginBottom: 10 }}>Our Work</p>
                    <h2 className="serif" style={{ textAlign: "center", fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 300, color: "#1E1410" }}>
                        What we do
                    </h2>
                    <div className="gold-rule" />
                    <p className="sans" style={{ textAlign: "center", fontSize: 15, lineHeight: 1.85, color: "#6B5040", maxWidth: 520, margin: "0 auto 52px", fontWeight: 300 }}>
                        Four pillars of care that walk alongside children and families every step of the way.
                    </p>
                </Reveal>
                <div className="svc-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }}>
                    {SERVICES.map((s, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                            <div className="svc-card">
                                <p style={{ fontSize: 28, marginBottom: 20 }}>{s.icon}</p>
                                <p className="serif" style={{ fontSize: 18, fontWeight: 400, color: "#1E1410", marginBottom: 4 }}>{s.title}</p>
                                <p className="eyebrow" style={{ fontSize: 10, marginBottom: 16 }}>{s.sub}</p>
                                <div style={{ width: 26, height: 1, background: "#E8D9C8", marginBottom: 16 }} />
                                <p className="sans" style={{ fontSize: 13.5, lineHeight: 1.85, color: "#6B5040", fontWeight: 300, marginBottom: 24 }}>{s.body}</p>
                                <Link to={s.to} className="sans" style={{ fontSize: 11, color: "#C47A3A", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600, textDecoration: "none" }}>
                                    Learn More →
                                </Link>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ════ EMOTIONAL BREAK ═══════════════════════════════ */}
            <section style={{ background: "#FDFAF6", padding: "68px 5%", textAlign: "center" }}>
                <Reveal>
                    <p className="serif" style={{ fontStyle: "italic", fontSize: "clamp(18px,2.8vw,32px)", color: "#C47A3A", lineHeight: 1.6, maxWidth: 820, margin: "0 auto 22px" }}>
                        "A child's illness affects far more than the body. There is fear, confusion, and emotional distress —
                        and families carry the weight of uncertainty, often without enough support."
                    </p>
                    <div style={{ width: 38, height: 1, background: "#E8D9C8", margin: "0 auto 16px" }} />
                    <p className="sans" style={{ fontSize: 11, color: "#6B5040", letterSpacing: 2, textTransform: "uppercase" }}>
                        Medical treatment alone cannot address all of this.
                    </p>
                </Reveal>
            </section>

            {/* ════ ADI DHOOL — Celebrations ══════════════════════ */}
            <section style={{ background: "#FDFAF6", padding: "96px 5%" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 72, alignItems: "center", flexWrap: "wrap" }} className="two-col">

                    {/* Photo grid */}
                    <Reveal style={{ flex: "1 1 300px" }}>
                        <div className="photo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <img src={IMG.cel1} alt="Adi Dhool" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 2 }} />
                            <img src={IMG.cel2} alt="Children celebrating" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 2 }} />
                            <img src={IMG.cel3} alt="Butterfly moments" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 2, gridColumn: "1/3" }} />
                        </div>
                    </Reveal>

                    {/* Text */}
                    <Reveal delay={0.2} style={{ flex: "1 1 300px" }}>
                        <p className="eyebrow" style={{ marginBottom: 12 }}>Celebrations & Moments</p>
                        <h2 className="serif" style={{ fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 300, lineHeight: 1.25, color: "#1E1410" }}>
                            Adi Dhool —<br />
                            <em style={{ color: "#E8A96A", fontStyle: "italic" }}>A Day of Pure Joy</em>
                        </h2>
                        <div className="gold-rule-left" />
                        <p className="sans" style={{ fontSize: 15, lineHeight: 1.95, color: "#6B5040", fontWeight: 300, marginBottom: 18 }}>
                            Golden Butterflies' signature annual celebration — created to give children living with serious illnesses
                            a day filled with joy, freedom, and unforgettable experiences.
                        </p>
                        <p className="sans" style={{ fontSize: 15, lineHeight: 1.95, color: "#6B5040", fontWeight: 300, marginBottom: 18 }}>
                            For many children, life can revolve around treatment and hospital visits. Adi Dhool offers a chance
                            to step beyond those boundaries — to play, explore, celebrate, and simply enjoy the fullness of childhood.
                        </p>
                        <p className="sans" style={{ fontSize: 15, color: "#E8A96A", fontWeight: 500, marginBottom: 32 }}>
                            Now in its 5th year · 1,000+ participants welcomed each year
                        </p>
                        <Link to="/celebrations" className="btn-ghost" style={{ borderColor: "#C47A3A", color: "#C47A3A" }}>
                            See All Moments
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* ════ GIFT TODAY — donation ══════════════════════════ */}
            <section style={{ background: "#FDFAF6", padding: "96px 5%" }}>
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    <Reveal>
                        <p className="eyebrow" style={{ textAlign: "center", marginBottom: 10 }}>Gift Today</p>
                        <h2 className="serif" style={{ textAlign: "center", fontSize: "clamp(26px,3.2vw,42px)", fontWeight: 300, color: "#1E1410" }}>
                            Be a part of a child's journey.
                        </h2>
                        <div className="gold-rule" />
                        <p className="sans" style={{ textAlign: "center", fontSize: 15, lineHeight: 1.85, color: "#6B5040", marginBottom: 10, fontWeight: 300 }}>
                            Every contribution, big or small, helps us reach a child in need.
                        </p>
                        <p className="sans" style={{ textAlign: "center", fontSize: 13, color: "#A88060", marginBottom: 48 }}>
                            ✦ All donations are eligible for tax exemption under Section 80G
                        </p>
                    </Reveal>

                    {!donated ? (
                        <Reveal>
                            <div style={{ background: "#fff", border: "1px solid #EDE0D0", padding: "48px 40px", borderRadius: 2 }}>
                                <p className="sans" style={{ fontSize: 10.5, letterSpacing: 2.5, textTransform: "uppercase", color: "#8B6A50", marginBottom: 22, fontWeight: 600 }}>
                                    Choose how you want to help
                                </p>

                                <div className="tier-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 22 }}>
                                    {TIERS.map(t => (
                                        <button key={t.amt} className={`tier${activeTier === t.amt ? " on" : ""}`}
                                            onClick={() => { setActiveTier(t.amt); setCustomAmt(""); }}>
                                            <p className="serif" style={{ fontSize: 21, fontWeight: 400, color: "#C47A3A", marginBottom: 4 }}>{t.amt}</p>
                                            <p className="sans" style={{ fontSize: 12, fontWeight: 500, color: "#1E1410", marginBottom: 5 }}>{t.label}</p>
                                            <p className="sans" style={{ fontSize: 11.5, color: "#8B6A50", lineHeight: 1.6, fontWeight: 300 }}>{t.desc}</p>
                                        </button>
                                    ))}
                                </div>

                                <p className="sans" style={{ fontSize: 11.5, color: "#A88060", marginBottom: 10 }}>Or give in your own way (₹)</p>
                                <div style={{ position: "relative", marginBottom: 26 }}>
                                    <span className="sans" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#8B6A50", fontSize: 14 }}>₹</span>
                                    <input type="number" placeholder="Custom amount" value={customAmt}
                                        onChange={e => { setCustomAmt(e.target.value); setActiveTier(""); }}
                                        className="amt-in" />
                                </div>

                                <button className="btn-gold" style={{ width: "100%", padding: 16, fontSize: 13 }}
                                    onClick={() => setDonated(true)}>
                                    Gift {displayAmt || "—"} Today
                                </button>
                                <p className="sans" style={{ textAlign: "center", fontSize: 11.5, color: "#B0A090", marginTop: 18 }}>
                                    🔒 Secure payment · Receipt issued · 80G tax benefit
                                </p>
                            </div>
                        </Reveal>
                    ) : (
                        <Reveal>
                            <div style={{ background: "#fff", border: "1.5px solid #C47A3A", padding: "56px 40px", borderRadius: 2, textAlign: "center" }}>
                                <p style={{ fontSize: 44, marginBottom: 20 }}>🦋</p>
                                <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, color: "#1E1410", marginBottom: 14 }}>
                                    Thank you for your gift.
                                </h3>
                                <p className="sans" style={{ fontSize: 15, color: "#6B5040", lineHeight: 1.85, fontWeight: 300, maxWidth: 460, margin: "0 auto 20px" }}>
                                    Your support helps us care for children living with serious illnesses and stand by their families
                                    during some of their most difficult moments.
                                </p>
                                <p className="serif" style={{ fontStyle: "italic", fontSize: 16, color: "#A88060" }}>
                                    "Because of you, care becomes a little gentler, and no child has to walk this journey alone."
                                </p>
                                <p className="sans" style={{ fontSize: 12.5, color: "#C4A070", marginTop: 22 }}>— Team Golden Butterflies</p>
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* ════ GET INVOLVED STRIP ════════════════════════════ */}
            <section style={{ background: "#FDFAF6", borderTop: "1px solid #EDE0D0", padding: "80px 5%" }}>
                <Reveal>
                    <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
                        <div style={{ maxWidth: 560 }}>
                            <p className="eyebrow" style={{ marginBottom: 10 }}>Get Involved</p>
                            <h2 className="serif" style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 300, color: "#1E1410", lineHeight: 1.3, marginBottom: 16 }}>
                                Can't donate?{" "}
                                <em style={{ color: "#8B6A50", fontStyle: "italic" }}>Volunteer your time.</em>
                            </h2>
                            <p className="sans" style={{ fontSize: 15, color: "#6B5040", lineHeight: 1.85, fontWeight: 300 }}>
                                We welcome teachers, counsellors, doctors, artists, and anyone with a caring heart.
                                Your presence means the world to these children and their families.
                            </p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <Link to="/get-involved#volunteer" className="btn-gold">Apply to Volunteer</Link>
                            <Link to="/get-involved#partner" className="btn-ghost">Partner With Us</Link>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* ════ FOOTER ════════════════════════════════════════ */}
            <footer style={{ background: "#FDFAF6", padding: "64px 5% 36px", borderTop: "1px solid #EDE0D0" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 48, paddingBottom: 48, borderBottom: "1px solid #EDE0D0", marginBottom: 36 }}>

                        {/* Brand / SUPPORT */}
                        <div style={{ maxWidth: 280 }}>
                            <p className="eyebrow" style={{ fontSize: 10, marginBottom: 20 }}>Support</p>
                            <p className="sans" style={{ fontSize: 13, lineHeight: 1.85, color: "#6B5040", fontWeight: 300, marginBottom: 28 }}>
                                Join us in bringing hope and healing to children and families affected by long-term illness.
                                Your support can transform their lives and foster a brighter future.
                            </p>
                            <div style={{ display: "flex", gap: 12 }}>
                                {[
                                    { e: "📸", h: "https://www.instagram.com/goldenbutterflies_foundation/", l: "Instagram" },
                                    { e: "👍", h: "https://www.facebook.com/goldenbutterfliescpcf/", l: "Facebook" },
                                    { e: "▶", h: "https://www.youtube.com/@goldenbutterflieswork9167", l: "YouTube" },
                                    { e: "💼", h: "https://www.linkedin.com/company/golden-butterflies/", l: "LinkedIn" },
                                ].map(s => (
                                    <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer" className="soc" aria-label={s.l}>
                                        {s.e}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Explore */}
                        <div>
                            <p className="eyebrow" style={{ fontSize: 10, marginBottom: 20 }}>Explore</p>
                            {[
                                { l: "Why Palliative care", to: "/why-palliative-care" },
                                { l: "What We Do", to: "/what-we-do" },
                                { l: "Who We Are", to: "/who-we-are" },
                                { l: "Celebrations & Moments", to: "/celebrations" },
                                { l: "Gift Today", to: "/gift-today" },
                            ].map(lk => <Link key={lk.l} to={lk.to} className="ft-link">{lk.l}</Link>)}
                        </div>

                        {/* Contact */}
                        <div style={{ maxWidth: 360 }}>
                            <p className="eyebrow" style={{ fontSize: 10, marginBottom: 20 }}>Contact</p>
                            <p className="sans" style={{ fontSize: 13, color: "#6B5040", lineHeight: 1.85, fontWeight: 300, marginBottom: 14 }}>
                                Golden Butterflies Children's Palliative Care Foundation<br />
                                New No: 33/1, Old No: 26, Unnamalai Ammal Street,<br />
                                North Usman Rd, T. Nagar, Chennai, Tamil Nadu 600017
                            </p>
                            <p className="sans" style={{ fontSize: 13, color: "#6B5040", lineHeight: 1.85, fontWeight: 300, marginBottom: 14 }}>
                                <a href="tel:+918754448845" style={{ color: "#C47A3A", textDecoration: "none" }}>+91 87544 48845</a><br />
                                <a href="mailto:letschat@goldenbutterflies.in" style={{ color: "#6B5040", textDecoration: "none" }}>letschat@goldenbutterflies.in</a><br />
                                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "#C47A3A", textDecoration: "underline" }}>View Map</a>
                            </p>
                            
                            <p className="sans" style={{ fontSize: 13, color: "#6B5040", lineHeight: 1.85, fontWeight: 300, marginBottom: 8 }}>
                                <strong style={{ color: "#1E1410", fontWeight: 500 }}>Ms. Stella Matthew</strong>, Founder & Managing Trustee<br />
                                <a href="tel:+919841351951" style={{ color: "#C47A3A", textDecoration: "none" }}>+91 98413 51951</a> | <a href="mailto:stella@goldenbutterflies.in" style={{ color: "#6B5040", textDecoration: "none" }}>stella@goldenbutterflies.in</a>
                            </p>

                            <p className="sans" style={{ fontSize: 13, color: "#6B5040", lineHeight: 1.85, fontWeight: 300 }}>
                                <strong style={{ color: "#1E1410", fontWeight: 500 }}>Dr. Arthi</strong>, Chief Operating Officer<br />
                                <a href="tel:+918124215805" style={{ color: "#C47A3A", textDecoration: "none" }}>+91 8124215805</a> | <a href="mailto:gbcoo@goldenbutterflies.org" style={{ color: "#6B5040", textDecoration: "none" }}>gbcoo@goldenbutterflies.org</a>
                            </p>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                        <p className="sans" style={{ fontSize: 12, color: "#6B5040", fontWeight: 300 }}>
                            © {new Date().getFullYear()} Golden Butterflies Children's Palliative Care Foundation
                        </p>
                        <p className="sans" style={{ fontSize: 12, color: "#6B5040", fontWeight: 300 }}>
                            Registered Non-Profit · Section 80G · Chennai, India
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}