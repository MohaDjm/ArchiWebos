const form = document.getElementById("login-form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginButton = document.getElementById("loginButton");
const errorMessage = document.querySelector(".login-error-msg");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    })
    .catch((error) => {
        errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe";
        errorMessage.style.display = "inline-block";
        
      loginButton.disabled = false;
    });

  loginButton.disabled = true;
});
