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

function createSwiperIfPresent(selector, config) {
  if (!document.querySelector(selector) || typeof Swiper === "undefined") {
    return null;
  }
  return new Swiper(selector, config);
}

// Swiper
document.addEventListener("DOMContentLoaded", () => {
  createSwiperIfPresent(".categorySwiper", {
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
    }
  });

  createSwiperIfPresent(".testimonialSwiper", {
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
    }
  });

  createSwiperIfPresent(".newsSwiper", {
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
    }
  });

  createSwiperIfPresent(".videoSwiper", {
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
      prevEl: ".video-prev"
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 }
    }
  });
});

// SHOP DROPDOWN ELEMENTS
const shopMenu = document.getElementById("shopMenu");
const shopDropdown = document.getElementById("shopDropdown");

// DROPDOWN POSITION
if (shopMenu && shopDropdown) {
  let hideDropdownTimeoutId = null;
  function openShopDropdown() {
    const nav = document.querySelector("nav");
    const navRect = nav.getBoundingClientRect();
    if (hideDropdownTimeoutId) {
        window.clearTimeout(hideDropdownTimeoutId);
        hideDropdownTimeoutId = null;
    }
    shopDropdown.classList.remove("hidden");
    requestAnimationFrame(() => {
        shopDropdown.style.left = `-${shopMenu.offsetLeft}px`;
        shopDropdown.style.width = `${navRect.width}px`;
    });
  }

  function scheduleShopDropdownClose() {
    if (hideDropdownTimeoutId) {
        window.clearTimeout(hideDropdownTimeoutId);
    }
    hideDropdownTimeoutId = window.setTimeout(() => {
        shopDropdown.classList.add("hidden");
    }, 180);
  }
  shopMenu.addEventListener("mouseenter", openShopDropdown);
  shopMenu.addEventListener("mouseleave", scheduleShopDropdownClose);
  shopDropdown.addEventListener("mouseenter", openShopDropdown);
  shopDropdown.addEventListener("mouseleave", scheduleShopDropdownClose);
}

// CREATE SIMPLE DROPDOWN
function createDropdown(products) {
  const dropdownContent =
  document.getElementById("dropdownContent");
  if (!dropdownContent) return;
  dropdownContent.innerHTML = "";
  dropdownContent.className = "grid grid-cols-5 gap-8 items-start";

  // CREATE 4 PRODUCT COLUMNS
  const itemsPerColumn = 6;
  for (let i = 0; i < 4; i++) {
    const column = document.createElement("div");
    column.className = "border-r border-gray-100 pr-6 min-h-[220px] flex";
    const ul = document.createElement("ul");
    ul.className = "w-full flex flex-col gap-1";

    // Get products for this column
    const start = i * itemsPerColumn;
    const end = start + itemsPerColumn;
    const columnProducts = products.slice(start, end);

    // Add products
    columnProducts.forEach(product => {
      const li = document.createElement("li");
      li.className =
      "group flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition-smooth cursor-pointer";
      li.innerHTML = `
        <span class="truncate pr-3">${product.title}</span>
        <span class="text-primary/60 group-hover:translate-x-1 transition-transform duration-200">&rsaquo;</span>
      `;
      li.addEventListener("click", () => {
        window.location.href = `product.html?handle=${encodeURIComponent(product.handle)}`;
      });
      ul.appendChild(li);
    });

    // Append
    column.appendChild(ul);
    dropdownContent.appendChild(column);
  }

  // IMAGE COLUMN
  const imageColumn = document.createElement("div");
  imageColumn.className = "pl-2";
  imageColumn.innerHTML = `
    <div class="relative min-h-full overflow-hidden rounded-[24px] bg-primary/10">
      <img
        class="absolute inset-0 h-full w-full object-contain"
        src="https://jelwo.myshopify.com/cdn/shop/files/jewelry-4-menu-banner.jpg?v=1742635152&width=500"
        alt="banner">
      <div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/45 to-black/10"></div>
      <div class="relative z-10 flex h-full flex-col justify-end gap-3 p-6">
        <span class="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">Shop Edit</span>
        <h4 class="max-w-[180px] text-2xl font-medium leading-tight text-gray-900">Fresh picks for your next jewelry look</h4>
        <span class="inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm">
          Explore collection
        </span>
      </div>
    </div>
  `;
  dropdownContent.appendChild(imageColumn);
}

const STORAGE_KEYS = {
  cart: "jelwo-cart",
  wishlist: "jelwo-wishlist"
};

let jelwoCatalogByHandle = {};

function readStoredItems(key) {
  try {
    const rawValue = window.localStorage.getItem(key);
    const parsedValue = JSON.parse(rawValue || "[]");
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    console.log("Storage read error:", error);
    return [];
  }
}

function writeStoredItems(key, items) {
  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.log("Storage write error:", error);
  }
}

function getCartItems() {
  return readStoredItems(STORAGE_KEYS.cart);
}

function setCartItems(items) {
  writeStoredItems(STORAGE_KEYS.cart, items);
  updateHeaderCounts();
  renderStorageDrawer();
}

function getWishlistItems() {
  return readStoredItems(STORAGE_KEYS.wishlist);
}

function setWishlistItems(items) {
  writeStoredItems(STORAGE_KEYS.wishlist, items);
  updateHeaderCounts();
  renderStorageDrawer();
  syncJewelryCarouselWishlistUi();
}

function getCartCount() {
  return getCartItems().reduce((total, item) => {
    return total + Number(item.quantity || 0);
  }, 0);
}

function getWishlistCount() {
  return getWishlistItems().length;
}

function updateHeaderCounts() {
  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();
  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = `(${cartCount})`;
  });

  document.querySelectorAll("[data-wishlist-count]").forEach((element) => {
    element.textContent = `(${wishlistCount})`;
  });
}

function getSelectedOptionMap(product, selectedOptions) {
  const optionMap = {};
  (product.options || []).forEach((option) => {
    const value = selectedOptions[option.position];
    if (value) {
      optionMap[option.name] = value;
    }
  });
  return optionMap;
}

function getDefaultSelectedOptions(product, variant) {
  const selectedOptions = {};
  const baseVariant = variant || product?.variants?.[0] || null;
  (product?.options || []).forEach((option) => {
    const position = option.position;
    selectedOptions[position] =
      baseVariant?.[`option${position}`] || option.values?.[0] || "";
  });
  return selectedOptions;
}

function getSelectedOptionsFromVariant(product, variant) {
  const selectedOptions = {};
  (product?.options || []).forEach((option) => {
    const position = option.position;
    selectedOptions[position] = variant?.[`option${position}`] ?? "";
  });
  return selectedOptions;
}

function setJewelrySwiperWishlistButtonUi(button, isActive) {
  const icon = button.querySelector("i");
  if (!icon) return;
  icon.classList.remove("fa-solid", "fa-regular", "text-red-500", "text-gray-800");
  if (isActive) {
    icon.classList.add("fa-solid", "fa-heart", "text-red-500");
  } else {
    icon.classList.add("fa-regular", "fa-heart", "text-gray-800");
  }
  button.setAttribute("aria-pressed", isActive ? "true" : "false");
  button.setAttribute(
    "aria-label",
    isActive ? "Remove from wishlist" : "Add to wishlist"
  );
}

function syncJewelryCarouselWishlistUi() {
  document
    .querySelectorAll(
      ".newJewelrysSwiper [data-jewelry-wishlist], .trendingProductsSwiper [data-jewelry-wishlist]"
    )
    .forEach((btn) => {
      const handle = btn.getAttribute("data-product-handle");
      if (!handle) return;
      const product = jelwoCatalogByHandle[handle];
      if (!product) return;
      const slide = btn.closest(".swiper-slide");
      const select = slide?.querySelector("[data-jewelry-variant-select]");
      const variantId = select ? Number(select.value) : NaN;
      const variant =
        (Number.isFinite(variantId)
          ? product.variants?.find((v) => Number(v.id) === variantId)
          : null) || product.variants?.[0];
      if (!variant) return;
      setJewelrySwiperWishlistButtonUi(btn, isWishlisted(product, variant));
    });
}

