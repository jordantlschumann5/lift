const STORAGE_KEY = "lift-tracker-v2";
const LEGACY_STORAGE_KEY = "lift-tracker-v1";

const stretchBank = {
  fullBody: [
    ["World's Greatest Stretch", "Slow lunge rotation, 5 each side"],
    ["Inchworm to Down Dog", "6 controlled walkouts"],
    ["Deep Squat Pry", "45 seconds with easy breathing"],
    ["Spiderman Lunge Reach", "5 reaches each side"],
  ],
  hipsLegs: [
    ["90/90 Hip Switch", "8 switches total"],
    ["Couch Stretch", "40 seconds each side"],
    ["Hamstring Sweep", "8 each side"],
    ["Ankle Rocker", "10 rocks each side"],
  ],
  upper: [
    ["Doorway Pec Stretch", "35 seconds each side"],
    ["Lat Prayer Stretch", "45 seconds"],
    ["Cross-Body Shoulder Stretch", "30 seconds each side"],
    ["Child's Pose Reach", "45 seconds"],
  ],
};

const swapBank = {
  chest: [
    ["Dumbbell Bench Press", "Chest-friendly press with a natural shoulder path", "3", "8-10"],
    ["Push-Up", "Bodyweight press you can load with tempo or a plate", "3", "AMRAP"],
    ["Incline Machine Press", "Stable upper-chest option", "3", "8-12"],
  ],
  back: [
    ["Chest-Supported Row", "Back work without low-back fatigue", "3", "8-12"],
    ["Lat Pulldown", "Vertical pull for lats and upper back", "3", "10-12"],
    ["Single-Arm Cable Row", "Unilateral row with easy load changes", "3", "10 each"],
  ],
  legs: [
    ["Goblet Squat", "Controlled squat pattern with less spinal loading", "3", "10-12"],
    ["Leg Press", "Heavy leg work with simple progression", "3", "10"],
    ["Reverse Lunge", "Single-leg strength and hip control", "3", "8 each"],
  ],
  shoulders: [
    ["Seated Dumbbell Shoulder Press", "Main shoulder press with easy setup", "3", "8-10"],
    ["Landmine Press", "Shoulder press that is often joint-friendly", "3", "8 each"],
    ["Cable Lateral Raise", "Delts with constant tension", "3", "12-15"],
  ],
  arms: [
    ["EZ-Bar Curl", "Simple biceps builder", "3", "10-12"],
    ["Rope Pressdown", "Elbow-friendly triceps work", "3", "10-12"],
    ["Incline Dumbbell Curl", "Long-range biceps work", "2", "12"],
  ],
  core: [
    ["Pallof Press", "Anti-rotation core work", "3", "10 each"],
    ["Dead Bug", "Low-fatigue trunk control", "3", "8 each"],
    ["Cable Crunch", "Loadable abdominal flexion", "3", "12"],
  ],
};

function lift(name, category, muscles, sets, reps) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    name,
    category,
    muscles,
    sets,
    reps,
    entries: Array.from({ length: Number(sets) || 3 }, () => ({ weight: "", reps: "", note: "" })),
    note: "",
  };
}

