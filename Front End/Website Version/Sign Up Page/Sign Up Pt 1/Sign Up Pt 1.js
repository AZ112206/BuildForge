document.addEventListener("DOMContentLoaded", () => {
  const roleCards = document.querySelectorAll(".role-card");
  const nextButton = document.getElementById("next-step-btn");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");
  const htmlElement = document.documentElement;

  let selectedRole = null;

  const roleRoutes = {
    student: "../Sign Up Pt 2 Student/Sign Up Pt 2.html",
    parent: "../Sign Up Pt 2 Parent/Sign Up Pt 2 Parent.html",
    teacher: "../Sign Up Pt 2 Teacher/Sign Up Pt 2.html"
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

    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("kidInTheme", nextTheme);
      updateThemeIcon(nextTheme);
    });
  }
});