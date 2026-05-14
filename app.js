const DB_NAME = "levain-routine-db";
const STORE_NAME = "state";
const STATE_KEY = "main";
const LS_KEY = "levain-routine-state-fallback";

const dayLabels = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const shortDayLabels = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

const baseSteps = [
  {
    id: "storage",
    order: 1,
    title: "Stockage au froid",
    short: "Le levain reste au frigo quand il n’est pas utilisé.",
    duration: "En continu",
    defaultOffsetHours: -120,
    guide: {
      principle: "Le froid ralentit fortement l’activité du levain. Il reste vivant, mais il consomme moins vite sa nourriture.",
      what: "Conserver le levain dans un pot propre, couvert sans serrage excessif. Laisser un peu de volume libre, car un levain peut encore produire du gaz au frigo.",
      why: "Cette phase évite de devoir nourrir le levain tous les jours. Elle rend la routine compatible avec une semaine de travail.",
      how: "Après un rafraîchi, laisser le levain une heure à température ambiante, puis le remettre au réfrigérateur. Noter la date du dernier entretien dans l’application.",
      variants: "Si vous faites du pain plusieurs fois par semaine, vous pouvez garder davantage de levain. Si vous faites du pain rarement, gardez une petite quantité, par exemple 20 à 30 g."
    },
    checklist: [
      "Pot propre et assez grand.",
      "Couvercle posé ou fermé sans excès de pression.",
      "Date du dernier rafraîchi notée.",
      "Absence de moisissure visible.",
      "Odeur acide mais non putride."
    ],
    defaultQuantities: { levain: 30, water: 0, flour: 0 }
  },
  {
    id: "maintenance-feed",
    order: 2,
    title: "Entretien hebdomadaire",
    short: "Un petit rafraîchi maintient le levain en forme.",
    duration: "5 min, puis 1 h à température ambiante",
    defaultOffsetHours: -96,
    guide: {
      principle: "Rafraîchir signifie garder une partie du levain et lui ajouter de l’eau et de la farine.",
      what: "Garder une petite base de levain, puis ajouter eau et farine. Un ratio simple pour débuter est 1:2:2, par exemple 20 g de levain, 40 g d’eau et 40 g de farine.",
      why: "Le levain consomme les sucres disponibles dans la farine. Sans apport régulier, il s’acidifie, s’affaiblit et devient moins prévisible.",
      how: "Mélanger jusqu’à obtenir une pâte homogène. Laisser environ une heure à température ambiante, puis remettre au frigo. Il n’est pas nécessaire d’attendre le doublement pour un simple entretien.",
      variants: "En période chaude, utilisez un ratio plus élevé, comme 1:3:3, ou remettez plus vite au frigo. En période froide, laissez un peu plus longtemps à température ambiante."
    },
    checklist: [
      "Sortir le levain du frigo.",
      "Garder seulement la quantité utile.",
      "Ajouter l’eau et mélanger.",
      "Ajouter la farine et homogénéiser.",
      "Noter l’heure du rafraîchi.",
      "Remettre au frigo après environ une heure."
    ],
    defaultQuantities: { levain: 20, water: 40, flour: 40 }
  },
  {
    id: "build-starter",
    order: 3,
    title: "Construction du levain de panification",
    short: "Préparer assez de levain actif pour le pain.",
    duration: "8 à 12 h selon température",
    defaultOffsetHours: -22,
    guide: {
      principle: "Avant de faire du pain, il faut un levain actif, capable de faire lever la pâte. On le construit souvent la veille au soir.",
      what: "Prélever une petite quantité de levain mère, puis ajouter l’eau et la farine pour obtenir la quantité nécessaire à la recette.",
      why: "Un levain qui sort directement du frigo est souvent trop lent. Le construire à l’avance permet d’obtenir un levain au pic, riche en bulles et suffisamment puissant.",
      how: "Mélanger, couvrir et laisser à température ambiante. Il est prêt quand il a bien gonflé, qu’il présente de nombreuses bulles et que son odeur est acide mais agréable.",
      variants: "Pour une nuit longue ou une pièce chaude, utilisez un ratio 1:4:4 ou 1:5:5. Pour une activation plus rapide, utilisez 1:2:2."
    },
    checklist: [
      "Calculer la quantité finale de levain nécessaire.",
      "Prélever le levain mère.",
      "Ajouter l’eau.",
      "Ajouter la farine.",
      "Marquer le niveau sur le pot.",
      "Laisser à température ambiante jusqu’au pic."
    ],
    defaultQuantities: { levain: 20, water: 60, flour: 60 }
  },
  {
    id: "mix-dough",
    order: 4,
    title: "Préparation de la pâte",
    short: "Mélanger farine, eau, levain et sel.",
    duration: "20 à 40 min avec les temps de repos",
    defaultOffsetHours: -12,
    guide: {
      principle: "La pâte commence à se structurer dès que la farine rencontre l’eau. Le levain lance ensuite la fermentation.",
      what: "Mélanger l’eau et la farine, laisser reposer si possible, puis incorporer le levain actif et le sel. Le pétrissage peut rester modéré pour un premier pain.",
      why: "Cette étape répartit l’eau, le sel et le levain. Une pâte bien homogène fermente plus régulièrement.",
      how: "Utiliser une balance. Mélanger jusqu’à ne plus voir de farine sèche. Pour un pain de blé, la pâte doit devenir souple. Pour un pain sans gluten, elle ressemble davantage à une pâte épaisse qu’à une pâte élastique.",
      variants: "La machine à pain peut servir au mélange ou au pétrissage, mais il vaut mieux éviter le programme complet au levain au début, car les temps automatiques sont souvent trop courts."
    },
    checklist: [
      "Peser la farine.",
      "Peser l’eau en tenant compte de l’eau déjà présente dans le levain.",
      "Ajouter le levain actif.",
      "Ajouter le sel.",
      "Mélanger jusqu’à homogénéité.",
      "Noter la température approximative de la pièce."
    ],
    defaultQuantities: { flour: 500, water: 325, levain: 100, salt: 10 }
  },
  {
    id: "bulk-fermentation",
    order: 5,
    title: "Fermentation en vrac",
    short: "La pâte développe arômes, gaz et structure.",
    duration: "4 à 7 h",
    defaultOffsetHours: -10.5,
    guide: {
      principle: "C’est la fermentation principale. Les micro-organismes du levain produisent du gaz et acidifient progressivement la pâte.",
      what: "Laisser la pâte dans un saladier ou un bac. Faire éventuellement des rabats toutes les 30 à 60 minutes au début.",
      why: "Cette phase conditionne le volume, le goût et une partie de la digestibilité. Pour une approche low FODMAP, une fermentation suffisamment longue est un levier utile, sans garantie individuelle.",
      how: "Surveiller davantage l’aspect que l’horloge. La pâte doit gonfler, devenir plus aérée et montrer des bulles. Éviter de la laisser s’effondrer.",
      variants: "S’il fait chaud, raccourcir. S’il fait frais, allonger. Pour une pâte sans gluten, les rabats sont souvent moins utiles, car il n’y a pas de réseau de gluten à renforcer."
    },
    checklist: [
      "Couvrir le récipient.",
      "Noter l’heure de début.",
      "Faire un premier rabat si la pâte s’y prête.",
      "Observer le volume et les bulles.",
      "Noter les signes de fermentation.",
      "Arrêter avant que la pâte ne retombe."
    ],
    defaultQuantities: {}
  },
  {
    id: "shape",
    order: 6,
    title: "Façonnage",
    short: "Donner sa forme au pain et préparer la dernière pousse.",
    duration: "15 à 30 min",
    defaultOffsetHours: -4.5,
    guide: {
      principle: "Le façonnage organise la pâte pour qu’elle pousse et cuise correctement.",
      what: "Déposer la pâte sur le plan de travail, la mettre en forme, puis la placer dans un banneton, un moule ou un récipient fariné.",
      why: "Une pâte correctement façonnée garde mieux les gaz produits pendant la fermentation. Le pain s’étale moins et gagne en régularité.",
      how: "Manipuler sans écraser complètement. Pour un premier essai, privilégier un façonnage simple en boule ou un moule.",
      variants: "Pour le sans gluten, le moule est souvent plus fiable qu’un façonnage libre. Pour une pâte très hydratée, utilisez des mains légèrement humides."
    },
    checklist: [
      "Fariner ou humidifier légèrement le plan de travail selon la pâte.",
      "Sortir la pâte délicatement.",
      "Mettre en forme sans trop dégazer.",
      "Préparer le banneton ou le moule.",
      "Noter l’heure de fin de façonnage."
    ],
    defaultQuantities: {}
  },
  {
    id: "proof",
    order: 7,
    title: "Apprêt final",
    short: "La pâte termine sa pousse avant cuisson.",
    duration: "2 à 5 h, ou 8 à 14 h au frigo",
    defaultOffsetHours: -4,
    guide: {
      principle: "L’apprêt est la dernière fermentation avant cuisson. Il termine le développement du volume.",
      what: "Laisser le pain façonné pousser à température ambiante, ou le placer au froid pour une pousse lente.",
      why: "Un apprêt trop court donne un pain dense. Un apprêt trop long donne une pâte fragile qui s’affaisse.",
      how: "Faire le test du doigt sur une pâte de blé. Une légère empreinte doit revenir lentement. Pour une pâte sans gluten, surveiller surtout le gonflement visuel.",
      variants: "L’apprêt au frigo est pratique pour cuire le dimanche matin et il donne souvent plus de marge d’organisation."
    },
    checklist: [
      "Couvrir le pain façonné.",
      "Choisir température ambiante ou frigo.",
      "Noter l’heure de début.",
      "Observer le volume.",
      "Préchauffer le four avant la fin de l’apprêt."
    ],
    defaultQuantities: {}
  },
  {
    id: "bake",
    order: 8,
    title: "Cuisson",
    short: "Four chaud, vapeur au départ, puis cuisson plus sèche.",
    duration: "40 à 55 min",
    defaultOffsetHours: 0,
    guide: {
      principle: "La chaleur fixe la structure du pain. La vapeur des premières minutes aide le développement et la croûte.",
      what: "Préchauffer le four. Enfourner le pain, idéalement avec vapeur au début ou dans une cocotte. Baisser ensuite légèrement la température.",
      why: "Un four bien chaud favorise l’expansion initiale. Une cuisson suffisante évite une mie humide ou collante.",
      how: "Avec chaleur tournante, commencez plutôt à 230 à 240 °C, puis baissez vers 200 à 210 °C. Surveiller car la chaleur tournante colore plus vite.",
      variants: "En cocotte, gardez le couvercle environ 20 minutes, puis terminez sans couvercle. En machine à pain, utilisez plutôt le pétrissage ou la cuisson seule si le modèle le permet."
    },
    checklist: [
      "Préchauffer suffisamment le four.",
      "Préparer vapeur, plaque chaude ou cocotte.",
      "Grigner si la pâte s’y prête.",
      "Cuire avec vapeur au début.",
      "Terminer la cuisson à température plus modérée.",
      "Noter le résultat."
    ],
    defaultQuantities: {}
  },
  {
    id: "cool",
    order: 9,
    title: "Refroidissement",
    short: "La mie se stabilise avant découpe.",
    duration: "2 à 4 h minimum",
    defaultOffsetHours: 1,
    guide: {
      principle: "Le pain continue d’évoluer après la sortie du four. La vapeur interne se répartit et la mie se stabilise.",
      what: "Laisser le pain refroidir sur grille. Éviter de le couper trop tôt, surtout s’il contient beaucoup d’eau ou des farines sans gluten.",
      why: "Une découpe trop rapide peut donner une mie collante, même si le pain est correctement cuit.",
      how: "Attendre au moins deux heures. Pour un pain sans gluten ou très hydraté, attendre davantage.",
      variants: "Si vous voulez du pain chaud, prévoyez un petit pain à part. Gardez le pain principal pour une découpe plus tardive."
    },
    checklist: [
      "Sortir le pain du moule ou de la cocotte.",
      "Le placer sur une grille.",
      "Attendre avant de couper.",
      "Noter l’aspect de la croûte et de la mie.",
      "Évaluer la tolérance après consommation."
    ],
    defaultQuantities: {}
  },
  {
    id: "save-starter",
    order: 10,
    title: "Remettre le levain au frigo",
    short: "Garder une base saine pour la prochaine semaine.",
    duration: "5 à 10 min",
    defaultOffsetHours: 2,
    guide: {
      principle: "La routine se termine en conservant une petite quantité de levain mère pour la prochaine fournée.",
      what: "Vérifier qu’il reste assez de levain. Si nécessaire, faire un petit rafraîchi avant de le remettre au frigo.",
      why: "Cela évite de tout utiliser dans le pain et sécurise la semaine suivante.",
      how: "Garder 20 à 30 g. Ajouter eau et farine si le levain est faible ou si le pot est presque vide. Noter la date.",
      variants: "Si vous avez déjà entretenu le levain et qu’il est en bon état, vous pouvez simplement le remettre au froid."
    },
    checklist: [
      "Vérifier la quantité restante.",
      "Garder 20 à 30 g minimum.",
      "Rafraîchir si nécessaire.",
      "Noter la date du stockage.",
      "Remettre au frigo."
    ],
    defaultQuantities: { levain: 20, water: 40, flour: 40 }
  }
];

