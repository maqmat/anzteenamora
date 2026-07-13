export function initInteractions() {
  // 1. Círculo Táctil Interactivo (Cursor Follower)
  const indicator = document.getElementById('touch-indicator');
  
  if (indicator) {
    let isMoving = false;

    // Actualizar posición
    window.addEventListener('pointermove', (e) => {
      // Activar al primer movimiento
      if (!isMoving) {
        indicator.classList.add('active');
        isMoving = true;
      }
      
      // Mover el indicador usando transform para mayor rendimiento (60fps)
      indicator.style.left = `${e.clientX}px`;
      indicator.style.top = `${e.clientY}px`;
    }, { passive: true });

    // Click/Touch presionado
    window.addEventListener('pointerdown', () => {
      indicator.classList.add('pressed');
    });

    // Click/Touch liberado
    window.addEventListener('pointerup', () => {
      indicator.classList.remove('pressed');
    });

    // Ocultar si el cursor sale de la pantalla
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

  const cards = deck.querySelectorAll('.editorial-card');
  const nameEl = document.getElementById('active-dest-name');
  const descEl = document.getElementById('active-dest-desc');
  const linkEl = document.getElementById('active-dest-link');
  const dots = document.querySelectorAll('.deck-dot');
  const bgOverlay = document.querySelector('.destinations-bg-overlay');

  const destinationData = [
    {
      name: "Mochima",
      desc: "Un paraíso de islas vírgenes, arenas doradas y delfines jugueteando en aguas cristalinas. El destino preferido para el buceo y snorkeling en el Caribe.",
      route: "/mochima"
    },
    {
      name: "Lechería",
      desc: "Fusión perfecta de modernidad y playa. Disfruta de atardeceres dorados en el Cerro El Morro, sus canales navegables y una gastronomía de clase mundial.",
      route: "/lecheria"
    },
    {
      name: "Barcelona",
      desc: "Viaja en el tiempo recorriendo el centro histórico de la época colonial. La Casa Amarilla y la Catedral te sumergen en las raíces culturales de Anzoátegui.",
      route: "/barcelona"
    },
    {
      name: "Guanta",
      desc: "Rodeada de imponentes montañas y selva tropical. Sus increíbles saltos de agua dulce, cascadas y playas escondidas ofrecen aventura y ecoturismo puro.",
      route: "/guanta"
    }
  ];

  let activeIndex = 0;
  let isTransitioning = false;

  // Estado de bloqueo
  let locked = false;
  let isScrollLockActive = false;
  let canLock = true; // Controla si se puede enganchar el bloqueo (se desactiva al salir y se reactiva cuando sale de pantalla)

  const section = document.querySelector('.destinations-section');
  if (!section) return;

  // ─── Callback global para que el router limpie el bloqueo ───────────────────
  window.unlockDestinationsDeck = () => {
    locked = false;
    isScrollLockActive = false;
    canLock = true;
    document.body.classList.remove('destinations-locked');
    document.documentElement.classList.remove('destinations-locked');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.documentElement.classList.add('snap-scroll-enabled');
  };

  // ─── LOCK: anclar la página en esta sección ─────────────────────────────────
  const enableLock = () => {
    if (locked || !canLock) return;
    locked = true;
    isScrollLockActive = false; // No interceptar gestos inmediatamente para no abortar el scroll de centrado

    // Forzar la animación líquida del fondo restableciendo el caché
    if (bgOverlay) {
      bgOverlay.dataset.currentBg = "";
    }

    // Siempre iniciar en la primera tarjeta (Mochima) para mostrar el mazo completo y ordenado
    activeIndex = 0;
    updateDeckLayout();

    // Centrar suavemente la sección en pantalla (solo en desktop, en móvil el snapping nativo lo hace)
    if (window.innerWidth > 768) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Disparar animación de entrada (destinations-visible) con un leve retraso
    setTimeout(() => {
      if (locked) {
        section.classList.add('destinations-visible');
      }
    }, 200);

    // Activar anclaje de scroll duro y desactivar snap sólo al terminar la transición (600ms)
    setTimeout(() => {
      if (locked) {
        isScrollLockActive = true;
        document.body.classList.add('destinations-locked');
        document.documentElement.classList.add('destinations-locked');
        
        document.documentElement.classList.remove('snap-scroll-enabled');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      }
    }, 600);

    // Habilitar físicas rápidas de coverflow después de la animación de entrada (1700ms)
    setTimeout(() => {
      if (locked) {
        section.classList.add('coverflow-ready');
      }
    }, 1700);
  };

  // ─── UNLOCK: salir hacia arriba o hacia abajo ───────────────────────────────
  const exitDeck = (direction) => {
    locked = false;
    isScrollLockActive = false;
    canLock = false; // Desactivar bloqueo temporalmente para permitir salir de la sección

    // Restaurar scroll de la página y reactivar scroll snapping
    document.body.classList.remove('destinations-locked');
    document.documentElement.classList.remove('destinations-locked');
    
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.documentElement.classList.add('snap-scroll-enabled');

    // Remover clases de animación para que se vuelvan a reproducir de cero en la próxima entrada
    section.classList.remove('destinations-visible', 'coverflow-ready');

    // Resetear el caché del fondo para garantizar que corra la transición líquida en la próxima entrada
    if (bgOverlay) {
      bgOverlay.dataset.currentBg = "";
    }

    // Cooldown temporal doblemente seguro para re-activar canLock
    setTimeout(() => {
      canLock = true;
    }, 1500);

    if (direction === 'up') {
      const target = document.querySelector('.intro-section');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const target = document.querySelector('.experiences-section');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ─── Animación de distorsión líquida (Idea 1) ───────────────────────────────
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

  // ─── Actualizar layout de tarjetas + split-text ─────────────────────────────
  const updateDeckLayout = () => {
    isTransitioning = true;

    cards.forEach((card, index) => {
      card.classList.remove('active-card', 'prev-card', 'next-card');
      const diff = index - activeIndex;

      // Limpiar inline style de transform/opacity para que no bloqueen las variables CSS y la transición de entrada
      card.style.transform = '';
      card.style.opacity = '';

      if (diff === 0) {
        card.classList.add('active-card');
        card.style.setProperty('--translateX', '0px');
        card.style.setProperty('--translateY', '0px');
        card.style.setProperty('--translateZ', '15px');
        card.style.setProperty('--scale', '1.02');
        card.style.setProperty('--tilt', '0deg');
        card.style.setProperty('--card-opacity', '1');
        card.style.zIndex = '10';
        card.style.pointerEvents = 'auto';
      } else if (diff < 0) {
        card.classList.add('prev-card');
        card.style.setProperty('--translateX', '-25%');
        card.style.setProperty('--translateY', '-115%');
        card.style.setProperty('--translateZ', '80px');
        card.style.setProperty('--scale', '0.85');
        card.style.setProperty('--tilt', '-12deg');
        card.style.setProperty('--card-opacity', '0');
        card.style.zIndex = '9';
        card.style.pointerEvents = 'none';
      } else {
        card.classList.add('next-card');
        const offset = diff * 28;
        const scale = 1 - diff * 0.07;
        const translateZ = -diff * 110;
        const rotateY = diff * 2;

        card.style.setProperty('--translateX', '0px');
        card.style.setProperty('--translateY', `${offset}px`);
        card.style.setProperty('--translateZ', `${translateZ}px`);
        card.style.setProperty('--scale', `${scale}`);
        card.style.setProperty('--tilt', `${rotateY}deg`);
        card.style.setProperty('--card-opacity', diff === 1 ? '0.9' : diff === 2 ? '0.65' : '0.3');
        card.style.zIndex = `${10 - diff}`;
        card.style.pointerEvents = 'none';
      }
    });

    // Split-text reveal (Idea 2)
    if (nameEl && descEl && linkEl) {
      const data = destinationData[activeIndex];
      nameEl.innerHTML = '';
      data.name.split('').forEach((char) => {
        const span = document.createElement('span');
        span.className = 'split-char';
        span.innerHTML = char === ' ' ? '&nbsp;' : char;
        nameEl.appendChild(span);
      });
      descEl.style.opacity = '0';
      linkEl.style.opacity = '0';

      setTimeout(() => {
        nameEl.querySelectorAll('.split-char').forEach((span, i) => {
          setTimeout(() => span.classList.add('reveal'), i * 40);
        });
      }, 50);

      setTimeout(() => {
        descEl.textContent = data.desc;
        linkEl.setAttribute('data-route', data.route);
        descEl.style.opacity = '1';
        linkEl.style.opacity = '1';
        isTransitioning = false;
      }, 280);
    } else {
      isTransitioning = false;
    }

    // Dots
    dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));

    // Fondo dinámico
    if (bgOverlay) {
      const img = cards[activeIndex].querySelector('.card-media img');
      if (img) {
        const updateBg = () => {
          const src = img.src || img.getAttribute('src');
          if (src && bgOverlay.dataset.currentBg !== src) {
            animateLiquid();
            bgOverlay.style.backgroundImage = `url('${src}')`;
            bgOverlay.dataset.currentBg = src;
          }
        };
        updateBg();
        img.addEventListener('load', updateBg, { once: true });
      }
    }
  };

  // ─── Lógica central de navegación ──────────────────────────────────────────
  const COOLDOWN = 750;
  let lastNav = 0;

  const navigate = (dir, isTouch = false) => {
    const now = Date.now();
    const currentCooldown = isTouch ? 300 : COOLDOWN;
    if (isTransitioning || now - lastNav < currentCooldown) return;
    lastNav = now;

    if (dir === 'next') {
      if (activeIndex < cards.length - 1) {
        activeIndex++;
        updateDeckLayout();
      } else {
        // Estamos en Guanta y empujan hacia abajo → salir hacia experiences
        exitDeck('down');
      }
    } else {
      if (activeIndex > 0) {
        activeIndex--;
        updateDeckLayout();
      } else {
        // Estamos en Mochima y empujan hacia arriba → salir hacia intro
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

  // ─── Click en tarjetas ──────────────────────────────────────────────────────
  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      if (index === activeIndex) {
        const route = card.getAttribute('data-route');
        const activeCardId = `card-${destinationData[activeIndex].name.toLowerCase()}`;
        if (window.routerNavigate) {
          window.routerNavigate(route, activeCardId);
        } else {
          window.location.hash = `#${route}`;
        }
      } else {
        e.preventDefault();
        e.stopPropagation();
        activeIndex = index;
        updateDeckLayout();
      }
    });
  });

  // ─── Wheel (desktop) ────────────────────────────────────────────────────────
  const wheelHandler = (e) => {
    if (!isScrollLockActive) return; // Permitir scroll nativo hasta que esté acoplado en fullscreen
    e.preventDefault();
    const now = Date.now();
    if (now - lastNav < COOLDOWN) return;
    navigate(e.deltaY > 0 ? 'next' : 'prev');
  };
  window.addEventListener('wheel', wheelHandler, { passive: false });

  // ─── Touch (móvil) ──────────────────────────────────────────────────────────
  let touchStartY = 0;
  let touchIsActive = false;

  const touchStartHandler = (e) => {
    if (!isScrollLockActive) return; // Permitir gestos nativos hasta que esté acoplado en fullscreen
    if (e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
      touchIsActive = true;
    }
  };

  const touchMoveHandler = (e) => {
    if (!isScrollLockActive) return; // Permitir gestos nativos hasta que esté acoplado en fullscreen
    e.preventDefault(); // Bloquear scroll nativo del viewport únicamente cuando esté acoplado

    if (!touchIsActive || e.touches.length !== 1) return;
    const diffY = touchStartY - e.touches[0].clientY;

    if (Math.abs(diffY) > 40) {
      touchIsActive = false; // Consumir gesto
      navigate(diffY > 0 ? 'next' : 'prev', true);
    }
  };

  const touchEndHandler = () => {
    touchIsActive = false;
  };

  window.addEventListener('touchstart', touchStartHandler, { passive: true });
  window.addEventListener('touchmove', touchMoveHandler, { passive: false });
  window.addEventListener('touchend', touchEndHandler, { passive: true });

  // El anclaje duro se realiza mediante overflow: hidden en body/html para evitar jittering

  // ─── IntersectionObserver: animación temprana y bloqueo seguro ─────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const isMobile = window.innerWidth <= 768;

      if (entry.isIntersecting) {
        // Animación temprana de abanico a partir de 30% de visibilidad (tanto en móvil como en desktop)
        if (entry.intersectionRatio >= 0.3) {
          if (canLock) {
            section.classList.add('destinations-visible');
          }

          // En escritorio, bloqueamos a partir del 30% con scrollIntoView suave
          if (!isMobile && canLock && !locked) {
            enableLock();
          }
        }

        // En móvil, esperamos hasta que la sección esté casi completamente en pantalla (ratio >= 0.8)
        // Esto indica que el scroll snap nativo ha terminado de centrar la sección, evitando tirones
        if (isMobile && entry.intersectionRatio >= 0.8) {
          if (canLock && !locked) {
            enableLock();
          }
        }
      } else {
        // Fuera de pantalla: resetear todo y reactivar la posibilidad de bloquear para la próxima entrada
        // Únicamente si no estamos bloqueados activamente, evitando que el momentum scroll rompa el estado
        if (!locked) {
          isScrollLockActive = false;
          canLock = true; // Volver a permitir bloqueo al re-entrar en la sección
          document.body.classList.remove('destinations-locked');
          document.documentElement.classList.remove('destinations-locked');
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          document.documentElement.classList.add('snap-scroll-enabled');
          section.classList.remove('destinations-visible', 'coverflow-ready');
          if (bgOverlay) {
            bgOverlay.dataset.currentBg = "";
          }
        }
      }
    });
  }, { threshold: [0.1, 0.3, 0.8] });

  observer.observe(section);

  // Botón "Ver Detalles" del panel izquierdo
  if (linkEl) {
    linkEl.addEventListener('click', (e) => {
      e.preventDefault();
      const route = linkEl.getAttribute('data-route');
      const activeCardId = `card-${destinationData[activeIndex].name.toLowerCase()}`;
      if (window.routerNavigate) {
        window.routerNavigate(route, activeCardId);
      } else {
        window.location.hash = `#${route}`;
      }
    });
  }

  // Inicializar
  updateDeckLayout();
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
