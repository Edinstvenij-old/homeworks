const images = [
  "https://picsum.photos/800/500?random=1",
  "https://picsum.photos/800/500?random=2",
  "https://picsum.photos/800/500?random=3",
  "https://picsum.photos/800/500?random=4",
  "https://picsum.photos/800/500?random=5",
  "https://picsum.photos/800/500?random=6",
];

let currentIndex = 0;

function updateSlider() {
  const imageElement = document.getElementById("slider-image");
  imageElement.src = images[currentIndex];

  document.getElementById("prev-btn").style.display =
    currentIndex === 0 ? "none" : "flex";
  document.getElementById("next-btn").style.display =
    currentIndex === images.length - 1 ? "none" : "flex";

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
  document.getElementById("prev-btn").addEventListener("click", prevSlide);
  document.getElementById("next-btn").addEventListener("click", nextSlide);

  const dotsContainer = document.getElementById("dots-container");
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
});
