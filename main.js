const slides = document.querySelectorAll(".hero-slide");

function triggerAnimation() {
  slides.forEach(slide => {
    const rect = slide.getBoundingClientRect();
    const logo = slide.querySelector(".hero-logo");

    if (rect.top < window.innerHeight * 0.8) {
      logo.classList.add("logo-animate");
    }
  });
}

window.addEventListener("scroll", triggerAnimation);