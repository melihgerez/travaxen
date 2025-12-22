// ========================================
// TRAVAXEN - Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================

  const header = document.querySelector("header nav");
  const navLinks = document.querySelector(".nav-links");

  // Create mobile menu button
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.className = "mobile-menu-btn";
  mobileMenuBtn.innerHTML = "☰";
  mobileMenuBtn.setAttribute("aria-label", "Toggle menu");

  // Insert before language switch
  const langSwitch = document.querySelector(".lang-switch");
  if (langSwitch) {
    header.insertBefore(mobileMenuBtn, langSwitch);
  }

  mobileMenuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    this.innerHTML = navLinks.classList.contains("active") ? "✕" : "☰";
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      mobileMenuBtn.innerHTML = "☰";
    });
  });

  // ========================================
  // SMOOTH SCROLLING
  // ========================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ========================================
  // SCROLL ANIMATIONS
  // ========================================

  const animatedElements = document.querySelectorAll(
    ".about-item, .feature-card, .detail-card, .gallery-item, .gallery-section, .prototype-info, .prototype-detail, .cta-buttons, .founder-info, .future-card, .future-features, .app-card"
  );

  if ("IntersectionObserver" in window) {
    const observerOptions = {
      // Wait until roughly a quarter of the element is visible
      threshold: 0.25,
      rootMargin: "0px 0px 0px 0px",
    };

    let animationIndex = 0;
    const staggerStep = 30; // ms per element
    const maxStagger = 300; // cap to avoid long waits

    const revealNowIfInView = (el) => {
      if (el.classList.contains("visible")) return;
      const rect = el.getBoundingClientRect();
      const buffer = 0;
      const inView =
        rect.top < window.innerHeight + buffer && rect.bottom > -buffer;
      if (inView) {
        el.classList.add("visible");
        return true;
      }
      return false;
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add a short, capped stagger so items feel responsive
          const currentIndex = animationIndex++;
          const delay = Math.min(currentIndex * staggerStep, maxStagger);

          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => {
      // Catch elements already in view (e.g., after jumping down)
      if (!revealNowIfInView(el)) {
        observer.observe(el);
      }
    });

    // Safety net: reveal anything still hidden after load+jump scenarios
    setTimeout(() => {
      animatedElements.forEach((el) => {
        if (!el.classList.contains("visible")) {
          revealNowIfInView(el);
        }
      });
    }, 1200);
  } else {
    // Graceful degradation: show elements without scroll-based animation
    animatedElements.forEach((el) => el.classList.add("visible"));
  }

  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================

  let lastScroll = 0;
  const headerElement = document.querySelector("header");

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      headerElement.style.boxShadow = "none";
    } else {
      headerElement.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
    }

    lastScroll = currentScroll;
  });

  // ========================================
  // ACTIVE NAV LINK HIGHLIGHT
  // ========================================

  const sections = document.querySelectorAll("section[id]");

  function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink);

  // ========================================
  // IMAGE LAZY LOADING
  // ========================================

  const lazyImages = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));

  // ========================================
  // LOADING ANIMATION
  // ========================================

  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // ========================================
  // CONSOLE MESSAGE
  // ========================================

  console.log(
    "%c🚑 Travaxen",
    "font-size: 24px; font-weight: bold; color: #e94560;"
  );
  console.log(
    "%cTrafikte hayat kurtaran teknoloji",
    "font-size: 14px; color: #fff;"
  );
  console.log("%cFounded by Melih Gerez", "font-size: 12px; color: #888;");
});
