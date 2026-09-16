/* ==========================================================================
   Pg PathWay — simple vanilla JavaScript
   1. Mobile menu      4. Destination filter   7. Contact form validation
   2. Sticky header    5. Testimonial carousel 8. Back to top
   3. Scroll reveal    6. FAQ accordion        9. Footer year
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- 1. Mobile menu */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  function closeMenu() {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  navToggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Close the menu after tapping any link inside it.
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      navToggle.focus();
    }
  });

  /* ------------------------------------------------ 2. Sticky header + active link */
  var header = document.getElementById('siteHeader');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  function onScroll() {
    var y = window.scrollY;

    header.classList.toggle('is-scrolled', y > 8);
    toTop.classList.toggle('is-visible', y > 500);

    // Highlight the section currently under the header.
    var current = '';
    sections.forEach(function (section) {
      if (y >= section.offsetTop - 120) current = '#' + section.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === current);
    });
  }

  /* ------------------------------------------------------------- 3. Scroll reveal */
  var revealItems = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        // Small stagger so grouped cards appear one after another.
        setTimeout(function () { entry.target.classList.add('is-visible'); }, i * 70);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* --------------------------------------------------------- 3b. Animated counters */
  var counters = document.querySelectorAll('.stat-value');

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';

    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }

    var duration = 1400;
    var start = performance.now();

    function frame(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(countUp);
  }

  /* ------------------------------------------------------- 4. Destination filter */
  var chips = document.querySelectorAll('.chip');
  var destinations = document.querySelectorAll('#destinationGrid .dest');
  var filterEmpty = document.getElementById('filterEmpty');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = chip.getAttribute('data-filter');
      var shown = 0;

      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');

      destinations.forEach(function (card) {
        var tags = card.getAttribute('data-tags') || '';
        var match = filter === 'all' || tags.split(' ').indexOf(filter) !== -1;
        card.hidden = !match;
        if (match) shown++;
      });

      filterEmpty.hidden = shown > 0;
    });
  });

  /* ---------------------------------------------------- 5. Testimonial carousel */
  var track = document.getElementById('carouselTrack');
  var slides = track.children;
  var dotsWrap = document.getElementById('carouselDots');
  var index = 0;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(' + (-index * 100) + '%)';
    Array.prototype.forEach.call(dotsWrap.children, function (dot, d) {
      dot.classList.toggle('is-active', d === index);
      dot.setAttribute('aria-selected', String(d === index));
    });
  }

  // Build one dot per testimonial.
  Array.prototype.forEach.call(slides, function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
    dot.addEventListener('click', function () {
      goTo(i);
      restartAutoplay();
    });
    dotsWrap.appendChild(dot);
  });

  document.getElementById('prevBtn').addEventListener('click', function () {
    goTo(index - 1);
    restartAutoplay();
  });
  document.getElementById('nextBtn').addEventListener('click', function () {
    goTo(index + 1);
    restartAutoplay();
  });

  var autoplay = null;
  function startAutoplay() {
    if (reduceMotion) return;
    autoplay = setInterval(function () { goTo(index + 1); }, 6000);
  }
  function restartAutoplay() {
    clearInterval(autoplay);
    startAutoplay();
  }

  var carousel = document.getElementById('carousel');
  carousel.addEventListener('mouseenter', function () { clearInterval(autoplay); });
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', function () { clearInterval(autoplay); });

  goTo(0);
  startAutoplay();

  /* ------------------------------------------------------------- 6. FAQ accordion */
  var triggers = document.querySelectorAll('.acc-trigger');

  triggers.forEach(function (trigger) {
    var panel = trigger.nextElementSibling;

    trigger.addEventListener('click', function () {
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close every panel first so only one stays open.
      triggers.forEach(function (other) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ------------------------------------------------------- 7. Contact form checks */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');
  var nameInput = document.getElementById('name');

  function setError(field, message) {
    var wrapper = field.closest('.field');
    var slot = wrapper.querySelector('.error');
    wrapper.classList.toggle('has-error', Boolean(message));
    slot.textContent = message || '';
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validateField(field) {
    var value = field.value.trim();

    if (!value) {
      setError(field, 'This field is required.');
      return false;
    }
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError(field, 'Enter a valid email address, e.g. you@example.com');
      return false;
    }
    if (field.id === 'name' && value.length < 2) {
      setError(field, 'Please enter your full name.');
      return false;
    }
    if (field.id === 'message' && value.length < 15) {
      setError(field, 'Please give us a little more detail (15 characters or more).');
      return false;
    }
    setError(field, '');
    return true;
  }

  var fields = form.querySelectorAll('input, select, textarea');
  fields.forEach(function (field) {
    // Re-check on blur, and clear the error as soon as the user fixes it.
    field.addEventListener('blur', function () { validateField(field); });
    field.addEventListener('input', function () {
      if (field.closest('.field').classList.contains('has-error')) validateField(field);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var valid = true;
    var firstInvalid = null;

    fields.forEach(function (field) {
      if (!validateField(field)) {
        valid = false;
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (!valid) {
      status.textContent = 'Please correct the highlighted fields.';
      status.className = 'form-note is-error';
      firstInvalid.focus();
      return;
    }

    // No backend here — simulate the request so the button state is realistic.
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    status.textContent = '';
    status.className = 'form-note';

    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request my consultation';
      status.textContent = 'Thank you, ' + nameInput.value.trim().split(' ')[0] +
        '. A counsellor will reply within one working day.';
      status.className = 'form-note is-success';
      form.reset();
    }, 1200);
  });

  /* ----------------------------------------------------------- 8. Back to top */
  var toTop = document.getElementById('toTop');
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ----------------------------------------------------------- 9. Footer year */
  document.getElementById('year').textContent = new Date().getFullYear();

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
