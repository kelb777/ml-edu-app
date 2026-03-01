// interactions.js — All interactive elements per module, namespaced
// Adding a new module's interactions: add a case to initInteractions() and a new init function

function initInteractions(moduleId) {
  switch(moduleId) {
    case 'data-prep': initDataPrep(); break;
    case 'feature-eng': initFeatureEng(); break;
    case 'linear-regression': initLinearRegression(); break;
    case 'decision-trees': initDecisionTrees(); break;
    case 'neural-networks': initNeuralNetworks(); break;
    case 'random-cut-forests': initRandomCutForests(); break;
    case 'xgboost': initXGBoost(); break;
    case 'compare-models': initCompareModels(); break;
    case 'metrics': initMetrics(); break;
    case 'explainability': initExplainability(); break;
    case 'deployment': initDeployment(); break;
    case 'mlops': initMLOps(); break;
    case 'tfm': initTFM(); break;
    case 'faq': initFAQ(); break;
    case 'competitive': initCompetitive(); break;
  }
}

// ===== HELPERS =====
function el(tag, attrs, children) {
  const e = document.createElement(tag);
  if (attrs) Object.keys(attrs).forEach(k => {
    if (k === 'style' && typeof attrs[k] === 'object') {
      Object.assign(e.style, attrs[k]);
    } else if (k.startsWith('on')) {
      e.addEventListener(k.slice(2), attrs[k]);
    } else { e.setAttribute(k, attrs[k]); }
  });
  if (typeof children === 'string') e.innerHTML = children;
  else if (Array.isArray(children)) children.forEach(c => { if (c) e.appendChild(c); });
  return e;
}

