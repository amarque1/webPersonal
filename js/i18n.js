/**
 * INTERNATIONALIZATION (i18n) MODULE
 * Supports: Català (ca), Castellà (es), English (en)
 * Features:
 * - Automatic browser language detection with prioritization
 * - Fallback to English (en) for any unsupported browser language
 * - Persistent language selection via localStorage
 * - Seamless live DOM translation without full page reloads
 * - Dynamic synchronization with project modals and telemetry
 */

(function () {
  'use strict';

  // Supported languages and fallback
  const SUPPORTED_LANGS = ['ca', 'es', 'en'];
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'portfolio_lang_preference';

  // Translation Dictionaries
  const translations = {
    // ==========================================
    // CATALÀ (ca)
    // ==========================================
    ca: {
      meta: {
        title: "Desenvolupador de Videojocs & Artista Digital — Portafoli",
        description: "Portafoli personal d'un desenvolupador de videojocs i artista digital especialitzat en Unity, C#, sistemes de gameplay, modelatge 3D i art tècnic."
      },
      nav: {
        about: "Sobre mi",
        skills: "Habilitats",
        projects: "Projectes",
        contact: "Contacte",
        status: "DISPONIBLE PER A OPORTUNITATS",
        skip: "SALTAR AL CONTINGUT [TAB]"
      },
      hero: {
        identityDev: "DESENVOLUPADOR DE JOCS",
        identityArt: "ARTISTA DIGITAL",
        status: "DISPONIBLE PER A OPORTUNITATS",
        headlineLine1: "CONSTRUINT MONS.",
        headlineLine2: "CREANT EXPERIÈNCIES.",
        bio: "Unint <strong>programació de gameplay</strong>, <strong>simulació de física</strong> i <strong>direcció visual 3D</strong>. Desenvolupant mecàniques responsives a Unity &amp; C# i creant entorns 3D atmosfèrics, shaders i art digital.",
        ctaWork: "EXPLORA EL MEU TREBALL",
        ctaContact: "CONTACTA'M",
        ctaCv: "CURRÍCULUM / CV",
        hudStatusLabel: "ESTAT:",
        hudStatusValue: "OPERACIONAL // MOTOR ACTIU",
        hudCoordsLabel: "COORD:",
        hudTimeLabel: "HORA_SYS:",
        hudRefreshLabel: "REFRESC:",
        scroll: "DESPLAÇA"
      },
      about: {
        eyebrow: "02. PERFIL DUAL",
        title: "LA MENTALITAT HÍBRIDA",
        subtitle: "La majoria de desenvolupadors o bé només programen o només fan art. Jo opero a la intersecció on les mecàniques, la física i la narrativa visual s'eleven mútuament.",
        narrativeP1: "Sóc un <span class=\"highlight\">desenvolupador de videojocs i artista digital</span> apassionat per dissenyar i implementar jocs que se sentin tàctils, reactius i visualment memorables. El meu perfil combina principis sòlids d'enginyeria de programari amb sensibilitat per a la composició, la il·luminació i l'atmosfera espacial.",
        narrativeP2: "Ja sigui enginyant controladors físics personalitzats, optimitzant pipelines de renderitzat, modelant assets 3D optimitzats per a temps real o programant sistemes de gameplay a C#, gaudeixo portant idees des del primer esbós conceptual fins al prototip jugable.",
        badgeTitle: "CREATIVE DEVELOPER",
        badgeDesc: "Dedicat al desenvolupament de videojocs, l'experimentació en art tècnic i les experiències interactives en 3D.",
        tabsExplore: "EXPLORA LES PERSPECTIVES DEL PERFIL:",
        tabBoth: "SÍNTESI (TOTES DUES)",
        tabTech: "MENTALITAT TÈCNICA",
        tabArt: "MENTALITAT ARTÍSTICA",
        techCore: "// NUCLI 01",
        techTitle: "MENTALITAT TÈCNICA",
        techDesc: "Construint fonaments de joc sòlids mitjançant enginyeria de programari neta, lògica algorítmica i controladors de jugador responsius.",
        techItem1: "<strong>Programació i arquitectura de jocs:</strong> Codi C# net, modular i desacoblat seguint principis SOLID.",
        techItem2: "<strong>Mecàniques de gameplay:</strong> Controladors cinemàtics, màquines d'estats finits, sistemes d'inventari i lògica de combat.",
        techItem3: "<strong>Física i gestió de col·lisions:</strong> Escombrats personalitzats, raycasting, predicció de trajectòries i escalat temporal determinista.",
        techItem4: "<strong>Disseny de sistemes:</strong> Busos d'esdeveniments, arquitectures basades en Scriptable Objects i fluxos de dades serialitzats.",
        techItem5: "<strong>Rendiment i perfilat:</strong> Minimització de draw calls, reducció del Garbage Collector i estabilització del frame-time.",
        artCore: "// NUCLI 02",
        artTitle: "MENTALITAT ARTÍSTICA",
        artDesc: "Creant mons atmosfèrics mitjançant formes escultòriques, il·luminació, materials i una direcció estètica cohesionada.",
        artItem1: "<strong>Modelatge 3D i topologia:</strong> Assets hard-surface i low/mid-poly optimitzats amb topologia neta de quads a Blender.",
        artItem2: "<strong>Texturitzat PBR i UVs:</strong> Metodologies de trim-sheets, desplegat UV, baking de mapes de normals i renderitzat PBR.",
        artItem3: "<strong>Il·luminació i composició:</strong> Atmosfera volumètrica, contrast dramàtic, indicadors de profunditat i narrativa ambiental.",
        artItem4: "<strong>Animació i cinemàtica:</strong> Rigging, animació per claus (keyframes), tremolors de càmera procedimentals i barreges d'animació.",
        artItem5: "<strong>Experimentació creativa:</strong> Exploració d'estètiques generatives, conceptes de joc surrealistes i motius visuals expressius."
      },
      skills: {
        eyebrow: "03. EINES I HABILITATS",
        title: "ARSENAL I COMPETÈNCIES",
        subtitle: "Desglossament estructurat de disciplines tècniques, programari creatiu i fluxos d'enginyeria aplicats al desenvolupament de videojocs.",
        pillar1Title: "DESENVOLUPAMENT DE JOCS",
        pillar1Sub: "Motors, llenguatges de programació i mecàniques",
        pillar2Title: "3D I ART DIGITAL",
        pillar2Sub: "Pipelines d'assets, texturitzat i direcció visual",
        pillar3Title: "CREATIU I TÈCNIC",
        pillar3Sub: "Tecnologies front-end, control de versions i pipelines",
        gameDesign: "Disseny de Sistemes de Joc",
        prototyping: "Prototipat Ràpid",
        modelling: "Modelatge 3D & Topologia",
        texturing: "Texturitzat PBR & UVs",
        animation: "Animació per Keyframes",
        visDev: "Desenvolupament Visual & Mood",
        uiUx: "Disseny UI / UX per a Videojocs"
      },
      projects: {
        eyebrow: "04. OBRES SELECCIONADES",
        title: "PROJECTES DESTACATS",
        subtitle: "Una selecció curada de sistemes de videojocs, estudis d'entorns 3D i experiments interactius. (Plantilles editables preparades per als teus títols).",
        rolePrefix: "ROL:",
        btnBlueprint: "INSPECTAR DISSENY",
        btnAssets: "INSPECTAR ASSETS",
        btnPipeline: "INSPECTAR PIPELINE",
        btnSource: "CODI FONT",
        btnBreakdown: "DESGLOSSAMENT",
        btnItch: "ITCH.IO",
        p1: {
          badge: "PROTOTIP JUGABLE",
          category: "SISTEMES DE GAMEPLAY // C# & UNITY",
          title: "PROJECT CHRONO-SHIFT",
          role: "PROGRAMADOR DE FÍSICA & GAMEPLAY",
          desc: "Un prototip de joc d'acció en 3D que explora la dilatació temporal contínua, el càlcul predictiu de trajectòries i física cinemàtica personalitzada amb mecàniques de rebobinat.",
          overview: "Prototip de mecàniques de dilatació temporal basat en física centrat en el determinisme, el càlcul predictiu de trajectòries i la resolució personalitzada de col·lisions rígides.",
          architecture: "Arquitectura basada en màquines d'estats modulars desacoblant l'entrada de l'usuari de la taxa de ticks físics. Buffer circular per desar l'historial d'estats, permetent rebobinat i bombolles de temps locals.",
          challenges: "Eliminació de l'efecte de tunelització de PhysX a altes velocitats mitjançant escombrats de volums continus i integració personalitzada de Verlet.",
          controls: "WASD / Stick Esquerre: Moviment cinemàtic | Clic Dret / LT: Dilatar Temps | Espai / A: Salt | E: Rebobinar Horitzó"
        },
        p2: {
          badge: "MOSTRA D'ART 3D",
          category: "ENTORN 3D // BLENDER & PBR",
          title: "NEO-RUINS: SECTOR 7",
          role: "ARTISTA D'ENTORNS & DISSENYADOR DE NIVELLS",
          desc: "Un entorn cyberpunk brutalista i atmosfèric dissenyat per a renderitzat en temps real. Utilitza trim-sheets modulars, calcomanies personalitzades i transferències de normals d'alta a baixa poligonització.",
          overview: "Exploració d'un entorn de ciència-ficció distòpic dissenyat per transmetre narrativa ambiental mitjançant siluetes arquitectòniques monolítiques i estructures brutalistes.",
          architecture: "Flux de treball basat en trim-sheets a Blender, forjats amb transferències de normals high-to-low poly. Pipeline PBR de rugositat/metàl·lic calibrat per a boira volumètrica i reflexos en temps real.",
          challenges: "Equilibri entre densitat visual i pressupost de draw calls. Optimització a 48k triangles per asset principal amb LODs jeràrquics i mapes d'oclusió ambiental en vèrtexs.",
          controls: "Passeig interactiu en 3D explorable mitjançant build WebGL / itch.io."
        },
        p3: {
          badge: "EN DESENVOLUPAMENT",
          category: "TECNOLOGIA CREATIVA // HLSL COMPUTE",
          title: "PROCEDURAL ODYSSEY",
          role: "TECNÒLEG CREATIU & DESENVOLUPADOR DE SHADERS",
          desc: "Sintetitzador de terreny procedural en temps real que executa l'algorisme Marching Cubes a la GPU amb compute shaders. Generació asíncrona de blocs, biomes de soroll simplex i dissenys procedurals.",
          overview: "Generador de mons infinits de vòxels impulsat per compute shaders a la GPU i algorismes de Marching Cubes amb múltiples octaves de soroll simplex.",
          architecture: "Compute shader a la GPU que processa blocs de densitat de vòxels de 64x64x64 de manera asíncrona en compute buffers, generant malles poligonals tancades sense bloquejar el fil principal.",
          challenges: "Unió perfecta de blocs entre fronteres de nivells de detall (LOD) i contornejat dual dinàmic sense esquerdes visibles ni fluctuació de vèrtexs.",
          controls: "WASD: Càmera lliure | Ratolí: Orbitar | [ / ]: Canviar llavor | Tab: Inspector de nodes"
        }
      },
      contact: {
        eyebrow: "05. TRANSMISSIÓ",
        headline: "TENS UN PROJECTE EN MENT?<br><span style=\"color:var(--accent-lime);\">CONSTRUÏM ALGUNA COSA JUNTS.</span>",
        desc: "Actualment estic disponible per a rols a temps complet en estudis de videojocs, col·laboracions d'art tècnic i projectes independents. Tant si necessites sistemes de gameplay construïts des de zero com direcció visual 3D, connectem.",
        sendEmail: "ENVIA UN CORREU",
        copyEmail: "COPIAR",
        copied: "COPIAT!",
        downloadCv: "DESCARREGAR CV (PDF)",
        socialGithubSub: "@amarque1",
        socialLinkedinSub: "Xarxa professional",
        socialItchSub: "Demos de jocs jugables"
      },
      modal: {
        overviewTitle: "// DESCRIPCIÓ DEL PROJECTE",
        archTitle: "// ARQUITECTURA I DISSENY TÈCNIC",
        challengesTitle: "// REPTES I SOLUCIONS",
        controlsTitle: "// CONTROLS I INTERFÍCIE",
        closeAria: "Tancar modal de disseny del projecte"
      },
      footer: {
        rights: "TOTS ELS DRETS RESERVATS.",
        hosted: "ALLOTJAT A GITHUB PAGES",
        top: "INICI"
      },
      toast: {
        copiedEmail: "S'ha copiat {email} al porta-retalls!"
      }
    },

    // ==========================================
    // CASTELLÀ / ESPAÑOL (es)
    // ==========================================
    es: {
      meta: {
        title: "Desarrollador de Videojuegos & Artista Digital — Portafolio",
        description: "Portafolio personal de un desarrollador de videojuegos y artista digital especializado en Unity, C#, sistemas de gameplay, modelado 3D y arte técnico."
      },
      nav: {
        about: "Sobre mí",
        skills: "Habilidades",
        projects: "Proyectos",
        contact: "Contacto",
        status: "DISPONIBLE PARA OPORTUNIDADES",
        skip: "SALTAR AL CONTENIDO [TAB]"
      },
      hero: {
        identityDev: "DESARROLLADOR DE JUEGOS",
        identityArt: "ARTISTA DIGITAL",
        status: "DISPONIBLE PARA OPORTUNIDADES",
        headlineLine1: "CONSTRUYENDO MUNDOS.",
        headlineLine2: "CREANDO EXPERIENCIAS.",
        bio: "Uniendo <strong>programación de gameplay</strong>, <strong>simulación de física</strong> y <strong>dirección visual 3D</strong>. Desarrollando mecánicas responsivas en Unity &amp; C# mientras creo entornos 3D atmosféricos, shaders y arte digital.",
        ctaWork: "EXPLORA MI TRABAJO",
        ctaContact: "CONTÁCTAME",
        ctaCv: "CURRÍCULUM / CV",
        hudStatusLabel: "ESTADO:",
        hudStatusValue: "OPERACIONAL // MOTOR ACTIVO",
        hudCoordsLabel: "COORD:",
        hudTimeLabel: "HORA_SYS:",
        hudRefreshLabel: "REFRESCO:",
        scroll: "DESPLAZA"
      },
      about: {
        eyebrow: "02. PERFIL DUAL",
        title: "LA MENTALIDAD HÍBRIDA",
        subtitle: "La mayoría de desarrolladores solo programan o solo hacen arte. Yo opero en la intersección donde las mecánicas, la física y la narrativa visual se elevan mutuamente.",
        narrativeP1: "Soy un <span class=\"highlight\">desarrollador de videojuegos y artista digital</span> apasionado por diseñar e implementar juegos que se sientan táctiles, reactivos y visualmente memorables. Mi perfil combina sólidos principios de ingeniería de software con sensibilidad para la composición, la iluminación y la atmósfera espacial.",
        narrativeP2: "Ya sea diseñando controladores físicos personalizados, optimizando pipelines de renderizado, esculpiendo assets 3D optimizados para tiempo real o programando sistemas de gameplay en C#, disfruto llevando ideas desde el primer boceto conceptual hasta el prototipo jugable.",
        badgeTitle: "CREATIVE DEVELOPER",
        badgeDesc: "Dedicado al desarrollo de videojuegos, la experimentación en arte técnico y las experiencias interactivas en 3D.",
        tabsExplore: "EXPLORA LAS PERSPECTIVAS DEL PERFIL:",
        tabBoth: "SÍNTESIS (AMBAS)",
        tabTech: "MENTALIDAD TÉCNICA",
        tabArt: "MENTALIDAD ARTÍSTICA",
        techCore: "// NÚCLEO 01",
        techTitle: "MENTALIDAD TÉCNICA",
        techDesc: "Construyendo cimientos de juego sólidos mediante ingeniería de software limpia, lógica algorítmica y controladores de jugador responsivos.",
        techItem1: "<strong>Programación y arquitectura de juegos:</strong> Código C# limpio, modular y desacoplado siguiendo principios SOLID.",
        techItem2: "<strong>Mecánicas de gameplay:</strong> Controladores cinemáticos, máquinas de estados finitos, sistemas de inventario y lógica de combate.",
        techItem3: "<strong>Física y gestión de colisiones:</strong> Barridos personalizados, raycasting, predicción de trayectorias y escalado temporal determinista.",
        techItem4: "<strong>Diseño de sistemas:</strong> Buses de eventos, arquitecturas basadas en Scriptable Objects y flujos de datos serializados.",
        techItem5: "<strong>Rendimiento y perfilado:</strong> Minimización de draw calls, reducción del Garbage Collector y estabilización del frame-time.",
        artCore: "// NÚCLEO 02",
        artTitle: "MENTALIDAD ARTÍSTICA",
        artDesc: "Creando mundos atmosféricos mediante formas escultóricas, iluminación, materiales y una dirección estética cohesionada.",
        artItem1: "<strong>Modelado 3D y topología:</strong> Assets hard-surface y low/mid-poly optimizados con topología limpia de quads en Blender.",
        artItem2: "<strong>Texturizado PBR y UVs:</strong> Metodologías de trim-sheets, desplegado UV, baking de mapas de normales y renderizado PBR.",
        artItem3: "<strong>Iluminación y composición:</strong> Atmósfera volumétrica, contraste dramático, pistas de profundidad y narrativa ambiental.",
        artItem4: "<strong>Animación y cinemática:</strong> Rigging, animación por claves (keyframes), sacudidas de cámara procedimentales y mezclas de animación.",
        artItem5: "<strong>Experimentación creativa:</strong> Exploración de estéticas generativas, conceptos de juego surrealistas y motivos visuales expresivos."
      },
      skills: {
        eyebrow: "03. HERRAMIENTAS",
        title: "ARSENAL Y COMPETENCIAS",
        subtitle: "Desglose estructurado de disciplinas técnicas, software creativo y flujos de ingeniería aplicados al desarrollo de videojuegos.",
        pillar1Title: "DESARROLLO DE JUEGOS",
        pillar1Sub: "Motores, lenguajes de programación y mecánicas",
        pillar2Title: "3D Y ARTE DIGITAL",
        pillar2Sub: "Pipelines de assets, texturizado y dirección visual",
        pillar3Title: "CREATIVO Y TÉCNICO",
        pillar3Sub: "Tecnologías front-end, control de versiones y pipelines",
        gameDesign: "Diseño de Sistemas de Juego",
        prototyping: "Prototipado Rápido",
        modelling: "Modelado 3D & Topología",
        texturing: "Texturizado PBR & UVs",
        animation: "Animación por Keyframes",
        visDev: "Desarrollo Visual & Atmósfera",
        uiUx: "Diseño UI / UX para Videojuegos"
      },
      projects: {
        eyebrow: "04. OBRAS SELECCIONADAS",
        title: "PROYECTOS DESTACADOS",
        subtitle: "Una selección cuidada de sistemas de videojuegos, estudios de entornos 3D y experimentos interactivos. (Plantillas editables listas para tus títulos).",
        rolePrefix: "ROL:",
        btnBlueprint: "INSPECCIONAR DISEÑO",
        btnAssets: "INSPECCIONAR ASSETS",
        btnPipeline: "INSPECCIONAR PIPELINE",
        btnSource: "CÓDIGO FUENTE",
        btnBreakdown: "DESGLOSE",
        btnItch: "ITCH.IO",
        p1: {
          badge: "PROTOTIPO JUGABLE",
          category: "SISTEMAS DE GAMEPLAY // C# & UNITY",
          title: "PROJECT CHRONO-SHIFT",
          role: "PROGRAMADOR DE FÍSICA & GAMEPLAY",
          desc: "Un prototipo de acción en 3D que explora la dilatación temporal continua, el cálculo predictivo de trayectorias y física cinemática con mecánicas de rebobinado.",
          overview: "Prototipo de mecánicas de dilatación temporal basado en física centrado en determinismo, cálculo predictivo de trayectorias y resolución de colisiones rígidas.",
          architecture: "Arquitectura basada en máquinas de estados modulares desacoplando la entrada de usuario de la tasa de ticks de física. Búfer circular para historial de estados, permitiendo rebobinado y burbujas temporales locales.",
          challenges: "Eliminación del efecto de tunelización de PhysX a altas velocidades mediante barridos de volumen continuo e integración personalizada de Verlet.",
          controls: "WASD / Stick Izquierdo: Movimiento cinemático | Clic Derecho / LT: Dilatar Tiempo | Espacio / A: Salto | E: Rebobinar Horizonte"
        },
        p2: {
          badge: "MUESTRA DE ARTE 3D",
          category: "ENTORNO 3D // BLENDER & PBR",
          title: "NEO-RUINS: SECTOR 7",
          role: "ARTISTA DE ENTORNOS & DISEÑADOR DE NIVELES",
          desc: "Un entorno cyberpunk brutalista y atmosférico diseñado para renderizado en tiempo real. Utiliza trim-sheets modulares, calcomanías personalizadas y transferencias de normales.",
          overview: "Exploración de un entorno de ciencia ficción distópico diseñado para transmitir narrativa ambiental mediante siluetas arquitectónicas monolíticas y estructuras brutalistas.",
          architecture: "Flujo de trabajo basado en trim-sheets en Blender, horneados con transferencias de normales high-to-low poly. Pipeline PBR calibrado para niebla volumétrica y reflejos en tiempo real.",
          challenges: "Equilibrio entre densidad visual y presupuesto de draw calls. Optimización a 48k triángulos por asset principal con LODs jerárquicos y oclusión ambiental en vértices.",
          controls: "Paseo interactivo en 3D explorable mediante build WebGL / itch.io."
        },
        p3: {
          badge: "EN DESARROLLO",
          category: "TECNOLOGÍA CREATIVA // HLSL COMPUTE",
          title: "PROCEDURAL ODYSSEY",
          role: "TECNÓLOGO CREATIVO & DESARROLLADOR DE SHADERS",
          desc: "Sintetizador de terreno procedural en tiempo real ejecutando el algoritmo Marching Cubes en GPU con compute shaders. Bloques asíncronos y biomas de ruido simplex.",
          overview: "Generador de mundos infinitos de vóxeles impulsado por compute shaders en GPU y algoritmo Marching Cubes con múltiples octavas de ruido simplex.",
          architecture: "Compute shader en GPU que procesa bloques de densidad de 64x64x64 de manera asíncrona en búferes de cómputo, generando mallas poligonales cerradas sin bloquear el hilo principal.",
          challenges: "Unión perfecta de bloques entre fronteras de niveles de detalle (LOD) y contorneado dual dinámico sin grietas visibles ni fluctuación de vértices.",
          controls: "WASD: Cámara libre | Ratón: Orbitar | [ / ]: Cambiar semilla | Tab: Inspector de nodos"
        }
      },
      contact: {
        eyebrow: "05. TRANSMISIÓN",
        headline: "¿TIENES UN PROYECTO EN MENTE?<br><span style=\"color:var(--accent-lime);\">CONSTRUYAMOS ALGO JUNTOS.</span>",
        desc: "Actualmente disponible para roles a tiempo completo en estudios de videojuegos, colaboraciones de arte técnico y proyectos independientes. Ya sea para desarrollar sistemas de juego desde cero o aportar dirección visual 3D, conectemos.",
        sendEmail: "ENVIAR CORREO",
        copyEmail: "COPIAR",
        copied: "¡COPIADO!",
        downloadCv: "DESCARGAR CV (PDF)",
        socialGithubSub: "@amarque1",
        socialLinkedinSub: "Red profesional",
        socialItchSub: "Demos de juegos jugables"
      },
      modal: {
        overviewTitle: "// DESCRIPCIÓN DEL PROYECTO",
        archTitle: "// ARQUITECTURA Y DISEÑO TÉCNICO",
        challengesTitle: "// RETOS Y SOLUCIONES",
        controlsTitle: "// CONTROLES E INTERFAZ",
        closeAria: "Cerrar modal de diseño del proyecto"
      },
      footer: {
        rights: "TODOS LOS DERECHOS RESERVADOS.",
        hosted: "ALOJADO EN GITHUB PAGES",
        top: "INICIO"
      },
      toast: {
        copiedEmail: "¡Se ha copiado {email} al portapapeles!"
      }
    },

    // ==========================================
    // ENGLISH (en) — DEFAULT FALLBACK
    // ==========================================
    en: {
      meta: {
        title: "Creative Developer & Game Artist — Portfolio",
        description: "Personal Portfolio of a Creative Developer & Game Artist specializing in Unity, C#, Gameplay Systems, 3D Modelling, and Technical Art."
      },
      nav: {
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
        status: "OPEN TO OPPORTUNITIES",
        skip: "SKIP TO CONTENT [TAB]"
      },
      hero: {
        identityDev: "GAME DEVELOPER",
        identityArt: "DIGITAL ARTIST",
        status: "OPEN TO OPPORTUNITIES",
        headlineLine1: "BUILDING WORLDS.",
        headlineLine2: "CRAFTING EXPERIENCES.",
        bio: "Bridging <strong>gameplay programming</strong>, <strong>physics simulation</strong>, and <strong>3D visual direction</strong>. Developing responsive gameplay mechanics in Unity &amp; C# while authoring atmospheric 3D environments, shaders, and digital art.",
        ctaWork: "EXPLORE MY WORK",
        ctaContact: "CONTACT ME",
        ctaCv: "RESUME / CV",
        hudStatusLabel: "STATUS:",
        hudStatusValue: "OPERATIONAL // ENGINE ACTIVE",
        hudCoordsLabel: "COORDS:",
        hudTimeLabel: "SYS_TIME:",
        hudRefreshLabel: "REFRESH:",
        scroll: "SCROLL"
      },
      about: {
        eyebrow: "02. DUAL PROFILE",
        title: "THE HYBRID MINDSET",
        subtitle: "Most developers either write code or make art. I operate at the intersection where mechanics, physics, and visual storytelling elevate one another.",
        narrativeP1: "I am a <span class=\"highlight\">Game Developer and Digital Artist</span> passionate about designing and implementing games that feel tactile, responsive, and visually memorable. My background combines rigorous software engineering principles with an eye for composition, lighting, and spatial atmosphere.",
        narrativeP2: "Whether engineering custom physics controllers, optimizing rendering pipelines, sculpting 3D game-ready assets, or scripting interactive gameplay systems in C#, I take pride in taking ideas from concept sketch to playable prototype.",
        badgeTitle: "CREATIVE DEVELOPER",
        badgeDesc: "Dedicated to video game development, technical art experimentation, and interactive 3D digital experiences.",
        tabsExplore: "EXPLORE PROFILE PERSPECTIVES:",
        tabBoth: "SYNTHESIS (BOTH)",
        tabTech: "TECHNICAL MINDSET",
        tabArt: "ARTISTIC MINDSET",
        techCore: "// CORE 01",
        techTitle: "TECHNICAL MINDSET",
        techDesc: "Building robust gameplay foundations through clean software engineering, algorithmic logic, and responsive player controllers.",
        techItem1: "<strong>Game Programming &amp; Architecture:</strong> Clean, modular, and decoupled C# code adhering to SOLID principles.",
        techItem2: "<strong>Gameplay Mechanics:</strong> Kinematic character controllers, state machines, inventory engines, and combat logic.",
        techItem3: "<strong>Physics &amp; Collision Handling:</strong> Custom sweeps, raycasting, trajectory forecasting, and deterministic time scaling.",
        techItem4: "<strong>Systems Design:</strong> Event buses, scriptable object architectures, and serialization data pipelines.",
        techItem5: "<strong>Performance &amp; Profiling:</strong> Draw-call minimization, garbage collection mitigation, and frame-time stabilization.",
        artCore: "// CORE 02",
        artTitle: "ARTISTIC MINDSET",
        artDesc: "Creating atmospheric worlds through sculptural form, lighting, materials, and cohesive aesthetic direction.",
        artItem1: "<strong>3D Modelling &amp; Topology:</strong> Hard-surface and low-to-mid poly assets optimized with clean quad topology in Blender.",
        artItem2: "<strong>PBR Texturing &amp; UVs:</strong> Trim-sheet workflows, UV unwrapping, normal baking, and physically based rendering.",
        artItem3: "<strong>Lighting &amp; Composition:</strong> Volumetric atmosphere, dramatic contrast, depth cues, and environmental storytelling.",
        artItem4: "<strong>Animation &amp; Kinematics:</strong> Rigging, keyframing, procedural camera shakes, and animation blends.",
        artItem5: "<strong>Creative Experimentation:</strong> Exploring generative aesthetics, surreal game concepts, and expressive visual motifs."
      },
      skills: {
        eyebrow: "03. TOOLKIT",
        title: "SKILLS & PROFICIENCIES",
        subtitle: "An organized breakdown of technical disciplines, creative software, and engineering workflows applied to game development.",
        pillar1Title: "GAME DEVELOPMENT",
        pillar1Sub: "Core engines, programming languages & mechanics",
        pillar2Title: "3D & ART",
        pillar2Sub: "Asset pipelines, texturing & visual direction",
        pillar3Title: "CREATIVE & TECHNICAL",
        pillar3Sub: "Front-end tech, version control & pipelines",
        gameDesign: "Game Systems Design",
        prototyping: "Rapid Prototyping",
        modelling: "3D Modelling & Topology",
        texturing: "PBR Texturing & UVs",
        animation: "Keyframe Animation",
        visDev: "Visual Development & Mood",
        uiUx: "Game UI / UX Design"
      },
      projects: {
        eyebrow: "04. SELECTED WORKS",
        title: "FEATURED PROJECTS",
        subtitle: "A curated selection of video game systems, 3D environment studies, and interactive experiments. (Editable placeholders ready for your game titles and media).",
        rolePrefix: "ROLE:",
        btnBlueprint: "INSPECT BLUEPRINT",
        btnAssets: "INSPECT ASSETS",
        btnPipeline: "INSPECT PIPELINE",
        btnSource: "SOURCE",
        btnBreakdown: "BREAKDOWN",
        btnItch: "ITCH.IO",
        p1: {
          badge: "PLAYABLE PROTOTYPE",
          category: "GAMEPLAY SYSTEMS // C# & UNITY",
          title: "PROJECT CHRONO-SHIFT",
          role: "PHYSICS & GAMEPLAY PROGRAMMER",
          desc: "A high-octane 3D gameplay prototype exploring continuous time dilation, predictive trajectory calculation, and custom kinematic character physics with rewind mechanics.",
          overview: "A physics-based time-dilation prototype focusing on determinism, predictive trajectory calculation, and custom rigid-body collision management.",
          architecture: "Engineered a modular state machine architecture decoupling player input from physics tick rate. Implemented a ring-buffer state history system allowing rewinds, trajectory scrubbing, and localized time dilation bubbles.",
          challenges: "Overcoming Unity default PhysX tunneling artifacts during high-speed time scales by implementing continuous sweeping volume intersections and custom Verlet integration.",
          controls: "WASD / Left Stick: Kinematic Move | Right Click / LT: Dilate Time | Space / A: Jump | E: Rewind Horizon"
        },
        p2: {
          badge: "3D ART SHOWCASE",
          category: "3D ENVIRONMENT // BLENDER & PBR",
          title: "NEO-RUINS: SECTOR 7",
          role: "ENVIRONMENT ARTIST & LEVEL DESIGNER",
          desc: "A moody brutalist cyberpunk environment built for real-time engine rendering. Utilizing modular trim-sheets, custom decals, and high-to-low poly normal transfers for maximum fidelity within strict draw budgets.",
          overview: "An atmospheric dystopian sci-fi environment exploration designed to convey environmental storytelling through monolithic architectural silhouettes and brutalist cyberpunk structures.",
          architecture: "Modular trim-sheet workflow created in Blender, baked with high-to-low poly normal transfers. PBR roughness/metallic workflow calibrated for volumetric fog and real-time screen-space reflections.",
          challenges: "Balancing visual density with optimal draw call budgets. Optimized polycount to 48k tris for hero assets using hierarchical LODs and custom ambient occlusion vertex maps.",
          controls: "Real-time 3D walkthrough demo viewable via WebGL / itch.io build."
        },
        p3: {
          badge: "IN DEVELOPMENT",
          category: "CREATIVE TECH // HLSL COMPUTE",
          title: "PROCEDURAL ODYSSEY",
          role: "CREATIVE TECHNOLOGIST & SHADER DEV",
          desc: "Real-time GPU terrain synthesizer executing Marching Cubes algorithm inside compute buffers. Features asynchronous chunk streaming, simplex-noise biomes, and procedural level layouts.",
          overview: "An infinite procedural voxel world generator powered by GPU compute shaders and Marching Cubes algorithm with multi-octave simplex noise biomes.",
          architecture: "GPU compute shader dispatching 64x64x64 voxel density chunks asynchronously into compute buffers, generating watertight polygonal meshes on demand with zero main-thread hitching.",
          challenges: "Seamless chunk stitching across LOD boundaries and dynamic dual-contouring resolution without visible cracks or vertex swimming.",
          controls: "WASD: Fly Cam | Mouse: Orbit | [ / ]: Change Seed | Tab: Debug Node Inspector"
        }
      },
      contact: {
        eyebrow: "05. TRANSMISSION",
        headline: "HAVE A PROJECT IN MIND?<br><span style=\"color:var(--accent-lime);\">LET'S BUILD SOMETHING.</span>",
        desc: "I am currently open to full-time studio roles, technical art collaborations, and indie game development opportunities. Whether you need gameplay systems built from scratch or 3D visual direction, let's connect.",
        sendEmail: "SEND AN EMAIL",
        copyEmail: "COPY",
        copied: "COPIED!",
        downloadCv: "DOWNLOAD CV (PDF)",
        socialGithubSub: "@amarque1",
        socialLinkedinSub: "Professional Network",
        socialItchSub: "Playable Game Demos"
      },
      modal: {
        overviewTitle: "// PROJECT OVERVIEW",
        archTitle: "// ARCHITECTURE & TECHNICAL DESIGN",
        challengesTitle: "// CHALLENGES & SOLUTIONS",
        controlsTitle: "// CONTROLS & INTERFACE",
        closeAria: "Close project blueprint modal"
      },
      footer: {
        rights: "ALL RIGHTS RESERVED.",
        hosted: "HOSTED ON GITHUB PAGES",
        top: "TOP"
      },
      toast: {
        copiedEmail: "Copied {email} to clipboard!"
      }
    }
  };

  /**
   * Resolve nested key in translation dictionary (e.g. "hero.headlineLine1")
   */
  function resolveKey(obj, path) {
    return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : null), obj);
  }

  /**
   * Determine the active language:
   * 1. Check localStorage for user preference
   * 2. Inspect browser languages (navigator.languages / navigator.language)
   * 3. Fall back to English (DEFAULT_LANG) if no match
   */
  function detectLanguage() {
    // 1. Stored preference
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED_LANGS.includes(stored)) {
        return stored;
      }
    } catch (e) {
      // localStorage disabled or security block
    }

    // 2. Browser language detection
    const browserLanguages = navigator.languages || [navigator.language || navigator.userLanguage || ''];
    for (const lang of browserLanguages) {
      if (!lang) continue;
      const lower = lang.toLowerCase();
      if (lower.startsWith('ca')) return 'ca';
      if (lower.startsWith('es')) return 'es';
      if (lower.startsWith('en')) return 'en';
    }

    // 3. Fallback default
    return DEFAULT_LANG;
  }

  let currentLang = detectLanguage();

  /**
   * Apply translations to the DOM
   */
  function applyLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
      lang = DEFAULT_LANG;
    }
    currentLang = lang;

    // Update <html lang="...">
    document.documentElement.lang = lang;

    // Save preference
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    const dict = translations[lang] || translations[DEFAULT_LANG];

    // Update document title & meta description
    if (dict.meta) {
      if (dict.meta.title) document.title = dict.meta.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && dict.meta.description) {
        metaDesc.setAttribute('content', dict.meta.description);
      }
    }

    // Translate all elements with data-i18n
    const translatableElements = document.querySelectorAll('[data-i18n]');
    translatableElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = resolveKey(dict, key);
      if (val !== null && val !== undefined) {
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // Translate attributes like placeholder or aria-label: data-i18n-attr="aria-label:key,title:key"
    const attrElements = document.querySelectorAll('[data-i18n-attr]');
    attrElements.forEach(el => {
      const spec = el.getAttribute('data-i18n-attr');
      const pairs = spec.split(',');
      pairs.forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        const val = resolveKey(dict, key);
        if (val !== null && val !== undefined) {
          el.setAttribute(attr, val);
        }
      });
    });

    // Update active class on language selector buttons
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      const isCurrent = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', isCurrent);
      btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });

    // Dispatch global custom event for other modules (e.g. project modal update)
    window.dispatchEvent(new CustomEvent('portfolioLanguageChange', {
      detail: { lang, dict }
    }));
  }

  /**
   * Setup language button listeners
   */
  function initLanguageButtons() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-btn');
      if (!btn) return;
      const lang = btn.dataset.lang;
      if (lang && SUPPORTED_LANGS.includes(lang) && lang !== currentLang) {
        applyLanguage(lang);
      }
    });
  }

  // Public API exposed on window.i18n
  window.i18n = {
    get currentLang() { return currentLang; },
    get supportedLangs() { return SUPPORTED_LANGS.slice(); },
    get defaultLang() { return DEFAULT_LANG; },
    translations,
    setLanguage: applyLanguage,
    t: (key) => resolveKey(translations[currentLang] || translations[DEFAULT_LANG], key)
  };

  // Initialize on script load
  document.addEventListener('DOMContentLoaded', () => {
    initLanguageButtons();
    applyLanguage(currentLang);
  });
})();
