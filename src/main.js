// Importación de todos los estilos CSS modulares
import './styles/global.css';
import './styles/hero.css';
import './styles/cards.css';
import './styles/detail.css';
import './styles/skeletons.css';
import './styles/awwwards.css';

// Importación de módulos lógicos de JavaScript
import { initInteractions } from './js/interactions.js';
import { initRouter } from './js/router.js';

// Inicialización de la pantalla de carga (Preloader)
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const line = document.getElementById('preloader-line');
  const percentageEl = document.getElementById('preloader-percentage');
  if (!preloader || !line) return;

  let progress = 0;
  let isPageLoaded = false;
  
  // Aumentar el progreso de forma controlada y ultra-elegante
  const interval = setInterval(() => {
    // Si la página ya cargó, avanzamos más rápido a 100%, sino incrementamos de forma constante pero activa
    const step = isPageLoaded ? Math.random() * 16 + 12 : Math.random() * 4 + 2.5;
    progress += step;
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      hidePreloader();
    }
    
    const rounded = Math.round(progress);
    line.style.width = `${rounded}%`;
    if (percentageEl) {
      percentageEl.textContent = String(rounded).padStart(2, '0');
    }
  }, 35);

  const hidePreloader = () => {
    clearInterval(interval);
    line.style.width = '100%';
    if (percentageEl) {
      percentageEl.textContent = '100';
    }
    setTimeout(() => {
      preloader.classList.add('fade-out');
      const video = document.querySelector('.hero-media-container video');
      if (video) {
        video.play().catch(() => {});
      }
      // Pre-cargar imágenes en background para navegación instantánea
      preloadDetailImages();
    }, 450); // Pausa elegante para que el usuario sienta la llegada a 100%
  };

  // Pre-cargar imágenes de detalles
  const preloadDetailImages = () => {
    const imagesToPreload = [
      '/images/mochima.jpg',
      '/images/lecheria.jpg',
      '/images/barcelona.jpg',
      '/images/guanta.jpg'
    ];
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  };

  // Escuchar cuando la página esté lista
  const handleLoad = () => {
    isPageLoaded = true;
  };

  if (document.readyState === 'complete') {
    handleLoad();
  } else {
    window.addEventListener('load', handleLoad);
  }

  // Respaldo de seguridad (máximo 1.2 segundos por si acaso)
  setTimeout(() => {
    isPageLoaded = true;
  }, 1200);
}

// Inicialización de la aplicación al cargar el DOM o inmediatamente si ya cargó
const initApp = () => {
  // Inicializar pantalla de carga primero
  initPreloader();

  // Inicializar componentes interactivos generales
  initInteractions();
  
  // Arrancar el enrutador SPA
  initRouter();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
