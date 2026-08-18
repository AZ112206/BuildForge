document.addEventListener("DOMContentLoaded", () => {
  const roleCards = document.querySelectorAll(".role-card");
  const nextButton = document.getElementById("next-step-btn");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");
  const transparencyToggleBtn = document.getElementById("transparency-toggle-btn");
  const transparencyIcon = document.getElementById("transparency-icon");
  const htmlElement = document.documentElement;

  let selectedRole = null;

  const roleRoutes = {
    student: "../Sign Up Pt 2 Student/Sign Up Pt 2.html",
    parent: "../Sign Up Pt 2 Parent/Sign Up Pt 2 Parent.html",
    guest: "../Sign Up Pt 2 Student/Sign Up Pt 2.html"
  };

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function applySavedTheme() {
    const savedTheme = localStorage.getItem("kidInTheme");
    const preferredTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    htmlElement.setAttribute("data-theme", preferredTheme);
    updateThemeIcon(preferredTheme);
  }

  function updateTransparencyIcon(mode) {
    if (!transparencyIcon) return;
    transparencyIcon.textContent = mode === "transparent" ? "💎" : "⬛";
  }

  function applySavedSurfaceMode() {
    const savedMode = localStorage.getItem("kidInSurfaceMode");
    const preferredMode = savedMode === "solid" || savedMode === "transparent" ? savedMode : "transparent";
    htmlElement.setAttribute("data-surface-mode", preferredMode);
    updateTransparencyIcon(preferredMode);
  }

  roleCards.forEach((card) => {
    card.addEventListener("click", () => {
      roleCards.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedRole = card.getAttribute("data-role");

      if (nextButton) {
        nextButton.disabled = false;
      }
    });
  });

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (!selectedRole || !roleRoutes[selectedRole]) return;

      sessionStorage.setItem("kidInUserRole", selectedRole);
      window.location.href = roleRoutes[selectedRole];
    });
  }

  if (themeToggleBtn && themeIcon) {
    applySavedTheme();
    applySavedSurfaceMode();

    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("kidInTheme", nextTheme);
      updateThemeIcon(nextTheme);
    });
  }

  if (transparencyToggleBtn && transparencyIcon) {
    transparencyToggleBtn.addEventListener("click", () => {
      const currentMode = htmlElement.getAttribute("data-surface-mode") || "transparent";
      const nextMode = currentMode === "transparent" ? "solid" : "transparent";

      htmlElement.setAttribute("data-surface-mode", nextMode);
      localStorage.setItem("kidInSurfaceMode", nextMode);
      updateTransparencyIcon(nextMode);
    });
  }
});