function syncJewelrySlideAddToCartUi(slideEl) {
  if (!slideEl) return;
  const select = slideEl.querySelector("[data-jewelry-variant-select]");
  const addBtn = slideEl.querySelector("[data-jewelry-add-to-cart]");
  if (!addBtn || !select) return;
  const handle = addBtn.getAttribute("data-product-handle");
  const product = jelwoCatalogByHandle[handle];
  const variantId = Number(select.value);
  const variant = product?.variants?.find((v) => Number(v.id) === variantId);
  const defaultText = addBtn.dataset.defaultText || "Add to cart";
  if (!variant) {
    addBtn.disabled = true;
    addBtn.textContent = defaultText;
    return;
  }
  addBtn.disabled = !variant.available;
  addBtn.textContent = variant.available ? defaultText : "Out of stock";
}

function initNewJewelrysSwiperCardActions() {
  if (initNewJewelrysSwiperCardActions.bound) {
    return;
  }
  initNewJewelrysSwiperCardActions.bound = true;

  document.addEventListener("click", (event) => {
    const jewelryCarousel = event.target.closest(
      ".newJewelrysSwiper, .trendingProductsSwiper"
    );
    if (!jewelryCarousel) {
      return;
    }

    const wishBtn = event.target.closest("[data-jewelry-wishlist]");
    if (wishBtn) {
      event.preventDefault();
      event.stopPropagation();
      const handle = wishBtn.getAttribute("data-product-handle");
      if (!handle) return;
      const product = jelwoCatalogByHandle[handle];
      const slide = wishBtn.closest(".swiper-slide");
      const select = slide?.querySelector("[data-jewelry-variant-select]");
      const variantId = select ? Number(select.value) : NaN;
      const variant =
        (Number.isFinite(variantId)
          ? product?.variants?.find((v) => Number(v.id) === variantId)
          : null) || product?.variants?.[0];
      if (!product || !variant) return;
      const selectedOptions = getSelectedOptionsFromVariant(product, variant);
      toggleWishlistItem(product, variant, selectedOptions);
      setJewelrySwiperWishlistButtonUi(
        wishBtn,
        isWishlisted(product, variant)
      );
      return;
    }

    const viewBtn = event.target.closest("[data-jewelry-view]");
    if (viewBtn) {
      event.preventDefault();
      event.stopPropagation();
      const handle = viewBtn.getAttribute("data-product-handle");
      if (!handle) return;
      window.location.href = `product.html?handle=${encodeURIComponent(handle)}`;
      return;
    }

    const qtyMinus = event.target.closest("[data-jewelry-qty-minus]");
    if (qtyMinus) {
      event.preventDefault();
      event.stopPropagation();
      const wrap = qtyMinus.closest(".jewelry-slide-cart");
      const input = wrap?.querySelector("[data-jewelry-qty-input]");
      if (!input) return;
      let v = Number.parseInt(String(input.value).trim(), 10);
      if (!Number.isFinite(v)) v = 1;
      input.value = String(Math.max(1, v - 1));
      return;
    }

    const qtyPlus = event.target.closest("[data-jewelry-qty-plus]");
    if (qtyPlus) {
      event.preventDefault();
      event.stopPropagation();
      const wrap = qtyPlus.closest(".jewelry-slide-cart");
      const input = wrap?.querySelector("[data-jewelry-qty-input]");
      if (!input) return;
      let v = Number.parseInt(String(input.value).trim(), 10);
      if (!Number.isFinite(v)) v = 1;
      input.value = String(Math.min(99, v + 1));
      return;
    }

    const addCart = event.target.closest("[data-jewelry-add-to-cart]");
    if (addCart) {
      event.preventDefault();
      event.stopPropagation();
      if (addCart.disabled) return;
      const handle = addCart.getAttribute("data-product-handle");
      if (!handle) return;
      const product = jelwoCatalogByHandle[handle];
      const wrap = addCart.closest(".jewelry-slide-cart");
      const select = wrap?.querySelector("[data-jewelry-variant-select]");
      const input = wrap?.querySelector("[data-jewelry-qty-input]");
      const variantId = select ? Number(select.value) : NaN;
      const variant =
        (Number.isFinite(variantId)
          ? product?.variants?.find((v) => Number(v.id) === variantId)
          : null) || product?.variants?.[0];
      if (!product || !variant || !variant.available) return;
      let qty = Number.parseInt(String(input?.value || "1").trim(), 10);
      if (!Number.isFinite(qty) || qty < 1) qty = 1;
      qty = Math.min(99, Math.floor(qty));
      const selectedOptions = getSelectedOptionsFromVariant(product, variant);
      const ok = addItemToCart(product, variant, selectedOptions, qty);
      if (ok) {
        flashButtonMessage(addCart, "Added", addCart.dataset.defaultText);
        openStorageDrawer("cart");
      }
      return;
    }
  });

  document.addEventListener("change", (event) => {
    const sel = event.target.closest("[data-jewelry-variant-select]");
    if (!sel) return;
    if (!sel.closest(".newJewelrysSwiper, .trendingProductsSwiper")) return;
    const slide = sel.closest(".swiper-slide");
    if (!slide) return;
    const handle = sel.getAttribute("data-product-handle");
    const product = jelwoCatalogByHandle[handle];
    const variantId = Number(sel.value);
    const variant = product?.variants?.find((v) => Number(v.id) === variantId);
    const btn = slide.querySelector("[data-jewelry-wishlist]");
    if (btn && product && variant) {
      setJewelrySwiperWishlistButtonUi(btn, isWishlisted(product, variant));
    }
    syncJewelrySlideAddToCartUi(slide);
  });
}

function getVariantStorageKey(product, variant) {
  return variant?.id
    ? `${product.handle}-${variant.id}`
    : product.handle;
}

function buildStoredItem(product, variant, selectedOptions, quantity = 1) {
  const selectedOptionMap = getSelectedOptionMap(product, selectedOptions);
  return {
    key: getVariantStorageKey(product, variant),
    productId: product.id,
    variantId: variant?.id || null,
    handle: product.handle,
    title: product.title,
    vendor: product.vendor,
    price: Number(variant?.price || 0),
    compareAtPrice: Number(variant?.compare_at_price || 0),
    image:
      variant?.featured_image?.src ||
      product.images?.[0]?.src ||
      "",
    options: selectedOptionMap,
    quantity: Number(quantity || 1)
  };
}

function addItemToCart(product, variant, selectedOptions, quantityToAdd) {
  if (!product || !variant) {
    return false;
  }
  const cartItems = getCartItems();
  const itemKey = getVariantStorageKey(product, variant);
  const existingItemIndex = cartItems.findIndex((item) => item.key === itemKey);
  if (existingItemIndex >= 0) {
    cartItems[existingItemIndex].quantity =
      Number(cartItems[existingItemIndex].quantity || 0) +
      Number(quantityToAdd || 1);
    cartItems[existingItemIndex].price = Number(variant.price || 0);
    cartItems[existingItemIndex].compareAtPrice =
      Number(variant.compare_at_price || 0);
    cartItems[existingItemIndex].image =
      variant?.featured_image?.src ||
      product.images?.[0]?.src ||
      "";
    cartItems[existingItemIndex].options =
      getSelectedOptionMap(product, selectedOptions);
  } else {
    cartItems.push(
      buildStoredItem(product, variant, selectedOptions, quantityToAdd)
    );
  }
  setCartItems(cartItems);
  return true;
}

function isWishlisted(product, variant) {
  if (!product || !variant) {
    return false;
  }
  const itemKey = getVariantStorageKey(product, variant);
  return getWishlistItems().some((item) => item.key === itemKey);
}

function toggleWishlistItem(product, variant, selectedOptions) {
  if (!product || !variant) {
    return false;
  }
  const itemKey = getVariantStorageKey(product, variant);
  const wishlistItems = getWishlistItems();
  const existingItemIndex =
    wishlistItems.findIndex((item) => item.key === itemKey);
  if (existingItemIndex >= 0) {
    wishlistItems.splice(existingItemIndex, 1);
    setWishlistItems(wishlistItems);
    return false;
  }
  wishlistItems.push(buildStoredItem(product, variant, selectedOptions, 1));
  setWishlistItems(wishlistItems);
  return true;
}

function setWishlistButtonState(isActive) {
  const heartIcon = document.getElementById("heartIcon");
  const wishlistLabel = document.getElementById("wishlistLabel");
  if (!heartIcon || !wishlistLabel) return;
  if (isActive) {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid", "text-red-500");
    wishlistLabel.textContent = "Wishlisted";
  } else {
    heartIcon.classList.remove("fa-solid", "text-red-500");
    heartIcon.classList.add("fa-regular");
    wishlistLabel.textContent = "Wishlist";
  }
}

