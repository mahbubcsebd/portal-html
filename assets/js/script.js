document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Elements
  const header = document.getElementById('main-header');
  const menuToggle = document.getElementById('menu-toggle');
  const logoLink = document.getElementById('logo-link');
  const menuItems = document.querySelectorAll('.t4e-portal-menu-item');
  const submenuToggles = document.querySelectorAll('.t4e-portal-submenu-toggle');

  let isOpen = false;
  let isScrolled = false;

  // Function to toggle menu
  const toggleMenu = () => {
    isOpen = !isOpen;
    if (isOpen) {
      header.classList.add('t4e-portal-menu-open');
      // Staggered animation for menu items
      menuItems.forEach((item, index) => {
        item.style.transitionDelay = `${0.2 + (index * 0.07)}s`;
      });
    } else {
      header.classList.remove('t4e-portal-menu-open');
      // Close all submenus when closing main menu
      document.querySelectorAll('.t4e-portal-submenu').forEach(sub => {
        sub.classList.remove('t4e-portal-open');
        const icon = sub.previousElementSibling.querySelector('.t4e-portal-submenu-icon');
        if(icon) icon.style.transform = 'rotate(0deg)';
      });
      // Remove transition delays for exit
      menuItems.forEach((item) => {
        item.style.transitionDelay = '0s';
      });
    }
  };

  // Event Listeners for menu toggle
  menuToggle.addEventListener('click', toggleMenu);

  // Close menu if clicking logo
  logoLink.addEventListener('click', (e) => {
    if (isOpen) {
      toggleMenu();
    }
  });

  // Handle scroll event for sticky header transparency
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      if (!isScrolled) {
        header.classList.add('t4e-portal-scrolled');
        isScrolled = true;
      }
    } else {
      if (isScrolled) {
        header.classList.remove('t4e-portal-scrolled');
        isScrolled = false;
      }
    }
  }, { passive: true });

  // Restructure submenu HTML to allow grid-template-rows animation
  document.querySelectorAll('.t4e-portal-submenu').forEach(submenu => {
    const innerContent = submenu.innerHTML;
    submenu.innerHTML = `<div class="t4e-portal-submenu-inner">${innerContent}</div>`;
  });

  // Handle submenu toggles
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = toggle.nextElementSibling;
      const icon = toggle.querySelector('.t4e-portal-submenu-icon');
      
      const isOpen = submenu.classList.contains('t4e-portal-open');
      
      // Close all other submenus
      document.querySelectorAll('.t4e-portal-submenu').forEach(sub => {
        sub.classList.remove('t4e-portal-open');
        const subIcon = sub.previousElementSibling.querySelector('.t4e-portal-submenu-icon');
        if(subIcon) subIcon.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        submenu.classList.add('t4e-portal-open');
        if(icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Regular menu links close the menu
  document.querySelectorAll('.t4e-portal-menu-link:not(.t4e-portal-submenu-toggle), .t4e-portal-submenu-link').forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) toggleMenu();
    });
  });

  // ================= SCROLL ANIMATIONS ================= //
  gsap.registerPlugin(ScrollTrigger);

  // Core Capabilities Wave Animation
  const cards = gsap.utils.toArray('.t4e-portal-capability-card');
  cards.forEach((card, i) => {
    // Mobile Accordion Toggle
    card.addEventListener('click', () => {
      if (window.innerWidth <= 1023) {
        // Close others
        cards.forEach(c => { if (c !== card) c.classList.remove('t4e-portal-open'); });
        card.classList.toggle('t4e-portal-open');
      }
    });

    const isLeft = card.classList.contains('left-anim');
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%", // Triggers slightly before scrolling into view
        toggleActions: "play none none reverse"
      },
      opacity: 0, 
      x: isLeft ? -50 : 50,
      duration: 0.8,
      ease: "power3.out",
      delay: (i % 2) * 0.15 // Staggers left vs right
    });
  });

  // ================= WHY THINK4EVER WAVE ANIMATION ================= //
  const whyCards = document.querySelectorAll('.t4e-portal-why-card-anim');
  if (whyCards.length > 0) {
    const whyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = parseInt(card.getAttribute('data-delay') || '0');
          setTimeout(() => {
            card.classList.add('t4e-portal-why-visible');
          }, delay * 140);
          whyObserver.unobserve(card);
        }
      });
    }, { threshold: 0.15 });
    whyCards.forEach(card => whyObserver.observe(card));
  }

  // ================= CTA BOX SCROLL ANIMATION ================= //
  const ctaBox = document.getElementById('cta-box');
  if (ctaBox) {
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('t4e-portal-cta-visible');
          ctaObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    ctaObserver.observe(ctaBox);
  }

  // ================= FOOTER SCROLL ANIMATION ================= //
  const footerSec = document.getElementById('portal-footer');
  if (footerSec) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('t4e-portal-footer-visible');
          footerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    footerObserver.observe(footerSec);
  }

});
