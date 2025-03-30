import "./styles.scss";

import img1 from "./images/1.jpg";
import img5 from "./images/5.jpg";
import img8 from "./images/8.jpg";

const images = [img1, img5, img8];

let currentIndex = 0;

function updateSlider() {
  const imageElement = document.getElementById("slider-image");
  if (imageElement) {
    imageElement.src = images[currentIndex];
  }

  // Управление кнопками
  const prevButton = document.getElementById("prev-btn");
  const nextButton = document.getElementById("next-btn");

  if (prevButton) {
    prevButton.style.display = currentIndex === 0 ? "none" : "block";
  }
  if (nextButton) {
    nextButton.style.display =
      currentIndex === images.length - 1 ? "none" : "block";
  }

  // Управление точками
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function nextSlide() {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateSlider();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
}

document.addEventListener("DOMContentLoaded", () => {
  updateSlider();

  const prevButton = document.getElementById("prev-btn");
  const nextButton = document.getElementById("next-btn");

  if (prevButton) {
    prevButton.addEventListener("click", prevSlide);
  }
  if (nextButton) {
    nextButton.addEventListener("click", nextSlide);
  }

  const dotsContainer = document.getElementById("dots-container");
  if (dotsContainer) {
    images.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }
});
