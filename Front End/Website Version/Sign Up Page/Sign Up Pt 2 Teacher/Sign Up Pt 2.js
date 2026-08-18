document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. Role Selection Logic
  // ==========================================
  const roleCards = document.querySelectorAll(".role-card");
  const nextButton = document.getElementById("next-step-btn");
  let selectedRole = null;

  roleCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Clear previous selection
      roleCards.forEach((c) => c.classList.remove("selected"));
      
      // Highlight new selection
      card.classList.add("selected");
      selectedRole = card.getAttribute("data-role");
      
      // Unlock the button
      if (nextButton) {
        nextButton.disabled = false;
      }
    });
  });

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (!selectedRole) return;
      
      // Save for Part 2
      sessionStorage.setItem("kidInUserRole", selectedRole);
      console.log(`Moving forward to Part 2 with role: ${selectedRole}`);
      
      // Next page transition (uncomment when Part 2 is ready)
      // window.location.href = "Sign Up Pt 2.html"; 
    });
  }

  // ==========================================
  // 2. Theme Toggle Logic
  // ==========================================
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");
  const transparencyToggleBtn = document.getElementById("transparency-toggle-btn");
  const transparencyIcon = document.getElementById("transparency-icon");
  const htmlElement = document.documentElement;

  // Check saved preferences or system defaults on load
  const savedTheme = localStorage.getItem("kidInTheme");
  if (savedTheme) {
    htmlElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    updateThemeIcon("dark");
  }

  const savedSurfaceMode = localStorage.getItem("kidInSurfaceMode");
  const preferredSurfaceMode = savedSurfaceMode === "solid" || savedSurfaceMode === "transparent" ? savedSurfaceMode : "transparent";
  htmlElement.setAttribute("data-surface-mode", preferredSurfaceMode);
  updateTransparencyIcon(preferredSurfaceMode);

  // Handle manual toggle clicks
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    let newTheme = "dark";

    if (currentTheme === "dark") {
      newTheme = "light";
    } else if (currentTheme === "light") {
      newTheme = "dark";
    } else {
      // Fallback if null, match current OS state and flip it
      newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark";
    }

    // Apply the theme and save it
    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("kidInTheme", newTheme);
    updateThemeIcon(newTheme);
  });

  if (transparencyToggleBtn) {
    transparencyToggleBtn.addEventListener("click", () => {
      const currentMode = htmlElement.getAttribute("data-surface-mode") || "transparent";
      const nextMode = currentMode === "transparent" ? "solid" : "transparent";

      htmlElement.setAttribute("data-surface-mode", nextMode);
      localStorage.setItem("kidInSurfaceMode", nextMode);
      updateTransparencyIcon(nextMode);
    });
  }

  // Update the moon/sun icon based on current state
  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.textContent = "☀️"; // Sun icon in dark mode
    } else {
      themeIcon.textContent = "🌙"; // Moon icon in light mode
    }
  }

  function updateTransparencyIcon(mode) {
    if (!transparencyIcon) return;
    transparencyIcon.textContent = mode === "transparent" ? "💎" : "⬛";
  }

});