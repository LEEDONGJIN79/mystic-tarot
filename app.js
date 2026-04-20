const setupEl = document.getElementById("setup");
const resultEl = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const resultQuestion = document.getElementById("result-question");
const yesnoResultEl = document.getElementById("yesno-result");
const cardsEl = document.getElementById("cards");
const summaryEl = document.getElementById("summary");
const drawBtn = document.getElementById("draw-btn");
const againBtn = document.getElementById("again-btn");
const questionInput = document.getElementById("question");
const questionTipEl = document.getElementById("question-tip");
const spreadOptionsEl = document.getElementById("spread-options");
const spreadInfoEl = document.getElementById("spread-info");
const learnToggle = document.getElementById("learn-toggle");
const learnBody = document.getElementById("learn-body");
const learnContent = document.getElementById("learn-content");

let selectedSpreadId = "daily";

// 단계별 모드 상태 (모바일 & 7장↑ 스프레드)
let stepState = null;

// 모바일 판정 (세로 폰 OR 가로 폰[낮은 높이])
function isMobileViewport() {
  return window.matchMedia("(max-width: 700px), (max-height: 500px) and (max-width: 1024px)").matches;
}
function isLandscape() {
  return window.matchMedia("(orientation: landscape) and (max-height: 500px)").matches;
}
function shouldUseStepMode(spread) {
  return isMobileViewport() && spread.count >= 7;
}

// ========== 질문 팁 ==========
function showRandomTip() {
  const tip = QUESTION_TIPS[Math.floor(Math.random() * QUESTION_TIPS.length)];
  questionTipEl.innerHTML = `💡 <strong>Tip:</strong> ${tip}`;
}

// ========== 학습 섹션 ==========
learnToggle.addEventListener("click", () => {
  const isHidden = learnBody.classList.toggle("hidden");
  learnToggle.querySelector(".learn-chevron").textContent = isHidden ? "▾" : "▴";
  if (!isHidden && !learnContent.dataset.loaded) {
    renderLearnTab("journey");
    learnContent.dataset.loaded = "1";
  }
});

document.querySelectorAll(".learn-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".learn-tab").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderLearnTab(btn.dataset.tab);
  });
});

