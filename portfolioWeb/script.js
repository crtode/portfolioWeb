const $ = (s, c = document) => c.querySelector(s),
  $$ = (s, c = document) => [...c.querySelectorAll(s)];
// Menú para móvil
const menu = $(".menu"),
  nav = $("nav");
menu.addEventListener("click", () => {
  const o = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", o);
});
$$("nav a").forEach((a) =>
  a.addEventListener("click", () => nav.classList.remove("open")),
);
// Voy mostrando las secciones cuando entran en pantalla
const observer = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        if (e.target.id === "sobre-mi") startAboutTerminal();
        if (e.target.id === "habilidades") demoSkills();
      }
    }),
  { threshold: 0.12 },
);
$$(".reveal").forEach((e) => observer.observe(e));
// Frases que van cambiando debajo de mi nombre
const words = [
  "Full Stack",
  "C# · Unity · Web",
  "Python · Java · React Native",
];
let wi = 0,
  ci = 0,
  del = false;
const typed = $("#typed");
function type() {
  const w = words[wi];
  typed.textContent = w.slice(0, ci);
  if (!del && ci < w.length) ci++;
  else if (del && ci > 0) ci--;
  else if (!del) {
    del = true;
    return setTimeout(type, 1300);
  } else {
    del = false;
    wi = (wi + 1) % words.length;
  }
  setTimeout(type, del ? 38 : 72);
}
type();
const miniWords = [
  "construyendo proyectos",
  "aprendiendo cada día",
  "resolviendo problemas",
  "buscando mi primer reto",
];
let m = 0;
setInterval(() => {
  m = (m + 1) % miniWords.length;
  $("#mini-typed").textContent = miniWords[m];
}, 2100);
// Terminal de la parte de "sobre mí"
let terminalStarted = false;
function startAboutTerminal() {
  if (terminalStarted) return;
  terminalStarted = true;
  const lines = [
    ["cmd", "> whoami"],
    ["out", "Cristina Tornero"],
    ["cmd", "> current_focus"],
    ["out hot", "Desarrollo de Aplicaciones Multiplataforma"],
    ["cmd", "> strengths"],
    ["out", "organización · adaptación · constancia"],
    ["cmd", "> next_step"],
    ["out hot", "primera oportunidad junior ✦"],
  ];
  const box = $("#about-terminal");
  let i = 0;
  function next() {
    if (i >= lines.length) return;
    const p = document.createElement("div");
    p.className = lines[i][0];
    box.appendChild(p);
    const text = lines[i][1];
    let j = 0;
    const t = setInterval(() => {
      p.textContent = text.slice(0, ++j);
      if (j >= text.length) {
        clearInterval(t);
        i++;
        setTimeout(next, 130);
      }
    }, 22);
  }
  next();
}
// Info que cambia cuando pulso cada tecnología
const skillData = {
  "C#": {
    text: "Mi lenguaje principal en los proyectos desarrollados con Unity. Lo he usado para lógica, interacción, estados y mecánicas.",
    projects: [
      "Guess Mew",
      "Memory",
      "Flappy Bird",
      "Agenda",
      "Cajero",
      "Calculadora",
    ],
    file: "Cristina.cs",
    code: 'public class Cristina : Developer {\n  string language = "C#";\n  bool building = true;\n  void Create() => Learn();\n}',
  },
  Unity: {
    text: "Motor con el que he desarrollado varias aplicaciones y videojuegos, trabajando escenas, UI, colisiones e interacción.",
    projects: [
      "Guess Mew",
      "Memory",
      "Flappy Bird",
      "Agenda",
      "Cajero",
      "Calculadora",
    ],
    file: "Scene.unity",
    code: "GameObject idea;\nidea.AddComponent<Interaction>();\n\n// play · test · improve\nBuildProject();",
  },
  JavaScript: {
    text: "Lo utilizo en desarrollo web para añadir comportamiento, animación e interacción a interfaces.",
    projects: ["Guess Mew", "Este portfolio"],
    file: "script.js",
    code: "const portfolio = {\n  interactive: true,\n  responsive: true\n};\nportfolio.build();",
  },
  "HTML / CSS": {
    text: "Base de mis proyectos web: estructura, diseño responsive, componentes y experiencia visual.",
    projects: ["Guess Mew", "Este portfolio"],
    file: "styles.css",
    code: ".portfolio {\n  display: grid;\n  personality: 100%;\n}\n@media (max-width: 600px) {\n  .portfolio { adapt: true; }\n}",
  },
  MySQL: {
    text: "Bases de datos relacionales para almacenar, relacionar y consultar información de aplicaciones.",
    projects: ["Guess Mew"],
    file: "database.sql",
    code: "SELECT project, skill\nFROM experience\nWHERE learning = TRUE\nORDER BY curiosity DESC;",
  },
  "Git / GitHub": {
    text: "Control de versiones y publicación de mis proyectos personales. Me permite trabajar con cambios de forma segura y mostrar mi evolución.",
    projects: ["Repositorios personales", "Este portfolio"],
    file: "git — main",
    code: '$ git add .\n$ git commit -m "keep building"\n$ git push origin main\n\n✓ portfolio updated',
  },
  Python: {
    text: "Tecnología que estoy aprendiendo este curso. Estoy construyendo base en sintaxis, lógica y resolución de problemas.",
    projects: ["Actualmente en formación"],
    file: "learning.py",
    code: 'skills = ["logic", "practice"]\nwhile learning:\n    skills.append("Python")',
  },
  Java: {
    text: "Lenguaje que estoy estudiando este curso dentro de DAM, reforzando programación orientada a objetos y estructura de aplicaciones.",
    projects: ["Actualmente en formación"],
    file: "Cristina.java",
    code: 'class Cristina {\n  boolean learning = true;\n  String next = "Java";\n}',
  },
  "React Native": {
    text: "Tecnología que estoy viendo este curso para ampliar mi aprendizaje hacia aplicaciones móviles multiplataforma.",
    projects: ["Actualmente en formación"],
    file: "App.jsx",
    code: 'const Cristina = () => (\n  <Learning path="React Native" />\n);',
  },
};
function selectSkill(name) {
  const b = $(`.skill-chip[data-skill="${name}"]`);
  if (!b) return;
  $$(".skill-chip").forEach((x) => x.classList.remove("active"));
  b.classList.add("active");
  const d = skillData[name];
  $("#skill-title").textContent = name;
  $("#skill-text").textContent = d.text;
  $("#skill-projects").innerHTML = d.projects
    .map((x) => `<span>${x}</span>`)
    .join("");
  $("#skill-file").textContent = d.file;
  $("#skill-code").textContent = d.code;
}
$$(".skill-chip").forEach((b) =>
  b.addEventListener("click", () => selectSkill(b.dataset.skill)),
);
let skillsDemoed = false;
function demoSkills() {
  if (skillsDemoed) return;
  skillsDemoed = true;
  setTimeout(() => selectSkill("Unity"), 600);
  setTimeout(() => selectSkill("JavaScript"), 1500);
  setTimeout(() => selectSkill("C#"), 2500);
}
// Datos de los proyectos para abrirlos en el modal
const projects = {
  guess: {
    title: "Guess Mew",
    desc: "Aplicación orientada al cuidado y gestión de mascotas, con perfiles personalizados y diferentes funcionalidades.",
    tags: ["C#", "Unity", "MySQL", "JavaScript", "HTML", "CSS"],
    video: "JugandoGuessMew(1).mp4",
  },
  memory: {
    title: "Memory",
    desc: "Juego de memoria con lógica de emparejamiento y sistema de intentos.",
    tags: ["C#", "Unity", "Game Development"],
    video: "JugandoMemory(1).mp4",
  },
  floppi: {
    title: "Flappy Bird",
    desc: "Videojuego 2D inspirado en Flappy Bird, con puntuación, obstáculos y detección de colisiones.",
    tags: ["C#", "Unity", "Game Development"],
    video: "JugandoFloppiBird(1).mp4",
  },
  agenda: {
    title: "Agenda",
    desc: "Aplicación de gestión desarrollada en Unity.",
    tags: ["C#", "Unity"],
    video: "JugandoAgenda(1).mp4",
  },
  cajero: {
    title: "Cajero automático",
    desc: "Simulación de operaciones bancarias: ingresar, retirar y consultar saldo.",
    tags: ["C#", "Unity"],
    video: "JugandoCajero(1).mp4",
  },
  calculadora: {
    title: "Calculadora",
    desc: "Calculadora funcional con operaciones matemáticas y control de errores.",
    tags: ["C#", "Unity"],
    video: "JugandoCalculadora(1).mp4",
  },
};
const modal = $(".modal"),
  mv = $(".modal video");
