document.getElementById("phone").addEventListener("input", function (event) {
  let phoneInput = event.target;
  let value = phoneInput.value.replace(/\D/g, "");

  if (value.startsWith("38")) {
    value = value.slice(2);
  }

  let formattedValue = "+38(0";
  if (value.length > 1) formattedValue += value.substring(1, 3);
  if (value.length >= 4) formattedValue += ")" + value.substring(3, 6);
  if (value.length >= 7) formattedValue += "-" + value.substring(6, 8);
  if (value.length >= 9) formattedValue += "-" + value.substring(8, 10);

  phoneInput.value = formattedValue;
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    let name = document.getElementById("name").value.trim();
    if (name === "") {
      document.getElementById("nameError").textContent = "Поле є обов'язковим";
      isValid = false;
    } else {
      document.getElementById("nameError").textContent = "";
    }

    let message = document.getElementById("message").value.trim();
    if (message.length < 5) {
      document.getElementById("messageError").textContent =
        "Повідомлення має містити щонайменше 5 символів";
      isValid = false;
    } else {
      document.getElementById("messageError").textContent = "";
    }

    let phone = document.getElementById("phone").value.trim();
    let phoneRegex = /^\+38\(0\d{2}\)\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phone)) {
      document.getElementById("phoneError").textContent =
        "Невірний формат телефону. Має бути у форматі +38(0xx)xxx-xx-xx";
      isValid = false;
    } else {
      document.getElementById("phoneError").textContent = "";
    }

    let email = document.getElementById("email").value.trim();
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").textContent =
        "Невірний формат email. Він повинен містити @ та крапку.";
      isValid = false;
    } else {
      document.getElementById("emailError").textContent = "";
    }

    if (isValid) {
      console.table({ name, message, phone, email });
      alert("Форму успішно відправлено!");
    }
  });