function renderLearnTab(tab) {
  if (tab === "journey") {
    const cardsByStage = JOURNEY_STAGES.map((stage) => {
      const cards = MAJOR_ARCANA.filter((c) => c.journey === stage.id);
      return `
        <div class="stage-block">
          <div class="stage-head">
            <span class="stage-num">${stage.id}</span>
            <div>
              <div class="stage-title">${stage.title}</div>
              <div class="stage-range">${stage.range}</div>
            </div>
          </div>
          <p class="stage-desc">${stage.desc}</p>
          <div class="stage-cards">
            ${cards.map((c) => `<span class="stage-card"><span class="sc-roman">${c.roman}</span> ${c.name}</span>`).join("")}
          </div>
        </div>
      `;
    }).join("");
    learnContent.innerHTML = `
      <p class="learn-lead">메이저 아르카나 22장은 0번 바보에서 21번 세계에 이르는 하나의 서사 — <strong>"바보의 여정"</strong>을 이룹니다. 네 단계로 나누어 보면 카드 사이의 흐름이 보입니다.</p>
      <div class="stage-list">${cardsByStage}</div>
    `;
  } else if (tab === "numbers") {
    const rows = NUMEROLOGY.map((n) => `
      <div class="num-row">
        <div class="num-key">${n.n}</div>
        <div class="num-val">${n.meaning}</div>
      </div>
    `).join("");
    learnContent.innerHTML = `
      <p class="learn-lead">마이너 아르카나에서 <strong>수트(원소)</strong>가 "어떤 영역"을 알려준다면, <strong>숫자</strong>는 그 영역의 "어떤 단계"에 있는지를 보여줍니다.<br>
      예) <em>컵 3</em> = 감정 × 확장 = "감정적 기쁨, 우정의 축하"</p>
      <div class="num-grid">${rows}</div>
    `;
  } else if (tab === "suits") {
    const cards = SUIT_GUIDE.map((s) => `
      <div class="suit-card" style="--suit-top:${SUIT_THEME[s.key].top};--suit-mid:${SUIT_THEME[s.key].mid};--suit-bot:${SUIT_THEME[s.key].bot};">
        <div class="suit-header">
          <span class="suit-symbol">${s.symbol}</span>
          <div>
            <div class="suit-name">${s.name}</div>
            <div class="suit-element">${s.element}의 원소</div>
          </div>
        </div>
        <div class="suit-theme">${s.theme}</div>
        <div class="suit-meta">
          <span>🍃 ${s.season}</span>
          <span>🧭 ${s.direction}</span>
          <span>♈ ${s.astro}</span>
        </div>
      </div>
    `).join("");
    learnContent.innerHTML = `
      <p class="learn-lead">56장의 마이너 아르카나는 4개의 수트로 나뉘며, 각 수트는 고대 4원소(불·물·공기·흙)에 대응됩니다.</p>
      <div class="suit-grid">${cards}</div>
    `;
  } else if (tab === "frames") {
    const rows = Object.entries(REVERSED_FRAMES).map(([k, f]) => `
      <div class="frame-row" style="border-left-color: ${f.color}">
        <div class="frame-label" style="color:${f.color}">${f.label}</div>
        <div class="frame-desc">${f.desc}</div>
      </div>
    `).join("");
    learnContent.innerHTML = `
      <p class="learn-lead">역방향은 단순히 "반대 의미"가 아닙니다. 정방향 에너지가 변형된 상태로, 다음 다섯 가지 프레임 중 하나로 읽을 수 있습니다. 이 앱은 역방향 카드에 가장 적합한 프레임을 자동으로 표시합니다.</p>
      <div class="frame-list">${rows}</div>
    `;
  }
}

// ========== 스프레드 선택 UI ==========
function renderSpreadOptions() {
  spreadOptionsEl.innerHTML = "";
  const categories = {};
  SPREADS.forEach((s) => {
    if (!categories[s.category]) categories[s.category] = [];
    categories[s.category].push(s);
  });

  Object.entries(categories).forEach(([cat, list]) => {
    const group = document.createElement("div");
    group.className = "spread-group";
    group.innerHTML = `<div class="spread-group-title">${cat}</div>`;

    const grid = document.createElement("div");
    grid.className = "spread-options";

    list.forEach((s) => {
      const btn = document.createElement("button");
      btn.className = "spread-btn" + (s.id === selectedSpreadId ? " active" : "");
      btn.dataset.id = s.id;
      btn.innerHTML = `
        <span class="spread-icon">${s.icon}</span>
        <span class="spread-body">
          <span class="spread-title">${s.title.replace(/✦\s*|\s*✦/g, "")}</span>
          <span class="spread-desc">${s.subtitle}</span>
        </span>
        <span class="spread-count">${s.count}장</span>
      `;
      btn.addEventListener("click", () => {
        selectedSpreadId = s.id;
        renderSpreadOptions();
        renderSpreadInfo();
      });
      grid.appendChild(btn);
    });

    group.appendChild(grid);
    spreadOptionsEl.appendChild(group);
  });
}

function renderSpreadInfo() {
  const s = SPREADS.find((x) => x.id === selectedSpreadId);
  if (!s) return;
  const positionsHtml = s.positions
    .map((p, i) => `<span class="pos-chip"><span class="pos-n">${i + 1}</span>${p}</span>`)
    .join("");
  spreadInfoEl.innerHTML = `<div class="pos-list">${positionsHtml}</div>`;
}

// ========== 카드 뽑기 ==========
function shuffleAndDraw(count) {
  const pool = [...TAROT_DECK];
  const drawn = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    const card = pool.splice(idx, 1)[0];
    const isReversed = Math.random() < 0.35;
    drawn.push({ card, isReversed });
  }
  return drawn;
}

