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

// =========================
// SHOP DROPDOWN ELEMENTS
// =========================

const shopMenu = document.getElementById("shopMenu");
const shopDropdown = document.getElementById("shopDropdown");


// =========================
// DROPDOWN POSITION
// =========================

if (shopMenu && shopDropdown) {

    shopMenu.addEventListener("mouseenter", () => {

        const nav = document.querySelector("nav");
        const navRect = nav.getBoundingClientRect();

        shopDropdown.classList.remove("hidden");

        requestAnimationFrame(() => {

            shopDropdown.style.left = `-${shopMenu.offsetLeft}px`;

            shopDropdown.style.width = `${navRect.width}px`;

        });

    });

    shopMenu.addEventListener("mouseleave", () => {

        shopDropdown.classList.add("hidden");

    });

}



// =========================
// CREATE SIMPLE DROPDOWN
// =========================

function createDropdown(products) {

    const dropdownContent =
    document.getElementById("dropdownContent");

    if (!dropdownContent) return;

    // Clear old content
    dropdownContent.innerHTML = "";



    // =========================
    // CREATE 4 PRODUCT COLUMNS
    // =========================

    const itemsPerColumn = 6;

    for (let i = 0; i < 4; i++) {

        // Create column
        const column = document.createElement("div");



        // Create list
        const ul = document.createElement("ul");

        ul.className =
        "space-y-2 flex flex-col gap-4";



        // Get products for this column
        const start = i * itemsPerColumn;

        const end = start + itemsPerColumn;

        const columnProducts =
        products.slice(start, end);



        // Add products
        columnProducts.forEach(product => {

            const li = document.createElement("li");

            li.className =
            "text-lg font-medium hover:text-primary hover:underline transition-smooth cursor-pointer";

            li.textContent = product.title;

            ul.appendChild(li);

        });



        // Append
        column.appendChild(ul);

        dropdownContent.appendChild(column);

    }



    // =========================
    // IMAGE COLUMN
    // =========================

    const imageColumn = document.createElement("div");

    imageColumn.innerHTML = `
        <img
        class="w-full object-cover rounded-md"
        src="https://jelwo.myshopify.com/cdn/shop/files/jewelry-4-menu-banner.jpg?v=1742635152&width=500"
        alt="banner">
    `;

    dropdownContent.appendChild(imageColumn);

}


// main image zoom and movements
const imageContainer = document.getElementById("mainImageContainer");
const productImage = document.getElementById("mainProductImage");
if (imageContainer && productImage) {
  imageContainer.addEventListener("mousemove", (e) => {
    const rect = imageContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    productImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    productImage.style.transform = "scale(2)";
  });
  imageContainer.addEventListener("mouseleave", () => {
    productImage.style.transformOrigin = "center center";
    productImage.style.transform = "scale(1)";
  });

}

// main img change
const mainImage = document.getElementById("mainProductImage");
const thumbnails = document.querySelectorAll(".thumbImage");
thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    mainImage.src = thumb.src;
  });
});

// Items-counter
const decreaseBtn = document.getElementById("decreaseBtn");
const increaseBtn = document.getElementById("increaseBtn");
const quantityInput = document.getElementById("quantityInput");

let quantity = 1;

increaseBtn.addEventListener("click", () => {
  quantity++;
  quantityInput.value = quantity;
});

decreaseBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantityInput.value = quantity;
  }
});

//wishlist btn
const heartBtn = document.getElementById("heartBtn");
const heartIcon = document.getElementById("heartIcon");

let liked = false;

heartBtn.addEventListener("click", () => {
  liked = !liked;

  if (liked) {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid", "text-red-500");
  } else {
    heartIcon.classList.remove("fa-solid", "text-red-500");
    heartIcon.classList.add("fa-regular");
  }
});


// =========================
// FETCH PRODUCTS
// =========================

fetch("./jelwo-product.json")

.then(response => response.json())

.then(data => {

    const products = data.products;

    console.log(products);

    createDropdown(products);

})

.catch(error => {

    console.log("ERROR:", error);

});