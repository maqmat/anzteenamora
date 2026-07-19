// ── Fix de altura mobile FUERA de initScrollEffects para referencia estable ──
// Bug: hero=100vh (grande), destinations=100dvh (dinámico). Cuando Chrome Android
// oculta su barra de URL durante snap-scroll, el viewport crece pero la sección no
// reacciona a tiempo → franja negra.
// Fix: usar visualViewport.height que se actualiza en tiempo real, incluyendo
// durante las animaciones de la barra del browser, a diferencia de window.resize
// que NO se dispara confiablemente en esos casos en Android.
function _applyDestinationsHeight() {
  if (window.innerWidth > 768) return;
  const section = document.querySelector('.destinations-section');
  if (!section) return;
  const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  section.style.height = h + 'px';
}

// Registrar listeners una sola vez (sobreviven recargas del DOM del SPA)
if (!window._destHeightBound) {
  window._destHeightBound = true;
  if (window.visualViewport) {
    // visualViewport.resize: se dispara cuando la barra del browser Android cambia
    window.visualViewport.addEventListener('resize', _applyDestinationsHeight);
    window.visualViewport.addEventListener('scroll', _applyDestinationsHeight);
  }
  // Fallback para browsers sin visualViewport
  window.addEventListener('resize', _applyDestinationsHeight, { passive: true });
}

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

  // Aplicar altura correcta inmediatamente al renderizar la página
  _applyDestinationsHeight();
}