function updateAddToCartButtonState(button, variant) {
  if (!button) return;
  const isAvailable = Boolean(variant?.available);
  const defaultText = button.dataset.defaultText || button.textContent.trim();
  button.disabled = !isAvailable;
  button.textContent = isAvailable ? defaultText : "Out of stock";
  button.style.opacity = isAvailable ? "1" : "0.6";
  button.style.cursor = isAvailable ? "pointer" : "not-allowed";
}

function flashButtonMessage(button, message, fallbackText) {
  if (!button) return;
  const resetText = fallbackText || button.dataset.defaultText || "Add to cart";
  if (button.dataset.flashTimeoutId) {
    window.clearTimeout(Number(button.dataset.flashTimeoutId));
  }
  button.textContent = message;
  const timeoutId = window.setTimeout(() => {
    button.textContent = resetText;
    delete button.dataset.flashTimeoutId;
  }, 1400);
  button.dataset.flashTimeoutId = String(timeoutId);
}

function formatCountdownParts(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds);
  const days = Math.floor(safeSeconds / 86400);
  const hours = Math.floor((safeSeconds % 86400) / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return [days, hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(" : ");
}

function parseCountdownText(countdownText) {
  const parts = String(countdownText || "")
    .split(":")
    .map((value) => Number(value.trim()));
  if (parts.length !== 4 || parts.some((value) => !Number.isFinite(value))) {
    return null;
  }
  const [days, hours, minutes, seconds] = parts;
  return (((days * 24) + hours) * 60 + minutes) * 60 + seconds;
}

function initSaleCountdown() {
  document.querySelectorAll("[data-sale-countdown]").forEach((countdownElement) => {
    if (countdownElement.dataset.countdownStarted === "true") {
      return;
    }
    const totalSeconds = parseCountdownText(countdownElement.textContent);
    if (totalSeconds === null) {
      return;
    }
    const endTimestamp = Date.now() + totalSeconds * 1000;
    let intervalId = null;
    function updateCountdown() {
      const secondsRemaining = Math.max(
        0,
        Math.floor((endTimestamp - Date.now()) / 1000)
      );
      countdownElement.textContent = formatCountdownParts(secondsRemaining);
      if (secondsRemaining <= 0) {
        window.clearInterval(intervalId);
      }
    }
    countdownElement.dataset.countdownStarted = "true";
    updateCountdown();
    intervalId = window.setInterval(updateCountdown, 1000);
  });
}

let activeDrawerType = null;
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getStoredItemOptionSummary(item) {
  const options = item?.options || {};
  const entries = Object.entries(options);
  if (!entries.length) {
    return "";
  }
  return entries.map(([name, value]) => `${name}: ${value}`).join(" / ");
}

function ensureStorageDrawer() {
  let drawerRoot = document.getElementById("storageDrawerRoot");
  if (drawerRoot) {
    return drawerRoot;
  }
  drawerRoot = document.createElement("div");
  drawerRoot.id = "storageDrawerRoot";
  drawerRoot.style.display = "none";
  drawerRoot.style.position = "fixed";
  drawerRoot.style.inset = "0";
  drawerRoot.style.zIndex = "2000";
  drawerRoot.innerHTML = `
    <div
      data-drawer-overlay
      style="position:absolute;inset:0;background:rgba(17,24,39,0.45);"
    ></div>
    <aside
      data-drawer-panel
      style="position:absolute;top:0;right:0;height:100%;width:min(420px,100%);background:#ffffff;box-shadow:-10px 0 30px rgba(0,0,0,0.15);display:flex;flex-direction:column;"
    >
      <div style="display:flex;justify-content:space-between;align-items:center;padding:20px 20px 16px;border-bottom:1px solid #e5e7eb;">
        <div>
          <h3 id="storageDrawerTitle" style="margin:0;font-size:20px;font-weight:600;color:#111827;">Your items</h3>
          <p id="storageDrawerSubtitle" style="margin:6px 0 0;font-size:14px;color:#6b7280;">Saved locally in this browser.</p>
        </div>
        <button
          type="button"
          data-drawer-close
          aria-label="Close"
          style="border:none;background:transparent;font-size:28px;line-height:1;cursor:pointer;color:#6b7280;"
        >
          &times;
        </button>
      </div>
      <div id="storageDrawerItems" style="flex:1;overflow:auto;padding:20px;"></div>
      <div style="padding:16px 20px;border-top:1px solid #e5e7eb;display:flex;gap:12px;justify-content:space-between;align-items:center;">
        <button
          type="button"
          id="storageDrawerSecondaryBtn"
          style="border:1px solid #d1d5db;background:#fff;color:#111827;padding:10px 14px;border-radius:9999px;cursor:pointer;font-weight:500;"
        >
          Clear all
        </button>
        <button
          type="button"
          data-drawer-close
          style="border:none;background:#111827;color:#fff;padding:10px 16px;border-radius:9999px;cursor:pointer;font-weight:600;"
        >
          Close
        </button>
      </div>
    </aside>
  `;
  document.body.appendChild(drawerRoot);
  drawerRoot.querySelectorAll("[data-drawer-close]").forEach((button) => {
    button.addEventListener("click", closeStorageDrawer);
  });

  const overlay = drawerRoot.querySelector("[data-drawer-overlay]");
  if (overlay) {
    overlay.addEventListener("click", closeStorageDrawer);
  }

  const secondaryButton = drawerRoot.querySelector("#storageDrawerSecondaryBtn");
  if (secondaryButton) {
    secondaryButton.addEventListener("click", () => {
      if (activeDrawerType === "cart") {
        setCartItems([]);
      } else if (activeDrawerType === "wishlist") {
        setWishlistItems([]);
      }
    });
  }

  const itemsContainer = drawerRoot.querySelector("#storageDrawerItems");
  if (itemsContainer) {
    itemsContainer.addEventListener("click", (event) => {
      const actionButton = event.target.closest("[data-drawer-action]");
      if (!actionButton) return;
      const { drawerAction, itemKey, itemHandle } = actionButton.dataset;
      if (drawerAction === "remove") {
        removeStoredDrawerItem(activeDrawerType, itemKey);
      }
      if (drawerAction === "decrease") {
        updateCartItemQuantity(itemKey, -1);
      }
      if (drawerAction === "increase") {
        updateCartItemQuantity(itemKey, 1);
      }
      if (drawerAction === "move-to-cart") {
        const wasMoved = moveWishlistItemToCart(itemKey);
        if (wasMoved) {
          openStorageDrawer("cart");
        }
      }
      if (drawerAction === "view" && itemHandle) {
        window.location.href = `product.html?handle=${encodeURIComponent(itemHandle)}`;
      }
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawerRoot.style.display !== "none") {
      closeStorageDrawer();
    }
  });
  return drawerRoot;
}

function removeStoredDrawerItem(type, itemKey) {
  if (!itemKey) return;
  if (type === "cart") {
    setCartItems(getCartItems().filter((item) => item.key !== itemKey));
  }
  if (type === "wishlist") {
    setWishlistItems(getWishlistItems().filter((item) => item.key !== itemKey));
  }
}

function updateCartItemQuantity(itemKey, delta) {
  if (!itemKey || !delta) return;
  const nextItems = getCartItems()
    .map((item) => {
      if (item.key !== itemKey) {
        return item;
      }
      return {
        ...item,
        quantity: Number(item.quantity || 0) + delta
      };
    })
  .filter((item) => Number(item.quantity || 0) > 0);
  setCartItems(nextItems);
}

function moveWishlistItemToCart(itemKey) {
  if (!itemKey) return false;
  const wishlistItems = getWishlistItems();
  const wishlistItem = wishlistItems.find((item) => item.key === itemKey);
  if (!wishlistItem) return false;
  const cartItems = getCartItems();
  const existingCartIndex = cartItems.findIndex((item) => item.key === itemKey);
  if (existingCartIndex >= 0) {
    cartItems[existingCartIndex].quantity =
      Number(cartItems[existingCartIndex].quantity || 0) + 1;
  } else {
    cartItems.push({
      ...wishlistItem,
      quantity: 1
    });
  }
  setCartItems(cartItems);
  setWishlistItems(wishlistItems.filter((item) => item.key !== itemKey));
  return true;
}

function renderStorageDrawerItem(item) {
  const optionSummary = getStoredItemOptionSummary(item);
  const comparePriceMarkup =
    item.compareAtPrice && item.compareAtPrice > item.price
      ? `<span style="font-size:13px;color:#9ca3af;text-decoration:line-through;">${escapeHtml(formatMoney(item.compareAtPrice))}</span>`
      : "";
  return `
    <div style="display:flex;gap:12px;padding:14px 0;border-bottom:1px solid #f3f4f6;">
      <img
        src="${escapeHtml(item.image || "")}"
        alt="${escapeHtml(item.title)}"
        style="width:74px;height:74px;object-fit:cover;border-radius:12px;background:#f3f4f6;flex-shrink:0;"
      >
      <div style="flex:1;min-width:0;">
        <button
          type="button"
          data-drawer-action="view"
          data-item-handle="${escapeHtml(item.handle || "")}"
          style="border:none;background:none;padding:0;margin:0 0 6px;color:#111827;font-weight:600;font-size:15px;cursor:pointer;text-align:left;"
        >
          ${escapeHtml(item.title)}
        </button>
        <div style="font-size:13px;color:#6b7280;line-height:1.5;">
          ${optionSummary ? `${escapeHtml(optionSummary)}<br>` : ""}
          ${escapeHtml(item.vendor || "")}
        </div>
        <div style="display:flex;gap:8px;align-items:center;margin-top:10px;flex-wrap:wrap;">
          <span style="font-size:14px;font-weight:600;color:#A77F66;">${escapeHtml(formatMoney(item.price))}</span>
          ${comparePriceMarkup}
        </div>
      </div>
    </div>
  `;
}

function renderCartDrawerItem(item) {
  const baseMarkup = renderStorageDrawerItem(item);
  return `
    <div style="position:relative;">
      ${baseMarkup}
      <div style="position:absolute;right:0;bottom:14px;display:flex;align-items:center;gap:10px;">
        <div style="display:flex;align-items:center;border:1px solid #d1d5db;border-radius:9999px;overflow:hidden;">
          <button type="button" data-drawer-action="decrease" data-item-key="${escapeHtml(item.key)}" style="border:none;background:#fff;padding:6px 10px;cursor:pointer;">-</button>
          <span style="padding:0 10px;font-size:14px;color:#111827;">${escapeHtml(Number(item.quantity || 0))}</span>
          <button type="button" data-drawer-action="increase" data-item-key="${escapeHtml(item.key)}" style="border:none;background:#fff;padding:6px 10px;cursor:pointer;">+</button>
        </div>
        <button type="button" data-drawer-action="remove" data-item-key="${escapeHtml(item.key)}" style="border:none;background:none;color:#b91c1c;cursor:pointer;font-size:13px;font-weight:600;">Remove</button>
      </div>
    </div>
  `;
}

function renderWishlistDrawerItem(item) {
  const baseMarkup = renderStorageDrawerItem(item);
  return `
    <div style="position:relative;">
      ${baseMarkup}
      <div style="position:absolute;right:0;bottom:14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end;">
        <button type="button" data-drawer-action="move-to-cart" data-item-key="${escapeHtml(item.key)}" style="border:1px solid #111827;background:#111827;color:#fff;border-radius:9999px;padding:7px 12px;cursor:pointer;font-size:12px;font-weight:600;">Add to cart</button>
        <button type="button" data-drawer-action="remove" data-item-key="${escapeHtml(item.key)}" style="border:none;background:none;color:#b91c1c;cursor:pointer;font-size:13px;font-weight:600;">Remove</button>
      </div>
    </div>
  `;
}

function renderStorageDrawer() {
  if (!activeDrawerType) {
    return;
  }
  const drawerRoot = ensureStorageDrawer();
  const titleElement = drawerRoot.querySelector("#storageDrawerTitle");
  const subtitleElement = drawerRoot.querySelector("#storageDrawerSubtitle");
  const itemsElement = drawerRoot.querySelector("#storageDrawerItems");
  const secondaryButton = drawerRoot.querySelector("#storageDrawerSecondaryBtn");
  const items =
    activeDrawerType === "cart" ? getCartItems() : getWishlistItems();
  if (!titleElement || !subtitleElement || !itemsElement || !secondaryButton) {
    return;
  }
  titleElement.textContent =
    activeDrawerType === "cart" ? "Your cart" : "Your wishlist";
  if (activeDrawerType === "cart") {
    const subtotal = items.reduce((total, item) => {
      return total + Number(item.price || 0) * Number(item.quantity || 0);
    }, 0);
    subtitleElement.textContent =
      items.length
        ? `${getCartCount()} item(s) saved locally. Subtotal ${formatMoney(subtotal)}.`
        : "Your cart is empty.";
    secondaryButton.textContent = "Clear cart";
  } else {
    subtitleElement.textContent =
      items.length
        ? `${items.length} saved item(s) in this browser.`
        : "Your wishlist is empty.";
    secondaryButton.textContent = "Clear wishlist";
  }
  if (!items.length) {
    itemsElement.innerHTML = `
      <div style="height:100%;display:flex;align-items:center;justify-content:center;text-align:center;padding:32px 12px;color:#6b7280;line-height:1.7;">
        No saved items yet.
      </div>
    `;
    return;
  }
  itemsElement.innerHTML = items
  .map((item) => {
    return activeDrawerType === "cart"
      ? renderCartDrawerItem(item)
      : renderWishlistDrawerItem(item);
  })
  .join("");
}

function openStorageDrawer(type) {
  if (!type) return;
  activeDrawerType = type;
  const drawerRoot = ensureStorageDrawer();
  renderStorageDrawer();
  drawerRoot.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeStorageDrawer() {
  const drawerRoot = document.getElementById("storageDrawerRoot");
  if (!drawerRoot) return;
  drawerRoot.style.display = "none";
  document.body.style.overflow = "";
}

function initStorageDrawerTriggers() {
  document.querySelectorAll("[data-open-cart]").forEach((element) => {
    element.addEventListener("click", () => {
      openStorageDrawer("cart");
    });
  });

  document.querySelectorAll("[data-open-wishlist]").forEach((element) => {
    element.addEventListener("click", () => {
      openStorageDrawer("wishlist");
    });
  });
}

function formatMoney(value) {
  const amount = Number(value || 0);
  return `Rs. ${amount.toFixed(2)}`;
}

function formatCheckoutInr(value) {
  const amount = Number(value || 0);
  return `₹${amount.toFixed(2)}`;
}

function getVariantCheckoutLabel(variant) {
  const parts = [variant.option1, variant.option2, variant.option3].filter(
    (part) => part != null && String(part).trim() !== ""
  );
  return parts.join(" · ") || variant.title || "";
}

function getProductCardImageUrl(product) {
  const baseVariant = product.variants?.[0];
  return (
    baseVariant?.featured_image?.src ||
    product.images?.[0]?.src ||
    ""
  );
}

function buildJewelryCarouselSlideHtml(product) {
  const productUrl = (handle) =>
    `product.html?handle=${encodeURIComponent(handle || "")}`;
  const variant = product.variants?.[0];
  const imgSrc = getProductCardImageUrl(product);
  const title = escapeHtml(product.title || "");
  const category = escapeHtml(product.product_type || "Jewelry");
  const href = productUrl(product.handle);
  const price = formatMoney(variant?.price);
  const compareRaw = variant?.compare_at_price;
  const hasSale =
    compareRaw != null &&
    Number(compareRaw) > Number(variant?.price ?? 0);

  const compareLine = hasSale
    ? `<span class="text-base font-normal leading-tight text-gray-500 line-through">${formatMoney(
        compareRaw
      )}</span>`
    : `<span class="invisible text-base font-normal leading-tight select-none" aria-hidden="true">${formatMoney(
        "0"
      )}</span>`;

  const saleBadgeOverlay = `<span class="pointer-events-none absolute left-4 top-4 z-50 rounded px-2 py-1 text-sm font-medium shadow-sm ${
    hasSale
      ? "bg-green-500 text-white"
      : "invisible select-none"
  }" ${hasSale ? "" : 'aria-hidden="true"'}>Sale</span>`;

  const countdownOverlay = hasSale
        ? `<div class="pointer-events-none absolute bottom-3 left-1/2 z-[35] w-[calc(100%-1.25rem)] max-w-sm -translate-x-1/2 bg-white/95 px-3 py-2.5 text-center shadow-md backdrop-blur-sm sm:px-4 sm:py-3">
                          <span data-sale-countdown class="text-sm font-semibold text-neutral-900 tabular-nums sm:text-base">1570 : 07 : 24 : 57</span>
                        </div>`
        : `<div class="pointer-events-none absolute bottom-3 left-1/2 z-[35] w-[calc(100%-1.25rem)] max-w-sm -translate-x-1/2 px-3 py-2.5 sm:px-4 sm:py-3" aria-hidden="true">
                          <span class="invisible text-sm font-semibold tabular-nums sm:text-base">1570 : 07 : 24 : 57</span>
                        </div>`;

  const imgEsc = escapeHtml(imgSrc);
  const handleAttr = escapeHtml(product.handle || "");
  const wishlistOn = Boolean(variant && isWishlisted(product, variant));
  const heartClasses = wishlistOn
    ? "fa-solid fa-heart text-red-500"
    : "fa-regular fa-heart text-gray-800";

  const variants = product.variants || [];
  const variantOptionsHtml = variants
    .map((v) => {
      const label = escapeHtml(
        String(v.title || v.option1 || v.id || "Variant")
      );
      const isSel = variant && Number(v.id) === Number(variant.id);
      return `<option value="${escapeHtml(String(v.id))}"${
        isSel ? " selected" : ""
      }>${label}</option>`;
    })
    .join("");

  const addBtnDisabledAttr = variant && !variant.available ? " disabled" : "";
  const addBtnLabel =
    variant && !variant.available ? "Out of stock" : "Add to cart";

  const hasCartPanel = variants.length > 0;
  const titleLinkHoverClasses = hasCartPanel ? " group-hover:hidden" : "";

  const cartPanelHtml =
    hasCartPanel
      ? `<div class="jewelry-slide-cart pointer-events-auto w-full max-w-[17rem] space-y-3">
          <div class="flex gap-2">
            <select data-jewelry-variant-select data-product-handle="${handleAttr}" class="min-w-0 flex-1 cursor-pointer rounded border border-gray-300 bg-white py-2 pl-2 pr-2 text-sm text-gray-900" aria-label="Choose variant">
              ${variantOptionsHtml}
            </select>
            <div class="flex shrink-0 items-stretch overflow-hidden rounded border border-gray-300 bg-white">
              <button type="button" data-jewelry-qty-minus class="px-2.5 text-lg font-semibold leading-none text-gray-700 hover:bg-gray-100" aria-label="Decrease quantity">−</button>
              <input type="text" readonly data-jewelry-qty-input value="1" class="w-9 shrink-0 border-x border-gray-200 bg-white py-2 text-center text-sm font-semibold tabular-nums" inputmode="numeric" aria-live="polite" />
              <button type="button" data-jewelry-qty-plus class="px-2.5 text-lg font-semibold leading-none text-gray-700 hover:bg-gray-100" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="flex justify-center">
            <button type="button" data-jewelry-add-to-cart data-product-handle="${handleAttr}" data-default-text="Add to cart" class="cursor-pointer bg-transparent text-center text-sm font-semibold uppercase tracking-wide text-primary underline decoration-primary underline-offset-4 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"${addBtnDisabledAttr}>
              ${addBtnLabel}
            </button>
          </div>
        </div>`
      : "";

  return `
                <div class="swiper-slide group flex h-auto self-stretch">
                  <div class="relative flex h-[29rem] w-full flex-1 flex-col overflow-hidden rounded-lg bg-gray-100 sm:h-[30rem]">
                    <div class="relative z-10 flex min-h-0 flex-1 flex-col">
                      <div class="relative mb-6 min-h-[13rem] w-full flex-1 shrink-0 overflow-hidden bg-neutral-200">
                        <img
                              src="${imgEsc}"
                              alt=""
                              class="absolute inset-0 z-0 h-full w-full object-cover object-center"
                            >
                        <a href="${href}" class="absolute inset-0 z-10" aria-label="${title}"></a>
                        ${saleBadgeOverlay}
                        <div class="pointer-events-none absolute inset-0 z-20 bg-primary/50 opacity-0 transition duration-300 group-hover:opacity-100"></div>
                          ${countdownOverlay}
                          <div class="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 px-2 pb-2 pt-10 opacity-0 transition duration-300 group-hover:opacity-100 sm:gap-3 sm:pb-3">
                            <div class="flex shrink-0 items-center justify-center gap-4">
                              <button type="button" data-jewelry-wishlist data-product-handle="${handleAttr}" aria-pressed="${wishlistOn ? "true" : "false"}" aria-label="${wishlistOn ? "Remove from wishlist" : "Add to wishlist"}" class="pointer-events-auto relative z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition-smooth hover:bg-black hover:text-white">
                                  <i class="${heartClasses}" aria-hidden="true"></i>
                              </button>
                              <button type="button" data-jewelry-view data-product-handle="${handleAttr}" aria-label="View product" class="pointer-events-auto relative z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition-smooth hover:bg-black hover:text-white">
                                  <i class="fa-solid fa-eye" aria-hidden="true"></i>
                              </button>
                            </div>
                          </div>
                      </div>
                      <div class="horizontal-line shrink-0 border-gray-200"></div>
                      <div class="relative z-10 flex min-h-[10.5rem] shrink-0 flex-col justify-center bg-gray-100">
                        <a href="${href}" class="relative z-10 flex flex-col gap-1 px-2 py-3 text-center text-current no-underline hover:opacity-90${titleLinkHoverClasses}">
                          <span class="text-sm uppercase tracking-wide text-gray-600">${category}</span>
                          <h3 class="line-clamp-2 min-h-[2.5rem] text-base font-semibold leading-snug">${title}</h3>
                          <div class="flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 text-primary">
                            <span class="text-lg font-semibold leading-none">${price}</span>
                            ${compareLine}
                          </div>
                        </a>
                        ${
                          cartPanelHtml
                            ? `<div class="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 px-3 py-3 opacity-0 invisible transition-opacity duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">${cartPanelHtml}</div>`
                            : ""
                        }
                      </div>
                    </div>
                  </div>
                </div>`;
}

function renderJewelryProductsSwiper(selector, productsSlice) {
  const swiperEl = document.querySelector(selector);
  const wrapper = swiperEl?.querySelector(".swiper-wrapper");
  if (!swiperEl || !wrapper || !Array.isArray(productsSlice)) {
    return;
  }

  if (!productsSlice.length) {
    wrapper.innerHTML = "";
    return;
  }

  wrapper.innerHTML = productsSlice.map(buildJewelryCarouselSlideHtml).join("");
  wrapper
    .querySelectorAll(".swiper-slide")
    .forEach(syncJewelrySlideAddToCartUi);

  createSwiperIfPresent(selector, {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: productsSlice.length > 1,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 }
    }
  });
  initSaleCountdown();
  syncJewelryCarouselWishlistUi();
  requestAnimationFrame(() => {
    syncJewelryCarouselWishlistUi();
  });
}