const defaultState = {
  version: 1,
  theme: "light",
  settings: {
    routineMode: "saturday-evening",
    targetDay: 6,
    targetTime: "19:00",
    roomTemp: "mild",
    totalFlour: 500,
    hydration: 75,
    starterGrams: 70,
    doughType: "wheat"
  },
  stepState: {},
  notes: "",
  journalNotes: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

let db = null;
let state = structuredClone(defaultState);
let currentStepId = null;
let editingNoteId = null;
let deferredInstallPrompt = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function createNoteId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function openDb() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB indisponible"));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function dbGet(key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function dbSet(key, value) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(value, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function loadState() {
  try {
    db = await openDb();
    const saved = await dbGet(STATE_KEY);
    if (saved) {
      state = mergeState(saved);
      return;
    }
  } catch (err) {
    console.warn("IndexedDB non disponible, usage du repli localStorage", err);
  }

  const fallback = localStorage.getItem(LS_KEY);
  if (fallback) {
    try {
      state = mergeState(JSON.parse(fallback));
    } catch (err) {
      console.warn("Échec de lecture du repli localStorage", err);
    }
  }
}

function mergeState(saved) {
  const merged = clone(defaultState);
  merged.version = saved.version || defaultState.version;
  merged.theme = saved.theme || defaultState.theme;
  merged.settings = { ...defaultState.settings, ...(saved.settings || {}) };
  if (!Number.isFinite(Number(merged.settings.starterGrams))) {
    const legacyStarter = Number(saved.settings?.starterPercent);
    if (Number.isFinite(legacyStarter)) {
      merged.settings.starterGrams = legacyStarter > 40
        ? legacyStarter
        : Math.round((Number(merged.settings.totalFlour) || defaultState.settings.totalFlour) * legacyStarter / 100);
    }
  }
  merged.stepState = saved.stepState || {};
  merged.notes = saved.notes || "";
  const legacyNotes = typeof saved.notes === "string" ? saved.notes.trim() : "";
  merged.journalNotes = Array.isArray(saved.journalNotes)
    ? saved.journalNotes.map(normalizeNote).filter(Boolean)
    : legacyNotes
      ? [{ id: createNoteId(), content: legacyNotes, pinned: false, createdAt: saved.updatedAt || new Date().toISOString(), updatedAt: saved.updatedAt || new Date().toISOString() }]
      : [];
  merged.createdAt = saved.createdAt || new Date().toISOString();
  merged.updatedAt = saved.updatedAt || new Date().toISOString();
  return merged;
}

