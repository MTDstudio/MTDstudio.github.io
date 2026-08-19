/* ============================================================
   MTD Studio Coming Soon
   Vanilla JS only: countdown, status pill clock, contact form
   ============================================================ */

(function () {
  "use strict";

  /* ---------- CONFIG ----------
     Set your real launch date/time here (local time, ISO format).
     Example: '2026-09-15T09:00:00'
  --------------------------------- */
  const LAUNCH_DATE = new Date("2026-09-15T09:00:00");
  const LAUNCH_ANNOUNCED = new Date("2026-08-02T00:00:00"); // used only for progress bar

  const els = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
    progress: document.getElementById("progressFill"),
    clock: document.getElementById("clock"),
    year: document.getElementById("year"),
  };

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function setValue(el, value) {
    if (!el) return;
    if (el.textContent === value) return;
    el.textContent = value;
    el.classList.remove("tick");
    // force reflow so the animation can replay
    void el.offsetWidth;
    el.classList.add("tick");
  }

  function updateCountdown() {
    const now = new Date();
    const total = LAUNCH_DATE - now;

    if (total <= 0) {
      setValue(els.days, "00");
      setValue(els.hours, "00");
      setValue(els.minutes, "00");
      setValue(els.seconds, "00");
      if (els.progress) els.progress.style.width = "100%";
      return;
    }

    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    setValue(els.days, pad(days));
    setValue(els.hours, pad(hours));
    setValue(els.minutes, pad(minutes));
    setValue(els.seconds, pad(seconds));

    const span = LAUNCH_DATE - LAUNCH_ANNOUNCED;
    const elapsed = now - LAUNCH_ANNOUNCED;
    const pct = Math.min(100, Math.max(0, (elapsed / span) * 100));
    if (els.progress) els.progress.style.width = pct + "%";
  }

  function updateClock() {
    if (!els.clock) return;
    const now = new Date();
    els.clock.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  updateCountdown();
  updateClock();
  setInterval(updateCountdown, 1000);
  setInterval(updateClock, 15000);

  if (els.year) els.year.textContent = new Date().getFullYear();

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById("siteHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");

  function closeMobileNav() {
    if (!navToggle || !mobileNav) return;
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      const open = navToggle.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      mobileNav.classList.toggle("is-open", open);
    });

    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeMobileNav);
    });
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      const action = form.getAttribute("action") || "";
      const isPlaceholder = action.includes("yourFormID");

      // No real form backend configured yet; keep it graceful instead of
      // sending a request that will fail.
      if (isPlaceholder) {
        e.preventDefault();
        status.textContent =
          "Form isn't connected yet; add your Formspree endpoint in this page's HTML.";
        status.className = "form-status is-error";
        return;
      }

      e.preventDefault();
      const labelEl = submitBtn.querySelector(".submit-btn__label");
      const originalLabel = labelEl ? labelEl.textContent : "Send";
      status.textContent = "";
      status.className = "form-status";
      submitBtn.disabled = true;
      if (labelEl) labelEl.textContent = "Sending…";

      fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            form.reset();
            status.textContent = "Thanks, we'll be in touch shortly.";
            status.className = "form-status is-success";
          } else {
            throw new Error("Request failed");
          }
        })
        .catch(() => {
          status.textContent = "Something went wrong. Please try again.";
          status.className = "form-status is-error";
        })
        .finally(() => {
          submitBtn.disabled = false;
          if (labelEl) labelEl.textContent = originalLabel;
        });
    });
  }

  /* ---------- Active nav link (multi-page site) ---------- */
  const currentFile =
    location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a, .mobile-nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    const isHome =
      (currentFile === "" || currentFile === "index.html") &&
      (href === "" || href === "index.html");
    if (href === currentFile || isHome) {
      a.classList.add("is-active");
    }
  });

  /* ---------- Pricing disclaimer dialog ---------- */
  const disclaimer = document.getElementById("pricingDisclaimer");
  const reopenBtn = document.getElementById("reopenDisclaimer");

  if (disclaimer && typeof disclaimer.showModal === "function") {
    // Show once per browser session so repeat visits aren't interrupted.
    const seen = sessionStorage.getItem("mtd_pricing_disclaimer_seen");
    if (!seen) {
      disclaimer.showModal();
      sessionStorage.setItem("mtd_pricing_disclaimer_seen", "1");
    }
    disclaimer.querySelectorAll("[data-close-dialog]").forEach((btn) => {
      btn.addEventListener("click", () => disclaimer.close());
    });
  }
  if (reopenBtn && disclaimer && typeof disclaimer.showModal === "function") {
    reopenBtn.addEventListener("click", () => disclaimer.showModal());
  }
})();
