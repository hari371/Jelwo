document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".hero-slide");
  const carousel = document.getElementById("carousel");
  let index = 0;

  if (!slides.length || !carousel) return;
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

  function runAnimation(slide) {
    const logo = slide.querySelector(".slide-in");
    const heading = slide.querySelector(".fade-in");
    const button = slide.querySelector(".slide-up");

    [logo, heading, button].forEach(el => {
      if (!el) return;
      el.classList.remove(
        "slide-in-active",
        "fade-in-active",
        "slide-up-active"
      );

      void el.offsetWidth;
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

  function updateSlide() {
    slides.forEach(slide => resetAnimations(slide));

    carousel.style.transform = `translateX(-${index * 100}%)`;
    setTimeout(() => {
      runAnimation(slides[index]);
    }, 600);
  }

  window.nextSlide = function () {
    index = (index + 1) % slides.length;
    updateSlide();
  };

  window.prevSlide = function () {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
  };

  setTimeout(() => {
    runAnimation(slides[index]);
  }, 200);

});

//Swipper
document.addEventListener("DOMContentLoaded", () => {

  // Category Swiper
  const categorySwiper = new Swiper(".categorySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },

    breakpoints: {
      0: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    },
  });

  // Testimonial Swiper
  const testimonialSwiper = new Swiper(".testimonialSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },

    breakpoints: {
      1024: { slidesPerView: 2 }
    },
  });

  //News swiper
  const newsSwiper = new Swiper(".newsSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },

    breakpoints: {
      0: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    },
  });

  //Reels Swiper
  const videoSwiper = new Swiper(".videoSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },

    navigation: {
      nextEl: ".video-next",
      prevEl: ".video-prev",
    },

    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 }
    },
  });

});

function displayNav(data) {
  const shop = document.getElementById("Shop");
  data["products"].forEach(item => {
    const link = document.createElement("option");
    link.value = item.title;
    link.textContent = item.title;
    shop.appendChild(link);
  });
}

async function loadData() {
  try {
    const response = await fetch("jelwo-product.json");
    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Data loaded:", data);
    displayNav(data);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadData);