/* ========================================
   Shahid Zilan Portfolio — JavaScript
   ======================================== */

(function () {
  'use strict';

  document.body.classList.add('loaded');
  initFadeUp();

  // ========================================
  // SCROLL PROGRESS
  // ========================================
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }

  // ========================================
  // NAVIGATION
  // ========================================
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function updateNav() {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.classList.add('loaded');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('.section, .hero');

  function updateActiveNav() {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }

  // ========================================
  // FADE UP ON SCROLL
  // ========================================
  function initFadeUp() {
    const fadeElements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach((el) => observer.observe(el));
  }

  // ========================================
  // TYPING ANIMATION
  // ========================================
  const typingTexts = [
    'Computer Science Student',
    'Python Developer',
    'AI Enthusiast',
    'Cybersecurity Enthusiast',
    'Future Software Engineer'
  ];

  const typingElement = document.getElementById('typingText');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeText() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      typeSpeed = 300;
    }

    setTimeout(typeText, typeSpeed);
  }

  setTimeout(typeText, 1000);

  // ========================================
  // STAT COUNTER
  // ========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  function animateStats() {
    if (statsCounted) return;

    const firstStat = statNumbers[0];
    if (!firstStat) return;

    const rect = firstStat.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      statsCounted = true;

      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-count'), 10);
        const duration = 1500;
        const start = performance.now();

        function updateStat(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          stat.textContent = Math.floor(target * eased);

          if (progress < 1) {
            requestAnimationFrame(updateStat);
          } else {
            stat.textContent = target;
          }
        }

        requestAnimationFrame(updateStat);
      });
    }
  }

  // ========================================
  // SKILL BARS ANIMATION
  // ========================================
  const skillFills = document.querySelectorAll('.skill-fill');
  let skillsAnimated = false;

  function animateSkillBars() {
    if (skillsAnimated) return;

    const firstBar = skillFills[0];
    if (!firstBar) return;

    const rect = firstBar.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      skillsAnimated = true;
      skillFills.forEach((fill, i) => {
        setTimeout(() => {
          fill.classList.add('animated');
        }, i * 100);
      });
    }
  }

  // ========================================
  // MAGNETIC BUTTON EFFECT
  // ========================================
  if (window.matchMedia('(hover: hover)').matches) {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ========================================
  // CONTACT FORM
  // ========================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    const fields = [
      { id: 'name', errorId: 'nameError', message: 'Please enter your name' },
      { id: 'email', errorId: 'emailError', message: 'Please enter a valid email' },
      { id: 'subject', errorId: 'subjectError', message: 'Please enter a subject' },
      { id: 'message', errorId: 'messageError', message: 'Please enter your message' }
    ];

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      const error = document.getElementById(field.errorId);

      if (!input.value.trim()) {
        error.textContent = field.message;
        input.classList.add('error');
        valid = false;
      } else if (field.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        error.textContent = 'Please enter a valid email address';
        input.classList.add('error');
        valid = false;
      } else {
        error.textContent = '';
        input.classList.remove('error');
      }
    });

    if (valid) {
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
      .then(res => res.json())
      .then(() => {
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
      })
      .catch(() => {
        submitBtn.innerHTML = '<span>Send Message</span>';
        submitBtn.disabled = false;
        alert('Something went wrong. Please try again.');
      });
    }
  });

  // Clear errors on input
  ['name', 'email', 'subject', 'message'].forEach((id) => {
    const input = document.getElementById(id);
    const error = document.getElementById(id + 'Error');
    if (input && error) {
      input.addEventListener('input', () => {
        error.textContent = '';
        input.classList.remove('error');
      });
    }
  });

  // ========================================
  // BACK TO TOP
  // ========================================
  const backToTop = document.getElementById('backToTop');

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========================================
  // SCROLL EVENT HANDLER
  // ========================================
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateNav();
        updateActiveNav();
        updateScrollProgress();
        animateStats();
        animateSkillBars();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial calls
  updateNav();
  updateScrollProgress();
  animateStats();
  animateSkillBars();

})();
