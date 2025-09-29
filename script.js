
// Load JSON
async function loadData() {
  const response = await fetch("questions.json");
  return await response.json();
}

// On categories.html
if (document.getElementById("category-list")) {
  loadData().then(data => {
    const categories = [...new Set(data.map(q => q.category))];
    const list = document.getElementById("category-list");
    categories.forEach(cat => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="questions.html?category=${cat}">${cat}</a>`;
      list.appendChild(li);
    });
  });
}

// On questions.html
if (document.getElementById("questions-list")) {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  document.getElementById("category-title").textContent = category;

  loadData().then(data => {
    const questions = data.filter(q => q.category === category);
    const list = document.getElementById("questions-list");
    questions.forEach(q => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="question.html?id=${q.id}">${q.title}</a>`;
      list.appendChild(li);
    });
  });
}

// On question.html
if (document.getElementById("question-title")) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  loadData().then(data => {
    const q = data.find(q => q.id == id);
    if (!q) return;

    document.getElementById("question-title").textContent = q.title;
    document.getElementById("question-description").textContent = q.description;

    // Language tabs
    const tabContainer = document.getElementById("language-tabs");
    const solutionContainer = document.getElementById("solution-container");

    Object.keys(q.solutions).forEach(lang => {
      const btn = document.createElement("button");
      btn.classList.add("tab");
      btn.textContent = lang;
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        solutionContainer.style.display = "block";
        solutionContainer.innerHTML = `<pre><code>${q.solutions[lang]}</code></pre>`;
      });
      tabContainer.appendChild(btn);
    });
  });
}
btn.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  solutionContainer.style.display = "block";
  solutionContainer.innerHTML = `
    <button class="copy-btn" onclick="copyCode()">Copy</button>
    <pre><code>${q.solutions[lang]}</code></pre>`;
});







