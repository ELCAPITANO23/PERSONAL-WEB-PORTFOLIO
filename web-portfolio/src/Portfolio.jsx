import { useState, useEffect, useRef, useCallback } from "react";
/* ═══════════════ DATA ═══════════════ */
const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const ROLES = ["SOFTWARE DEVELOPER", "YOUTH ADVOCATE", "TECH ENTHUSIAST"];

const SKILLS = [
  {
    icon: "</> ",
    title: "Frontend",
    items: ["HTML5 & CSS3", "JavaScript", "React.js", "Responsive Design"],
  },
  {
    icon: "{}",
    title: "Backend",
    items: ["Node.js", "Python", "REST APIs", "SQL", "Postgresql", "PHP"],
  },
  {
    icon: "○",
    title: "AI & Data",
    items: [
      "Machine Learning Basics",
      "LLM Integration",
      "Data Analysis",
      "Python (NumPy, Pandas)",
    ],
  },
  {
    icon: "▶",
    title: "Tools & DevOps",
    items: ["Git & GitHub", "VS Code", "Linux / CLI", "Cisco Packet Tracer"],
  },
];

const PROJECTS = [
  {
    featured: true,
    imgSrc: "images/project1.png",
    imgBg: "linear-gradient(135deg, #0a1628 0%, #0d2137 100%)",
    fallback: "◼",
    tags: ["HTML", "Node.js", "SQL", "Express.js", "JWT", "OAuth"],
    title: "AI-Powered Dashboard",
    desc: "A full-stack web application providing secure user authentication and account management. Users can register, log in via email/password, or authenticate through Google OAuth 2.0. Built with MariaDB/MySQL, JWT, cookies, sessions, and OAuth integration on an Express.js backend.",
    demo: "#",
    repo: "https://github.com/ELCAPITANO23/FULL-STACK-LOGIN-AUTHENTICATION",
  },
  {
    featured: false,
    imgSrc: "images/project2.png",
    imgBg: "linear-gradient(135deg, #0a1f1a 0%, #061812 100%)",
    fallback: "■",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "JSON-server"],
    title: "API Web Showcase",
    desc: "A comprehensive website showing live demos of CRUD operations for a RESTful API designed locally using json-server.",
    demo: "https://local-rest-api-jip8.onrender.com",
    repo: "https://github.com/ELCAPITANO23/REST-API-LOCALLY-DESIGNED",
  },
  {
    featured: false,
    imgSrc: "images/project3.png",
    imgBg: "linear-gradient(135deg, #1a0a20 0%, #120618 100%)",
    fallback: "▲",
    tags: ["HTML", "JavaScript", "CSS", "API"],
    title: "Forex Exchange Calculator",
    desc: "A simple web application that converts and displays foreign exchange rates at real time updates, focused on Tanzanian Shilling (TZS).",
    demo: "https://bit.ly/48uQyhn",
    repo: "https://github.com/ELCAPITANO23/TZS-Currency-converter",
  },
];

const VERSES = [
  {
    words: [
      "I",
      "can",
      "do",
      "all",
      "things",
      "through",
      "Christ",
      "who",
      "strengthens",
      "me.",
    ],
    ref: "— Philippians 4:13",
    highlights: ["Christ", "strengthens"],
  },
  {
    words: [
      "Nayaweza",
      "mambo",
      "yote",
      "katika",
      "yeye",
      "anitiaye",
      "nguvu.",
    ],
    ref: "— Wafilipi 4:13",
    highlights: ["yeye", "nguvu."],
  },
];

/* ═══════════════ HOOKS ═══════════════ */
function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useIntersection(ref, options = {}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15, ...options },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, options]);
  return visible;
}

/* ═══════════════ COMPONENTS ═══════════════ */

/* ── Header ── */
function Header() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeNav = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? "hidden" : "";
      return next;
    });
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="logo">ELCAPITANO</div>
      <nav id="main-nav" className={menuOpen ? "mobile-open" : ""}>
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} onClick={closeNav}>
            {label}
          </a>
        ))}
      </nav>
      <button
        className={`hamburger${menuOpen ? " open" : ""}`}
        id="hamburger"
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}

/* ── Dynamic Role ── */
function DynamicRole() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("drop-in"); // drop-in | drop-out | pre-drop

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase("drop-out");
      setTimeout(() => {
        setIdx((i) => (i + 1) % ROLES.length);
        setPhase("pre-drop");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setPhase("drop-in")),
        );
      }, 500);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="role-wrapper">
      <span id="dynamic-role" className={phase}>
        {ROLES[idx]}
      </span>
    </div>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-eyebrow">Hello, I'm</p>
        <div className="hero-name">
          IKANGILA <span className="neon">EMMANUEL</span> CHARLES
        </div>
        <DynamicRole />
        <p className="hero-desc">
          Building seamless digital systems where logic meets creativity.
          Passionate about AI, modern web technologies, and engineering
          solutions that matter. I craft experiences that are fast, scalable,
          and meaningful in the real world.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-ghost">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Bible Verse ── */
