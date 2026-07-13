export function initMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const menuOverlay = document.getElementById('menu-overlay');
  const carousel = document.getElementById('menu-carousel-container');

  if (!menuBtn || !menuOverlay) return;

  // Alternar apertura y cierre del menú
  menuBtn.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('menu-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Cerrar menú con la tecla Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
  });

  function openMenu() {
    document.body.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Cerrar menú');
    
    // Centrar la primera tarjeta o scroll a 0 al abrir
    if (carousel) {
      carousel.style.scrollBehavior = 'auto';
      carousel.scrollLeft = 0;
      carousel.style.scrollBehavior = 'smooth';
    }
  }

  function closeMenu() {
    document.body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menú');
  }

  // Lógica de Arrastre Horizontal (Mouse & Touch Dragging)
  if (carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let isMoved = false; // Para evitar clicks accidentales mientras se arrastra

    // Eventos Mouse
    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      isMoved = false;
      carousel.style.scrollBehavior = 'auto'; // Desactivar comportamiento suave para arrastre directo
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        carousel.style.scrollBehavior = 'smooth';
      }
    });

    carousel.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        carousel.style.scrollBehavior = 'smooth';
      }
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5; // Multiplicador de arrastre
      if (Math.abs(walk) > 8) {
        isMoved = true;
      }
      carousel.scrollLeft = scrollLeft - walk;
    });

    // Eventos Touch
    carousel.addEventListener('touchstart', (e) => {
      isDown = true;
      isMoved = false;
      carousel.style.scrollBehavior = 'auto';
      startX = e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
      if (isDown) {
        isDown = false;
        carousel.style.scrollBehavior = 'smooth';
      }
    });

    carousel.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.2;
      if (Math.abs(walk) > 8) {
        isMoved = true;
      }
      carousel.scrollLeft = scrollLeft - walk;
    }, { passive: true });

    // Evitar que el click navegue si el usuario estuvo arrastrando la tarjeta
    const menuLinks = carousel.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (isMoved) {
          e.preventDefault();
        } else {
          // Si el click fue legítimo, cerramos el menú antes de navegar
          closeMenu();
        }
      });
    });
  }

  // Exponer función de cierre globalmente para navegación SPA
  window.closeMenu = closeMenu;
}
