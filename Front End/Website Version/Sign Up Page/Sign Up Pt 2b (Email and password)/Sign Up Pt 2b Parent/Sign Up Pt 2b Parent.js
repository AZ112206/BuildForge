document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("parent-signup-form");
  const email = document.getElementById("parent-email");
  const password = document.getElementById("parent-password");
  const confirmPassword = document.getElementById("parent-confirm-password");
  const submitBtn = document.getElementById("parent-submit-btn");
  const backBtn = document.getElementById("back-btn");
  const draftKey = "makerplexParentAccountDraft";
  const meter = form.querySelector(".password-meter");
  const meterFill = meter.querySelector(".password-meter-fill");
  const meterLabel = meter.querySelector(".password-meter-label");
  const requirement = document.getElementById("parent-password-requirement");
  const requirementIcon = requirement.querySelector(".requirement-icon");
  const confirmRequirement = document.getElementById("parent-confirm-password-requirement");
  const confirmRequirementIcon = confirmRequirement.querySelector(".requirement-icon");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");
  const transparencyToggleBtn = document.getElementById("transparency-toggle-btn");
  const transparencyIcon = document.getElementById("transparency-icon");
  const htmlElement = document.documentElement;
  function goTo(url) {
    const container = document.querySelector(".signup-container");
    if (!container) { window.location.href = url; return; }
    container.classList.add("page-exit");
    setTimeout(() => { window.location.href = url; }, 320);
  }
  const SUN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
  const MOON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const CLEAR_SQ_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>`;
  const SOLID_SQ_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor"/></svg>`;
  function applyAppearance() { const theme = localStorage.getItem("makerplexTheme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); const mode = localStorage.getItem("makerplexSurfaceMode") === "solid" ? "solid" : "transparent"; htmlElement.setAttribute("data-theme", theme); htmlElement.setAttribute("data-surface-mode", mode); themeIcon.innerHTML = theme === "dark" ? SUN_SVG : MOON_SVG; transparencyIcon.innerHTML = mode === "transparent" ? CLEAR_SQ_SVG : SOLID_SQ_SVG; }
  themeToggleBtn.addEventListener("click", () => { const theme = htmlElement.getAttribute("data-theme") === "dark" ? "light" : "dark"; htmlElement.setAttribute("data-theme", theme); localStorage.setItem("makerplexTheme", theme); themeIcon.innerHTML = theme === "dark" ? SUN_SVG : MOON_SVG; });
  transparencyToggleBtn.addEventListener("click", () => { const mode = htmlElement.getAttribute("data-surface-mode") === "transparent" ? "solid" : "transparent"; htmlElement.setAttribute("data-surface-mode", mode); localStorage.setItem("makerplexSurfaceMode", mode); transparencyIcon.innerHTML = mode === "transparent" ? CLEAR_SQ_SVG : SOLID_SQ_SVG; });
  applyAppearance();

  function updateMeter() {
    const value = password.value;
    const score = Number(value.length >= 8) + Number(/[A-Z]/.test(value)) + Number(/[0-9]/.test(value)) + Number(/[^A-Za-z0-9]/.test(value));
    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const colors = ["#EF4444", "#F97316", "#EAB308", "#84CC16", "#22C55E"];
    const level = value.length === 0 ? 0 : score + 1;
    meterFill.style.width = `${(level / 5) * 100}%`;
    meterFill.style.background = colors[score];
    meterLabel.textContent = value.length === 0 ? "Enter a password" : labels[score];
    const hasMinLength = value.length >= 8;
    requirement.classList.toggle("is-valid", hasMinLength);
    requirementIcon.textContent = hasMinLength ? "\u2713" : "\u2715";
    const passwordsMatch = confirmPassword.value.length > 0 && password.value === confirmPassword.value;
    confirmRequirement.classList.toggle("is-valid", passwordsMatch);
    confirmRequirementIcon.textContent = passwordsMatch ? "\u2713" : "\u2715";
    submitBtn.disabled = !(email.value.trim() && score >= 2 && password.value === confirmPassword.value);
  }
  const draft = JSON.parse(sessionStorage.getItem(draftKey) || "null");
  if (draft) { email.value = draft.email || ""; password.value = draft.password || ""; confirmPassword.value = draft.confirmPassword || ""; }
  [email, password, confirmPassword].forEach((input) => input.addEventListener("input", () => {
    sessionStorage.setItem(draftKey, JSON.stringify({ email: email.value, password: password.value, confirmPassword: confirmPassword.value }));
    updateMeter();
  }));
  document.querySelectorAll(".password-toggle").forEach((toggle) => toggle.addEventListener("click", () => {
    const input = document.getElementById(toggle.dataset.target);
    const showing = input.type === "password";
    input.type = showing ? "text" : "password";
    toggle.setAttribute("data-visible", showing ? "true" : "false");
    toggle.setAttribute("aria-label", showing ? "Hide password" : "Show password");
  }));
  backBtn.addEventListener("click", () => { goTo("../../Sign Up Pt 2a (Personal info)/Sign Up Pt 2a Parent/Sign Up Pt 2a Parent.html"); });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sessionStorage.setItem("makerplexUserRole", "parent");
    sessionStorage.setItem("makerplexParentAccountData", JSON.stringify({ email: email.value.trim(), role: "parent" }));
    goTo("../../Sign Up Pt 3 (Email verification)/Sign Up Pt 3.html");
  });
  updateMeter();
});
