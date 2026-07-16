import { initScrollEffects } from './scroll.js';
import { initDestinationsDeck, initCardImageLoaders } from './interactions.js';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Base de datos de contenido turístico (Anzoátegui)
const DESTINATIONS = {
  mochima: {
    title: 'Mochima',
    category: 'Parque Nacional',
    image: '/images/mochima.jpg',
    intro: 'El <strong>Parque Nacional Mochima</strong> es un santuario marino compartido entre Anzoátegui y Sucre. Sus aguas cristalinas de tonalidades turquesa, arenas blancas y archipiélagos vírgenes ofrecen un refugio inigualable para la vida marina, incluyendo delfines y corales exóticos. Es un paraíso para el snorkel, el buceo y la desconexión total.',
    info: {
      temp: '27°C - 31°C',
      actividades: 'Buceo, Kayak, Velerismo',
      acceso: 'Lancha (Pto. La Cruz / Guanta)',
      mejorEpoca: 'Todo el año'
    },
    highlights: [
      {
        title: 'Isla de Plata',
        desc: 'Una de las playas más famosas de aguas tranquilas y arena dorada, ideal para ir en familia y degustar pescado fresco a la orilla del mar.',
        experience: 'Aventura'
      },
      {
        title: 'Las Chimanas',
        desc: 'Un conjunto de islas ideales para el fondeo de embarcaciones y el avistamiento de arrecifes coralinos vírgenes mediante snorkel.',
        experience: 'Aventura'
      },
      {
        title: 'Avistamiento de Delfines',
        desc: 'Durante los trayectos en lancha hacia las islas exteriores, es sumamente común ser escoltados por manadas de delfines que juegan con el oleaje.',
        experience: 'Naturaleza'
      }
    ]
  },
  lecheria: {
    title: 'Lechería',
    category: 'Ciudad Turística',
    image: '/images/lecheria.jpg',
    intro: '<strong>Lechería</strong> es la cara moderna de Anzoátegui. Famosa por su complejo turístico de canales navegables que asemeja una Venecia tropical, es el epicentro gastronómico, comercial y residencial del estado. Custodiada por el Cerro El Morro, ofrece atardeceres de ensueño, playas activas para el kitesurf y una vibrante vida nocturna.',
    info: {
      temp: '26°C - 32°C',
      actividades: 'Kitesurf, Yates, Gastronomía',
      acceso: 'Terrestre (Automóvil)',
      mejorEpoca: 'Diciembre a Mayo'
    },
    highlights: [
      {
        title: 'Cerro El Morro',
        desc: 'El mirador por excelencia del oriente del país. Ideal para subir a pie o en bicicleta al atardecer y presenciar una panorámica 360 de la bahía.',
        experience: 'Aventura'
      },
      {
        title: 'Canales Navegables',
        desc: 'Un desarrollo urbano único en el continente donde casas de diseño moderno tienen muelles propios, creando un recorrido en bote espectacular.',
        experience: 'Cultura'
      },
      {
        title: 'Playa Lido y Playa Mansa',
        desc: 'Playas urbanas en las que conviven deportistas de windsurf, familias que caminan por el boulevard y una de las puestas de sol más hermosas de Venezuela.',
        experience: 'Citas'
      },
      {
        title: 'Casabar Restaurante',
        desc: 'Cocina fusión de nivel mundial y coctelería premium. Con una atmósfera íntima de luces tenues y música lounge, es el lugar ideal para una cita romántica inolvidable.',
        experience: 'Gastronomía'
      },
      {
        title: 'Tito\'s Restaurant & Club',
        desc: 'Ubicado frente a los canales navegables. Ofrece cortes de carne premium, pescados frescos con técnicas mediterráneas y una terraza espectacular para ver pasar los yates.',
        experience: 'Gastronomía'
      },
      {
        title: 'Sunset Café en Playa Lido',
        desc: 'Un pequeño rincón de madera y luces cálidas en la arena. Perfecto para tomar un capuchino frío, disfrutar de un brunch dominical o ver la puesta de sol en pareja.',
        experience: 'Citas'
      },
      {
        title: 'La Terraza de Mokambo',
        desc: 'Gastronomía de autor internacional con fuerte inspiración italiana. Su terraza al aire libre rodeada de palmeras crea un microclima fresco y elegante.',
        experience: 'Gastronomía'
      }
    ],
    itinerary: [
      { time: '08:00 AM', title: 'Desayuno en el Canal', desc: 'Comienza el día con empanadas de cazón y café guayoyo frente a los canales navegables.' },
      { time: '10:00 AM', title: 'Deportes en Playa Lido', desc: 'Disfruta de las olas o practica kitesurf con los instructores locales en una brisa perfecta.' },
      { time: '05:00 PM', title: 'Atardecer en Cerro El Morro', desc: 'Sube al mirador para contemplar la icónica vista donde el sol se funde con el Mar Caribe.' },
      { time: '08:00 PM', title: 'Cena Gourmet en Casabar', desc: 'Termina el día con una cena romántica y coctelería de autor en una atmósfera exclusiva.' }
    ]
  },
  barcelona: {
    title: 'Barcelona',
    category: 'Casco Histórico',
    image: '/images/barcelona.jpg',
    intro: 'La histórica capital, <strong>Barcelona</strong>, resguarda la herencia colonial de Anzoátegui. Fundada en 1671, sus calles empedradas, iglesias históricas y plazas evocan el pasado independentista del país. Es un paseo cultural obligatorio para quienes desean entender el origen del mestizaje, el arte sacro y la arquitectura neoclásica oriental.',
    info: {
      temp: '25°C - 33°C',
      actividades: 'Historia, Arquitectura, Museos',
      acceso: 'Vía Aérea o Terrestre',
      mejorEpoca: 'Noviembre a Abril'
    },
    highlights: [
      {
        title: 'Plaza Boyacá',
        desc: 'La plaza mayor del centro histórico, rodeada de frondosos árboles coloniales, la majestuosa Catedral de Barcelona y el palacio de gobierno.',
        experience: 'Cultura'
      },
      {
        title: 'Catedral de San Cristóbal',
        desc: 'Templo del siglo XVIII que alberga las reliquias de San Celestino Mártir, un cuerpo momificado que atrae a peregrinos e historiadores.',
        experience: 'Cultura'
      },
      {
        title: 'Casa de la Cultura',
        desc: 'Una casona restaurada donde se exponen muestras del arte local, danzas folclóricas y la rica artesanía típica del estado.',
        experience: 'Cultura'
      }
    ]
  },
  guanta: {
    title: 'Guanta',
    category: 'Belleza Natural',
    image: '/images/guanta.jpg',
    intro: '<strong>Guanta</strong> es el secreto verde de Anzoátegui. Encajonada entre montañas cubiertas de selva y el Mar Caribe, ofrece un contraste único entre la frescura de sus pozas de agua dulce y sus bahías tranquilas. Aquí la selva tropical se encuentra directamente con la playa, creando ecosistemas fascinantes.',
    info: {
      temp: '24°C - 30°C',
      actividades: 'Senderismo, Cascadas, Pesca',
      acceso: 'Terrestre / Lanchas',
      mejorEpoca: 'Junio a Noviembre'
    },
    highlights: [
      {
        title: 'Cascada La Sirena',
        desc: 'Una espectacular caída de agua dulce rodeada de frondosos senderos verdes, perfecta para refrescarse después de una caminata tropical.',
        experience: 'Naturaleza'
      },
      {
        title: 'Playa Conoma y Conomita',
        desc: 'Playas de aguas mansas protegidas por ensenadas boscosas. Su arena rojiza fina contrasta bellamente con el mar verde esmeralda.',
        experience: 'Naturaleza'
      },
      {
        title: 'Las Pozas de Guanta',
        desc: 'Piscinas naturales formadas por el cauce de ríos de montaña, ideales para el ecoturismo y la observación de aves locales.',
        experience: 'Aventura'
      }
    ]
  }
};

