export function initInteractions() {
  // 1. Círculo Táctil Interactivo (Cursor Follower)
  const indicator = document.getElementById('touch-indicator');
  
  if (indicator) {
    let isMoving = false;

    window.addEventListener('pointermove', (e) => {
      if (!isMoving) {
        indicator.classList.add('active');
        isMoving = true;
      }
      indicator.style.left = `${e.clientX}px`;
      indicator.style.top = `${e.clientY}px`;
    }, { passive: true });

    window.addEventListener('pointerdown', () => {
      indicator.classList.add('pressed');
    });

    window.addEventListener('pointerup', () => {
      indicator.classList.remove('pressed');
    });

    document.addEventListener('pointerleave', () => {
      indicator.classList.remove('active');
      isMoving = false;
    });
  }

  // 2. Inicialización del Deck 3D de Destinos
  initDestinationsDeck();

  // 3. Control de Skeletons (Espera de carga de imágenes)
  initCardImageLoaders();
}

export function initDestinationsDeck() {
  const deck = document.getElementById('destinations-deck');
  if (!deck) return;

  const cards = Array.from(deck.querySelectorAll('.editorial-card'));
  if (cards.length === 0) return;

  const nameEl = document.getElementById('active-dest-name');
  const descEl = document.getElementById('active-dest-desc');
  const dots   = Array.from(document.querySelectorAll('.deck-dot'));
  const bgOverlay = document.querySelector('.destinations-bg-overlay');

  const destinationData = [
    {
      name: 'Mochima',
      desc: 'Un paraíso de islas vírgenes, arenas doradas y delfines jugueteando en aguas cristalinas. El destino preferido para el buceo y snorkeling en el Caribe.',
      route: '/mochima'
    },
    {
      name: 'Lechería',
      desc: 'Fusión perfecta de modernidad y playa. Disfruta de atardeceres dorados en el Cerro El Morro, sus canales navegables y una gastronomía de clase mundial.',
      route: '/lecheria'
    },
    {
      name: 'Barcelona',
      desc: 'Viaja en el tiempo recorriendo el centro histórico de la época colonial. La Casa Amarilla y la Catedral te sumergen en las raíces culturales de Anzoátegui.',
      route: '/barcelona'
    },
    {
      name: 'Guanta',
      desc: 'Rodeada de imponentes montañas y selva tropical. Sus increíbles saltos de agua dulce, cascadas y playas escondidas ofrecen aventura y ecoturismo puro.',
      route: '/guanta'
    }
  ];

  let activeIndex     = 0;
  let isTransitioning = false;
  let locked          = false;
  let isScrollLocked  = false;   // true = wheel/touch intercepted
  let canLock         = true;

  let tVisibleId = null;
  let tLockId    = null;
  let tReadyId   = null;

  const section   = document.querySelector('.destinations-section');
  if (!section) return;

  const isMobile = () => window.innerWidth <= 768;

  // ─── Helpers para clase lock ─────────────────────────────────────────────────
  const applyLockClasses = () => {
    document.body.classList.add('destinations-locked');
    document.documentElement.classList.add('destinations-locked');
    document.documentElement.classList.remove('snap-scroll-enabled');
    if (!isMobile()) {
      // En desktop bloqueamos overflow
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // En móvil sólo bloqueamos touch-action; overflow queda libre para evitar
      // que el navegador reinicie la posición del scroll
      section.classList.add('destinations-locked-touch');
    }
  };

  const removeLockClasses = () => {
    document.body.classList.remove('destinations-locked');
    document.documentElement.classList.remove('destinations-locked');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.documentElement.classList.add('snap-scroll-enabled');
    section.classList.remove('destinations-locked-touch');
  };

  // ─── Callback global para que el router limpie el bloqueo ───────────────────
  window.unlockDestinationsDeck = () => {
    locked = false;
    isScrollLocked = false;
    canLock = true;
    clearTimeout(tVisibleId);
    clearTimeout(tLockId);
    clearTimeout(tReadyId);
    removeLockClasses();
    section.classList.remove('destinations-visible', 'coverflow-ready');
    if (bgOverlay) bgOverlay.dataset.currentBg = '';
  };

  // ─── Actualizar layout de tarjetas ─────────────────────────────────────────
  const updateDeckLayout = (animate = true) => {
    isTransitioning = true;

    cards.forEach((card, index) => {
      card.classList.remove('active-card', 'prev-card', 'next-card');
      const diff = index - activeIndex;

      if (diff === 0) {
        // Tarjeta activa: al frente, tamaño completo
        card.classList.add('active-card');
        card.style.setProperty('--tx', '0px');
        card.style.setProperty('--ty', '0px');
        card.style.setProperty('--tz', '0px');
        card.style.setProperty('--sc', '1');
        card.style.setProperty('--card-opacity', '1');
        card.style.zIndex = '10';
        card.style.pointerEvents = 'auto';
      } else if (diff < 0) {
        // Tarjetas anteriores: ocultas arriba
        card.classList.add('prev-card');
        card.style.setProperty('--tx', '0px');
        card.style.setProperty('--ty', '-110%');
        card.style.setProperty('--tz', '0px');
        card.style.setProperty('--sc', '0.85');
        card.style.setProperty('--card-opacity', '0');
        card.style.zIndex = '1';
        card.style.pointerEvents = 'none';
      } else {
        // Tarjetas siguientes: apiladas detrás, ligeramente abajo
        card.classList.add('next-card');
        const offset    = diff * 14;          // px desplazamiento vertical
        const scale     = 1 - diff * 0.04;   // escala decreciente
        const tz        = -diff * 30;         // profundidad en Z

        card.style.setProperty('--tx', '0px');
        card.style.setProperty('--ty', `${offset}px`);
        card.style.setProperty('--tz', `${tz}px`);
        card.style.setProperty('--sc', `${scale}`);
        card.style.setProperty('--card-opacity',
          diff === 1 ? '0.9' : diff === 2 ? '0.6' : '0.0');
        card.style.zIndex = `${10 - diff}`;
        card.style.pointerEvents = 'none';
      }
    });

    // Actualizar texto con split-char
    if (nameEl && descEl) {
      const data = destinationData[activeIndex];

      // Fade out descripción
      descEl.classList.add('changing');

      // Rebuild nombre con letras animadas
      nameEl.innerHTML = '';
      data.name.split('').forEach((char) => {
        const span = document.createElement('span');
        span.className = 'split-char';
        span.innerHTML = char === ' ' ? '&nbsp;' : char;
        nameEl.appendChild(span);
      });

      // Trigger reveal en cascada
      requestAnimationFrame(() => {
        nameEl.querySelectorAll('.split-char').forEach((span, i) => {
          setTimeout(() => span.classList.add('reveal'), i * 38);
        });
      });

      // Actualizar descripción cuando está invisible
      setTimeout(() => {
        descEl.textContent = data.desc;
        descEl.classList.remove('changing');
      }, 220);
    }

    // Actualizar dots
    dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));

    // Actualizar fondo dinámico
    if (bgOverlay) {
      const img = cards[activeIndex].querySelector('.card-media img');
      if (img) {
        const src = img.currentSrc || img.src || img.getAttribute('src');
        if (src && bgOverlay.dataset.currentBg !== src) {
          animateLiquid();
          bgOverlay.style.backgroundImage = `url('${src}')`;
          bgOverlay.dataset.currentBg = src;
        }
        if (!img.complete) {
          img.addEventListener('load', () => {
            const s2 = img.currentSrc || img.src;
            if (s2 && bgOverlay.dataset.currentBg !== s2) {
              animateLiquid();
              bgOverlay.style.backgroundImage = `url('${s2}')`;
              bgOverlay.dataset.currentBg = s2;
            }
          }, { once: true });
        }
      }
    }

    // Liberar flag de transición (esperar duración de la animación CSS)
    setTimeout(() => { isTransitioning = false; }, 700);
  };

  // ─── Animación de distorsión líquida ────────────────────────────────────────
  const animateLiquid = () => {
    const dispEl = document.getElementById('liquid-displacement');
    if (!dispEl) return;
    let startTime = null;
    const duration = 1200;
    const maxScale = 90;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const pct = Math.min((ts - startTime) / duration, 1);
      dispEl.setAttribute('scale', Math.sin(pct * Math.PI) * maxScale);
      if (pct < 1) requestAnimationFrame(step);
      else dispEl.setAttribute('scale', 0);
    };
    requestAnimationFrame(step);
  };

  // ─── LOCK: anclar la página en esta sección ─────────────────────────────────
  const enableLock = () => {
    if (locked || !canLock) return;
    locked = true;
    isScrollLocked = false;

    // Reset fondo
    if (bgOverlay) bgOverlay.dataset.currentBg = '';

    // Resetear al primer destino
    activeIndex = 0;

    // Centrar la sección en pantalla ANTES de actualizar el layout (evita flash)
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });

    clearTimeout(tVisibleId);
    clearTimeout(tLockId);
    clearTimeout(tReadyId);

    // Disparar animación de entrada al terminar el scroll suave (~400ms)
    tVisibleId = setTimeout(() => {
      if (!locked) return;
      updateDeckLayout();                          // Posicionar tarjetas
      section.classList.add('destinations-visible'); // Disparar CSS transition
    }, 350);

    // Congelar viewport después de que las tarjetas hayan aterrizando (~950ms total)
    tLockId = setTimeout(() => {
      if (!locked) return;
      isScrollLocked = true;

      // Snap de seguridad
      section.scrollIntoView({ behavior: 'instant', block: 'start' });

      applyLockClasses();
    }, 950);

    // Activar transiciones rápidas de coverflow (1700ms)
    tReadyId = setTimeout(() => {
      if (!locked) return;
      section.classList.add('coverflow-ready');
    }, 1700);
  };

  // ─── UNLOCK: salir de la sección ────────────────────────────────────────────
  const exitDeck = (direction) => {
    locked = false;
    isScrollLocked = false;
    canLock = false;

    clearTimeout(tVisibleId);
    clearTimeout(tLockId);
    clearTimeout(tReadyId);

    removeLockClasses();
    section.classList.remove('destinations-visible', 'coverflow-ready');

    if (bgOverlay) bgOverlay.dataset.currentBg = '';

    // Reactivar canLock después de que el usuario haya salido de la sección
    setTimeout(() => { canLock = true; }, 1400);

    const targetSelector = direction === 'up' ? '.intro-section' : '.experiences-section';
    const target = document.querySelector(targetSelector);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ─── Lógica central de navegación del deck ──────────────────────────────────
  const COOLDOWN = 700;
  let lastNav = 0;

  const navigate = (dir, isTouch = false) => {
    const now = Date.now();
    const cd  = isTouch ? 350 : COOLDOWN;
    if (isTransitioning || now - lastNav < cd) return;
    lastNav = now;

    if (dir === 'next') {
      if (activeIndex < cards.length - 1) {
        activeIndex++;
        updateDeckLayout();
      } else {
        exitDeck('down');
      }
    } else {
      if (activeIndex > 0) {
        activeIndex--;
        updateDeckLayout();
      } else {
        exitDeck('up');
      }
    }
  };

  // ─── Click en dots ──────────────────────────────────────────────────────────
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (isTransitioning || index === activeIndex) return;
      activeIndex = index;
      updateDeckLayout();
    });
  });

  // ─── Click en tarjetas del deck ────────────────────────────────────────────
  // IMPORTANTE: Este handler solo aplica a las tarjetas del deck (navegación interna).
  // La navegación a páginas de detalle la maneja el router mediante data-route.
  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      if (!isScrollLocked) return; // Solo interceptar cuando el deck está activo
      if (index !== activeIndex) {
        // Click en tarjeta no activa → cambiar activa
        e.preventDefault();
        e.stopPropagation();
        activeIndex = index;
        updateDeckLayout();
      }
      // Si es la tarjeta activa, el router.js manejará la navegación a la ruta
    });
  });

  // ─── Wheel (desktop) ────────────────────────────────────────────────────────
  const wheelHandler = (e) => {
    if (!isScrollLocked) return;
    e.preventDefault();
    const now = Date.now();
    if (now - lastNav < COOLDOWN) return;
    navigate(e.deltaY > 0 ? 'next' : 'prev');
  };
  window.addEventListener('wheel', wheelHandler, { passive: false });

  // ─── Touch (móvil) ──────────────────────────────────────────────────────────
  let touchStartY   = 0;
  let touchIsActive = false;

  const touchStartHandler = (e) => {
    if (!isScrollLocked) return;
    if (e.touches.length === 1) {
      touchStartY   = e.touches[0].clientY;
      touchIsActive = true;
    }
  };

  const touchMoveHandler = (e) => {
    if (!isScrollLocked || !touchIsActive) return;
    e.preventDefault();
    const diffY = touchStartY - e.touches[0].clientY;
    if (Math.abs(diffY) > 45) {
      touchIsActive = false;
      navigate(diffY > 0 ? 'next' : 'prev', true);
    }
  };

  const touchEndHandler = () => { touchIsActive = false; };

  window.addEventListener('touchstart', touchStartHandler, { passive: true });
  window.addEventListener('touchmove',  touchMoveHandler,  { passive: false });
  window.addEventListener('touchend',   touchEndHandler,   { passive: true });

  // ─── IntersectionObserver ───────────────────────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const mobile = isMobile();

      if (entry.isIntersecting) {
        // Mostrar animación de entrada desde el 25% de visibilidad
        if (entry.intersectionRatio >= 0.25 && canLock) {
          section.classList.add('destinations-visible');
        }

        // En desktop bloqueamos desde el 30%
        if (!mobile && entry.intersectionRatio >= 0.3 && canLock && !locked) {
          enableLock();
        }

        // En móvil bloqueamos desde el 60% (barra de URL hace que 80% nunca llegue)
        if (mobile && entry.intersectionRatio >= 0.6 && canLock && !locked) {
          enableLock();
        }

      } else {
        // Salida de pantalla: cancelar si el lock aún no se consolidó
        if (!isScrollLocked) {
          locked = false;
          canLock = true;
          clearTimeout(tVisibleId);
          clearTimeout(tLockId);
          clearTimeout(tReadyId);
          removeLockClasses();
          section.classList.remove('destinations-visible', 'coverflow-ready');
          if (bgOverlay) bgOverlay.dataset.currentBg = '';
        }
      }
    });
  }, { threshold: [0.1, 0.25, 0.3, 0.6, 0.8] });

  observer.observe(section);

  // Inicializar posiciones sin animación
  updateDeckLayout(false);
}

export function initCardImageLoaders() {
  const cards = document.querySelectorAll('.editorial-card');

  cards.forEach((card) => {
    const img = card.querySelector('.card-media img');
    if (!img) return;

    const handleLoad = () => {
      card.classList.add('media-loaded');
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener('load', handleLoad);
    }
  });
}
