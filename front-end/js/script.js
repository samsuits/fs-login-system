function validateRegisterForm() {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("emailAddress").value;
  const city = document.getElementById("city").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (
    firstname.trim() === "" ||
    lastname.trim() === "" ||
    email.trim() === "" ||
    city.trim() === "" ||
    password.trim() === "" ||
    confirmPassword.trim() === ""
  ) {
    alert("Please fill in all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  registerUser();
}

function registerUser() {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("emailAddress").value;
  const city = document.getElementById("city").value;
  const password = document.getElementById("password").value;

  const userData = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    city: city,
    password: password,
  };

  fetch("/fs-login-system/back-end/register.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success == true) {
        window.location = "register_success.html";
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      alert("Error Occured: " + error);
    });
}

function validateLoginForm() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    loginUser(email, password);
  }

  function loginUser(email, password) {
    const userData = {
      email: email,
      password: password,
    };

    fetch("/fs-login-system/back-end/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success == true) {
          window.location = "home.html";
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        alert("Error Occured: " + error);
      });
  }