async function saveState() {
  state.updatedAt = new Date().toISOString();
  localStorage.setItem(LS_KEY, JSON.stringify(state));
  if (db) {
    try {
      await dbSet(STATE_KEY, state);
    } catch (err) {
      console.warn("Échec de sauvegarde IndexedDB", err);
    }
  }
}

function parseTargetDate() {
  const now = new Date();
  const targetDay = Number(state.settings.targetDay);
  const [hours, minutes] = state.settings.targetTime.split(":").map(Number);
  const target = new Date(now);
  target.setHours(hours, minutes, 0, 0);
  const currentDay = target.getDay();
  let diff = targetDay - currentDay;
  if (diff < 0 || (diff === 0 && target <= now)) diff += 7;
  target.setDate(target.getDate() + diff);
  return target;
}

function hoursToMs(hours) {
  return hours * 60 * 60 * 1000;
}

function formatDateTime(date) {
  if (!date) return "Non planifié";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "Non planifié";
  const day = shortDayLabels[d.getDay()];
  const dateText = d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
  const timeText = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  return `${day} ${dateText} à ${timeText}`;
}

function formatInputDateTime(date) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function inputDateTimeToIso(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function getDurationAdjustment() {
  if (state.settings.roomTemp === "cool") return 1.2;
  if (state.settings.roomTemp === "warm") return 0.8;
  return 1;
}

function getPlannedSteps() {
  const target = parseTargetDate();
  const steps = clone(baseSteps);
  const mode = state.settings.routineMode;
  let offsets = new Map(steps.map((step) => [step.id, step.defaultOffsetHours]));

  if (mode === "sunday-morning") {
    offsets = new Map([
      ["storage", -144],
      ["maintenance-feed", -116],
      ["build-starter", -35],
      ["mix-dough", -20],
      ["bulk-fermentation", -19],
      ["shape", -14.5],
      ["proof", -14],
      ["bake", 0],
      ["cool", 1],
      ["save-starter", 2]
    ]);
  }

  if (mode === "manual") {
    return steps.map((step) => {
      const saved = state.stepState[step.id] || {};
      return {
        ...step,
        plannedAt: saved.plannedAt || null
      };
    });
  }

  const adjustment = getDurationAdjustment();
  return steps.map((step) => {
    const baseOffset = offsets.get(step.id) ?? step.defaultOffsetHours;
    const offset = step.id === "bake" || step.id === "cool" || step.id === "save-starter" ? baseOffset : baseOffset * adjustment;
    const plannedAt = new Date(target.getTime() + hoursToMs(offset));
    const saved = state.stepState[step.id] || {};
    return {
      ...step,
      plannedAt: saved.plannedAt || plannedAt.toISOString()
    };
  });
}

function getStepSaved(stepId) {
  if (!state.stepState[stepId]) {
    state.stepState[stepId] = {
      checked: {},
      startedAt: null,
      completedAt: null,
      plannedAt: null,
      quantities: {},
      notes: ""
    };
  }
  return state.stepState[stepId];
}

function isStepCompleted(step) {
  const saved = getStepSaved(step.id);
  return Boolean(saved.completedAt);
}

function renderAll() {
  applyTheme();
  hydrateSettingsForm();
  renderTimeline();
  renderSummary();
  renderCalculators();
  renderStorageStatus();
  renderQuickTiles();
  renderNotes();
}

function applyTheme() {
  document.body.classList.toggle("dark", state.theme === "dark");
  $("#themeBtn").textContent = state.theme === "dark" ? "Mode clair" : "Mode sombre";
}

function hydrateSettingsForm() {
  $("#routineMode").value = state.settings.routineMode;
  $("#targetDay").value = String(state.settings.targetDay);
  $("#targetTime").value = state.settings.targetTime;
  $("#roomTemp").value = state.settings.roomTemp;
  $("#totalFlour").value = state.settings.totalFlour;
  $("#hydration").value = state.settings.hydration;
  $("#starterGrams").value = state.settings.starterGrams;
  $("#doughType").value = state.settings.doughType;
}

function readSettingsForm() {
  state.settings.routineMode = $("#routineMode").value;
  state.settings.targetDay = Number($("#targetDay").value);
  state.settings.targetTime = $("#targetTime").value || "19:00";
  state.settings.roomTemp = $("#roomTemp").value;
  state.settings.totalFlour = Number($("#totalFlour").value || 500);
  state.settings.hydration = Number($("#hydration").value || 75);
  state.settings.starterGrams = Number($("#starterGrams").value || 70);
  state.settings.doughType = $("#doughType").value;
}

function renderTimeline() {
  const timeline = $("#timeline");
  const steps = getPlannedSteps();
  timeline.innerHTML = "";

  steps.forEach((step) => {
    const saved = getStepSaved(step.id);
    const completed = Boolean(saved.completedAt);
    const started = Boolean(saved.startedAt);
    const card = document.createElement("button");
    card.className = `step-card ${completed ? "completed" : ""}`;
    card.type = "button";
    card.dataset.stepId = step.id;
    card.setAttribute("aria-label", `Ouvrir ${step.title}`);

    const status = completed ? "Terminé" : started ? "En cours" : "À faire";
    const planned = saved.plannedAt || step.plannedAt;

    card.innerHTML = `
      <div class="step-index">${step.order}</div>
      <div>
        <div class="step-title">${escapeHtml(step.title)}</div>
        <p class="step-meta">${escapeHtml(step.short)}</p>
        <p class="step-time">Prévu&nbsp;: ${escapeHtml(formatDateTime(planned))}. Durée&nbsp;: ${escapeHtml(step.duration)}</p>
      </div>
      <div class="step-status">${status}</div>
    `;
    card.addEventListener("click", () => openStepModal(step.id));
    timeline.appendChild(card);
  });
}

function renderSummary() {
  const steps = getPlannedSteps();
  const completed = steps.filter(isStepCompleted).length;
  const progress = Math.round((completed / steps.length) * 100);
  $("#progressBar").style.width = `${progress}%`;
  $("#progressText").textContent = `${completed} étape${completed > 1 ? "s" : ""} terminée${completed > 1 ? "s" : ""} sur ${steps.length}`;

  const now = new Date();
  const next = steps.find((step) => !isStepCompleted(step));
  if (!next) {
    $("#nextActionTitle").textContent = "Cycle terminé";
    $("#nextActionMeta").textContent = "Vous pouvez réinitialiser la semaine ou conserver le journal comme historique.";
    return;
  }

  const saved = getStepSaved(next.id);
  const plannedAt = saved.plannedAt || next.plannedAt;
  const planned = plannedAt ? new Date(plannedAt) : null;
  let delayText = "Aucune heure planifiée.";
  if (planned && !Number.isNaN(planned.getTime())) {
    const diffMs = planned.getTime() - now.getTime();
    const diffHours = Math.round(diffMs / 36_000) / 100;
    if (diffMs < 0) {
      delayText = `Prévu ${formatDateTime(planned)}. Cette étape est en retard d’environ ${Math.abs(diffHours).toFixed(1)} h.`;
    } else {
      delayText = `Prévu ${formatDateTime(planned)}, dans environ ${diffHours.toFixed(1)} h.`;
    }
  }

  $("#nextActionTitle").textContent = next.title;
  $("#nextActionMeta").textContent = delayText;
}

function calcFeed(seed, ratio) {
  const water = seed * ratio;
  const flour = seed * ratio;
  const total = seed + water + flour;
  return { seed, water, flour, total };
}

function calcBuild(target, ratio) {
  const seed = target / (1 + ratio * 2);
  const water = seed * ratio;
  const flour = seed * ratio;
  return { seed, water, flour, total: seed + water + flour };
}

function calcDough() {
  const flour = Number(state.settings.totalFlour || 500);
  let hydration = Number(state.settings.hydration || 75);
  const starterGrams = Number(state.settings.starterGrams || 70);
  const doughType = state.settings.doughType;

  if (doughType === "gluten-free" && hydration < 85) hydration = 90;

  const levain = Math.max(0, starterGrams);
  const flourInLevain = levain / 2;
  const waterInLevain = levain / 2;
  const totalWaterWanted = flour * hydration / 100;
  const addedWater = Math.max(0, totalWaterWanted - waterInLevain);
  const addedFlour = Math.max(0, flour - flourInLevain);
  const salt = flour * 0.02;
  const psyllium = doughType === "gluten-free" ? flour * 0.03 : 0;
  const rawDough = levain + addedFlour + addedWater + salt + psyllium;
  const estimatedBaked = rawDough * 0.86;
  return { flour, hydration, starterGrams, levain, flourInLevain, waterInLevain, totalWaterWanted, addedWater, addedFlour, salt, psyllium, rawDough, estimatedBaked, doughType };
}

function renderCalculators() {
  const feedSeed = Number($("#feedSeed")?.value || 20);
  const feedRatio = Number($("#feedRatio")?.value || 2);
  const feed = calcFeed(feedSeed, feedRatio);
  $("#feedResult").innerHTML = `Garder <strong>${round(feed.seed)} g</strong> de levain, ajouter <strong>${round(feed.water)} g</strong> d’eau et <strong>${round(feed.flour)} g</strong> de farine. Total obtenu&nbsp;: <strong>${round(feed.total)} g</strong>.`;

  const buildTarget = Number($("#buildTarget")?.value || 150);
  const buildRatio = Number($("#buildRatio")?.value || 3);
  const build = calcBuild(buildTarget, buildRatio);
  $("#buildResult").innerHTML = `Pour environ <strong>${round(build.total)} g</strong> de levain actif&nbsp;: <strong>${round(build.seed)} g</strong> de levain mère, <strong>${round(build.water)} g</strong> d’eau, <strong>${round(build.flour)} g</strong> de farine.`;

  const dough = calcDough();
  const psylliumText = dough.psyllium ? ` Ajouter aussi environ <strong>${round(dough.psyllium)} g</strong> de psyllium.` : "";
  $("#doughResult").innerHTML = `Pour <strong>${round(dough.flour)} g</strong> de farine totale et <strong>${round(dough.levain)} g</strong> de levain actif, ajouter <strong>${round(dough.addedFlour)} g</strong> de farine, <strong>${round(dough.addedWater)} g</strong> d’eau et <strong>${round(dough.salt)} g</strong> de sel.${psylliumText} Le levain apporte déjà <strong>${round(dough.flourInLevain)} g</strong> de farine et <strong>${round(dough.waterInLevain)} g</strong> d’eau. Pâte avant cuisson&nbsp;: environ <strong>${round(dough.rawDough)} g</strong>. Pain cuit estimé&nbsp;: environ <strong>${round(dough.estimatedBaked)} g</strong>.`;
}

function round(value) {
  return Math.round(value * 10) / 10;
}

function renderStorageStatus() {
  const details = [];
  if ("indexedDB" in window) details.push("IndexedDB actif");
  else details.push("IndexedDB indisponible");
  if ("serviceWorker" in navigator) details.push("mode hors ligne possible");
  const updated = new Date(state.updatedAt).toLocaleString("fr-FR");
  const apply = (status) => {
    const statusText = status ? "Persistance renforcée" : "Persistance standard";
    $("#storageStatus").textContent = statusText;
    $("#storageDetails").textContent = `${details.join(", ")}. Dernière sauvegarde : ${updated}.`;
    const tile = $("#storageTileStatus");
    if (tile) tile.textContent = `${statusText}. Sauvegarde : ${updated}`;
  };
  if (navigator.storage?.persisted) {
    navigator.storage.persisted().then(apply);
  } else {
    apply(false);
  }
}

function renderQuickTiles() {
  const routineLabels = {
    "saturday-evening": "Cuisson samedi soir",
    "sunday-morning": "Cuisson dimanche matin",
    manual: "Planning libre"
  };
  const day = dayLabels[Number(state.settings.targetDay)] || "jour à définir";
  const settingsTile = $("#settingsTileStatus");
  if (settingsTile) {
    settingsTile.textContent = `${routineLabels[state.settings.routineMode] || "Routine"}. ${day} à ${state.settings.targetTime}`;
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openStepModal(stepId) {
  currentStepId = stepId;
  const step = getPlannedSteps().find((item) => item.id === stepId);
  const saved = getStepSaved(stepId);
  $("#modalStage").textContent = `Étape ${step.order}`;
  $("#modalTitle").textContent = step.title;
  $("#modalMeta").textContent = `Durée conseillée : ${step.duration}. Prévu : ${formatDateTime(saved.plannedAt || step.plannedAt)}.`;
  renderModalGuide(step);
  renderModalChecklist(step, saved);
  renderModalTracking(step, saved);
  renderModalVariants(step);
  setActiveTab("guide");
  $("#stepModal").showModal();
}

function renderModalGuide(step) {
  const guide = step.guide;
  $("#tab-guide").innerHTML = `
    ${guideBlock("Principe", guide.principle)}
    ${guideBlock("Ce qu’il faut faire", guide.what)}
    ${guideBlock("Pourquoi", guide.why)}
    ${guideBlock("Comment", guide.how)}
  `;
}

function guideBlock(title, text) {
  return `<article class="guide-section"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`;
}

function renderModalChecklist(step, saved) {
  const items = step.checklist.map((item, index) => {
    const checked = saved.checked?.[index] ? "checked" : "";
    return `
      <label class="check-item">
        <input type="checkbox" data-check-index="${index}" ${checked}>
        <span>${escapeHtml(item)}</span>
      </label>
    `;
  }).join("");
  $("#tab-checklist").innerHTML = `<div>${items}</div>`;
}

function renderModalTracking(step, saved) {
  const quantities = { ...(step.defaultQuantities || {}), ...(saved.quantities || {}) };
  const quantityFields = Object.keys(quantities).map((key) => {
    const label = quantityLabel(key);
    return `<label><span>${label}</span><input type="number" step="1" data-quantity="${key}" value="${escapeHtml(quantities[key])}"></label>`;
  }).join("");

  const planned = saved.plannedAt || step.plannedAt;
  $("#tab-tracking").innerHTML = `
    <div class="tracking-grid">
      <label><span>Date et heure prévues</span><input id="modalPlannedAt" type="datetime-local" value="${formatInputDateTime(planned)}"></label>
      <label><span>Début réel</span><input id="modalStartedAt" type="datetime-local" value="${formatInputDateTime(saved.startedAt)}"></label>
      <label><span>Fin réelle</span><input id="modalCompletedAt" type="datetime-local" value="${formatInputDateTime(saved.completedAt)}"></label>
      <label><span>Statut</span><select id="modalStatus"><option value="todo">À faire</option><option value="started">En cours</option><option value="done">Terminé</option></select></label>
    </div>
    <div class="tracking-actions">
      <button type="button" class="btn btn-secondary" id="markStartedBtn">Marquer commencé maintenant</button>
      <button type="button" class="btn btn-secondary" id="markDoneBtn">Marquer terminé maintenant</button>
      <button type="button" class="btn btn-ghost" id="clearStepBtn">Effacer cette étape</button>
    </div>
    <h3>Quantités</h3>
    <div class="tracking-grid">${quantityFields || "<p class='muted'>Aucune quantité spécifique à noter pour cette étape.</p>"}</div>
    <h3>Notes d’étape</h3>
    <textarea id="modalStepNotes" rows="5" placeholder="Texture, odeur, température, écart de timing, résultat.">${escapeHtml(saved.notes || "")}</textarea>
  `;

  const status = saved.completedAt ? "done" : saved.startedAt ? "started" : "todo";
  $("#modalStatus").value = status;

  $("#markStartedBtn").addEventListener("click", () => {
    $("#modalStartedAt").value = formatInputDateTime(new Date());
    $("#modalStatus").value = "started";
  });
  $("#markDoneBtn").addEventListener("click", () => {
    const now = new Date();
    if (!$("#modalStartedAt").value) $("#modalStartedAt").value = formatInputDateTime(now);
    $("#modalCompletedAt").value = formatInputDateTime(now);
    $("#modalStatus").value = "done";
  });
  $("#clearStepBtn").addEventListener("click", () => {
    state.stepState[step.id] = {
      checked: {},
      startedAt: null,
      completedAt: null,
      plannedAt: null,
      quantities: {},
      notes: ""
    };
    saveState().then(() => {
      openStepModal(step.id);
      renderAll();
      showToast("Étape effacée.");
    });
  });
}

function renderModalVariants(step) {
  const fodmapAdvice = getFodmapAdvice(step.id);
  $("#tab-variants").innerHTML = `
    ${guideBlock("Variantes et adaptations", step.guide.variants)}
    ${guideBlock("Repère low FODMAP", fodmapAdvice)}
  `;
}

function getFodmapAdvice(stepId) {
  const map = {
    storage: "Le levain de seigle peut rester votre levain mère. Pour la pâte finale, ajustez les farines selon votre tolérance et vos objectifs.",
    "maintenance-feed": "Le seigle fermente facilement, mais il est riche en fructanes. Si vous utilisez très peu de levain mère dans le pain final, l’impact peut rester limité, à tester selon tolérance.",
    "build-starter": "Une fermentation longue peut réduire une partie des fructanes, mais ne transforme pas automatiquement un pain riche en blé ou en seigle en pain toléré par tous.",
    "mix-dough": "Pour un essai prudent, notez précisément les farines, la quantité consommée et la tolérance. Les pains sans gluten demandent souvent psyllium et hydratation plus élevée.",
    "bulk-fermentation": "C’est l’étape la plus intéressante pour travailler la digestibilité. Ne cherchez pas seulement le volume, notez aussi la durée réelle et la température.",
    shape: "Le façonnage ne change pas directement la teneur en FODMAP, mais une pâte bien structurée supporte mieux les fermentations longues.",
    proof: "L’apprêt au froid est pratique et peut prolonger la fermentation sans bloquer votre journée. Surveillez toutefois le risque de sur-fermentation.",
    bake: "La cuisson ne supprime pas les FODMAP. Elle stabilise le pain. La tolérance dépend surtout des ingrédients, de la fermentation et de la portion.",
    cool: "Attendre le refroidissement améliore la découpe et l’évaluation. Notez la portion réellement consommée.",
    "save-starter": "Garder un levain mère régulier aide à comparer les essais d’une semaine à l’autre."
  };
  return map[stepId] || "Notez systématiquement vos essais pour relier ingrédients, fermentation et tolérance personnelle.";
}

function quantityLabel(key) {
  const labels = {
    levain: "Levain, g",
    water: "Eau, g",
    flour: "Farine, g",
    salt: "Sel, g"
  };
  return labels[key] || key;
}

function setActiveTab(tabName) {
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  $$(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === `tab-${tabName}`));
}

async function saveModalStep() {
  if (!currentStepId) return;
  const step = getPlannedSteps().find((item) => item.id === currentStepId);
  const saved = getStepSaved(currentStepId);
  saved.checked = {};
  $$("[data-check-index]").forEach((checkbox) => {
    saved.checked[checkbox.dataset.checkIndex] = checkbox.checked;
  });

  saved.plannedAt = inputDateTimeToIso($("#modalPlannedAt")?.value);
  const status = $("#modalStatus")?.value || "todo";
  saved.startedAt = inputDateTimeToIso($("#modalStartedAt")?.value);
  saved.completedAt = inputDateTimeToIso($("#modalCompletedAt")?.value);

  if (status === "todo") {
    saved.startedAt = null;
    saved.completedAt = null;
  }
  if (status === "started" && !saved.startedAt) saved.startedAt = new Date().toISOString();
  if (status === "done" && !saved.completedAt) saved.completedAt = new Date().toISOString();
  if (status === "done" && !saved.startedAt) saved.startedAt = saved.completedAt;

  saved.quantities = {};
  $$("[data-quantity]").forEach((input) => {
    saved.quantities[input.dataset.quantity] = Number(input.value || 0);
  });
  saved.notes = $("#modalStepNotes")?.value || "";

  propagateAfterStep(step, saved);
  await saveState();
  renderAll();
  showToast("Étape enregistrée.");
}

function propagateAfterStep(step, saved) {
  if (!saved.completedAt) return;
  const ordered = getPlannedSteps();
  const index = ordered.findIndex((item) => item.id === step.id);
  if (index < 0 || index >= ordered.length - 1) return;
  const next = ordered[index + 1];
  const nextSaved = getStepSaved(next.id);
  if (nextSaved.startedAt || nextSaved.completedAt) return;

  const nextPlanned = suggestNextTime(step.id, saved.completedAt);
  if (nextPlanned) {
    nextSaved.plannedAt = nextPlanned;
  }
}

function suggestNextTime(stepId, completedAt) {
  const base = new Date(completedAt);
  if (Number.isNaN(base.getTime())) return null;
  const adjustment = getDurationAdjustment();
  const hours = {
    storage: 96,
    "maintenance-feed": 72,
    "build-starter": 10 * adjustment,
    "mix-dough": 0.5,
    "bulk-fermentation": 5 * adjustment,
    shape: 0.4,
    proof: state.settings.routineMode === "sunday-morning" ? 12 : 3 * adjustment,
    bake: 1,
    cool: 2,
    "save-starter": 0
  }[stepId];
  if (hours === undefined) return null;
  return new Date(base.getTime() + hoursToMs(hours)).toISOString();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

async function requestPersistence() {
  if (!navigator.storage?.persist) {
    showToast("Persistance renforcée non prise en charge par ce navigateur.");
    return;
  }
  const granted = await navigator.storage.persist();
  showToast(granted ? "Persistance renforcée activée." : "Le navigateur n’a pas accordé la persistance renforcée.");
  renderStorageStatus();
}

function exportState() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `routine-levain-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function importState(file) {
  if (!file) return;
  const text = await file.text();
  const imported = JSON.parse(text);
  state = mergeState(imported);
  await saveState();
  renderAll();
  showToast("Données importées.");
}


function normalizeNote(note) {
  if (!note || typeof note.content !== "string") return null;
  return {
    id: note.id || createNoteId(),
    content: note.content,
    pinned: Boolean(note.pinned),
    createdAt: note.createdAt || new Date().toISOString(),
    updatedAt: note.updatedAt || note.createdAt || new Date().toISOString()
  };
}

function getSortedNotes() {
  return [...(state.journalNotes || [])].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

function formatNoteDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Date inconnue";
  return date.toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function renderNotes() {
  const list = $("#notesList");
  if (!list) return;
  const notes = getSortedNotes();
  if (!notes.length) {
    list.innerHTML = `<div class="empty-state">Aucune note pour l’instant. Ajoutez une observation sur le levain, la pâte, la cuisson ou la tolérance digestive.</div>`;
    return;
  }
  list.innerHTML = notes.map((note) => {
    const pinnedLabel = note.pinned ? "Épinglée" : "Non épinglée";
    if (editingNoteId === note.id) {
      return `
        <article class="note-card note-edit ${note.pinned ? "pinned" : ""}" data-note-id="${escapeHtml(note.id)}">
          <div class="note-meta"><span>${pinnedLabel}</span><span>Modifiée le ${formatNoteDate(note.updatedAt)}</span></div>
          <textarea rows="5" data-edit-note="${escapeHtml(note.id)}">${escapeHtml(note.content)}</textarea>
          <div class="note-actions">
            <button class="btn btn-primary" type="button" data-note-action="save-edit" data-note-id="${escapeHtml(note.id)}">Enregistrer</button>
            <button class="btn btn-ghost" type="button" data-note-action="cancel-edit" data-note-id="${escapeHtml(note.id)}">Annuler</button>
          </div>
        </article>
      `;
    }
    return `
      <article class="note-card ${note.pinned ? "pinned" : ""}" data-note-id="${escapeHtml(note.id)}">
        <div class="note-meta"><span>${pinnedLabel}</span><span>Modifiée le ${formatNoteDate(note.updatedAt)}</span></div>
        <div class="note-content">${escapeHtml(note.content)}</div>
        <div class="note-actions">
          <button class="btn btn-secondary btn-small" type="button" data-note-action="pin" data-note-id="${escapeHtml(note.id)}">${note.pinned ? "Désépingler" : "Épingler"}</button>
          <button class="btn btn-secondary btn-small" type="button" data-note-action="edit" data-note-id="${escapeHtml(note.id)}">Modifier</button>
          <button class="btn btn-ghost btn-small" type="button" data-note-action="delete" data-note-id="${escapeHtml(note.id)}">Supprimer</button>
        </div>
      </article>
    `;
  }).join("");
}

async function addJournalNote() {
  const textarea = $("#newNoteText");
  const content = textarea.value.trim();
  if (!content) {
    showToast("Note vide non ajoutée.");
    return;
  }
  const now = new Date().toISOString();
  state.journalNotes.unshift({ id: createNoteId(), content, pinned: false, createdAt: now, updatedAt: now });
  textarea.value = "";
  await saveState();
  renderNotes();
  showToast("Note ajoutée.");
}

async function handleNoteAction(event) {
  const button = event.target.closest("[data-note-action]");
  if (!button) return;
  const id = button.dataset.noteId;
  const action = button.dataset.noteAction;
  const note = state.journalNotes.find((item) => item.id === id);
  if (!note && action !== "cancel-edit") return;

  if (action === "pin") {
    note.pinned = !note.pinned;
    note.updatedAt = new Date().toISOString();
    await saveState();
    renderNotes();
    showToast(note.pinned ? "Note épinglée." : "Note désépinglée.");
    return;
  }

  if (action === "edit") {
    editingNoteId = id;
    renderNotes();
    return;
  }

  if (action === "cancel-edit") {
    editingNoteId = null;
    renderNotes();
    return;
  }

  if (action === "save-edit") {
    const textarea = document.querySelector(`[data-edit-note="${id}"]`);
    const content = textarea?.value.trim() || "";
    if (!content) {
      showToast("Une note vide ne peut pas être enregistrée.");
      return;
    }
    note.content = content;
    note.updatedAt = new Date().toISOString();
    editingNoteId = null;
    await saveState();
    renderNotes();
    showToast("Note modifiée.");
    return;
  }

  if (action === "delete") {
    if (!confirm("Supprimer cette note ?")) return;
    state.journalNotes = state.journalNotes.filter((item) => item.id !== id);
    if (editingNoteId === id) editingNoteId = null;
    await saveState();
    renderNotes();
    showToast("Note supprimée.");
  }
}

async function clearWeek() {
  if (!confirm("Réinitialiser les étapes cochées et les heures de cette semaine ? Les notes du journal sont conservées.")) return;
  state.stepState = {};
  await saveState();
  renderAll();
  showToast("Semaine réinitialisée.");
}

function bindEvents() {
  $("#themeBtn").addEventListener("click", async () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    await saveState();
    renderAll();
  });

  $("#saveSettingsBtn").addEventListener("click", async () => {
    readSettingsForm();
    await saveState();
    renderAll();
    $("#settingsModal").close();
    showToast("Planning recalculé.");
  });

  $("#resetTodayBtn").addEventListener("click", () => {
    renderAll();
    showToast("Synthèse recalculée.");
  });

  $("#openStorageBtn").addEventListener("click", () => $("#storageModal").showModal());
  $("#openSettingsBtn").addEventListener("click", () => $("#settingsModal").showModal());
  $("#clearWeekBtn").addEventListener("click", clearWeek);
  $("#persistBtn").addEventListener("click", requestPersistence);
  $("#exportBtn").addEventListener("click", exportState);
  $("#importFile").addEventListener("change", (event) => importState(event.target.files[0]).catch(() => showToast("Import impossible.")));
  $("#addNoteBtn").addEventListener("click", addJournalNote);
  $("#notesList").addEventListener("click", (event) => handleNoteAction(event));

  ["#feedSeed", "#feedRatio", "#buildTarget", "#buildRatio"].forEach((selector) => {
    $(selector).addEventListener("input", renderCalculators);
  });

  ["#totalFlour", "#hydration", "#starterGrams", "#doughType"].forEach((selector) => {
    $(selector).addEventListener("input", () => {
      readSettingsForm();
      renderCalculators();
    });
  });

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
  });

  $("#modalSaveBtn").addEventListener("click", saveModalStep);

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    $("#installBtn").hidden = false;
  });

  $("#installBtn").addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    $("#installBtn").hidden = true;
  });
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  try {
    await navigator.serviceWorker.register("sw.js");
  } catch (err) {
    console.warn("Service worker non enregistré", err);
  }
}

async function init() {
  await loadState();
  bindEvents();
  renderAll();
  registerServiceWorker();
}

init();
