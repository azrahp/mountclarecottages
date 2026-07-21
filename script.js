/* ==========================================================================
   MOUNTCLARE COTTAGES - INTERACTIVE JS LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navbar Scroll & Active State --- */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinksContainer = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* --- Mobile Menu Toggle --- */
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }

  // Close mobile nav when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('active');
      const icon = mobileMenuBtn?.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    });
  });

  /* --- Scroll Reveal Animations --- */
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- Lightbox Gallery Modal --- */
  const showcaseImg = document.getElementById('showcasePrimaryImg');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (showcaseImg && lightboxModal && lightboxImg) {
    showcaseImg.addEventListener('click', () => {
      lightboxImg.src = showcaseImg.src;
      lightboxImg.alt = showcaseImg.alt;
      lightboxModal.classList.add('active');
    });

    lightboxClose?.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  /* --- Leaflet Interactive Map --- */
  const mapElement = document.getElementById('sybrandMap');
  if (mapElement && typeof L !== 'undefined') {
    // 2 Mountclare Rd, Sybrand Park, Cape Town approx coordinates
    const lat = -33.9575;
    const lng = 18.4982;

    const map = L.map('sybrandMap', {
      center: [lat, lng],
      zoom: 14,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19
    }).addTo(map);

    // Custom Gold Pin Marker
    const goldIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="background-color:#C5A059; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#FFF; box-shadow:0 6px 20px rgba(197,160,89,0.5); border:2px solid #FFF;"><i class="fas fa-home"></i></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);
    marker.bindPopup(`
      <div style="text-align:center; padding:5px;">
        <strong style="font-family:serif; font-size:1.1rem; color:#1C1E21;">Mountclare Cottages</strong><br/>
        <span style="font-size:0.85rem; color:#6B707B;">2 Mountclare, Sybrand Park, Cape Town</span><br/>
        <span style="font-size:0.75rem; color:#C5A059; font-weight:600;">Opening November 2026</span>
      </div>
    `).openPopup();
  }

  /* --- Registration Form Handling --- */
  const registerForm = document.getElementById('registerInterestForm');
  const toastModal = document.getElementById('toastModal');
  const toastBackdrop = document.getElementById('toastBackdrop');
  const toastCloseBtn = document.getElementById('toastCloseBtn');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic input validation
      const name = document.getElementById('formName').value;
      const email = document.getElementById('formEmail').value;
      const phone = document.getElementById('formPhone').value;

      if (name && email && phone) {
        // Trigger Toast Modal
        if (toastModal && toastBackdrop) {
          toastModal.classList.add('active');
          toastBackdrop.classList.add('active');
        }

        // Reset form
        registerForm.reset();
      }
    });

    if (toastCloseBtn) {
      toastCloseBtn.addEventListener('click', () => {
        toastModal?.classList.remove('active');
        toastBackdrop?.classList.remove('active');
      });
    }

    if (toastBackdrop) {
      toastBackdrop.addEventListener('click', () => {
        toastModal?.classList.remove('active');
        toastBackdrop?.classList.remove('active');
      });
    }
  }

});