// Base de datos de Experiencias Inolvidables
const EXPERIENCES = [
  // AVENTURA
  {
    type: 'aventura',
    category: 'El Morro',
    title: 'Vuelo en Parapente',
    desc: 'Despega desde la cima del cerro El Morro y planea sobre el Caribe para aterrizar directamente en Playa Cangrejo al atardecer.',
    image: '/images/lecheria.jpg'
  },
  {
    type: 'aventura',
    category: 'Mochima',
    title: 'Snorkel en La Piscina',
    desc: 'Sumérgete en una piscina natural de aguas cristalinas en medio del mar, rodeado de corales y peces exóticos.',
    image: '/images/mochima.jpg'
  },
  {
    type: 'aventura',
    category: 'Guanta',
    title: 'Canyoning en las Cuevas',
    desc: 'Explora senderos selváticos, salta a pozos de agua cristalina y haz rápel dentro de cuevas con ríos subterráneos.',
    image: '/images/guanta.jpg'
  },
  {
    type: 'aventura',
    category: 'Mochima',
    title: 'Paseo en Catamarán al Faro',
    desc: 'Alquila un catamarán de diseño para pasar el día fondeado en la bahía de Isla El Faro, con tablas de paddle board privadas.',
    image: '/images/mochima.jpg'
  },

  // GASTRONOMÍA
  {
    type: 'gastronomia',
    category: 'Lechería',
    title: 'Beijing Restaurant',
    desc: 'Degusta la gastronomía asiática de autor más exclusiva de la región en un ambiente sofisticado y de diseño único.',
    image: '/images/lecheria.jpg'
  },
  {
    type: 'gastronomia',
    category: 'Lechería',
    title: '212 Restaurant & Bistro',
    desc: 'Una de las experiencias culinarias más exclusivas y chic de Lechería, con platos fusión y coctelería premium de alto nivel.',
    image: '/images/lecheria.jpg'
  },
  {
    type: 'gastronomia',
    category: 'Paseo Colón',
    title: 'Marisquerías del Ferry',
    desc: 'Disfruta del auténtico pescado frito oriental y cazuelas de mariscos recién capturados a orillas de la bahía.',
    image: '/images/lecheria.jpg'
  },
  {
    type: 'gastronomia',
    category: 'Lechería',
    title: 'Café de Especialidad',
    desc: 'Un recorrido por locales con diseños minimalistas y barismo de alta gama que sirven granos venezolanos seleccionados.',
    image: '/images/lecheria.jpg'
  },
  {
    type: 'gastronomia',
    category: 'Lechería',
    title: 'Rooftops en El Morro',
    desc: 'Disfruta de cocteles de autor inspirados en frutas tropicales con espectaculares vistas de 360° a la bahía de Lechería.',
    image: '/images/lecheria.jpg'
  },

  // HISTORIA
  {
    type: 'historia',
    category: 'El Morro',
    title: 'Fortín de la Magdalena',
    desc: 'Sube a las ruinas del fortín colonial español en el cerro para contemplar el atardecer entre cañones antiguos y acantilados.',
    image: '/images/lecheria.jpg'
  },
  {
    type: 'historia',
    category: 'Barcelona',
    title: 'Ruinas de la Casa Fuerte',
    desc: 'Camina entre las imponentes ruinas neoclásicas del siglo XVIII, donde árboles centenarios crecen entre paredes coloniales.',
    image: '/images/barcelona.jpg'
  },
  {
    type: 'historia',
    category: 'Barcelona',
    title: 'Catedral de Barcelona',
    desc: 'Visita el templo y contempla el santuario de San Celestino, uno de los pocos cuerpos incorruptos de mártires romanos en América.',
    image: '/images/barcelona.jpg'
  },
  {
    type: 'historia',
    category: 'Clarines',
    title: 'Casco Colonial de Clarines',
    desc: 'Recorre calles empedradas de casonas coloridas y visita la majestuosa Iglesia de San Antonio de Padua, joya del barroco.',
    image: '/images/barcelona.jpg'
  },
  {
    type: 'historia',
    category: 'Barcelona',
    title: 'Ermita de El Carmen',
    desc: 'Visita esta mística iglesia construida con una arquitectura gótica simplificada que destaca en el paisaje tropical de la ciudad.',
    image: '/images/barcelona.jpg'
  },

  // NATURALEZA
  {
    type: 'naturaleza',
    category: 'Mochima',
    title: 'Avistamiento de Delfines',
    desc: 'Navega a primera hora de la mañana para acompañar a manadas de delfines silvestres que saltan al lado del bote en mar abierto.',
    image: '/images/mochima.jpg'
  },
  {
    type: 'naturaleza',
    category: 'Boca de Uchire',
    title: 'Flamencos en Laguna de Unare',
    desc: 'Navega en peñero por la laguna de Unare al amanecer para presenciar miles de flamencos teñir el paisaje de color rosa.',
    image: '/images/guanta.jpg'
  },
  {
    type: 'naturaleza',
    category: 'Mochima',
    title: 'Mirador de Isla El Faro',
    desc: 'Camina por el sendero empinado de la isla hasta la cima del faro para lograr la panorámica más espectacular del parque nacional.',
    image: '/images/mochima.jpg'
  },
  {
    type: 'naturaleza',
    category: 'Guanta',
    title: 'Cascada Siete Pisos',
    desc: 'Una caminata de aventura por la selva tropical húmeda que te lleva a descubrir una serie de pozas de agua fría de montaña.',
    image: '/images/guanta.jpg'
  },
  {
    type: 'naturaleza',
    category: 'Mochima',
    title: 'Playa Varadero',
    desc: 'Relájate en una de las playas más escondidas y exclusivas, famosa por sus aguas turquesa mansas, arena fina y calma total.',
    image: '/images/mochima.jpg'
  }
];

