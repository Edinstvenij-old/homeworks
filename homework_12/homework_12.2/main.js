document
  .getElementById("button-container")
  .addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      document
        .querySelectorAll("#button-container button")
        .forEach((btn) => btn.classList.remove("active"));
      event.target.classList.add("active");
      document.getElementById("message").textContent =
        "Ви натиснули " + event.target.dataset.name;
    }
  });
