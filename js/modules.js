// modules.js — Module content data for all 14+ modules
// Adding a new module: push a new object to MODULES array + add interactions in interactions.js

const MODULE_SECTIONS = [
  { id: "before", title: "Before the Model", modules: ["data-prep", "feature-eng"] },
  { id: "models", title: "The Models", modules: ["linear-regression", "decision-trees", "neural-networks", "random-cut-forests", "xgboost"] },
  { id: "compare", title: "Model Comparison", modules: ["compare-models"] },
  { id: "beyond", title: "Beyond the Model", modules: ["metrics", "explainability", "deployment", "mlops"] },
  { id: "next", title: "What's Next", modules: ["tfm", "faq"] },
  { id: "bonus", title: "Bonus", modules: ["competitive"] }
];

const MODULES = [
  // ===== MODULE 1: DATA PREPROCESSING =====
  {
    id: "data-prep",
    number: 1,
    title: "Before the Model: Data Prep",
    subtitle: "Why 80% of ML project time goes to preparing data, not building models.",
    content: `
      <div class="section-block">
        <h2>Raw Data vs. Clean Data</h2>
        <p>Raw data is what a company actually collects — transaction logs, CRM exports, sensor readings, spreadsheets filled in by humans. It arrives messy: duplicate entries, inconsistent formats ("United States" vs. "US" vs. "U.S."), values that make no sense (a customer age of -3), and fields left blank.</p>
        <p>Clean data is raw data that has been inspected and corrected. Errors are removed, missing values are addressed, and formats are standardized.</p>
        <div class="callout">
          <div class="callout-title">The Cooking Analogy</div>
          <p>Think of raw data like a bag of groceries from the store — some vegetables are bruised, there's mud on the carrots, and someone accidentally bought salt instead of sugar. Clean data is those same ingredients after you've washed, peeled, measured, and organized them. A great chef can't cook a great dish with dirty, misidentified ingredients.</p>
        </div>
      </div>

      <div class="section-block">
        <h2>Try It: Before &amp; After Data Cleaning</h2>
        <div class="interactive-container" id="interactive-data-prep">
          <div class="interactive-title">&#9881; Interactive Demo</div>
          <!-- Populated by interactions.js -->
        </div>
      </div>

      <div class="section-block">
        <h2>Garbage In, Garbage Out</h2>
        <p>If you feed a system bad input, you'll always get bad output — regardless of how sophisticated the system is. Zillow lost $500M+ when its ML model was trained on historical housing data that no longer reflected market reality. Unity Technologies lost $110M in revenue from a single customer's corrupted data contaminating their ML pipeline.</p>
        <div class="callout warning">
          <div class="callout-title">Key Stat</div>
          <p>Gartner estimates bad data costs organizations an average of $12.9 million per year.</p>
        </div>
      </div>

      <div class="section-block">
        <h2>Missing Data: Delete or Fill?</h2>
        <div class="two-col">
          <div class="card">
            <div class="card-title">Deletion</div>
            <div class="card-body">Remove incomplete rows. Works when missing data is random and small (&lt;5%). Fails badly if 30% of rows are affected — you lose critical information.</div>
          </div>
          <div class="card">
            <div class="card-title">Imputation</div>
            <div class="card-body">Fill in gaps with reasonable estimates: average values, most common category, or model-based predictions. More sophisticated but preserves data volume.</div>
          </div>
        </div>
      </div>

      <div class="section-block">
        <h2>Data Splitting: The Exam Analogy</h2>
        <p>Before training a model, you divide data into a <strong>training set</strong> (~80%) the model learns from, and a <strong>test set</strong> (~20%) it has never seen. If you train and test on the same data, the model appears to perform perfectly but is just memorizing — like acing a test by studying only the exact questions.</p>
      </div>

      <div class="section-block">
        <h2>The Data Prep Pipeline</h2>
        <div class="pipeline" id="pipeline-visual">
          <div class="pipeline-step"><div class="pipeline-box">Raw Data</div><div class="pipeline-arrow">→</div></div>
          <div class="pipeline-step"><div class="pipeline-box">Clean</div><div class="pipeline-arrow">→</div></div>
          <div class="pipeline-step"><div class="pipeline-box">Engineer Features</div><div class="pipeline-arrow">→</div></div>
          <div class="pipeline-step"><div class="pipeline-box">Split</div><div class="pipeline-arrow">→</div></div>
          <div class="pipeline-step"><div class="pipeline-box highlight">Ready for Model</div></div>
        </div>
      </div>
    `
  },

  // ===== MODULE 2: FEATURE ENGINEERING =====
  {
    id: "feature-eng",
    number: 2,
    title: "Feature Engineering Deep Dive",
    subtitle: "The most impactful lever in ML — more important than which model you pick.",
    content: `
      <div class="section-block">
        <div class="callout">
          <div class="callout-title">Key Insight</div>
          <p>"Coming up with features is difficult, time-consuming, requires expert knowledge. 'Applied machine learning' is basically feature engineering." — Prof. Andrew Ng, Stanford</p>
        </div>
        <p>Feature engineering is the process of transforming raw data into meaningful inputs that ML models need. A database might store a customer's date of birth — but what the model actually needs is <em>how old</em> they are. A timestamp says <em>when</em> something happened — but the model needs <em>how long ago</em> it happened.</p>
      </div>

      <div class="section-block">
        <h2>Three Types of Feature Engineering</h2>
        <div class="interactive-container" id="interactive-feature-eng">
          <div class="interactive-title">&#9881; Interactive: Before &amp; After Cards</div>
          <!-- Populated by interactions.js -->
        </div>
      </div>

      <div class="section-block">
        <h2>Why Scaling Matters</h2>
        <p>If you feed a model age (20–80) alongside income ($30,000–$150,000), the model will be dominated by income simply because its numbers are larger. Scaling brings all features onto a comparable range. A study in <em>PLOS ONE</em> found accuracy jumped from 52% to 83% after Z-score standardization.</p>
      </div>
    `
  },

  // ===== MODULE 3: LINEAR REGRESSION =====
  {
    id: "linear-regression",
    number: 3,
    title: "Linear Regression",
    subtitle: "Drawing the best ruler line through scattered dots to make predictions.",
    content: `
      <div class="section-block">
        <h2>What Is It? (Progressive Definitions)</h2>
        <div class="def-grid" id="lr-definitions">
          <div class="def-item" data-level="eli5"><div class="def-age">ELI5 (Age 5)</div><div class="def-preview">Click to expand...</div><div class="def-text">Linear regression is like drawing the straightest ruler line you can through a bunch of scattered dots on paper, so you can use that line to guess where a new dot might fall.</div></div>
          <div class="def-item" data-level="eli10"><div class="def-age">ELI10 (Age 10)</div><div class="def-preview">Click to expand...</div><div class="def-text">Linear regression is a way a computer draws the one best-fit straight line through a cloud of dots on a graph, so it can predict a new number — like guessing what score you'd get on a test if you studied 4 hours, based on everyone else's scores and study times.</div></div>
          <div class="def-item" data-level="eli18"><div class="def-age">ELI18 (Age 18)</div><div class="def-preview">Click to expand...</div><div class="def-text">Linear regression finds the single straight line through a dataset that minimizes the total distance between the line and every data point — giving you a formula you can use to make predictions and to measure exactly how much one thing influences another.</div></div>
          <div class="def-item" data-level="eli30"><div class="def-age">ELI30 (Age 30)</div><div class="def-preview">Click to expand...</div><div class="def-text">Linear regression is a supervised ML algorithm that fits a straight line through labeled data by minimizing the sum of squared errors, producing a transparent, interpretable equation that quantifies relationships between variables and generates continuous predictions.</div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>The Ruler on a Dot-Plot</h2>
        <p>Scatter M&Ms on graph paper. Take a ruler and lay it so it passes through as many dots as possible. That ruler is the "best-fit line." The computer measures how far each M&M is from the ruler, squares that distance, and adjusts the ruler until the total is as small as possible. That's the "least squares" method.</p>
      </div>

      <div class="section-block">
        <h2>Try It: Drag the Line</h2>
        <div class="interactive-container" id="interactive-linear-regression">
          <div class="interactive-title">&#9881; Interactive: Fit the Line</div>
          <!-- Populated by interactions.js -->
        </div>
      </div>

      <div class="section-block">
        <h2>Real-World Use Cases</h2>
        <div class="card-grid">
          <div class="icon-card"><div class="icon">🏠</div><div><div class="card-title">House Prices</div><div class="card-body">Estimate what a house is worth from size, bedrooms, and neighborhood. "A house goes up about $215 per extra square foot."</div></div></div>
          <div class="icon-card"><div class="icon">📊</div><div><div class="card-title">Ad Spend ROI</div><div class="card-body">"For every extra $1,000 spent on ads, revenue increases by about $4,200." That slope guides budget decisions.</div></div></div>
          <div class="icon-card"><div class="icon">💊</div><div><div class="card-title">Drug Dosage Effects</div><div class="card-body">"Each additional milligram reduces blood pressure by 2 points." Guides clinical dosing decisions.</div></div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>Strengths &amp; Limitations</h2>
        <div class="two-col">
          <div class="card" style="border-top:3px solid var(--color-success)">
            <div class="card-title" style="color:var(--color-success)">Strengths</div>
            <div class="card-body"><ul style="list-style:disc;padding-left:16px"><li>Fully transparent formula</li><li>Extremely fast to train</li><li>Shows which inputs matter most</li><li>Works on small datasets</li><li>Trusted standard for 200+ years</li></ul></div>
          </div>
          <div class="card" style="border-top:3px solid var(--color-error)">
            <div class="card-title" style="color:var(--color-error)">Limitations</div>
            <div class="card-body"><ul style="list-style:disc;padding-left:16px"><li>Only straight-line relationships</li><li>Sensitive to outliers</li><li>No complex interactions</li><li>Assumes stable relationships</li><li>Correlation ≠ causation</li></ul></div>
          </div>
        </div>
      </div>
    `
  },

  // ===== MODULE 4: DECISION TREES =====
  {
    id: "decision-trees",
    number: 4,
    title: "Decision Trees",
    subtitle: "A game of 20 Questions — yes/no questions that lead to an answer.",
    content: `
      <div class="section-block">
        <h2>What Is It? (Progressive Definitions)</h2>
        <div class="def-grid" id="dt-definitions">
          <div class="def-item" data-level="eli5"><div class="def-age">ELI5</div><div class="def-preview">Click to expand...</div><div class="def-text">A decision tree is like a game of "Is it an animal? Does it have four legs? Does it bark?" — a series of yes-or-no questions that leads you, step by step, to an answer.</div></div>
          <div class="def-item" data-level="eli10"><div class="def-age">ELI10</div><div class="def-preview">Click to expand...</div><div class="def-text">A decision tree is a flowchart a computer learns from examples, where at each step it asks the best possible yes-or-no question — like "Is the income over $50,000?" — and keeps branching until it reaches a final answer.</div></div>
          <div class="def-item" data-level="eli18"><div class="def-age">ELI18</div><div class="def-preview">Click to expand...</div><div class="def-text">A decision tree recursively splits a dataset into smaller subgroups based on whichever feature most cleanly separates the outcomes at each step — choosing the question that maximizes information gain.</div></div>
          <div class="def-item" data-level="eli30"><div class="def-age">ELI30</div><div class="def-preview">Click to expand...</div><div class="def-text">A non-parametric, supervised learning algorithm that partitions the feature space using a greedy, top-down recursive binary splitting strategy — selecting the feature and threshold that maximally reduces impurity (Gini or entropy).</div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>Try It: Click Through a Decision Tree</h2>
        <div class="interactive-container" id="interactive-decision-trees">
          <div class="interactive-title">&#9881; Interactive: Loan Approval Tree</div>
        </div>
      </div>

      <div class="section-block">
        <h2>Real-World Use Cases</h2>
        <div class="card-grid">
          <div class="icon-card"><div class="icon">🏦</div><div><div class="card-title">Loan Approval</div><div class="card-body">Banks evaluate credit score, income, employment history via branching rules to approve, deny, or flag applications.</div></div></div>
          <div class="icon-card"><div class="icon">🏥</div><div><div class="card-title">Medical Triage</div><div class="card-body">"Fever above 38°C? Also has neck stiffness? → Refer immediately for meningitis assessment."</div></div></div>
          <div class="icon-card"><div class="icon">🔍</div><div><div class="card-title">Fraud Detection</div><div class="card-body">"Purchase in new country? Amount unusually large? Another charge in last 2 minutes?" Routes each transaction in milliseconds.</div></div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>Strengths &amp; Limitations</h2>
        <div class="two-col">
          <div class="card" style="border-top:3px solid var(--color-success)"><div class="card-title" style="color:var(--color-success)">Strengths</div><div class="card-body"><ul style="list-style:disc;padding-left:16px"><li>Visible reasoning (flowchart)</li><li>Works out of the box</li><li>Handles messy, non-linear data</li><li>Fast to train</li><li>Highlights important features</li></ul></div></div>
          <div class="card" style="border-top:3px solid var(--color-error)"><div class="card-title" style="color:var(--color-error)">Limitations</div><div class="card-body"><ul style="list-style:disc;padding-left:16px"><li>Overfits easily (memorizes)</li><li>Fragile to small data changes</li><li>Staircase decisions (no smooth curves)</li><li>Greedy / short-sighted splits</li><li>Not for images/text/audio</li></ul></div></div>
        </div>
      </div>
    `
  },

  // ===== MODULE 5: NEURAL NETWORKS =====
  {
    id: "neural-networks",
    number: 5,
    title: "Neural Networks",
    subtitle: "Baking judges learning through feedback — layers of pattern recognition.",
    content: `
      <div class="section-block">
        <h2>What Is It? (Progressive Definitions)</h2>
        <div class="def-grid" id="nn-definitions">
          <div class="def-item" data-level="eli5"><div class="def-age">ELI5</div><div class="def-preview">Click to expand...</div><div class="def-text">A neural network is like a game of telephone where each friend changes the note slightly based on what they were taught to look for, and at the end, the last friend gives you an answer.</div></div>
          <div class="def-item" data-level="eli10"><div class="def-age">ELI10</div><div class="def-preview">Click to expand...</div><div class="def-text">A neural network is a computer program made of many connected mini-decision-makers arranged in rows, where each row learns to notice something slightly more complex than the row before.</div></div>
          <div class="def-item" data-level="eli18"><div class="def-age">ELI18</div><div class="def-preview">Click to expand...</div><div class="def-text">A ML system made of layers of mathematical units called nodes, where each node applies a learned weighted formula to its inputs and passes the result forward — learning by adjusting weights based on error.</div></div>
          <div class="def-item" data-level="eli30"><div class="def-age">ELI30</div><div class="def-preview">Click to expand...</div><div class="def-text">A parameterized function approximator composed of stacked layers of weighted linear transformations followed by non-linear activations, trained via gradient descent and backpropagation to minimize a loss function.</div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>Try It: Watch Data Flow Through Layers</h2>
        <div class="interactive-container" id="interactive-neural-networks">
          <div class="interactive-title">&#9881; Interactive: Neural Network Animation</div>
        </div>
      </div>

      <div class="section-block">
        <h2>Real-World Use Cases</h2>
        <div class="card-grid">
          <div class="icon-card"><div class="icon">🎙️</div><div><div class="card-title">Voice Assistants</div><div class="card-body">Siri, Alexa, Google Assistant — converting speech to text, understanding meaning, and generating spoken replies.</div></div></div>
          <div class="icon-card"><div class="icon">📸</div><div><div class="card-title">Face Recognition</div><div class="card-body">Early layers detect edges and contrast; middle layers detect shapes; final layers identify specific people.</div></div></div>
          <div class="icon-card"><div class="icon">🎬</div><div><div class="card-title">Streaming Recommendations</div><div class="card-body">Netflix/Spotify process watch/listen history and behavior of millions of similar users to predict your next favorite.</div></div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>Strengths &amp; Limitations</h2>
        <div class="two-col">
          <div class="card" style="border-top:3px solid var(--color-success)"><div class="card-title" style="color:var(--color-success)">Strengths</div><div class="card-body"><ul style="list-style:disc;padding-left:16px"><li>Handles messy, complex input</li><li>Discovers its own features</li><li>Scales with more data</li><li>Works across wildly different problems</li><li>Handles non-linear relationships</li></ul></div></div>
          <div class="card" style="border-top:3px solid var(--color-error)"><div class="card-title" style="color:var(--color-error)">Limitations</div><div class="card-body"><ul style="list-style:disc;padding-left:16px"><li>Needs enormous amounts of data</li><li>Expensive to train (GPUs)</li><li>Black box — can't explain itself</li><li>Prone to overfitting</li><li>Can inherit and amplify biases</li></ul></div></div>
        </div>
      </div>
    `
  },

  // ===== MODULE 6: RANDOM CUT FORESTS =====
  {
    id: "random-cut-forests",
    number: 6,
    title: "Random Cut Forests",
    subtitle: "Drawing random lines to find the oddball — unsupervised anomaly detection.",
    content: `
      <div class="section-block">
        <h2>What Is It? (Progressive Definitions)</h2>
        <div class="def-grid" id="rcf-definitions">
          <div class="def-item" data-level="eli5"><div class="def-age">ELI5</div><div class="def-preview">Click to expand...</div><div class="def-text">It's like drawing random dividing lines through a pile of toys over and over — the toy that keeps getting separated all by itself first is the oddball.</div></div>
          <div class="def-item" data-level="eli10"><div class="def-age">ELI10</div><div class="def-preview">Click to expand...</div><div class="def-text">A Random Cut Forest keeps slicing your data into random groups, and whatever gets separated from the crowd the fastest — needing almost no cuts — is flagged as the thing that doesn't belong.</div></div>
          <div class="def-item" data-level="eli18"><div class="def-age">ELI18</div><div class="def-preview">Click to expand...</div><div class="def-text">RCF builds a collection of trees by making random dividing cuts through data, and measures how "surprising" each point is by checking how much the tree structure would change if removed.</div></div>
          <div class="def-item" data-level="eli30"><div class="def-age">ELI30</div><div class="def-preview">Click to expand...</div><div class="def-text">An unsupervised ensemble algorithm constructing binary trees via random axis-aligned cuts, scoring anomalies by collusive displacement — enabling efficient real-time detection on evolving data streams.</div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>Try It: Spot the Outlier</h2>
        <div class="interactive-container" id="interactive-random-cut-forests">
          <div class="interactive-title">&#9881; Interactive: Outlier Detection</div>
        </div>
      </div>

      <div class="section-block">
        <h2>Real-World Use Cases</h2>
        <div class="card-grid">
          <div class="icon-card"><div class="icon">💳</div><div><div class="card-title">Fraud Detection</div><div class="card-body">Analyzes purchase patterns in real time — flags transactions that look completely out of character without needing labeled fraud examples.</div></div></div>
          <div class="icon-card"><div class="icon">🖥️</div><div><div class="card-title">Server Monitoring</div><div class="card-body">Monitors thousands of servers continuously, learning normal patterns and raising alerts when something deviates.</div></div></div>
          <div class="icon-card"><div class="icon">🏭</div><div><div class="card-title">IoT Sensors</div><div class="card-body">Factory sensors monitoring temperature, vibration, and pressure — detecting equipment failures before they happen.</div></div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>Strengths &amp; Limitations</h2>
        <div class="two-col">
          <div class="card" style="border-top:3px solid var(--color-success)"><div class="card-title" style="color:var(--color-success)">Strengths</div><div class="card-body"><ul style="list-style:disc;padding-left:16px"><li>No labeled data needed</li><li>Works on live streaming data</li><li>Adapts when "normal" changes</li><li>Handles many variable types</li><li>Provides continuous scores</li></ul></div></div>
          <div class="card" style="border-top:3px solid var(--color-error)"><div class="card-title" style="color:var(--color-error)">Limitations</div><div class="card-body"><ul style="list-style:disc;padding-left:16px"><li>Can't explain WHY something is anomalous</li><li>Weaker when labels are available</li><li>Requires tuning of key settings</li><li>Threshold is context-dependent</li><li>Black-box ensemble nature</li></ul></div></div>
        </div>
      </div>
    `
  },

  // ===== MODULE 7: XGBOOST =====
  {
    id: "xgboost",
    number: 7,
    title: "XGBoost",
    subtitle: "A team of specialists taking turns fixing each other's mistakes.",
    content: `
      <div class="section-block">
        <h2>What Is It? (Progressive Definitions)</h2>
        <div class="def-grid" id="xgb-definitions">
          <div class="def-item" data-level="eli5"><div class="def-age">ELI5</div><div class="def-preview">Click to expand...</div><div class="def-text">XGBoost is like a team of little helpers who each take turns trying to fix whatever the previous helper got wrong, until together they're really good at guessing the right answer.</div></div>
          <div class="def-item" data-level="eli10"><div class="def-age">ELI10</div><div class="def-preview">Click to expand...</div><div class="def-text">XGBoost builds hundreds of simple flowcharts one at a time, where each new flowchart focuses only on the cases the previous ones got wrong, then combines all of them to make a surprisingly accurate prediction.</div></div>
          <div class="def-item" data-level="eli18"><div class="def-age">ELI18</div><div class="def-preview">Click to expand...</div><div class="def-text">A machine learning algorithm that trains a sequence of shallow decision trees, where each tree is fit to correct the residual errors left by the previous ensemble, using gradient descent for optimization.</div></div>
          <div class="def-item" data-level="eli30"><div class="def-age">ELI30</div><div class="def-preview">Click to expand...</div><div class="def-text">An optimized, regularized implementation of gradient boosted decision trees with parallelized split-finding, cache-aware computation, and L1/L2 regularization.</div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>Try It: Step-by-Step Boosting</h2>
        <div class="interactive-container" id="interactive-xgboost">
          <div class="interactive-title">&#9881; Interactive: Watch Trees Correct Each Other</div>
        </div>
      </div>

      <div class="section-block">
        <h2>Real-World Use Cases</h2>
        <div class="card-grid">
          <div class="icon-card"><div class="icon">💳</div><div><div class="card-title">Credit Card Fraud</div><div class="card-body">Examines dozens of signals — amount, location, time, spending history — deciding in milliseconds whether to flag a transaction.</div></div></div>
          <div class="icon-card"><div class="icon">🏥</div><div><div class="card-title">Medical Risk</div><div class="card-body">Achieved 93% AUC-ROC identifying critically ill COVID-19 patients, outperforming Random Forest and logistic regression.</div></div></div>
          <div class="icon-card"><div class="icon">📉</div><div><div class="card-title">Customer Churn</div><div class="card-body">Takes purchase history, login frequency, and support contacts to output a probability score for at-risk customers.</div></div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>Strengths &amp; Limitations</h2>
        <div class="two-col">
          <div class="card" style="border-top:3px solid var(--color-success)"><div class="card-title" style="color:var(--color-success)">Strengths</div><div class="card-body"><ul style="list-style:disc;padding-left:16px"><li>Top accuracy on tabular data</li><li>Handles missing data automatically</li><li>Built-in overfitting protection</li><li>Very fast training</li><li>Reports feature importance</li></ul></div></div>
          <div class="card" style="border-top:3px solid var(--color-error)"><div class="card-title" style="color:var(--color-error)">Limitations</div><div class="card-body"><ul style="list-style:disc;padding-left:16px"><li>Needs hyperparameter tuning</li><li>Not for images, text, or audio</li><li>Hard to explain individual predictions</li><li>Doesn't extrapolate beyond training range</li><li>Can still overfit on small datasets</li></ul></div></div>
        </div>
      </div>
    `
  },

  // ===== MODULE 8: COMPARE ALL MODELS =====
  {
    id: "compare-models",
    number: 8,
    title: "Compare All Models",
    subtitle: "A visual comparison of all five models across key dimensions.",
    content: `
      <div class="section-block">
        <h2>Model Comparison Matrix</h2>
        <div class="interactive-container" id="interactive-compare-models">
          <div class="interactive-title">&#9881; Interactive: Sortable Comparison</div>
        </div>
      </div>

      <div class="section-block">
        <h2>When to Use Which Model</h2>
        <div class="card-grid">
          <div class="card"><div class="card-title" style="color:var(--color-primary)">Linear Regression</div><div class="card-body">Simple, proportional relationships. When you need to explain every coefficient. Small datasets. Regulatory environments.</div></div>
          <div class="card"><div class="card-title" style="color:var(--color-primary)">Decision Trees</div><div class="card-body">Complex, non-linear data. When stakeholders need visible if/then reasoning. Mixed data types. Medical triage.</div></div>
          <div class="card"><div class="card-title" style="color:var(--color-primary)">Neural Networks</div><div class="card-body">Images, audio, text. Very large datasets. Problems where accuracy trumps explainability. Research and cutting-edge applications.</div></div>
          <div class="card"><div class="card-title" style="color:var(--color-primary)">Random Cut Forests</div><div class="card-body">Anomaly detection. Streaming data. When you don't have labeled examples of "bad." Fraud monitoring. Server health.</div></div>
          <div class="card"><div class="card-title" style="color:var(--color-primary)">XGBoost</div><div class="card-body">Tabular/spreadsheet data. When you need maximum accuracy. Kaggle-style problems. Fraud classification. Demand forecasting.</div></div>
        </div>
      </div>
    `
  },

  // ===== MODULE 9: METRICS =====
  {
    id: "metrics",
    number: 9,
    title: "Model Performance Metrics",
    subtitle: "Why \"95% accuracy\" can be meaningless — and what to measure instead.",
    content: `
      <div class="section-block">
        <h2>The Accuracy Paradox</h2>
        <p>A weather app in a drought-prone desert that predicts "no rain" every day will be correct ~95% of the time. It achieves 95% accuracy while being completely useless the one day it actually rains. In ML, a model predicting "no fraud" on 98% legitimate transactions achieves 98% accuracy while catching zero fraud.</p>
        <div class="callout warning">
          <div class="callout-title">The Accuracy Paradox</div>
          <p>On imbalanced datasets, a model that predicts the majority class for ALL examples can achieve 99% accuracy while being completely useless.</p>
        </div>
      </div>

      <div class="section-block">
        <h2>Four Key Metrics</h2>
        <div class="card-grid">
          <div class="card"><div class="card-title">Precision</div><div class="card-body"><strong>Metal detector analogy:</strong> When it beeps, is it actually valuable metal? "When the model says YES, how often is it really YES?" High precision = fewer false alarms.</div></div>
          <div class="card"><div class="card-title">Recall</div><div class="card-body"><strong>Fishing net analogy:</strong> What percentage of all fish did you catch? "Of all actual YES cases, how many did the model find?" High recall = fewer missed cases.</div></div>
          <div class="card"><div class="card-title">F1 Score</div><div class="card-body"><strong>Balance dial:</strong> Only goes up when BOTH precision AND recall are good. The harmonic mean prevents gaming by maximizing just one.</div></div>
          <div class="card"><div class="card-title">Accuracy</div><div class="card-body">How often is the model right overall? Useful only when classes are balanced AND both error types cost the same. Often misleading.</div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>The Confusion Matrix</h2>
        <div class="interactive-container" id="interactive-metrics">
          <div class="interactive-title">&#9881; Interactive: Hover to Explore</div>
        </div>
      </div>

      <div class="section-block">
        <h2>The Real Cost of Errors: Fraud Example</h2>
        <p>Missing a fraudulent transaction costs ~$150 in direct loss. A false alarm (blocking a legitimate customer) costs ~$5 in investigation — but $34 in long-term lost sales per $1 of false decline revenue. Merchants lose 75x more revenue to false declines than to actual fraud.</p>
      </div>
    `
  },

  // ===== MODULE 10: EXPLAINABILITY =====
  {
    id: "explainability",
    number: 10,
    title: "The Explainability Spectrum",
    subtitle: "From transparent recipe followers to intuitive chefs — and why it matters for compliance.",
    content: `
      <div class="section-block">
        <h2>The Accuracy-Explainability Tradeoff</h2>
        <p>A linear regression model is a recipe you can follow step by step. A neural network is a master chef who "just knows" how to season a dish but can't tell you why. The more accurate a model, the less explainable it tends to be — though this isn't always true for tabular data.</p>
      </div>

      <div class="section-block">
        <h2>Try It: Black Box ↔ Explainable</h2>
        <div class="interactive-container" id="interactive-explainability">
          <div class="interactive-title">&#9881; Interactive: Explainability Spectrum</div>
        </div>
      </div>

      <div class="section-block">
        <h2>SHAP &amp; LIME: Making Black Boxes Talk</h2>
        <p><strong>The Judge Analogy:</strong> A judge doesn't just announce a verdict — they explain the ruling. SHAP and LIME do the same for model predictions: they explain precisely why this specific input received this specific output.</p>
        <div class="two-col">
          <div class="card"><div class="card-title">SHAP</div><div class="card-body">Treats each feature as a "player" and calculates its contribution to each prediction. Grounded in game theory. Best for tree-based models.</div></div>
          <div class="card"><div class="card-title">LIME</div><div class="card-body">Creates many variations of an input, observes how predictions change, and fits a simple local model to explain. Works on any model type.</div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>Regulatory Landscape</h2>
        <div class="callout warning">
          <div class="callout-title">Compliance Alert</div>
          <p><strong>EU AI Act (2026):</strong> Fines up to €35 million or 7% of global annual turnover for high-risk AI systems without adequate explainability. <strong>ECOA (US):</strong> Credit denials must include specific, explainable reasons. <strong>GDPR Article 22:</strong> Right to "meaningful information about the logic" of automated decisions.</p>
        </div>
      </div>
    `
  },

  // ===== MODULE 11: DEPLOYMENT =====
  {
    id: "deployment",
    number: 11,
    title: "Deployment & Infrastructure",
    subtitle: "Getting a model out of the garage and onto the road — where most projects fail.",
    content: `
      <div class="section-block">
        <div class="callout warning">
          <div class="callout-title">The Deployment Gap</div>
          <p>87–90% of ML models never reach production. Building a model is like building a car in a garage — you can engineer it to perfection, but until you put it on the road, it does nothing useful.</p>
        </div>
      </div>

      <div class="section-block">
        <h2>Three Deployment Patterns</h2>
        <div class="card-grid">
          <div class="card"><div class="card-title">☁️ Cloud ("Renting")</div><div class="card-body">Pay-as-you-go, scales instantly, $150-300/mo basic. Provider handles hardware. Risk: costs accumulate, vendor lock-in.</div></div>
          <div class="card"><div class="card-title">🏢 On-Premises ("Owning")</div><div class="card-body">$60K+ upfront, full data sovereignty, lower long-term TCO at scale. Risk: requires IT staff, slow to scale.</div></div>
          <div class="card"><div class="card-title">📱 Edge ("In-Device")</div><div class="card-body">Lowest latency (10-200ms), works offline. Autonomous vehicles, smartphones. Risk: limited compute, complex updates.</div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>GPU Explainer: Buses vs. Sedans</h2>
        <p>A CPU is a car — fast and flexible for a few passengers. A GPU is a fleet of buses — each "bus" is slower, but there are thousands running in parallel. ML training means doing the same math on millions of numbers simultaneously — exactly what buses are built for. An NVIDIA H100 has ~16,896 cores vs. a CPU's 4-16 cores.</p>
      </div>

      <div class="section-block">
        <h2>Try It: Cost Estimator</h2>
        <div class="interactive-container" id="interactive-deployment">
          <div class="interactive-title">&#9881; Interactive: Estimate Your Costs</div>
        </div>
      </div>

      <div class="section-block">
        <h2>5-Year TCO Benchmarks</h2>
        <p>First model with no scalable framework: <strong>$60,750 over 5 years</strong>. With MLOps framework: <strong>$94,500</strong> for the first model, but the second model drops to just <strong>$24,000</strong> — the framework investment pays for itself by model #2.</p>
      </div>
    `
  },

  // ===== MODULE 12: MLOPS =====
  {
    id: "mlops",
    number: 12,
    title: "MLOps & Monitoring",
    subtitle: "Why ML is a continuous investment — the GPS analogy for model drift.",
    content: `
      <div class="section-block">
        <h2>What Is Model Drift?</h2>
        <p>A GPS map from 2020 was accurate in 2020. By 2025, new roads exist, old roads are closed, speed limits changed. The GPS confidently gives directions — they're just increasingly wrong. ML models face the same problem. The model isn't broken. The world changed.</p>
        <div class="callout">
          <div class="callout-title">Key Stat</div>
          <p>91% of ML models degrade over time. Uber documented ~8% accuracy loss per month without intervention. The average model "half-life" is approximately 6 months.</p>
        </div>
      </div>

      <div class="section-block">
        <h2>Data Drift vs. Concept Drift</h2>
        <div class="two-col">
          <div class="card"><div class="card-title">Data Drift</div><div class="card-body">The <strong>inputs</strong> changed. Your customer demographics shifted. Like a restaurant trained for young adults now serving retirees — the menu preferences changed, but what "good food" means stayed the same.</div></div>
          <div class="card"><div class="card-title">Concept Drift</div><div class="card-body">The <strong>relationship</strong> between inputs and outputs changed. Spam in 2024 looks different than spam in 2019. The model receives familiar-looking inputs, but what they <em>mean</em> has fundamentally shifted.</div></div>
        </div>
      </div>

      <div class="section-block">
        <h2>Drift Timeline</h2>
        <div class="interactive-container" id="interactive-mlops">
          <div class="interactive-title">&#9881; Interactive: Model Lifecycle</div>
        </div>
      </div>

      <div class="section-block">
        <h2>Retraining Strategies</h2>
        <div class="card-grid">
          <div class="card"><div class="card-title">Time-Based</div><div class="card-body">Retrain on a fixed schedule (monthly, quarterly). Simple and predictable. Risk: may miss sudden drift or waste compute.</div></div>
          <div class="card"><div class="card-title">Trigger-Based</div><div class="card-body">Monitor performance; retrain when accuracy drops below a threshold. More efficient. Requires monitoring infrastructure.</div></div>
          <div class="card"><div class="card-title">Hybrid (Best Practice)</div><div class="card-body">Monthly baseline retraining + triggered retraining when drift metrics spike. Catches both gradual and sudden changes.</div></div>
        </div>
      </div>

      <div class="callout">
        <div class="callout-title">ML Is a Continuous Investment</div>
        <p>Annual ML maintenance runs 20–30% of initial development costs. Subscription fees represent less than 40% of actual ML expenses. Organizations that actively manage drift report 61% lower accuracy decay rates.</p>
      </div>
    `
  },

  // ===== MODULE 13: TABULAR FOUNDATION MODELS =====
  {
    id: "tfm",
    number: 13,
    title: "Tabular Foundation Models",
    subtitle: "What if the model already saw a million datasets before yours?",
    content: `
      <div class="section-block">
        <h2>The Doctor Analogy</h2>
        <p>Imagine hiring two doctors. One trained at a single clinic seeing 1,000 patients. The other trained across 100 hospitals seeing millions of patients with every condition imaginable — and then walks into your clinic. Even on their first day, the second doctor brings vastly more pattern recognition. That's a Tabular Foundation Model.</p>
      </div>

      <div class="section-block">
        <h2>Try It: Traditional vs. Foundation Model</h2>
        <div class="interactive-container" id="interactive-tfm">
          <div class="interactive-title">&#9881; Interactive: Side-by-Side Comparison</div>
        </div>
      </div>

      <div class="section-block">
        <h2>Key Benchmark: TabPFN</h2>
        <p>Published in <em>Nature</em> (January 2025), TabPFN is pre-trained on <strong>130 million synthetic datasets</strong>. It achieves predictions in <strong>2.8 seconds</strong> vs. <strong>4+ hours</strong> of traditional tuning — a <strong>5,140x speedup</strong>. With only half the training data, it matches the accuracy of fully-tuned traditional models.</p>
        <p>TabPFN-2.5 (November 2025) achieved a <strong>100% win rate vs. default XGBoost</strong> on datasets ≤10K samples.</p>
      </div>

      <div class="section-block">
        <h2>Evolution Timeline</h2>
        <div class="table-wrap"><table class="data-table">
          <thead><tr><th>Year</th><th>Method</th><th>Significance</th></tr></thead>
          <tbody>
            <tr><td>1805</td><td>Linear Regression</td><td>Method of least squares</td></tr>
            <tr><td>1984</td><td>CART Decision Trees</td><td>First formal decision tree algorithm</td></tr>
            <tr><td>2001</td><td>Random Forests</td><td>Ensemble of trees with random sampling</td></tr>
            <tr><td>2014</td><td>XGBoost</td><td>Gradient boosting dominance begins</td></tr>
            <tr><td>2025</td><td>TabPFN (Nature)</td><td>Foundation model for tabular data</td></tr>
            <tr><td>2025</td><td>TabPFN-2.5</td><td>100% win rate vs. XGBoost on small data</td></tr>
          </tbody>
        </table></div>
        <div class="callout">
          <div class="callout-title">Key Insight</div>
          <p>Every model type is still used today. Foundation models learn FROM traditional approaches — TabPFN literally uses Random Forest-based data partitioning internally. They build on, not replace.</p>
        </div>
      </div>
    `
  },

  // ===== MODULE 14: FAQ =====
  {
    id: "faq",
    number: 14,
    title: "Buyer FAQ Cheat Sheet",
    subtitle: "10 common questions with data-backed answers and analogies.",
    content: `
      <div class="section-block">
        <div class="interactive-container" id="interactive-faq">
          <div class="interactive-title">&#9881; Click Any Question to Expand</div>
        </div>
      </div>
    `
  },

  // ===== BONUS: COMPETITIVE LANDSCAPE =====
  {
    id: "competitive",
    number: 15,
    title: "Competitive Landscape",
    subtitle: "A taxonomy of ML approaches for structured data.",
    content: `
      <div class="section-block">
        <h2>ML Approach Taxonomy</h2>
        <div class="interactive-container" id="interactive-competitive">
          <div class="interactive-title">&#9881; Interactive: Click to Explore Categories</div>
        </div>
      </div>

      <div class="section-block">
        <h2>XGBoost vs. LightGBM vs. CatBoost</h2>
        <div class="table-wrap"><table class="data-table">
          <thead><tr><th>Property</th><th>XGBoost</th><th>LightGBM</th><th>CatBoost</th></tr></thead>
          <tbody>
            <tr><td>Tree growth</td><td>Level-wise</td><td>Leaf-wise</td><td>Symmetric</td></tr>
            <tr><td>Training speed</td><td>Moderate</td><td><strong>Fastest</strong></td><td>Slowest</td></tr>
            <tr><td>Accuracy</td><td><strong>Highest avg</strong></td><td>Near XGBoost</td><td>Stable</td></tr>
            <tr><td>Categorical data</td><td>Manual encoding</td><td>Native</td><td><strong>Best native</strong></td></tr>
            <tr><td>Small datasets</td><td>Good</td><td>Needs tuning</td><td><strong>Robust</strong></td></tr>
            <tr><td>Large datasets</td><td>Good</td><td><strong>Best</strong></td><td>Good</td></tr>
          </tbody>
        </table></div>
      </div>

      <div class="section-block">
        <h2>Key Competitive Scenarios</h2>
        <div class="card-grid">
          <div class="card"><div class="card-title">vs. XGBoost (Incumbent)</div><div class="card-body">XGBoost is a model, not a system. The real cost is building and maintaining the production infrastructure — pipelines, monitoring, retraining, explainability — not the algorithm itself.</div></div>
          <div class="card"><div class="card-title">vs. Internal DS Teams</div><div class="card-body">Data science teams excel at building models. Few are excellent at productionizing them: serving predictions, monitoring drift, explaining outputs to non-technical users.</div></div>
          <div class="card"><div class="card-title">vs. Manual Analysis</div><div class="card-body">A human can review 50 accounts. An AI scores 50,000 simultaneously, consistently, without fatigue. ML-based forecasting improves accuracy by 10-20% over manual methods.</div></div>
        </div>
      </div>

      <div class="callout">
        <div class="callout-title">The Real Positioning</div>
        <p>"We're not competing with XGBoost the algorithm — we're competing with the proposition that a team can build, deploy, and maintain a production-grade predictive AI system in-house at less total cost and time."</p>
      </div>
    `
  }
];