// Plantilla de la Página de Inicio (Home)
function getHomeHTML() {
  return `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-media-container">
        <!-- Intentar reproducir el video, si no existe o falla se muestra el poster -->
        <video autoplay muted loop playsinline preload="auto" poster="/src/assets/hero.png" id="hero-video">
          <source src="/src/assets/videos/hero-el-morro.mp4" type="video/mp4">
        </video>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-text-container">
        <div class="hero-title-wrapper">
          <h1 class="hero-title">Anzoátegui</h1>
        </div>
        <p class="hero-subtitle">Tierra de Gracia y Sol</p>
      </div>
      <div class="hero-scroll-indicator">
        <span class="scroll-text">Desliza</span>
        <div class="scroll-line-container">
          <div class="scroll-line-active"></div>
        </div>
      </div>
    </section>

    <!-- Intro Section -->
    <section class="intro-section">
      <div class="intro-content">
        <span class="section-label reveal-fade-up">Bienvenidos</span>
        <h2 class="intro-lead reveal-container">
          <span class="reveal-text">Un destino de contrastes infinitos.</span>
        </h2>
        <p class="intro-body reveal-fade-up delay-1">
          Desde las bahías cristalinas de Mochima hasta el dinamismo urbano de Lechería, pasando por la memoria colonial de Barcelona y las cascadas ocultas de Guanta. Anzoátegui te ofrece una conjunción inigualable de naturaleza, cultura e innovación.
        </p>
      </div>
      <div class="intro-side-widget reveal-fade-up delay-2">
        <div class="widget-coordinates">
          <span>Lat: 10.1347° N</span>
          <span>Long: 64.6864° W</span>
        </div>
        <div class="widget-stamp">
          <svg viewBox="0 0 100 100" class="rotating-badge">
            <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
            <text fill="var(--text-primary)">
              <textPath href="#circlePath">ANZOÁTEGUI TE ENAMORA • ANZOÁTEGUI •</textPath>
            </text>
          </svg>
          <div class="stamp-icon">☀️</div>
        </div>
        <div class="widget-data">
          <span class="data-num">325</span>
          <span class="data-label">Días de Sol al Año</span>
        </div>
      </div>
    </section>

    <!-- Marquesina Deslizante Estilo Awwwards -->
    <div class="awwwards-marquee">
      <div class="marquee-track">
        <span>LECHERÍA • MOCHIMA • BARCELONA • GUANTA • VENEZUELA • LECHERÍA • MOCHIMA • BARCELONA • GUANTA • VENEZUELA • </span>
        <span>LECHERÍA • MOCHIMA • BARCELONA • GUANTA • VENEZUELA • LECHERÍA • MOCHIMA • BARCELONA • GUANTA • VENEZUELA • </span>
      </div>
    </div>

    <!-- Destacados / Carrusel Asimétrico -->
    <section class="destinations-section">
      <div class="destinations-bg-overlay"></div>
      
      <div class="destinations-layout-container">
        <!-- Panel de Información de Destinos Izquierda -->
        <div class="destinations-info-panel reveal-fade-up">
          <div class="section-header">
            <span class="section-label">Explorar</span>
            <h2 class="section-title">Destinos</h2>
          </div>
          
          <div class="active-destination-info">
            <h3 class="active-dest-name" id="active-dest-name">Mochima</h3>
            <p class="active-dest-desc" id="active-dest-desc">Un paraíso de islas vírgenes, arenas doradas y delfines jugueteando en aguas cristalinas. El destino preferido para el buceo en el Caribe.</p>
          </div>
          
          <!-- Controles / Indicador de Deck -->
          <div class="deck-controls">
            <div class="deck-dots" id="deck-dots">
              <span class="deck-dot active" data-index="0"></span>
              <span class="deck-dot" data-index="1"></span>
              <span class="deck-dot" data-index="2"></span>
              <span class="deck-dot" data-index="3"></span>
            </div>
          </div>
        </div>

        <!-- El Deck 3D de Tarjetas Derecha -->
        <div class="destinations-deck-wrapper">
          <div class="destinations-deck-container" id="destinations-deck">
            <!-- Card 1: Mochima -->
            <div class="editorial-card card-mochima" data-index="0" data-route="/mochima" id="card-mochima">
              <div class="card-media">
                <img src="${DESTINATIONS.mochima.image}" alt="Mochima" onerror="this.style.opacity='0';" />
              </div>
              <div class="card-overlay"></div>
              <div class="card-content">
                <span class="card-category">Parque Nacional</span>
                <h4 class="card-title">Mochima</h4>
              </div>
            </div>

            <!-- Card 2: Lechería -->
            <div class="editorial-card card-lecheria" data-index="1" data-route="/lecheria" id="card-lecheria">
              <div class="card-media">
                <img src="${DESTINATIONS.lecheria.image}" alt="Lechería" onerror="this.style.opacity='0';" />
              </div>
              <div class="card-overlay"></div>
              <div class="card-content">
                <span class="card-category">Ciudad & Playa</span>
                <h4 class="card-title">Lechería</h4>
              </div>
            </div>

            <!-- Card 3: Barcelona -->
            <div class="editorial-card card-barcelona" data-index="2" data-route="/barcelona" id="card-barcelona">
              <div class="card-media">
                <img src="${DESTINATIONS.barcelona.image}" alt="Barcelona" onerror="this.style.opacity='0';" />
              </div>
              <div class="card-overlay"></div>
              <div class="card-content">
                <span class="card-category">Historia & Cultura</span>
                <h4 class="card-title">Barcelona</h4>
              </div>
            </div>

            <!-- Card 4: Guanta -->
            <div class="editorial-card card-guanta" data-index="3" data-route="/guanta" id="card-guanta">
              <div class="card-media">
                <img src="${DESTINATIONS.guanta.image}" alt="Guanta" onerror="this.style.opacity='0';" />
              </div>
              <div class="card-overlay"></div>
              <div class="card-content">
                <span class="card-category">Naturaleza & Cascadas</span>
                <h4 class="card-title">Guanta</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Experiencias / Qué Hacer (Estilo original visit singapore) -->
    <section class="experiences-section">
      <div class="section-header reveal-fade-up">
        <span class="section-label">Imperdibles</span>
        <h2 class="section-title">Experiencias inolvidables</h2>
      </div>

      <!-- Botones de las Etiquetas (Categorías) Bien Bonitos -->
      <div class="experience-category-buttons-grid reveal-fade-up delay-1">
        <button class="category-btn" data-filter="aventura">
          <div class="category-btn-icon">⛵</div>
          <div class="category-btn-content">
            <span class="category-btn-title">Aventura</span>
            <span class="category-btn-desc">Kayak, snorkel y paseos</span>
          </div>
        </button>

        <button class="category-btn" data-filter="gastronomia">
          <div class="category-btn-icon">🍽️</div>
          <div class="category-btn-content">
            <span class="category-btn-title">Gastronomía</span>
            <span class="category-btn-desc">Restaurantes y sabores locales</span>
          </div>
        </button>

        <button class="category-btn" data-filter="historia">
          <div class="category-btn-icon">🏛️</div>
          <div class="category-btn-content">
            <span class="category-btn-title">Historia</span>
            <span class="category-btn-desc">Casco colonial y templos</span>
          </div>
        </button>

        <button class="category-btn" data-filter="naturaleza">
          <div class="category-btn-icon">🌴</div>
          <div class="category-btn-content">
            <span class="category-btn-title">Naturaleza</span>
            <span class="category-btn-desc">Playas, delfines y cascadas</span>
          </div>
        </button>
      </div>

      <div class="experiences-grid">
        ${EXPERIENCES.map((exp, index) => `
          <div class="experience-item-card reveal-fade-up ${index % 4 !== 0 ? 'delay-' + (index % 4) : ''}" data-activity-type="${exp.type}">
            <div class="exp-card-image">
              <img src="${exp.image}" alt="${exp.title}" loading="lazy" />
              <button class="exp-badge-btn" data-filter="${exp.type}">${exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}</button>
            </div>
            <div class="exp-card-info">
              <span class="exp-category">${exp.category}</span>
              <h3 class="exp-card-title">${exp.title}</h3>
              <p class="exp-card-desc">${exp.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// Plantilla de la Página de Detalles
function getDetailHTML(key) {
  const data = DESTINATIONS[key];
  if (!data) return '<div style="padding: 100px; text-align: center;">Destino no encontrado</div>';

  const uniqueExperiences = [...new Set(data.highlights.map(h => h.experience).filter(Boolean))];

  return `
    <div class="detail-view" id="detail-view-${key}">
      <!-- Detail Hero Banner -->
      <section class="detail-hero" id="detail-hero-media">
        <img class="detail-hero-media" src="${data.image}" alt="${data.title}" />
        <div class="detail-hero-overlay"></div>
        <div class="detail-hero-title-container">
          <span class="detail-category">${data.category}</span>
          <h1 class="detail-title" id="detail-hero-title">${data.title}</h1>
        </div>
      </section>

      <!-- Detalle de Información -->
      <div class="detail-body">
        <p class="detail-intro">${data.intro}</p>

        <!-- Ficha Técnica -->
        <div class="info-grid">
          <div class="info-box">
            <span class="info-label">Temperatura</span>
            <span class="info-value">${data.info.temp}</span>
          </div>
          <div class="info-box">
            <span class="info-label">Actividades</span>
            <span class="info-value" style="font-size: 0.95rem;">${data.info.actividades}</span>
          </div>
          <div class="info-box">
            <span class="info-label">Tipo de Acceso</span>
            <span class="info-value" style="font-size: 0.95rem;">${data.info.acceso}</span>
          </div>
          <div class="info-box">
            <span class="info-label">Mejor Temporada</span>
            <span class="info-value">${data.info.mejorEpoca}</span>
          </div>
        </div>

        <!-- Filtro de Experiencias -->
        <div class="experience-filter-container">
          <button class="filter-pill active" data-filter="all">Todo</button>
          ${uniqueExperiences.map(exp => `
            <button class="filter-pill" data-filter="${exp}">${exp}</button>
          `).join('')}
        </div>

        <!-- Imperdibles / Highlights -->
        <div class="highlights-section">
          <div class="highlights-grid">
            ${data.highlights.map(h => `
              <div class="highlight-item" data-experience="${h.experience}">
                <span class="highlight-exp-tag">${h.experience}</span>
                <h3 class="highlight-title">${h.title}</h3>
                <p class="highlight-desc">${h.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Itinerario de Un Día Perfecto -->
        ${data.itinerary ? `
          <div class="itinerary-section">
            <span class="section-label">Itinerario</span>
            <h2 class="itinerary-title">Un Día Perfecto</h2>
            <div class="timeline-container">
              ${data.itinerary.map(item => `
                <div class="timeline-item">
                  <div class="timeline-time">${item.time}</div>
                  <div class="timeline-badge"></div>
                  <div class="timeline-content">
                    <h4 class="timeline-title">${item.title}</h4>
                    <p class="timeline-desc">${item.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

// Router SPA Principal
export function initRouter() {
  const app = document.getElementById('app');

  // Exponer para interacción directa desde componentes externos
  window.routerNavigate = navigate;

  const routes = {
    '/': { render: () => getHomeHTML(), title: 'Anzoátegui Te Enamora' },
    '/mochima': { render: () => getDetailHTML('mochima'), title: 'Mochima | Anzoátegui Te Enamora' },
    '/lecheria': { render: () => getDetailHTML('lecheria'), title: 'Lechería | Anzoátegui Te Enamora' },
    '/barcelona': { render: () => getDetailHTML('barcelona'), title: 'Barcelona | Anzoátegui Te Enamora' },
    '/guanta': { render: () => getDetailHTML('guanta'), title: 'Guanta | Anzoátegui Te Enamora' }
  };

  let isInitialLoad = true;

  // Función de navegación con View Transitions
  async function navigate(path, clickedCardId = null) {
    const route = routes[path] || routes['/'];
    

    if (window.unlockDestinationsDeck) {
      window.unlockDestinationsDeck();
    }
    document.documentElement.classList.remove('destinations-locked');
    document.body.classList.remove('destinations-locked');

    // Habilitar snap scroll únicamente en la Home (/)
    if (path === '/') {
      document.documentElement.classList.add('snap-scroll-enabled');
    } else {
      document.documentElement.classList.remove('snap-scroll-enabled');
    }

    // Controlar visibilidad del logo y el botón volver en la cabecera
    const logoLink = document.getElementById('logo-link');
    const headerBackBtn = document.getElementById('header-back-btn');
    if (path === '/') {
      if (logoLink) logoLink.classList.remove('hidden');
      if (headerBackBtn) headerBackBtn.classList.add('hidden');
    } else {
      if (logoLink) logoLink.classList.add('hidden');
      if (headerBackBtn) headerBackBtn.classList.remove('hidden');
    }

    // Si es la carga inicial, inyectamos directamente sin View Transitions
    if (isInitialLoad) {
      isInitialLoad = false;
      app.innerHTML = route.render();
      document.title = route.title;
      bindDynamicEvents();
    } else if (document.startViewTransition) {
      // 1. Asignar view-transition-name a los elementos origen
      let sourceImage = null;
      let sourceTitle = null;

      if (clickedCardId) {
        const card = document.getElementById(clickedCardId);
        if (card) {
          sourceImage = card.querySelector('.card-media img');
          sourceTitle = card.querySelector('.card-title');
          
          if (sourceImage) sourceImage.style.viewTransitionName = 'shared-hero-media';
          if (sourceTitle) sourceTitle.style.viewTransitionName = 'shared-hero-title';
        }
      }

      // 2. Iniciar la transición nativa
      const transition = document.startViewTransition(() => {
        app.innerHTML = route.render();
        document.title = route.title;
        
        // Quitar la clase de snap scroll y resetear posición del scroll instantáneamente
        document.documentElement.classList.remove('snap-scroll-enabled');
        window.scrollTo(0, 0);
        
        // 3. Asignar view-transition-name a los elementos destino
        const destImage = document.querySelector('.detail-hero-media');
        const destTitle = document.getElementById('detail-hero-title');
        
        if (destImage) destImage.style.viewTransitionName = 'shared-hero-media';
        if (destTitle) destTitle.style.viewTransitionName = 'shared-hero-title';

        // Re-enlazar eventos dinámicos en la nueva página
        bindDynamicEvents();
      });

      // 4. Limpiar los nombres de transición una vez completado
      await transition.finished;
      if (sourceImage) sourceImage.style.viewTransitionName = '';
      if (sourceTitle) sourceTitle.style.viewTransitionName = '';
      
      const destImage = document.querySelector('.detail-hero-media');
      const destTitle = document.getElementById('detail-hero-title');
      if (destImage) destImage.style.viewTransitionName = '';
      if (destTitle) destTitle.style.viewTransitionName = '';
      
    } else {
      // Fallback para navegadores antiguos
      app.innerHTML = route.render();
      document.title = route.title;
      window.scrollTo(0, 0);
      bindDynamicEvents();
    }

    // Actualizar historial de navegación
    if (window.location.pathname !== path) {
      window.history.pushState({ path }, '', path);
    }
  }

  // Enlazar eventos dinámicos que se destruyen con la recarga del DOM en #app
  function bindDynamicEvents() {
    // 1. Capturar clicks en tarjetas editoriales de la página de inicio
    // IMPORTANTE: Solo navegamos a detalle si el click es en la tarjeta ACTIVA (.active-card).
    // Los clicks en tarjetas no-activas son manejados internamente por interactions.js para
    // cambiar la tarjeta activa del deck, sin navegar a otra página.
    const cards = document.querySelectorAll('.editorial-card');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (!card.classList.contains('active-card')) return; // Dejar que interactions.js lo maneje
        e.preventDefault();
        const route = card.getAttribute('data-route');
        if (route) navigate(route, card.id);
      });
    });

    // 2. Controlar Filtros de Experiencias en Detalles
    const filterPills = document.querySelectorAll('.filter-pill');
    const highlightItems = document.querySelectorAll('.highlight-item');

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        // Remover clase activa de otros pills
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.getAttribute('data-filter');

        highlightItems.forEach(item => {
          const itemExp = item.getAttribute('data-experience');
          if (filter === 'all' || itemExp === filter) {
            item.classList.remove('hidden-filter');
          } else {
            item.classList.add('hidden-filter');
          }
        });
      });
    });

    // 3. Controlar Filtros de Actividades en el Inicio con los nuevos Botones de Categorías
    const categoryBtns = document.querySelectorAll('.category-btn');
    const actCards = document.querySelectorAll('.experience-item-card');

    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Alternar clase active en los botones
        categoryBtns.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        actCards.forEach(card => {
          const type = card.getAttribute('data-activity-type');
          if (filter === 'all' || type === filter) {
            card.classList.remove('hidden-activity');
          } else {
            card.classList.add('hidden-activity');
          }
        });

        // Hacer scroll suave hacia las tarjetas filtradas en la parte inferior
        const grid = document.querySelector('.experiences-grid');
        if (grid) {
          grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // 4. Controlar Filtros de Actividades al pulsar los botones de etiquetas en las tarjetas
    const expBadgeBtns = document.querySelectorAll('.exp-badge-btn');
    expBadgeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const filterVal = btn.getAttribute('data-filter');
        const matchingBtn = Array.from(categoryBtns).find(cb => cb.getAttribute('data-filter') === filterVal);
        if (matchingBtn) {
          matchingBtn.click();
        }
      });
    });

    // Re-inicializar efectos visuales e IntersectionObservers
    initScrollEffects();
    initDestinationsDeck();
    initCardImageLoaders();
  }

  // Enlazar eventos de elementos estáticos/persistentes una sola vez
  const headerBackBtn = document.getElementById('header-back-btn');
  if (headerBackBtn) {
    headerBackBtn.addEventListener('click', () => {
      const path = window.location.pathname.replace('/', '');
      const cardId = `card-${path}`;

      // Asignar nombres de transición de retorno temporalmente
      const destImage = document.querySelector('.detail-hero-media');
      const destTitle = document.getElementById('detail-hero-title');
      if (destImage) destImage.style.viewTransitionName = 'shared-hero-media';
      if (destTitle) destTitle.style.viewTransitionName = 'shared-hero-title';

      navigate('/', cardId);
    });
  }

  const logoLink = document.getElementById('logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigate('/');
    });
  }

  // Escuchar botón de atrás/adelante del navegador
  window.addEventListener('popstate', () => {
    navigate(window.location.pathname);
  });

  // Ejecución inicial al cargar la web
  navigate(window.location.pathname);
}