function renderNewJewelrysSwiper(products) {
  if (!Array.isArray(products)) {
    return;
  }
  renderJewelryProductsSwiper(".newJewelrysSwiper", products.slice(0, 12));
}

function renderTrendingProductsSwiper(products) {
  const section = document.getElementById("trendingProductsSection");
  const slice = Array.isArray(products) ? products.slice(12, 24) : [];
  if (section) {
    section.classList.toggle("hidden", slice.length === 0);
  }
  renderJewelryProductsSwiper(".trendingProductsSwiper", slice);
}

function formatWeight(grams) {
  const weight = Number(grams);
  if (!Number.isFinite(weight) || weight <= 0) {
    return "N/A";
  }
  if (weight >= 1000) {
    return `${(weight / 1000).toFixed(3)} kg`;
  }
  return `${weight} g`;
}

function formatDisplayDate(dateString) {
  if (!dateString) {
    return "N/A";
  }
  const parsedDate = new Date(dateString);
  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }
  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function calculateSalePercent(compareAtPrice, price) {
  const compareValue = Number(compareAtPrice || 0);
  const priceValue = Number(price || 0);
  if (!compareValue || compareValue <= priceValue) {
    return null;
  }
  return Math.round(((compareValue - priceValue) / compareValue) * 100);
}

function getProductHandleFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("handle") || searchParams.get("id");
}

function getCheckoutQuantityFromUrl() {
  const raw = new URLSearchParams(window.location.search).get("quantity");
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 1) {
    return 1;
  }
  return Math.floor(value);
}

function getCheckoutVariantIdFromUrl() {
  const raw = new URLSearchParams(window.location.search).get("variant");
  if (!raw) {
    return null;
  }
  const id = Number(raw);
  return Number.isFinite(id) ? id : null;
}

function getSummaryFromHtml(html) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html || "";
  const firstParagraph = Array.from(wrapper.querySelectorAll("p"))
  .map((paragraph) => paragraph.textContent.trim())
  .find(Boolean);
  return firstParagraph || "Product details available below.";
}

function setElementText(id, value, fallback = "N/A") {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value || fallback;
  }
}

function setElementVisible(element, shouldShow) {
  if (!element) return;
  element.style.display = shouldShow ? "" : "none";
}

function setMainProductImage(src, altText) {
  const mainImage = document.getElementById("mainProductImage");
  if (!mainImage || !src) return;
  mainImage.src = src;
  mainImage.alt = altText || mainImage.alt || "Product image";
}

function setActiveThumbnail(activeButton) {
  const thumbnailButtons = document.querySelectorAll("[data-thumbnail-button]");
  thumbnailButtons.forEach((button) => {
    button.style.borderColor = "#e5e7eb";
  });
  if (activeButton) {
    activeButton.style.borderColor = "#111827";
  }
}

