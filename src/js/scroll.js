export function initScrollEffects() {
  // 1. Cambiar aspecto del cabezal en scroll
  const handleHeaderScroll = () => {
    const headerEl = document.querySelector('.main-header');
    if (!headerEl) return;
    if (window.scrollY > 50) {
      headerEl.classList.add('scrolled');
    } else {
      headerEl.classList.remove('scrolled');
    }
  };

  // 2. Animaciones de revelado (Scroll Reveal)
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  const elementsToReveal = document.querySelectorAll('.reveal-container, .reveal-fade-up');
  elementsToReveal.forEach((el) => {
    revealObserver.observe(el);
  });

  // 3. Parallax del Hero
  const updateHeroParallax = () => {
    const hero = document.querySelector('.hero-section');
    const heroMedia = document.querySelector('.hero-media-container');
    const heroText = document.querySelector('.hero-text-container');
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (!hero) return;
    const scrollY = window.scrollY;
    const heroHeight = hero.clientHeight;

    if (scrollY <= heroHeight) {
      const progress = scrollY / (heroHeight || 1);

      if (heroMedia) {
        heroMedia.style.transform = `translateY(${progress * 12}%) scale(${1 + progress * 0.03})`;
      }
      if (heroText) {
        heroText.style.opacity = `${1 - progress * 1.5}`;
        heroText.style.transform = `translateY(${progress * 80}px)`;
      }
      if (scrollIndicator) {
        scrollIndicator.style.opacity = `${1 - progress * 3}`;
      }
    }
  };

  // 4. Manejo unificado de eventos de scroll a 60fps
  let scrollTick = false;
  const handleScroll = () => {
    handleHeaderScroll();
    if (!scrollTick) {
      window.requestAnimationFrame(() => {
        updateHeroParallax();
        scrollTick = false;
      });
      scrollTick = true;
    }
  };

  // Prevenir duplicación del listener en transiciones SPA
  if (!window.scrollListenerBound) {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.scrollListenerBound = true;
  }
  
  // Ejecución inicial para fijar el estado
  handleHeaderScroll();
  updateHeroParallax();

  // ── Fix altura mobile para destinations-section ─────────────────────────────
  // El bug: 100dvh cambia cuando Chrome Android oculta/muestra la barra de URL
  // durante el snap-scroll. El hero usa 100vh (grande) y la section podría quedar
  // más corta que el viewport, dejando una franja negra abajo.
  // La solución: fijar la altura con window.innerHeight (siempre exacto).
  function fixMobileDestinationsHeight() {
    const section = document.querySelector('.destinations-section');
    if (!section) return;
    if (window.innerWidth <= 768) {
      section.style.height = window.innerHeight + 'px';
    } else {
      section.style.height = ''; // limpiar en desktop
    }
  }

  // Aplicar de inmediato
  fixMobileDestinationsHeight();

  // Actualizar cuando el viewport cambia (address bar show/hide dispara resize)
  if (!window.mobileVhListenerBound) {
    window.addEventListener('resize', fixMobileDestinationsHeight, { passive: true });
    window.mobileVhListenerBound = true;
  }
}