const defaultPlan = [
  {
    id: "day-1",
    title: "Push Strength",
    optional: false,
    time: 55,
    targets: ["Chest", "Shoulders", "Arms"],
    warmup: [stretchBank.fullBody[0], stretchBank.fullBody[1], stretchBank.hipsLegs[0]],
    cooldown: [stretchBank.upper[0], stretchBank.upper[2], stretchBank.hipsLegs[1]],
    lifts: [
      lift("Barbell Bench Press", "chest", ["Chest", "Triceps"], "4", "5-8"),
      lift("Incline Dumbbell Press", "chest", ["Upper chest", "Shoulders"], "3", "8-10"),
      lift("Seated Dumbbell Shoulder Press", "shoulders", ["Shoulders"], "3", "8-10"),
      lift("Cable Fly", "chest", ["Chest"], "2", "12-15"),
      lift("Rope Pressdown", "arms", ["Triceps"], "3", "10-12"),
      lift("Dumbbell Lateral Raise", "shoulders", ["Side delts"], "2", "12-15"),
    ],
  },
  {
    id: "day-2",
    title: "Legs and Hips",
    optional: false,
    time: 58,
    targets: ["Legs", "Hips", "Core"],
    warmup: [stretchBank.fullBody[2], stretchBank.hipsLegs[0], stretchBank.hipsLegs[3]],
    cooldown: [stretchBank.hipsLegs[1], stretchBank.hipsLegs[2], stretchBank.fullBody[3]],
    lifts: [
      lift("Back Squat", "legs", ["Quads", "Glutes"], "4", "5-8"),
      lift("Romanian Deadlift", "legs", ["Hamstrings", "Glutes"], "3", "8-10"),
      lift("Walking Lunge", "legs", ["Legs", "Hips"], "3", "10 each"),
      lift("Leg Curl", "legs", ["Hamstrings"], "3", "10-12"),
      lift("Standing Calf Raise", "legs", ["Calves"], "3", "12-15"),
      lift("Farmer Carry", "core", ["Core", "Grip"], "3", "40 sec"),
    ],
  },
  {
    id: "day-3",
    title: "Pull and Arms",
    optional: false,
    time: 56,
    targets: ["Back", "Arms", "Shoulders"],
    warmup: [stretchBank.fullBody[0], stretchBank.fullBody[3], stretchBank.hipsLegs[2]],
    cooldown: [stretchBank.upper[1], stretchBank.upper[2], stretchBank.hipsLegs[0]],
    lifts: [
      lift("Pull-Up or Assisted Pull-Up", "back", ["Lats", "Biceps"], "4", "6-10"),
      lift("Chest-Supported Row", "back", ["Mid back"], "3", "8-12"),
      lift("Single-Arm Cable Row", "back", ["Back"], "3", "10 each"),
      lift("Face Pull", "shoulders", ["Rear delts", "Upper back"], "3", "12-15"),
      lift("EZ-Bar Curl", "arms", ["Biceps"], "3", "10-12"),
      lift("Hammer Curl", "arms", ["Biceps", "Forearms"], "2", "12"),
    ],
  },
  {
    id: "day-4",
    title: "Full Body Balance",
    optional: false,
    time: 54,
    targets: ["Chest", "Back", "Legs", "Arms"],
    warmup: [stretchBank.fullBody[1], stretchBank.fullBody[2], stretchBank.hipsLegs[3]],
    cooldown: [stretchBank.upper[0], stretchBank.upper[1], stretchBank.hipsLegs[1]],
    lifts: [
      lift("Trap Bar Deadlift", "legs", ["Legs", "Back"], "3", "5-6"),
      lift("Dumbbell Bench Press", "chest", ["Chest", "Triceps"], "3", "8-10"),
      lift("Lat Pulldown", "back", ["Lats"], "3", "10-12"),
      lift("Bulgarian Split Squat", "legs", ["Quads", "Glutes"], "2", "8 each"),
      lift("Cable Lateral Raise", "shoulders", ["Shoulders"], "2", "12-15"),
      lift("Superset: Curl + Pressdown", "arms", ["Biceps", "Triceps"], "2", "12 each"),
    ],
  },
  {
    id: "day-5",
    title: "Optional Core Reset",
    optional: true,
    time: 42,
    targets: ["Core", "Mobility", "Light full body"],
    warmup: [stretchBank.fullBody[0], stretchBank.fullBody[2], stretchBank.hipsLegs[0]],
    cooldown: [stretchBank.upper[1], stretchBank.hipsLegs[1], stretchBank.hipsLegs[2]],
    lifts: [
      lift("Pallof Press", "core", ["Core"], "3", "10 each"),
      lift("Dead Bug", "core", ["Core"], "3", "8 each"),
      lift("Kettlebell Goblet Squat", "legs", ["Legs", "Core"], "2", "10"),
      lift("Push-Up", "chest", ["Chest", "Arms"], "2", "Easy AMRAP"),
      lift("Cable Row", "back", ["Back"], "2", "12"),
      lift("Suitcase Carry", "core", ["Core", "Grip"], "3", "30 sec each"),
    ],
  },
];