function renderThumbnails(images, title) {
  const thumbnailContainer = document.getElementById("thumbnailContainer");
  if (!thumbnailContainer) return;
  thumbnailContainer.innerHTML = "";
  images.forEach((image, index) => {
    const imageSrc = image.src || image;
    if (!imageSrc) return;
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.thumbnailButton = "true";
    button.className = "border";
    button.style.cursor = "pointer";
    const thumbnail = document.createElement("img");
    thumbnail.className = "thumbImage";
    thumbnail.src = imageSrc;
    thumbnail.alt = `${title} thumbnail ${index + 1}`;
    button.appendChild(thumbnail);
    button.addEventListener("click", () => {
      setMainProductImage(imageSrc, title);
      setActiveThumbnail(button);
    });
    thumbnailContainer.appendChild(button);
  });
  setActiveThumbnail(thumbnailContainer.querySelector("[data-thumbnail-button]"));
}

function initProductImageZoom() {
  const imageContainer = document.getElementById("mainImageContainer");
  const productImage = document.getElementById("mainProductImage");
  if (!imageContainer || !productImage) return;
  if (imageContainer.dataset.zoomBound === "true") return;
  imageContainer.addEventListener("mousemove", (event) => {
    const rect = imageContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    productImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    productImage.style.transform = "scale(2)";
  });
  imageContainer.addEventListener("mouseleave", () => {
    productImage.style.transformOrigin = "center center";
    productImage.style.transform = "scale(1)";
  });
  imageContainer.dataset.zoomBound = "true";
}

function getColorSwatch(value) {
  const normalizedValue = (value || "").toLowerCase().replace(/\s+/g, "");

  const colorMap = {
    gold: "#d4af37",
    yellow: "#eab308",
    beige: "#d6c5a4",
    silver: "#c0c0c0",
    khaki: "#c3b091",
    indianred: "#cd5c5c",
    lightcoral: "#f08080",
    black: "#111827",
    white: "#f9fafb",
    gray: "#9ca3af",
    grey: "#9ca3af",
    red: "#ef4444",
    green: "#22c55e",
    blue: "#3b82f6",
    pink: "#ec4899",
    purple: "#a855f7",
    orange: "#f97316"
  };

  return colorMap[normalizedValue] || value || "#d1d5db";
}

function renderOptionButtons(option, config) {
  const container = document.getElementById(config.containerId);
  const selectedLabel = document.getElementById(config.labelId);
  const section = document.getElementById(config.sectionId);

  if (!container || !selectedLabel || !section) return;

  const values = option?.values || [];

  setElementVisible(section, values.length > 0);

  if (!values.length) {
    container.innerHTML = "";
    selectedLabel.textContent = "";
    return;
  }

  selectedLabel.textContent = config.selectedValue;
  container.innerHTML = "";

  values.forEach((value) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", value);
    button.title = value;
    button.style.cursor = "pointer";

    if (config.isColor) {
      button.className = "rounded-full px-4 py-4 border-2";
      button.style.backgroundColor = getColorSwatch(value);
      button.style.borderColor =
        value === config.selectedValue ? "#111827" : "#d1d5db";
      button.style.outline =
        value === config.selectedValue ? "2px solid #A77F66" : "none";
    } else {
      button.className = "rounded-full px-4 py-2 border-2";
      button.textContent = value;
      button.style.borderColor =
        value === config.selectedValue ? "#111827" : "#d1d5db";
      button.style.backgroundColor =
        value === config.selectedValue ? "#111827" : "transparent";
      button.style.color =
        value === config.selectedValue ? "#ffffff" : "#111827";
    }

    button.addEventListener("click", () => {
      config.onSelect(value);
    });

    container.appendChild(button);
  });
}

function renderProductDescription(bodyHtml, productTitle) {
  const descriptionContainer =
    document.getElementById("productDescriptionContent");

  if (!descriptionContainer) return;

  descriptionContainer.className = "product-description-shell";

  if (!bodyHtml) {
    descriptionContainer.innerHTML =
      "<div><p class=\"product-description-text\">No description available.</p></div>";
    return;
  }

  descriptionContainer.innerHTML = bodyHtml;

  descriptionContainer.querySelectorAll("[data-mce-fragment]").forEach((element) => {
    element.removeAttribute("data-mce-fragment");
  });

  descriptionContainer.querySelectorAll("img").forEach((image) => {
    if (!image.alt) {
      image.alt = productTitle;
    }
  });

  descriptionContainer.querySelectorAll(".grid-wrap").forEach((grid) => {
    grid.classList.add("product-description-grid");
  });

  descriptionContainer.querySelectorAll(".grid-wrapper").forEach((wrapper, index) => {
    wrapper.classList.add("product-description-column");

    if (index > 0) {
      wrapper.classList.add("product-description-column--text");
    }
  });

  descriptionContainer.querySelectorAll(".desc-content").forEach((content) => {
    content.classList.add("product-description-content");
  });

  descriptionContainer.querySelectorAll(".desc-block").forEach((block) => {
    block.classList.add("product-description-block");
  });

  descriptionContainer.querySelectorAll(".banner-img").forEach((banner) => {
    banner.classList.add("product-description-banner");
  });

  descriptionContainer.querySelectorAll("h6").forEach((heading) => {
    heading.classList.add("product-description-title");
  });

  descriptionContainer.querySelectorAll("p").forEach((paragraph) => {
    paragraph.classList.add("product-description-text");
  });

  descriptionContainer.querySelectorAll(".desc-block p img").forEach((icon) => {
    icon.classList.add("product-description-icon");
  });
}

