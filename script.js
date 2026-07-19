/* ========================================
   Shahid Zilan Portfolio — JavaScript
   ======================================== */

(function () {
  'use strict';

  // ========================================
  // LOADER
  // ========================================
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.add('loaded');
      initFadeUp();
      initTwistingRibbon();
      initPerspectiveGrid();
    }, 800);
  });

  // ========================================
  // CUSTOM CURSOR
  // ========================================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.08;
    followerY += (mouseY - followerY) * 0.08;

    cursor.style.left = cursorX - 4 + 'px';
    cursor.style.top = cursorY - 4 + 'px';
    follower.style.left = followerX - 18 + 'px';
    follower.style.top = followerY - 18 + 'px';

    requestAnimationFrame(animateCursor);
  }

  if (window.matchMedia('(hover: hover)').matches) {
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, .glass-card, .social-link, .project-btn, .contact-link, .magnetic');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
      el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
    });
  }

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
      document.body.classList.add('loaded');
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
  // THEME TOGGLE
  // ========================================
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const isLight = html.getAttribute('data-theme') === 'light';
    if (isLight) {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
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
  // PARALLAX ORBS
  // ========================================
  const orbs = document.querySelectorAll('.hero-orb');
  const orbOriginalTransforms = [];
  orbs.forEach((orb) => {
    orbOriginalTransforms.push(window.getComputedStyle(orb).transform);
  });

  function handleParallax() {
    const scrollY = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 0.05;
      const yOffset = scrollY * speed;
      if (i === 2) {
        orb.style.transform = `translate(-50%, calc(-50% + ${yOffset}px))`;
      } else {
        orb.style.transform = `translateY(${yOffset}px)`;
      }
    });
  }

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
        handleParallax();
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

  // ========================================
  // TWISTING RIBBON
  // ========================================
  function initTwistingRibbon() {
    const canvas = document.getElementById('ribbonCanvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width, height;
    let t = 0;

    const segments = 400;
    const waveSpeed = 0.018;
    const waveAmplitude = 1;
    const twistCycles = 6;

    const RIBBON_HALF_W = 14;
    const RIBBON_X_SCALE = 1.4;
    const RIBBON_X_OFFSET = 0.2;

    const WAVE1_FREQ = 3.5;
    const WAVE1_TIME_SPEED = 0.7;
    const WAVE1_AMP = 110 * waveAmplitude;
    const WAVE2_FREQ = 7.0;
    const WAVE2_TIME_SPEED = 1.1;
    const WAVE2_AMP = 30 * waveAmplitude;
    const TWIST_TIME_SPEED = 0.5;

    const L_COLOR_FACE = [255, 60, 10];
    const L_COLOR_FOLD_A = [180, 255, 0];
    const L_COLOR_FOLD_B = [60, 80, 255];
    const L_COLOR_FOLD_C = [0, 220, 255];
    const L_SHADOW_COLOR = [80, 60, 40];
    const L_SHADOW_ALPHA = 14 / 255;
    const L_EDGE_COLOR = [0, 0, 0];
    const L_EDGE_ALPHA = 22 / 255;

    const D_COLOR_FACE = [255, 60, 10];
    const D_COLOR_FOLD_A = [180, 255, 0];
    const D_COLOR_FOLD_B = [60, 80, 255];
    const D_COLOR_FOLD_C = [0, 220, 255];
    const D_SHADOW_COLOR = [0, 0, 0];
    const D_SHADOW_ALPHA = 120 / 255;
    const D_EDGE_COLOR = [255, 255, 255];
    const D_EDGE_ALPHA = 30 / 255;

    const COLOR_CYCLE_FREQ = 2.0;
    const COLOR_CYCLE_SPEED = 0.3;
    const FACE_BLEND_GAMMA = 1.2;
    const SHADOW_OFFSET_X = 4;
    const SHADOW_OFFSET_Y = 7;
    const EDGE_MIN_TWIST = 0.08;
    const EDGE_WEIGHT = 0.5;

    function isDark() {
      return document.documentElement.getAttribute('data-theme') !== 'light';
    }

    function hexToRgb(hex) {
      hex = hex.replace(/^#/, '');
      if (hex.length === 3) hex = hex.split('').map(function(c) { return c + c; }).join('');
      var num = parseInt(hex, 16);
      return [num >> 16, (num >> 8) & 255, num & 255];
    }

    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    }

    function lerpColor(a, b, f) {
      return [
        Math.round(a[0] + (b[0] - a[0]) * f),
        Math.round(a[1] + (b[1] - a[1]) * f),
        Math.round(a[2] + (b[2] - a[2]) * f)
      ];
    }

    function buildSpine(time) {
      var pts = [];
      for (var i = 0; i <= segments; i++) {
        var progress = i / segments;
        pts.push({
          x: progress * width * RIBBON_X_SCALE - width * RIBBON_X_OFFSET,
          y: height / 2 + Math.sin(progress * Math.PI * WAVE1_FREQ + time * WAVE1_TIME_SPEED) * WAVE1_AMP + Math.sin(progress * Math.PI * WAVE2_FREQ + time * WAVE2_TIME_SPEED) * WAVE2_AMP
        });
      }
      return pts;
    }

    function buildNormals(pts) {
      var last = pts.length - 1;
      return pts.map(function(_, i) {
        var dx = i === 0 ? pts[1].x - pts[0].x : i === last ? pts[last].x - pts[last - 1].x : pts[i + 1].x - pts[i - 1].x;
        var dy = i === 0 ? pts[1].y - pts[0].y : i === last ? pts[last].y - pts[last - 1].y : pts[i + 1].y - pts[i - 1].y;
        var len = Math.sqrt(dx * dx + dy * dy) || 1;
        return { nx: -dy / len, ny: dx / len };
      });
    }

    function buildEdges(pts, normals, time) {
      var tops = [], bots = [], twists = [];
      for (var i = 0; i <= segments; i++) {
        var twist = Math.cos((i / segments) * Math.PI * twistCycles + time * TWIST_TIME_SPEED);
        var w = RIBBON_HALF_W * Math.abs(twist);
        var sign = twist >= 0 ? 1 : -1;
        twists.push(twist);
        tops.push({ x: pts[i].x + normals[i].nx * w * sign, y: pts[i].y + normals[i].ny * w * sign });
        bots.push({ x: pts[i].x - normals[i].nx * w * sign, y: pts[i].y - normals[i].ny * w * sign });
      }
      return { tops: tops, bots: bots, twists: twists };
    }

    function getFoldColor(frac, time, dark) {
      var cycle = (((frac * COLOR_CYCLE_FREQ + time * COLOR_CYCLE_SPEED) % 1) + 1) % 1;
      var colorA = dark ? D_COLOR_FOLD_A : L_COLOR_FOLD_A;
      var colorB = dark ? D_COLOR_FOLD_B : L_COLOR_FOLD_B;
      var colorC = dark ? D_COLOR_FOLD_C : L_COLOR_FOLD_C;
      if (cycle < 1 / 3) return lerpColor(colorA, colorB, cycle * 3);
      if (cycle < 2 / 3) return lerpColor(colorB, colorC, (cycle - 1 / 3) * 3);
      return lerpColor(colorC, colorA, (cycle - 2 / 3) * 3);
    }

    function getRibbonColor(frac, twist, time, dark) {
      var foldColor = getFoldColor(frac, time, dark);
      var faceColor = dark ? D_COLOR_FACE : L_COLOR_FACE;
      var facedness = Math.pow(Math.abs(twist), FACE_BLEND_GAMMA);
      return lerpColor(foldColor, faceColor, facedness);
    }

    function drawQuad(ax, ay, bx, by, cx, cy, dx, dy) {
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.lineTo(cx, cy);
      ctx.lineTo(dx, dy);
      ctx.closePath();
      ctx.fill();
    }

    function drawShadow(tops, bots, dark) {
      var color = dark ? D_SHADOW_COLOR : L_SHADOW_COLOR;
      var alpha = dark ? D_SHADOW_ALPHA : L_SHADOW_ALPHA;
      ctx.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + alpha + ')';
      for (var i = 0; i < segments; i++) {
        drawQuad(
          tops[i].x + SHADOW_OFFSET_X, tops[i].y + SHADOW_OFFSET_Y,
          tops[i + 1].x + SHADOW_OFFSET_X, tops[i + 1].y + SHADOW_OFFSET_Y,
          bots[i + 1].x + SHADOW_OFFSET_X, bots[i + 1].y + SHADOW_OFFSET_Y,
          bots[i].x + SHADOW_OFFSET_X, bots[i].y + SHADOW_OFFSET_Y
        );
      }
    }

    function drawRibbon(tops, bots, twists, time, dark) {
      var edgeColor = dark ? D_EDGE_COLOR : L_EDGE_COLOR;
      var edgeAlpha = dark ? D_EDGE_ALPHA : L_EDGE_ALPHA;
      for (var i = 0; i < segments; i++) {
        var rgb = getRibbonColor(i / segments, twists[i], time, dark);
        ctx.fillStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
        drawQuad(tops[i].x, tops[i].y, tops[i + 1].x, tops[i + 1].y, bots[i + 1].x, bots[i + 1].y, bots[i].x, bots[i].y);
        if (Math.abs(twists[i]) > EDGE_MIN_TWIST) {
          ctx.strokeStyle = 'rgba(' + edgeColor[0] + ',' + edgeColor[1] + ',' + edgeColor[2] + ',' + edgeAlpha + ')';
          ctx.lineWidth = EDGE_WEIGHT;
          ctx.beginPath();
          ctx.moveTo(tops[i].x, tops[i].y);
          ctx.lineTo(tops[i + 1].x, tops[i + 1].y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(bots[i].x, bots[i].y);
          ctx.lineTo(bots[i + 1].x, bots[i + 1].y);
          ctx.stroke();
        }
      }
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += waveSpeed;
      var dark = isDark();
      var pts = buildSpine(t);
      var normals = buildNormals(pts);
      var edges = buildEdges(pts, normals, t);
      drawShadow(edges.tops, edges.bots, dark);
      drawRibbon(edges.tops, edges.bots, edges.twists, t, dark);
      animationFrameId = requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);
    resize();
    render();

    // Theme observer
    var observer = new MutationObserver(function() {
      // Theme change — no action needed, render() checks isDark() every frame
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  // ========================================
  // PERSPECTIVE GRID
  // ========================================
  function initPerspectiveGrid() {
    var container = document.getElementById('perspectiveGrid');
    var grid = document.getElementById('perspectiveGridInner');
    var overlay = document.getElementById('perspectiveGridOverlay');
    if (!container || !grid || !overlay) return;

    var gridSize = 20;
    var tileCount = gridSize * gridSize;

    grid.style.gridTemplateColumns = 'repeat(' + gridSize + ', 1fr)';
    grid.style.gridTemplateRows = 'repeat(' + gridSize + ', 1fr)';

    for (var i = 0; i < tileCount; i++) {
      var tile = document.createElement('div');
      tile.className = 'tile';
      grid.appendChild(tile);
    }

    function applyStyles() {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      container.style.setProperty('--tile-border', light ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.08)');
      overlay.style.background = 'radial-gradient(circle, transparent 25%, ' + (light ? '#ffffff' : '#050505') + ' 80%)';
    }

    applyStyles();

    var observer = new MutationObserver(applyStyles);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }
})();