// ========== 카드 DOM ==========
function createCardElement(entry, position, index, opts = {}) {
  const { card, isReversed } = entry;
  const wrap = document.createElement("div");
  wrap.className = "card-wrap";
  wrap.dataset.pos = index;
  if (opts.mini) wrap.classList.add("mini");

  const posLabel = document.createElement("div");
  posLabel.className = "position-label";
  posLabel.innerHTML = `<span class="pos-index">${index + 1}</span> ${position}`;
  wrap.appendChild(posLabel);

  const cardEl = document.createElement("div");
  cardEl.className = "card" + (isReversed ? " reversed" : "");

  const t = card.theme;
  const frontStyle = `--theme-top:${t.top};--theme-mid:${t.mid};--theme-bot:${t.bot};--theme-accent:${t.accent};`;

  cardEl.innerHTML = `
    <div class="card-inner">
      <div class="card-face card-back">
        <div class="back-frame">
          <div class="back-ornament">✦</div>
        </div>
      </div>
      <div class="card-face card-front" style="${frontStyle}">
        <div class="card-frame">
          <div class="card-roman">${card.roman}</div>
          <div class="card-scene">
            <img class="card-image" src="${card.image}" alt="${card.nameEn}" loading="lazy" />
          </div>
          <div class="card-banner">
            <div class="card-name">${card.name}</div>
            <div class="card-name-en">${card.nameEn}</div>
          </div>
          <div class="corner tl">❧</div>
          <div class="corner tr">❧</div>
          <div class="corner bl">❧</div>
          <div class="corner br">❧</div>
        </div>
      </div>
    </div>
  `;
  wrap.appendChild(cardEl);

  if (!opts.mini) {
    const orientationBadge = document.createElement("div");
    orientationBadge.className = "orientation-badge " + (isReversed ? "is-reversed" : "is-upright");
    orientationBadge.textContent = isReversed ? "역방향" : "정방향";
    wrap.appendChild(orientationBadge);

    const meaningData = isReversed ? card.reversed : card.upright;
    const meaning = document.createElement("div");
    meaning.className = "card-meaning";
    let frameBadge = "";
    if (isReversed && meaningData.frame && REVERSED_FRAMES[meaningData.frame]) {
      const f = REVERSED_FRAMES[meaningData.frame];
      frameBadge = `<div class="frame-badge" style="background:${f.color}22;border-color:${f.color}55;color:${f.color}"><span class="frame-badge-label">역방향 프레임</span> · ${f.label}</div>`;
    }
    meaning.innerHTML = `
      ${frameBadge}
      <div class="meaning-keywords">${meaningData.keywords}</div>
      <div class="meaning-text">${meaningData.text}</div>
    `;
    wrap.appendChild(meaning);

    return { wrap, cardEl, orientationBadge, meaning };
  }

  return { wrap, cardEl };
}

// ========== 일반(데스크탑·작은 스프레드) 렌더링 ==========
function renderCardsNormal(drawn, spread) {
  cardsEl.innerHTML = "";
  cardsEl.className = "cards layout-" + spread.layout;

  const nodes = drawn.map((entry, i) => {
    const pos = spread.positions[i] || `카드 ${i + 1}`;
    return createCardElement(entry, pos, i);
  });

  if (spread.layout === "celtic") {
    const areaMap = ["c1", "c2", "c3", "c4", "c5", "c6", "s1", "s2", "s3", "s4"];
    nodes.forEach((n, i) => {
      n.wrap.style.gridArea = areaMap[i] || "";
      cardsEl.appendChild(n.wrap);
    });
  } else {
    nodes.forEach((n) => cardsEl.appendChild(n.wrap));
  }

  nodes.forEach((n, i) => {
    setTimeout(() => n.cardEl.classList.add("flipped"), 400 + i * 420);
    setTimeout(() => {
      n.orientationBadge.classList.add("visible");
      n.meaning.classList.add("visible");
    }, 400 + i * 420 + 900);
  });
}