function renderBuyItNowOrderSummary(products) {
  const root = document.getElementById("buyItNowOrderSummary");
  if (!root || !Array.isArray(products)) {
    return;
  }

  const handle = getProductHandleFromUrl();
  const quantity = getCheckoutQuantityFromUrl();
  const variantId = getCheckoutVariantIdFromUrl();

  if (!handle) {
    root.innerHTML = `
      <div class="rounded-xl border border-gray-200 bg-gray-100 p-6 text-gray-700 shadow-sm">
        <p class="mb-2 text-sm">No product was passed to checkout.</p>
        <a href="./index.html" class="text-sm font-medium text-blue-600 underline">Continue shopping</a>
      </div>`;
    document.title = "Checkout | Jelwo";
    return;
  }

  const product = products.find((item) => item.handle === handle) || null;
  if (!product) {
    root.innerHTML = `
      <div class="rounded-xl border border-gray-200 bg-gray-100 p-6 text-gray-700 shadow-sm">
        <p class="mb-2 text-sm">We could not find that product.</p>
        <a href="./index.html" class="text-sm font-medium text-blue-600 underline">Continue shopping</a>
      </div>`;
    document.title = "Checkout | Jelwo";
    return;
  }

  let variant =
    (variantId
      ? product.variants?.find((v) => Number(v.id) === variantId)
      : null) || product.variants?.[0] || null;

  if (!variant) {
    root.innerHTML = `
      <div class="rounded-xl border border-gray-200 bg-gray-100 p-6 text-gray-700 shadow-sm">
        <p class="mb-2 text-sm">This product has no purchasable variant.</p>
        <a href="./product.html?handle=${encodeURIComponent(handle)}" class="text-sm font-medium text-blue-600 underline">Back to product</a>
      </div>`;
    document.title = "Checkout | Jelwo";
    return;
  }

  const imageSrc =
    variant.featured_image?.src ||
    product.images?.[0]?.src ||
    getProductCardImageUrl(product);
  const imgEsc = escapeHtml(imageSrc);
  const titleEsc = escapeHtml(product.title || "");
  const variantLabel = getVariantCheckoutLabel(variant);
  const variantEsc = escapeHtml(variantLabel);
  const unit = Number(variant.price || 0);
  const subtotal = unit * quantity;
  const estimatedTaxRate = 0.18;
  const estimatedTaxes = Math.round(subtotal * estimatedTaxRate * 100) / 100;
  const total = Math.round((subtotal + estimatedTaxes) * 100) / 100;

  document.title = `Checkout — ${product.title || "Jelwo"} | Jelwo`;

  root.innerHTML = `
    <div class="rounded-xl border border-gray-200 bg-gray-100 p-6 shadow-sm">
      <div class="flex justify-between gap-4 border-b border-gray-200 pb-6">
        <div class="flex min-w-0 flex-1 gap-4">
          <div class="relative shrink-0">
            <div class="h-20 w-20 overflow-hidden rounded-lg border border-gray-200 bg-white">
              <img src="${imgEsc}" alt="" class="h-full w-full object-cover" width="80" height="80">
            </div>
            <span class="absolute -right-1.5 -top-1.5 flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-black px-1.5 text-xs font-semibold leading-none text-white" aria-label="Quantity ${quantity}">${quantity}</span>
          </div>
          <div class="flex min-w-0 flex-col justify-center gap-1">
            <p class="text-base font-semibold leading-snug text-gray-900">${titleEsc}</p>
            <p class="text-sm text-gray-500">${variantEsc}</p>
          </div>
        </div>
        <p class="shrink-0 text-base font-medium text-gray-900">${formatCheckoutInr(subtotal)}</p>
      </div>

      <div class="flex flex-col gap-4 border-b border-gray-200 py-6 text-sm text-gray-800">
        <div class="flex justify-between gap-4">
          <span>Subtotal</span>
          <span class="font-medium text-gray-900">${formatCheckoutInr(subtotal)}</span>
        </div>
        <div class="flex justify-between gap-4">
          <span>Shipping</span>
          <span class="max-w-[11rem] text-right text-gray-500">Enter shipping address</span>
        </div>
        <div class="flex justify-between gap-4">
          <span class="inline-flex items-center gap-1.5 text-gray-800">
            Estimated taxes
            <i class="fa-regular fa-circle-question text-xs text-gray-400" title="Estimated GST for demo (18% of subtotal)"></i>
          </span>
          <span class="font-medium text-gray-900">${formatCheckoutInr(estimatedTaxes)}</span>
        </div>
      </div>

      <div class="flex items-end justify-between gap-4 pt-6">
        <span class="text-lg font-semibold text-gray-900">Total</span>
        <div class="text-right">
          <span class="text-xs font-medium uppercase tracking-wide text-gray-500">INR</span>
          <span class="ml-2 text-2xl font-bold tabular-nums text-gray-900">${formatCheckoutInr(total)}</span>
        </div>
      </div>

      <a href="./product.html?handle=${encodeURIComponent(product.handle)}" class="mt-6 inline-block text-sm font-medium text-blue-600 underline hover:text-blue-800">
        Edit product or quantity
      </a>
    </div>`;
}

function renderProductNotFound(handle) {
  const message = handle
    ? `No product found for "${handle}".`
    : "Select a product handle to view its details.";

  document.title = "Product not found | Jelwo";
  setElementText("breadcrumbProductName", "Product not found");
  setElementText("productTitle", "Product not found");
  setElementText("productPrice", "Rs. 0.00");
  setElementText("productStock", "Unavailable");
  setElementText("productSummary", message, message);
  setElementText("productVendor", "N/A");
  setElementText("productType", "N/A");
  setElementText("productSizes", "N/A");
  setElementText("productColors", "N/A");
  setElementText("productSku", "N/A");
  setElementText("productBarcode", "N/A");
  setElementText("productWeight", "N/A");
  setElementText("productHandle", "N/A");
  setElementText("productTags", "N/A");
  setElementText("productVariantCount", "N/A");
  setElementText("productShipping", "N/A");
  setElementText("productTaxStatus", "N/A");
  setElementText("productPublishedAt", "N/A");
  setElementText("productUpdatedAt", "N/A");
  setElementText("productCreatedAt", "N/A");
  setElementText("productIdValue", "N/A");
  setElementText("productVariantId", "N/A");
  setElementText("productVariantTitle", "N/A");
  setElementText("productImageCount", "N/A");
  setElementText("productOptionNames", "N/A");
  setElementText("productReviewText", "No product data");

  const comparePrice = document.getElementById("productComparePrice");
  const saleBadge = document.getElementById("productSaleBadge");
  const descriptionContainer =
    document.getElementById("productDescriptionContent");

  setElementVisible(comparePrice, false);
  setElementVisible(saleBadge, false);
  setElementVisible(document.getElementById("sizeSection"), false);
  setElementVisible(document.getElementById("colorSection"), false);

  if (descriptionContainer) {
    descriptionContainer.innerHTML = `<div><p>${message}</p></div>`;
  }
}

function renderProductPage(products) {
  if (!document.getElementById("productTitle")) return;

  const handle = getProductHandleFromUrl();

  if (!handle) {
    renderProductNotFound("");
    return;
  }

  const product =
    products.find((item) => item.handle === handle) || null;

  if (!product) {
    renderProductNotFound(handle);
    return;
  }

  const baseVariant = product.variants?.[0] || null;
  const galleryImages =
    product.images?.length
      ? product.images
      : baseVariant?.featured_image
        ? [baseVariant.featured_image]
        : [];

  const selectedOptions = {};

  product.options.forEach((option, index) => {
    selectedOptions[index + 1] =
      baseVariant?.[`option${index + 1}`] || option.values?.[0] || "";
  });

  const sizeOption =
    product.options.find((option) => option.name.toLowerCase() === "size");
  const colorOption =
    product.options.find((option) => option.name.toLowerCase() === "color");
  const addToCartBtn = document.getElementById("addToCartBtn");
  const heartBtn = document.getElementById("heartBtn");
  let currentVariant = baseVariant;

  document.title = `${product.title} | Jelwo`;
  setElementText("breadcrumbProductName", product.title, product.title);
  setElementText("productTitle", product.title, product.title);
  setElementText("productSummary", getSummaryFromHtml(product.body_html));
  setElementText("productVendor", product.vendor);
  setElementText("productType", product.product_type);
  setElementText("productHandle", product.handle);
  setElementText(
    "productTags",
    product.tags?.length ? product.tags.join(", ") : "N/A"
  );
  setElementText(
    "productVariantCount",
    `${product.variants?.length || 0} variant${product.variants?.length === 1 ? "" : "s"}`
  );
  setElementText("productPublishedAt", formatDisplayDate(product.published_at));
  setElementText("productUpdatedAt", formatDisplayDate(product.updated_at));
  setElementText("productCreatedAt", formatDisplayDate(product.created_at));
  setElementText("productIdValue", String(product.id || "N/A"));
  setElementText(
    "productImageCount",
    `${product.images?.length || 0} image${product.images?.length === 1 ? "" : "s"}`
  );
  setElementText(
    "productOptionNames",
    product.options?.length
      ? product.options.map((option) => option.name).join(", ")
      : "N/A"
  );
  setElementText(
    "productSizes",
    sizeOption?.values?.length ? sizeOption.values.join(", ") : "N/A"
  );
  setElementText(
    "productColors",
    colorOption?.values?.length ? colorOption.values.join(", ") : "N/A"
  );
  setElementText("productReviewText", `${product.vendor} product`);

  renderThumbnails(galleryImages, product.title);
  renderProductDescription(product.body_html, product.title);

  const initialImage =
    baseVariant?.featured_image?.src ||
    galleryImages[0]?.src ||
    galleryImages[0];

  if (initialImage) {
    setMainProductImage(initialImage, product.title);
  }

  function updateSelectedVariant(syncImage = false) {
    const selectedVariant =
      product.variants.find((variant) =>
        product.options.every((option, index) => {
          const selectedValue = selectedOptions[index + 1];
          return !selectedValue || variant[`option${index + 1}`] === selectedValue;
        })
      ) || baseVariant;

    if (!selectedVariant) return;
    currentVariant = selectedVariant;
    const comparePrice = document.getElementById("productComparePrice");
    const saleBadge = document.getElementById("productSaleBadge");
    const salePercent = calculateSalePercent(
      selectedVariant.compare_at_price,
      selectedVariant.price
    );

    setElementText("productPrice", formatMoney(selectedVariant.price));
    setElementText(
      "productStock",
      selectedVariant.available ? "In stock" : "Out of stock"
    );
    setElementText("productSku", selectedVariant.sku || "N/A");
    setElementText("productBarcode", "N/A");
    setElementText("productWeight", formatWeight(selectedVariant.grams));
    setElementText("productVariantId", String(selectedVariant.id || "N/A"));
    setElementText("productVariantTitle", selectedVariant.title || "N/A");
    setElementText(
      "productShipping",
      selectedVariant.requires_shipping ? "Required" : "Not required"
    );
    setElementText(
      "productTaxStatus",
      selectedVariant.taxable ? "Applicable" : "Not applicable"
    );

    if (comparePrice) {
      comparePrice.textContent = formatMoney(selectedVariant.compare_at_price);
      setElementVisible(
        comparePrice,
        Boolean(
          selectedVariant.compare_at_price &&
          Number(selectedVariant.compare_at_price) > Number(selectedVariant.price)
        )
      );
    }

    if (saleBadge) {
      saleBadge.textContent = salePercent ? `Sale ${salePercent}%` : "";
      setElementVisible(saleBadge, Boolean(salePercent));
    }

    updateAddToCartButtonState(addToCartBtn, selectedVariant);
    setWishlistButtonState(isWishlisted(product, selectedVariant));

    if (sizeOption) {
      renderOptionButtons(sizeOption, {
        containerId: "sizeOptions",
        labelId: "selectedSizeLabel",
        sectionId: "sizeSection",
        selectedValue: selectedOptions[sizeOption.position],
        isColor: false,
        onSelect: (value) => {
          selectedOptions[sizeOption.position] = value;
          updateSelectedVariant(true);
        }
      });
    } else {
      setElementVisible(document.getElementById("sizeSection"), false);
    }
    if (colorOption) {
      renderOptionButtons(colorOption, {
        containerId: "colorOptions",
        labelId: "selectedColorLabel",
        sectionId: "colorSection",
        selectedValue: selectedOptions[colorOption.position],
        isColor: true,
        onSelect: (value) => {
          selectedOptions[colorOption.position] = value;
          updateSelectedVariant(true);
        }
      });
    } else {
      setElementVisible(document.getElementById("colorSection"), false);
    }
    if (syncImage && selectedVariant.featured_image?.src) {
      setMainProductImage(selectedVariant.featured_image.src, product.title);
      const thumbnailButtons = document.querySelectorAll("[data-thumbnail-button]");
      thumbnailButtons.forEach((button) => {
        const thumbnail = button.querySelector("img");
        const isActive = thumbnail && thumbnail.src === selectedVariant.featured_image.src;
        button.style.borderColor = isActive ? "#111827" : "#e5e7eb";
      });
    }
    updateBuyItNowProductLink();
  }

  function getRequestedQuantity() {
    return Number(document.getElementById("quantityInput")?.value || 1);
  }

  function updateBuyItNowProductLink() {
    const link = document.getElementById("buyItNowLink");
    if (!link || !currentVariant) return;
    const rawQty = getRequestedQuantity();
    const qty =
      Number.isFinite(rawQty) && rawQty >= 1 ? Math.floor(rawQty) : 1;
    const params = new URLSearchParams({
      handle: product.handle,
      variant: String(currentVariant.id || ""),
      quantity: String(qty)
    });
    link.setAttribute("href", `buyItNow.html?${params.toString()}`);
  }

  updateSelectedVariant(false);
  window.addEventListener("jelwo-product-qty-change", updateBuyItNowProductLink);
  if (addToCartBtn) {
    addToCartBtn.dataset.defaultText = "Add to cart";
    addToCartBtn.addEventListener("click", () => {
      if (!currentVariant?.available) {
        return;
      }
      const requestedQuantity = getRequestedQuantity();
      const wasAdded = addItemToCart(
        product,
        currentVariant,
        selectedOptions,
        requestedQuantity
      );
      if (wasAdded) {
        flashButtonMessage(addToCartBtn, "Added to cart", "Add to cart");
        openStorageDrawer("cart");
      }
    });
  }
  if (heartBtn) {
    heartBtn.addEventListener("click", () => {
      const isActive = toggleWishlistItem(product, currentVariant, selectedOptions);
      setWishlistButtonState(isActive);
      if (isActive) {
        openStorageDrawer("wishlist");
      }
    });
  }
  initProductImageZoom();
}

// Items counter
const decreaseBtn = document.getElementById("decreaseBtn");
const increaseBtn = document.getElementById("increaseBtn");
const quantityInput = document.getElementById("quantityInput");
let quantity = Number(quantityInput?.value || 1);
if (increaseBtn && quantityInput) {
  increaseBtn.addEventListener("click", () => {
    quantity += 1;
    quantityInput.value = quantity;
    window.dispatchEvent(new Event("jelwo-product-qty-change"));
  });
}

if (decreaseBtn && quantityInput) {
  decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity -= 1;
      quantityInput.value = quantity;
      window.dispatchEvent(new Event("jelwo-product-qty-change"));
    }
  });
}

initStorageDrawerTriggers();
initSaleCountdown();
initNewJewelrysSwiperCardActions();
updateHeaderCounts();
window.addEventListener("storage", () => {
  updateHeaderCounts();
  renderStorageDrawer();
  syncJewelryCarouselWishlistUi();
});

const deliveryBtn1 = document.getElementById("deliveryBtn1");
const deliveryBtn2 = document.getElementById("deliveryBtn2");
const monthlyDiv = document.getElementById("monthlyDiv");
const yearlyDiv = document.getElementById("yearlyDiv");

if (deliveryBtn1 && deliveryBtn2 && monthlyDiv && yearlyDiv) {
  deliveryBtn1.addEventListener("click", () => {
    deliveryBtn1.classList.remove("bg-transparent");
    deliveryBtn1.classList.add("bg-white");

    deliveryBtn2.classList.remove("bg-white");
    deliveryBtn2.classList.add("bg-transparent");

    yearlyDiv.classList.remove("flex");
    yearlyDiv.classList.add("hidden");
    monthlyDiv.classList.remove("hidden");
    monthlyDiv.classList.add("flex");
  });

  deliveryBtn2.addEventListener("click", () => {
    deliveryBtn2.classList.remove("bg-transparent");
    deliveryBtn2.classList.add("bg-white");
    
    deliveryBtn1.classList.remove("bg-white");
    deliveryBtn1.classList.add("bg-transparent");

    monthlyDiv.classList.remove("flex");
    monthlyDiv.classList.add("hidden");
    yearlyDiv.classList.remove("hidden");
    yearlyDiv.classList.add("flex");
  });
}

const billingCheck = document.getElementById("billingCheck");
const billingForm = document.getElementById("billingForm");
if(billingCheck && billingForm) {
  billingCheck.addEventListener("change", () => {
    if (billingCheck.checked) {
        billingForm.classList.add("hidden");
    } 
    
    else {
        billingForm.classList.remove("hidden");
    }
  });
}

// FETCH PRODUCTS
fetch("./jelwo-product.json")
  .then((response) => response.json())
  .then((data) => {
    const products = data.products || [];

    jelwoCatalogByHandle = Object.fromEntries(
      products.map((product) => [product.handle, product])
    );

    createDropdown(products);
    renderProductPage(products);
    renderNewJewelrysSwiper(products);
    renderTrendingProductsSwiper(products);
    renderBuyItNowOrderSummary(products);
  })
  .catch((error) => {
    console.log("ERROR:", error);
  });