function openProject(k) {
  const p = projects[k];
  $(".modal-info h2").textContent = p.title;
  $(".modal-info p").textContent = p.desc;
  $(".modal-info .tags").innerHTML = p.tags
    .map((t) => `<span>${t}</span>`)
    .join("");
  mv.src = p.video;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  mv.pause();
  mv.removeAttribute("src");
  mv.load();
  document.body.style.overflow = "";
}
$$(".project").forEach((p) => {
  p.addEventListener("click", () => openProject(p.dataset.project));
  const v = $("video", p);
  if (v) {
    p.addEventListener("mouseenter", () => v.play().catch(() => {}));
    p.addEventListener("mouseleave", () => {
      v.pause();
      v.currentTime = 0;
    });
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting && innerWidth < 700) v.play().catch(() => {});
          else if (innerWidth < 700) v.pause();
        }),
      { threshold: 0.6 },
    );
    io.observe(p);
  }
});
$(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
// Movimiento del coche en la cronología
// La idea es que empiece casi al llegar a la sección y avance con calma mientras sigo bajando.
let carP = 0;

function renderJourney(p) {
  p = Math.max(0, Math.min(1, p));
  carP = p;

  const prog = $(".journey-progress"),
    car = $(".car");

  if (!car || !prog) return;

  if (innerWidth <= 900) {
    prog.style.height = p * 100 + "%";
    car.style.top = p * 100 + "%";
  } else {
    prog.style.width = p * 100 + "%";
    car.style.left = p * 100 + "%";
  }

  // Voy activando cada etapa cuando el coche se acerca a ella
  $$(".journey article").forEach((a, i) =>
    a.classList.toggle("active", p >= i / 3 - 0.08),
  );
}

function updateJourneyFromScroll() {
  const section = $("#formacion");
  if (!section) return;

  const r = section.getBoundingClientRect();

  // Empieza cuando la sección ya está entrando de verdad en pantalla.
  // Antes empezaba demasiado pronto y al llegar el coche ya iba por media línea.
  const start = innerHeight * 0.78;

  // Más recorrido = movimiento más lento y más agradable.
  // Si algún día lo quiero todavía más lento, solo tengo que subir 1.35.
  const travel = Math.max(innerHeight * 1.35, r.height + innerHeight * 0.65);

  const p = (start - r.top) / travel;
  renderJourney(p);
}

function initJourney() {
  updateJourneyFromScroll();
  addEventListener("scroll", updateJourneyFromScroll, { passive: true });
  addEventListener("resize", updateJourneyFromScroll);
}

initJourney();

// Brillo del ratón y efecto suave de las tarjetas
if (matchMedia("(pointer:fine)").matches) {
  const glow = $(".cursor-glow");
  addEventListener("pointermove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
  $$(".tilt").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translateY(-2px)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });
}
