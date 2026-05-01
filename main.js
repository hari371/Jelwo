document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".hero-slide");
  const carousel = document.getElementById("carousel");
  let index = 0;

  if (!slides.length || !carousel) return;

  // RESET all animations
  function resetAnimations(slide) {
    slide.querySelectorAll(".slide-in").forEach(el => {
      el.classList.remove("slide-in-active");
    });

    slide.querySelectorAll(".fade-in").forEach(el => {
      el.classList.remove("fade-in-active");
    });

    slide.querySelectorAll(".slide-up").forEach(el => {
      el.classList.remove("slide-up-active");
    });
  }

  // RUN animation (with forced reflow fix)
  function runAnimation(slide) {
    const logo = slide.querySelector(".slide-in");
    const heading = slide.querySelector(".fade-in");
    const button = slide.querySelector(".slide-up");

    [logo, heading, button].forEach(el => {
      if (!el) return;

      // Force browser to apply initial state
      el.classList.remove(
        "slide-in-active",
        "fade-in-active",
        "slide-up-active"
      );

      void el.offsetWidth; // 🔥 important (forces reflow)
    });

    if (logo) {
      setTimeout(() => {
        logo.classList.add("slide-in-active");
      }, 100);
    }

    if (heading) {
      setTimeout(() => {
        heading.classList.add("fade-in-active");
      }, 400);
    }

    if (button) {
      setTimeout(() => {
        button.classList.add("slide-up-active");
      }, 700);
    }
  }

  // UPDATE slide
  function updateSlide() {
    slides.forEach(slide => resetAnimations(slide));

    carousel.style.transform = `translateX(-${index * 100}%)`;

    // Wait for slide movement to finish
    setTimeout(() => {
      runAnimation(slides[index]);
    }, 600);
  }

  // BUTTONS
  window.nextSlide = function () {
    index = (index + 1) % slides.length;
    updateSlide();
  };

  window.prevSlide = function () {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
  };

  // INITIAL LOAD (important delay so animation actually shows)
  setTimeout(() => {
    runAnimation(slides[index]);
  }, 200);

});

//Popular category 
document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    breakpoints: {
      0: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    },
  });
});