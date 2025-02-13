let savedLink = "";

function setLink() {
  const inputLink = prompt("Введіть посилання:");
  if (inputLink) {
    savedLink = inputLink;
    alert("Посилання збережено!");
  }
}

function redirect() {
  if (savedLink) {
    window.location.href = savedLink;
  } else {
    alert("Спочатку введіть посилання!");
  }
}
