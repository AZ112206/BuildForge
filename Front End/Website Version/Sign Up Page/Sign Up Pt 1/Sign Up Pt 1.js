document.addEventListener("DOMContentLoaded", () => {
  // Select all role cards and the main action pill button
  const roleCards = document.querySelectorAll(".role-card");
  const nextButton = document.getElementById("next-step-btn");

  let selectedRole = null;

  // Loop through each card to add click functionality
  roleCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove 'selected' class from all cards to reset state
      roleCards.forEach((c) => c.classList.remove("selected"));

      // Add 'selected' class to the specific card clicked
      card.classList.add("selected");

      // Capture the role value (e.g., 'student', 'parent', or 'teacher')
      selectedRole = card.getAttribute("data-role");

      // Enable the main pill button once a valid role is chosen
      if (nextButton) {
        nextButton.disabled = false;
      }
    });
  });

  // Handle the click event for moving to the next step
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (!selectedRole) return;

      // Save the selected role to session storage so Part 2 can access it
      sessionStorage.setItem("kidInUserRole", selectedRole);

      // Transition to Part 2 of the sign-up flow
      // window.location.href = "Sign Up Pt 2.html"; 
      console.log(`Moving forward with role: ${selectedRole}`);
    });
  }
});