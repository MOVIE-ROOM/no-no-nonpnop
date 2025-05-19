document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // For demo purposes, simulate login by redirecting to the homepage
      window.location.href = "home.html";
    });
  });
  