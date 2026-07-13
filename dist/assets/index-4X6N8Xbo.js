(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){let e=document.getElementById(`touch-indicator`);if(e){let t=!1;window.addEventListener(`pointermove`,n=>{t||=(e.classList.add(`active`),!0),e.style.left=`${n.clientX}px`,e.style.top=`${n.clientY}px`},{passive:!0}),window.addEventListener(`pointerdown`,()=>{e.classList.add(`pressed`)}),window.addEventListener(`pointerup`,()=>{e.classList.remove(`pressed`)}),document.addEventListener(`pointerleave`,()=>{e.classList.remove(`active`),t=!1})}t(),n()}function t(){let e=document.getElementById(`destinations-deck`);if(!e)return;let t=e.querySelectorAll(`.editorial-card`),n=document.getElementById(`active-dest-name`),r=document.getElementById(`active-dest-desc`),i=document.getElementById(`active-dest-link`),a=document.querySelectorAll(`.deck-dot`),o=document.querySelector(`.destinations-bg-overlay`),s=[{name:`Mochima`,desc:`Un paraíso de islas vírgenes, arenas doradas y delfines jugueteando en aguas cristalinas. El destino preferido para el buceo y snorkeling en el Caribe.`,route:`/mochima`},{name:`Lechería`,desc:`Fusión perfecta de modernidad y playa. Disfruta de atardeceres dorados en el Cerro El Morro, sus canales navegables y una gastronomía de clase mundial.`,route:`/lecheria`},{name:`Barcelona`,desc:`Viaja en el tiempo recorriendo el centro histórico de la época colonial. La Casa Amarilla y la Catedral te sumergen en las raíces culturales de Anzoátegui.`,route:`/barcelona`},{name:`Guanta`,desc:`Rodeada de imponentes montañas y selva tropical. Sus increíbles saltos de agua dulce, cascadas y playas escondidas ofrecen aventura y ecoturismo puro.`,route:`/guanta`}],c=0,l=!1,u=!1,d=!1,f=!0,p=null,m=null,h=null,g=document.querySelector(`.destinations-section`);if(!g)return;window.unlockDestinationsDeck=()=>{u=!1,d=!1,f=!0,clearTimeout(p),clearTimeout(m),clearTimeout(h),window.innerWidth>768?(document.body.classList.remove(`destinations-locked`),document.documentElement.classList.remove(`destinations-locked`),document.body.style.overflow=``,document.documentElement.style.overflow=``,document.documentElement.classList.add(`snap-scroll-enabled`)):g.classList.remove(`destinations-locked-touch`)};let _=()=>{u||!f||(u=!0,d=!1,o&&(o.dataset.currentBg=``),c=0,b(),g.scrollIntoView({behavior:`smooth`,block:`start`}),clearTimeout(p),clearTimeout(m),clearTimeout(h),p=setTimeout(()=>{u&&g.classList.add(`destinations-visible`)},200),m=setTimeout(()=>{u&&(d=!0,g.scrollIntoView({behavior:`auto`,block:`start`}),window.innerWidth>768?(document.body.classList.add(`destinations-locked`),document.documentElement.classList.add(`destinations-locked`),document.documentElement.classList.remove(`snap-scroll-enabled`),document.body.style.overflow=`hidden`,document.documentElement.style.overflow=`hidden`):g.classList.add(`destinations-locked-touch`))},600),h=setTimeout(()=>{u&&g.classList.add(`coverflow-ready`)},1700))},v=e=>{if(u=!1,d=!1,f=!1,clearTimeout(p),clearTimeout(m),clearTimeout(h),window.innerWidth>768?(document.body.classList.remove(`destinations-locked`),document.documentElement.classList.remove(`destinations-locked`),document.body.style.overflow=``,document.documentElement.style.overflow=``,document.documentElement.classList.add(`snap-scroll-enabled`)):g.classList.remove(`destinations-locked-touch`),g.classList.remove(`destinations-visible`,`coverflow-ready`),o&&(o.dataset.currentBg=``),setTimeout(()=>{f=!0},1500),e===`up`){let e=document.querySelector(`.intro-section`);e&&e.scrollIntoView({behavior:`smooth`,block:`start`})}else{let e=document.querySelector(`.experiences-section`);e&&e.scrollIntoView({behavior:`smooth`,block:`start`})}},y=()=>{let e=document.getElementById(`liquid-displacement`);if(!e)return;let t=null,n=r=>{t||=r;let i=Math.min((r-t)/1200,1);e.setAttribute(`scale`,Math.sin(i*Math.PI)*90),i<1?requestAnimationFrame(n):e.setAttribute(`scale`,0)};requestAnimationFrame(n)},b=()=>{if(l=!0,t.forEach((e,t)=>{e.classList.remove(`active-card`,`prev-card`,`next-card`);let n=t-c;if(e.style.transform=``,e.style.opacity=``,n===0)e.classList.add(`active-card`),e.style.setProperty(`--translateX`,`0px`),e.style.setProperty(`--translateY`,`0px`),e.style.setProperty(`--translateZ`,`15px`),e.style.setProperty(`--scale`,`1.02`),e.style.setProperty(`--tilt`,`0deg`),e.style.setProperty(`--card-opacity`,`1`),e.style.zIndex=`10`,e.style.pointerEvents=`auto`;else if(n<0)e.classList.add(`prev-card`),e.style.setProperty(`--translateX`,`-25%`),e.style.setProperty(`--translateY`,`-115%`),e.style.setProperty(`--translateZ`,`80px`),e.style.setProperty(`--scale`,`0.85`),e.style.setProperty(`--tilt`,`-12deg`),e.style.setProperty(`--card-opacity`,`0`),e.style.zIndex=`9`,e.style.pointerEvents=`none`;else{e.classList.add(`next-card`);let t=n*28,r=1-n*.07,i=-n*110,a=n*2;e.style.setProperty(`--translateX`,`0px`),e.style.setProperty(`--translateY`,`${t}px`),e.style.setProperty(`--translateZ`,`${i}px`),e.style.setProperty(`--scale`,`${r}`),e.style.setProperty(`--tilt`,`${a}deg`),e.style.setProperty(`--card-opacity`,n===1?`0.9`:n===2?`0.65`:`0.3`),e.style.zIndex=`${10-n}`,e.style.pointerEvents=`none`}}),n&&r&&i){let e=s[c];n.innerHTML=``,e.name.split(``).forEach(e=>{let t=document.createElement(`span`);t.className=`split-char`,t.innerHTML=e===` `?`&nbsp;`:e,n.appendChild(t)}),r.style.opacity=`0`,i.style.opacity=`0`,setTimeout(()=>{n.querySelectorAll(`.split-char`).forEach((e,t)=>{setTimeout(()=>e.classList.add(`reveal`),t*40)})},50),setTimeout(()=>{r.textContent=e.desc,i.setAttribute(`data-route`,e.route),r.style.opacity=`1`,i.style.opacity=`1`,l=!1},280)}else l=!1;if(a.forEach((e,t)=>e.classList.toggle(`active`,t===c)),o){let e=t[c].querySelector(`.card-media img`);if(e){let t=()=>{let t=e.src||e.getAttribute(`src`);t&&o.dataset.currentBg!==t&&(y(),o.style.backgroundImage=`url('${t}')`,o.dataset.currentBg=t)};t(),e.addEventListener(`load`,t,{once:!0})}}},x=0,S=(e,n=!1)=>{let r=Date.now(),i=n?300:750;l||r-x<i||(x=r,e===`next`?c<t.length-1?(c++,b()):v(`down`):c>0?(c--,b()):v(`up`))};a.forEach((e,t)=>{e.addEventListener(`click`,()=>{l||t===c||(c=t,b())})}),t.forEach((e,t)=>{e.addEventListener(`click`,n=>{if(t===c){let t=e.getAttribute(`data-route`),n=`card-${s[c].name.toLowerCase()}`;window.routerNavigate?window.routerNavigate(t,n):window.location.hash=`#${t}`}else n.preventDefault(),n.stopPropagation(),c=t,b()})}),window.addEventListener(`wheel`,e=>{d&&(e.preventDefault(),!(Date.now()-x<750)&&S(e.deltaY>0?`next`:`prev`))},{passive:!1});let C=0,w=!1;window.addEventListener(`touchstart`,e=>{d&&e.touches.length===1&&(C=e.touches[0].clientY,w=!0)},{passive:!0}),window.addEventListener(`touchmove`,e=>{if(!d||(e.preventDefault(),!w||e.touches.length!==1))return;let t=C-e.touches[0].clientY;Math.abs(t)>40&&(w=!1,S(t>0?`next`:`prev`,!0))},{passive:!1}),window.addEventListener(`touchend`,()=>{w=!1},{passive:!0}),new IntersectionObserver(e=>{e.forEach(e=>{let t=window.innerWidth<=768;e.isIntersecting?(e.intersectionRatio>=.3&&(f&&g.classList.add(`destinations-visible`),!t&&f&&!u&&_()),t&&e.intersectionRatio>=.8&&f&&!u&&_()):d||(u=!1,f=!0,clearTimeout(p),clearTimeout(m),clearTimeout(h),window.innerWidth>768?(document.body.classList.remove(`destinations-locked`),document.documentElement.classList.remove(`destinations-locked`),document.body.style.overflow=``,document.documentElement.style.overflow=``,document.documentElement.classList.add(`snap-scroll-enabled`)):g.classList.remove(`destinations-locked-touch`),g.classList.remove(`destinations-visible`,`coverflow-ready`),o&&(o.dataset.currentBg=``))})},{threshold:[.1,.3,.8]}).observe(g),i&&i.addEventListener(`click`,e=>{e.preventDefault();let t=i.getAttribute(`data-route`),n=`card-${s[c].name.toLowerCase()}`;window.routerNavigate?window.routerNavigate(t,n):window.location.hash=`#${t}`}),b()}function n(){document.querySelectorAll(`.editorial-card`).forEach(e=>{let t=e.querySelector(`.card-media img`);if(!t)return;let n=()=>{e.classList.add(`media-loaded`)};t.complete?n():t.addEventListener(`load`,n)})}function r(){let e=()=>{let e=document.querySelector(`.main-header`);e&&(window.scrollY>50?e.classList.add(`scrolled`):e.classList.remove(`scrolled`))},t=new IntersectionObserver((e,t)=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`revealed`),t.unobserve(e.target))})},{threshold:.15,rootMargin:`0px 0px -50px 0px`});document.querySelectorAll(`.reveal-container, .reveal-fade-up`).forEach(e=>{t.observe(e)});let n=()=>{let e=document.querySelector(`.hero-section`),t=document.querySelector(`.hero-media-container`),n=document.querySelector(`.hero-text-container`),r=document.querySelector(`.hero-scroll-indicator`);if(!e)return;let i=window.scrollY,a=e.clientHeight;if(i<=a){let e=i/(a||1);t&&(t.style.transform=`translateY(${e*12}%) scale(${1+e*.03})`),n&&(n.style.opacity=`${1-e*1.5}`,n.style.transform=`translateY(${e*80}px)`),r&&(r.style.opacity=`${1-e*3}`)}},r=!1;window.scrollListenerBound||(window.addEventListener(`scroll`,()=>{e(),r||=(window.requestAnimationFrame(()=>{n(),r=!1}),!0)},{passive:!0}),window.scrollListenerBound=!0),e(),n()}`scrollRestoration`in history&&(history.scrollRestoration=`manual`);var i={mochima:{title:`Mochima`,category:`Parque Nacional`,image:`/src/assets/images/mochima.webp`,intro:`El <strong>Parque Nacional Mochima</strong> es un santuario marino compartido entre Anzoátegui y Sucre. Sus aguas cristalinas de tonalidades turquesa, arenas blancas y archipiélagos vírgenes ofrecen un refugio inigualable para la vida marina, incluyendo delfines y corales exóticos. Es un paraíso para el snorkel, el buceo y la desconexión total.`,info:{temp:`27°C - 31°C`,actividades:`Buceo, Kayak, Velerismo`,acceso:`Lancha (Pto. La Cruz / Guanta)`,mejorEpoca:`Todo el año`},highlights:[{title:`Isla de Plata`,desc:`Una de las playas más famosas de aguas tranquilas y arena dorada, ideal para ir en familia y degustar pescado fresco a la orilla del mar.`,experience:`Aventura`},{title:`Las Chimanas`,desc:`Un conjunto de islas ideales para el fondeo de embarcaciones y el avistamiento de arrecifes coralinos vírgenes mediante snorkel.`,experience:`Aventura`},{title:`Avistamiento de Delfines`,desc:`Durante los trayectos en lancha hacia las islas exteriores, es sumamente común ser escoltados por manadas de delfines que juegan con el oleaje.`,experience:`Naturaleza`}]},lecheria:{title:`Lechería`,category:`Ciudad Turística`,image:`/src/assets/images/lecheria.png`,intro:`<strong>Lechería</strong> es la cara moderna de Anzoátegui. Famosa por su complejo turístico de canales navegables que asemeja una Venecia tropical, es el epicentro gastronómico, comercial y residencial del estado. Custodiada por el Cerro El Morro, ofrece atardeceres de ensueño, playas activas para el kitesurf y una vibrante vida nocturna.`,info:{temp:`26°C - 32°C`,actividades:`Kitesurf, Yates, Gastronomía`,acceso:`Terrestre (Automóvil)`,mejorEpoca:`Diciembre a Mayo`},highlights:[{title:`Cerro El Morro`,desc:`El mirador por excelencia del oriente del país. Ideal para subir a pie o en bicicleta al atardecer y presenciar una panorámica 360 de la bahía.`,experience:`Aventura`},{title:`Canales Navegables`,desc:`Un desarrollo urbano único en el continente donde casas de diseño moderno tienen muelles propios, creando un recorrido en bote espectacular.`,experience:`Cultura`},{title:`Playa Lido y Playa Mansa`,desc:`Playas urbanas en las que conviven deportistas de windsurf, familias que caminan por el boulevard y una de las puestas de sol más hermosas de Venezuela.`,experience:`Citas`},{title:`Casabar Restaurante`,desc:`Cocina fusión de nivel mundial y coctelería premium. Con una atmósfera íntima de luces tenues y música lounge, es el lugar ideal para una cita romántica inolvidable.`,experience:`Gastronomía`},{title:`Tito's Restaurant & Club`,desc:`Ubicado frente a los canales navegables. Ofrece cortes de carne premium, pescados frescos con técnicas mediterráneas y una terraza espectacular para ver pasar los yates.`,experience:`Gastronomía`},{title:`Sunset Café en Playa Lido`,desc:`Un pequeño rincón de madera y luces cálidas en la arena. Perfecto para tomar un capuchino frío, disfrutar de un brunch dominical o ver la puesta de sol en pareja.`,experience:`Citas`},{title:`La Terraza de Mokambo`,desc:`Gastronomía de autor internacional con fuerte inspiración italiana. Su terraza al aire libre rodeada de palmeras crea un microclima fresco y elegante.`,experience:`Gastronomía`}],itinerary:[{time:`08:00 AM`,title:`Desayuno en el Canal`,desc:`Comienza el día con empanadas de cazón y café guayoyo frente a los canales navegables.`},{time:`10:00 AM`,title:`Deportes en Playa Lido`,desc:`Disfruta de las olas o practica kitesurf con los instructores locales en una brisa perfecta.`},{time:`05:00 PM`,title:`Atardecer en Cerro El Morro`,desc:`Sube al mirador para contemplar la icónica vista donde el sol se funde con el Mar Caribe.`},{time:`08:00 PM`,title:`Cena Gourmet en Casabar`,desc:`Termina el día con una cena romántica y coctelería de autor en una atmósfera exclusiva.`}]},barcelona:{title:`Barcelona`,category:`Casco Histórico`,image:`/src/assets/images/barcelona.webp`,intro:`La histórica capital, <strong>Barcelona</strong>, resguarda la herencia colonial de Anzoátegui. Fundada en 1671, sus calles empedradas, iglesias históricas y plazas evocan el pasado independentista del país. Es un paseo cultural obligatorio para quienes desean entender el origen del mestizaje, el arte sacro y la arquitectura neoclásica oriental.`,info:{temp:`25°C - 33°C`,actividades:`Historia, Arquitectura, Museos`,acceso:`Vía Aérea o Terrestre`,mejorEpoca:`Noviembre a Abril`},highlights:[{title:`Plaza Boyacá`,desc:`La plaza mayor del centro histórico, rodeada de frondosos árboles coloniales, la majestuosa Catedral de Barcelona y el palacio de gobierno.`,experience:`Cultura`},{title:`Catedral de San Cristóbal`,desc:`Templo del siglo XVIII que alberga las reliquias de San Celestino Mártir, un cuerpo momificado que atrae a peregrinos e historiadores.`,experience:`Cultura`},{title:`Casa de la Cultura`,desc:`Una casona restaurada donde se exponen muestras del arte local, danzas folclóricas y la rica artesanía típica del estado.`,experience:`Cultura`}]},guanta:{title:`Guanta`,category:`Belleza Natural`,image:`/src/assets/images/guanta.webp`,intro:`<strong>Guanta</strong> es el secreto verde de Anzoátegui. Encajonada entre montañas cubiertas de selva y el Mar Caribe, ofrece un contraste único entre la frescura de sus pozas de agua dulce y sus bahías tranquilas. Aquí la selva tropical se encuentra directamente con la playa, creando ecosistemas fascinantes.`,info:{temp:`24°C - 30°C`,actividades:`Senderismo, Cascadas, Pesca`,acceso:`Terrestre / Lanchas`,mejorEpoca:`Junio a Noviembre`},highlights:[{title:`Cascada La Sirena`,desc:`Una espectacular caída de agua dulce rodeada de frondosos senderos verdes, perfecta para refrescarse después de una caminata tropical.`,experience:`Naturaleza`},{title:`Playa Conoma y Conomita`,desc:`Playas de aguas mansas protegidas por ensenadas boscosas. Su arena rojiza fina contrasta bellamente con el mar verde esmeralda.`,experience:`Naturaleza`},{title:`Las Pozas de Guanta`,desc:`Piscinas naturales formadas por el cauce de ríos de montaña, ideales para el ecoturismo y la observación de aves locales.`,experience:`Aventura`}]}};function a(){return`
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
            <button class="active-dest-link btn-editorial" id="active-dest-link" data-route="/mochima">Ver Detalles</button>
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
                <img src="${i.mochima.image}" alt="Mochima" onerror="this.style.opacity='0';" />
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
                <img src="${i.lecheria.image}" alt="Lechería" onerror="this.style.opacity='0';" />
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
                <img src="${i.barcelona.image}" alt="Barcelona" onerror="this.style.opacity='0';" />
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
                <img src="${i.guanta.image}" alt="Guanta" onerror="this.style.opacity='0';" />
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

      <!-- Filtros Activos estilo Visit Singapore -->
      <div class="activities-filter-pills reveal-fade-up delay-1">
        <button class="act-filter-pill active" data-filter="all">Unique Experiences</button>
        <button class="act-filter-pill" data-filter="aventura">Aventura</button>
        <button class="act-filter-pill" data-filter="gastronomia">Gastronomía</button>
        <button class="act-filter-pill" data-filter="historia">Historia</button>
        <button class="act-filter-pill" data-filter="naturaleza">Naturaleza</button>
      </div>

      <div class="experiences-grid">
        <div class="experience-item-card reveal-fade-up" data-activity-type="aventura">
          <div class="exp-card-image">
            <span class="exp-badge">Lorem</span>
          </div>
          <div class="exp-card-info">
            <span class="exp-category">Lorem Ipsum</span>
            <h3 class="exp-card-title">Lorem Ipsum Dolor</h3>
            <p class="exp-card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus, perferendis.</p>
          </div>
        </div>

        <div class="experience-item-card reveal-fade-up delay-1" data-activity-type="naturaleza">
          <div class="exp-card-image">
            <span class="exp-badge">Lorem</span>
          </div>
          <div class="exp-card-info">
            <span class="exp-category">Lorem Ipsum</span>
            <h3 class="exp-card-title">Lorem Ipsum Dolor</h3>
            <p class="exp-card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus, perferendis.</p>
          </div>
        </div>

        <div class="experience-item-card reveal-fade-up delay-2" data-activity-type="gastronomia">
          <div class="exp-card-image">
            <span class="exp-badge">Lorem</span>
          </div>
          <div class="exp-card-info">
            <span class="exp-category">Lorem Ipsum</span>
            <h3 class="exp-card-title">Lorem Ipsum Dolor</h3>
            <p class="exp-card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus, perferendis.</p>
          </div>
        </div>

        <div class="experience-item-card reveal-fade-up delay-3" data-activity-type="historia">
          <div class="exp-card-image">
            <span class="exp-badge">Lorem</span>
          </div>
          <div class="exp-card-info">
            <span class="exp-category">Lorem Ipsum</span>
            <h3 class="exp-card-title">Lorem Ipsum Dolor</h3>
            <p class="exp-card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus, perferendis.</p>
          </div>
        </div>

        <div class="experience-item-card reveal-fade-up delay-4" data-activity-type="aventura">
          <div class="exp-card-image">
            <span class="exp-badge">Lorem</span>
          </div>
          <div class="exp-card-info">
            <span class="exp-category">Lorem Ipsum</span>
            <h3 class="exp-card-title">Lorem Ipsum Dolor</h3>
            <p class="exp-card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus, perferendis.</p>
          </div>
        </div>

        <div class="experience-item-card reveal-fade-up delay-5" data-activity-type="gastronomia">
          <div class="exp-card-image">
            <span class="exp-badge">Lorem</span>
          </div>
          <div class="exp-card-info">
            <span class="exp-category">Lorem Ipsum</span>
            <h3 class="exp-card-title">Lorem Ipsum Dolor</h3>
            <p class="exp-card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus, perferendis.</p>
          </div>
        </div>
      </div>
    </section>
  `}function o(e){let t=i[e];if(!t)return`<div style="padding: 100px; text-align: center;">Destino no encontrado</div>`;let n=[...new Set(t.highlights.map(e=>e.experience).filter(Boolean))];return`
    <div class="detail-view" id="detail-view-${e}">
      <!-- Detail Hero Banner -->
      <section class="detail-hero" id="detail-hero-media">
        <img class="detail-hero-media" src="${t.image}" alt="${t.title}" />
        <div class="detail-hero-overlay"></div>
        <div class="detail-hero-title-container">
          <span class="detail-category">${t.category}</span>
          <h1 class="detail-title" id="detail-hero-title">${t.title}</h1>
        </div>
      </section>

      <!-- Detalle de Información -->
      <div class="detail-body">
        <p class="detail-intro">${t.intro}</p>

        <!-- Ficha Técnica -->
        <div class="info-grid">
          <div class="info-box">
            <span class="info-label">Temperatura</span>
            <span class="info-value">${t.info.temp}</span>
          </div>
          <div class="info-box">
            <span class="info-label">Actividades</span>
            <span class="info-value" style="font-size: 0.95rem;">${t.info.actividades}</span>
          </div>
          <div class="info-box">
            <span class="info-label">Tipo de Acceso</span>
            <span class="info-value" style="font-size: 0.95rem;">${t.info.acceso}</span>
          </div>
          <div class="info-box">
            <span class="info-label">Mejor Temporada</span>
            <span class="info-value">${t.info.mejorEpoca}</span>
          </div>
        </div>

        <!-- Filtro de Experiencias -->
        <div class="experience-filter-container">
          <button class="filter-pill active" data-filter="all">Todo</button>
          ${n.map(e=>`
            <button class="filter-pill" data-filter="${e}">${e}</button>
          `).join(``)}
        </div>

        <!-- Imperdibles / Highlights -->
        <div class="highlights-section">
          <div class="highlights-grid">
            ${t.highlights.map(e=>`
              <div class="highlight-item" data-experience="${e.experience}">
                <span class="highlight-exp-tag">${e.experience}</span>
                <h3 class="highlight-title">${e.title}</h3>
                <p class="highlight-desc">${e.desc}</p>
              </div>
            `).join(``)}
          </div>
        </div>

        <!-- Itinerario de Un Día Perfecto -->
        ${t.itinerary?`
          <div class="itinerary-section">
            <span class="section-label">Itinerario</span>
            <h2 class="itinerary-title">Un Día Perfecto</h2>
            <div class="timeline-container">
              ${t.itinerary.map(e=>`
                <div class="timeline-item">
                  <div class="timeline-time">${e.time}</div>
                  <div class="timeline-badge"></div>
                  <div class="timeline-content">
                    <h4 class="timeline-title">${e.title}</h4>
                    <p class="timeline-desc">${e.desc}</p>
                  </div>
                </div>
              `).join(``)}
            </div>
          </div>
        `:``}

      </div>
    </div>
  `}function s(){let e=document.getElementById(`app`);window.routerNavigate=c;let i={"/":{render:()=>a(),title:`Anzoátegui Te Enamora`},"/mochima":{render:()=>o(`mochima`),title:`Mochima | Anzoátegui Te Enamora`},"/lecheria":{render:()=>o(`lecheria`),title:`Lechería | Anzoátegui Te Enamora`},"/barcelona":{render:()=>o(`barcelona`),title:`Barcelona | Anzoátegui Te Enamora`},"/guanta":{render:()=>o(`guanta`),title:`Guanta | Anzoátegui Te Enamora`}},s=!0;async function c(t,n=null){let r=i[t]||i[`/`];window.unlockDestinationsDeck&&window.unlockDestinationsDeck(),document.documentElement.classList.remove(`destinations-locked`),document.body.classList.remove(`destinations-locked`),t===`/`?document.documentElement.classList.add(`snap-scroll-enabled`):document.documentElement.classList.remove(`snap-scroll-enabled`);let a=document.getElementById(`logo-link`),o=document.getElementById(`header-back-btn`);if(t===`/`?(a&&a.classList.remove(`hidden`),o&&o.classList.add(`hidden`)):(a&&a.classList.add(`hidden`),o&&o.classList.remove(`hidden`)),s)s=!1,e.innerHTML=r.render(),document.title=r.title,l();else if(document.startViewTransition){let t=null,i=null;if(n){let e=document.getElementById(n);e&&(t=e.querySelector(`.card-media img`),i=e.querySelector(`.card-title`),t&&(t.style.viewTransitionName=`shared-hero-media`),i&&(i.style.viewTransitionName=`shared-hero-title`))}await document.startViewTransition(async()=>{e.innerHTML=r.render(),document.title=r.title,document.documentElement.classList.remove(`snap-scroll-enabled`),document.documentElement.offsetHeight,window.scrollTo({top:0,behavior:`instant`}),await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(e)));let t=document.querySelector(`.detail-hero-media`),n=document.getElementById(`detail-hero-title`);t&&(t.style.viewTransitionName=`shared-hero-media`),n&&(n.style.viewTransitionName=`shared-hero-title`),l()}).finished,t&&(t.style.viewTransitionName=``),i&&(i.style.viewTransitionName=``);let a=document.querySelector(`.detail-hero-media`),o=document.getElementById(`detail-hero-title`);a&&(a.style.viewTransitionName=``),o&&(o.style.viewTransitionName=``)}else e.innerHTML=r.render(),document.title=r.title,window.scrollTo(0,0),l();window.location.pathname!==t&&window.history.pushState({path:t},``,t)}function l(){document.querySelectorAll(`.editorial-card`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),c(e.getAttribute(`data-route`),e.id)})});let e=document.querySelectorAll(`.filter-pill`),i=document.querySelectorAll(`.highlight-item`);e.forEach(t=>{t.addEventListener(`click`,()=>{e.forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let n=t.getAttribute(`data-filter`);i.forEach(e=>{let t=e.getAttribute(`data-experience`);n===`all`||t===n?e.classList.remove(`hidden-filter`):e.classList.add(`hidden-filter`)})})});let a=document.querySelectorAll(`.act-filter-pill`),o=document.querySelectorAll(`.experience-item-card`);a.forEach(e=>{e.addEventListener(`click`,()=>{a.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let t=e.getAttribute(`data-filter`);o.forEach(e=>{let n=e.getAttribute(`data-activity-type`);t===`all`||n===t?e.classList.remove(`hidden-activity`):e.classList.add(`hidden-activity`)})})}),r(),t(),n()}let u=document.getElementById(`header-back-btn`);u&&u.addEventListener(`click`,()=>{let e=`card-${window.location.pathname.replace(`/`,``)}`,t=document.querySelector(`.detail-hero-media`),n=document.getElementById(`detail-hero-title`);t&&(t.style.viewTransitionName=`shared-hero-media`),n&&(n.style.viewTransitionName=`shared-hero-title`),c(`/`,e)});let d=document.getElementById(`logo-link`);d&&d.addEventListener(`click`,e=>{e.preventDefault(),c(`/`)}),window.addEventListener(`popstate`,()=>{c(window.location.pathname)}),c(window.location.pathname)}function c(){let e=document.getElementById(`preloader`),t=document.getElementById(`preloader-line`),n=document.getElementById(`preloader-percentage`);if(!e||!t)return;let r=0,i=!1,a=setInterval(()=>{let e=i?Math.random()*16+12:Math.random()*4+2.5;r+=e,r>=100&&(r=100,clearInterval(a),o());let s=Math.round(r);t.style.width=`${s}%`,n&&(n.textContent=String(s).padStart(2,`0`))},35),o=()=>{clearInterval(a),t.style.width=`100%`,n&&(n.textContent=`100`),setTimeout(()=>{e.classList.add(`fade-out`);let t=document.querySelector(`.hero-media-container video`);t&&t.play().catch(()=>{})},450)},s=()=>{i=!0};document.readyState===`complete`?s():window.addEventListener(`load`,s),setTimeout(()=>{i=!0},1200)}var l=()=>{c(),e(),s()};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,l):l();