// ===== 1. DATA PREP: Before/After Toggle =====
function initDataPrep() {
  const container = document.getElementById('interactive-data-prep');
  if (!container) return;

  const messy = [
    ['Name', 'City', 'Age', 'Income', 'Joined'],
    ['John Smith', 'new york', '28', '$45,000', '01/15/2023'],
    ['Jane Doe', 'New York', '', '$62,000', '2023-03-22'],
    ['john smith', 'NY', '28', '$45,000', 'Jan 15 2023'],
    ['Bob Wilson', 'los angeles', '-3', '', '2022/11/05'],
    ['Alice Chen', 'LA', '35', '$58000', '11-05-2022'],
  ];

  const clean = [
    ['Name', 'City', 'Age', 'Income', 'Joined'],
    ['John Smith', 'New York', '28', '$45,000', '2023-01-15'],
    ['Jane Doe', 'New York', '33*', '$62,000', '2023-03-22'],
    ['Bob Wilson', 'Los Angeles', '41*', '$52,000*', '2022-11-05'],
    ['Alice Chen', 'Los Angeles', '35', '$58,000', '2022-11-05'],
  ];

  let showClean = false;

  function buildTable(data, isClean) {
    let html = '<table class="data-table" style="font-size:13px"><thead><tr>';
    data[0].forEach(h => html += `<th>${h}</th>`);
    html += '</tr></thead><tbody>';
    data.slice(1).forEach((row, ri) => {
      html += '<tr>';
      row.forEach((cell, ci) => {
        const bad = !isClean && (cell === '' || cell === '-3' || (ri === 2 && ci === 0));
        const fixed = isClean && cell.endsWith('*');
        const cls = bad ? 'color:var(--color-error);font-weight:600' : fixed ? 'color:var(--color-success);font-weight:600' : '';
        html += `<td style="${cls}">${cell || '<em style="color:var(--color-error)">MISSING</em>'}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody></table>';
    if (isClean) html += '<p style="font-size:12px;color:var(--color-text-muted);margin-top:8px">* Imputed values (estimated from patterns in the data). Duplicate removed. Formats standardized.</p>';
    return html;
  }

  function render() {
    container.innerHTML = `
      <div class="interactive-title">&#9881; Interactive Demo</div>
      <div class="toggle-switch-container">
        <span class="toggle-label ${!showClean ? 'active' : ''}">Raw (Messy)</span>
        <div class="toggle-switch ${showClean ? 'on' : ''}" id="dp-toggle"><div class="thumb"></div></div>
        <span class="toggle-label ${showClean ? 'active' : ''}">Cleaned</span>
      </div>
      <div style="overflow-x:auto">${buildTable(showClean ? clean : messy, showClean)}</div>
    `;
    container.querySelector('#dp-toggle').addEventListener('click', () => { showClean = !showClean; render(); });
  }
  render();
}

// ===== 2. FEATURE ENGINEERING: Before/After Cards =====
function initFeatureEng() {
  const container = document.getElementById('interactive-feature-eng');
  if (!container) return;

  const types = [
    {
      title: '1. Creating New Features (Derived)',
      before: 'date_of_birth: 1990-03-15\npurchase_date: 2024-11-01\nheight: 1.8m, weight: 85kg',
      after: 'age: 34\ndays_since_last_purchase: 47\nBMI: 26.2',
      why: 'Models need actionable signals, not raw timestamps. Recency and ratios carry the real insight.'
    },
    {
      title: '2. Encoding Categories',
      before: 'Color: Red, Blue, Green\n(Text labels the model cannot process)',
      after: 'Color_Red: 1, Color_Blue: 0, Color_Green: 0\nColor_Red: 0, Color_Blue: 1, Color_Green: 0',
      why: 'ML models only understand numbers. One-hot encoding avoids creating false ordinal relationships (Red=1, Blue=2 implies Blue > Red).'
    },
    {
      title: '3. Scaling / Normalization',
      before: 'Age: 25 (range 20-80)\nIncome: $45,000 (range $30K-$150K)\nModel ignores age because income numbers are 1000x larger.',
      after: 'Age_Scaled: 0.08\nIncome_Scaled: 0.13\nBoth features now contribute fairly.',
      why: 'Without scaling, features with larger numbers dominate. A PLOS ONE study showed accuracy jumped from 52% to 83% after scaling.'
    }
  ];

  let activeCard = 0;

  function render() {
    container.innerHTML = `
      <div class="interactive-title">&#9881; Interactive: Before &amp; After Cards</div>
      <div class="tab-list" style="margin-bottom:16px">
        ${types.map((t, i) => `<button class="tab-btn ${i === activeCard ? 'active' : ''}" data-idx="${i}">${t.title.split('.')[0]}. ${t.title.split('. ')[1].split(' (')[0]}</button>`).join('')}
      </div>
      <div class="before-after">
        <div class="panel before"><div class="panel-label">Before</div><pre style="white-space:pre-wrap;font-size:13px;font-family:inherit;margin:0;color:var(--color-text-secondary)">${types[activeCard].before}</pre></div>
        <div class="panel after"><div class="panel-label">After</div><pre style="white-space:pre-wrap;font-size:13px;font-family:inherit;margin:0;color:var(--color-text-secondary)">${types[activeCard].after}</pre></div>
      </div>
      <p style="font-size:13px;color:var(--color-text-muted);margin-top:8px"><strong>Why:</strong> ${types[activeCard].why}</p>
    `;
    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => { activeCard = parseInt(btn.dataset.idx); render(); });
    });
  }
  render();
}

// ===== 3. LINEAR REGRESSION: Draggable Line on Scatter Plot =====
function initLinearRegression() {
  const container = document.getElementById('interactive-linear-regression');
  if (!container) return;

  const W = 540, H = 340, PAD = 40;
  const points = [
    [60,280],[100,240],[130,220],[160,200],[190,180],[220,170],[250,150],[270,130],
    [300,140],[320,110],[350,100],[380,90],[400,80],[420,70],[140,250],[200,190],
    [280,155],[340,120],[370,105],[440,60]
  ];

  let slope = -0.52, intercept = 310;
  let dragging = false;

  function lineY(x) { return slope * x + intercept; }

  function totalError() {
    return points.reduce((sum, [px, py]) => sum + Math.pow(py - lineY(px), 2), 0);
  }

  function render() {
    const error = Math.round(totalError());
    const bestError = 28400; // approximate best fit
    const quality = Math.max(0, Math.min(100, Math.round((1 - (error - bestError) / (500000 - bestError)) * 100)));

    let svg = `<svg viewBox="0 0 ${W} ${H}" class="interactive-svg" style="touch-action:none;cursor:pointer">`;
    // Axes
    svg += `<line x1="${PAD}" y1="${H-PAD}" x2="${W-10}" y2="${H-PAD}" stroke="var(--color-border)" stroke-width="1"/>`;
    svg += `<line x1="${PAD}" y1="10" x2="${PAD}" y2="${H-PAD}" stroke="var(--color-border)" stroke-width="1"/>`;
    svg += `<text x="${W/2}" y="${H-5}" fill="var(--color-text-muted)" font-size="11" text-anchor="middle">Square Feet →</text>`;
    svg += `<text x="12" y="${H/2}" fill="var(--color-text-muted)" font-size="11" text-anchor="middle" transform="rotate(-90,12,${H/2})">Price →</text>`;

    // Error lines
    points.forEach(([px, py]) => {
      const ly = lineY(px);
      svg += `<line x1="${px}" y1="${py}" x2="${px}" y2="${ly}" stroke="var(--color-error)" stroke-width="1" opacity="0.3" stroke-dasharray="3,3"/>`;
    });

    // Best fit line
    svg += `<line x1="${PAD}" y1="${lineY(PAD)}" x2="${W-10}" y2="${lineY(W-10)}" stroke="var(--color-primary)" stroke-width="2.5"/>`;

    // Points
    points.forEach(([px, py]) => {
      svg += `<circle cx="${px}" cy="${py}" r="5" fill="var(--color-primary)" opacity="0.7"/>`;
    });

    // Drag handles
    svg += `<circle cx="${PAD}" cy="${lineY(PAD)}" r="8" fill="var(--color-primary)" stroke="white" stroke-width="2" style="cursor:grab"/>`;
    svg += `<circle cx="${W-10}" cy="${lineY(W-10)}" r="8" fill="var(--color-primary)" stroke="white" stroke-width="2" style="cursor:grab"/>`;

    svg += `</svg>`;

    container.innerHTML = `
      <div class="interactive-title">&#9881; Interactive: Fit the Line</div>
      <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:12px">Drag up/down on the chart to adjust the line. Try to minimize the error (dashed red lines).</p>
      ${svg}
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
        <span style="font-size:13px;color:var(--color-text-secondary)">Total Error: <strong style="color:${quality > 70 ? 'var(--color-success)' : quality > 40 ? 'var(--color-warning)' : 'var(--color-error)'}">${error.toLocaleString()}</strong></span>
        <span style="font-size:13px;color:var(--color-text-secondary)">Fit Quality: <strong style="color:${quality > 70 ? 'var(--color-success)' : quality > 40 ? 'var(--color-warning)' : 'var(--color-error)'}">${quality}%</strong></span>
      </div>
      <button class="anim-btn" id="lr-best-fit" style="margin-top:12px">Show Best Fit</button>
    `;

    const svgEl = container.querySelector('svg');

    function getY(e) {
      const rect = svgEl.getBoundingClientRect();
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return ((clientY - rect.top) / rect.height) * H;
    }

    svgEl.addEventListener('mousedown', () => { dragging = true; });
    svgEl.addEventListener('touchstart', () => { dragging = true; }, { passive: true });

    function onMove(e) {
      if (!dragging) return;
      const y = getY(e);
      intercept = Math.max(100, Math.min(350, y + slope * 100));
      render();
    }

    svgEl.addEventListener('mousemove', onMove);
    svgEl.addEventListener('touchmove', onMove, { passive: true });

    document.addEventListener('mouseup', () => { dragging = false; });
    document.addEventListener('touchend', () => { dragging = false; });

    container.querySelector('#lr-best-fit').addEventListener('click', () => {
      slope = -0.48; intercept = 298;
      render();
    });
  }
  render();
}

// ===== 4. DECISION TREES: Clickable Branching Tree =====
function initDecisionTrees() {
  const container = document.getElementById('interactive-decision-trees');
  if (!container) return;

  const tree = {
    q: 'Is annual income > $50K?',
    yes: {
      q: 'Is credit score > 700?',
      yes: { result: '✅ APPROVED', desc: 'High income + good credit = low risk' },
      no: {
        q: 'Has stable employment > 2 years?',
        yes: { result: '✅ APPROVED (with conditions)', desc: 'Income is good, credit is fair, but stable job mitigates risk' },
        no: { result: '❌ DENIED', desc: 'Income is adequate but poor credit and unstable employment = too risky' }
      }
    },
    no: {
      q: 'Has co-signer?',
      yes: { result: '✅ APPROVED (with co-signer)', desc: 'Low income offset by co-signer guarantee' },
      no: { result: '❌ DENIED', desc: 'Low income and no co-signer = high risk of default' }
    }
  };

  let path = [];

  function render() {
    let node = tree;
    let html = '<div class="interactive-title">&#9881; Interactive: Loan Approval Tree</div>';
    html += '<p style="font-size:13px;color:var(--color-text-muted);margin-bottom:16px">Click Yes or No at each step to walk through the decision tree.</p>';

    // Walk current path
    for (let i = 0; i < path.length; i++) {
      const step = path[i];
      html += `<div style="padding:8px 12px;margin-bottom:4px;border-left:3px solid var(--color-primary);background:var(--color-surface);border-radius:0 6px 6px 0;font-size:14px">`;
      html += `<strong>${node.q}</strong> → <span style="color:var(--color-primary);font-weight:600">${step === 'yes' ? 'Yes' : 'No'}</span>`;
      html += `</div>`;
      node = node[step];
    }

    // Current state
    if (node.result) {
      html += `<div class="card" style="margin-top:12px;border-left:4px solid ${node.result.includes('APPROVED') ? 'var(--color-success)' : 'var(--color-error)'}">`;
      html += `<div class="card-title" style="font-size:18px">${node.result}</div>`;
      html += `<div class="card-body">${node.desc}</div>`;
      html += `</div>`;
      html += `<button class="anim-btn" id="dt-reset" style="margin-top:12px">Reset Tree</button>`;
    } else {
      html += `<div class="card" style="margin-top:12px;border-left:4px solid var(--color-primary)">`;
      html += `<div class="card-title">${node.q}</div>`;
      html += `<div style="display:flex;gap:12px;margin-top:12px">`;
      html += `<button class="anim-btn" id="dt-yes" style="border-color:var(--color-success);color:var(--color-success)">Yes ✓</button>`;
      html += `<button class="anim-btn" id="dt-no" style="border-color:var(--color-error);color:var(--color-error)">No ✗</button>`;
      html += `</div></div>`;
    }

    container.innerHTML = html;

    const yesBtn = container.querySelector('#dt-yes');
    const noBtn = container.querySelector('#dt-no');
    const resetBtn = container.querySelector('#dt-reset');

    if (yesBtn) yesBtn.addEventListener('click', () => { path.push('yes'); render(); });
    if (noBtn) noBtn.addEventListener('click', () => { path.push('no'); render(); });
    if (resetBtn) resetBtn.addEventListener('click', () => { path = []; render(); });
  }
  render();
}

// ===== 5. NEURAL NETWORKS: Animated Layer Diagram =====
function initNeuralNetworks() {
  const container = document.getElementById('interactive-neural-networks');
  if (!container) return;

  const layers = [3, 5, 5, 4, 2];
  const labels = ['Input', 'Hidden 1', 'Hidden 2', 'Hidden 3', 'Output'];
  const W = 520, H = 300;
  let animating = false;
  let activeLayer = -1;

  function render() {
    const gapX = W / (layers.length + 1);
    let svg = `<svg viewBox="0 0 ${W} ${H}" class="interactive-svg">`;

    // Connections
    for (let l = 0; l < layers.length - 1; l++) {
      const x1 = gapX * (l + 1), x2 = gapX * (l + 2);
      const g1 = H / (layers[l] + 1), g2 = H / (layers[l+1] + 1);
      for (let n1 = 0; n1 < layers[l]; n1++) {
        for (let n2 = 0; n2 < layers[l+1]; n2++) {
          const active = animating && l <= activeLayer;
          svg += `<line x1="${x1}" y1="${g1*(n1+1)}" x2="${x2}" y2="${g2*(n2+1)}" stroke="${active ? 'var(--color-primary)' : 'var(--color-border)'}" stroke-width="${active ? 1.5 : 0.5}" opacity="${active ? 0.6 : 0.3}"/>`;
        }
      }
    }

    // Nodes
    for (let l = 0; l < layers.length; l++) {
      const x = gapX * (l + 1);
      const gap = H / (layers[l] + 1);
      for (let n = 0; n < layers[l]; n++) {
        const y = gap * (n + 1);
        const active = animating && l <= activeLayer;
        svg += `<circle cx="${x}" cy="${y}" r="12" fill="${active ? 'var(--color-primary)' : 'var(--color-surface)'}" stroke="${active ? 'var(--color-primary)' : 'var(--color-border)'}" stroke-width="1.5"/>`;
      }
      svg += `<text x="${x}" y="${H - 5}" fill="var(--color-text-muted)" font-size="10" text-anchor="middle">${labels[l]}</text>`;
    }

    svg += `</svg>`;

    container.innerHTML = `
      <div class="interactive-title">&#9881; Interactive: Neural Network Animation</div>
      <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:12px">Watch data flow through the network layers. Each layer detects increasingly complex patterns.</p>
      ${svg}
      <button class="anim-btn" id="nn-animate">${animating ? 'Reset' : 'Animate Data Flow →'}</button>
      <span id="nn-status" style="margin-left:12px;font-size:13px;color:var(--color-text-muted)"></span>
    `;

    container.querySelector('#nn-animate').addEventListener('click', () => {
      if (animating) { animating = false; activeLayer = -1; render(); return; }
      animating = true; activeLayer = -1;
      const msgs = ['Receiving raw input...', 'Layer 1: detecting basic patterns...', 'Layer 2: combining patterns...', 'Layer 3: forming complex features...', 'Output: prediction ready!'];
      function step() {
        activeLayer++;
        if (activeLayer >= layers.length) return;
        document.getElementById('nn-status').textContent = msgs[activeLayer] || '';
        render();
        if (activeLayer < layers.length - 1) setTimeout(step, 700);
      }
      step();
    });
  }
  render();
}

// ===== 6. RANDOM CUT FORESTS: Outlier Detection =====
function initRandomCutForests() {
  const container = document.getElementById('interactive-random-cut-forests');
  if (!container) return;

  const W = 500, H = 320;
  // Generate cluster of normal points + 1 outlier
  const normals = [];
  for (let i = 0; i < 40; i++) {
    normals.push([200 + (Math.random()-0.5)*140, 160 + (Math.random()-0.5)*120]);
  }
  const outlier = [430, 50];
  let cutLines = [];
  let step = 0;
  const maxSteps = 6;

  function render() {
    let svg = `<svg viewBox="0 0 ${W} ${H}" class="interactive-svg" style="background:var(--color-bg-alt);border-radius:8px">`;

    // Cut lines
    cutLines.forEach(line => {
      svg += `<line x1="${line[0]}" y1="${line[1]}" x2="${line[2]}" y2="${line[3]}" stroke="var(--color-primary)" stroke-width="1" stroke-dasharray="5,3" opacity="0.5"/>`;
    });

    // Normal points
    normals.forEach(([x, y]) => {
      svg += `<circle cx="${x}" cy="${y}" r="4" fill="var(--color-text-muted)" opacity="0.5"/>`;
    });

    // Outlier
    const isFound = step >= maxSteps;
    svg += `<circle cx="${outlier[0]}" cy="${outlier[1]}" r="${isFound ? 10 : 6}" fill="${isFound ? 'var(--color-error)' : 'var(--color-warning)'}" stroke="${isFound ? 'var(--color-error)' : 'none'}" stroke-width="2" opacity="${isFound ? 1 : 0.7}"/>`;
    if (isFound) {
      svg += `<text x="${outlier[0]}" y="${outlier[1] - 16}" fill="var(--color-error)" font-size="12" font-weight="700" text-anchor="middle">ANOMALY</text>`;
    }

    svg += `</svg>`;

    container.innerHTML = `
      <div class="interactive-title">&#9881; Interactive: Outlier Detection</div>
      <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:12px">Watch random cuts isolate the outlier. Points separated quickly from the crowd score as anomalies.</p>
      ${svg}
      <div style="display:flex;gap:12px;align-items:center;margin-top:8px">
        <button class="anim-btn" id="rcf-cut">${step >= maxSteps ? 'Reset' : `Add Random Cut (${step}/${maxSteps})`}</button>
        <span style="font-size:13px;color:var(--color-text-muted)">${step >= maxSteps ? 'The distant point was isolated after just a few cuts — high anomaly score!' : step > 0 ? 'The cluster needs many more cuts to separate...' : ''}</span>
      </div>
    `;

    container.querySelector('#rcf-cut').addEventListener('click', () => {
      if (step >= maxSteps) { cutLines = []; step = 0; render(); return; }
      // Generate a random cut that tends to isolate the outlier
      if (step < 3) {
        const x = 350 + Math.random() * 80;
        cutLines.push([x, 0, x, H]);
      } else {
        const y = 30 + Math.random() * 80;
        cutLines.push([0, y, W, y]);
      }
      step++;
      render();
    });
  }
  render();
}

// ===== 7. XGBOOST: Step-by-Step Boosting =====
function initXGBoost() {
  const container = document.getElementById('interactive-xgboost');
  if (!container) return;

  const steps = [
    { tree: 1, pred: [3.2, 7.1, 5.5, 2.8], actual: [4.0, 8.0, 5.0, 3.5], label: 'Tree 1 makes rough predictions' },
    { tree: 2, pred: [3.6, 7.5, 5.2, 3.1], actual: [4.0, 8.0, 5.0, 3.5], label: 'Tree 2 corrects Tree 1\'s errors' },
    { tree: 3, pred: [3.8, 7.8, 5.1, 3.3], actual: [4.0, 8.0, 5.0, 3.5], label: 'Tree 3 corrects remaining gaps' },
    { tree: 4, pred: [3.9, 7.9, 5.0, 3.4], actual: [4.0, 8.0, 5.0, 3.5], label: 'Tree 4 fine-tunes the prediction' },
    { tree: 5, pred: [4.0, 8.0, 5.0, 3.5], actual: [4.0, 8.0, 5.0, 3.5], label: 'Combined ensemble matches actual values!' },
  ];

  let currentStep = 0;

  function render() {
    const s = steps[currentStep];
    const errors = s.pred.map((p, i) => Math.abs(p - s.actual[i]).toFixed(1));
    const totalErr = errors.reduce((a, b) => a + parseFloat(b), 0).toFixed(1);

    let barsHtml = '';
    for (let i = 0; i < s.pred.length; i++) {
      const pct = (s.pred[i] / 10) * 100;
      const actPct = (s.actual[i] / 10) * 100;
      barsHtml += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="min-width:50px;font-size:12px;color:var(--color-text-muted)">Item ${i+1}</span>
        <div style="flex:1;position:relative;height:20px;background:var(--color-surface);border-radius:4px;overflow:hidden">
          <div style="position:absolute;left:0;top:0;height:100%;width:${pct}%;background:var(--color-primary);border-radius:4px;transition:width 0.5s ease"></div>
          <div style="position:absolute;left:${actPct}%;top:0;height:100%;width:2px;background:var(--color-text)"></div>
        </div>
        <span style="min-width:60px;font-size:12px;color:${parseFloat(errors[i]) < 0.2 ? 'var(--color-success)' : 'var(--color-text-secondary)'}">err: ${errors[i]}</span>
      </div>`;
    }

    container.innerHTML = `
      <div class="interactive-title">&#9881; Interactive: Watch Trees Correct Each Other</div>
      <div class="step-indicator">
        ${steps.map((_, i) => `<div class="step-dot ${i === currentStep ? 'active' : i < currentStep ? 'completed' : ''}">T${i+1}</div>${i < steps.length - 1 ? '<div class="step-connector ' + (i < currentStep ? 'completed' : '') + '"></div>' : ''}`).join('')}
      </div>
      <p style="font-size:14px;font-weight:600;color:var(--color-text);margin-bottom:12px">${s.label}</p>
      ${barsHtml}
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
        <span style="font-size:13px">Total Error: <strong style="color:${totalErr < 0.5 ? 'var(--color-success)' : 'var(--color-warning)'}">${totalErr}</strong></span>
        <div style="display:flex;gap:8px">
          <button class="anim-btn" id="xgb-prev" ${currentStep === 0 ? 'disabled style="opacity:0.3"' : ''}>← Prev</button>
          <button class="anim-btn" id="xgb-next" ${currentStep === steps.length-1 ? 'disabled style="opacity:0.3"' : ''}>Next →</button>
        </div>
      </div>
    `;

    const prevBtn = container.querySelector('#xgb-prev');
    const nextBtn = container.querySelector('#xgb-next');
    if (prevBtn && currentStep > 0) prevBtn.addEventListener('click', () => { currentStep--; render(); });
    if (nextBtn && currentStep < steps.length - 1) nextBtn.addEventListener('click', () => { currentStep++; render(); });
  }
  render();
}

// ===== 8. COMPARE MODELS: Sortable Table =====
function initCompareModels() {
  const container = document.getElementById('interactive-compare-models');
  if (!container) return;

  const models = [
    { name: 'Linear Regression', type: 'Supervised', accuracy: 'Moderate', explainability: 'Very High', speed: 'Very Fast', data: 'Small OK', best: 'Proportional relationships' },
    { name: 'Decision Trees', type: 'Supervised', accuracy: 'Moderate', explainability: 'High', speed: 'Fast', data: 'Small-Med', best: 'Non-linear, mixed data' },
    { name: 'Neural Networks', type: 'Supervised', accuracy: 'Very High', explainability: 'Very Low', speed: 'Slow', data: 'Large needed', best: 'Images, audio, text' },
    { name: 'Random Cut Forest', type: 'Unsupervised', accuracy: 'N/A (scoring)', explainability: 'Low', speed: 'Fast', data: 'Streaming', best: 'Anomaly detection' },
    { name: 'XGBoost', type: 'Supervised', accuracy: 'Very High', explainability: 'Medium', speed: 'Fast', data: 'Medium+', best: 'Tabular/spreadsheet data' },
  ];

  const cols = ['name', 'type', 'accuracy', 'explainability', 'speed', 'data', 'best'];
  const headers = ['Model', 'Type', 'Accuracy', 'Explainability', 'Speed', 'Data Need', 'Best For'];
  let sortCol = null;
  let sortAsc = true;

  function render() {
    let sorted = [...models];
    if (sortCol !== null) {
      sorted.sort((a, b) => {
        const va = a[cols[sortCol]], vb = b[cols[sortCol]];
        return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
      });
    }

    let html = '<div class="interactive-title">&#9881; Interactive: Sortable Comparison</div>';
    html += '<p style="font-size:13px;color:var(--color-text-muted);margin-bottom:12px">Click any column header to sort.</p>';
    html += '<div class="table-wrap"><table class="data-table"><thead><tr>';
    headers.forEach((h, i) => {
      const arrow = sortCol === i ? (sortAsc ? ' ↑' : ' ↓') : '';
      html += `<th style="cursor:pointer" data-col="${i}">${h}${arrow}</th>`;
    });
    html += '</tr></thead><tbody>';
    sorted.forEach(m => {
      html += '<tr>';
      cols.forEach(c => {
        let badge = '';
        if (c === 'explainability') {
          const cls = m[c].includes('Very High') || m[c].includes('High') ? 'high' : m[c].includes('Medium') ? 'medium' : 'low';
          badge = ` <span class="badge ${cls}">${m[c]}</span>`;
          html += `<td>${badge}</td>`;
        } else {
          html += `<td>${m[c]}</td>`;
        }
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';

    container.innerHTML = html;

    container.querySelectorAll('th[data-col]').forEach(th => {
      th.addEventListener('click', () => {
        const col = parseInt(th.dataset.col);
        if (sortCol === col) sortAsc = !sortAsc;
        else { sortCol = col; sortAsc = true; }
        render();
      });
    });
  }
  render();
}

// ===== 9. METRICS: Interactive Confusion Matrix =====
function initMetrics() {
  const container = document.getElementById('interactive-metrics');
  if (!container) return;

  const cells = {
    tp: { label: 'True Positive', count: 85, desc: 'Correctly flagged as fraud. Real fraud was caught.' },
    fp: { label: 'False Positive', count: 15, desc: 'Falsely flagged as fraud. Legitimate transaction was blocked — customer calls support, frustrated.' },
    fn: { label: 'False Negative', count: 10, desc: 'Missed fraud. The fraudulent transaction went through — $150+ direct loss per event.' },
    tn: { label: 'True Negative', count: 890, desc: 'Correctly cleared. Legitimate transaction went through smoothly.' },
  };

  let hovered = null;

  function render() {
    const precision = (cells.tp.count / (cells.tp.count + cells.fp.count) * 100).toFixed(0);
    const recall = (cells.tp.count / (cells.tp.count + cells.fn.count) * 100).toFixed(0);
    const f1 = (2 * (precision/100 * recall/100) / (precision/100 + recall/100) * 100).toFixed(0);

    container.innerHTML = `
      <div class="interactive-title">&#9881; Interactive: Hover to Explore</div>
      <p style="font-size:13px;color:var(--color-text-muted);margin-bottom:12px">Hover over each quadrant to understand the four outcomes of a fraud detection model.</p>
      <div class="confusion-grid">
        <div class="confusion-cell header"></div>
        <div class="confusion-cell header">Predicted: Fraud</div>
        <div class="confusion-cell header">Predicted: Legit</div>
        <div class="confusion-cell header" style="writing-mode:vertical-rl;transform:rotate(180deg)">Actually Fraud</div>
        <div class="confusion-cell tp" data-cell="tp"><span class="cell-label">${cells.tp.count}</span><span class="cell-desc">True Positive</span></div>
        <div class="confusion-cell fn" data-cell="fn"><span class="cell-label">${cells.fn.count}</span><span class="cell-desc">False Negative</span></div>
        <div class="confusion-cell header" style="writing-mode:vertical-rl;transform:rotate(180deg)">Actually Legit</div>
        <div class="confusion-cell fp" data-cell="fp"><span class="cell-label">${cells.fp.count}</span><span class="cell-desc">False Positive</span></div>
        <div class="confusion-cell tn" data-cell="tn"><span class="cell-label">${cells.tn.count}</span><span class="cell-desc">True Negative</span></div>
      </div>
      <div class="hover-explanation" id="cm-explain">${hovered ? `<strong>${cells[hovered].label}:</strong> ${cells[hovered].desc}` : 'Hover over a quadrant to see what it means in a fraud detection context.'}</div>
      <div style="display:flex;gap:16px;margin-top:12px;flex-wrap:wrap">
        <span style="font-size:13px">Precision: <strong style="color:var(--color-primary)">${precision}%</strong></span>
        <span style="font-size:13px">Recall: <strong style="color:var(--color-primary)">${recall}%</strong></span>
        <span style="font-size:13px">F1 Score: <strong style="color:var(--color-primary)">${f1}%</strong></span>
      </div>
    `;

    container.querySelectorAll('.confusion-cell[data-cell]').forEach(cell => {
      cell.addEventListener('mouseenter', () => {
        hovered = cell.dataset.cell;
        const explain = document.getElementById('cm-explain');
        if (explain) explain.innerHTML = `<strong>${cells[hovered].label}:</strong> ${cells[hovered].desc}`;
      });
    });
  }
  render();
}

// ===== 10. EXPLAINABILITY: Toggle Between Views =====
function initExplainability() {
  const container = document.getElementById('interactive-explainability');
  if (!container) return;

  const models = [
    { name: 'Linear Regression', pos: 5, level: 'Very High', color: '#22c55e' },
    { name: 'Decision Trees', pos: 25, level: 'High', color: '#4ade80' },
    { name: 'XGBoost', pos: 50, level: 'Medium', color: '#f59e0b' },
    { name: 'Random Cut Forest', pos: 70, level: 'Low', color: '#f97316' },
    { name: 'Neural Networks', pos: 92, level: 'Very Low', color: '#ef4444' },
  ];

  let showExplainable = true;

  function render() {
    container.innerHTML = `
      <div class="interactive-title">&#9881; Interactive: Explainability Spectrum</div>
      <div class="toggle-switch-container">
        <span class="toggle-label ${showExplainable ? 'active' : ''}">Explainable View</span>
        <div class="toggle-switch ${!showExplainable ? 'on' : ''}" id="exp-toggle"><div class="thumb"></div></div>
        <span class="toggle-label ${!showExplainable ? 'active' : ''}">Black-Box View</span>
      </div>
      <div style="position:relative;height:60px;background:linear-gradient(90deg,#22c55e,#f59e0b,#ef4444);border-radius:10px;margin:20px 0 50px">
        <div style="position:absolute;bottom:-20px;left:0;font-size:11px;color:var(--color-text-muted)">Most Explainable</div>
        <div style="position:absolute;bottom:-20px;right:0;font-size:11px;color:var(--color-text-muted)">Least Explainable</div>
        ${models.map(m => `
          <div style="position:absolute;left:${m.pos}%;top:50%;transform:translate(-50%,-50%);width:14px;height:14px;border-radius:50%;background:white;border:3px solid ${m.color};box-shadow:0 2px 6px rgba(0,0,0,0.2);z-index:1" title="${m.name}"></div>
          <div style="position:absolute;left:${m.pos}%;top:-28px;transform:translateX(-50%);font-size:10px;font-weight:600;color:var(--color-text);white-space:nowrap">${m.name}</div>
        `).join('')}
      </div>
      ${showExplainable ? `
        <div class="card" style="border-left:4px solid #22c55e">
          <div class="card-title">Explainable View: You see the recipe</div>
          <div class="card-body">
            <p><strong>Loan denied because:</strong></p>
            <ul style="list-style:disc;padding-left:16px;margin-top:8px">
              <li>Payment History (poor): +22% toward denial</li>
              <li>Credit Utilization (95%): +18% toward denial</li>
              <li>Employment Length: -8% (helped, but not enough)</li>
            </ul>
            <p style="margin-top:8px;font-size:12px;color:var(--color-text-muted)">Each factor's contribution is visible and auditable — satisfies ECOA adverse action requirements.</p>
          </div>
        </div>
      ` : `
        <div class="card" style="border-left:4px solid #ef4444">
          <div class="card-title">Black-Box View: You only see the verdict</div>
          <div class="card-body">
            <p><strong>Loan denied.</strong></p>
            <p style="margin-top:8px;font-size:14px;color:var(--color-text-muted)">Confidence: 72%</p>
            <p style="margin-top:8px;font-size:12px;color:var(--color-error)">No explanation available. Cannot satisfy regulatory requirements. Cannot tell the applicant what to change.</p>
          </div>
        </div>
      `}
    `;

    container.querySelector('#exp-toggle').addEventListener('click', () => { showExplainable = !showExplainable; render(); });
  }
  render();
}

// ===== 11. DEPLOYMENT: Cost Estimator =====
function initDeployment() {
  const container = document.getElementById('interactive-deployment');
  if (!container) return;

  let dataSize = 2; // 1=Small, 2=Medium, 3=Large
  let predVolume = 2; // 1=Low, 2=Medium, 3=High
  const sizeLabels = ['', 'Small (<10K rows)', 'Medium (10K-1M)', 'Large (1M+)'];
  const volLabels = ['', 'Low (<100/day)', 'Medium (1K/day)', 'High (10K+/day)'];

  function estimate() {
    const base = [0, 150, 500, 2000][dataSize];
    const mult = [0, 1, 3, 10][predVolume];
    const monthly = base * mult;
    const yearly = monthly * 12;
    const pattern = dataSize <= 2 && predVolume <= 2 ? 'Cloud' : predVolume >= 3 ? 'Cloud or On-Prem' : 'Cloud';
    return { monthly, yearly, pattern };
  }

  function render() {
    const est = estimate();
    container.innerHTML = `
      <div class="interactive-title">&#9881; Interactive: Estimate Your Costs</div>
      <div class="slider-container">
        <div class="slider-label"><span>Dataset Size</span><span class="value">${sizeLabels[dataSize]}</span></div>
        <input type="range" min="1" max="3" value="${dataSize}" id="dep-size">
      </div>
      <div class="slider-container">
        <div class="slider-label"><span>Prediction Volume</span><span class="value">${volLabels[predVolume]}</span></div>
        <input type="range" min="1" max="3" value="${predVolume}" id="dep-vol">
      </div>
      <div class="card" style="margin-top:16px;text-align:center">
        <div style="font-size:13px;color:var(--color-text-muted)">Estimated Monthly Cloud Cost</div>
        <div style="font-size:28px;font-weight:700;color:var(--color-primary);margin:8px 0">$${est.monthly.toLocaleString()}/mo</div>
        <div style="font-size:13px;color:var(--color-text-muted)">~$${est.yearly.toLocaleString()}/year · Recommended: ${est.pattern}</div>
      </div>
      <p style="font-size:12px;color:var(--color-text-muted);margin-top:12px">Estimates based on typical cloud ML deployment costs. Actual costs vary by provider, GPU requirements, and optimization.</p>
    `;

    container.querySelector('#dep-size').addEventListener('input', (e) => { dataSize = parseInt(e.target.value); render(); });
    container.querySelector('#dep-vol').addEventListener('input', (e) => { predVolume = parseInt(e.target.value); render(); });
  }
  render();
}

// ===== 12. MLOPS: Animated Drift Timeline =====
function initMLOps() {
  const container = document.getElementById('interactive-mlops');
  if (!container) return;

  const phases = [
    { label: 'Deploy', desc: 'Model goes live at 95% accuracy', color: 'var(--color-success)', pct: 95 },
    { label: 'Month 2', desc: 'Still performing well — 93%', color: 'var(--color-success)', pct: 93 },
    { label: 'Month 4', desc: 'Slight drift detected — 88%', color: 'var(--color-warning)', pct: 88 },
    { label: 'Month 6', desc: 'Significant drift — 78%', color: 'var(--color-error)', pct: 78 },
    { label: 'Retrain', desc: 'Model retrained on fresh data — 94%', color: 'var(--color-success)', pct: 94 },
    { label: 'Month 9', desc: 'Back to performing well — 92%', color: 'var(--color-success)', pct: 92 },
  ];

  let currentPhase = 0;
  let playing = false;

  function render() {
    const p = phases[currentPhase];
    let timelineHtml = '<div style="display:flex;align-items:end;gap:4px;height:120px;margin:16px 0">';
    phases.forEach((phase, i) => {
      const active = i <= currentPhase;
      timelineHtml += `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
        <div style="font-size:10px;color:${active ? phase.color : 'var(--color-text-muted)'};font-weight:${i === currentPhase ? '700' : '400'}">${phase.pct}%</div>
        <div style="width:100%;height:${phase.pct}%;max-height:100px;background:${active ? phase.color : 'var(--color-surface)'};border-radius:4px 4px 0 0;transition:all 0.4s ease;opacity:${active ? 1 : 0.3}"></div>
        <div style="font-size:9px;color:var(--color-text-muted);text-align:center;white-space:nowrap">${phase.label}</div>
      </div>`;
    });
    timelineHtml += '</div>';

    container.innerHTML = `
      <div class="interactive-title">&#9881; Interactive: Model Lifecycle</div>
      ${timelineHtml}
      <div class="card" style="border-left:4px solid ${p.color}">
        <div class="card-title">${p.label}</div>
        <div class="card-body">${p.desc}</div>
      </div>
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="anim-btn" id="mlops-play">${playing ? 'Pause' : currentPhase >= phases.length - 1 ? 'Replay' : 'Play Timeline →'}</button>
        <button class="anim-btn" id="mlops-prev" ${currentPhase === 0 ? 'disabled style="opacity:0.3"' : ''}>← Prev</button>
        <button class="anim-btn" id="mlops-next" ${currentPhase >= phases.length - 1 ? 'disabled style="opacity:0.3"' : ''}>Next →</button>
      </div>
    `;

    container.querySelector('#mlops-play').addEventListener('click', () => {
      if (currentPhase >= phases.length - 1) { currentPhase = 0; }
      playing = !playing;
      if (playing) autoPlay();
      else render();
    });
    const prevBtn = container.querySelector('#mlops-prev');
    const nextBtn = container.querySelector('#mlops-next');
    if (prevBtn && currentPhase > 0) prevBtn.addEventListener('click', () => { playing = false; currentPhase--; render(); });
    if (nextBtn && currentPhase < phases.length - 1) nextBtn.addEventListener('click', () => { playing = false; currentPhase++; render(); });
  }

  function autoPlay() {
    if (!playing || currentPhase >= phases.length - 1) { playing = false; render(); return; }
    currentPhase++;
    render();
    setTimeout(autoPlay, 1200);
  }

  render();
}

// ===== 13. TFM: Traditional vs Foundation Model =====
function initTFM() {
  const container = document.getElementById('interactive-tfm');
  if (!container) return;

  container.innerHTML = `
    <div class="interactive-title">&#9881; Interactive: Side-by-Side Comparison</div>
    <div class="before-after">
      <div class="panel before" style="border-color:var(--color-text-muted)">
        <div class="panel-label" style="color:var(--color-text-muted)">Traditional ML (XGBoost)</div>
        <ul style="list-style:none;font-size:13px;color:var(--color-text-secondary);line-height:2">
          <li>❶ Collect labeled training data</li>
          <li>❷ Engineer features manually</li>
          <li>❸ Choose algorithm + hyperparameters</li>
          <li>❹ Train model (hours of tuning)</li>
          <li>❺ Evaluate and iterate</li>
          <li>❻ Deploy trained weights</li>
        </ul>
        <div style="margin-top:12px;padding:8px;background:var(--color-surface);border-radius:6px;font-size:12px">
          <strong>Time:</strong> 4+ hours tuning<br>
          <strong>Data needed:</strong> Thousands of labeled examples<br>
          <strong>Per new dataset:</strong> Repeat entire process
        </div>
      </div>
      <div class="panel after" style="border-color:var(--color-primary)">
        <div class="panel-label" style="color:var(--color-primary)">Foundation Model (TabPFN)</div>
        <ul style="list-style:none;font-size:13px;color:var(--color-text-secondary);line-height:2">
          <li>❶ Provide your dataset as context</li>
          <li>❷ Single forward pass → predictions</li>
          <li style="color:var(--color-text-muted);text-decoration:line-through">❸ No algorithm selection needed</li>
          <li style="color:var(--color-text-muted);text-decoration:line-through">❹ No training loop</li>
          <li style="color:var(--color-text-muted);text-decoration:line-through">❺ No hyperparameter tuning</li>
          <li>❻ Deploy (or distill to fast model)</li>
        </ul>
        <div style="margin-top:12px;padding:8px;background:var(--color-primary-alpha);border-radius:6px;font-size:12px">
          <strong>Time:</strong> 2.8 seconds (5,140x faster)<br>
          <strong>Data needed:</strong> Works with 500+ samples<br>
          <strong>Per new dataset:</strong> Just provide new context
        </div>
      </div>
    </div>
  `;
}

// ===== 14. FAQ: Accordion =====
function initFAQ() {
  const container = document.getElementById('interactive-faq');
  if (!container) return;

  const faqs = [
    { q: 'How is this different from BI dashboards?', a: 'BI dashboards are a rearview mirror — they tell you what already happened. Predictive AI is the windshield — it forecasts what\'s likely to happen next. Where a dashboard says "5% of customers churned last month," a predictive model flags the 50 specific customers most likely to churn before they cancel.' },
    { q: 'What kind of data do we need?', a: 'Most enterprise ML draws from data you already have: CRM (customer interactions), ERP (orders, financials), and behavioral data (usage, support tickets). Quality matters more than quantity — a 2024 Forrester survey found 73% identified "data quality" as their primary AI challenge, not the amount of data. Practical minimum: 500–1,000 labeled records.' },
    { q: 'How long does it take to see results?', a: 'A proof-of-concept typically takes 6–12 weeks. Production deployment runs 3–6 months for standard use cases. The biggest timeline killer isn\'t the model — it\'s data readiness. Organizations with clean, accessible data move from pilot to deployment in ~90 days.' },
    { q: 'What happens when the model is wrong?', a: 'Production systems use confidence thresholds + human-in-the-loop: high-confidence predictions execute automatically (~70-90% of cases), medium-confidence goes through a rules check, and low-confidence escalates to human review. This architecture reduced error rates from 8.9% to under 1% in documented cases.' },
    { q: 'Can you explain how it makes decisions?', a: 'Yes — explainability tools like SHAP provide feature-level explanations for every individual prediction. "Loan denied because: payment history (+22%), credit utilization (+18%)." The EU AI Act (fines up to €35M) and US ECOA now mandate this for regulated decisions.' },
    { q: 'We only have a small dataset — is ML worth it?', a: 'Tabular Foundation Models change this equation entirely. TabPFN (published in Nature, 2025) achieves state-of-the-art performance on datasets under 10,000 samples — matching fully-tuned traditional models with only half the training data. Minimum viable: ~500 clean, labeled records.' },
    { q: 'What\'s the total cost of ownership?', a: 'The software license is typically less than 40% of actual costs. The remaining 60%+ goes to infrastructure, data engineering, monitoring, retraining, and talent. 85% of organizations misestimate AI project costs by more than 10%. A typical 5-year first-model TCO: $60K–$95K depending on infrastructure approach.' },
    { q: 'How often does the model need retraining?', a: 'Monthly is the pragmatic default for most use cases. Fraud detection may need weekly updates; stable domains may only need quarterly. Best practice: hybrid approach with monthly baseline retraining plus triggered retraining when drift metrics spike. Uber documented ~8% accuracy loss per month without intervention.' },
    { q: 'What\'s the difference between predictive and generative AI?', a: 'Predictive AI analyzes historical data to forecast outcomes ("which customers will churn?"). Generative AI creates new content from patterns ("write a marketing email"). Different architectures, different jobs. For enterprise decisions — lead scoring, churn, fraud, forecasting — predictive AI is the right tool.' },
    { q: 'Why trust a model over 20 years of experience?', a: 'Nobody is asking you to replace your team — it\'s augmentation. A 2024 Nature Human Behaviour meta-analysis (106 studies, 370 effect sizes) found human+AI teams significantly outperform humans alone. Your experience calibrates the model; the model scales your consistency. Chess grandmaster + computer > either alone.' },
  ];

  let openIdx = -1;

  function render() {
    let html = '<div class="interactive-title">&#9881; Click Any Question to Expand</div><div class="accordion">';
    faqs.forEach((faq, i) => {
      const isOpen = i === openIdx;
      html += `<div class="accordion-item ${isOpen ? 'open' : ''}">
        <button class="accordion-trigger" data-idx="${i}">
          <span>${faq.q}</span>
          <span class="arrow">▼</span>
        </button>
        <div class="accordion-content" style="max-height:${isOpen ? '500px' : '0'}">
          <div class="accordion-content-inner">${faq.a}</div>
        </div>
      </div>`;
    });
    html += '</div>';

    container.innerHTML = html;

    container.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const idx = parseInt(trigger.dataset.idx);
        openIdx = openIdx === idx ? -1 : idx;
        render();
      });
    });
  }
  render();
}

// ===== 15. COMPETITIVE: Interactive Taxonomy =====
function initCompetitive() {
  const container = document.getElementById('interactive-competitive');
  if (!container) return;

  const categories = [
    { name: 'Classical Statistics', methods: ['Linear Regression', 'Logistic Regression'], desc: 'Highest explainability, simplest approach. Required by many regulators. Best for proportional relationships and small datasets.', accuracy: 'Moderate', explainability: 'Very High', speed: 'Very Fast' },
    { name: 'Tree-Based Methods', methods: ['Decision Trees', 'Random Forests', 'XGBoost', 'LightGBM', 'CatBoost'], desc: 'Current state-of-the-art for tabular data. XGBoost dominates Kaggle competitions and enterprise deployments. SHAP provides explainability.', accuracy: 'Very High', explainability: 'Medium-High', speed: 'Fast' },
    { name: 'Neural Networks for Tabular', methods: ['MLP', 'TabNet', 'FT-Transformer'], desc: 'Historically underperform tree methods on tabular data (NeurIPS 2022). Better on very large datasets or when feature interactions are complex.', accuracy: 'High', explainability: 'Low', speed: 'Slow' },
    { name: 'Foundation Models', methods: ['TabPFN', 'TabPFN-2.5', 'CARTE'], desc: 'Pre-trained on millions of synthetic datasets. No hyperparameter tuning needed. Dominant on small datasets (<10K). The emerging paradigm shift.', accuracy: 'Very High', explainability: 'Medium', speed: 'Very Fast (inference)' },
    { name: 'Anomaly Detection', methods: ['Isolation Forest', 'Random Cut Forest (RCF)'], desc: 'Unsupervised — no labels needed. Detects unusual patterns in streaming data. Complementary to supervised methods, not competing.', accuracy: 'N/A (scoring)', explainability: 'Low-Medium', speed: 'Fast' },
  ];

  let selected = -1;

  function render() {
    let html = '<div class="interactive-title">&#9881; Interactive: Click to Explore Categories</div>';
    html += '<div class="taxonomy-tree">';
    categories.forEach((cat, i) => {
      const isSelected = i === selected;
      html += `<div class="taxonomy-node ${isSelected ? 'highlight' : ''}" data-idx="${i}" style="font-weight:600;font-size:15px">${cat.name}</div>`;
      if (isSelected) {
        html += `<div class="taxonomy-children" style="padding:12px 16px;margin-bottom:8px">`;
        html += `<p style="font-size:13px;color:var(--color-text-secondary);margin-bottom:8px">${cat.desc}</p>`;
        html += `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">${cat.methods.map(m => `<span class="badge">${m}</span>`).join('')}</div>`;
        html += `<div style="display:flex;gap:16px;font-size:12px;color:var(--color-text-muted)">
          <span>Accuracy: <strong>${cat.accuracy}</strong></span>
          <span>Explainability: <strong>${cat.explainability}</strong></span>
          <span>Speed: <strong>${cat.speed}</strong></span>
        </div>`;
        html += `</div>`;
      }
    });
    html += '</div>';

    container.innerHTML = html;

    container.querySelectorAll('.taxonomy-node').forEach(node => {
      node.addEventListener('click', () => {
        const idx = parseInt(node.dataset.idx);
        selected = selected === idx ? -1 : idx;
        render();
      });
    });
  }
  render();
}
