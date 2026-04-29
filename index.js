  // Set the current year
  document.getElementById("current-year").textContent = new Date().getFullYear();

  /* ── Hamburger menu ── */
  const hamburger = document.getElementById("hamburger");
  const mainNav   = document.getElementById("main-nav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mainNav.classList.toggle("mobile-open");
    document.body.style.overflow = mainNav.classList.contains("mobile-open") ? "hidden" : "";
  });

  function closeNav() {
    hamburger.classList.remove("open");
    mainNav.classList.remove("mobile-open");
    document.body.style.overflow = "";
  }

  /* ── Word drop animation (hero roles) ── */
  const words = ["SOFTWARE DEVELOPER", "TECH ENTHUSIAST", "YOUTH ADVOCATE"];
  let idx = 0;
  const roleContainer = document.getElementById("role-container");

  function cycleRole() {
    const current = roleContainer.querySelector(".role");
    if (current) {
      current.classList.remove("enter");
      current.classList.add("exit");
      current.addEventListener("animationend", () => current.remove(), { once: true });
    }
    idx = (idx + 1) % words.length;
    setTimeout(() => {
      const next = document.createElement("span");
      next.className = "role enter";
      next.textContent = words[idx];
      roleContainer.appendChild(next);
    }, 400);
  }
  setInterval(cycleRole, 3800);

  /* ── Header shrink on scroll ── */
  window.addEventListener("scroll", () => {
    document.querySelector("header").classList.toggle("scrolled", window.scrollY > 60);
  });

  /* ── Fade-in on scroll ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".skill-card, .project-card, .about-text, .about-image, .stat").forEach(el => {
    observer.observe(el);
  });

  /* ── Bible Verse Animation ── */
  const verses = [
    {
      words: ["I", "can", "do", "all", "things", "through", "Christ", "who", "strengthens", "me."],
      ref: "— Philippians 4:13",
      highlights: ["Christ", "strengthens"]
    },
    {
      words: ["Nayaweza", "mambo", "yote", "katika", "yeye", "anitiaye", "nguvu."],
      ref: "— Wafilipi 4:13",
      highlights: ["yeye", "nguvu."]
    }
  ];

  let verseIdx = 0;
  let wordIdx = 0;

  const verseWordsEl = document.getElementById("verse-words");
  const verseRefEl   = document.getElementById("verse-ref");

  function buildVerse(v) {
    verseWordsEl.innerHTML = "";
    verseRefEl.textContent = "";
    v.words.forEach((w, i) => {
      const span = document.createElement("span");
      span.className = "vw" + (v.highlights.includes(w) ? " vw-hl" : "");
      span.id = "vw" + i;
      span.textContent = w;
      verseWordsEl.appendChild(span);
    });
  }

  function fadeOutVerse(callback) {
    const spans = verseWordsEl.querySelectorAll(".vw");
    spans.forEach((s, i) => {
      setTimeout(() => {
        s.style.opacity = "0";
        s.style.transform = "translateY(10px)";
      }, i * 40);
    });
    verseRefEl.style.opacity = "0";
    setTimeout(callback, spans.length * 40 + 400);
  }

  function showNextWord() {
    const v = verses[verseIdx];
    if (wordIdx < v.words.length) {
      const el = document.getElementById("vw" + wordIdx);
      if (el) el.classList.add("vw-visible");
      wordIdx++;
      setTimeout(showNextWord, 380);
    } else {
      setTimeout(() => {
        verseRefEl.textContent = v.ref;
        verseRefEl.style.opacity = "1";
      }, 300);
      setTimeout(() => {
        fadeOutVerse(() => {
          verseIdx = (verseIdx + 1) % verses.length;
          wordIdx = 0;
          buildVerse(verses[verseIdx]);
          setTimeout(showNextWord, 400);
        });
      }, 3000);
    }
  }

  function startVerseLoop() {
    buildVerse(verses[verseIdx]);
    setTimeout(showNextWord, 600);
  }

  const verseSection = document.querySelector(".verse-section");
  const verseObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        startVerseLoop();
        verseObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  if (verseSection) verseObserver.observe(verseSection);