// ========== 단계별 모드 렌더링 (모바일 · 7장↑) ==========
function renderStepMode() {
  const { mode, index, drawn, spread } = stepState;
  cardsEl.innerHTML = "";
  cardsEl.className = `cards step-mode mode-${mode}`;

  if (mode === "overview") renderStepOverview();
  else if (mode === "step") renderStepCurrent();
  else if (mode === "review") renderStepReview();
}

function renderStepOverview() {
  const { drawn, spread } = stepState;

  const header = document.createElement("div");
  header.className = "step-header";
  header.innerHTML = `
    <div class="step-title-row">
      <span class="step-count-badge">${spread.count}장</span>
      <h3>카드가 놓였습니다</h3>
    </div>
    <p class="step-hint">한 장씩 열어 의미를 확인해보세요.</p>
  `;
  cardsEl.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "mini-grid " + (spread.layout === "celtic" ? "mini-celtic" : "mini-row");

  drawn.forEach((entry, i) => {
    const pos = spread.positions[i] || `카드 ${i + 1}`;
    const node = createCardElement(entry, pos, i, { mini: true });
    if (spread.layout === "celtic") {
      const areaMap = ["c1", "c2", "c3", "c4", "c5", "c6", "s1", "s2", "s3", "s4"];
      node.wrap.style.gridArea = areaMap[i] || "";
    }
    grid.appendChild(node.wrap);
  });

  cardsEl.appendChild(grid);

  // 번호 ↔ 포지션 이름 범례
  const legend = document.createElement("div");
  legend.className = "mini-legend";
  legend.innerHTML = spread.positions
    .map((p, i) => `<div class="mini-legend-row"><span class="mini-legend-n">${i + 1}</span><span>${p}</span></div>`)
    .join("");
  cardsEl.appendChild(legend);

  const ctrl = document.createElement("div");
  ctrl.className = "step-controls";
  ctrl.innerHTML = `<button class="step-btn primary" id="step-start">첫 카드 열기 →</button>`;
  cardsEl.appendChild(ctrl);

  document.getElementById("step-start").addEventListener("click", () => {
    stepState.mode = "step";
    stepState.index = 0;
    renderStepMode();
  });
}

function renderStepCurrent() {
  const { drawn, spread, index } = stepState;
  const entry = drawn[index];
  const pos = spread.positions[index] || `카드 ${index + 1}`;

  const progress = document.createElement("div");
  progress.className = "step-progress";
  progress.innerHTML = `
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${((index + 1) / drawn.length) * 100}%"></div>
    </div>
    <div class="progress-text">${index + 1} / ${drawn.length}</div>
  `;
  cardsEl.appendChild(progress);

  const node = createCardElement(entry, pos, index);
  node.wrap.classList.add("step-active-card");
  cardsEl.appendChild(node.wrap);

  const ctrl = document.createElement("div");
  ctrl.className = "step-controls";
  ctrl.innerHTML = `
    <button class="step-btn secondary" id="step-prev" ${index === 0 ? "disabled" : ""}>← 이전</button>
    ${index < drawn.length - 1
      ? `<button class="step-btn primary" id="step-next">다음 카드 →</button>`
      : `<button class="step-btn primary" id="step-review">전체 돌아보기 →</button>`}
  `;
  cardsEl.appendChild(ctrl);

  // 카드 뒤집기 애니메이션
  setTimeout(() => node.cardEl.classList.add("flipped"), 200);
  setTimeout(() => {
    node.orientationBadge.classList.add("visible");
    node.meaning.classList.add("visible");
  }, 1000);

  // 컨트롤
  const prev = document.getElementById("step-prev");
  if (prev) prev.addEventListener("click", () => {
    if (stepState.index > 0) {
      stepState.index--;
      renderStepMode();
    }
  });
  const next = document.getElementById("step-next");
  if (next) next.addEventListener("click", () => {
    if (stepState.index < drawn.length - 1) {
      stepState.index++;
      renderStepMode();
    }
  });
  const reviewBtn = document.getElementById("step-review");
  if (reviewBtn) reviewBtn.addEventListener("click", () => {
    stepState.mode = "review";
    renderStepMode();
  });
}