function BibleVerse() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [verseIdx, setVerseIdx] = useState(0);
  const [wordStates, setWordStates] = useState([]); // array of booleans (visible)
  const [refOpacity, setRefOpacity] = useState(0);
  const [refText, setRefText] = useState("");

  // Start when section enters viewport
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [started]);

  const runVerse = useCallback((vIdx) => {
    const v = VERSES[vIdx];
    setWordStates(new Array(v.words.length).fill(false));
    setRefOpacity(0);
    setRefText("");

    let wi = 0;
    function revealNext() {
      if (wi < v.words.length) {
        const captured = wi;
        setWordStates((prev) => {
          const next = [...prev];
          next[captured] = true;
          return next;
        });
        wi++;
        setTimeout(revealNext, 380);
      } else {
        // show ref
        setTimeout(() => {
          setRefText(v.ref);
          setRefOpacity(1);
        }, 300);
        // fade out then next verse
        setTimeout(() => {
          setWordStates((prev) => prev.map(() => false));
          setRefOpacity(0);
          setTimeout(
            () => {
              const next = (vIdx + 1) % VERSES.length;
              setVerseIdx(next);
              runVerse(next);
            },
            v.words.length * 40 + 400,
          );
        }, 3000 + 300);
      }
    }

    setTimeout(revealNext, 600);
  }, []);

  useEffect(() => {
    if (started) runVerse(0);
  }, [started, runVerse]);

  const v = VERSES[verseIdx];

  return (
    <div className="verse-section" ref={sectionRef}>
      <div className="verse-words" id="verse-words">
        {v.words.map((word, i) => (
          <span
            key={i}
            className={`vw${v.highlights.includes(word) ? " vw-hl" : ""}${
              wordStates[i] ? " vw-visible" : ""
            }`}
          >
            {word}
          </span>
        ))}
      </div>
      <p
        className="verse-ref"
        style={{ opacity: refOpacity, transition: "opacity 0.6s ease" }}
      >
        {refText}
      </p>
    </div>
  );
}

/* ── About ── */
function About() {
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const textVisible = useIntersection(textRef);
  const imgVisible = useIntersection(imgRef);

  const stats = [
    { num: "3+", label: "Years Experience" },
    { num: "07+", label: "Projects Built" },
    { num: "80%", label: "Commitment" },
  ];

  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div
          ref={textRef}
          className={`about-text${textVisible ? " visible" : ""}`}
        >
          <p className="section-label" style={{ fontSize: 24 }}>
            About Me
          </p>
          <h2>
            Turning ideas into
            <br />
            <em>digital reality</em>
          </h2>
          <p>
            I'm a software developer based in Tanzania with a deep passion for
            building things that work beautifully. Whether it's a sleek web app,
            an AI-powered tool, or a system that solves real problems — I bring
            precision, creativity, and purpose to every line of code.
          </p>
          <p>
            Beyond the screen, I'm a youth advocate who believes technology
            should empower communities. I mentor young developers and champion
            digital literacy across Tanzania.
          </p>
          <div className="about-stats">
            {stats.map(({ num, label }) => (
              <StatCard key={label} num={num} label={label} />
            ))}
          </div>
        </div>

        <div
          ref={imgRef}
          className={`about-image${imgVisible ? " visible" : ""}`}
        >
          <div className="image-frame">
            <img
              src="images/him.jpeg"
              alt="Ikangila Emmanuel Charles"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="image-placeholder">IEC</div>
          </div>
          <div className="image-accent" />
        </div>
      </div>

      <BibleVerse />
    </section>
  );
}

function StatCard({ num, label }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div ref={ref} className={`stat${visible ? " visible" : ""}`}>
      <span className="stat-num">{num}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

/* ── Skills ── */
function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="section-header">
        <p className="section-label" style={{ fontSize: 24 }}>
          Skills
        </p>
        <h2>What I Work With</h2>
      </div>
      <div className="skills-grid">
        {SKILLS.map((s) => (
          <SkillCard key={s.title} {...s} />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ icon, title, items }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div ref={ref} className={`skill-card${visible ? " visible" : ""}`}>
      <div className="skill-icon">{icon}</div>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/* ── Projects ── */
function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="section-header">
        <p className="section-label" style={{ fontSize: 24 }}>
          Projects
        </p>
        <h2>Featured Work</h2>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  featured,
  imgSrc,
  imgBg,
  fallback,
  tags,
  title,
  desc,
  demo,
  repo,
}) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      className={`project-card${featured ? " featured" : ""}${visible ? " visible" : ""}`}
    >
      <div className="project-img" style={{ background: imgBg }}>
        <img
          src={imgSrc}
          alt={title}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div className="project-img-fallback">{fallback}</div>
      </div>
      <div className="project-info">
        <div className="project-tags">
          {tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="project-links">
          <a href={demo} className="link-btn">
            Live Demo ↗
          </a>
          <a href={repo} className="link-ghost">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Footer ── */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">ELCAPITANO</div>
          <p>
            Turning logic into lived experience,
            <br />
            Engineered for impact through coding.
          </p>
        </div>

        <div className="footer-contact">
          <p className="footer-label">Get In Touch</p>
          <a href="mailto:ikangila@email.com" className="footer-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            ikangila@email.com
          </a>
          <a href="tel:+255758040794" className="footer-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +255 758 040 794
          </a>
          <span className="footer-link footer-location">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Kijitonyama, Dar es Salaam.
          </span>
        </div>

        <div className="footer-social">
          <p className="footer-label">Find Me Online</p>
          <a
            href="https://wa.me/+255758040794"
            target="_blank"
            rel="noreferrer"
            className="footer-link whatsapp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>
          <a
            href="https://github.com/ELCAPITANO23"
            target="_blank"
            rel="noreferrer"
            className="footer-link github"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ikangila-charles-ba4003344"
            target="_blank"
            rel="noreferrer"
            className="footer-link linkedin"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://instagram.com/icanemour"
            target="_blank"
            rel="noreferrer"
            className="footer-link instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
            Instagram
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} Ikangila Emmanuel Charles, All Rights Reserved</span>
      </div>
    </footer>
  );
}

/* ═══════════════ APP ═══════════════ */
export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </>
  );
}
