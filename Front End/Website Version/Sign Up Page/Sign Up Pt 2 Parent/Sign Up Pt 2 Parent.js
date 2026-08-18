document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("parent-legal-form");
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const dobInput = document.getElementById("dob");
  const genderSelect = document.getElementById("gender");
  const submitBtn = document.getElementById("parent-submit-btn");
  const backBtn = document.getElementById("back-btn");
  const ageErrorSpan = document.getElementById("age-error");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-icon");
  const htmlElement = document.documentElement;

  function validateAge(dobString) {
    const dob = new Date(dobString);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  }

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

  function checkFormValidity() {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const dobValue = dobInput.value;
    const genderValue = genderSelect.value;

    let isValid = true;

    if (!firstName || !lastName || !dobValue || !genderValue) {
      isValid = false;
    }

    if (dobValue) {
      const age = validateAge(dobValue);
      if (age < 18) {
        ageErrorSpan.style.display = "block";
        dobInput.classList.add("error");
        isValid = false;
      } else {
        ageErrorSpan.style.display = "none";
        dobInput.classList.remove("error");
      }
    } else {
      ageErrorSpan.style.display = "none";
    }

    submitBtn.disabled = !isValid;
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

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "../Sign Up Pt 1/Sign Up Pt 1.html";
    });
  }

  [firstNameInput, lastNameInput, dobInput, genderSelect].forEach((input) => {
    input.addEventListener("input", checkFormValidity);
    input.addEventListener("change", checkFormValidity);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const parentData = {
      prefix: document.getElementById("prefix").value,
      firstName: firstNameInput.value.trim(),
      middleName: document.getElementById("middle-name").value.trim(),
      lastName: lastNameInput.value.trim(),
      suffix: document.getElementById("suffix").value,
      dob: dobInput.value,
      gender: genderSelect.value,
      role: "parent",
      verificationStatus: "pending_child_link",
      createdAt: new Date().toISOString()
    };

    sessionStorage.setItem("kidInUserRole", "parent");
    sessionStorage.setItem("kidInParentLegalData", JSON.stringify(parentData));
    console.log("Parent legal data captured securely:", parentData);
  });
});