let state = loadState();
let activeDayId = state.activeDayId || "day-1";
let swapTarget = null;
const $ = (id) => document.getElementById(id);

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function clonePlan() {
  return deepClone(defaultPlan);
}

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function createWeek(number = 1) {
  return { id: uid(), number, startedAt: todayKey(), completed: {} };
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return normalizeState(JSON.parse(saved));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (legacy) {
    try {
      const parsed = JSON.parse(legacy);
      return normalizeState({
        plan: Array.isArray(parsed.plan) ? parsed.plan : clonePlan(),
        activeDayId: parsed.activeDayId || "day-1",
        currentWeek: createWeek(1),
        weeks: [],
      });
    } catch {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  }

  return normalizeState({});
}

function normalizeState(input) {
  return {
    plan: Array.isArray(input.plan) ? input.plan : clonePlan(),
    currentWeek: input.currentWeek?.completed ? input.currentWeek : createWeek(Number(input.currentWeek?.number) || 1),
    weeks: Array.isArray(input.weeks) ? input.weeks : [],
    activeDayId: input.activeDayId || "day-1",
  };
}

function saveState() {
  state.activeDayId = activeDayId;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function activeDay() {
  return state.plan.find((day) => day.id === activeDayId) || state.plan[0];
}

function completedDayIds() {
  return Object.keys(state.currentWeek.completed || {});
}

function isComplete(dayId) {
  return Boolean(state.currentWeek.completed?.[dayId]);
}

function render() {
  renderTabs();
  renderOverview();
  renderStretches();
  renderLifts();
  renderHistory();
  saveState();
}

function renderTabs() {
  const tabs = $("dayTabs");
  tabs.innerHTML = "";
  state.plan.forEach((day, index) => {
    const button = document.createElement("button");
    button.className = `day-tab ${day.id === activeDayId ? "active" : ""} ${isComplete(day.id) ? "complete" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="day-number">${index + 1}</span>
      <span><strong>${escapeHtml(day.title)}</strong><small>${escapeHtml(day.targets.join(", "))}</small></span>
      ${day.optional ? '<span class="optional-badge">Core</span>' : ""}
    `;
    button.addEventListener("click", () => {
      activeDayId = day.id;
      render();
    });
    tabs.appendChild(button);
  });
  $("weekStatus").textContent = `Week ${state.currentWeek.number}: ${completedDayIds().length}/5`;
  $("timeStatus").textContent = `${activeDay().time} min`;
}

function renderOverview() {
  const day = activeDay();
  $("dayMeta").textContent = `${day.optional ? "Core/full-body" : "Required"} workout`;
  $("dayTitle").textContent = day.title;
  $("estimatedTime").textContent = `${day.time} min`;
  $("targetAreas").textContent = day.targets.join(", ");
  $("liftCount").textContent = `${day.lifts.length} moves`;
  $("sessionNote").value = day.sessionNote || "";
  $("completeDayBtn").classList.toggle("active", isComplete(day.id));
  $("completeDayBtn").title = isComplete(day.id) ? "Saved for this week" : "Mark day complete";

  const focus = $("dayFocus");
  focus.innerHTML = "";
  day.targets.forEach((target) => {
    const pill = document.createElement("span");
    pill.className = "focus-pill";
    pill.textContent = target;
    focus.appendChild(pill);
  });
}

function renderStretches() {
  renderStretchList("warmupList", activeDay().warmup);
  renderStretchList("cooldownList", activeDay().cooldown);
}

function renderStretchList(id, stretches) {
  const list = $(id);
  list.innerHTML = "";
  stretches.forEach(([name, cue]) => {
    const card = document.createElement("article");
    card.className = "stretch-card";
    card.innerHTML = `
      <strong>${escapeHtml(name)}</strong>
      <span>${escapeHtml(cue)}</span>
      <a class="video-link" href="${stretchVideoUrl(name)}" target="_blank" rel="noopener noreferrer">Watch demo</a>
    `;
    list.appendChild(card);
  });
}

function stretchVideoUrl(name) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} stretch demonstration`)}`;
}

