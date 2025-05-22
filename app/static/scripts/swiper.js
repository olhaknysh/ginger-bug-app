const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (hash && hash.startsWith("#recipe-")) {
    const id = hash.replace("#recipe-", "");
    const slides = document.querySelectorAll(".swiper-slide");
    let slideIndex = -1;

    slides.forEach((slide, index) => {
      if (slide.dataset.id === id) {
        slideIndex = index;
      }
    });

    if (slideIndex !== -1) {
      swiper.slideToLoop(slideIndex);
    }
  }
});