function renderStepReview() {
  const { drawn, spread } = stepState;

  const header = document.createElement("div");
  header.className = "step-header";
  header.innerHTML = `
    <div class="step-title-row">
      <span class="step-count-badge">${drawn.length}장</span>
      <h3>전체 돌아보기</h3>
    </div>
    <p class="step-hint">순서대로 다시 읽으면서 의미를 곱씹어 보세요.</p>
  `;
  cardsEl.appendChild(header);

  drawn.forEach((entry, i) => {
    const pos = spread.positions[i] || `카드 ${i + 1}`;
    const node = createCardElement(entry, pos, i);
    node.wrap.classList.add("review-card");
    // 이미 열린 상태
    node.cardEl.classList.add("flipped");
    node.orientationBadge.classList.add("visible");
    node.meaning.classList.add("visible");
    cardsEl.appendChild(node.wrap);
  });

  // 전체 흐름 요약을 리뷰 끝에 인라인으로 추가
  const reversedCount = drawn.filter((d) => d.isReversed).length;
  const majorCount = drawn.filter((d) => MAJOR_ARCANA.some((m) => m.name === d.card.name)).length;
  let tone;
  if (reversedCount === 0) {
    tone = "카드들이 모두 정방향으로 나왔습니다. 흐름이 당신의 편입니다. 지금 느끼는 방향으로 용기 내어 나아가세요.";
  } else if (reversedCount === drawn.length) {
    tone = "카드들이 모두 역방향입니다. 잠시 멈추고 내면을 들여다볼 때입니다. 외부보다 자신의 상태를 먼저 돌보세요.";
  } else {
    tone = `정방향 ${drawn.length - reversedCount}장과 역방향 ${reversedCount}장이 섞여 있습니다. 나아갈 지점과 점검할 지점이 함께 있습니다.`;
  }
  let majorNote = "";
  const majorRatio = majorCount / drawn.length;
  if (majorRatio >= 0.5) {
    majorNote = `<p class="major-note">⚡ 메이저 아르카나가 ${majorCount}장 나왔습니다. 삶의 <strong>근본적 전환기</strong>에 있음을 의미합니다. 세부보다 큰 그림에 집중하세요.</p>`;
  } else if (majorCount === 0) {
    majorNote = `<p class="major-note">🌱 메이저 아르카나가 없습니다. 현재 <strong>일상의 차원</strong>에서 움직이고 있으며, 당신의 선택과 행동으로 충분히 방향을 바꿀 수 있습니다.</p>`;
  }
  const inlineSummary = document.createElement("div");
  inlineSummary.className = "summary visible";
  inlineSummary.style.marginTop = "20px";
  inlineSummary.innerHTML = `<h3>✦ 전체 흐름 ✦</h3><p>${tone}</p>${majorNote}`;
  cardsEl.appendChild(inlineSummary);

  const ctrl = document.createElement("div");
  ctrl.className = "step-controls";
  ctrl.innerHTML = `<button class="step-btn secondary" id="step-back">↑ 한 장씩 다시 보기</button>`;
  cardsEl.appendChild(ctrl);

  document.getElementById("step-back").addEventListener("click", () => {
    stepState.mode = "step";
    stepState.index = 0;
    renderStepMode();
    cardsEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// ========== 라우팅 ==========
function renderCards(drawn, spread) {
  if (shouldUseStepMode(spread)) {
    stepState = { mode: "overview", index: 0, drawn, spread };
    renderStepMode();
  } else {
    stepState = null;
    renderCardsNormal(drawn, spread);
  }
}

function renderYesNoResult(entry) {
  const verdict = resolveYesNo(entry.card, entry.isReversed);
  const label = YESNO_LABELS[verdict];
  yesnoResultEl.className = "yesno-result tone-" + label.tone;
  yesnoResultEl.innerHTML = `
    <div class="yesno-big">${label.big}</div>
    <div class="yesno-sub">${label.sub}</div>
  `;
  yesnoResultEl.classList.remove("hidden");
  setTimeout(() => yesnoResultEl.classList.add("visible"), 400 + 1 * 420 + 900);
}

function renderSummary(drawn, spread) {
  if (drawn.length <= 1) {
    summaryEl.classList.add("hidden");
    return;
  }
  const reversedCount = drawn.filter((d) => d.isReversed).length;
  const majorCount = drawn.filter((d) => MAJOR_ARCANA.some((m) => m.name === d.card.name)).length;

  let tone;
  if (reversedCount === 0) {
    tone = "카드들이 모두 정방향으로 나왔습니다. 흐름이 당신의 편입니다. 지금 느끼는 방향으로 용기 내어 나아가세요.";
  } else if (reversedCount === drawn.length) {
    tone = "카드들이 모두 역방향입니다. 잠시 멈추고 내면을 들여다볼 때입니다. 외부보다 자신의 상태를 먼저 돌보세요.";
  } else {
    tone = `정방향 ${drawn.length - reversedCount}장과 역방향 ${reversedCount}장이 섞여 있습니다. 나아갈 지점과 점검할 지점이 함께 있습니다.`;
  }

  let majorNote = "";
  const majorRatio = majorCount / drawn.length;
  if (majorRatio >= 0.5) {
    majorNote = `<p class="major-note">⚡ 메이저 아르카나가 ${majorCount}장 나왔습니다. 삶의 <strong>근본적 전환기</strong>에 있음을 의미합니다. 세부보다 큰 그림에 집중하세요.</p>`;
  } else if (majorCount === 0) {
    majorNote = `<p class="major-note">🌱 메이저 아르카나가 없습니다. 현재 <strong>일상의 차원</strong>에서 움직이고 있으며, 당신의 선택과 행동으로 충분히 방향을 바꿀 수 있습니다.</p>`;
  }

  summaryEl.innerHTML = `
    <h3>✦ 전체 흐름 ✦</h3>
    <p>${tone}</p>
    ${majorNote}
  `;
  summaryEl.classList.remove("hidden");
  const delay = 400 + drawn.length * 420 + 900;
  setTimeout(() => summaryEl.classList.add("visible"), delay);
}

function draw() {
  const spread = SPREADS.find((s) => s.id === selectedSpreadId);
  if (!spread) return;

  const drawn = shuffleAndDraw(spread.count);
  const question = questionInput.value.trim();

  resultTitle.textContent = spread.title;
  resultQuestion.textContent = question ? `"${question}"` : "";

  setupEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  summaryEl.classList.remove("visible");
  summaryEl.classList.add("hidden");
  yesnoResultEl.classList.remove("visible");
  yesnoResultEl.classList.add("hidden");

  renderCards(drawn, spread);

  if (spread.kind === "yesno") {
    renderYesNoResult(drawn[0]);
  } else if (!shouldUseStepMode(spread)) {
    // 단계별 모드는 마지막 리뷰 단계에서 별도 요약
    renderSummary(drawn, spread);
  }

  resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

drawBtn.addEventListener("click", draw);

againBtn.addEventListener("click", () => {
  resultEl.classList.add("hidden");
  setupEl.classList.remove("hidden");
  showRandomTip();
  setupEl.scrollIntoView({ behavior: "smooth", block: "start" });
});

// 초기화
renderSpreadOptions();
renderSpreadInfo();
showRandomTip();