function renderLifts() {
  const list = $("liftList");
  list.innerHTML = "";
  activeDay().lifts.forEach((item) => {
    const card = document.createElement("article");
    card.className = "lift-card";
    card.innerHTML = `
      <div class="lift-title-row">
        <div>
          <h4>${escapeHtml(item.name)}</h4>
          <div class="lift-meta">${escapeHtml(item.sets)} sets x ${escapeHtml(item.reps)} reps</div>
          <div class="muscle-tags">${item.muscles.map((muscle) => `<span>${escapeHtml(muscle)}</span>`).join("")}</div>
        </div>
        <div class="lift-actions">
          <button class="text-button" data-action="swap" type="button">Swap</button>
        </div>
      </div>
      <div class="sets-grid">
        ${item.entries
          .map(
            (entry, index) => `
              <div class="set-row">
                <span class="set-label">Set ${index + 1}</span>
                <input data-field="weight" data-set="${index}" type="text" inputmode="decimal" placeholder="Weight" value="${escapeAttr(entry.weight)}" />
                <input data-field="reps" data-set="${index}" type="text" placeholder="Reps" value="${escapeAttr(entry.reps)}" />
                <input data-field="note" data-set="${index}" type="text" placeholder="Set note" value="${escapeAttr(entry.note)}" />
              </div>
            `,
          )
          .join("")}
      </div>
      <textarea class="notes" data-field="liftNote" maxlength="180" placeholder="Lift notes, form cues, pain, next target">${escapeHtml(item.note || "")}</textarea>
    `;

    card.querySelector('[data-action="swap"]').addEventListener("click", () => openSwap(item.id));
    card.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", () => {
        const set = item.entries[Number(input.dataset.set)];
        set[input.dataset.field] = input.value;
        saveState();
      });
    });
    card.querySelector("textarea").addEventListener("input", (event) => {
      item.note = event.target.value;
      saveState();
    });
    list.appendChild(card);
  });
}

function renderHistory() {
  const list = $("historyList");
  list.innerHTML = "";
  const groups = historyGroups();

  if (!groups.length) {
    list.innerHTML = '<p class="empty-state">Completed workouts will appear here.</p>';
    return;
  }

  groups.forEach((group) => {
    const block = document.createElement("section");
    block.className = "history-week";
    block.innerHTML = `<h3>${escapeHtml(group.label)}</h3>`;

    group.sessions.forEach((session) => {
      const button = document.createElement("button");
      button.className = "history-entry";
      button.type = "button";
      button.innerHTML = `
        <strong>${escapeHtml(session.date)} - ${escapeHtml(session.dayTitle)}</strong>
        <span>${escapeHtml(session.note || "No session note")}</span>
      `;
      button.addEventListener("click", () => openHistory(session));
      block.appendChild(button);
    });

    list.appendChild(block);
  });
}

function historyGroups() {
  const groups = [];
  const currentSessions = sessionsForWeek(state.currentWeek);
  if (currentSessions.length) {
    groups.push({ label: `Current Week ${state.currentWeek.number}`, sessions: currentSessions });
  }
  [...state.weeks].reverse().forEach((week) => {
    groups.push({ label: `Week ${week.number}`, sessions: sessionsForWeek(week) });
  });
  return groups;
}

function sessionsForWeek(week) {
  return state.plan.map((day) => week.completed?.[day.id]).filter(Boolean);
}

