document.addEventListener("DOMContentLoaded", function() {
  // LOGIN OPEN MODAL FUNCTION
  document.getElementById("login").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".login-area").classList.add("is-visible");
    document.body.style.overflow = "hidden";
  });

  // LOGIN CLOSE MODAL FUNCTION
  document.getElementById("close-btn").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".login-area").classList.remove("is-visible");
    document.body.style.overflow = "auto";
  });

  // REG OPEN MODAL FUNCTION
  document.getElementById("sign-up").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".sign-up-area").classList.add("is-visible");
    document.body.style.overflow = "hidden";
  });

  // REG CLOSE MODAL FUNCTION
  document.getElementById("close-btn-2").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".sign-up-area").classList.remove("is-visible");
    document.body.style.overflow = "auto";
  });

  // REG TO LOGIN FUNCTION
  document.getElementById("in-login").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".sign-up-area").classList.remove("is-visible");
    document.querySelector(".login-area").classList.add("is-visible");
  });

  // LOGIN TO REG FUNCTION
  document.getElementById("in-register").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".sign-up-area").classList.add("is-visible");
    document.querySelector(".login-area").classList.remove("is-visible");
  });

  // REG NEXT CODE
  document.getElementById("next-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("reg-username").value;

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    } else if (name === "") {
      alert("All fields are required!");
      return;
    }
    document.getElementById("register-box2").classList.add("is-visible");
    document.getElementById("register-box").classList.add("hide-it");
  });

  // REG GO BACK CODE
  document.getElementById("go-back-btn").addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("register-box2").classList.remove("is-visible");
    document.getElementById("register-box").classList.remove("hide-it");
  });

  // REG NEW USER FUNCTION
  const regBtn = document.getElementById("reg-btn");
  regBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("reg-username").value;
    const regPassword = document.getElementById("reg-password").value;
    const confirmRegPassword = document.getElementById("confirm-reg-password").value;

    if (regPassword !== confirmRegPassword) {
      alert("Passwords do not match!");
      return;
    } else if (regPassword.length < 8) {
      alert("Password is too short!");
      return;
    }

    const userData = {
      name: name,
      email: email,
      username: username,
      password: regPassword,
    };

    try {
      const response = await fetch("/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user.");
      }

      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error.message);
      alert("Failed to create user. Please try again later.");
    }
  });

  // EMAIL VALIDATION FUNCTION
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // HAMBURGAR MENU FUNCTION FOR MOBILE
  let hamburgarBtn = document.querySelector(".menu-bar");
  hamburgarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    hamburgarBtn.classList.toggle("active");

    if (hamburgarBtn.classList.contains("active")) {
      document.querySelector(".menu-ul").classList.add("nav-out-1");
      document.querySelector("nav .right").classList.add("nav-out-2");
    } else {
      document.querySelector(".menu-ul").classList.remove("nav-out-1");
      document.querySelector("nav .right").classList.remove("nav-out-2");
    }
  });
});