function openHistory(session) {
  $("historyDetailMeta").textContent = `${session.date} - Week ${session.weekNumber}`;
  $("historyDetailTitle").textContent = session.dayTitle;
  $("historyDetailBody").innerHTML = `
    <div class="history-summary">
      <strong>${escapeHtml(session.targets.join(", "))}</strong>
      <span>${escapeHtml(session.note || "No session note")}</span>
    </div>
    <div class="history-lifts">
      ${session.lifts
        .map(
          (item) => `
            <article class="history-lift">
              <h3>${escapeHtml(item.name)}</h3>
              <p>${escapeHtml(item.sets)} sets x ${escapeHtml(item.reps)} reps</p>
              ${renderHistorySets(item.entries)}
              ${item.note ? `<p class="history-note">${escapeHtml(item.note)}</p>` : ""}
            </article>
          `,
        )
        .join("")}
    </div>
  `;
  $("historyDialog").showModal();
}

function renderHistorySets(entries) {
  const rows = entries
    .map((entry, index) => {
      const weight = entry.weight || "-";
      const reps = entry.reps || "-";
      const note = entry.note ? `, ${entry.note}` : "";
      return `<li>Set ${index + 1}: ${escapeHtml(weight)} x ${escapeHtml(reps)}${escapeHtml(note)}</li>`;
    })
    .join("");
  return `<ul>${rows}</ul>`;
}

function openSwap(liftId) {
  const day = activeDay();
  const item = day.lifts.find((entry) => entry.id === liftId);
  if (!item) return;
  swapTarget = liftId;
  $("swapTitle").textContent = `Replace ${item.name}`;
  const options = $("swapOptions");
  options.innerHTML = "";
  (swapBank[item.category] || swapBank.core).forEach(([name, description, sets, reps]) => {
    const option = document.createElement("article");
    option.className = "swap-option";
    option.innerHTML = `
      <div>
        <strong>${escapeHtml(name)}</strong>
        <p>${escapeHtml(description)} - ${escapeHtml(sets)} sets x ${escapeHtml(reps)}</p>
      </div>
      <button type="button">Use</button>
    `;
    option.querySelector("button").addEventListener("click", () => swapLift(name, item.category, item.muscles, sets, reps));
    options.appendChild(option);
  });
  $("swapDialog").showModal();
}

function swapLift(name, category, muscles, sets, reps) {
  const day = activeDay();
  const index = day.lifts.findIndex((item) => item.id === swapTarget);
  if (index === -1) return;
  day.lifts[index] = lift(name, category, muscles, sets, reps);
  $("swapDialog").close();
  render();
}

function completeDay() {
  const day = activeDay();
  state.currentWeek.completed[day.id] = createSessionSnapshot(day);
  if (completedDayIds().length >= state.plan.length) {
    archiveCurrentWeek();
  }
  render();
}

function createSessionSnapshot(day) {
  return {
    id: uid(),
    weekNumber: state.currentWeek.number,
    dayId: day.id,
    dayTitle: day.title,
    date: todayKey(),
    note: day.sessionNote || "",
    targets: [...day.targets],
    lifts: deepClone(day.lifts),
  };
}

function archiveCurrentWeek() {
  const completedWeek = { ...deepClone(state.currentWeek), completedAt: todayKey() };
  state.weeks.push(completedWeek);
  state.currentWeek = createWeek(completedWeek.number + 1);
  state.plan = clonePlan();
  activeDayId = "day-1";
}

function exportProgress() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lift-tracker-progress.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importProgress(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = normalizeState(JSON.parse(reader.result));
      activeDayId = state.activeDayId;
      render();
    } catch {
      alert("That file does not look like Lift Tracker progress.");
    }
  };
  reader.readAsText(file);
}

function resetPlan() {
  state.plan = clonePlan();
  activeDayId = "day-1";
  render();
}

function clearHistory() {
  if (!confirm("Clear all saved workout history and current-week completions?")) return;
  state.weeks = [];
  state.currentWeek = createWeek(1);
  render();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

$("sessionNote").addEventListener("input", (event) => {
  activeDay().sessionNote = event.target.value;
  saveState();
});
$("completeDayBtn").addEventListener("click", completeDay);
$("exportBtn").addEventListener("click", exportProgress);
$("resetPlanBtn").addEventListener("click", resetPlan);
$("clearHistoryBtn").addEventListener("click", clearHistory);
$("importInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) importProgress(file);
});

render();
